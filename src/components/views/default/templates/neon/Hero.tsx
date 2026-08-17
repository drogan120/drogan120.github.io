"use client";

import { useI18n } from "@/i18n";
import DownloadResume from "@/components/shared/DownloadResume";
import TypeWriter from "@/components/shared/TypeWriter";

/**
 * Neon hero: a terminal prompt with the role cycling, a huge neon headline
 * and HUD-style chips. The caret blinks via .neon-caret.
 */
export default function NeonHero() {
  const { t } = useI18n();

  return (
    <section
      id="top"
      className="relative mx-auto w-full max-w-6xl px-5 pt-24 pb-20 sm:px-8 sm:pt-32 md:pb-28"
    >
      <div className="min-w-0">
        <p className="inline-flex items-center gap-2 rounded-md border border-border bg-card/80 px-4 py-1.5 font-mono text-xs text-muted">
          <span className="h-2 w-2 animate-pulse rounded-full bg-accent" />
          {t.default.hero.badge}
        </p>

        <h1 className="mt-8 text-[2.6rem] leading-[1.02] font-black tracking-tight sm:text-6xl md:text-7xl lg:text-[5.2rem]">
          <span className="block text-foreground">{t.default.hero.hello}</span>
          <span className="neon-text mt-2 block text-accent">{t.default.hero.name}</span>
          <span className="mt-2 block font-mono text-sm font-medium tracking-[0.3em] text-muted uppercase sm:text-base">
            {t.default.hero.role1} <span className="text-accent">/</span>{" "}
            {t.default.hero.role2}
          </span>
        </h1>

        <p className="mt-6 font-mono text-lg text-foreground sm:text-2xl">
          <span className="text-accent">$</span> whoami
          <span className="ml-3 inline-flex items-center">
            <TypeWriter
              words={[t.default.hero.tagline]}
              className="text-muted"
            />
            <span className="neon-caret text-accent" />
          </span>
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <a
            href="#projects"
            className="inline-flex items-center gap-2 rounded-md bg-accent px-7 py-3 font-mono text-sm font-bold text-background shadow-[0_0_24px_-6px_var(--accent)] transition-transform hover:scale-[1.03]"
          >
            {t.default.hero.viewProjects} <span aria-hidden>→</span>
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-md border border-border bg-card/80 px-7 py-3 font-mono text-sm font-bold text-foreground transition-colors hover:border-accent hover:text-accent"
          >
            {t.default.hero.contactMe}
          </a>
          <DownloadResume />
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-md border border-border bg-card/80 px-4 py-1.5 font-mono text-xs text-muted">
            <span className="h-2 w-2 animate-pulse rounded-full bg-accent" />
            {t.default.hero.available}
          </span>
          <span className="rounded-md border border-border bg-card/80 px-4 py-1.5 font-mono text-xs text-muted">
            {t.default.hero.role1}
          </span>
          <span className="rounded-md border border-border bg-card/80 px-4 py-1.5 font-mono text-xs text-muted">
            {t.default.hero.role2}
          </span>
        </div>
      </div>
    </section>
  );
}