"use client";

import type { ReactNode } from "react";

/** Editorial backdrop: paper grain plus a risograph halftone wash. */
export function PaperBackdrop() {
  return (
    <div aria-hidden className="paper-stage">
      <span className="paper-halftone" />
      <span className="paper-grain" />
    </div>
  );
}

/** Consistent outer padding and max width for every paper section. */
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
 * Editorial section header: an oversized serif index, a stamp eyebrow and a
 * serif title, like a magazine feature heading.
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
      <span className="paper-stamp paper-stamp-tilt">{eyebrow}</span>
      <h2 className="mt-6 font-serif text-4xl font-bold tracking-tight break-words text-foreground sm:text-5xl md:text-6xl">
        {title}
      </h2>
      <p
        aria-hidden
        className="mt-1 font-mono text-xs tracking-[0.3em] text-accent"
      >
        № {index}
      </p>
      {description && (
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
          {description}
        </p>
      )}
    </header>
  );
}

/**
 * Zine card: a double-ink frame with a small corner stamp. Content sits on a
 * slightly different paper tone.
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
      className={`group paper-frame relative overflow-hidden rounded-md bg-card p-6 transition-transform duration-500 hover:-translate-y-1 sm:p-7 ${className}`}
    >
      {tag && (
        <span
          aria-hidden
          className="absolute right-4 top-3 font-mono text-[10px] tracking-[0.25em] text-accent/70 uppercase"
        >
          {tag}
        </span>
      )}
      <div className="relative">{children}</div>
    </div>
  );
}