"use client";

import type { ReactNode } from "react";

/**
 * Cel-shaded backdrop: two soft radial tints (sky and ground) like an
 * Auto Modellista track. Purely decorative.
 */
export function ToonBackdrop() {
  return <div aria-hidden className="toon-stage" />;
}

/** Consistent outer padding and max width for every toon section. */
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
 * Cel-shaded section header: an inked eyebrow, a bold cartoon title and a
 * description.
 */
export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  className = "",
}: {
  index: string;
  eyebrow: string;
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <header className={className}>
      <p className="font-mono text-xs tracking-[0.3em] text-accent uppercase">
        <span aria-hidden className="mr-2">◎</span>
        {eyebrow}
      </p>
      <h2 className="toon-shadow mt-3 text-4xl font-black tracking-tight break-words sm:text-5xl md:text-6xl">
        {title}
      </h2>
      <span
        aria-hidden
        className="mt-2 inline-block font-mono text-xs tracking-[0.3em] text-muted"
      >
        LAP {index}
      </span>
      {description && (
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
          {description}
        </p>
      )}
    </header>
  );
}

/**
 * Cel-shaded panel: a thick ink outline, flat fill and a hard offset shadow —
 * like a panel from a racing manga.
 */
export function Card({
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
      className={`group toon-frame relative overflow-hidden bg-card p-6 transition-transform duration-300 hover:-translate-y-1 sm:p-7 ${className}`}
    >
      {tag && (
        <span
          aria-hidden
          className="absolute right-4 top-3 font-mono text-[10px] tracking-[0.3em] text-accent/70 uppercase"
        >
          {tag}
        </span>
      )}
      <div className="relative">{children}</div>
    </div>
  );
}