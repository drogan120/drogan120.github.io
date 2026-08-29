"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useI18n } from "@/i18n";
import SettingsBar from "@/components/shared/SettingsBar";
import { JLPT_LEVELS, drawKanji, type KanjiWord } from "@/data/kanjiWords";
import { romajiToKana, splitKana } from "@/lib/romaji";

type Stats = { score: number; streak: number; best: number };

function loadStats(): Stats {
  const empty: Stats = { score: 0, streak: 0, best: 0 };
  if (typeof window === "undefined") return empty;
  try {
    const saved = localStorage.getItem("kanjiReading.stats");
    if (!saved) return empty;
    const s = JSON.parse(saved);
    return {
      score: typeof s.score === "number" ? s.score : 0,
      streak: typeof s.streak === "number" ? s.streak : 0,
      best: typeof s.best === "number" ? s.best : 0,
    };
  } catch {
    return empty;
  }
}

type Stage = "playing" | "revealed";

export default function KanjiReadingGame() {
  const { t } = useI18n();
  const [level, setLevel] = useState<number>(5);
  const [score, setScore] = useState<number>(() => loadStats().score);
  const [streak, setStreak] = useState<number>(() => loadStats().streak);
  const [best, setBest] = useState<number>(() => loadStats().best);
  const [word, setWord] = useState<KanjiWord | null>(null);
  const [input, setInput] = useState("");
  const [stage, setStage] = useState<Stage>("playing");
  const [correct, setCorrect] = useState(false);
  const [mounted, setMounted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const currentKana = romajiToKana(input);
  const complete =
    currentKana.length === (word?.reading.length ?? 0) &&
    currentKana.length > 0;

  const startRound = useCallback((levelArg: number) => {
    const nw = drawKanji(levelArg);
    setWord(nw);
    setInput("");
    setStage("playing");
    setCorrect(false);
    inputRef.current?.focus();
  }, []);

  const changeLevel = useCallback(
    (l: number) => {
      setLevel(l);
      startRound(l);
    },
    [startRound]
  );

  const onInputChange = useCallback(
    (value: string) => {
      if (!word) return;
      const kana = romajiToKana(value.replace(/\s/g, ""));
      if (kana.length > word.reading.length) return; // block overflow
      setInput(value.replace(/\s/g, ""));
    },
    [word]
  );

  const submit = useCallback(() => {
    if (!word || stage !== "playing") return;
    const isCorrect = currentKana === word.reading;
    setCorrect(isCorrect);
    setStage("revealed");
    if (isCorrect) {
      setScore((s) => s + 1);
      setStreak((s) => {
        const ns = s + 1;
        setBest((b) => Math.max(b, ns));
        return ns;
      });
    } else {
      setStreak(0);
    }
  }, [word, stage, currentKana]);

  const next = useCallback(() => {
    startRound(level);
  }, [startRound, level]);

  useEffect(() => {
    if (!mounted) return;
    try {
      localStorage.setItem(
        "kanjiReading.stats",
        JSON.stringify({ score, streak, best })
      );
    } catch {
      /* ignore */
    }
  }, [score, streak, best, mounted]);

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
    const frame = requestAnimationFrame(() => {
      setMounted(true);
      startRound(5);
    });
    return () => cancelAnimationFrame(frame);
  }, [startRound]);

  const rows = useMemo(
    () => Array.from({ length: word?.reading.length ?? 1 }),
    [word]
  );

  if (!mounted) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-12 md:py-16">
        <Header
          title={t.games.kanjiReading.title}
          tagline={t.games.kanjiReading.tagline}
        />
        <div className="mt-8 rounded-2xl border border-border bg-card p-10 text-center font-mono text-muted">
          {t.games.kanjiReading.loading}
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-12 md:py-16">
      <Header
        title={t.games.kanjiReading.title}
        tagline={t.games.kanjiReading.tagline}
      />

      {/* Config */}
      <div className="mt-8 rounded-2xl border border-border bg-card p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="font-mono text-[11px] uppercase tracking-widest text-muted">
            {t.games.kanjiReading.jlptLevel}
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
        <StatBox value={score} label={t.games.kanjiReading.correct} accent />
        <StatBox value={streak} label={t.games.kanjiReading.streak} />
        <StatBox value={best} label={t.games.kanjiReading.best} />
      </div>

      {/* Card */}
      <div className="mt-6 rounded-2xl border border-border bg-card p-6 md:p-8">
        {word && stage === "playing" ? (
          <div className="text-center">
            <p className="font-mono text-[11px] uppercase tracking-widest text-muted">
              {t.games.kanjiReading.typeFor}
            </p>
            <p className="mt-3 text-3xl font-bold leading-tight tracking-widest md:text-4xl">
              {word.kanji}
            </p>
            <p className="mt-1 font-mono text-xs text-muted">
              {JLPT_LEVELS.find((l) => l.value === word.level)?.label}
            </p>
            <p className="mt-3 text-sm text-muted">
              <span className="font-mono text-[10px] uppercase tracking-widest">
                {t.games.kanjiReading.clue}
              </span>{" "}
              {word.meaning}
            </p>

            <div className="mt-4 flex justify-center gap-1.5">
              {rows.map((_, i) => (
                <div
                  key={i}
                  className="flex h-11 w-11 items-center justify-center rounded-lg border-2 border-dashed border-border font-mono text-xl"
                >
                  {splitKana(currentKana)[i] ?? ""}
                </div>
              ))}
            </div>

            <div className="mt-5 flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => onInputChange(e.target.value)}
                autoFocus
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck={false}
                placeholder={t.games.kanjiReading.typeReading}
                aria-label={t.games.kanjiReading.aria}
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
          </div>
        ) : word && stage === "revealed" ? (
          <div className="gallery-expand text-center">
            <p
              className={`text-2xl font-bold ${
                correct ? "text-emerald-500" : "text-red-400"
              }`}
            >
              {correct ? t.games.kanjiReading.won : t.games.kanjiReading.lost}
            </p>
            <p className="mt-3 font-mono text-4xl tracking-widest">
              {word.kanji}
            </p>
            <p className="mt-2 text-lg text-accent">
              {word.reading} — {word.meaning}
            </p>
            <button
              type="button"
              onClick={next}
              className="mt-5 rounded-lg bg-accent px-6 py-2.5 font-mono text-sm font-semibold text-background transition-opacity"
            >
              {t.games.kanjiReading.nextWord}
            </button>
          </div>
        ) : (
          <p className="text-center font-mono text-muted">
            {t.games.kanjiReading.empty}
          </p>
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
          漢字リーディング{" "}
          <span className="text-accent">{pretty}</span>
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
