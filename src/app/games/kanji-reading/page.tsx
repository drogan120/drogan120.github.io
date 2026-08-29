import type { Metadata } from "next";
import KanjiReadingGame from "@/components/games/KanjiReadingGame";

export const metadata: Metadata = {
  title: "Kanji Reading",
  description:
    "See a kanji word and type its hiragana reading via romaji. Practice kanji readings from JLPT N5 to N1.",
  alternates: { canonical: "/games/kanji-reading" },
  openGraph: {
    title: "Kanji Reading",
    description:
      "Type the hiragana readings of real JLPT kanji words, from N5 to N1.",
    url: "/games/kanji-reading",
    type: "website",
    images: ["/og.png"],
  },
};

export default function KanjiReadingPage() {
  return <KanjiReadingGame />;
}
