"use client";

import type { ReactNode } from "react";

/**
 * 8-bit backdrop: a faint pixel checker field so the page reads like a game
 * screen. Purely decorative.
 */
export function PixelBackdrop() {
  return (
    <div aria-hidden className="pixel-stage">
      <span className="pixel-scanline" />
    </div>
  );
}

/** Consistent outer padding and max width for every pixel section. */
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
 * 8-bit section header: a tiny "power light", a blocky title and description.
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
        <span aria-hidden className="mr-2 inline-block h-2.5 w-2.5 bg-accent">
          ●
        </span>
        {eyebrow}
      </p>
      <h2 className="pixel-glow mt-3 font-mono text-3xl font-black tracking-tight break-words text-foreground sm:text-4xl md:text-5xl">
        {title}
      </h2>
      <span
        aria-hidden
        className="mt-2 inline-block font-mono text-xs tracking-[0.3em] text-muted"
      >
        ▸ STAGE {index}
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
 * Chunky 8-bit panel: hard corners, a hard offset shadow and the little
 * accent "power" studs on the frame.
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
      className={`group pixel-frame relative overflow-hidden bg-card p-6 transition-transform duration-300 hover:-translate-y-1 sm:p-7 ${className}`}
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