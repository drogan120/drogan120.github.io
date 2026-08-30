import type { Metadata } from "next";
import KanaMemoryGame from "@/components/games/KanaMemoryGame";

export const metadata: Metadata = {
  title: "Kana Memory",
  description:
    "Flip cards to match each Japanese word to its English meaning. Six pairs per board, few mistakes, more points.",
  alternates: { canonical: "/games/kana-memory" },
  openGraph: {
    title: "Kana Memory",
    description:
      "A memory match game: pair hiragana words with their meanings, level by level.",
    url: "/games/kana-memory",
    type: "website",
    images: ["/og.png"],
  },
};

export default function KanaMemoryPage() {
  return <KanaMemoryGame />;
}