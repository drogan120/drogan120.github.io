import type { Metadata } from "next";
import GamesIndex from "@/components/games/GamesIndex";

export const metadata: Metadata = {
  title: "Games — Japanese Practice",
  description:
    "Japanese practice games: Kana Wordle and Kana Recall. Type romaji, get hiragana, and build vocabulary from JLPT N5 to N1.",
  alternates: { canonical: "/games" },
  openGraph: {
    title: "Games — Japanese Practice",
    description:
      "Kana Wordle and Kana Recall: fun ways to practice hiragana and Japanese vocabulary.",
    url: "/games",
    type: "website",
    images: ["/og.png"],
  },
};

export default function GamesIndexPage() {
  return <GamesIndex />;
}
