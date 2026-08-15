"use client";

import Link from "next/link";
import type { BlogPost } from "@/data/types";
import { blogPosts, languageLabel } from "@/data/blogIndex";
import { useI18n } from "@/i18n";
import SettingsBar from "@/components/shared/SettingsBar";
import Markdown from "@/components/shared/Markdown";

export default function BlogArticle({ post }: { post: BlogPost }) {
  const { t } = useI18n();
  const index = blogPosts.findIndex((p) => p.id === post.id);
  const prev = index > 0 ? blogPosts[index - 1] : null;
  const next = index < blogPosts.length - 1 ? blogPosts[index + 1] : null;

  return (
    <main className="mx-auto max-w-2xl px-6 py-12 md:py-20">
      <div className="flex items-start justify-between gap-4">
        <Link
          href="/blog"
          className="font-mono text-sm text-muted transition-colors hover:text-accent"
        >
          ← {t.default.blog.title}
        </Link>
        <SettingsBar />
      </div>

      <article className="mt-8">
        <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-muted">
          <span className="rounded bg-accent/10 px-2 py-0.5 text-accent">
            {post.category}
          </span>
          <span>{post.date}</span>
          <span className="rounded border border-border px-2 py-0.5">
            {languageLabel(post.language)}
          </span>
        </div>

        <h1 className="mt-4 text-2xl font-bold leading-snug md:text-3xl">
          {post.title}
        </h1>

        <div className="mt-3 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Link
              key={tag}
              href="/blog"
              className="tag-chip rounded-full border border-border px-3 py-1 font-mono text-xs text-muted hover:border-accent hover:text-accent"
            >
              #{tag}
            </Link>
          ))}
        </div>

        <div className="mt-8 border-t border-border pt-8 text-muted">
          <Markdown content={post.content} />
        </div>
      </article>

      <nav className="mt-12 grid gap-3 border-t border-border pt-8 sm:grid-cols-2">
        {prev ? (
          <Link
            href={`/blog/${prev.id}`}
            className="rounded-xl border border-border bg-card px-5 py-4 transition-colors hover:border-accent/40"
          >
            <span className="font-mono text-xs text-muted">← prev</span>
            <p className="mt-1 text-sm font-semibold">{prev.title}</p>
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link
            href={`/blog/${next.id}`}
            className="rounded-xl border border-border bg-card px-5 py-4 text-right transition-colors hover:border-accent/40 sm:text-right"
          >
            <span className="font-mono text-xs text-muted">next →</span>
            <p className="mt-1 text-sm font-semibold">{next.title}</p>
          </Link>
        )}
      </nav>
    </main>
  );
}