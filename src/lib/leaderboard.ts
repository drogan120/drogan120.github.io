import { gameLeaderboardKey, type GameSlug, type GameLevel } from "./games";

export type LeaderboardEntry = {
  name: string;
  score: number;
  updatedAt?: string;
};

const LEADERBOARD_URL =
  process.env.NEXT_PUBLIC_LEADERBOARD_URL ?? "";

export function isLeaderboardConfigured(): boolean {
  return LEADERBOARD_URL.length > 0;
}

/** Fetch the current top-5 leaderboard for a game + level. Null when unavailable. */
export async function getLeaderboard(
  game: GameSlug,
  level: GameLevel
): Promise<LeaderboardEntry[] | null> {
  if (!isLeaderboardConfigured()) return null;
  try {
    const url = new URL(LEADERBOARD_URL);
    url.searchParams.set("game", gameLeaderboardKey(game, level));
    const response = await fetch(url, {
      method: "GET",
      headers: { Accept: "application/json" },
    });
    if (!response.ok) return null;
    const data = (await response.json()) as unknown;
    if (!Array.isArray(data)) return null;
    return data as LeaderboardEntry[];
  } catch {
    return null;
  }
}

/**
 * Submit a name + score for a game + level. Returns the updated top-5, or null
 * when unavailable. Only the player's best score is kept per {game, level, name}.
 */
export async function submitScore(
  game: GameSlug,
  level: GameLevel,
  name: string,
  score: number
): Promise<LeaderboardEntry[] | null> {
  if (!isLeaderboardConfigured()) return null;
  try {
    const response = await fetch(LEADERBOARD_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        game: gameLeaderboardKey(game, level),
        name,
        score,
      }),
    });
    if (!response.ok) return null;
    const data = (await response.json()) as unknown;
    return Array.isArray(data) ? (data as LeaderboardEntry[]) : null;
  } catch {
    return null;
  }
}
