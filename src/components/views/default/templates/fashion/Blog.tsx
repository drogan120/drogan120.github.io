"use client";

import { useState } from "react";
import Link from "next/link";
import { useI18n } from "@/i18n";
import { latestPosts, languageLabel } from "@/data/blogIndex";
import Markdown from "@/components/shared/Markdown";

const posts = latestPosts(5);

export default function FashionBlog() {
  const { t } = useI18n();
  const [open, setOpen] = useState<string | null>(null);

  return (
    <section id="blog" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:px-8 md:py-24">
        <p className="text-center text-xs uppercase tracking-[0.4em] text-accent">
          {t.default.blog.label}
        </p>
        <h2 className="mt-6 text-center font-serif text-4xl font-light sm:text-5xl">
          {t.default.blog.title}
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-center text-sm leading-loose text-muted">
          {t.default.blog.description}
        </p>

        <div className="mx-auto mt-14 max-w-4xl divide-y divide-border border-y border-border">
          {posts.map((post, i) => (
            <article
              key={post.id}
              className="card-in"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <button
                type="button"
                onClick={() => setOpen(open === post.id ? null : post.id)}
                className="flex w-full flex-col gap-2 px-2 py-8 text-left transition-colors hover:text-accent"
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-serif text-2xl font-light">
                    {post.title}
                  </h3>
                  <span className="shrink-0 text-[10px] uppercase tracking-[0.3em] text-muted">
                    {post.date}
                  </span>
                </div>
                <p className="max-w-2xl text-sm text-muted">{post.excerpt}</p>
                <div className="flex flex-wrap items-center gap-4">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-accent">
                    {post.category}
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.3em] text-muted">
                    {languageLabel(post.language)}
                  </span>
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] uppercase tracking-[0.2em] text-muted/70"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </button>

              {open === post.id && (
                <div className="px-2 pb-10">
                  <div className="max-h-64 overflow-hidden border-t border-border pt-6 text-muted">
                    <Markdown content={post.content} />
                  </div>
                  <Link
                    href={`/blog/${post.id}`}
                    className="mt-6 inline-block border-b border-accent pb-1 text-[10px] uppercase tracking-[0.3em] text-accent"
                  >
                    {t.default.blog.readFull}
                  </Link>
                </div>
              )}
            </article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/blog"
            className="inline-block border border-foreground px-10 py-4 text-[10px] uppercase tracking-[0.4em] transition-colors hover:bg-foreground hover:text-background"
          >
            {t.default.blog.viewAll}
          </Link>
        </div>
      </div>
    </section>
  );
}