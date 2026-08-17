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
 * Wayang punokawan silhouette (Semar): the short, round clown-sage with a
 * pointed bun, framed by the light of the moon.
 */
function Punokawan() {
  return (
    <svg viewBox="0 0 80 100" className="h-full w-full" fill="currentColor" aria-hidden>
      <path d="M40 0 C46 4 48 10 46 16 C50 22 50 30 44 34 C48 36 50 41 47 45 C51 52 48 60 42 63 C45 68 43 75 38 78 C40 82 38 88 32 90 C26 88 24 82 26 78 C21 75 19 68 22 63 C16 60 13 52 17 45 C14 41 16 36 20 34 C14 30 14 22 18 16 C16 10 18 4 24 0 C28 3 36 3 40 0 Z" />
    </svg>
  );
}

/**
 * Mega mendung cloud: the classic Cirebon batik cloud shape (a scalloped
 * rounded rectangle), used around the full moon.
 */
function MegaMendung() {
  return (
    <svg viewBox="0 0 100 60" className="h-full w-full" fill="currentColor" aria-hidden>
      <path d="M8 52 C4 30 12 14 30 10 C38 2 62 2 70 10 C88 14 96 30 92 52 C96 54 96 58 92 60 L8 60 C4 58 4 54 8 52 Z" />
      <path d="M30 10 C36 8 44 8 50 12 C56 8 64 8 70 10 C62 4 38 4 30 10 Z" />
    </svg>
  );
}

/**
 * Full moon framed by mega mendung clouds and a wayang punokawan silhouette,
 * replacing the oil-lamp glow. Purely decorative (aria-hidden).
 */
function MoonScene() {
  return (
    <div aria-hidden className="nusantara-moon-scene">
      <span className="nusantara-moon">
        <span className="nusantara-moon-crater" />
      </span>
      <span className="nusantara-mendung nusantara-mendung-1">
        <MegaMendung />
      </span>
      <span className="nusantara-mendung nusantara-mendung-2">
        <MegaMendung />
      </span>
      <span className="nusantara-mendung nusantara-mendung-3">
        <MegaMendung />
      </span>
      <span className="nusantara-punokawan">
        <Punokawan />
      </span>
    </div>
  );
}

/**
 * Nusantara backdrop: a full moon framed by mega mendung clouds with a wayang
 * punokawan silhouette, a wayang gunungan and two slowly drifting kawung
 * motifs over a deep batik-brown stage. Purely decorative (aria-hidden).
 */
export function NusantaraBackdrop() {
  return (
    <div aria-hidden className="nusantara-stage">
      <MoonScene />
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
