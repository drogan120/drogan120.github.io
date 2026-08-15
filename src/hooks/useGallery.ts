"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  galleryItems,
  galleryPlatforms,
  GALLERY_PAGE_SIZE,
} from "@/data/gallery";
import type { GalleryItem } from "@/data/types";

export const ALL_PLATFORMS = "All";

/**
 * Deterministic size buckets for the expanded masonry view.
 *
 * Varying the phone size stops 15 identical mockups from looking like a
 * spreadsheet, and because the bucket is derived from the index it stays stable
 * between renders (no random reshuffle on re-render or hydration mismatch).
 */
export type GallerySize = "sm" | "md" | "lg";

const SIZE_CYCLE: GallerySize[] = ["lg", "sm", "md", "sm", "md", "lg", "md", "sm"];

export function sizeFor(index: number): GallerySize {
  return SIZE_CYCLE[index % SIZE_CYCLE.length];
}

/**
 * Filter + carousel/masonry state for the gallery.
 *
 * Collapsed  -> horizontal scroll-snap carousel (swipeable on touch).
 * Expanded   -> responsive masonry with varied phone sizes.
 */
export function useGallery() {
  const [platform, setPlatform] = useState<string>(ALL_PLATFORMS);
  const [expanded, setExpanded] = useState(false);

  const filtered = useMemo(
    () =>
      platform === ALL_PLATFORMS
        ? galleryItems
        : galleryItems.filter((item) => item.platform === platform),
    [platform]
  );

  // The carousel shows everything (it scrolls); the masonry is the "expanded"
  // state, so collapsed only limits how many are reachable without expanding.
  const items: GalleryItem[] = expanded
    ? filtered
    : filtered.slice(0, GALLERY_PAGE_SIZE);

  const choose = (next: string) => {
    setPlatform(next);
    setExpanded(false);
  };

  return {
    items,
    all: filtered,
    platform,
    choose,
    platforms: [ALL_PLATFORMS, ...galleryPlatforms],
    expanded,
    toggleExpanded: () => setExpanded((v) => !v),
    hidden: filtered.length - items.length,
    total: filtered.length,
    shown: items.length,
  };
}

/**
 * Scroll-snap carousel controller: tracks whether the arrows can still move and
 * scrolls by one "page" (the visible width) at a time.
 */
export function useCarousel(deps: unknown[] = []) {
  const ref = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const sync = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    // 2px of slack absorbs sub-pixel rounding at fractional zoom levels.
    setAtStart(el.scrollLeft <= 2);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 2);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    sync();
    el.addEventListener("scroll", sync, { passive: true });

    // Keep the arrows honest when the container itself resizes.
    const ro =
      typeof ResizeObserver !== "undefined" ? new ResizeObserver(sync) : null;
    ro?.observe(el);

    return () => {
      el.removeEventListener("scroll", sync);
      ro?.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sync, ...deps]);

  const scrollBy = (dir: -1 | 1) => {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.9, behavior: "smooth" });
  };

  return {
    ref,
    atStart,
    atEnd,
    canScroll: !(atStart && atEnd),
    prev: () => scrollBy(-1),
    next: () => scrollBy(1),
  };
}
