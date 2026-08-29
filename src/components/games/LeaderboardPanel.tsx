"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useI18n } from "@/i18n";
import {
  getLeaderboard,
  submitScore,
  isLeaderboardConfigured,
  type LeaderboardEntry,
} from "@/lib/leaderboard";
import type { GameSlug, GameLevel } from "@/lib/games";

const NAME_STORAGE_KEY = "leaderboard.name";
const MAX_NAME_LENGTH = 20;

type Props = {
  game: GameSlug;
  level: GameLevel;
} & (
  | {
      /**
       * Endless games: the peak streak is submitted automatically the moment
       * the streak breaks back to 0.
       */
      mode: "streak";
      streak: number;
    }
  | {
      /** Timed games: `score` is submitted once `finished` turns true. */
      mode: "final";
      score: number;
      finished: boolean;
    }
);

function loadStoredName(): string {
  if (typeof window === "undefined") return "";
  try {
    return localStorage.getItem(NAME_STORAGE_KEY) ?? "";
  } catch {
    return "";
  }
}

export default function LeaderboardPanel(props: Props) {
  const { game, level } = props;
  const { t } = useI18n();
  const [entries, setEntries] = useState<LeaderboardEntry[] | null | undefined>(
    undefined
  );
  const [name, setName] = useState<string>(loadStoredName);
  const [submitting, setSubmitting] = useState(false);
  const [savedScore, setSavedScore] = useState<number | null>(null);
  const [failed, setFailed] = useState(false);
  /** A finished run waiting for a name before it can be saved. */
  const [unsavedRun, setUnsavedRun] = useState<number | null>(null);

  const peakStreakRef = useRef(0);
  const nameRef = useRef(name);

  useEffect(() => {
    nameRef.current = name;
  }, [name]);

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

  const send = useCallback(
    async (score: number, playerName: string) => {
      setSubmitting(true);
      setFailed(false);
      const updated = await submitScore(game, level, playerName, score);
      setSubmitting(false);
      if (updated) {
        setEntries(updated);
        setSavedScore(score);
        setUnsavedRun(null);
        try {
          localStorage.setItem(NAME_STORAGE_KEY, playerName);
        } catch {
          // ignore quota / private-mode errors
        }
      } else {
        setFailed(true);
      }
    },
    [game, level]
  );

  /** Queue a finished run: submit right away when a name is already known. */
  const finishRun = useCallback(
    (score: number) => {
      if (score <= 0) return;
      const playerName = nameRef.current.trim();
      if (playerName) {
        void send(score, playerName);
      } else {
        setUnsavedRun(score);
      }
    },
    [send]
  );

  const currentStreak = props.mode === "streak" ? props.streak : 0;

  useEffect(() => {
    if (props.mode !== "streak" || !isLeaderboardConfigured()) return;
    if (currentStreak > peakStreakRef.current) {
      peakStreakRef.current = currentStreak;
      return;
    }
    if (currentStreak === 0 && peakStreakRef.current > 0) {
      const endedRun = peakStreakRef.current;
      peakStreakRef.current = 0;
      finishRun(endedRun);
    }
  }, [props.mode, currentStreak, finishRun]);

  const finished = props.mode === "final" ? props.finished : false;
  const finalScore = props.mode === "final" ? props.score : 0;

  useEffect(() => {
    if (props.mode !== "final" || !finished || !isLeaderboardConfigured()) return;
    finishRun(finalScore);
  }, [props.mode, finished, finalScore, finishRun]);

  const handleManualSave = useCallback(() => {
    const playerName = name.trim();
    const score = unsavedRun ?? (props.mode === "final" ? finalScore : 0);
    if (!playerName || submitting || score <= 0) return;
    void send(score, playerName);
  }, [name, unsavedRun, props.mode, finalScore, submitting, send]);

  if (!isLeaderboardConfigured()) return null;

  const pendingScore = unsavedRun ?? 0;
  const canSaveManually = pendingScore > 0;

  return (
    <div className="mt-6 rounded-2xl border border-border bg-card p-5">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <p className="font-mono text-[11px] uppercase tracking-widest text-accent">
          {t.leaderboard.header}
        </p>
        <p className="font-mono text-[10px] uppercase tracking-widest text-muted">
          {props.mode === "streak"
            ? t.leaderboard.metricStreak
            : t.leaderboard.metricScore}
        </p>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder={t.leaderboard.namePlaceholder}
          autoComplete="off"
          maxLength={MAX_NAME_LENGTH}
          className="min-w-0 flex-1 rounded-lg border border-border bg-background px-3 py-2 font-mono text-sm outline-none placeholder:text-muted/60 focus:border-accent"
        />
        {canSaveManually && (
          <button
            type="button"
            onClick={handleManualSave}
            disabled={submitting || !name.trim()}
            className="rounded-lg bg-accent px-4 py-2 font-mono text-sm font-semibold text-background transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
          >
            {submitting ? "…" : t.leaderboard.save}
          </button>
        )}
      </div>

      {canSaveManually ? (
        <p className="mt-3 text-sm text-muted">
          {t.leaderboard.runEnded.replace("{score}", String(pendingScore))}{" "}
          {t.leaderboard.enterNameToSave}
        </p>
      ) : savedScore !== null ? (
        <p className="mt-3 text-sm font-semibold text-emerald-500">
          {t.leaderboard.submitted.replace("{score}", String(savedScore))}
        </p>
      ) : (
        <p className="mt-3 text-sm text-muted">{t.leaderboard.autoSaveHint}</p>
      )}

      {failed && (
        <p className="mt-2 text-sm text-red-400">{t.leaderboard.unavailable}</p>
      )}

      <div className="mt-4 space-y-1.5">
        {entries === undefined ? (
          <p className="font-mono text-xs text-muted">{t.leaderboard.loading}</p>
        ) : entries === null ? (
          <p className="font-mono text-xs text-muted">
            {t.leaderboard.unavailable}
          </p>
        ) : entries.length === 0 ? (
          <p className="font-mono text-xs text-muted">{t.leaderboard.empty}</p>
        ) : (
          entries.map((entry, index) => (
            <div
              key={`${entry.name}-${index}`}
              className="flex items-center justify-between rounded-lg border border-border bg-background/60 px-3 py-2"
            >
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm font-bold text-accent">
                  #{index + 1}
                </span>
                <span className="text-sm font-medium">{entry.name}</span>
              </div>
              <span className="font-mono text-sm font-semibold">
                {entry.score}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
