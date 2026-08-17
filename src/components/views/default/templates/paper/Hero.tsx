"use client";

import { useI18n } from "@/i18n";
import DownloadResume from "@/components/shared/DownloadResume";
import TypeWriter from "@/components/shared/TypeWriter";

/**
 * Zine cover hero: a serif masthead, a stamp badge and ink-on-paper buttons —
 * like the cover of a print magazine.
 */
export default function PaperHero() {
  const { t } = useI18n();

  return (
    <section
      id="top"
      className="relative mx-auto w-full max-w-6xl px-5 pt-20 pb-20 sm:px-8 sm:pt-28 md:pb-28"
    >
      <div className="max-w-3xl">
        <p className="paper-stamp paper-stamp-tilt">
          <span className="h-2 w-2 animate-pulse rounded-full bg-accent" />
          {t.default.hero.badge}
        </p>

        <h1 className="mt-8 font-serif text-5xl leading-[1.05] font-bold tracking-tight text-foreground sm:text-7xl md:text-8xl">
          {t.default.hero.hello}
          <br />
          <em className="text-accent not-italic underline decoration-accent/40 decoration-2 underline-offset-4">
            {t.default.hero.name}
          </em>
          <span aria-hidden className="text-accent">
            .
          </span>
        </h1>

        <p className="mt-8 font-serif text-xl italic text-muted sm:text-2xl">
          {t.default.hero.tagline}
        </p>

        <div className="mt-6 flex min-h-[2rem] items-center font-mono text-sm text-accent sm:text-base">
          <span aria-hidden className="mr-2">
            ◆
          </span>
          <TypeWriter words={[t.default.hero.role1, t.default.hero.role2]} />
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <a
            href="#projects"
            className="rounded border-2 border-accent bg-accent px-7 py-3 font-mono text-sm font-bold text-background transition-transform hover:-translate-y-0.5"
          >
            {t.default.hero.viewProjects} <span aria-hidden>→</span>
          </a>
          <a
            href="#contact"
            className="rounded border-2 border-border bg-card px-7 py-3 font-mono text-sm font-bold text-foreground transition-colors hover:border-accent hover:text-accent"
          >
            {t.default.hero.contactMe}
          </a>
          <DownloadResume />
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 font-mono text-xs text-muted">
            <span className="h-2 w-2 animate-pulse rounded-full bg-accent" />
            {t.default.hero.available}
          </span>
          <span className="rounded-full border border-border bg-card px-4 py-1.5 font-mono text-xs text-muted">
            {t.default.hero.role1}
          </span>
          <span className="rounded-full border border-border bg-card px-4 py-1.5 font-mono text-xs text-muted">
            {t.default.hero.role2}
          </span>
        </div>
      </div>
    </section>
  );
}