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
 * Broken backdrop: a black void with drifting cyan/red "signal" bands and a
 * row of jittering bad blocks, as if the display driver is failing.
 * Purely decorative.
 */
export function BrokenBackdrop() {
  return (
    <div aria-hidden className="broken-stage">
      <span className="broken-scan" />
      <span className="broken-flicker" />
      <span className="broken-blocks">
        <i style={{ width: "12%" }} />
        <i style={{ width: "7%" }} />
        <i style={{ width: "16%" }} />
        <i style={{ width: "9%" }} />
        <i style={{ width: "13%" }} />
        <i style={{ width: "6%" }} />
        <i style={{ width: "11%" }} />
      </span>
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
 * Broken section header: the eyebrow sits off its baseline, the index number
 * is stacked with double-exposed copies, and the title gets the full glitch
 * layer treatment.
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
          className="broken-stack translate-y-0.5 font-mono text-xs text-accent-2 sm:text-sm"
          data-text={index}
        >
          {index}
        </span>
        <p className="translate-y-0.5 font-mono text-xs tracking-[0.25em] text-muted uppercase sm:text-sm">
          {eyebrow}
        </p>
      </div>
      <h2 className="mt-2 text-4xl font-black tracking-tight break-words sm:text-5xl md:text-6xl">
        <span
          className="broken-glitch-layer"
          data-text={title}
        >
          {title}
        </span>
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
 * stable per card so the layout still reads cleanly. Cards can also be nudged
 * out of the grid with `offset`.
 */
export function Card({
  children,
  tilt = 0,
  offset = 0,
  sticker,
  className = "",
}: {
  children: ReactNode;
  tilt?: number;
  offset?: number;
  sticker?: string;
  className?: string;
}) {
  const offsets = [
    "sm:-translate-y-2",
    "sm:translate-y-2",
    "sm:-translate-y-1 sm:translate-x-2",
    "sm:translate-y-1 sm:-translate-x-2",
    "sm:-translate-y-3",
  ] as const;

  return (
    <div
      className={`group broken-tape relative bg-card p-6 transition-transform duration-300 hover:rotate-0 sm:p-7 ${TILTS[tilt % TILTS.length]} ${offsets[offset % offsets.length]} ${className}`}
    >
      {sticker && (
        <span
          aria-hidden
          className={`broken-sticker ${
            sticker.startsWith("#") ? "broken-sticker--cyan" : ""
          }`}
        >
          {sticker}
        </span>
      )}
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
    <div aria-hidden className="mx-auto w-full max-w-6xl px-5 sm:px-8">
      <div className="broken-tear" />
    </div>
  );
}
