import type { Metadata } from "next";
import ReviewGame from "@/components/games/ReviewGame";

export const metadata: Metadata = {
  title: "Review",
  description:
    "A spaced-repetition deck of the words you've missed across the practice games. Review them until you get them right, every time.",
  alternates: { canonical: "/games/review" },
  openGraph: {
    title: "Review",
    description:
      "Review the words you've missed across all the Japanese practice games.",
    url: "/games/review",
    type: "website",
    images: ["/og.png"],
  },
};

export default function ReviewPage() {
  return <ReviewGame />;
}
