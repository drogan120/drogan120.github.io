import type { Metadata } from "next";
import KanjiRushGame from "@/components/games/KanjiRushGame";

export const metadata: Metadata = {
  title: "Kanji Rush",
  description:
    "A timed kanji sprint: read the kanji word and pick its English meaning from four choices as fast as you can. Beat your best score.",
  alternates: { canonical: "/games/kanji-rush" },
  openGraph: {
    title: "Kanji Rush",
    description:
      "How many kanji meanings can you match before the clock runs out? From JLPT N5 to N1.",
    url: "/games/kanji-rush",
    type: "website",
    images: ["/og.png"],
  },
};

export default function KanjiRushPage() {
  return <KanjiRushGame />;
}