"use client";

import Link from "next/link";
import { useI18n } from "@/i18n";
import SettingsBar from "@/components/shared/SettingsBar";

const GAME_LINKS: Record<string, string> = {
  "かなワードル": "/games/wordle",
  "かなリコール": "/games/recall",
  "かなマッチ": "/games/match",
  "かなビルダー": "/games/builder",
  "スピードリコール": "/games/speed",
  "漢字リーディング": "/games/kanji-reading",
  "漢字マッチ": "/games/kanji-meaning",
  "漢字セレクト": "/games/kanji-select",
  "復習": "/games/review",
};

export default function GamesIndex() {
  const { t } = useI18n();

  return (
    <main className="mx-auto max-w-3xl px-6 py-12 md:py-20">
      <div className="flex items-start justify-between gap-4">
        <div>
          <Link
            href="/"
            className="font-mono text-sm text-muted transition-colors hover:text-accent"
          >
            ← {t.default.nav.about}
          </Link>
          <h1 className="mt-4 text-3xl font-bold md:text-4xl">
            <span className="text-accent">ゲーム</span> {t.gamesIndex.heading}
          </h1>
          <p className="mt-3 max-w-xl text-muted">{t.gamesIndex.tagline}</p>
        </div>
        <SettingsBar />
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {t.gamesIndex.cards.map((card, i) => (
          <Link
            key={card.tag}
            href={GAME_LINKS[card.tag] ?? "/games"}
            className="gallery-item group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-xl hover:shadow-black/10"
            style={{ "--i": i } as React.CSSProperties}
          >
            <span className="font-mono text-xs tracking-widest text-accent">
              {card.tag}
            </span>
            <h2 className="mt-2 text-xl font-bold">{card.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {card.description}
            </p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {card.chips.map((chip) => (
                <span
                  key={chip}
                  className="rounded-full border border-border px-2.5 py-0.5 font-mono text-[10px] text-muted"
                >
                  {chip}
                </span>
              ))}
            </div>
            <span className="mt-4 inline-block font-mono text-sm text-accent">
              {t.gamesIndex.play}
            </span>
          </Link>
        ))}
      </div>

      <div className="mt-10 rounded-2xl border border-dashed border-border p-5">
        <p className="font-mono text-xs uppercase tracking-widest text-muted">
          {t.gamesIndex.comingSoonLabel}
        </p>
        <p className="mt-1 text-sm text-muted">{t.gamesIndex.comingSoonText}</p>
      </div>
    </main>
  );
}
