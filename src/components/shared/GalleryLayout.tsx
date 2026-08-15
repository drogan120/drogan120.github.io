"use client";

import type { CSSProperties } from "react";
import PhoneMockup from "./PhoneMockup";
import { sizeFor, useCarousel } from "@/hooks/useGallery";
import type { GalleryItem } from "@/data/types";

/** Index handed to CSS so each card can stagger its own entrance. */
function stagger(i: number): CSSProperties {
  return { "--i": i } as CSSProperties;
}

/**
 * Per-template styling slots. The behaviour (scroll snapping, arrow state,
 * masonry flow) is shared; only these classes change between templates so each
 * one keeps its own visual identity.
 */
export type GalleryStyles = {
  card?: string;
  title?: string;
  tag?: string;
  arrow?: string;
};

function Caption({
  item,
  styles,
}: {
  item: GalleryItem;
  styles: GalleryStyles;
}) {
  return (
    <>
      <p className={`text-center break-words ${styles.title ?? "text-sm font-semibold"}`}>
        {item.title}
      </p>
      <p
        className={`text-center break-words ${styles.tag ?? "font-mono text-xs text-muted"}`}
      >
        {item.tag}
      </p>
    </>
  );
}

/**
 * Collapsed state: a horizontal scroll-snap track. Swipeable on touch, arrow
 * driven on desktop. Arrows hide themselves when there is nothing to scroll.
 */
export function GalleryCarousel({
  items,
  styles = {},
  prevLabel = "Previous",
  nextLabel = "Next",
}: {
  items: GalleryItem[];
  styles?: GalleryStyles;
  prevLabel?: string;
  nextLabel?: string;
}) {
  const { ref, atStart, atEnd, canScroll, prev, next } = useCarousel([
    items.length,
  ]);

  const arrow =
    styles.arrow ??
    "flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background text-lg transition-colors hover:border-accent hover:text-accent disabled:pointer-events-none disabled:opacity-30";

  return (
    <div className="gallery-collapse relative">
      <div
        ref={ref}
        className="no-scrollbar -mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-6 pb-2 sm:gap-6"
      >
        {items.map((item, i) => (
          <div
            key={item.id}
            style={stagger(i)}
            className={`gallery-item flex shrink-0 snap-start basis-[46%] flex-col items-center gap-3 sm:basis-[31%] lg:basis-[23%] ${styles.card ?? ""}`}
          >
            <PhoneMockup item={item} size="lg" className="phone-hover" />
            <Caption item={item} styles={styles} />
          </div>
        ))}
      </div>

      {canScroll && (
        <div className="mt-6 flex justify-center gap-3">
          <button
            type="button"
            onClick={prev}
            disabled={atStart}
            aria-label={prevLabel}
            className={arrow}
          >
            ←
          </button>
          <button
            type="button"
            onClick={next}
            disabled={atEnd}
            aria-label={nextLabel}
            className={arrow}
          >
            →
          </button>
        </div>
      )}
    </div>
  );
}

/**
 * Expanded state: CSS-column masonry. Phones vary in size so a long list reads
 * like a gallery wall instead of a spreadsheet, and columns collapse to 2 on
 * phones so nothing gets squeezed.
 */
export function GalleryMasonry({
  items,
  styles = {},
}: {
  items: GalleryItem[];
  styles?: GalleryStyles;
}) {
  return (
    <div className="gallery-expand columns-2 gap-4 sm:columns-3 sm:gap-6 lg:columns-4">
      {items.map((item, i) => (
        <div
          key={item.id}
          style={stagger(i)}
          className={`gallery-item mb-4 flex break-inside-avoid flex-col items-center gap-3 sm:mb-6 ${styles.card ?? ""}`}
        >
          <PhoneMockup item={item} size={sizeFor(i)} className="phone-hover" />
          <Caption item={item} styles={styles} />
        </div>
      ))}
    </div>
  );
}
