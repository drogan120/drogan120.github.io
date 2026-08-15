"use client";

import { useI18n } from "@/i18n";
import { useGallery } from "@/hooks/useGallery";
import {
  GalleryCarousel,
  GalleryMasonry,
} from "@/components/shared/GalleryLayout";

export default function ClassicGallery() {
  const { t } = useI18n();
  const { items, platform, choose, platforms, expanded, toggleExpanded, total } =
    useGallery();

  return (
    <section id="gallery" className="mx-auto max-w-5xl px-6 py-16 md:py-24">
      <p className="text-center font-mono text-sm text-accent">
        {t.default.gallery.label}
      </p>
      <h2 className="mt-2 text-center text-2xl font-bold sm:text-3xl">
        {t.default.gallery.title}
      </h2>
      <p className="mx-auto mt-3 max-w-xl text-center text-muted">
        {t.default.gallery.description}
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-2">
        {platforms.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => choose(p)}
            className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
              p === platform
                ? "bg-accent text-background"
                : "border border-border text-muted hover:border-accent hover:text-foreground"
            }`}
          >
            {p === "All" ? t.default.gallery.all : p}
          </button>
        ))}
      </div>

      <div className="mt-10">
        {expanded ? (
          <GalleryMasonry items={items} />
        ) : (
          <GalleryCarousel items={items} />
        )}
      </div>

      {total > 1 && (
        <div className="mt-8 text-center">
          <button
            type="button"
            onClick={toggleExpanded}
            className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-2.5 text-sm font-semibold transition-colors hover:border-accent hover:text-accent"
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
    </section>
  );
}
