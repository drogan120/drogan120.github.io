/**
 * Romaji → hiragana IME-style converter (a minimal GBoard-like input method).
 *
 * Converts a romaji string into hiragana as it is typed, using a
 * longest-match-first table with support for dakuten, yōon (small ゃゅょ),
 * sokuon (small っ, via doubled consonants or っ/xtu/ltu) and the ん n-rule.
 *
 * Pure function, no external dependencies.
 */

const TABLE: [string, string][] = [
  // --- basic gojuon ---
  ["a", "あ"], ["i", "い"], ["u", "う"], ["e", "え"], ["o", "お"],
  ["ka", "か"], ["ki", "き"], ["ku", "く"], ["ke", "け"], ["ko", "こ"],
  ["sa", "さ"], ["shi", "し"], ["si", "し"], ["su", "す"], ["se", "せ"], ["so", "そ"],
  ["ta", "た"], ["chi", "ち"], ["ti", "ち"], ["tsu", "つ"], ["tu", "つ"],
  ["te", "て"], ["to", "と"],
  ["na", "な"], ["ni", "に"], ["nu", "ぬ"], ["ne", "ね"], ["no", "の"],
  ["ha", "は"], ["hi", "ひ"], ["fu", "ふ"], ["hu", "ふ"], ["he", "へ"], ["ho", "ほ"],
  ["ma", "ま"], ["mi", "み"], ["mu", "む"], ["me", "め"], ["mo", "も"],
  ["ya", "や"], ["yu", "ゆ"], ["yo", "よ"],
  ["ra", "ら"], ["ri", "り"], ["ru", "る"], ["re", "れ"], ["ro", "ろ"],
  ["wa", "わ"], ["wo", "を"],
  // --- dakuten ---
  ["ga", "が"], ["gi", "ぎ"], ["gu", "ぐ"], ["ge", "げ"], ["go", "ご"],
  ["za", "ざ"], ["ji", "じ"], ["zi", "じ"], ["zu", "ず"], ["ze", "ぜ"], ["zo", "ぞ"],
  ["da", "だ"], ["dji", "ぢ"], ["di", "ぢ"], ["dzu", "づ"], ["du", "づ"],
  ["de", "で"], ["do", "ど"],
  ["ba", "ば"], ["bi", "び"], ["bu", "ぶ"], ["be", "べ"], ["bo", "ぼ"],
  // --- handakuten ---
  ["pa", "ぱ"], ["pi", "ぴ"], ["pu", "ぷ"], ["pe", "ぺ"], ["po", "ぽ"],
  // --- yōon (small ya/yu/yo) ---
  ["kya", "きゃ"], ["kyu", "きゅ"], ["kyo", "きょ"],
  ["sha", "しゃ"], ["sya", "しゃ"], ["shu", "しゅ"], ["syu", "しゅ"],
  ["sho", "しょ"], ["syo", "しょ"],
  ["cha", "ちゃ"], ["cya", "ちゃ"], ["tya", "ちゃ"],
  ["chu", "ちゅ"], ["cyu", "ちゅ"], ["tyu", "ちゅ"],
  ["cho", "ちょ"], ["cyo", "ちょ"], ["tyo", "ちょ"],
  ["nya", "にゃ"], ["nyu", "にゅ"], ["nyo", "にょ"],
  ["hya", "ひゃ"], ["hyu", "ひゅ"], ["hyo", "ひょ"],
  ["mya", "みゃ"], ["myu", "みゅ"], ["myo", "みょ"],
  ["rya", "りゃ"], ["ryu", "りゅ"], ["ryo", "りょ"],
  ["gya", "ぎゃ"], ["gyu", "ぎゅ"], ["gyo", "ぎょ"],
  ["ja", "じゃ"], ["jya", "じゃ"], ["zya", "じゃ"],
  ["ju", "じゅ"], ["jyu", "じゅ"], ["zyu", "じゅ"],
  ["jo", "じょ"], ["jyo", "じょ"], ["zyo", "じょ"],
  ["bya", "びゃ"], ["byu", "びゅ"], ["byo", "びょ"],
  ["pya", "ぴゃ"], ["pyu", "ぴゅ"], ["pyo", "ぴょ"],
  // --- small kana ---
  ["xa", "ぁ"], ["xi", "ぃ"], ["xu", "ぅ"], ["xe", "ぇ"], ["xo", "ぉ"],
  ["xya", "ゃ"], ["xyu", "ゅ"], ["xyo", "ょ"],
  ["xtu", "っ"], ["xtsu", "っ"], ["ltu", "っ"], ["ltsu", "っ"],
  ["la", "ぁ"], ["li", "ぃ"], ["lu", "ぅ"], ["le", "ぇ"], ["lo", "ぉ"],
  ["lya", "ゃ"], ["lyu", "ゅ"], ["lyo", "ょ"],
];

// Longest-match-first so multi-char keys (shi, kya, …) win over single letters.
const SORTED = [...TABLE].sort((a, b) => b[0].length - a[0].length);

/** Look up an exact romaji piece. Returns the kana or null. */
function lookup(piece: string): string | null {
  for (const [romaji, kana] of SORTED) {
    if (piece === romaji) return kana;
  }
  return null;
}

/** Consonants that can be geminated to form っ (sokuon). */
const DOUBLABLE = new Set(["k", "s", "t", "c", "p", "g", "z", "d", "b", "r", "m", "h", "y", "w"]);

/**
 * Convert a romaji string to hiragana.
 *
 * Unconvertible leading characters (nothing sensible to map) are skipped, so a
 * partially-typed input like "kanninokuni" still produces all the hiragana it
 * can. Doubled consonants (kk, ss, tt, …) yield っ. The n-rule turns a
 * consonant-followed n into ん; an end-of-buffer n also becomes ん.
 */
export function romajiToKana(romaji: string): string {
  const buf = romaji;
  let out = "";
  let cursor = 0;

  while (cursor < buf.length) {
    const ch = buf[cursor];

    // Sokuon: a doubled consonant (e.g. "kk", "ss", "tt") → っ + keep one.
    // 'n' is exempt — "nn" means ん (handled by the n-rule below).
    if (
      ch !== "n" &&
      DOUBLABLE.has(ch) &&
      buf[cursor + 1] === ch
    ) {
      out += "っ";
      cursor += 1;
      continue;
    }

    // Longest-match a single kana from the table.
    let matched = false;
    for (let len = Math.min(4, buf.length - cursor); len >= 1; len--) {
      const piece = buf.slice(cursor, cursor + len);
      const kana = lookup(piece);
      if (kana) {
        out += kana;
        cursor += len;
        matched = true;
        break;
      }
    }
    if (matched) continue;

    // n-rule: ん before a consonant or at the end of the input.
    if (ch === "n") {
      // `n'` forces a bare ん (vowel or y follows, e.g. ん+い, ん+よう).
      if (buf[cursor + 1] === "'") {
        out += "ん";
        cursor += 2;
        continue;
      }
      const next = buf[cursor + 1] ?? "";
      const isEnd = cursor + 1 >= buf.length;
      // ん before a consonant, or before y, or at the very end.
      if (isEnd || next === "y" || !/[aeiou]/.test(next)) {
        out += "ん";
        cursor += 1;
        continue;
      }
    }

    // Nothing matched — skip this character (keeps the rest of the word intact
    // while typing, e.g. spaces or half-typed mora).
    cursor += 1;
  }

  return out;
}

/**
 * Convert a kana string to romaji (used only for testing round-trips and for
 * showing reading hints). Uses the same table in reverse, longest first.
 */
const KANA_TO_ROMAJI: Record<string, string> = {};
for (const [romaji, kana] of SORTED) {
  if (!(kana in KANA_TO_ROMAJI)) KANA_TO_ROMAJI[kana] = romaji;
}

export function kanaToRomaji(kana: string): string {
  let out = "";
  let i = 0;
  while (i < kana.length) {
    const ch = kana[i];
    if (ch === "っ") {
      // Sokuon: emit the following mora's leading consonant, doubled. The
      // leading consonant of the next mora is "consumed" by っ, so the next
      // mora is emitted without its own leading consonant.
      const nextKana = kana[i + 1] ?? "";
      const nextRomaji = KANA_TO_ROMAJI[nextKana] ?? "";
      if (nextRomaji) {
        const lead = nextRomaji[0];
        out += lead + lead + nextRomaji.slice(1);
        i += 2;
        continue;
      }
      out += "xtu";
      i += 1;
      continue;
    }
    if (ch === "ん") {
      const nextKana = kana[i + 1] ?? "";
      // ん before a vowel or y is ambiguous (e.g. ん+い could look like に)
      // so it is written n' to force a standalone ん. Before a consonant or at
      // the end, plain "n" suffices / is correct.
      const needsApostrophe = nextKana !== "" && /[あいうえおやゆよ]/.test(nextKana);
      out += needsApostrophe ? "n'" : "n";
      i += 1;
      continue;
    }
    out += KANA_TO_ROMAJI[ch] ?? ch;
    i += 1;
  }
  return out;
}

export function splitKana(kana: string): string[] {
  return Array.from(kana);
}
