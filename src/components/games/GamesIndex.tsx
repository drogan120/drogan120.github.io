"use client";

import Link from "next/link";
import { useI18n } from "@/i18n";
import SettingsBar from "@/components/shared/SettingsBar";

const GAMES = [
  {
    href: "/games/wordle",
    tag: "かなワードル",
    title: "Kana Wordle",
    icon: "🧩",
    description:
      "Guess the hidden Japanese word, kana by kana, in six tries. Type romaji and watch it become hiragana. Pick your JLPT level and word length.",
    chips: ["Vocabulary", "Hiragana", "JLPT N5–N1"],
  },
  {
    href: "/games/recall",
    tag: "かなリコール",
    title: "Kana Recall",
    icon: "⚡",
    description:
      "See the English meaning, type the Japanese word in hiragana. A fast flashcard-style drill to build reading speed and vocabulary.",
    chips: ["Reaction", "Vocabulary", "Spelling"],
  },
  {
    href: "/games/match",
    tag: "かなマッチ",
    title: "Meaning Match",
    icon: "🎯",
    description:
      "See the Japanese word in kana and pick the correct English meaning from four choices. A snappy multiple-choice vocabulary quiz.",
    chips: ["Multiple choice", "Vocabulary"],
  },
  {
    href: "/games/builder",
    tag: "かなビルダー",
    title: "Word Builder",
    icon: "🧱",
    description:
      "Read the meaning, then tap the scattered kana tiles in the right order to build the word. Great for spelling practice.",
    chips: ["Spelling", "Kana tiles"],
  },
  {
    href: "/games/speed",
    tag: "スピードリコール",
    title: "Speed Recall",
    icon: "⏱️",
    description:
      "A 60-second flashcard sprint — how many Japanese words can you type in hiragana before the clock runs out?",
    chips: ["Timed", "Reaction", "Vocabulary"],
  },
  {
    href: "/games/kanji-reading",
    tag: "漢字リーディング",
    title: "Kanji Reading",
    icon: "📖",
    description:
      "See the kanji word and type its hiragana reading via romaji. Drill kanji readings you can actually use, from JLPT N5 to N1.",
    chips: ["Kanji", "Readings", "Vocabulary"],
  },
  {
    href: "/games/kanji-meaning",
    tag: "漢字マッチ",
    title: "Kanji Meaning",
    icon: "🗾",
    description:
      "See the kanji word and pick the correct English meaning from four choices. Build real kanji vocabulary level by level.",
    chips: ["Kanji", "Multiple choice", "Vocabulary"],
  },
] as const;

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
            <span className="text-accent">ゲーム</span> Games
          </h1>
          <p className="mt-3 max-w-xl text-muted">
            Playful ways to practice Japanese — from hiragana to JLPT-level
            vocabulary. Type romaji, get hiragana, learn as you play.
          </p>
        </div>
        <SettingsBar />
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {GAMES.map((game, i) => (
          <Link
            key={game.href}
            href={game.href}
            className="gallery-item group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-xl hover:shadow-black/10"
            style={{ "--i": i } as React.CSSProperties}
          >
            <span className="font-mono text-xs tracking-widest text-accent">
              {game.tag}
            </span>
            <div className="mt-2 flex items-center gap-3">
              <span aria-hidden className="text-3xl">
                {game.icon}
              </span>
              <h2 className="text-xl font-bold">{game.title}</h2>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {game.description}
            </p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {game.chips.map((chip) => (
                <span
                  key={chip}
                  className="rounded-full border border-border px-2.5 py-0.5 font-mono text-[10px] text-muted"
                >
                  {chip}
                </span>
              ))}
            </div>
            <span className="mt-4 inline-block font-mono text-sm text-accent">
              Play →
            </span>
          </Link>
        ))}
      </div>

      <div className="mt-10 rounded-2xl border border-dashed border-border p-5">
        <p className="font-mono text-xs uppercase tracking-widest text-muted">
          Coming soon
        </p>
        <p className="mt-1 text-sm text-muted">
          Katakana drills, kanji reading speed, and more are on the way.
        </p>
      </div>
    </main>
  );
}
