import type { Metadata } from "next";
import KanaMatchGame from "@/components/games/KanaMatchGame";

export const metadata: Metadata = {
  title: "Meaning Match",
  description:
    "See a Japanese word in kana and pick the correct English meaning from multiple choices. A fast vocabulary drill from JLPT N5 to N1.",
  alternates: { canonical: "/games/match" },
  openGraph: {
    title: "Meaning Match",
    description:
      "Pick the correct English meaning for Japanese hiragana words, from JLPT N5 to N1.",
    url: "/games/match",
    type: "website",
    images: ["/og.png"],
  },
};

export default function KanaMatchPage() {
  return <KanaMatchGame />;
}
