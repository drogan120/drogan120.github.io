"use client";

import { useI18n } from "@/i18n";
import { useGallery } from "@/hooks/useGallery";
import {
  GalleryCarousel,
  GalleryMasonry,
} from "@/components/shared/GalleryLayout";

export default function BrutalistGallery() {
  const { t } = useI18n();
  const { items, platform, choose, platforms, expanded, toggleExpanded, total } =
    useGallery();

  const cardStyles = {
    card: "border-2 border-foreground bg-card p-3 sm:p-4",
    title: "font-mono text-sm font-bold uppercase",
    tag: "font-mono text-xs font-bold uppercase text-muted",
    arrow:
      "flex h-11 w-11 items-center justify-center border-2 border-foreground bg-card font-bold transition-colors hover:bg-accent hover:text-background disabled:pointer-events-none disabled:opacity-30",
  };

  return (
    <section id="gallery" className="border-b-4 border-foreground">
      <div className="mx-auto max-w-6xl px-6 py-12 md:py-20">
        <h2 className="text-2xl font-black uppercase tracking-tight sm:text-3xl">
          {t.default.gallery.title}
        </h2>
        <p className="mt-2 font-mono text-xs font-bold text-accent">
          [{t.default.gallery.label}]
        </p>

        <div className="mt-8 flex flex-wrap gap-2">
          {platforms.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => choose(p)}
              className={`border-2 border-foreground px-3 py-1.5 font-mono text-xs font-bold uppercase transition-colors ${
                p === platform
                  ? "bg-foreground text-background"
                  : "bg-card hover:bg-accent hover:text-background"
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
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={toggleExpanded}
              className="pop-on-click border-2 border-foreground px-6 py-3 font-mono text-sm font-bold uppercase transition-colors hover:bg-foreground hover:text-background"
            >
              {expanded ? t.default.gallery.less : t.default.gallery.more} →
            </button>
            <span className="font-mono text-xs font-bold uppercase text-muted">
              {t.default.gallery.count
                .replace("{shown}", String(items.length))
                .replace("{total}", String(total))}
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
