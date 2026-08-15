"use client";

import { useState } from "react";
import { useI18n } from "@/i18n";
import Markdown from "@/components/shared/Markdown";

export default function PastelBlog() {
  const { t } = useI18n();
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="blog" className="mx-auto max-w-5xl px-6 py-16 md:py-24">
      <div className="text-center">
        <p className="font-mono text-sm text-accent">{t.default.blog.label}</p>
        <h2 className="mt-3 text-3xl font-bold text-foreground">
          {t.default.blog.title}
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-muted">
          {t.default.blog.description}
        </p>
      </div>

      <div className="mt-14 space-y-5">
        {t.default.blog.items.map((post, i) => (
          <article
            key={post.title}
            className="overflow-hidden rounded-3xl bg-gradient-to-br from-accent/10 to-accent-2/10 ring-1 ring-border/60 transition-transform hover:-translate-y-1"
          >
            <button
              type="button"
              onClick={() => setOpen(open === i ? null : i)}
              className="flex w-full flex-col gap-2 px-7 py-6 text-left"
            >
              <div className="flex flex-wrap items-center gap-2 text-sm text-muted">
                <span className="rounded-full bg-accent/15 px-3 py-0.5 font-medium text-accent">
                  {post.category}
                </span>
                <span>{post.date}</span>
              </div>
              <h3 className="text-xl font-bold text-foreground">
                {post.title}
              </h3>
              <p className="text-sm text-muted">{post.excerpt}</p>
            </button>

            {open === i && (
              <div className="border-t border-border/60 px-7 py-6">
                <Markdown content={post.content} />
                <a
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block font-mono text-sm font-medium text-accent underline underline-offset-4"
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
