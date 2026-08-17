"use client";

import { useI18n } from "@/i18n";
import DownloadResume from "@/components/shared/DownloadResume";
import TypeWriter from "@/components/shared/TypeWriter";
import { KawungMotif } from "./Chrome";

/**
 * Nusantara hero: a kawung ornament, a gold "Ali Mahmudin" name on a batik stage
 * with a sawut underline, and formal batik-paper buttons.
 */
export default function NusantaraHero() {
  const { t } = useI18n();

  return (
    <section
      id="top"
      className="relative mx-auto w-full max-w-6xl px-5 pt-16 pb-20 sm:px-8 sm:pt-24 md:pb-28"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -top-6 right-4 w-24 text-accent/20 select-none sm:right-10 sm:w-36"
      >
        <KawungMotif className="h-full w-full" />
      </span>

      <div className="relative min-h-0 pr-8 sm:pr-16">
        <p className="nusantara-panel inline-flex max-w-full items-center gap-2 rounded-xl border-border px-4 py-2 font-mono text-xs font-semibold text-foreground">
          <span className="text-accent">●</span>
          <span className="truncate">{t.default.hero.badge}</span>
        </p>

        <h1 className="mt-8 text-[2.6rem] leading-[1.1] font-black tracking-tight sm:text-6xl md:text-7xl lg:text-[5.2rem]">
          <span className="block">{t.default.hero.hello}</span>
          <span className="nusantara-name relative mt-2 block text-accent">
            {t.default.hero.name}
          </span>
          <span className="nusantara-sawut mt-4 block w-64" />
        </h1>

        <p className="mt-6 inline-flex items-center gap-2 font-mono text-base text-foreground sm:text-xl">
          <span className="text-accent">◆</span>
          <TypeWriter words={[t.default.hero.role1, t.default.hero.role2]} />
        </p>

        <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
          {t.default.hero.tagline}
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <a
            href="#projects"
            className="pop-on-click inline-flex items-center gap-2 rounded-lg border-b-4 border-accent bg-accent px-7 py-3 text-sm font-bold text-background shadow-md transition-transform hover:translate-y-0.5 hover:border-b-2"
          >
            {t.default.hero.viewProjects}
            <span aria-hidden>→</span>
          </a>
          <a
            href="#contact"
            className="pop-on-click inline-flex items-center gap-2 rounded-lg border border-border bg-card px-7 py-3 text-sm font-bold text-foreground shadow-sm transition-colors hover:border-accent hover:text-accent"
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
