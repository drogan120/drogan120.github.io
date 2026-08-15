import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { blogPosts, getPostById } from "@/data/blogIndex";
import BlogArticle from "@/components/shared/BlogArticle";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ id: post.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const post = getPostById(id);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.tags,
    alternates: { canonical: `/blog/${post.id}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `/blog/${post.id}`,
      type: "article",
      publishedTime: post.date,
      tags: post.tags,
      locale: post.language === "ja" ? "ja_JP" : "en_US",
      images: ["/og.png"],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: ["/og.png"],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = getPostById(id);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    inLanguage: post.language,
    keywords: post.tags.join(", "),
    articleSection: post.category,
    author: {
      "@type": "Person",
      name: "Drogan",
      url: "https://drogan120.github.io",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://drogan120.github.io/blog/${post.id}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogArticle post={post} />
    </>
  );
}