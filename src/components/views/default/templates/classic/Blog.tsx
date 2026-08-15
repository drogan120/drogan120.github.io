"use client";

import { useState } from "react";
import { useI18n } from "@/i18n";
import Markdown from "@/components/shared/Markdown";

export default function ClassicBlog() {
  const { t } = useI18n();
  const [open, setOpen] = useState<number | null>(null);

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
        {t.default.blog.items.map((post, i) => (
          <article
            key={post.title}
            className="overflow-hidden rounded-2xl border border-border bg-card transition-colors hover:border-accent/50"
          >
            <button
              type="button"
              onClick={() => setOpen(open === i ? null : i)}
              className="flex w-full flex-col gap-2 px-7 py-6 text-left"
            >
              <div className="flex flex-wrap items-center gap-2 text-sm text-muted">
                <span className="rounded-full bg-accent/10 px-3 py-0.5 font-medium text-accent">
                  {post.category}
                </span>
                <span>{post.date}</span>
              </div>
              <h3 className="text-xl font-semibold">{post.title}</h3>
              <p className="text-sm text-muted">{post.excerpt}</p>
            </button>

            {open === i && (
              <div className="border-t border-border px-7 py-6">
                <Markdown content={post.content} />
                <a
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block text-sm font-semibold text-accent underline underline-offset-4"
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
