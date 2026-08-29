"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useI18n } from "@/i18n";
import SettingsBar from "@/components/shared/SettingsBar";
import {
  loadReviewDeck,
  clearCorrect,
  type ReviewEntry,
} from "@/lib/reviewStore";
import { romajiToKana, splitKana } from "@/lib/romaji";

type Stats = { score: number; streak: number; best: number };

function loadStats(): Stats {
  const empty: Stats = { score: 0, streak: 0, best: 0 };
  if (typeof window === "undefined") return empty;
  try {
    const saved = localStorage.getItem("review.stats");
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

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function wordText(entry: ReviewEntry): string {
  return entry.kind === "kana" ? entry.kana : entry.reading;
}

export default function ReviewGame() {
  const { t } = useI18n();
  const [score, setScore] = useState<number>(() => loadStats().score);
  const [streak, setStreak] = useState<number>(() => loadStats().streak);
  const [best, setBest] = useState<number>(() => loadStats().best);
  const [deck, setDeck] = useState<ReviewEntry[]>([]);
  const [index, setIndex] = useState(0);
  const [input, setInput] = useState("");
  const [stage, setStage] = useState<Stage>("playing");
  const [correct, setCorrect] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [finished, setFinished] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const entry = deck[index];
  const target = entry ? wordText(entry) : "";
  const currentKana = romajiToKana(input);
  const complete = currentKana.length === target.length && target.length > 0;

  const loadDeck = useCallback(() => {
    setDeck(shuffle(loadReviewDeck()));
    setIndex(0);
    setStage("playing");
    setCorrect(false);
    setFinished(false);
    setInput("");
    inputRef.current?.focus();
  }, []);

  const submit = useCallback(() => {
    if (!entry || stage !== "playing") return;
    const isCorrect = currentKana === target;
    setCorrect(isCorrect);
    setStage("revealed");
    if (isCorrect) {
      clearCorrect(entry);
      setScore((s) => s + 1);
      setStreak((s) => {
        const ns = s + 1;
        setBest((b) => Math.max(b, ns));
        return ns;
      });
    } else {
      setStreak(0);
    }
  }, [entry, stage, currentKana, target]);

  const advanceCorrect = useCallback(() => {
    const nextIndex = index + 1;
    if (nextIndex >= deck.length) {
      loadDeck();
      setFinished(true);
      setDeck([]);
      return;
    }
    setIndex(nextIndex);
    setInput("");
    setStage("playing");
    setCorrect(false);
    inputRef.current?.focus();
  }, [index, deck.length, loadDeck]);

  const advanceWrong = useCallback(() => {
    setDeck((d) => {
      if (d.length <= 1) return d;
      const next = [...d];
      const [item] = next.splice(index, 1);
      next.push(item);
      return next;
    });
    setInput("");
    setStage("playing");
    setCorrect(false);
    inputRef.current?.focus();
  }, [index]);

  const next = useCallback(() => {
    if (correct) advanceCorrect();
    else advanceWrong();
  }, [correct, advanceCorrect, advanceWrong]);

  useEffect(() => {
    if (!mounted) return;
    try {
      localStorage.setItem("review.stats", JSON.stringify({ score, streak, best }));
    } catch {
      /* ignore */
    }
  }, [score, streak, best, mounted]);

  useEffect(() => {
    if (stage !== "playing" || !entry) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault();
        if (complete) submit();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [stage, entry, complete, submit]);

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
      loadDeck();
    });
    return () => cancelAnimationFrame(frame);
  }, [loadDeck]);

  const rows = useMemo(
    () => Array.from({ length: target.length || 1 }),
    [target]
  );

  const headerTitle = t.games.review.title;
  const headerTagline = t.games.review.tagline;

  if (!mounted) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-12 md:py-16">
        <Header title={headerTitle} tagline={headerTagline} />
        <div className="mt-8 rounded-2xl border border-border bg-card p-10 text-center font-mono text-muted">
          {t.games.review.loading}
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-12 md:py-16">
      <Header title={headerTitle} tagline={headerTagline} />

      {/* Stats */}
      <div className="mt-6 grid grid-cols-3 gap-3 text-center">
        <StatBox value={score} label={t.games.review.correct} accent />
        <StatBox value={streak} label={t.games.review.streak} />
        <StatBox value={best} label={t.games.review.best} />
      </div>

      {/* Card */}
      <div className="mt-6 rounded-2xl border border-border bg-card p-6 md:p-8">
        {finished ? (
          <div className="gallery-expand text-center">
            <p className="text-2xl font-bold text-emerald-500">
              {t.games.review.completed}
            </p>
            <p className="mt-3 text-muted">{t.games.review.completedText}</p>
            <Link
              href="/games"
              className="mt-5 inline-block rounded-lg bg-accent px-6 py-2.5 font-mono text-sm font-semibold text-background transition-opacity hover:opacity-90"
            >
              {t.default.nav.about} · games
            </Link>
          </div>
        ) : !entry ? (
          <div className="text-center">
            <p className="text-muted">{t.games.review.empty}</p>
            <Link
              href="/games"
              className="mt-5 inline-block rounded-lg bg-accent px-6 py-2.5 font-mono text-sm font-semibold text-background transition-opacity hover:opacity-90"
            >
              {t.games.review.emptyCta}
            </Link>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between">
              <p className="font-mono text-[11px] uppercase tracking-widest text-muted">
                {index + 1} {t.games.review.of} {deck.length}
              </p>
              <p className="font-mono text-[11px] uppercase tracking-widest text-accent">
                {entry.kind === "kanji" ? "漢字" : "かな"}
              </p>
            </div>

            {stage === "playing" ? (
              <div className="text-center">
                <p className="mt-4 font-mono text-[11px] uppercase tracking-widest text-muted">
                  {t.games.review.typeFor}
                </p>
                <p className="mt-3 text-3xl font-bold tracking-widest md:text-5xl">
                  {entry.kind === "kana"
                    ? entry.meaning
                    : `${entry.kanji} · ${entry.meaning}`}
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
                    onChange={(e) =>
                      setInput(e.target.value.replace(/\s/g, ""))
                    }
                    autoFocus
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck={false}
                    placeholder={t.games.review.typeHint}
                    aria-label={t.games.review.aria}
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
                    {t.games.review.enter}
                  </button>
                </div>
              </div>
            ) : (
              <div className="gallery-expand text-center">
                <p
                  className={`text-2xl font-bold ${
                    correct ? "text-emerald-500" : "text-red-400"
                  }`}
                >
                  {correct ? t.games.review.won : t.games.review.lost}
                </p>
                <p className="mt-3 font-mono text-4xl tracking-widest">
                  {target}
                </p>
                <p className="mt-2 text-lg text-accent">
                  {entry.kind === "kana"
                    ? `${entry.kana} — ${entry.meaning}`
                    : `${entry.kanji} (${entry.reading}) — ${entry.meaning}`}
                </p>
                <button
                  type="button"
                  onClick={next}
                  className="mt-5 rounded-lg bg-accent px-6 py-2.5 font-mono text-sm font-semibold text-background transition-opacity"
                >
                  {t.games.review.nextWord}
                </button>
              </div>
            )}
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
          復習 <span className="text-accent">{pretty}</span>
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
