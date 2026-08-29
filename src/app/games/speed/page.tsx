import type { Metadata } from "next";
import KanaSpeedGame from "@/components/games/KanaSpeedGame";

export const metadata: Metadata = {
  title: "Speed Recall",
  description:
    "A timed 60-second Japanese flashcard sprint: read the meaning and type the hiragana word via romaji as fast as you can. Beat your best score.",
  alternates: { canonical: "/games/speed" },
  openGraph: {
    title: "Speed Recall",
    description:
      "How many Japanese words can you type in hiragana in 60 seconds? From JLPT N5 to N1.",
    url: "/games/speed",
    type: "website",
    images: ["/og.png"],
  },
};

export default function KanaSpeedPage() {
  return <KanaSpeedGame />;
}
