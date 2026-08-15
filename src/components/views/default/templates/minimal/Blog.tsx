"use client";

import { useState } from "react";
import Link from "next/link";
import { useI18n } from "@/i18n";
import { latestPosts, languageLabel } from "@/data/blogIndex";
import Markdown from "@/components/shared/Markdown";

const posts = latestPosts(5);

export default function MinimalBlog() {
  const { t } = useI18n();
  const [open, setOpen] = useState<string | null>(null);

  return (
    <section id="blog" className="mx-auto max-w-5xl px-6 py-16 md:py-24">
      <p className="font-mono text-sm text-accent">{t.default.blog.label}</p>
      <h2 className="mt-3 text-3xl font-bold">{t.default.blog.title}</h2>
      <p className="mt-3 max-w-xl text-muted">{t.default.blog.description}</p>

      <div className="mt-10 space-y-4">
        {posts.map((post, i) => (
          <article
            key={post.id}
            className="card-in overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-accent/40"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <button
              type="button"
              onClick={() => setOpen(open === post.id ? null : post.id)}
              className="flex w-full flex-col gap-2 px-6 py-5 text-left"
            >
              <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-muted">
                <span className="rounded bg-accent/10 px-2 py-0.5 text-accent">
                  {post.category}
                </span>
                <span>{post.date}</span>
                <span className="rounded border border-border px-2 py-0.5">
                  {languageLabel(post.language)}
                </span>
              </div>
              <h3 className="text-lg font-semibold">{post.title}</h3>
              <p className="text-sm text-muted">{post.excerpt}</p>
              <div className="mt-1 flex flex-wrap gap-1.5">
                {post.tags.map((tag) => (
                  <span key={tag} className="font-mono text-xs text-muted/80">
                    #{tag}
                  </span>
                ))}
              </div>
            </button>

            {open === post.id && (
              <div className="border-t border-border px-6 py-5">
                <div className="max-h-64 overflow-hidden text-muted">
                  <Markdown content={post.content} />
                </div>
                <Link
                  href={`/blog/${post.id}`}
                  className="mt-4 inline-block font-mono text-sm text-accent underline underline-offset-4"
                >
                  {t.default.blog.readFull} →
                </Link>
              </div>
            )}
          </article>
        ))}
      </div>

      <Link
        href="/blog"
        className="mt-8 inline-block font-mono text-sm text-accent underline underline-offset-4 transition-colors hover:text-accent-2"
      >
        {t.default.blog.viewAll} →
      </Link>
    </section>
  );
}