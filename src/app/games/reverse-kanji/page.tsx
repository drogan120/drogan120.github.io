import type { Metadata } from "next";
import ReverseKanjiGame from "@/components/games/ReverseKanjiGame";

export const metadata: Metadata = {
  title: "Reverse Kanji",
  description:
    "See the English meaning and pick the kanji word it belongs to. The reverse direction of Kanji Select, from JLPT N5 to N1.",
  alternates: { canonical: "/games/reverse-kanji" },
  openGraph: {
    title: "Reverse Kanji",
    description:
      "Pick the correct kanji word for each meaning, level by level.",
    url: "/games/reverse-kanji",
    type: "website",
    images: ["/og.png"],
  },
};

export default function ReverseKanjiPage() {
  return <ReverseKanjiGame />;
}