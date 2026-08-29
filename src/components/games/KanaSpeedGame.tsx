"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useI18n } from "@/i18n";
import SettingsBar from "@/components/shared/SettingsBar";
import {
  JLPT_LEVELS,
  drawWord,
  type KanaWord,
} from "@/data/kanaWords";
import { romajiToKana } from "@/lib/romaji";
import { recordMiss } from "@/lib/reviewStore";
import { GameSlug, type GameLevel } from "@/lib/games";
import LeaderboardPanel from "./LeaderboardPanel";

const RECALL_LENGTHS: readonly number[] = [4, 5];
const DURATION_PRESETS: readonly number[] = [15, 30, 60, 90, 120];
const DEFAULT_SECONDS = 60;
const CORRECT_FLASH_MS = 500;
const WRONG_FLASH_MS = 1800;

function pickLength(): number {
  return RECALL_LENGTHS[Math.floor(Math.random() * RECALL_LENGTHS.length)];
}

type Stats = { best: number };

function loadStats(): Stats {
  const empty: Stats = { best: 0 };
  if (typeof window === "undefined") return empty;
  try {
    const saved = localStorage.getItem("speedRecall.stats");
    if (!saved) return empty;
    const s = JSON.parse(saved);
    return { best: typeof s.best === "number" ? s.best : 0 };
  } catch {
    return empty;
  }
}

type Phase = "idle" | "running" | "done";

type Feedback = { word: KanaWord; correct: boolean } | null;

export default function KanaSpeedGame() {
  const { t } = useI18n();
  const [level, setLevel] = useState<GameLevel>(5);
  const [seconds, setSeconds] = useState<number>(DEFAULT_SECONDS);
  const [phase, setPhase] = useState<Phase>("idle");
  const [timeLeft, setTimeLeft] = useState<number>(DEFAULT_SECONDS);
  const [score, setScore] = useState(0);
  const [best, setBest] = useState<number>(() => loadStats().best);
  const [word, setWord] = useState<KanaWord | null>(null);
  const [input, setInput] = useState("");
  const [feedback, setFeedback] = useState<Feedback>(null);
  const [mounted, setMounted] = useState(false);
  const scoreRef = useRef(0);
  const endTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const advanceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const currentKana = romajiToKana(input);

  const startRound = useCallback((roundLevel: number) => {
    const nw = drawWord(roundLevel, pickLength());
    setWord(nw);
    setInput("");
    setFeedback(null);
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
        setFeedback(null);
        setBest((b) => Math.max(b, scoreRef.current));
      }, seconds * 1000);
    },
    [clearTimers, seconds, startRound]
  );

  const restart = useCallback(() => {
    begin(level);
  }, [begin, level]);

  const submit = useCallback(() => {
    if (phase !== "running" || !word || feedback) return;
    const isCorrect = currentKana === word.kana;
    if (isCorrect) {
      scoreRef.current += 1;
      setScore(scoreRef.current);
    } else {
      recordMiss({
        kind: "kana",
        kana: word.kana,
        meaning: word.meaning,
        level: word.level,
      });
    }
    setFeedback({ word, correct: isCorrect });
    advanceTimerRef.current = setTimeout(() => {
      startRound(level);
    }, isCorrect ? CORRECT_FLASH_MS : WRONG_FLASH_MS);
  }, [phase, word, feedback, currentKana, startRound, level]);

  useEffect(() => {
    if (!mounted) return;
    try {
      localStorage.setItem("speedRecall.stats", JSON.stringify({ best }));
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
    if (phase !== "running") return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault();
        submit();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase, submit]);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  if (!mounted) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-12 md:py-16">
        <SpeedHeader title={t.games.speedRecall.title} tagline={t.games.speedRecall.tagline} />
        <div className="mt-8 rounded-2xl border border-border bg-card p-10 text-center font-mono text-muted">
          {t.games.speedRecall.loading}
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-12 md:py-16">
      <SpeedHeader title={t.games.speedRecall.title} tagline={t.games.speedRecall.tagline} />

      {/* Config */}
      <div className="mt-8 rounded-2xl border border-border bg-card p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="font-mono text-[11px] uppercase tracking-widest text-muted">
            {t.games.speedRecall.jlptLevel}
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
            {t.games.speedRecall.seconds}
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
            {t.games.speedRecall.correct}
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-3">
          <p className="font-mono text-2xl font-bold">{best}</p>
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted">
            {t.games.speedRecall.best}
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
            {t.games.speedRecall.timeLeft}
          </p>
        </div>
      </div>

      {/* Card */}
      <div className="mt-6 rounded-2xl border border-border bg-card p-6 md:p-8">
        {phase === "idle" && (
          <div className="text-center">
            <p className="text-lg text-muted">{t.games.speedRecall.tagline}</p>
            <button
              type="button"
              onClick={restart}
              className="mt-6 rounded-lg bg-accent px-8 py-3 font-mono text-sm font-semibold text-background transition-opacity"
            >
              ▶ {t.games.speedRecall.start}
            </button>
          </div>
        )}

        {phase === "running" && word && !feedback && (
          <div className="text-center">
            <p className="font-mono text-[11px] uppercase tracking-widest text-muted">
              {t.games.speedRecall.typeFor}
            </p>
            <p className="mt-3 text-3xl font-bold leading-tight md:text-4xl">
              {word.meaning}
            </p>
            <div className="mx-auto mt-5 flex max-w-sm items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value.replace(/\s/g, ""))}
                autoFocus
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck={false}
                placeholder={t.games.speedRecall.nextWord}
                aria-label={t.games.speedRecall.aria}
                className="w-full rounded-lg border bg-background px-4 py-3 text-center font-mono text-2xl tracking-widest outline-none placeholder:text-muted/60 focus:border-accent"
              />
            </div>
            <p className="mt-3 font-mono text-xs text-muted">
              {currentKana || "…"}
            </p>
          </div>
        )}

        {phase === "running" && feedback && (
          <div className="gallery-expand text-center">
            <p
              className={`text-2xl font-bold ${
                feedback.correct ? "text-emerald-500" : "text-red-400"
              }`}
            >
              {feedback.correct
                ? t.games.kanaRecall.won
                : `${t.games.speedRecall.answerWas} ${feedback.word.kana}`}
            </p>
            <p className="mt-2 text-sm text-muted">
              {feedback.word.kana} — {feedback.word.meaning}
            </p>
          </div>
        )}

        {phase === "done" && (
          <div className="gallery-expand">
            <div className="text-center">
              <p className="text-2xl font-bold">{t.games.speedRecall.timeUp}</p>
              <p className="mt-4 font-mono text-5xl font-bold text-accent">
                {score}
              </p>
              <p className="mt-1 font-mono text-xs uppercase tracking-widest text-muted">
                {t.games.speedRecall.score} · {t.games.kanaRecall.correct}
              </p>
              {score >= best && score > 0 && (
                <p className="mt-2 text-sm text-emerald-500">
                  🏆 {t.games.speedRecall.best} {best}
                </p>
              )}
              <button
                type="button"
                onClick={restart}
                className="mt-6 rounded-lg bg-accent px-8 py-3 font-mono text-sm font-semibold text-background transition-opacity"
              >
                ↻ {t.games.speedRecall.playAgain}
              </button>
            </div>
            <LeaderboardPanel
              key={level}
              game={GameSlug.Speed}
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

function SpeedHeader({ title, tagline }: { title: string; tagline: string }) {
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
          スピードリコール{" "}
          <span className="text-accent">{pretty}</span>
        </h1>
        <p className="mt-3 max-w-xl text-muted">{tagline}</p>
      </div>
      <SettingsBar />
    </div>
  );
}
