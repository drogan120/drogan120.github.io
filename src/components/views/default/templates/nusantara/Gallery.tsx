"use client";

import { useI18n } from "@/i18n";
import { useGallery } from "@/hooks/useGallery";
import {
  GalleryCarousel,
  GalleryMasonry,
} from "@/components/shared/GalleryLayout";
import { Section, SectionHeading } from "./Chrome";

export default function NusantaraGallery() {
  const { t } = useI18n();
  const {
    items,
    platform,
    choose,
    platforms,
    expanded,
    toggleExpanded,
    total,
  } = useGallery();

  return (
    <Section id="gallery">
      <SectionHeading
        eyebrow={t.default.gallery.label.replace("// ", "")}
        title={t.default.gallery.title}
        description={t.default.gallery.description}
      />

      <div className="mt-8 flex flex-wrap gap-2">
        {platforms.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => choose(p)}
            aria-pressed={p === platform}
            className={`rounded-lg px-4 py-1.5 font-mono text-xs transition-colors ${
              p === platform
                ? "bg-accent font-bold text-background"
                : "border border-border bg-card text-muted hover:border-accent hover:text-accent"
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

      <div className="mt-8 flex flex-wrap items-center gap-4">
        {total > 1 && (
          <button
            type="button"
            onClick={toggleExpanded}
            className="inline-flex items-center gap-2 font-mono text-sm text-accent underline underline-offset-4 transition-colors hover:text-accent-2"
          >
            {expanded ? t.default.gallery.less : t.default.gallery.more}
            <span
              aria-hidden
              className={`inline-block transition-transform duration-300 ${
                expanded ? "rotate-180" : ""
              }`}
            >
              ↓
            </span>
          </button>
        )}
        <span className="font-mono text-xs text-muted">
          {t.default.gallery.count
            .replace("{shown}", String(items.length))
            .replace("{total}", String(total))}
        </span>
      </div>
    </Section>
  );
}