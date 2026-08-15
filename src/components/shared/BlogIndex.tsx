"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { blogPosts, blogLanguages, blogTags, languageLabel, ALL } from "@/data/blogIndex";
import { useI18n } from "@/i18n";
import SettingsBar from "@/components/shared/SettingsBar";

export default function BlogIndex() {
  const { t } = useI18n();
  const [language, setLanguage] = useState<string>(ALL);
  const [activeTags, setActiveTags] = useState<string[]>([]);

  const toggleTag = (tag: string) =>
    setActiveTags((prev) =>
      prev.includes(tag) ? prev.filter((x) => x !== tag) : [...prev, tag]
    );

  const posts = useMemo(
    () =>
      blogPosts.filter(
        (post) =>
          (language === ALL || post.language === language) &&
          (activeTags.length === 0 ||
            activeTags.every((tag) => post.tags.includes(tag)))
      ),
    [language, activeTags]
  );

  const chip = (active: boolean) =>
    `tag-chip pop-on-click rounded-full border px-3.5 py-1.5 font-mono text-xs ${
      active
        ? "border-accent bg-accent text-background"
        : "border-border text-muted hover:border-accent hover:text-accent"
    }`;

  return (
    <main className="mx-auto max-w-3xl px-6 py-12 md:py-20">
      <div className="flex items-start justify-between gap-4">
        <div>
          <Link
            href="/"
            className="font-mono text-sm text-muted transition-colors hover:text-accent"
          >
            ← {t.default.nav.about}
          </Link>
          <h1 className="mt-4 text-3xl font-bold md:text-4xl">
            {t.default.blog.title}
          </h1>
          <p className="mt-3 max-w-xl text-muted">
            {t.default.blog.description}
          </p>
        </div>
        <SettingsBar />
      </div>

      <div className="mt-10 space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-mono text-xs text-muted">
            {t.default.blog.filterLanguage}:
          </span>
          {[ALL, ...blogLanguages].map((code) => (
            <button
              key={code}
              type="button"
              onClick={() => setLanguage(code)}
              className={chip(language === code)}
            >
              {languageLabel(code)}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="font-mono text-xs text-muted">
            {t.default.blog.filterTag}:
          </span>
          {blogTags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => toggleTag(tag)}
              className={chip(activeTags.includes(tag))}
            >
              #{tag}
            </button>
          ))}
          {activeTags.length > 0 && (
            <button
              type="button"
              onClick={() => setActiveTags([])}
              className="font-mono text-xs text-accent underline underline-offset-4"
            >
              reset
            </button>
          )}
        </div>
      </div>

      <p className="mt-6 font-mono text-xs text-muted">
        {posts.length} {t.default.blog.showing}
      </p>

      <div className="mt-4 space-y-4">
        {posts.map((post, i) => (
          <article
            key={post.id}
            className="card-in rounded-xl border border-border bg-card transition-all hover:-translate-y-0.5 hover:border-accent/40"
            style={{ animationDelay: `${i * 50}ms` }}
          >
            <Link
              href={`/blog/${post.id}`}
              className="flex flex-col gap-2 px-6 py-5"
            >
              <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-muted">
                <span className="rounded bg-accent/10 px-2 py-0.5 text-accent">
                  {post.category}
                </span>
                <span>{post.date}</span>
                <span className="rounded border border-border px-2 py-0.5">
                  {languageLabel(post.language)}
                </span>
              </div>
              <h2 className="text-lg font-semibold">{post.title}</h2>
              <p className="text-sm text-muted">{post.excerpt}</p>
              <div className="mt-1 flex flex-wrap gap-1.5">
                {post.tags.map((tag) => (
                  <span key={tag} className="font-mono text-xs text-muted/80">
                    #{tag}
                  </span>
                ))}
              </div>
            </Link>
          </article>
        ))}

        {posts.length === 0 && (
          <p className="rounded-xl border border-dashed border-border py-12 text-center text-sm text-muted">
            {t.default.blog.empty}
          </p>
        )}
      </div>
    </main>
  );
}