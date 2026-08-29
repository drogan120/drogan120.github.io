import type { Metadata } from "next";
import KanaBuilderGame from "@/components/games/KanaBuilderGame";

export const metadata: Metadata = {
  title: "Word Builder",
  description:
    "Read the English meaning, then tap the scattered kana tiles in the correct order to build the Japanese word. Practice spelling from JLPT N5 to N1.",
  alternates: { canonical: "/games/builder" },
  openGraph: {
    title: "Word Builder",
    description:
      "Assemble Japanese hiragana words from jumbled kana tiles, from JLPT N5 to N1.",
    url: "/games/builder",
    type: "website",
    images: ["/og.png"],
  },
};

export default function KanaBuilderPage() {
  return <KanaBuilderGame />;
}
