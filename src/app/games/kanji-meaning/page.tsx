import type { Metadata } from "next";
import KanjiMeaningGame from "@/components/games/KanjiMeaningGame";

export const metadata: Metadata = {
  title: "Kanji Meaning",
  description:
    "See a kanji word and pick its correct English meaning from multiple choices. Build kanji vocabulary from JLPT N5 to N1.",
  alternates: { canonical: "/games/kanji-meaning" },
  openGraph: {
    title: "Kanji Meaning",
    description:
      "Pick the correct English meaning for real JLPT kanji words, from N5 to N1.",
    url: "/games/kanji-meaning",
    type: "website",
    images: ["/og.png"],
  },
};

export default function KanjiMeaningPage() {
  return <KanjiMeaningGame />;
}
