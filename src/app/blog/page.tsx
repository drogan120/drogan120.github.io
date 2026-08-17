import type { Metadata } from "next";
import BlogIndex from "@/components/shared/BlogIndex";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Tulisan Ali Mahmudin soal keputusan teknis: kenapa Android native, Kotlin, dan Python.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog — Ali Mahmudin",
    description:
      "Tulisan Ali Mahmudin soal keputusan teknis: kenapa Android native, Kotlin, dan Python.",
    url: "/blog",
    type: "website",
    images: ["/og.png"],
  },
};

export default function BlogIndexPage() {
  return <BlogIndex />;
}