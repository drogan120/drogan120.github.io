"use client";

import type { ReactNode } from "react";

/**
 * Kawung batik motif: four ellipses around a centre point, one of the oldest
 * Indonesian batik patterns. Rendered as an inline SVG so it inherits
 * currentColor from whatever accent it sits on.
 */
export function KawungMotif({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" aria-hidden>
      <ellipse
        cx="25"
        cy="25"
        rx="15"
        ry="25"
        transform="rotate(45 25 25)"
        stroke="currentColor"
        strokeWidth="5"
      />
      <ellipse
        cx="75"
        cy="25"
        rx="15"
        ry="25"
        transform="rotate(-45 75 25)"
        stroke="currentColor"
        strokeWidth="5"
      />
      <ellipse
        cx="25"
        cy="75"
        rx="15"
        ry="25"
        transform="rotate(-45 25 75)"
        stroke="currentColor"
        strokeWidth="5"
      />
      <ellipse
        cx="75"
        cy="75"
        rx="15"
        ry="25"
        transform="rotate(45 75 75)"
        stroke="currentColor"
        strokeWidth="5"
      />
    </svg>
  );
}

/**
 * Wayang gunungan silhouette: the mountain-and-tree opening puppet that frames
 * every wayang kulit show, drawn as a single symmetrical flame shape.
 */
function Gunungan() {
  return (
    <svg viewBox="0 0 100 120" className="h-full w-full" fill="currentColor" aria-hidden>
      <path d="M50 0 C58 8 60 18 57 26 C70 30 76 44 70 54 C80 60 82 76 72 84 C80 92 78 108 66 112 C60 120 40 120 34 112 C22 108 20 92 28 84 C18 76 20 60 30 54 C24 44 30 30 43 26 C40 18 42 8 50 0 Z" />
    </svg>
  );
}

/**
 * Nusantara backdrop: a warm oil-lamp glow, a wayang gunungan silhouette and
 * two slowly drifting kawung motifs over a deep batik-brown stage. Purely
 * decorative (aria-hidden).
 */
export function NusantaraBackdrop() {
  return (
    <div aria-hidden className="nusantara-stage">
      <span className="nusantara-lamp" />
      <span className="nusantara-gunungan">
        <Gunungan />
      </span>
      <span className="nusantara-kawung nusantara-kawung-1">
        <KawungMotif />
      </span>
      <span className="nusantara-kawung nusantara-kawung-2">
        <KawungMotif />
      </span>
      <span className="nusantara-tirta" />
    </div>
  );
}

/** Consistent outer padding and max width for every nusantara section. */
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

/** A translucent kawung watermark behind a section header. */
export function Ornament({
  className = "",
}: {
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute top-2 right-2 w-28 text-accent/20 select-none sm:right-4 sm:w-36 ${className}`}
    >
      <KawungMotif className="h-full w-full" />
    </span>
  );
}

/**
 * Nusantara section heading: a kawung ornament watermark, an eyebrow pill and
 * a gold-bordered title with a batik sawut underline.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  className = "",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <header className={`relative ${className}`}>
      <Ornament />

      <div className="relative pr-20 sm:pr-32">
        <p className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 font-mono text-xs tracking-[0.2em] text-accent uppercase">
          <span aria-hidden className="text-accent-2">
            ◆
          </span>
          {eyebrow}
        </p>

        <h2 className="mt-3 text-3xl font-black tracking-tight break-words sm:text-4xl md:text-5xl">
          {title}
        </h2>

        <span aria-hidden className="nusantara-sawut mt-3 block" />

        {description && (
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
            {description}
          </p>
        )}
      </div>
    </header>
  );
}

/** Batik paper panel: a warm card with a kawung-corner frame on the left. */
export function Panel({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`nusantara-panel group rounded-2xl p-6 transition-transform duration-500 hover:-translate-y-1 sm:p-7 ${className}`}
    >
      <div className="relative">{children}</div>
    </div>
  );
}
