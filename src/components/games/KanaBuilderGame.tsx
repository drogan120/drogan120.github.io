"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useI18n } from "@/i18n";
import SettingsBar from "@/components/shared/SettingsBar";
import {
  JLPT_LEVELS,
  drawWord,
  WORD_LENGTHS,
  type KanaWord,
} from "@/data/kanaWords";
import { splitKana } from "@/lib/romaji";
import { GameSlug, type GameLevel } from "@/lib/games";
import {
  parseLevelBests,
  withLevelBest,
  type LevelBests,
} from "@/lib/gameStats";
import LeaderboardPanel from "./LeaderboardPanel";

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
    const saved = localStorage.getItem("wordBuilder.stats");
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

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function KanaBuilderGame() {
  const { t } = useI18n();
  const [level, setLevel] = useState<number>(5);
  const [length, setLength] = useState<number>(4);
  const [score, setScore] = useState<number>(() => loadStats().score);
  const [streak, setStreak] = useState<number>(() => loadStats().streak);
  const [best, setBest] = useState<number>(() => loadStats().best);
  const [bestByLevel, setBestByLevel] = useState<LevelBests>(
    () => loadStats().bestByLevel
  );
  const [word, setWord] = useState<KanaWord | null>(null);
  const [tiles, setTiles] = useState<string[]>([]);
  const [built, setBuilt] = useState<string[]>([]);
  const [result, setResult] = useState<"won" | "lost" | null>(null);
  const [mounted, setMounted] = useState(false);

  const startRound = useCallback(
    (levelArg: number, lengthArg: number) => {
      const nw = drawWord(levelArg, lengthArg);
      if (!nw) {
        setWord(null);
        setTiles([]);
        setBuilt([]);
        setResult(null);
        return;
      }
      setWord(nw);
      setTiles(shuffle(splitKana(nw.kana)));
      setBuilt([]);
      setResult(null);
    },
    []
  );

  const handleConfig = useCallback(
    (newLevel: number, newLength: number) => {
      setLevel(newLevel);
      setLength(newLength);
      startRound(newLevel, newLength);
    },
    [startRound]
  );

  const tap = useCallback(
    (tile: string) => {
      if (result || !word) return;
      const idx = tiles.indexOf(tile);
      if (idx === -1) return;
      setBuilt((b) => [...b, tile]);
      setTiles((ts) => ts.filter((_, i) => i !== idx));
    },
    [result, word, tiles]
  );

  const clear = useCallback(() => {
    if (result || !word) return;
    setTiles(shuffle(splitKana(word.kana)));
    setBuilt([]);
  }, [result, word]);

  const check = useCallback(() => {
    if (result || !word) return;
    const assembled = built.join("");
    if (assembled === word.kana) {
      const runLevel = word.level as GameLevel;
      setResult("won");
      setScore((s) => s + 1);
      setStreak((s) => {
        const ns = s + 1;
        setBest((b) => Math.max(b, ns));
        setBestByLevel((bests) => withLevelBest(bests, runLevel, ns));
        return ns;
      });
    } else {
      setResult("lost");
      setStreak(0);
    }
  }, [result, word, built]);

  const next = useCallback(() => {
    startRound(level, length);
  }, [startRound, level, length]);

  useEffect(() => {
    if (!mounted) return;
    try {
      localStorage.setItem(
        "wordBuilder.stats",
        JSON.stringify({ score, streak, best, bestByLevel })
      );
    } catch {
      /* ignore */
    }
  }, [score, streak, best, bestByLevel, mounted]);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setMounted(true);
      startRound(5, 4);
    });
    return () => cancelAnimationFrame(frame);
  }, [startRound]);

  useEffect(() => {
    if (!result) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault();
        next();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [result, next]);

  if (!mounted) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-12 md:py-16">
        <BuilderHeader title={t.games.wordBuilder.title} tagline={t.games.wordBuilder.tagline} />
        <div className="mt-8 rounded-2xl border border-border bg-card p-10 text-center font-mono text-muted">
          {t.games.wordBuilder.loading}
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-12 md:py-16">
      <BuilderHeader title={t.games.wordBuilder.title} tagline={t.games.wordBuilder.tagline} />

      {/* Config */}
      <div className="mt-8 rounded-2xl border border-border bg-card p-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <p className="mb-2 font-mono text-[11px] uppercase tracking-widest text-muted">
              {t.games.wordBuilder.jlptLevel}
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
              {t.games.wordBuilder.wordLength}
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
                  {len} {t.games.wordBuilder.kana}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-6 grid grid-cols-3 gap-3 text-center">
        <StatBox value={score} label={t.games.wordBuilder.correct} accent />
        <StatBox value={streak} label={t.games.wordBuilder.streak} />
        <StatBox value={best} label={t.games.wordBuilder.best} />
      </div>

      {/* Card */}
      <div className="mt-6 rounded-2xl border border-border bg-card p-6 md:p-8">
        {word && tiles.length + built.length === word.kana.length ? (
          <div className="text-center">
            <p className="font-mono text-[11px] uppercase tracking-widest text-muted">
              {t.games.wordBuilder.buildFor}
            </p>
            <p className="mt-3 text-3xl font-bold leading-tight text-foreground md:text-4xl">
              {word.meaning}
            </p>

            {/* Built slots */}
            <div className="mt-6 flex justify-center gap-1.5">
              {Array.from({ length: word.kana.length }).map((_, i) => (
                <div
                  key={i}
                  className={`flex h-12 w-12 items-center justify-center rounded-lg border-2 font-mono text-2xl transition-colors ${
                    built[i]
                      ? "border-accent text-foreground"
                      : "border-border"
                  }`}
                >
                  {built[i] ?? ""}
                </div>
              ))}
            </div>
            <p className="mt-2 font-mono text-xs text-muted">
              {t.games.wordBuilder.tapTiles}
            </p>

            {/* Tiles */}
            <div className="mt-4 flex flex-wrap justify-center gap-1.5">
              {tiles.map((tile, i) => (
                <button
                  key={`${tile}-${i}`}
                  type="button"
                  onClick={() => tap(tile)}
                  disabled={!!result}
                  className="pop-on-click flex h-12 w-12 items-center justify-center rounded-lg border border-border font-mono text-2xl transition-colors hover:border-accent hover:text-accent disabled:cursor-default"
                >
                  {tile}
                </button>
              ))}
            </div>

            <div className="mt-6 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={clear}
                disabled={!!result || built.length === 0}
                className="rounded-lg border border-border px-4 py-2.5 font-mono text-sm transition-colors hover:border-accent hover:text-accent disabled:cursor-not-allowed disabled:opacity-40"
              >
                ↺ {t.games.wordBuilder.clear}
              </button>
              <button
                type="button"
                onClick={check}
                disabled={!!result || built.length !== word.kana.length}
                className="rounded-lg bg-accent px-6 py-2.5 font-mono text-sm font-semibold text-background transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
              >
                {t.games.wordBuilder.check}
              </button>
            </div>

            {result && (
              <div className="gallery-expand mt-6">
                <p
                  className={`text-xl font-bold ${
                    result === "won" ? "text-emerald-500" : "text-red-400"
                  }`}
                >
                  {result === "won"
                    ? t.games.wordBuilder.won
                    : t.games.wordBuilder.lost}
                </p>
                <p className="mt-2 font-mono text-2xl tracking-widest">
                  {word.kana} — {word.meaning}
                </p>
                <button
                  type="button"
                  onClick={next}
                  className="mt-4 rounded-lg bg-accent px-6 py-2.5 font-mono text-sm font-semibold text-background transition-opacity"
                >
                  {t.games.wordBuilder.nextWord}
                </button>
              </div>
            )}
          </div>
        ) : (
          <p className="text-center font-mono text-muted">
            {t.games.wordBuilder.empty}
          </p>
        )}
      </div>
      <LeaderboardPanel
        key={level}
        game={GameSlug.Builder}
        level={level as GameLevel}
        mode="streak"
        streak={streak}
      />
    </main>
  );
}

function BuilderHeader({ title, tagline }: { title: string; tagline: string }) {
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
          かなビルダー <span className="text-accent">{pretty}</span>
        </h1>
        <p className="mt-3 max-w-xl text-muted">{tagline}</p>
      </div>
      <SettingsBar />
    </div>
  );
}

function StatBox({
  value,
  label,
  accent,
}: {
  value: number;
  label: string;
  accent?: boolean;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-3">
      <p
        className={`font-mono text-2xl font-bold ${accent ? "text-accent" : ""}`}
      >
        {value}
      </p>
      <p className="font-mono text-[10px] uppercase tracking-widest text-muted">
        {label}
      </p>
    </div>
  );
}
