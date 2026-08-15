"use client";

import { useState } from "react";
import { useI18n } from "@/i18n";
import Markdown from "@/components/shared/Markdown";

export default function FashionBlog() {
  const { t } = useI18n();
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="blog" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-8 py-16 md:py-24">
        <p className="text-center text-xs uppercase tracking-[0.4em] text-accent">
          {t.default.blog.label}
        </p>
        <h2 className="mt-6 text-center font-serif text-5xl font-light">
          {t.default.blog.title}
        </h2>

        <div className="mx-auto mt-14 max-w-4xl divide-y divide-border border-y border-border">
          {t.default.blog.items.map((post, i) => (
            <article key={post.title}>
              <button
                type="button"
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full flex-col gap-2 px-2 py-8 text-left transition-colors hover:text-accent"
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className="font-serif text-2xl font-light">
                    {post.title}
                  </h3>
                  <span className="shrink-0 text-xs uppercase tracking-[0.3em] text-muted">
                    {post.date}
                  </span>
                </div>
                <p className="max-w-2xl text-sm text-muted">{post.excerpt}</p>
                <span className="text-xs uppercase tracking-[0.3em] text-accent">
                  {post.category}
                </span>
              </button>

              {open === i && (
                <div className="px-2 pb-8">
                  <Markdown content={post.content} />
                  <a
                    href={post.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-block text-xs uppercase tracking-[0.3em] text-accent underline underline-offset-4"
                  >
                    {t.default.blog.readMore}
                  </a>
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
