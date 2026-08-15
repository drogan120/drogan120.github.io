"use client";

import { useState } from "react";
import { useI18n } from "@/i18n";
import Markdown from "@/components/shared/Markdown";

export default function GlassBlog() {
  const { t } = useI18n();
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="blog" className="relative">
      <div className="pointer-events-none absolute inset-x-0 top-1/2 mx-auto h-72 w-72 -translate-y-1/2 rounded-full bg-accent/15 blur-[140px]" />

      <div className="relative mx-auto max-w-5xl px-6 py-16 md:py-24">
        <div className="text-center">
          <p className="font-mono text-sm text-accent">{t.default.blog.label}</p>
          <h2 className="mt-3 text-3xl font-bold">{t.default.blog.title}</h2>
          <p className="mx-auto mt-3 max-w-xl text-muted">
            {t.default.blog.description}
          </p>
        </div>

        <div className="mt-14 space-y-5">
          {t.default.blog.items.map((post, i) => (
            <article
              key={post.title}
              className="overflow-hidden rounded-3xl border border-white/15 bg-white/10 backdrop-blur-xl transition-all hover:border-accent/40 hover:bg-white/15"
            >
              <button
                type="button"
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full flex-col gap-2 px-7 py-6 text-left"
              >
                <div className="flex flex-wrap items-center gap-2 text-sm text-muted">
                  <span className="rounded-full border border-accent/40 px-3 py-0.5 font-medium text-accent">
                    {post.category}
                  </span>
                  <span>{post.date}</span>
                </div>
                <h3 className="text-xl font-bold">{post.title}</h3>
                <p className="text-sm text-muted">{post.excerpt}</p>
              </button>

              {open === i && (
                <div className="border-t border-white/15 px-7 py-6">
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
      </div>
    </section>
  );
}
