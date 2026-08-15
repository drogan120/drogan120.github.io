"use client";

import { useState } from "react";
import { useI18n } from "@/i18n";
import Markdown from "@/components/shared/Markdown";

export default function BrutalistBlog() {
  const { t } = useI18n();
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="blog" className="border-b-4 border-foreground">
      <div className="mx-auto max-w-6xl px-6 py-12 md:py-20">
        <h2 className="text-3xl font-black uppercase tracking-tight">
          {t.default.blog.title}
        </h2>
        <p className="mt-2 font-mono text-xs font-bold text-accent">
          [{t.default.blog.label}]
        </p>

        <div className="mt-10 space-y-0">
          {t.default.blog.items.map((post, i) => (
            <article
              key={post.title}
              className="border-2 border-foreground bg-card p-6"
              style={i !== 0 ? { borderTop: 0 } : undefined}
            >
              <button
                type="button"
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full flex-col gap-2 text-left"
              >
                <div className="flex flex-wrap items-center gap-2 font-mono text-xs font-bold uppercase">
                  <span className="bg-accent px-2 py-0.5 text-background">
                    {post.category}
                  </span>
                  <span>{post.date}</span>
                </div>
                <h3 className="text-lg font-black uppercase tracking-tight">
                  {post.title}
                </h3>
                <p className="font-mono text-sm">{post.excerpt}</p>
              </button>

              {open === i && (
                <div className="mt-4 border-t-2 border-foreground pt-4">
                  <Markdown content={post.content} />
                  <a
                    href={post.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-block bg-accent px-3 py-1.5 font-mono text-xs font-bold uppercase text-background"
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
