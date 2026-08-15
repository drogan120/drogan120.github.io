import type { BlogPost } from "./types";

// Add a new post: drop a JSON file in src/data/blog/ then import it here.
import whyAndroidJp from "./blog/why_android_jp.json";
import whyKotlinJp from "./blog/why_kotlin_jp.json";
import whyTypescriptJp from "./blog/why_typescript_jp.json";
import whyPythonJp from "./blog/why_python_jp.json";
import whyPortfolioEn from "./blog/why_portfolio_en.json";

const posts: BlogPost[] = [
  whyAndroidJp,
  whyKotlinJp,
  whyTypescriptJp,
  whyPythonJp,
  whyPortfolioEn,
] as BlogPost[];

/** Posts sorted newest first. */
export const blogPosts: BlogPost[] = [...posts].sort((a, b) =>
  b.date.localeCompare(a.date)
);

/** Unique languages present across all posts. */
export const blogLanguages: string[] = Array.from(
  new Set(blogPosts.map((p) => p.language))
);

/** Unique tags across all posts, alphabetically sorted. */
export const blogTags: string[] = Array.from(
  new Set(blogPosts.flatMap((p) => p.tags))
).sort();

/** The n newest posts, for the homepage preview. */
export function latestPosts(n: number): BlogPost[] {
  return blogPosts.slice(0, n);
}

export function getPostById(id: string): BlogPost | undefined {
  return blogPosts.find((p) => p.id === id);
}

/** Sentinel value for the "no filter" state. */
export const ALL = "All";

const LANGUAGE_LABELS: Record<string, string> = {
  ja: "日本語",
  en: "English",
  id: "Indonesia",
};

export function languageLabel(code: string) {
  return code === ALL ? ALL : (LANGUAGE_LABELS[code] ?? code.toUpperCase());
}