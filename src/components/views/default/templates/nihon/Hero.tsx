"use client";

import { useI18n } from "@/i18n";
import DownloadResume from "@/components/shared/DownloadResume";
import TypeWriter from "@/components/shared/TypeWriter";
import { Furigana, Kanji } from "./Chrome";

/**
 * Nihon hero: a vertical kanji watermark, a washi title page with the name
 * reading in furigana, a brush-underline accent and formal ink buttons.
 */
export default function NihonHero() {
  const { t } = useI18n();

  return (
    <section
      id="top"
      className="relative mx-auto w-full max-w-6xl px-5 pt-16 pb-20 sm:px-8 sm:pt-24 md:pb-28"
    >
      <Kanji>開発者</Kanji>

      <div className="relative min-h-0 pr-14 sm:pr-24">
        <p className="nihon-panel inline-flex max-w-full items-center gap-2 rounded-xl border-border px-4 py-2 font-mono text-xs font-semibold text-foreground">
          <span className="text-accent">●</span>
          <span className="truncate">{t.default.hero.badge}</span>
        </p>

        <h1 className="mt-8 text-[2.6rem] leading-[1.1] font-black tracking-tight sm:text-6xl md:text-7xl lg:text-[5.2rem]">
          <span className="block">{t.default.hero.hello}</span>
          <span className="nihon-brush relative mt-2 block">
            <span className="relative text-accent">Drogan</span>
          </span>
          <span className="mt-2 block font-mono text-lg font-bold tracking-[0.35em] text-muted sm:text-2xl">
            <Furigana text="ドロガン" reading="どろがん" />
          </span>
        </h1>

        <p className="mt-6 inline-flex items-center gap-2 font-mono text-base text-foreground sm:text-xl">
          <span className="text-accent">—</span>
          <TypeWriter
            words={[t.default.hero.role1, t.default.hero.role2]}
          />
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