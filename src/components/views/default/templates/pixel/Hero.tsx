"use client";

import { useI18n } from "@/i18n";
import DownloadResume from "@/components/shared/DownloadResume";
import TypeWriter from "@/components/shared/TypeWriter";

/**
 * 8-bit hero: a pulsing "START" badge, a huge pixel title and a typewriter
 * role line — like the title screen of a game.
 */
export default function PixelHero() {
  const { t } = useI18n();

  return (
    <section
      id="top"
      className="relative mx-auto w-full max-w-6xl px-5 pt-28 pb-20 sm:px-8 sm:pt-40 md:pb-28"
    >
      <div className="max-w-3xl">
        <p className="pixel-glow inline-flex items-center gap-2 border-2 border-accent bg-card px-4 py-1.5 font-mono text-xs font-bold text-accent">
          <span className="inline-block h-2 w-2 animate-pulse bg-accent" />
          {t.default.hero.badge}
        </p>

        <h1 className="mt-8 font-mono text-[2.8rem] leading-[1.02] font-black tracking-tight text-foreground sm:text-7xl md:text-8xl">
          <span className="block font-mono text-lg font-bold tracking-[0.35em] text-accent-2 uppercase sm:text-xl">
            {t.default.hero.hello}
          </span>
          <span className="pixel-glow mt-3 block text-accent">DROGAN</span>
        </h1>

        <p className="mt-6 flex min-h-[2rem] items-center font-mono text-lg font-bold text-accent-2 sm:text-2xl">
          <span aria-hidden className="mr-2 text-accent">▸</span>
          <TypeWriter words={[t.default.hero.role1, t.default.hero.role2]} />
        </p>

        <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
          {t.default.hero.tagline}
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <a
            href="#projects"
            className="border-2 border-accent bg-accent px-7 py-3 font-mono text-sm font-black text-background shadow-[4px_4px_0_0_var(--accent-2)] transition-transform hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none"
          >
            {t.default.hero.viewProjects} <span aria-hidden>→</span>
          </a>
          <a
            href="#contact"
            className="border-2 border-accent bg-card px-7 py-3 font-mono text-sm font-bold text-foreground transition-colors hover:bg-accent hover:text-background"
          >
            {t.default.hero.contactMe}
          </a>
          <DownloadResume />
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-2 border-2 border-accent bg-card px-4 py-1.5 font-mono text-xs text-muted">
            <span className="inline-block h-2 w-2 animate-pulse bg-accent" />
            {t.default.hero.available}
          </span>
          <span className="border-2 border-border bg-card px-4 py-1.5 font-mono text-xs text-muted">
            {t.default.hero.role1}
          </span>
          <span className="border-2 border-border bg-card px-4 py-1.5 font-mono text-xs text-muted">
            {t.default.hero.role2}
          </span>
        </div>
      </div>
    </section>
  );
}