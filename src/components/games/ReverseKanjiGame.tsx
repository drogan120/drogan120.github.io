"use client";

import { useCallback, useEffect, useState } from "react";
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
    const saved = localStorage.getItem("reverseKanji.stats");
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

function buildKanjiOptions(target: KanjiWord): string[] {
  const pool = kanjiWordsForLevel(target.level).filter(
    (w) => w.kanji !== target.kanji && w.meaning !== target.meaning
  );
  const distractors = shuffle(pool)
    .slice(0, 3)
    .map((w) => w.kanji);
  while (distractors.length < 3) distractors.push("？");
  return shuffle([target.kanji, ...distractors]);
}

export default function ReverseKanjiGame() {
  const { t } = useI18n();
  const [level, setLevel] = useState<number>(5);
  const [score, setScore] = useState<number>(() => loadStats().score);
  const [streak, setStreak] = useState<number>(() => loadStats().streak);
  const [best, setBest] = useState<number>(() => loadStats().best);
  const [bestByLevel, setBestByLevel] = useState<LevelBests>(
    () => loadStats().bestByLevel
  );
  const [word, setWord] = useState<KanjiWord | null>(null);
  const [options, setOptions] = useState<string[]>([]);
  const [picked, setPicked] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  const startRound = useCallback((levelArg: number) => {
    const nextWord = drawKanji(levelArg);
    if (!nextWord) {
      setWord(null);
      setOptions([]);
      return;
    }
    setWord(nextWord);
    setOptions(buildKanjiOptions(nextWord));
    setPicked(null);
  }, []);

  const changeLevel = useCallback(
    (l: number) => {
      setLevel(l);
      startRound(l);
    },
    [startRound]
  );

  const pick = useCallback(
    (opt: string) => {
      if (!word || picked) return;
      setPicked(opt);
      if (opt === word.kanji) {
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
          kind: "kanji",
          kanji: word.kanji,
          reading: word.reading,
          meaning: word.meaning,
          level: word.level,
        });
      }
    },
    [word, picked]
  );

  const next = useCallback(() => {
    startRound(level);
  }, [startRound, level]);

  useEffect(() => {
    if (!mounted) return;
    try {
      localStorage.setItem(
        "reverseKanji.stats",
        JSON.stringify({ score, streak, best, bestByLevel })
      );
    } catch {
      /* ignore */
    }
  }, [score, streak, best, bestByLevel, mounted]);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setMounted(true);
      startRound(5);
    });
    return () => cancelAnimationFrame(frame);
  }, [startRound]);

  useEffect(() => {
    if (!picked) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault();
        next();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [picked, next]);

  const headerTitle = t.games.reverseKanji.title;
  const headerTagline = t.games.reverseKanji.tagline;

  if (!mounted) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-12 md:py-16">
        <Header title={headerTitle} tagline={headerTagline} />
        <div className="mt-8 rounded-2xl border border-border bg-card p-10 text-center font-mono text-muted">
          {t.games.reverseKanji.loading}
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
            {t.games.reverseKanji.jlptLevel}
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
        <StatBox value={score} label={t.games.reverseKanji.correct} accent />
        <StatBox value={streak} label={t.games.reverseKanji.streak} />
        <StatBox value={best} label={t.games.reverseKanji.best} />
      </div>

      {/* Card */}
      <div className="mt-6 rounded-2xl border border-border bg-card p-6 md:p-8">
        {word && options.length > 0 ? (
          <div className="text-center">
            <p className="font-mono text-[11px] uppercase tracking-widest text-muted">
              {t.games.reverseKanji.typeFor}
            </p>
            <p className="mt-3 text-3xl font-bold leading-tight md:text-4xl">
              {word.meaning}
            </p>
            <p className="mt-1 font-mono text-xs text-muted">
              {word.reading}
            </p>

            <div className="mx-auto mt-6 grid max-w-lg grid-cols-2 gap-2.5">
              {options.map((opt) => {
                const isAnswer = opt === word.kanji;
                const isPicked = opt === picked;
                let cls =
                  "bg-background border border-border text-foreground hover:border-accent hover:text-accent";
                if (picked) {
                  if (isAnswer) cls = "bg-emerald-500 border-emerald-400 text-white";
                  else if (isPicked) cls = "bg-red-400 border-red-300 text-black";
                  else cls = "bg-border/40 border-border text-foreground/50";
                }
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => pick(opt)}
                    disabled={!!picked}
                    aria-label={`${opt}. ${t.games.reverseKanji.aria}`}
                    className={`pop-on-click rounded-xl px-4 py-4 text-2xl font-bold tracking-widest transition-colors disabled:cursor-default ${cls}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>

            {picked && (
              <div className="gallery-expand mt-6">
                <p
                  className={`text-xl font-bold ${
                    picked === word.kanji
                      ? "text-emerald-500"
                      : "text-red-400"
                  }`}
                >
                  {picked === word.kanji
                    ? t.games.reverseKanji.won
                    : `${t.games.reverseKanji.lost} ${word.kanji} (${word.reading} — ${word.meaning})`}
                </p>
                <button
                  type="button"
                  onClick={next}
                  className="mt-4 rounded-lg bg-accent px-6 py-2.5 font-mono text-sm font-semibold text-background transition-opacity"
                >
                  {t.games.reverseKanji.nextWord}
                </button>
              </div>
            )}
          </div>
        ) : (
          <p className="text-center font-mono text-muted">
            {t.games.reverseKanji.empty}
          </p>
        )}
      </div>
      <LeaderboardPanel
        key={level}
        game={GameSlug.ReverseKanji}
        level={level as GameLevel}
        mode="streak"
        streak={streak}
      />
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
          逆漢字 <span className="text-accent">{pretty}</span>
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