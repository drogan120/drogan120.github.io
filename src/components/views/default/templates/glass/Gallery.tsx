"use client";

import { useI18n } from "@/i18n";
import { useGallery } from "@/hooks/useGallery";
import {
  GalleryCarousel,
  GalleryMasonry,
} from "@/components/shared/GalleryLayout";

export default function GlassGallery() {
  const { t } = useI18n();
  const { items, platform, choose, platforms, expanded, toggleExpanded, total } =
    useGallery();

  const cardStyles = {
    card: "rounded-3xl border border-white/15 bg-white/10 p-4 backdrop-blur-xl sm:p-5",
    title: "text-sm font-bold",
    arrow:
      "flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/10 text-lg backdrop-blur-xl transition-all hover:border-accent/40 hover:bg-white/15 disabled:pointer-events-none disabled:opacity-30",
  };

  return (
    <section id="gallery" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-1/2 mx-auto h-72 w-72 max-w-full -translate-y-1/2 rounded-full bg-accent/15 blur-[140px]" />

      <div className="relative mx-auto max-w-5xl px-6 py-16 md:py-24">
        <div className="text-center">
          <p className="font-mono text-sm text-accent">
            {t.default.gallery.label}
          </p>
          <h2 className="mt-3 text-2xl font-bold sm:text-3xl">
            {t.default.gallery.title}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted">
            {t.default.gallery.description}
          </p>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {platforms.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => choose(p)}
              className={`rounded-full border px-4 py-1.5 text-xs font-semibold backdrop-blur-xl transition-all ${
                p === platform
                  ? "border-accent/50 bg-accent/20 text-foreground"
                  : "border-white/15 bg-white/10 text-muted hover:border-accent/40 hover:text-foreground"
              }`}
            >
              {p === "All" ? t.default.gallery.all : p}
            </button>
          ))}
        </div>

        <div className="mt-10">
          {expanded ? (
            <GalleryMasonry items={items} styles={cardStyles} />
          ) : (
            <GalleryCarousel items={items} styles={cardStyles} />
          )}
        </div>

        {total > 1 && (
          <div className="mt-8 text-center">
            <button
              type="button"
              onClick={toggleExpanded}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-6 py-2.5 text-sm font-semibold backdrop-blur-xl transition-all hover:border-accent/40 hover:bg-white/15"
            >
              {expanded ? t.default.gallery.less : t.default.gallery.more}
              <span
              aria-hidden
              className={`inline-block transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
            >
              ↓
            </span>
            </button>
            <p className="mt-3 font-mono text-xs text-muted">
              {t.default.gallery.count
                .replace("{shown}", String(items.length))
                .replace("{total}", String(total))}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
