"use client";

import type { ReactNode } from "react";

/**
 * Synthwave backdrop: a perspective floor grid, a striped retro sun and a
 * horizon glow. Purely decorative.
 */
export function RetroBackdrop() {
  return (
    <div aria-hidden className="retro-stage">
      <span className="retro-sun" />
      <span className="retro-horizon" />
      <span className="retro-grid" />
    </div>
  );
}

/** Consistent outer padding and max width for every retro section. */
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
 * Synthwave section header: a glowing eyebrow, chrome title and description.
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
      <p className="retro-glow font-mono text-xs tracking-[0.3em] text-accent uppercase">
        <span aria-hidden className="mr-2 text-accent-2">
          ▸
        </span>
        {eyebrow}
      </p>
      <h2 className="retro-chrome mt-3 text-4xl font-black tracking-tight break-words sm:text-5xl md:text-6xl">
        {title}
      </h2>
      <span
        aria-hidden
        className="mt-2 inline-block font-mono text-xs tracking-[0.3em] text-muted"
      >
        {"// "}
        {index}
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
 * Synthwave holo card: a glowing border with corner brackets, like an 80s
 * HUD panel.
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
      className={`group relative overflow-hidden rounded-lg border border-accent/30 bg-card/80 p-6 shadow-[0_0_24px_-14px_var(--accent)] transition-[transform,border-color] duration-500 hover:-translate-y-1 hover:border-accent/70 sm:p-7 ${className}`}
    >
      {/* HUD corner brackets */}
      <span
        aria-hidden
        className="pointer-events-none absolute left-2 top-2 h-3 w-3 border-l-2 border-t-2 border-accent/60"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute bottom-2 right-2 h-3 w-3 border-b-2 border-r-2 border-accent/60"
      />
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