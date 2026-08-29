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

const RECALL_LENGTHS: readonly number[] = [4, 5];
const SECONDS = 60;

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

export default function KanaSpeedGame() {
  const { t } = useI18n();
  const [level, setLevel] = useState<number>(5);
  const [phase, setPhase] = useState<Phase>("idle");
  const [timeLeft, setTimeLeft] = useState<number>(SECONDS);
  const [score, setScore] = useState(0);
  const [best, setBest] = useState<number>(() => loadStats().best);
  const [word, setWord] = useState<KanaWord | null>(null);
  const [input, setInput] = useState("");
  const [mounted, setMounted] = useState(false);
  const scoreRef = useRef(0);
  const endTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const currentKana = romajiToKana(input);

  const startRound = useCallback((levelArg: number) => {
    const nw = drawWord(levelArg, pickLength());
    setWord(nw);
    setInput("");
  }, []);

  const changeLevel = useCallback(
    (l: number) => {
      setLevel(l);
      if (phase === "running") startRound(l);
    },
    [phase, startRound]
  );

  const begin = useCallback(
    (levelArg: number) => {
      if (endTimerRef.current) clearTimeout(endTimerRef.current);
      scoreRef.current = 0;
      setScore(0);
      setTimeLeft(SECONDS);
      setPhase("running");
      startRound(levelArg);
      endTimerRef.current = setTimeout(() => {
        setTimeLeft(0);
        setPhase("done");
        setBest((b) => Math.max(b, scoreRef.current));
      }, SECONDS * 1000);
    },
    [startRound]
  );

  const restart = useCallback(() => {
    begin(level);
  }, [begin, level]);

  const submit = useCallback(() => {
    if (phase !== "running" || !word) return;
    if (currentKana === word.kana) {
      scoreRef.current += 1;
      setScore(scoreRef.current);
    }
    startRound(level);
  }, [phase, word, currentKana, startRound, level]);

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
    return () => {
      if (endTimerRef.current) clearTimeout(endTimerRef.current);
    };
  }, []);

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
            {phase === "running" ? timeLeft : SECONDS}
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

        {phase === "running" && word && (
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

        {phase === "done" && (
          <div className="gallery-expand text-center">
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
