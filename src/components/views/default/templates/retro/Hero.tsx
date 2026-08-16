"use client";

import { useI18n } from "@/i18n";
import DownloadResume from "@/components/shared/DownloadResume";
import TypeWriter from "@/components/shared/TypeWriter";

/**
 * Synthwave hero: a chrome nameplate, a glowing role line and arcade-style
 * buttons. The hero sits over the retro sun.
 */
export default function RetroHero() {
  const { t } = useI18n();

  return (
    <section
      id="top"
      className="relative mx-auto w-full max-w-6xl px-5 pt-28 pb-20 sm:px-8 sm:pt-40 md:pb-28"
    >
      <div className="max-w-3xl">
        <p className="retro-glow inline-flex items-center gap-2 rounded-full border border-accent/40 bg-card/80 px-4 py-1.5 font-mono text-xs text-accent">
          <span className="h-2 w-2 animate-pulse rounded-full bg-accent" />
          {t.default.hero.badge}
        </p>

        <h1 className="mt-8 text-[2.8rem] leading-[1.02] font-black tracking-tight sm:text-7xl md:text-8xl">
          <span className="block font-mono text-lg font-bold tracking-[0.35em] text-accent-2 uppercase sm:text-xl">
            {t.default.hero.hello}
          </span>
          <span className="retro-chrome mt-3 block">DROGAN</span>
        </h1>

        <p className="retro-glow mt-6 flex min-h-[2rem] items-center font-mono text-lg text-accent sm:text-2xl">
          <span aria-hidden className="mr-2 text-accent-2">▸</span>
          <TypeWriter words={[t.default.hero.role1, t.default.hero.role2]} />
        </p>

        <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
          {t.default.hero.tagline}
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <a
            href="#projects"
            className="retro-glow inline-flex items-center gap-2 rounded-md bg-accent px-7 py-3 text-sm font-bold text-background shadow-[0_0_24px_-6px_var(--accent)] transition-transform hover:scale-[1.03]"
          >
            {t.default.hero.viewProjects} <span aria-hidden>→</span>
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-md border border-accent/40 bg-card/80 px-7 py-3 text-sm font-bold text-foreground transition-colors hover:border-accent hover:text-accent"
          >
            {t.default.hero.contactMe}
          </a>
          <DownloadResume />
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-card/80 px-4 py-1.5 font-mono text-xs text-muted">
            <span className="h-2 w-2 animate-pulse rounded-full bg-accent" />
            {t.default.hero.available}
          </span>
          <span className="rounded-full border border-accent/40 bg-card/80 px-4 py-1.5 font-mono text-xs text-muted">
            {t.default.hero.role1}
          </span>
          <span className="rounded-full border border-accent/40 bg-card/80 px-4 py-1.5 font-mono text-xs text-muted">
            {t.default.hero.role2}
          </span>
        </div>
      </div>
    </section>
  );
}