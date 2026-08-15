"use client";

import { useI18n } from "@/i18n";
import { useGallery } from "@/hooks/useGallery";
import {
  GalleryCarousel,
  GalleryMasonry,
} from "@/components/shared/GalleryLayout";

export default function FashionGallery() {
  const { t } = useI18n();
  const { items, platform, choose, platforms, expanded, toggleExpanded, total } =
    useGallery();

  const cardStyles = {
    title: "font-serif text-lg font-light",
    tag: "text-[10px] uppercase tracking-[0.3em] text-muted",
    arrow:
      "flex h-11 w-11 items-center justify-center border border-border text-sm transition-colors hover:border-accent hover:text-accent disabled:pointer-events-none disabled:opacity-30",
  };

  return (
    <section id="gallery" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:px-8 md:py-24">
        <p className="text-center text-xs uppercase tracking-[0.3em] text-accent sm:tracking-[0.4em]">
          {t.default.gallery.label}
        </p>
        <h2 className="mt-6 text-center font-serif text-3xl font-light sm:text-4xl md:text-5xl">
          {t.default.gallery.title}
        </h2>

        <div className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-3">
          {platforms.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => choose(p)}
              className={`pb-1 text-[11px] uppercase tracking-[0.25em] transition-colors ${
                p === platform
                  ? "border-b border-accent text-accent"
                  : "text-muted hover:text-foreground"
              }`}
            >
              {p === "All" ? t.default.gallery.all : p}
            </button>
          ))}
        </div>

        <div className="mx-auto mt-14 max-w-4xl">
          {expanded ? (
            <GalleryMasonry items={items} styles={cardStyles} />
          ) : (
            <GalleryCarousel items={items} styles={cardStyles} />
          )}
        </div>

        {total > 1 && (
          <div className="mt-12 text-center">
            <button
              type="button"
              onClick={toggleExpanded}
              className="text-xs uppercase tracking-[0.3em] text-foreground underline underline-offset-8 transition-opacity hover:opacity-60"
            >
              {expanded ? t.default.gallery.less : t.default.gallery.more}
            </button>
            <p className="mt-4 text-[10px] uppercase tracking-[0.3em] text-muted">
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
