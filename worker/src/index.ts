export type LeaderboardEntry = {
  name: string;
  score: number;
  updatedAt: string;
};

export interface Env {
  LEADERBOARD: KVNamespace;
}

const MAX_ENTRIES = 5;
const MAX_NAME_LENGTH = 20;
const MAX_GAME_LENGTH = 32;
const MAX_GENERIC_SCORE = 1_000_000;

/** Realistic ceiling per game to filter obvious spam scores. */
const PER_GAME_MAX_SCORE: Record<string, number> = {
  speed: 600,
  wordle: 1000,
  recall: 1000,
  match: 1000,
  builder: 1000,
  "kanji-reading": 1000,
  "kanji-meaning": 1000,
  "kanji-select": 1000,
  "kana-brain": 1000,
  "kanji-rush": 600,
  "kana-memory": 1000,
  "kanji-reading-rush": 600,
  "reverse-kanji": 1000,
};

const RATE_LIMIT_IP_MAX = 15;
const RATE_LIMIT_IP_WINDOW_SECONDS = 300;
const RATE_LIMIT_NAME_MAX = 1;
const RATE_LIMIT_NAME_WINDOW_SECONDS = 60;

const ALLOWED_GAME_SLUGS = new Set([
  "speed",
  "wordle",
  "recall",
  "match",
  "builder",
  "kanji-reading",
  "kanji-meaning",
  "kanji-select",
  "kana-brain",
  "kanji-rush",
  "kana-memory",
  "kanji-reading-rush",
  "reverse-kanji",
]);
const VALID_LEVELS = new Set(["1", "2", "3", "4", "5"]);

/**
 * Accepts either "slug" or "slug:level" (e.g. "speed:5"). Validates both parts
 * to avoid arbitrary keys. Returns null when invalid.
 */
function sanitizeGame(input: unknown): string | null {
  if (typeof input !== "string") return null;
  const value = input.trim().slice(0, MAX_GAME_LENGTH);
  const [slug, level] = value.split(":");
  if (!ALLOWED_GAME_SLUGS.has(slug)) return null;
  if (level !== undefined && !VALID_LEVELS.has(level)) return null;
  return value;
}

function scoreKey(game: string): string {
  return `scores:${game}`;
}

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

function sanitizeName(input: unknown): string | null {
  if (typeof input !== "string") return null;
  const trimmed = input.trim().slice(0, MAX_NAME_LENGTH);
  return trimmed.length > 0 ? trimmed : null;
}

function sanitizeScore(input: unknown, slug: string): number | null {
  const value = Number(input);
  if (!Number.isFinite(value)) return null;
  const floored = Math.floor(value);
  const max = PER_GAME_MAX_SCORE[slug] ?? MAX_GENERIC_SCORE;
  return floored >= 0 && floored <= max ? floored : null;
}

export function clientIp(request: Request): string {
  return request.headers.get("cf-connecting-ip") ?? "unknown";
}

/**
 * Increments a KV counter with a sliding TTL. Returns true once the counter
 * reaches `max`, which blocks the caller from proceeding.
 */
async function consumeRateLimit(
  env: Env,
  key: string,
  max: number,
  windowSeconds: number
): Promise<boolean> {
  const stateKey = `ratelimit:${key}`;
  const raw = await env.LEADERBOARD.get(stateKey, "text");
  const count = raw ? Number(raw) : 0;
  if (count >= max) return true;
  await env.LEADERBOARD.put(stateKey, String(count + 1), {
    expirationTtl: windowSeconds,
  });
  return false;
}

async function loadScores(env: Env, game: string): Promise<LeaderboardEntry[]> {
  const raw = await env.LEADERBOARD.get(scoreKey(game), "text");
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function saveScores(env: Env, game: string, scores: LeaderboardEntry[]): Promise<void> {
  await env.LEADERBOARD.put(scoreKey(game), JSON.stringify(scores));
}

async function handleGet(env: Env, requestUrl: URL): Promise<Response> {
  const game = sanitizeGame(requestUrl.searchParams.get("game"));
  if (!game) return json({ error: "Missing or invalid game" }, 400);
  const scores = await loadScores(env, game);
  return json(scores);
}

async function handlePost(env: Env, request: Request): Promise<Response> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json({ error: "Invalid JSON" }, 400);
  }
  const record = body as Record<string, unknown>;
  const game = sanitizeGame(record?.game);
  const name = sanitizeName(record?.name);
  const slug = game ? game.split(":")[0] : "";
  const score = sanitizeScore(record?.score, slug);
  if (!game || !name || score === null) {
    return json({ error: "Missing or invalid game/name/score" }, 400);
  }

  const byIp = await consumeRateLimit(
    env,
    `ip:${clientIp(request)}`,
    RATE_LIMIT_IP_MAX,
    RATE_LIMIT_IP_WINDOW_SECONDS
  );
  const byName = await consumeRateLimit(
    env,
    `name:${game}:${name.toLowerCase()}`,
    RATE_LIMIT_NAME_MAX,
    RATE_LIMIT_NAME_WINDOW_SECONDS
  );
  if (byIp || byName) {
    return json({ error: "Rate limited, try again shortly" }, 429);
  }

  const scores = await loadScores(env, game);
  const existing = scores.find((entry) => entry.name === name);
  let next: LeaderboardEntry[];
  if (existing) {
    if (score > existing.score) {
      next = scores.map((entry) =>
        entry.name === name
          ? { ...entry, score, updatedAt: new Date().toISOString() }
          : entry
      );
    } else {
      next = scores;
    }
  } else {
    next = [...scores, { name, score, updatedAt: new Date().toISOString() }];
  }

  next = next.sort((a, b) => b.score - a.score).slice(0, MAX_ENTRIES);
  await saveScores(env, game, next);
  return json(next);
}

const worker = {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      });
    }
    if (request.method === "GET" && url.pathname === "/") {
      return handleGet(env, url);
    }
    if (request.method === "POST" && url.pathname === "/") {
      return handlePost(env, request);
    }
    return json({ error: "Not found" }, 404);
  },
};

export default worker;
