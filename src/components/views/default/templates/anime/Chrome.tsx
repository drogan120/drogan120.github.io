"use client";

import type { ReactNode } from "react";

/**
 * Manga backdrop: a fixed layer of halftone dots plus a couple of drifting
 * "speed line" bursts. Kept very faint so text stays readable, and purely
 * decorative (aria-hidden).
 */
export function AnimeBackdrop() {
  return (
    <div aria-hidden className="anime-backdrop">
      <span className="anime-halftone" />
      <span className="anime-speedline anime-speedline-a" />
      <span className="anime-speedline anime-speedline-b" />
    </div>
  );
}

/** Consistent outer padding and max width for every anime section. */
export function Section({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`relative mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 md:py-28 ${className}`}
    >
      {children}
    </section>
  );
}

/**
 * Vertical Japanese watermark behind a section header. Renders as faint
 * vertical text (writing-mode: vertical-rl) so it reads like a manga cover
 * title without competing with the real heading.
 */
export function Kanji({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={`anime-kanji pointer-events-none absolute right-4 top-6 font-bold text-accent/10 select-none sm:right-10 sm:top-10 ${className}`}
    >
      {children}
    </span>
  );
}

/**
 * Manga panel heading: a vertical kanji watermark, an eyebrow in Japanese
 * style, and the real (localized) title.
 */
export function SectionHeading({
  kanji,
  eyebrow,
  title,
  description,
  className = "",
}: {
  kanji: string;
  eyebrow: string;
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <header className={`relative ${className}`}>
      <Kanji>{kanji}</Kanji>

      <p className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 font-mono text-xs tracking-[0.2em] text-accent uppercase">
        {eyebrow}
      </p>
      <h2 className="mt-4 text-3xl font-black tracking-tight break-words sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
          {description}
        </p>
      )}
    </header>
  );
}

/**
 * Manga panel card: thick ink border, a halftone corner accent and a small
 * katakana tag. The tag (e.g. "プロジェクト") is decorative.
 */
export function Panel({
  children,
  tag,
  className = "",
}: {
  children: ReactNode;
  tag?: string;
  className?: string;
}) {
  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border-2 border-border bg-card p-6 transition-transform duration-500 hover:-translate-y-1 sm:p-7 ${className}`}
    >
      <span aria-hidden className="anime-halftone anime-halftone-corner" />
      {tag && (
        <span
          aria-hidden
          className="absolute right-4 top-3 font-mono text-[10px] tracking-[0.25em] text-accent/60 uppercase"
        >
          {tag}
        </span>
      )}
      <div className="relative">{children}</div>
    </div>
  );
}