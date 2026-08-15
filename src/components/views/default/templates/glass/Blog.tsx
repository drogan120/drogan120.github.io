"use client";

import { useState } from "react";
import Link from "next/link";
import { useI18n } from "@/i18n";
import { latestPosts, languageLabel } from "@/data/blogIndex";
import Markdown from "@/components/shared/Markdown";

const posts = latestPosts(5);

export default function GlassBlog() {
  const { t } = useI18n();
  const [open, setOpen] = useState<string | null>(null);

  return (
    <section id="blog" className="relative">
      <div className="pointer-events-none absolute inset-x-0 top-1/2 mx-auto h-72 w-72 -translate-y-1/2 rounded-full bg-accent/15 blur-[140px]" />

      <div className="relative mx-auto max-w-5xl px-6 py-16 md:py-24">
        <div className="text-center">
          <p className="font-mono text-sm text-accent">
            {t.default.blog.label}
          </p>
          <h2 className="mt-3 text-3xl font-bold">{t.default.blog.title}</h2>
          <p className="mx-auto mt-3 max-w-xl text-muted">
            {t.default.blog.description}
          </p>
        </div>

        <div className="mt-14 space-y-5">
          {posts.map((post, i) => (
            <article
              key={post.id}
              className="card-in overflow-hidden rounded-3xl border border-white/15 bg-white/10 backdrop-blur-xl transition-all hover:border-accent/40 hover:bg-white/15"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <button
                type="button"
                onClick={() => setOpen(open === post.id ? null : post.id)}
                className="flex w-full flex-col gap-2 px-7 py-6 text-left"
              >
                <div className="flex flex-wrap items-center gap-2 text-sm text-muted">
                  <span className="rounded-full border border-accent/40 px-3 py-0.5 font-medium text-accent">
                    {post.category}
                  </span>
                  <span>{post.date}</span>
                  <span className="rounded-full border border-white/20 px-2.5 py-0.5 text-xs">
                    {languageLabel(post.language)}
                  </span>
                </div>
                <h3 className="text-xl font-bold">{post.title}</h3>
                <p className="text-sm text-muted">{post.excerpt}</p>
                <div className="mt-1 flex flex-wrap gap-1.5">
                  {post.tags.map((tag) => (
                    <span key={tag} className="font-mono text-xs text-accent/70">
                      #{tag}
                    </span>
                  ))}
                </div>
              </button>

              {open === post.id && (
                <div className="border-t border-white/15 px-7 py-6">
                  <div className="max-h-64 overflow-hidden text-muted">
                    <Markdown content={post.content} />
                  </div>
                  <Link
                    href={`/blog/${post.id}`}
                    className="pop-on-click mt-4 inline-block rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-sm font-semibold text-accent backdrop-blur-xl"
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
            className="pop-on-click inline-block rounded-full border border-white/20 bg-white/10 px-7 py-3 font-semibold backdrop-blur-xl transition-colors hover:text-accent"
          >
            {t.default.blog.viewAll} →
          </Link>
        </div>
      </div>
    </section>
  );
}