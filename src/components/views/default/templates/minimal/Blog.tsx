"use client";

import { useState } from "react";
import { useI18n } from "@/i18n";
import Markdown from "@/components/shared/Markdown";

export default function MinimalBlog() {
  const { t } = useI18n();
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="blog" className="mx-auto max-w-5xl px-6 py-16 md:py-24">
      <p className="font-mono text-sm text-accent">{t.default.blog.label}</p>
      <h2 className="mt-3 text-3xl font-bold">{t.default.blog.title}</h2>
      <p className="mt-3 max-w-xl text-muted">{t.default.blog.description}</p>

      <div className="mt-10 space-y-4">
        {t.default.blog.items.map((post, i) => (
          <article
            key={post.title}
            className="overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-accent/40"
          >
            <button
              type="button"
              onClick={() => setOpen(open === i ? null : i)}
              className="flex w-full flex-col gap-2 px-6 py-5 text-left"
            >
              <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-muted">
                <span className="rounded bg-accent/10 px-2 py-0.5 text-accent">
                  {post.category}
                </span>
                <span>{post.date}</span>
              </div>
              <h3 className="text-lg font-semibold">{post.title}</h3>
              <p className="text-sm text-muted">{post.excerpt}</p>
            </button>

            {open === i && (
              <div className="border-t border-border px-6 py-5">
                <Markdown content={post.content} />
                <a
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block font-mono text-sm text-accent underline underline-offset-4"
                >
                  {t.default.blog.readMore} ↗
                </a>
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
