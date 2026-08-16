"use client";

import type { ReactNode } from "react";

/**
 * Mako backdrop: ambient green glow like a Shinra reactor core.
 * Purely decorative.
 */
export function Ff7Backdrop() {
  return <div aria-hidden className="ff7-stage" />;
}

/** Consistent outer padding and max width for every ff7 section. */
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
 * Mako section header: a glowing eyebrow, terminal-style title and description.
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
        <span aria-hidden className="mr-2 inline-block h-2 w-2 rounded-full bg-accent" />
        {eyebrow}
      </p>
      <h2 className="ff7-glow mt-3 text-4xl font-black tracking-tight break-words sm:text-5xl md:text-6xl">
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
 * Shinra terminal panel: hard edge, glowing corner brackets and a faint Mako
 * gradient wash.
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
      className={`group ff7-frame relative overflow-hidden bg-card p-6 transition-transform duration-300 hover:-translate-y-1 sm:p-7 ${className}`}
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