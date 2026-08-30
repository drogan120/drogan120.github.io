"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useI18n } from "@/i18n";
import SettingsBar from "@/components/shared/SettingsBar";
import { JLPT_LEVELS, wordsForLevel, type KanaWord } from "@/data/kanaWords";
import { GameSlug, type GameLevel } from "@/lib/games";
import LeaderboardPanel from "./LeaderboardPanel";

const PAIR_COUNT = 6;
const WRONG_PAIR_FLIP_DELAY_MS = 900;
const POINTS_PER_PAIR = 10;

type CardKind = "kana" | "meaning";

type MemoryCard = {
  id: string;
  kind: CardKind;
  text: string;
  wordKey: string;
  matched: boolean;
};

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildBoard(level: number): MemoryCard[] {
  const picked = shuffle(wordsForLevel(level)).slice(0, PAIR_COUNT);
  const cards: MemoryCard[] = [];
  picked.forEach((word: KanaWord, index) =>
    cards.push(
      {
        id: `${index}-kana`,
        kind: "kana",
        text: word.kana,
        wordKey: word.kana,
        matched: false,
      },
      {
        id: `${index}-meaning`,
        kind: "meaning",
        text: word.meaning,
        wordKey: word.kana,
        matched: false,
      }
    )
  );
  return shuffle(cards);
}

type Stats = { best: number };

function loadStats(): Stats {
  const empty: Stats = { best: 0 };
  if (typeof window === "undefined") return empty;
  try {
    const saved = localStorage.getItem("kanaMemory.stats");
    if (!saved) return empty;
    const s = JSON.parse(saved);
    return { best: typeof s.best === "number" ? s.best : 0 };
  } catch {
    return empty;
  }
}

export default function KanaMemoryGame() {
  const { t } = useI18n();
  const [level, setLevel] = useState<number>(5);
  const [cards, setCards] = useState<MemoryCard[]>([]);
  const [openIds, setOpenIds] = useState<string[]>([]);
  const [mistakes, setMistakes] = useState(0);
  const [best, setBest] = useState<number>(() => loadStats().best);
  const [mounted, setMounted] = useState(false);
  const busyRef = useRef(false);
  const flipBackTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const matchedPairs = cards.filter((card) => card.matched).length / 2;
  const totalPairsOnBoard = cards.length / 2;
  const finished =
    cards.length > 0 && matchedPairs === totalPairsOnBoard;
  const score = Math.max(
    0,
    matchedPairs * POINTS_PER_PAIR - mistakes
  );

  const newBoard = useCallback((boardLevel: number) => {
    busyRef.current = false;
    setCards(buildBoard(boardLevel));
    setOpenIds([]);
    setMistakes(0);
  }, []);

  const changeLevel = useCallback(
    (l: number) => {
      setLevel(l);
      newBoard(l);
    },
    [newBoard]
  );

  const flipCard = useCallback(
    (cardId: string) => {
      if (busyRef.current) return;
      const targetCard = cards.find((card) => card.id === cardId);
      if (!targetCard || targetCard.matched) return;
      if (openIds.includes(cardId)) return;
      if (openIds.length === 0) {
        setOpenIds([cardId]);
        return;
      }
      const firstCard = cards.find((card) => card.id === openIds[0]);
      if (!firstCard) return;
      const isMatch = firstCard.wordKey === targetCard.wordKey;
      if (isMatch) {
        setCards((prev) =>
          prev.map((card) =>
            card.wordKey === firstCard.wordKey
              ? { ...card, matched: true }
              : card
          )
        );
        setOpenIds([]);
      } else {
        busyRef.current = true;
        setMistakes((m) => m + 1);
        setOpenIds((prev) => [...prev, cardId]);
        flipBackTimerRef.current = setTimeout(() => {
          busyRef.current = false;
          setOpenIds([]);
        }, WRONG_PAIR_FLIP_DELAY_MS);
      }
    },
    [cards, openIds]
  );

  useEffect(() => {
    if (!finished || matchedPairs === 0 || score <= best) return;
    const frame = requestAnimationFrame(() => setBest(score));
    return () => cancelAnimationFrame(frame);
  }, [finished, matchedPairs, score, best]);

  useEffect(() => {
    if (!mounted) return;
    try {
      localStorage.setItem("kanaMemory.stats", JSON.stringify({ best }));
    } catch {
      /* ignore */
    }
  }, [best, mounted]);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setMounted(true);
      newBoard(5);
    });
    return () => cancelAnimationFrame(frame);
  }, [newBoard]);

  useEffect(() => {
    return () => {
      if (flipBackTimerRef.current) clearTimeout(flipBackTimerRef.current);
    };
  }, []);

  const headerTitle = t.games.kanaMemory.title;
  const headerTagline = t.games.kanaMemory.tagline;

  if (!mounted) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-12 md:py-16">
        <Header title={headerTitle} tagline={headerTagline} />
        <div className="mt-8 rounded-2xl border border-border bg-card p-10 text-center font-mono text-muted">
          {t.games.kanaMemory.loading}
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
            {t.games.kanaMemory.jlptLevel}
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
            {t.games.kanaMemory.points}
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-3">
          <p className="font-mono text-2xl font-bold">{matchedPairs}</p>
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted">
            {t.games.kanaMemory.pairs}
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-3">
          <p className="font-mono text-2xl font-bold">{best}</p>
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted">
            {t.games.kanaMemory.best}
          </p>
        </div>
      </div>

      {/* Board */}
      <div className="mt-6 rounded-2xl border border-border bg-card p-6 md:p-8">
        {cards.length === 0 ? (
          <p className="text-center font-mono text-muted">
            {t.games.kanaMemory.empty}
          </p>
        ) : (
          <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-4">
            {cards.map((card) => {
              const isOpen = openIds.includes(card.id);
              let cls = "bg-background border-border text-foreground";
              if (card.matched) {
                cls = "bg-emerald-500 border-emerald-400 text-white";
              } else if (isOpen) {
                cls = "bg-accent text-background border-accent";
              }
              return (
                <button
                  key={card.id}
                  type="button"
                  onClick={() => flipCard(card.id)}
                  aria-label={card.text}
                  className={`pop-on-click flex h-20 items-center justify-center rounded-xl border p-2 text-center text-sm font-semibold transition-colors sm:text-base ${
                    card.matched || isOpen ? "" : "hover:border-accent"
                  } ${cls}`}
                >
                  {card.matched || isOpen ? card.text : "?"}
                </button>
              );
            })}
          </div>
        )}

        {finished && (
          <div className="gallery-expand mt-6 text-center">
            <p className="text-xl font-bold text-emerald-500">
              {t.games.kanaMemory.allMatched}
            </p>
            <p className="mt-1 font-mono text-sm text-muted">
              {score} {t.games.kanaMemory.points} · {mistakes}{" "}
              {t.games.kanaMemory.misses}
            </p>
            <button
              type="button"
              onClick={() => newBoard(level)}
              className="mt-4 rounded-lg bg-accent px-6 py-2.5 font-mono text-sm font-semibold text-background transition-opacity"
            >
              ↻ {t.games.kanaMemory.playAgain}
            </button>
          </div>
        )}

        <LeaderboardPanel
          key={level}
          game={GameSlug.KanaMemory}
          level={level as GameLevel}
          mode="final"
          score={score}
          finished={finished}
        />
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
          かなメモリー <span className="text-accent">{pretty}</span>
        </h1>
        <p className="mt-3 max-w-xl text-muted">{tagline}</p>
      </div>
      <SettingsBar />
    </div>
  );
}