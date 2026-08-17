"use client";

import { useState } from "react";
import Link from "next/link";
import { useI18n } from "@/i18n";
import { latestPosts, languageLabel } from "@/data/blogIndex";
import Markdown from "@/components/shared/Markdown";
import { Section, SectionHeading } from "./Chrome";

const posts = latestPosts(5);

export default function BrokenBlog() {
  const { t } = useI18n();
  const [open, setOpen] = useState<string | null>(null);

  return (
    <Section id="blog">
      <SectionHeading
        index="07"
        eyebrow={t.default.blog.label.replace("// ", "")}
        title={t.default.blog.title}
        description={t.default.blog.description}
      />

      <div className="mt-12 space-y-4">
        {posts.map((post, i) => {
          const isOpen = open === post.id;

          return (
            <article
              key={post.id}
              className={`broken-tape bg-card transition-transform duration-300 hover:rotate-0 ${
                i % 2 === 0 ? "-rotate-1" : "rotate-1"
              }`}
            >
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : post.id)}
                aria-expanded={isOpen}
                className="flex w-full items-start gap-4 px-6 py-5 text-left sm:px-7"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] text-muted">
                    <span className="border border-accent bg-accent/10 px-2.5 py-0.5 font-semibold text-accent">
                      {post.category}
                    </span>
                    <span>{post.date}</span>
                    <span className="border border-border px-2.5 py-0.5">
                      {languageLabel(post.language)}
                    </span>
                  </div>

                  <h3 className="mt-3 text-lg font-bold break-words">
                    {post.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">
                    {post.excerpt}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span key={tag} className="font-mono text-[11px] text-muted">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <span
                  aria-hidden
                  className={`mt-1 shrink-0 text-accent transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                >
                  ↓
                </span>
              </button>

              {isOpen && (
                <div className="border-t border-border/60 px-6 py-5 sm:px-7">
                  <div className="max-h-64 overflow-hidden text-muted">
                    <Markdown content={post.content} />
                  </div>
                  <Link
                    href={`/blog/${post.id}`}
                    className="mt-4 inline-block font-mono text-sm text-accent underline underline-offset-4"
                  >
                    {t.default.blog.readFull} →
                  </Link>
                </div>
              )}
            </article>
          );
        })}
      </div>

      <Link
        href="/blog"
        className="mt-8 inline-block font-mono text-sm text-accent underline underline-offset-4 transition-colors hover:text-accent-2"
      >
        {t.default.blog.viewAll} →
      </Link>
    </Section>
  );
}
