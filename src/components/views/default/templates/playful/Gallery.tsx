"use client";

import { useI18n } from "@/i18n";
import { useGallery } from "@/hooks/useGallery";
import {
  GalleryCarousel,
  GalleryMasonry,
} from "@/components/shared/GalleryLayout";

export default function PlayfulGallery() {
  const { t } = useI18n();
  const { items, platform, choose, platforms, expanded, toggleExpanded, total } =
    useGallery();

  return (
    <section id="gallery">
      <div className="mx-auto max-w-5xl px-6 py-16 md:py-24">
        <div className="text-center">
          <p className="font-mono text-sm text-accent">
            {t.default.gallery.label}
          </p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
            {t.default.gallery.title}
          </h2>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-2.5">
          {platforms.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => choose(p)}
              className={`pop-on-click rounded-full px-4 py-2 text-sm font-bold transition-all ${
                p === platform
                  ? "bg-accent text-background shadow-lg shadow-accent/30"
                  : "bg-card text-muted hover:-translate-y-0.5 hover:text-foreground"
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
            <GalleryCarousel
              items={items}
              styles={{
                arrow:
                  "flex h-11 w-11 items-center justify-center rounded-full bg-card text-lg transition-all hover:-translate-y-0.5 hover:text-accent disabled:pointer-events-none disabled:opacity-30",
              }}
            />
          )}
        </div>

        {total > 1 && (
          <div className="mt-8 text-center">
            <button
              type="button"
              onClick={toggleExpanded}
              className="pop-on-click inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-bold text-background shadow-lg shadow-accent/30 transition-transform hover:-translate-y-0.5"
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
