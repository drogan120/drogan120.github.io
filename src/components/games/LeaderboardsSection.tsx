"use client";

import { useEffect, useState } from "react";
import { useI18n } from "@/i18n";
import type { Dictionary } from "@/i18n/en";
import {
  GAME_LEVELS,
  GAME_SLUG_VALUES,
  GameSlug,
  type GameLevel,
} from "@/lib/games";
import {
  getLeaderboard,
  isLeaderboardConfigured,
  type LeaderboardEntry,
} from "@/lib/leaderboard";

function TopPlayersBoard({
  game,
  level,
}: {
  game: GameSlug;
  level: GameLevel;
}) {
  const { t } = useI18n();
  const [entries, setEntries] = useState<
    LeaderboardEntry[] | null | undefined
  >(undefined);

  const metricLabel =
    game === GameSlug.Speed
      ? t.leaderboard.metricScore
      : t.leaderboard.metricStreak;

  useEffect(() => {
    if (!isLeaderboardConfigured()) return;
    let cancelled = false;
    getLeaderboard(game, level).then((data) => {
      if (!cancelled) setEntries(data);
    });
    return () => {
      cancelled = true;
    };
  }, [game, level]);

  if (entries === undefined) {
    return (
      <p className="py-4 text-center font-mono text-xs text-muted">
        {t.leaderboard.loading}
      </p>
    );
  }
  if (entries === null) {
    return (
      <p className="py-4 text-center font-mono text-xs text-muted">
        {t.leaderboard.unavailable}
      </p>
    );
  }
  if (entries.length === 0) {
    return (
      <p className="py-4 text-center font-mono text-xs text-muted">
        {t.leaderboard.empty}
      </p>
    );
  }
  return (
    <div className="mt-3">
      <div className="mb-2 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-muted">
        <span>{metricLabel}</span>
        <span>N{level}</span>
      </div>
      <ul className="space-y-1.5">
      {entries.map((entry, index) => (
        <li
          key={`${entry.name}-${index}`}
          className="flex items-center justify-between rounded-lg border border-border bg-background/60 px-3 py-2"
        >
          <div className="flex items-center gap-2">
            <span className="font-mono text-sm font-bold text-accent">
              #{index + 1}
            </span>
            <span className="text-sm font-medium">{entry.name}</span>
          </div>
          <span className="font-mono text-sm font-semibold">{entry.score}</span>
        </li>
      ))}
    </ul>
    </div>
  );
}

const GAME_TITLE: Record<GameSlug, (games: Dictionary["games"]) => string> = {
  [GameSlug.Speed]: (games) => games.speedRecall.title,
  [GameSlug.Wordle]: (games) => games.kanaWordle.title,
  [GameSlug.Recall]: (games) => games.kanaRecall.title,
  [GameSlug.Match]: (games) => games.kanaMatch.title,
  [GameSlug.Builder]: (games) => games.wordBuilder.title,
  [GameSlug.KanjiReading]: (games) => games.kanjiReading.title,
  [GameSlug.KanjiMeaning]: (games) => games.kanjiMeaning.title,
  [GameSlug.KanjiSelect]: (games) => games.kanjiSelect.title,
};

export default function LeaderboardsSection() {
  const { t } = useI18n();
  const [selectedGame, setSelectedGame] = useState<GameSlug>(GameSlug.Speed);
  const [selectedLevel, setSelectedLevel] = useState<GameLevel>(5);

  if (!isLeaderboardConfigured()) return null;

  return (
    <section className="mt-10 rounded-2xl border border-border bg-card p-5">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <p className="font-mono text-[11px] uppercase tracking-widest text-accent">
          {t.gamesIndex.leaderboards}
        </p>
        <p className="font-mono text-[10px] uppercase tracking-widest text-muted">
          {t.gamesIndex.leaderboardsTagline}
        </p>
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {GAME_SLUG_VALUES.map((game) => (
          <button
            key={game}
            type="button"
            onClick={() => setSelectedGame(game)}
            className={`rounded-lg px-3 py-1.5 font-mono text-xs transition-colors ${
              selectedGame === game
                ? "bg-accent font-semibold text-background"
                : "bg-background border border-border text-muted hover:border-accent hover:text-accent"
            }`}
          >
            {GAME_TITLE[game](t.games)}
          </button>
        ))}
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {GAME_LEVELS.map((level) => (
          <button
            key={level}
            type="button"
            onClick={() => setSelectedLevel(level)}
            className={`rounded px-2 py-1 font-mono text-xs transition-colors ${
              selectedLevel === level
                ? "bg-accent font-semibold text-background"
                : "text-muted hover:text-foreground"
            }`}
          >
            N{level}
          </button>
        ))}
      </div>

      <TopPlayersBoard
        key={`${selectedGame}:${selectedLevel}`}
        game={selectedGame}
        level={selectedLevel}
      />
    </section>
  );
}