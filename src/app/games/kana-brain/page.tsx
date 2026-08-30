import type { Metadata } from "next";
import KanaBrainGame from "@/components/games/KanaBrainGame";

export const metadata: Metadata = {
  title: "Kana Brain",
  description:
    "Unscramble the jumbled romaji letters and type the Japanese word in hiragana. A spelling workout for JLPT vocabulary, from N5 to N1.",
  alternates: { canonical: "/games/kana-brain" },
  openGraph: {
    title: "Kana Brain",
    description:
      "See the meaning, unscramble the romaji, and type the word. How long can your streak go?",
    url: "/games/kana-brain",
    type: "website",
    images: ["/og.png"],
  },
};

export default function KanaBrainPage() {
  return <KanaBrainGame />;
}