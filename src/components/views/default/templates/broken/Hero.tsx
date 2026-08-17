"use client";

import { useI18n } from "@/i18n";
import DownloadResume from "@/components/shared/DownloadResume";
import TypeWriter from "@/components/shared/TypeWriter";

/**
 * Broken hero: the name is huge with a split-RGB shadow, the badge leans and
 * the status pills drift off-grid — a profile page that looks hand-assembled
 * but is perfectly readable.
 */
export default function BrokenHero() {
  const { t } = useI18n();

  return (
    <section
      id="top"
      className="relative mx-auto w-full max-w-6xl px-5 pt-28 pb-20 sm:px-8 sm:pt-40 md:pb-28"
    >
      <div className="max-w-3xl">
        <p className="broken-tape -rotate-1 inline-block border border-border bg-card px-4 py-1.5 font-mono text-xs text-accent">
          ⚠ {t.default.hero.badge}
        </p>

        <h1 className="broken-glitch mt-8 text-[3rem] leading-[1.02] font-black tracking-tight sm:text-7xl md:text-8xl">
          <span className="block font-mono text-lg font-bold tracking-[0.3em] text-muted uppercase sm:text-xl">
            {t.default.hero.hello}
          </span>
          <span className="mt-3 block">DROGAN</span>
        </h1>

        <p className="mt-6 flex min-h-[2rem] items-center font-mono text-lg text-accent sm:text-2xl">
          <span aria-hidden className="mr-2 text-accent-2">▚</span>
          <TypeWriter words={[t.default.hero.role1, t.default.hero.role2]} />
        </p>

        <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
          {t.default.hero.tagline}
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <a
            href="#projects"
            className="broken-tape rotate-1 inline-flex items-center gap-2 border border-accent bg-accent px-7 py-3 text-sm font-bold text-background transition-transform hover:rotate-0"
          >
            {t.default.hero.viewProjects} <span aria-hidden>→</span>
          </a>
          <a
            href="#contact"
            className="-rotate-1 inline-flex items-center gap-2 border border-accent-2/50 bg-card px-7 py-3 text-sm font-bold text-foreground transition-colors hover:border-accent-2 hover:text-accent-2"
          >
            {t.default.hero.contactMe}
          </a>
          <DownloadResume />
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-3">
          <span className="rotate-1 inline-flex items-center gap-2 border border-border bg-card px-4 py-1.5 font-mono text-xs text-muted">
            <span className="inline-block h-2 w-2 animate-pulse bg-accent" />
            {t.default.hero.available}
          </span>
          <span className="-rotate-1 border border-border bg-card px-4 py-1.5 font-mono text-xs text-muted">
            {t.default.hero.role1}
          </span>
          <span className="rotate-[1.5deg] border border-border bg-card px-4 py-1.5 font-mono text-xs text-muted">
            {t.default.hero.role2}
          </span>
        </div>
      </div>
    </section>
  );
}
