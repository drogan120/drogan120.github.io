import { GAME_LEVELS, type GameLevel } from "./games";

/**
 * Best streak reached per JLPT level. Levels never played are absent, so an
 * N5 streak can never be submitted to the N1 leaderboard.
 */
export type LevelBests = Partial<Record<GameLevel, number>>;

function isGameLevel(value: number): value is GameLevel {
  return (GAME_LEVELS as readonly number[]).includes(value);
}

/** Read a persisted `bestByLevel` map, dropping malformed levels and scores. */
export function parseLevelBests(input: unknown): LevelBests {
  const bests: LevelBests = {};
  if (!input || typeof input !== "object") return bests;
  for (const [levelKey, value] of Object.entries(
    input as Record<string, unknown>
  )) {
    const level = Number(levelKey);
    if (!Number.isInteger(level) || !isGameLevel(level)) continue;
    if (typeof value !== "number" || !Number.isFinite(value) || value <= 0) {
      continue;
    }
    bests[level] = Math.floor(value);
  }
  return bests;
}

/** Best streak recorded for a single level, or 0 when that level is unplayed. */
export function bestForLevel(bests: LevelBests, level: GameLevel): number {
  return bests[level] ?? 0;
}

/** Updated map when `candidate` beats the stored best for `level`, else the same map. */
export function withLevelBest(
  bests: LevelBests,
  level: GameLevel,
  candidate: number
): LevelBests {
  if (candidate <= bestForLevel(bests, level)) return bests;
  return { ...bests, [level]: candidate };
}
