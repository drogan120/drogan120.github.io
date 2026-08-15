import Link from "next/link";
import { useI18n } from "@/i18n";
import { blogPosts } from "@/data/blogIndex";
import Json from "./Json";

export default function Blog() {
  const { t } = useI18n();

  return (
    <section id="blog" className="mx-auto max-w-4xl px-6 py-16">
      <div className="flex items-center gap-3">
        <span className="rounded-md bg-get/15 px-2.5 py-1 font-mono text-xs font-bold text-get">
          GET
        </span>
        <h2 className="font-mono text-xl font-semibold">/blog</h2>
      </div>

      <p className="mt-6 max-w-3xl text-sm text-muted">
        {t.apiDocs.blog.description}
      </p>

      <div className="mt-8 overflow-hidden rounded-xl border border-border bg-card">
        <div className="border-b border-border px-4 py-2 font-mono text-xs text-muted">
          {t.apiDocs.blog.response}
        </div>
        <Json
          data={blogPosts.map(({ id, title, date, language, category, tags }) => ({
            id,
            title,
            date,
            language,
            category,
            tags,
          }))}
        />
      </div>

      <Link
        href="/blog"
        className="mt-6 inline-block font-mono text-sm text-accent underline underline-offset-4"
      >
        {t.default.blog.viewAll} →
      </Link>
    </section>
  );
}
