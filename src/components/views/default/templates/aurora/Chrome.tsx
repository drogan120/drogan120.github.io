"use client";

import { useEffect, useRef } from "react";
import type { CSSProperties, ReactNode } from "react";

/**
 * The drifting mesh backdrop plus grain and a pointer-tracked glow.
 *
 * The spotlight only mounts on devices with a precise pointer — on touch there
 * is nothing to track, and the fixed layer would just cost a composite.
 */
export function AuroraBackdrop() {
  const spotlight = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const el = spotlight.current;
    if (!el) return;

    let frame = 0;
    const onMove = (e: PointerEvent) => {
      // Coalesce to one write per frame; pointermove can fire far more often.
      if (frame) return;
      frame = requestAnimationFrame(() => {
        el.style.setProperty("--mx", `${e.clientX}px`);
        el.style.setProperty("--my", `${e.clientY}px`);
        frame = 0;
      });
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <div aria-hidden className="aurora-stage">
        <span className="aurora-blob aurora-a" />
        <span className="aurora-blob aurora-b" />
        <span className="aurora-blob aurora-c" />
      </div>
      <div aria-hidden className="aurora-grain" />
      <div ref={spotlight} aria-hidden className="aurora-spotlight" />
    </>
  );
}

/**
 * Editorial section header: an oversized index number, an eyebrow and the
 * title. The number is the main "designed, not templated" cue, so it stays
 * large but decorative.
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
      {/*
        The oversized index sits in normal flow rather than absolutely, pulled
        tight with a negative margin. An absolute watermark overlapped the
        eyebrow at some breakpoints — in flow it can never collide, and it still
        reads as an editorial number because of the size and low contrast.
      */}
      <span
        aria-hidden
        className="block -mb-3 font-mono text-5xl font-bold leading-none text-accent/15 select-none sm:-mb-4 sm:text-7xl"
      >
        {index}
      </span>

      <p className="font-mono text-xs tracking-[0.25em] text-accent uppercase">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-3xl font-bold tracking-tight break-words sm:text-4xl md:text-5xl">
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

/** Consistent outer padding and max width for every aurora section. */
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
      className={`relative mx-auto w-full max-w-6xl px-6 py-20 sm:px-8 md:py-28 ${className}`}
    >
      {children}
    </section>
  );
}

/**
 * Frosted bento tile. `span` drives the desktop grid footprint; on small
 * screens every tile goes full width so nothing gets squeezed.
 */
export function Tile({
  children,
  className = "",
  span = "",
  style,
}: {
  children: ReactNode;
  className?: string;
  span?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      style={style}
      className={`group relative overflow-hidden rounded-3xl border border-border bg-card/60 p-6 backdrop-blur-xl transition-[transform,border-color] duration-500 hover:-translate-y-1 hover:border-accent/50 sm:p-7 ${span} ${className}`}
    >
      {/* Accent bloom that fades in on hover, kept behind the content. */}
      <span
        aria-hidden
        className="pointer-events-none absolute -top-24 -right-24 h-48 w-48 rounded-full bg-accent/20 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
      />
      <div className="relative">{children}</div>
    </div>
  );
}
