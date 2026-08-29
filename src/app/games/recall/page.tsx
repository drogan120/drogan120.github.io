import type { Metadata } from "next";
import KanaRecallGame from "@/components/games/KanaRecallGame";

export const metadata: Metadata = {
  title: "Kana Recall",
  description:
    "A fast flashcard-style Japanese drill: see the English meaning, type the hiragana word via romaji. Build vocabulary from JLPT N5 to N1.",
  alternates: { canonical: "/games/recall" },
  openGraph: {
    title: "Kana Recall",
    description:
      "A fast Japanese vocabulary drill — read the meaning and type the hiragana word.",
    url: "/games/recall",
    type: "website",
    images: ["/og.png"],
  },
};

export default function KanaRecallPage() {
  return <KanaRecallGame />;
}
