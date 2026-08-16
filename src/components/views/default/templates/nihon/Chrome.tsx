"use client";

import type { ReactNode } from "react";

/**
 * Nihon backdrop: washi grain, a rising vermilion sun, a faint torii
 * silhouette, a large faint kanji, drifting sakura petals and a seigaiha
 * (wave) band at the bottom. Purely decorative (aria-hidden).
 */
export function NihonBackdrop() {
  return (
    <div aria-hidden className="nihon-stage">
      <span className="nihon-washi" />
      <span className="nihon-sun" />
      <span className="nihon-kanji-bg">和</span>
      <span className="nihon-torii">
        <span className="nihon-torii-kasagi" />
        <span className="nihon-torii-nuki" />
        <span className="nihon-torii-hashira" />
        <span className="nihon-torii-hashira2" />
      </span>
      <span className="nihon-seigaiha" />
      <span className="nihon-sakura nihon-sakura-1">🌸</span>
      <span className="nihon-sakura nihon-sakura-2">🌸</span>
      <span className="nihon-sakura nihon-sakura-3">🌸</span>
      <span className="nihon-sakura nihon-sakura-4">🌸</span>
      <span className="nihon-sakura nihon-sakura-5">🌸</span>
      <span className="nihon-sakura nihon-sakura-6">🌸</span>
    </div>
  );
}

/** Consistent outer padding and max width for every nihon section. */
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
 * Ruby text: renders kanji with hiragana furigana above, textbook style.
 * Uses a stacked flex column instead of native <ruby> so the alignment is
 * identical across browsers. Falls back to plain text when no reading is
 * given.
 */
export function Furigana({
  text,
  reading,
  className = "",
}: {
  text: string;
  reading?: string;
  className?: string;
}) {
  if (!reading) {
    return <span className={className}>{text}</span>;
  }
  return (
    <span className={`nihon-furigana ${className}`}>
      <span className="nihon-furigana-rt">{reading}</span>
      <span className="nihon-furigana-txt">{text}</span>
    </span>
  );
}

/** A red hanko seal, like a signature stamp on a document. */
export function Hanko({
  children,
  small = false,
  className = "",
}: {
  children: ReactNode;
  small?: boolean;
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={`nihon-hanko ${small ? "nihon-hanko-sm" : ""} ${className}`}
    >
      {children}
    </span>
  );
}

/** Vertical Japanese watermark behind a section header. */
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
      className={`nihon-kanji pointer-events-none absolute right-4 top-6 select-none sm:right-10 sm:top-10 ${className}`}
    >
      {children}
    </span>
  );
}

/**
 * Nihon section heading: a vertical kanji watermark on the right (never
 * overlapping the text, thanks to the right padding), an eyebrow pill, a
 * small kanji-and-reading line for exposure, and the real (localized) title.
 */
export function SectionHeading({
  kanji,
  reading,
  eyebrow,
  title,
  description,
  className = "",
}: {
  kanji: string;
  reading: string;
  eyebrow: string;
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <header className={`relative ${className}`}>
      <Kanji>{kanji}</Kanji>

      <div className="relative pr-14 sm:pr-24">
        <p className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 font-mono text-xs tracking-[0.2em] text-accent uppercase">
          {eyebrow}
        </p>

        <p className="mt-3 flex items-center gap-2 font-mono text-sm text-muted">
          <span className="text-accent">{kanji}</span>
          <span className="text-xs">【{reading}】</span>
        </p>

        <h2 className="mt-2 text-3xl font-black tracking-tight break-words sm:text-4xl md:text-5xl">
          {title}
        </h2>

        {description && (
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
            {description}
          </p>
        )}
      </div>
    </header>
  );
}

/** Washi panel card: ink frame with a vermilion accent tick at the top. */
export function Panel({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`nihon-panel rounded-2xl p-6 transition-transform duration-500 hover:-translate-y-1 sm:p-7 ${className}`}
    >
      <div className="relative">{children}</div>
    </div>
  );
}