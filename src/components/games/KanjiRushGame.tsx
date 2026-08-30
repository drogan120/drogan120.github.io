"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useI18n } from "@/i18n";
import SettingsBar from "@/components/shared/SettingsBar";
import {
  JLPT_LEVELS,
  drawKanji,
  kanjiWordsForLevel,
  type KanjiWord,
} from "@/data/kanjiWords";
import { recordMiss } from "@/lib/reviewStore";
import { GameSlug, type GameLevel } from "@/lib/games";
import LeaderboardPanel from "./LeaderboardPanel";

const DURATION_PRESETS: readonly number[] = [30, 60, 90, 120];
const DEFAULT_SECONDS = 60;
const CORRECT_FLASH_MS = 500;
const WRONG_FLASH_MS = 1800;

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildMeaningOptions(target: KanjiWord): string[] {
  const pool = kanjiWordsForLevel(target.level).filter(
    (w) => w.kanji !== target.kanji && w.meaning !== target.meaning
  );
  const distractors = shuffle(pool)
    .slice(0, 3)
    .map((w) => w.meaning);
  while (distractors.length < 3) distractors.push("…");
  return shuffle([target.meaning, ...distractors]);
}

type Stats = { best: number };

function loadStats(): Stats {
  const empty: Stats = { best: 0 };
  if (typeof window === "undefined") return empty;
  try {
    const saved = localStorage.getItem("kanjiRush.stats");
    if (!saved) return empty;
    const s = JSON.parse(saved);
    return { best: typeof s.best === "number" ? s.best : 0 };
  } catch {
    return empty;
  }
}

type Phase = "idle" | "running" | "done";

type Picked = { option: string; correct: boolean } | null;

export default function KanjiRushGame() {
  const { t } = useI18n();
  const [level, setLevel] = useState<GameLevel>(5);
  const [seconds, setSeconds] = useState<number>(DEFAULT_SECONDS);
  const [phase, setPhase] = useState<Phase>("idle");
  const [timeLeft, setTimeLeft] = useState<number>(DEFAULT_SECONDS);
  const [score, setScore] = useState(0);
  const [best, setBest] = useState<number>(() => loadStats().best);
  const [word, setWord] = useState<KanjiWord | null>(null);
  const [options, setOptions] = useState<string[]>([]);
  const [picked, setPicked] = useState<Picked>(null);
  const [mounted, setMounted] = useState(false);
  const scoreRef = useRef(0);
  const endTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const advanceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const startRound = useCallback((roundLevel: number) => {
    const nextWord = drawKanji(roundLevel);
    if (!nextWord) {
      setWord(null);
      setOptions([]);
      return;
    }
    setWord(nextWord);
    setOptions(buildMeaningOptions(nextWord));
    setPicked(null);
  }, []);

  const clearTimers = useCallback(() => {
    if (endTimerRef.current) clearTimeout(endTimerRef.current);
    if (advanceTimerRef.current) clearTimeout(advanceTimerRef.current);
  }, []);

  const changeLevel = useCallback(
    (l: GameLevel) => {
      setLevel(l);
      if (phase === "running") startRound(l);
    },
    [phase, startRound]
  );

  const changeDuration = useCallback((s: number) => {
    setSeconds(s);
    if (phase !== "running") setTimeLeft(s);
  }, [phase]);

  const begin = useCallback(
    (levelArg: number) => {
      clearTimers();
      scoreRef.current = 0;
      setScore(0);
      setTimeLeft(seconds);
      setPhase("running");
      startRound(levelArg);
      endTimerRef.current = setTimeout(() => {
        setTimeLeft(0);
        setPhase("done");
        setPicked(null);
        setWord(null);
        setBest((b) => Math.max(b, scoreRef.current));
      }, seconds * 1000);
    },
    [clearTimers, seconds, startRound]
  );

  const restart = useCallback(() => {
    begin(level);
  }, [begin, level]);

  const pick = useCallback(
    (option: string) => {
      if (phase !== "running" || !word || picked) return;
      const isCorrect = option === word.meaning;
      setPicked({ option, correct: isCorrect });
      if (isCorrect) {
        scoreRef.current += 1;
        setScore(scoreRef.current);
      } else {
        recordMiss({
          kind: "kanji",
          kanji: word.kanji,
          reading: word.reading,
          meaning: word.meaning,
          level: word.level,
        });
      }
      advanceTimerRef.current = setTimeout(() => {
        startRound(level);
      }, isCorrect ? CORRECT_FLASH_MS : WRONG_FLASH_MS);
    },
    [phase, word, picked, startRound, level]
  );

  useEffect(() => {
    if (!mounted) return;
    try {
      localStorage.setItem("kanjiRush.stats", JSON.stringify({ best }));
    } catch {
      /* ignore */
    }
  }, [best, mounted]);

  useEffect(() => {
    if (phase !== "running") return;
    const id = setInterval(() => {
      setTimeLeft((tl) => Math.max(0, tl - 1));
    }, 1000);
    return () => clearInterval(id);
  }, [phase]);

  useEffect(() => {
    return () => clearTimers();
  }, [clearTimers]);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  const headerTitle = t.games.kanjiRush.title;
  const headerTagline = t.games.kanjiRush.tagline;

  if (!mounted) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-12 md:py-16">
        <Header title={headerTitle} tagline={headerTagline} />
        <div className="mt-8 rounded-2xl border border-border bg-card p-10 text-center font-mono text-muted">
          {t.games.kanjiRush.loading}
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-12 md:py-16">
      <Header title={headerTitle} tagline={headerTagline} />

      {/* Config */}
      <div className="mt-8 rounded-2xl border border-border bg-card p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="font-mono text-[11px] uppercase tracking-widest text-muted">
            {t.games.kanjiRush.jlptLevel}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {JLPT_LEVELS.map((l) => (
              <button
                key={l.value}
                type="button"
                onClick={() => changeLevel(l.value)}
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
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-3">
          <p className="font-mono text-[11px] uppercase tracking-widest text-muted">
            {t.games.kanjiRush.seconds}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {DURATION_PRESETS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => changeDuration(s)}
                className={`pop-on-click rounded-lg px-3 py-1.5 font-mono text-xs transition-colors ${
                  seconds === s
                    ? "bg-accent font-semibold text-background"
                    : "bg-background border border-border text-muted hover:border-accent hover:text-accent"
                }`}
              >
                {s}s
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Timer + stats */}
      <div className="mt-6 grid grid-cols-3 gap-3 text-center">
        <div className="rounded-xl border border-border bg-card p-3">
          <p className="font-mono text-2xl font-bold text-accent">{score}</p>
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted">
            {t.games.kanjiRush.correct}
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-3">
          <p className="font-mono text-2xl font-bold">{best}</p>
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted">
            {t.games.kanjiRush.best}
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-3">
          <p
            className={`font-mono text-2xl font-bold ${
              phase === "running" && timeLeft <= 10 ? "text-red-400" : ""
            }`}
          >
            {phase === "running" ? timeLeft : seconds}
          </p>
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted">
            {t.games.kanjiRush.timeLeft}
          </p>
        </div>
      </div>

      {/* Card */}
      <div className="mt-6 rounded-2xl border border-border bg-card p-6 md:p-8">
        {phase === "idle" && (
          <div className="text-center">
            <p className="text-lg text-muted">{t.games.kanjiRush.tagline}</p>
            <button
              type="button"
              onClick={restart}
              className="mt-6 rounded-lg bg-accent px-8 py-3 font-mono text-sm font-semibold text-background transition-opacity"
            >
              ▶ {t.games.kanjiRush.start}
            </button>
          </div>
        )}

        {phase === "running" && word && options.length > 0 && (
          <div className="text-center">
            <p className="font-mono text-[11px] uppercase tracking-widest text-muted">
              {t.games.kanjiRush.typeFor}
            </p>
            <p className="mt-3 text-4xl font-bold tracking-widest md:text-5xl">
              {word.kanji}
            </p>
            <p className="mt-1 font-mono text-xs text-muted">
              {word.reading} ·{" "}
              {JLPT_LEVELS.find((l) => l.value === word.level)?.label}
            </p>

            <div className="mx-auto mt-6 grid max-w-lg grid-cols-2 gap-2.5">
              {options.map((option) => {
                const isAnswer = option === word.meaning;
                const isPicked = picked?.option === option;
                let cls =
                  "bg-background border border-border text-foreground hover:border-accent hover:text-accent";
                if (picked) {
                  if (isAnswer) cls = "bg-emerald-500 border-emerald-400 text-white";
                  else if (isPicked) cls = "bg-red-400 border-red-300 text-black";
                  else cls = "bg-border/40 border-border text-foreground/50";
                }
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => pick(option)}
                    disabled={!!picked}
                    aria-label={`${option}. ${t.games.kanjiRush.aria}`}
                    className={`pop-on-click rounded-xl px-4 py-4 text-lg font-bold transition-colors disabled:cursor-default ${cls}`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {phase === "running" && picked && word && (
          <p
            className={`gallery-expand mt-6 text-center text-xl font-bold ${
              picked.correct ? "text-emerald-500" : "text-red-400"
            }`}
          >
            {picked.correct
              ? t.games.kanjiRush.won
              : `${t.games.kanjiRush.lost} ${word.meaning}`}
          </p>
        )}

        {phase === "done" && (
          <div className="gallery-expand">
            <div className="text-center">
              <p className="text-2xl font-bold">{t.games.kanjiRush.timeUp}</p>
              <p className="mt-4 font-mono text-5xl font-bold text-accent">
                {score}
              </p>
              <p className="mt-1 font-mono text-xs uppercase tracking-widest text-muted">
                {t.games.kanjiRush.score} · {t.games.kanjiRush.correct}
              </p>
              {score >= best && score > 0 && (
                <p className="mt-2 text-sm text-emerald-500">
                  🏆 {t.games.kanjiRush.best} {best}
                </p>
              )}
              <button
                type="button"
                onClick={restart}
                className="mt-6 rounded-lg bg-accent px-8 py-3 font-mono text-sm font-semibold text-background transition-opacity"
              >
                ↻ {t.games.kanjiRush.playAgain}
              </button>
            </div>
            <LeaderboardPanel
              key={level}
              game={GameSlug.KanjiRush}
              level={level}
              mode="final"
              score={score}
              finished={phase === "done"}
            />
          </div>
        )}
      </div>
    </main>
  );
}

function Header({ title, tagline }: { title: string; tagline: string }) {
  const { t } = useI18n();
  const pretty = title.split(" ").slice(1).join(" ");
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <Link
          href="/games"
          className="font-mono text-sm text-muted transition-colors hover:text-accent"
        >
          ← {t.default.nav.about} · games
        </Link>
        <h1 className="mt-4 text-3xl font-bold md:text-4xl">
          漢字ラッシュ <span className="text-accent">{pretty}</span>
        </h1>
        <p className="mt-3 max-w-xl text-muted">{tagline}</p>
      </div>
      <SettingsBar />
    </div>
  );
}