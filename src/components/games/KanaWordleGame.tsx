"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useI18n } from "@/i18n";
import SettingsBar from "@/components/shared/SettingsBar";
import {
  JLPT_LEVELS,
  WORD_LENGTHS,
  drawWord,
  type KanaWord,
} from "@/data/kanaWords";
import { romajiToKana, splitKana } from "@/lib/romaji";
import { GameSlug, type GameLevel } from "@/lib/games";
import {
  parseLevelBests,
  withLevelBest,
  type LevelBests,
} from "@/lib/gameStats";
import LeaderboardPanel from "./LeaderboardPanel";

const MAX_GUESSES = 6;

type Status = "correct" | "present" | "absent";

type Guess = { kana: string[]; statuses: Status[] };

function evaluate(guess: string[], answer: string[]): Status[] {
  const result: Status[] = guess.map(() => "absent");
  const remaining = [...answer];
  guess.forEach((g, i) => {
    if (g === answer[i]) {
      result[i] = "correct";
      remaining[i] = "";
    }
  });
  guess.forEach((g, i) => {
    if (result[i] === "correct") return;
    const at = remaining.indexOf(g);
    if (at !== -1) {
      result[i] = "present";
      remaining[at] = "";
    }
  });
  return result;
}

type Stats = {
  score: number;
  streak: number;
  best: number;
  played: number;
  bestByLevel: LevelBests;
};

function loadStats(): Stats {
  const empty: Stats = { score: 0, streak: 0, best: 0, played: 0, bestByLevel: {} };
  if (typeof window === "undefined") return empty;
  try {
    const saved = localStorage.getItem("kanaWordle.stats");
    if (!saved) return empty;
    const s = JSON.parse(saved);
    return {
      score: typeof s.score === "number" ? s.score : 0,
      streak: typeof s.streak === "number" ? s.streak : 0,
      best: typeof s.best === "number" ? s.best : 0,
      played: typeof s.played === "number" ? s.played : 0,
      bestByLevel: parseLevelBests(s.bestByLevel),
    };
  } catch {
    return empty;
  }
}

/** On-screen keypad: each key is a single kana; the romaji hint shows how to type it. */
const KEYPAD: { name: string; keys: string[] }[] = [
  { name: "a", keys: ["あ", "い", "う", "え", "お"] },
  { name: "k", keys: ["か", "き", "く", "け", "こ"] },
  { name: "s", keys: ["さ", "し", "す", "せ", "そ"] },
  { name: "t", keys: ["た", "ち", "つ", "て", "と"] },
  { name: "n", keys: ["な", "に", "ぬ", "ね", "の"] },
  { name: "h", keys: ["は", "ひ", "ふ", "へ", "ほ"] },
  { name: "m", keys: ["ま", "み", "む", "め", "も"] },
  { name: "y", keys: ["や", "ゆ", "よ"] },
  { name: "r", keys: ["ら", "り", "る", "れ", "ろ"] },
  { name: "w", keys: ["わ", "を", "ん"] },
  { name: "g", keys: ["が", "ぎ", "ぐ", "げ", "ご"] },
  { name: "z", keys: ["ざ", "じ", "ず", "ぜ", "ぞ"] },
  { name: "d", keys: ["だ", "ぢ", "づ", "で", "ど"] },
  { name: "b", keys: ["ば", "び", "ぶ", "べ", "ぼ"] },
  { name: "p", keys: ["ぱ", "ぴ", "ぷ", "ぺ", "ぽ"] },
  { name: "+", keys: ["っ", "ゃ", "ゅ", "ょ"] },
];

const cellColor: Record<Status, string> = {
  correct: "bg-emerald-500 border-emerald-400 text-white",
  present: "bg-amber-400 border-amber-300 text-black",
  absent: "bg-border/60 border-border text-foreground/60",
};

export default function KanaWordleGame() {
  const { t } = useI18n();
  const [level, setLevel] = useState<number>(5);
  const [length, setLength] = useState<number>(5);
  const [word, setWord] = useState<KanaWord | null>(null);
  const [guesses, setGuesses] = useState<Guess[]>([]);
  const [input, setInput] = useState("");
  const [keyState, setKeyState] = useState<Record<string, Status>>({});
  const [ended, setEnded] = useState(false);
  const [won, setWon] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [score, setScore] = useState<number>(() => loadStats().score);
  const [streak, setStreak] = useState<number>(() => loadStats().streak);
  const [best, setBest] = useState<number>(() => loadStats().best);
  const [bestByLevel, setBestByLevel] = useState<LevelBests>(
    () => loadStats().bestByLevel
  );
  const [played, setPlayed] = useState<number>(() => loadStats().played);
  const inputRef = useRef<HTMLInputElement>(null);

  const answer = useMemo(() => (word ? splitKana(word.kana) : []), [word]);
  const getKanaOut = (romaji: string) => romajiToKana(romaji);
  const currentKana = getKanaOut(input);

  const startRound = useCallback((l: number, len: number) => {
    setGuesses([]);
    setKeyState({});
    setInput("");
    setEnded(false);
    setWon(false);
    setWord(drawWord(l, len));
  }, []);

  // Start the first round after mount (hydration-safe: random values are
  // generated only on the client).
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setMounted(true);
      startRound(5, 5);
    });
    return () => cancelAnimationFrame(frame);
    // startRound is stable; run once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!mounted) return;
    try {
      localStorage.setItem(
        "kanaWordle.stats",
        JSON.stringify({ score, streak, best, played, bestByLevel })
      );
    } catch {
      /* ignore */
    }
  }, [mounted, score, streak, best, played, bestByLevel]);

  const handleConfig = useCallback(
    (newLevel: number, newLength: number) => {
      setLevel(newLevel);
      setLength(newLength);
      startRound(newLevel, newLength);
      inputRef.current?.focus();
    },
    [startRound]
  );

  const onInputChange = (value: string) => {
    const kana = getKanaOut(value.replace(/\s/g, ""));
    if (kana.length > length) return; // block overflow
    setInput(value.replace(/\s/g, ""));
  };

  const submit = useCallback(() => {
    if (ended || !word) return;
    const kana = getKanaOut(input);
    if (kana.length !== length) return;

    const result = evaluate(splitKana(kana), answer);

    const newKeys = { ...keyState };
    splitKana(kana).forEach((k, i) => {
      const rank = (s: Status) => (s === "correct" ? 2 : s === "present" ? 1 : 0);
      if (rank(result[i]) >= rank(newKeys[k] || "absent")) newKeys[k] = result[i];
    });
    setKeyState(newKeys);

    const newGuesses = [...guesses, { kana: splitKana(kana), statuses: result }];
    setGuesses(newGuesses);
    setInput("");

    const isWin = result.every((s) => s === "correct");
    if (isWin) {
      const runLevel = word.level as GameLevel;
      const earned = MAX_GUESSES - newGuesses.length + 1; // earlier guesses score more
      setScore((s) => s + earned);
      setStreak((s) => s + 1);
      setBest((b) => Math.max(b, streak + 1));
      setBestByLevel((bests) => withLevelBest(bests, runLevel, streak + 1));
      setPlayed((p) => p + 1);
      setWon(true);
      setEnded(true);
    } else if (newGuesses.length >= MAX_GUESSES) {
      setStreak(0);
      setPlayed((p) => p + 1);
      setEnded(true);
    }
  }, [ended, word, input, length, answer, keyState, guesses, streak]);

  const nextRound = useCallback(() => {
    startRound(level, length);
    inputRef.current?.focus();
  }, [startRound, level, length]);

  // Enter to advance on the result screen
  useEffect(() => {
    if (!ended) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault();
        nextRound();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [ended, nextRound]);

  const rows: { cells: string[]; statuses: Status[] | null }[] = [];
  for (let i = 0; i < MAX_GUESSES; i++) {
    if (i < guesses.length) {
      rows.push({ cells: guesses[i].kana, statuses: guesses[i].statuses });
    } else if (i === guesses.length) {
      const buffer = splitKana(currentKana);
      while (buffer.length < length) buffer.push("");
      rows.push({ cells: buffer.slice(0, length), statuses: null });
    } else {
      rows.push({ cells: Array(length).fill(""), statuses: null });
    }
  }

  const kanaToRomajiShort = (k: string) => {
    const map: Record<string, string> = {
      あ: "a", い: "i", う: "u", え: "e", お: "o",
      か: "ka", き: "ki", く: "ku", け: "ke", こ: "ko",
      さ: "sa", し: "shi", す: "su", せ: "se", そ: "so",
      た: "ta", ち: "chi", つ: "tsu", て: "te", と: "to",
      な: "na", に: "ni", ぬ: "nu", ね: "ne", の: "no",
      は: "ha", ひ: "hi", ふ: "fu", へ: "he", ほ: "ho",
      ま: "ma", み: "mi", む: "mu", め: "me", も: "mo",
      や: "ya", ゆ: "yu", よ: "yo",
      ら: "ra", り: "ri", る: "ru", れ: "re", ろ: "ro",
      わ: "wa", を: "wo", ん: "n",
      が: "ga", ぎ: "gi", ぐ: "gu", げ: "ge", ご: "go",
      ざ: "za", じ: "ji", ず: "zu", ぜ: "ze", ぞ: "zo",
      だ: "da", ぢ: "ji", づ: "zu", で: "de", ど: "do",
      ば: "ba", び: "bi", ぶ: "bu", べ: "be", ぼ: "bo",
      ぱ: "pa", ぴ: "pi", ぷ: "pu", ぺ: "pe", ぽ: "po",
      っ: "xtu", ゃ: "xya", ゅ: "xyu", ょ: "xyo",
    };
    return map[k] ?? "";
  };

  const tapKey = (k: string) => {
    onInputChange(input + kanaToRomajiShort(k));
    inputRef.current?.focus();
  };

  return (
    <main className="mx-auto max-w-3xl px-6 py-12 md:py-16">
      <div className="flex items-start justify-between gap-4">
        <div>
          <Link
            href="/games"
            className="font-mono text-sm text-muted transition-colors hover:text-accent"
          >
            ← {t.default.nav.about} · games
          </Link>
          <h1 className="mt-4 text-3xl font-bold md:text-4xl">
            かなワードル <span className="text-accent">Kana Wordle</span>
          </h1>
           <p className="mt-3 max-w-xl text-muted">
            {t.games.kanaWordle.tagline}
          </p>
        </div>
        <SettingsBar />
      </div>

      {!mounted ? (
        <div className="mt-8 rounded-2xl border border-border bg-card p-10 text-center font-mono text-muted">
          {t.games.kanaWordle.loading}
        </div>
      ) : (
        <>
      {/* Config */}
      <div className="mt-8 rounded-2xl border border-border bg-card p-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <p className="mb-2 font-mono text-[11px] uppercase tracking-widest text-muted">
              {t.games.kanaWordle.jlptLevel}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {JLPT_LEVELS.map((l) => (
                <button
                  key={l.value}
                  type="button"
                  onClick={() => handleConfig(l.value, length)}
                  className={`pop-on-click rounded-lg px-3 py-1.5 font-mono text-xs transition-colors ${
                    level === l.value
                      ? "bg-accent font-semibold text-background"
                      : "bg-background border border-border text-muted hover:border-accent hover:text-accent"
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-2 font-mono text-[11px] uppercase tracking-widest text-muted">
              {t.games.kanaWordle.wordLength}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {WORD_LENGTHS.map((len) => (
                <button
                  key={len}
                  type="button"
                  onClick={() => handleConfig(level, len)}
                  className={`pop-on-click rounded-lg px-3 py-1.5 font-mono text-xs transition-colors ${
                    length === len
                      ? "bg-accent font-semibold text-background"
                      : "bg-background border border-border text-muted hover:border-accent hover:text-accent"
                  }`}
                >
                  {len} {t.games.kanaWordle.kana}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-6 grid grid-cols-4 gap-3 text-center">
        <div className="rounded-xl border border-border bg-card p-3">
          <p className="font-mono text-2xl font-bold">{score}</p>
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted">
            {t.games.kanaWordle.score}
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-3">
          <p className="font-mono text-2xl font-bold">{streak}</p>
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted">
            {t.games.kanaWordle.streak}
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-3">
          <p className="font-mono text-2xl font-bold">{best}</p>
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted">
            {t.games.kanaWordle.best}
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-3">
          <p className="font-mono text-2xl font-bold">{played}</p>
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted">
            {t.games.kanaWordle.games}
          </p>
        </div>
      </div>

      {/* Board */}
      <div className="mt-6 rounded-2xl border border-border bg-card p-6 md:p-8">
        <div className="mb-5 flex items-center justify-between gap-3">
          <p className="font-mono text-xs uppercase tracking-widest text-muted">
            {MAX_GUESSES - guesses.length} {t.games.kanaWordle.triesLeft}
          </p>
          <button
            type="button"
            onClick={nextRound}
            className="rounded-lg border border-border px-4 py-2 font-mono text-xs transition-colors hover:border-accent hover:text-accent"
          >
            ↻ {t.games.kanaWordle.newWord}
          </button>
        </div>

        <div className="flex flex-col items-center gap-1.5">
          {rows.map((row, ri) => (
            <div key={ri} className="flex gap-1.5">
              {row.cells.map((cell, ci) => {
                const status = row.statuses?.[ci] ?? null;
                return (
                  <div
                    key={ci}
                    className={`flex h-12 w-12 items-center justify-center rounded-lg border-2 font-mono text-2xl transition-colors ${
                      status
                        ? cellColor[status]
                        : cell
                          ? "border-accent text-foreground"
                          : "border-border"
                    }`}
                  >
                    {cell}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* Romaji input */}
        <div className="mt-6 flex flex-col items-center gap-2 sm:flex-row sm:justify-center">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => onInputChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") submit();
            }}
            autoFocus
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
            placeholder={t.games.kanaWordle.typeHint}
            inputMode="text"
            aria-label={t.games.kanaWordle.ariaType}
            className={`w-full max-w-xs rounded-lg border bg-background px-4 py-3 text-center font-mono text-xl tracking-widest outline-none placeholder:text-muted/60 sm:w-56 ${
              currentKana.length === length
                ? "border-accent text-foreground"
                : "border-border"
            }`}
          />
          <button
            type="button"
            onClick={submit}
            disabled={currentKana.length !== length || ended}
            className="h-12 rounded-lg bg-accent px-7 font-mono text-sm font-semibold text-background transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
          >
            {t.games.kanaWordle.enter}
          </button>
        </div>

        {/* On-screen keypad (compact, always visible so players know what to type) */}
        {!ended && (
          <div className="mt-5 space-y-1">
            {KEYPAD.map((row) => (
              <div
                key={row.name}
                className="flex flex-wrap items-center justify-center gap-1"
              >
                {row.keys.map((k) => {
                  const s = keyState[k];
                  const stateClass =
                    s === "correct"
                      ? "bg-emerald-500 text-white border-emerald-400"
                      : s === "present"
                        ? "bg-amber-400 text-black border-amber-300"
                        : s === "absent"
                          ? "bg-border/60 text-foreground/40 border-border"
                          : "bg-background text-foreground border-border hover:border-accent";
                  return (
                    <button
                      key={k}
                      type="button"
                      onClick={() => tapKey(k)}
                      aria-label={`${k} (${kanaToRomajiShort(k)})`}
                      className="pop-on-click flex items-baseline gap-1 rounded-md border px-2 py-1 transition-colors"
                    >
                      <span
                        className={`rounded px-0.5 font-mono text-base leading-none transition-colors ${stateClass}`}
                      >
                        {k}
                      </span>
                      <span className="font-mono text-[8px] leading-none text-muted">
                        {kanaToRomajiShort(k)}
                      </span>
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Result */}
      {ended && word && (
        <div className="gallery-expand mt-8 rounded-2xl border border-border bg-card p-6 text-center md:p-8">
          <p className={`text-2xl font-bold ${won ? "text-emerald-500" : ""}`}>
            {won ? t.games.kanaWordle.win : t.games.kanaWordle.lost}
          </p>
          <p className="mt-3 font-mono text-4xl tracking-widest">{word.kana}</p>
          <p className="mt-2 text-lg text-accent">
            {word.kana} — {word.meaning}
          </p>
          <div className="mt-1 flex flex-wrap items-center justify-center gap-2 font-mono text-xs text-muted">
            <span className="rounded px-2 py-0.5">
              {JLPT_LEVELS.find((l) => l.value === word.level)?.label}
            </span>
            <span>{word.kana.length} {t.games.kanaWordle.kana}</span>
          </div>
          <button
            type="button"
            onClick={nextRound}
            className="mt-5 rounded-lg bg-accent px-6 py-2.5 font-mono text-sm font-semibold text-background transition-opacity"
          >
            {t.games.kanaWordle.playAgain}
          </button>
        </div>
      )}
        </>
      )}
      <LeaderboardPanel
        key={level}
        game={GameSlug.Wordle}
        level={level as GameLevel}
        mode="streak"
        streak={streak}
      />
    </main>
  );
}
