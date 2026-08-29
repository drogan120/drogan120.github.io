export type ReviewEntry =
  | { kind: "kana"; kana: string; meaning: string; level: number }
  | { kind: "kanji"; kanji: string; reading: string; meaning: string; level: number };

const STORAGE_KEY = "review.deck";

function readDeck(): ReviewEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeDeck(deck: ReviewEntry[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(deck));
  } catch {
    /* ignore quota / private-mode errors */
  }
}

function entryKey(entry: ReviewEntry): string {
  return entry.kind === "kana" ? `kana:${entry.kana}` : `kanji:${entry.kanji}`;
}

/** Record a single missed word. Re-adding a duplicate updates its level. */
export function recordMiss(entry: ReviewEntry) {
  const deck = readDeck();
  const key = entryKey(entry);
  const next = deck.filter((e) => entryKey(e) !== key);
  next.push(entry);
  writeDeck(next);
}

/** Remove a word once the player answers it correctly in review. */
export function clearCorrect(entry: ReviewEntry) {
  const deck = readDeck();
  writeDeck(deck.filter((e) => entryKey(e) !== keyOf(entry)));
}

function keyOf(entry: ReviewEntry): string {
  return entryKey(entry);
}

/** All reviewable words, deduped (most recent wins). */
export function loadReviewDeck(): ReviewEntry[] {
  const deck = readDeck();
  const seen = new Set<string>();
  const unique: ReviewEntry[] = [];
  for (let i = deck.length - 1; i >= 0; i--) {
    const key = entryKey(deck[i]);
    if (seen.has(key)) continue;
    seen.add(key);
    unique.push(deck[i]);
  }
  return unique;
}
