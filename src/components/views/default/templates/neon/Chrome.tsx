"use client";

import type { ReactNode } from "react";

/**
 * Cyberpunk backdrop: a perspective grid receding to a neon horizon, two glow
 * blooms and CRT scanlines. Purely decorative.
 */
export function NeonBackdrop() {
  return (
    <div aria-hidden className="neon-stage">
      <span className="neon-grid" />
      <span className="neon-glow-a" />
      <span className="neon-glow-b" />
      <span className="neon-scanlines" />
    </div>
  );
}

/** Consistent outer padding and max width for every neon section. */
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
 * Terminal-style section header: a bracketed eyebrow, an oversized index and
 * the real (localized) title with a soft neon halo.
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
      <span
        aria-hidden
        className="block -mb-3 font-mono text-5xl font-bold leading-none text-accent/20 select-none sm:-mb-4 sm:text-7xl"
      >
        {index}
      </span>

      <p className="font-mono text-xs tracking-[0.2em] text-accent uppercase">
        <span className="text-muted">&lt;</span> {eyebrow}{" "}
        <span className="text-muted">/&gt;</span>
      </p>
      <h2 className="neon-text-soft mt-3 text-3xl font-bold tracking-tight break-words sm:text-4xl md:text-5xl">
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
 * Neon holo card: thin glowing border, a corner tag and a faint top-edge
 * highlight, like a HUD panel.
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
      className={`group relative overflow-hidden rounded-xl border border-border bg-card/80 p-6 shadow-[0_0_24px_-12px_var(--accent)] transition-[transform,border-color] duration-500 hover:-translate-y-1 hover:border-accent/60 sm:p-7 ${className}`}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/70 to-transparent"
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