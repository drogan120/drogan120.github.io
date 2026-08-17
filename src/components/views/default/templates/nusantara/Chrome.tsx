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
 * Mega mendung cloud: a segmented cloud band like the Akatsuki motif — a
 * horizontal row of rounded lobes mirrored on top and bottom, tapering to
 * small bumps at each end.
 */
export function MegaMendung({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 128 54" className={className} fill="currentColor" aria-hidden>
      <path d="M10 28
        a10 12 0 0 1 20 -10
        a12 14 0 0 1 24 0
        a14 16 0 0 1 26 2
        a12 14 0 0 1 24 -2
        a10 12 0 0 1 20 10
        l0 2
        a10 12 0 0 0 -20 8
        a12 14 0 0 0 -24 0
        a14 16 0 0 0 -26 0
        a12 14 0 0 0 -24 0
        a10 12 0 0 0 -20 -8
        Z" />
    </svg>
  );
}

/**
 * Full moon framed by mega mendung clouds, top right. Purely decorative
 * (aria-hidden).
 */
function MoonScene() {
  return (
    <div aria-hidden className="nusantara-moon-scene">
      <span className="nusantara-moon">
        <span className="nusantara-moon-crater" />
      </span>
      <span className="nusantara-mendung nusantara-mendung-1">
        <MegaMendung className="h-full w-full" />
      </span>
      <span className="nusantara-mendung nusantara-mendung-2">
        <MegaMendung className="h-full w-full" />
      </span>
      <span className="nusantara-mendung nusantara-mendung-3">
        <MegaMendung className="h-full w-full" />
      </span>
    </div>
  );
}

/**
 * Nusantara backdrop: a full moon framed by mega mendung clouds and a few
 * clouds drifting slowly across the stage, over a deep batik-brown ground.
 * Purely decorative (aria-hidden).
 */
export function NusantaraBackdrop() {
  return (
    <div aria-hidden className="nusantara-stage">
      <MoonScene />
      <span className="nusantara-drift-cloud nusantara-drift-cloud-1">
        <MegaMendung className="h-full w-full" />
      </span>
      <span className="nusantara-drift-cloud nusantara-drift-cloud-2">
        <MegaMendung className="h-full w-full" />
      </span>
      <span className="nusantara-drift-cloud nusantara-drift-cloud-3">
        <MegaMendung className="h-full w-full" />
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
