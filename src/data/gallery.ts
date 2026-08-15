import type { GalleryItem } from "./types";

/**
 * Gallery items — single source of truth for every template and view.
 *
 * Titles are product names, so they stay identical across languages and are
 * intentionally not duplicated into the per-language JSON files.
 *
 * `src` is the path to a real screenshot (e.g. "/shots/notes.png"). While it is
 * null the UI falls back to a generated phone mockup, so screenshots can be
 * dropped in one at a time without touching any component.
 */
export const galleryItems: GalleryItem[] = [
  {
    id: "notes",
    title: "Aplikasi Catatan",
    tag: "Android · Kotlin",
    platform: "Android",
    accent: "#7c3aed",
    accent2: "#06b6d4",
    src: null,
  },
  {
    id: "habit-tracker",
    title: "Habit Tracker",
    tag: "Android · Compose",
    platform: "Android",
    accent: "#0ea5e9",
    accent2: "#22c55e",
    src: null,
  },
  {
    id: "expense-manager",
    title: "Expense Manager",
    tag: "Android · Room",
    platform: "Android",
    accent: "#f97316",
    accent2: "#facc15",
    src: null,
  },
  {
    id: "weather-now",
    title: "Weather Now",
    tag: "Android · Compose",
    platform: "Android",
    accent: "#38bdf8",
    accent2: "#818cf8",
    src: null,
  },
  {
    id: "music-player",
    title: "Music Player",
    tag: "Android · ExoPlayer",
    platform: "Android",
    accent: "#db2777",
    accent2: "#7c3aed",
    src: null,
  },
  {
    id: "task-reminder",
    title: "Task Reminder",
    tag: "Android · WorkManager",
    platform: "Android",
    accent: "#14b8a6",
    accent2: "#3b82f6",
    src: null,
  },
  {
    id: "simple-chat",
    title: "Chat Sederhana",
    tag: "Android · Firebase",
    platform: "Android",
    accent: "#f43f5e",
    accent2: "#fb923c",
    src: null,
  },
  {
    id: "portfolio-website",
    title: "Portfolio Website",
    tag: "Web · Next.js",
    platform: "Web",
    accent: "#ec4899",
    accent2: "#8b5cf6",
    src: null,
  },
  {
    id: "blog-engine",
    title: "Blog Engine",
    tag: "Web · TypeScript",
    platform: "Web",
    accent: "#6366f1",
    accent2: "#06b6d4",
    src: null,
  },
  {
    id: "admin-dashboard",
    title: "Dashboard Admin",
    tag: "Web · React",
    platform: "Web",
    accent: "#0f766e",
    accent2: "#4ade80",
    src: null,
  },
  {
    id: "store-landing",
    title: "Landing Page Toko",
    tag: "Web · Tailwind",
    platform: "Web",
    accent: "#e11d48",
    accent2: "#f59e0b",
    src: null,
  },
  {
    id: "rest-api-basic",
    title: "REST API Basic",
    tag: "Backend · Node.js",
    platform: "Backend",
    accent: "#10b981",
    accent2: "#3b82f6",
    src: null,
  },
  {
    id: "auth-service",
    title: "Auth Service",
    tag: "Backend · PostgreSQL",
    platform: "Backend",
    accent: "#475569",
    accent2: "#0ea5e9",
    src: null,
  },
  {
    id: "price-scraper",
    title: "Scraper Harga",
    tag: "Automation · Python",
    platform: "Automation",
    accent: "#ca8a04",
    accent2: "#65a30d",
    src: null,
  },
  {
    id: "telegram-bot",
    title: "Bot Telegram",
    tag: "Automation · Python",
    platform: "Automation",
    accent: "#2563eb",
    accent2: "#22d3ee",
    src: null,
  },
];

/** Platforms in first-seen order, for the filter row. */
export const galleryPlatforms: string[] = Array.from(
  new Set(galleryItems.map((item) => item.platform))
);

/** How many items are shown before the user asks for more. */
export const GALLERY_PAGE_SIZE = 6;
