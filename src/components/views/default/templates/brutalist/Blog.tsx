"use client";

import { useState } from "react";
import Link from "next/link";
import { useI18n } from "@/i18n";
import { latestPosts, languageLabel } from "@/data/blogIndex";
import Markdown from "@/components/shared/Markdown";

const posts = latestPosts(5);

export default function BrutalistBlog() {
  const { t } = useI18n();
  const [open, setOpen] = useState<string | null>(null);

  return (
    <section id="blog" className="border-b-4 border-foreground">
      <div className="mx-auto max-w-6xl px-6 py-12 md:py-20">
        <h2 className="text-3xl font-black uppercase tracking-tight">
          {t.default.blog.title}
        </h2>
        <p className="mt-2 font-mono text-xs font-bold text-accent">
          [{t.default.blog.label}]
        </p>

        <div className="mt-10">
          {posts.map((post, i) => (
            <article
              key={post.id}
              className="card-in border-2 border-foreground bg-card p-6"
              style={{
                animationDelay: `${i * 60}ms`,
                borderTop: i !== 0 ? 0 : undefined,
              }}
            >
              <button
                type="button"
                onClick={() => setOpen(open === post.id ? null : post.id)}
                className="flex w-full flex-col gap-2 text-left"
              >
                <div className="flex flex-wrap items-center gap-2 font-mono text-xs font-bold uppercase">
                  <span className="bg-accent px-2 py-0.5 text-background">
                    {post.category}
                  </span>
                  <span>{post.date}</span>
                  <span className="border-2 border-foreground px-2 py-0.5">
                    {languageLabel(post.language)}
                  </span>
                </div>
                <h3 className="text-lg font-black uppercase tracking-tight">
                  {post.title}
                </h3>
                <p className="font-mono text-sm">{post.excerpt}</p>
                <div className="mt-1 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-xs font-bold uppercase text-accent"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </button>

              {open === post.id && (
                <div className="mt-4 border-t-2 border-foreground pt-4">
                  <div className="max-h-64 overflow-hidden">
                    <Markdown content={post.content} />
                  </div>
                  <Link
                    href={`/blog/${post.id}`}
                    className="pop-on-click mt-4 inline-block border-2 border-foreground bg-accent px-4 py-2 font-mono text-xs font-bold uppercase text-background shadow-[3px_3px_0_0_var(--foreground)]"
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
          className="pop-on-click mt-8 inline-block border-2 border-foreground px-6 py-3 font-mono text-sm font-bold uppercase transition-colors hover:bg-foreground hover:text-background"
        >
          {t.default.blog.viewAll} →
        </Link>
      </div>
    </section>
  );
}