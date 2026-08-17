"use client";

import type { ReactNode } from "react";

const TILTS = [
  "-rotate-1",
  "rotate-1",
  "rotate-2",
  "-rotate-2",
  "rotate-[1.5deg]",
  "-rotate-[1.5deg]",
] as const;

/**
 * Broken backdrop: a grey void with a faint scanline band and a single jagged
 * "signal lost" block near the top, as if the display driver is failing.
 * Purely decorative.
 */
export function BrokenBackdrop() {
  return (
    <div aria-hidden className="broken-stage">
      <span className="broken-scan" />
      <span className="broken-flicker" />
    </div>
  );
}

/** Consistent outer padding and max width for every broken section. */
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
 * Broken section header: the eyebrow sits off its baseline and the title gets
 * a chromatic-aberration shadow, like a badly kerned hand-written page.
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
      <div className="flex items-baseline gap-3">
        <span
          aria-hidden
          className="broken-glitch font-mono text-xs text-accent-2 sm:text-sm"
        >
          {index}
        </span>
        <p className="translate-y-0.5 font-mono text-xs tracking-[0.25em] text-muted uppercase sm:text-sm">
          {eyebrow}
        </p>
      </div>
      <h2 className="broken-glitch mt-2 text-4xl font-black tracking-tight break-words sm:text-5xl md:text-6xl">
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
 * Broken card: every panel gets a random-looking tilt and a strip of "tape",
 * as if it was cut out of a notebook and stuck onto the page. The tilt is
 * stable per card so the layout still reads cleanly.
 */
export function Card({
  children,
  tilt = 0,
  className = "",
}: {
  children: ReactNode;
  tilt?: number;
  className?: string;
}) {
  return (
    <div
      className={`group broken-tape relative bg-card p-6 transition-transform duration-300 hover:rotate-0 sm:p-7 ${TILTS[tilt % TILTS.length]} ${className}`}
    >
      <div className="relative">{children}</div>
    </div>
  );
}

/**
 * A horizontal "tear" across the page: a thin line with ragged edges, used as
 * a divider between big sections. Looks like the paper was ripped.
 */
export function Tear() {
  return (
    <div
      aria-hidden
      className="mx-auto w-full max-w-6xl px-5 sm:px-8"
    >
      <div className="broken-tear" />
    </div>
  );
}
