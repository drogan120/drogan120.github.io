"use client";

import { useState } from "react";
import { useI18n } from "@/i18n";
import Markdown from "@/components/shared/Markdown";

export default function PlayfulBlog() {
  const { t } = useI18n();
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="blog" className="mx-auto max-w-5xl px-6 py-16 md:py-24">
      <div className="text-center">
        <p className="font-mono text-sm text-accent">{t.default.blog.label}</p>
        <h2 className="mt-2 text-4xl font-extrabold tracking-tight">
          {t.default.blog.title}
        </h2>
      </div>

      <div className="mt-12 space-y-5">
        {t.default.blog.items.map((post, i) => (
          <article
            key={post.title}
            className="overflow-hidden rounded-3xl border border-border bg-card transition-all hover:-translate-y-1 hover:border-accent/50"
          >
            <button
              type="button"
              onClick={() => setOpen(open === i ? null : i)}
              className="flex w-full flex-col gap-2 px-7 py-6 text-left"
            >
              <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-muted">
                <span className="rounded-full bg-gradient-to-r from-accent to-accent-2 px-3 py-0.5 font-semibold text-background">
                  {post.category}
                </span>
                <span>{post.date}</span>
              </div>
              <h3 className="text-xl font-bold">{post.title}</h3>
              <p className="text-sm text-muted">{post.excerpt}</p>
            </button>

            {open === i && (
              <div className="border-t border-border px-7 py-6">
                <Markdown content={post.content} />
                <a
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block font-mono text-sm font-semibold text-accent"
                >
                  {t.default.blog.readMore} →
                </a>
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
