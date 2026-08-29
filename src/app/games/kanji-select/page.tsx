import type { Metadata } from "next";
import KanjiSelectGame from "@/components/games/KanjiSelectGame";

export const metadata: Metadata = {
  title: "Kanji Select",
  description:
    "See the hiragana reading and pick the kanji word it belongs to. Master the reading-to-kanji direction, from JLPT N5 to N1.",
  alternates: { canonical: "/games/kanji-select" },
  openGraph: {
    title: "Kanji Select",
    description:
      "Pick the correct kanji word for each hiragana reading, level by level.",
    url: "/games/kanji-select",
    type: "website",
    images: ["/og.png"],
  },
};

export default function KanjiSelectPage() {
  return <KanjiSelectGame />;
}
