"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useI18n } from "@/i18n";
import SettingsBar from "@/components/shared/SettingsBar";
import {
  JLPT_LEVELS,
  drawWord,
  type KanaWord,
} from "@/data/kanaWords";
import { romajiToKana, splitKana } from "@/lib/romaji";
import { recordMiss } from "@/lib/reviewStore";
import { GameSlug, type GameLevel } from "@/lib/games";
import {
  parseLevelBests,
  withLevelBest,
  type LevelBests,
} from "@/lib/gameStats";
import LeaderboardPanel from "./LeaderboardPanel";

const RECALL_LENGTHS: readonly number[] = [4, 5];

function pickRecallLength(): number {
  return RECALL_LENGTHS[Math.floor(Math.random() * RECALL_LENGTHS.length)];
}

type Stage = "playing" | "revealed";

type Stats = {
  score: number;
  streak: number;
  best: number;
  bestByLevel: LevelBests;
};

function loadStats(): Stats {
  const empty: Stats = { score: 0, streak: 0, best: 0, bestByLevel: {} };
  if (typeof window === "undefined") return empty;
  try {
    const saved = localStorage.getItem("kanaRecall.stats");
    if (!saved) return empty;
    const s = JSON.parse(saved);
    return {
      score: typeof s.score === "number" ? s.score : 0,
      streak: typeof s.streak === "number" ? s.streak : 0,
      best: typeof s.best === "number" ? s.best : 0,
      bestByLevel: parseLevelBests(s.bestByLevel),
    };
  } catch {
    return empty;
  }
}

export default function KanaRecallGame() {
  const { t } = useI18n();
  const [level, setLevel] = useState<number>(5);
  const [score, setScore] = useState<number>(() => loadStats().score);
  const [streak, setStreak] = useState<number>(() => loadStats().streak);
  const [best, setBest] = useState<number>(() => loadStats().best);
  const [bestByLevel, setBestByLevel] = useState<LevelBests>(
    () => loadStats().bestByLevel
  );
  const [word, setWord] = useState<KanaWord | null>(null);
  const [input, setInput] = useState("");
  const [stage, setStage] = useState<Stage>("playing");
  const [correct, setCorrect] = useState(false);
  const [mounted, setMounted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const currentKana = romajiToKana(input);
  const complete = currentKana.length === (word?.kana.length ?? 0);

  const startRound = useCallback((levelArg = level) => {
    const nw = drawWord(levelArg, pickRecallLength());
    setWord(nw);
    setInput("");
    setStage("playing");
    setCorrect(false);
    inputRef.current?.focus();
  }, [level]);

  const changeLevel = useCallback((l: number) => {
    setLevel(l);
    startRound(l);
  }, [startRound]);

  const submit = useCallback(() => {
    if (!word || stage !== "playing") return;
    const isCorrect = currentKana === word.kana;
    setCorrect(isCorrect);
    setStage("revealed");
    if (isCorrect) {
      const runLevel = word.level as GameLevel;
      setScore((s) => s + 1);
      setStreak((s) => {
        const ns = s + 1;
        setBest((b) => Math.max(b, ns));
        setBestByLevel((bests) => withLevelBest(bests, runLevel, ns));
        return ns;
      });
    } else {
      setStreak(0);
      recordMiss({
        kind: "kana",
        kana: word.kana,
        meaning: word.meaning,
        level: word.level,
      });
    }
  }, [word, stage, currentKana]);

  const next = useCallback(() => {
    setBest((b) => Math.max(b, score));
    startRound();
  }, [startRound, score]);

  useEffect(() => {
    if (stage !== "playing" || !word) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault();
        submit();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [stage, word, submit]);

  useEffect(() => {
    if (stage !== "revealed") return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault();
        next();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [stage, next]);

  useEffect(() => {
    if (!mounted) return;
    try {
      localStorage.setItem(
        "kanaRecall.stats",
        JSON.stringify({ score, streak, best, bestByLevel })
      );
    } catch {
      // ignore quota / private-mode errors
    }
  }, [score, streak, best, bestByLevel, mounted]);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setMounted(true);
      startRound();
    });
    return () => cancelAnimationFrame(frame);
  }, [startRound]);

  const rows = useMemo(
    () => Array.from({ length: word?.kana.length ?? 1 }),
    [word]
  );

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
            かなリコール <span className="text-accent">Kana Recall</span>
          </h1>
          <p className="mt-3 max-w-xl text-muted">
            {t.games.kanaRecall.tagline}
          </p>
        </div>
        <SettingsBar />
      </div>

      {/* Config */}
      <div className="mt-8 rounded-2xl border border-border bg-card p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="font-mono text-[11px] uppercase tracking-widest text-muted">
            {t.games.kanaRecall.jlptLevel}
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

      {/* Stats */}
      <div className="mt-6 grid grid-cols-3 gap-3 text-center">
        <div className="rounded-xl border border-border bg-card p-3">
          <p className="font-mono text-2xl font-bold text-accent">{score}</p>
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted">
            {t.games.kanaRecall.correct}
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-3">
          <p className="font-mono text-2xl font-bold">{streak}</p>
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted">
            {t.games.kanaRecall.streak}
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-3">
          <p className="font-mono text-2xl font-bold">{best}</p>
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted">
            {t.games.kanaRecall.best}
          </p>
        </div>
      </div>

      {/* Card */}
      <div className="mt-6 rounded-2xl border border-border bg-card p-6 md:p-8">
        {word && stage === "playing" ? (
          <div className="text-center">
            <p className="font-mono text-[11px] uppercase tracking-widest text-muted">
              {t.games.kanaRecall.typeFor}
            </p>
            <p className="mt-3 text-3xl font-bold leading-tight md:text-4xl">
              {word.meaning}
            </p>
            <div className="mt-4 flex justify-center gap-1.5">
              {rows.map((_, i) => (
                <div
                  key={i}
                  className="flex h-11 w-11 items-center justify-center rounded-lg border-2 border-dashed border-border font-mono text-xl"
                >
                </div>
              ))}
            </div>

            <div className="mt-5 flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value.replace(/\s/g, ""))}
                autoFocus
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck={false}
                placeholder={t.games.kanaRecall.typeHint}
                aria-label={t.games.kanaRecall.ariaType}
                className={`w-full rounded-lg border bg-background px-4 py-3 text-center font-mono text-2xl tracking-widest outline-none placeholder:text-muted/60 ${
                  complete ? "border-accent text-foreground" : "border-border"
                }`}
              />
              <button
                type="button"
                onClick={submit}
                disabled={!complete}
                className="h-12 shrink-0 rounded-lg bg-accent px-6 font-mono text-sm font-semibold text-background transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
              >
                {t.games.kanaRecall.enter}
              </button>
            </div>

            <p className="mt-2 font-mono text-xs text-muted">
              {currentKana} {currentKana ? `(${splitKana(currentKana).length}/${word.kana.length})` : ""}
            </p>
          </div>
        ) : word && stage === "revealed" ? (
          <div className="gallery-expand text-center">
            <p className={`text-2xl font-bold ${correct ? "text-emerald-500" : "text-red-400"}`}>
              {correct ? t.games.kanaRecall.won : t.games.kanaRecall.lost}
            </p>
            <p className="mt-3 font-mono text-3xl tracking-widest md:text-4xl">
              {word.kana}
            </p>
            <p className="mt-2 text-lg text-accent">
              {word.kana} — {word.meaning}
            </p>
            <p className="mt-1 font-mono text-xs text-muted">
              {JLPT_LEVELS.find((l) => l.value === word.level)?.label} · {word.kana.length} {t.games.kanaRecall.kana}
            </p>
            <button
              type="button"
              onClick={next}
              className="mt-5 rounded-lg bg-accent px-6 py-2.5 font-mono text-sm font-semibold text-background transition-opacity"
            >
              {t.games.kanaRecall.nextWord}
            </button>
          </div>
        ) : !mounted ? (
          <p className="text-center font-mono text-muted">{t.games.kanaRecall.loading}</p>
        ) : (
          <p className="text-center font-mono text-muted">
            {t.games.kanaRecall.empty}
          </p>
        )}
      </div>
      <LeaderboardPanel
        key={level}
        game={GameSlug.Recall}
        level={level as GameLevel}
        mode="streak"
        streak={streak}
      />
    </main>
  );
}
