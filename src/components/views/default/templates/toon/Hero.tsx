"use client";

import { useI18n } from "@/i18n";
import DownloadResume from "@/components/shared/DownloadResume";
import TypeWriter from "@/components/shared/TypeWriter";

/**
 * Cel-shaded hero: a checkered-flag badge, an inked title and a typewriter
 * role line, like the menu of a cartoon racing game.
 */
export default function ToonHero() {
  const { t } = useI18n();

  return (
    <section
      id="top"
      className="relative mx-auto w-full max-w-6xl px-5 pt-28 pb-20 sm:px-8 sm:pt-40 md:pb-28"
    >
      <div className="max-w-3xl">
        <p className="toon-shadow inline-flex items-center gap-2 border-4 border-foreground/20 bg-card px-4 py-1.5 font-mono text-xs font-black text-accent">
          <span aria-hidden className="inline-block h-2.5 w-2.5 animate-pulse bg-accent" />
          {t.default.hero.badge}
        </p>

        <h1 className="mt-8 text-[2.8rem] leading-[1.02] font-black tracking-tight sm:text-7xl md:text-8xl">
          <span className="block font-mono text-lg font-bold tracking-[0.35em] text-accent-2 uppercase sm:text-xl">
            {t.default.hero.hello}
          </span>
          <span className="toon-shadow mt-3 block text-accent">DROGAN</span>
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
            className="toon-frame inline-flex items-center gap-2 bg-accent px-7 py-3 text-sm font-black text-background transition-transform hover:translate-x-0.5 hover:translate-y-0.5"
          >
            {t.default.hero.viewProjects} <span aria-hidden>→</span>
          </a>
          <a
            href="#contact"
            className="toon-frame inline-flex items-center gap-2 bg-card px-7 py-3 text-sm font-bold text-foreground transition-colors hover:text-accent"
          >
            {t.default.hero.contactMe}
          </a>
          <DownloadResume />
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-2 border-4 border-foreground/20 bg-card px-4 py-1.5 font-mono text-xs text-muted">
            <span className="inline-block h-2 w-2 animate-pulse bg-accent" />
            {t.default.hero.available}
          </span>
          <span className="border-4 border-foreground/20 bg-card px-4 py-1.5 font-mono text-xs text-muted">
            {t.default.hero.role1}
          </span>
          <span className="border-4 border-foreground/20 bg-card px-4 py-1.5 font-mono text-xs text-muted">
            {t.default.hero.role2}
          </span>
        </div>
      </div>
    </section>
  );
}