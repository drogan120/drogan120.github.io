import type { Metadata } from "next";
import KanaWordleGame from "@/components/games/KanaWordleGame";

export const metadata: Metadata = {
  title: "Kana Wordle",
  description:
    "Guess hidden Japanese words, kana by kana, in six tries. Pick a JLPT level and word length, then type romaji that becomes hiragana.",
  alternates: { canonical: "/games/wordle" },
  openGraph: {
    title: "Kana Wordle",
    description:
      "A Wordle-style game for hiragana and Japanese vocabulary, from JLPT N5 to N1.",
    url: "/games/wordle",
    type: "website",
    images: ["/og.png"],
  },
};

export default function KanaWordlePage() {
  return <KanaWordleGame />;
}
