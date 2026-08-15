import type { Metadata } from "next";
import BlogIndex from "@/components/shared/BlogIndex";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Tulisan Drogan soal keputusan teknis: kenapa Android native, Kotlin, TypeScript, dan Python.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog — Drogan",
    description:
      "Tulisan Drogan soal keputusan teknis: kenapa Android native, Kotlin, TypeScript, dan Python.",
    url: "/blog",
    type: "website",
    images: ["/og.png"],
  },
};

export default function BlogIndexPage() {
  return <BlogIndex />;
}