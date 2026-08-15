"use client";

import { useState } from "react";
import Link from "next/link";
import { useI18n } from "@/i18n";
import { latestPosts, languageLabel } from "@/data/blogIndex";
import Markdown from "@/components/shared/Markdown";

const posts = latestPosts(5);

export default function ClassicBlog() {
  const { t } = useI18n();
  const [open, setOpen] = useState<string | null>(null);

  return (
    <section id="blog" className="mx-auto max-w-5xl px-6 py-16 md:py-24">
      <p className="text-center font-mono text-sm text-accent">
        {t.default.blog.label}
      </p>
      <h2 className="mt-2 text-center text-3xl font-bold">
        {t.default.blog.title}
      </h2>
      <p className="mx-auto mt-3 max-w-xl text-center text-muted">
        {t.default.blog.description}
      </p>

      <div className="mt-12 space-y-5">
        {posts.map((post, i) => (
          <article
            key={post.id}
            className="card-in overflow-hidden rounded-2xl border border-border bg-card transition-colors hover:border-accent/50"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <button
              type="button"
              onClick={() => setOpen(open === post.id ? null : post.id)}
              className="flex w-full flex-col gap-2 px-7 py-6 text-left"
            >
              <div className="flex flex-wrap items-center gap-2 text-sm text-muted">
                <span className="rounded-full bg-accent/10 px-3 py-0.5 font-medium text-accent">
                  {post.category}
                </span>
                <span>{post.date}</span>
                <span className="rounded-full border border-border px-2.5 py-0.5 text-xs">
                  {languageLabel(post.language)}
                </span>
              </div>
              <h3 className="text-xl font-semibold">{post.title}</h3>
              <p className="text-sm text-muted">{post.excerpt}</p>
              <div className="mt-1 flex flex-wrap gap-1.5">
                {post.tags.map((tag) => (
                  <span key={tag} className="text-xs text-muted/80">
                    #{tag}
                  </span>
                ))}
              </div>
            </button>

            {open === post.id && (
              <div className="border-t border-border px-7 py-6">
                <div className="max-h-64 overflow-hidden text-muted">
                  <Markdown content={post.content} />
                </div>
                <Link
                  href={`/blog/${post.id}`}
                  className="mt-4 inline-block text-sm font-semibold text-accent underline underline-offset-4"
                >
                  {t.default.blog.readFull} →
                </Link>
              </div>
            )}
          </article>
        ))}
      </div>

      <div className="mt-10 text-center">
        <Link
          href="/blog"
          className="pop-on-click inline-block rounded-xl border border-border px-6 py-3 font-semibold transition-colors hover:border-accent hover:text-accent"
        >
          {t.default.blog.viewAll} →
        </Link>
      </div>
    </section>
  );
}