/** Canonical game identifiers. Used for per-game leaderboards and routing. */
export const GameSlug = {
  Speed: "speed",
  Wordle: "wordle",
  Recall: "recall",
  Match: "match",
  Builder: "builder",
  KanjiReading: "kanji-reading",
  KanjiMeaning: "kanji-meaning",
  KanjiSelect: "kanji-select",
} as const;

export type GameSlug = (typeof GameSlug)[keyof typeof GameSlug];

export const GAME_SLUG_VALUES: readonly GameSlug[] = Object.values(GameSlug);

export const GAME_LEVELS = [5, 4, 3, 2, 1] as const;

export type GameLevel = (typeof GAME_LEVELS)[number];

/**
 * Build the stable leaderboard key for a game + JLPT level, e.g. "speed:5".
 * A single game can have a separate leaderboard per level.
 */
export function gameLeaderboardKey(
  game: GameSlug,
  level: GameLevel
): string {
  return `${game}:${level}`;
}
