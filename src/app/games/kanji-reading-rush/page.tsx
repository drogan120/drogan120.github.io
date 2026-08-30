import type { Metadata } from "next";
import KanjiReadingRushGame from "@/components/games/KanjiReadingRushGame";

export const metadata: Metadata = {
  title: "Kanji Reading Rush",
  description:
    "A timed kanji sprint: read the kanji word and type its hiragana reading in romaji as fast as you can. Beat your best score.",
  alternates: { canonical: "/games/kanji-reading-rush" },
  openGraph: {
    title: "Kanji Reading Rush",
    description:
      "How many kanji readings can you type before the clock runs out? From JLPT N5 to N1.",
    url: "/games/kanji-reading-rush",
    type: "website",
    images: ["/og.png"],
  },
};

export default function KanjiReadingRushPage() {
  return <KanjiReadingRushGame />;
}