"use client";

import type { CSSProperties } from "react";
import { useI18n } from "@/i18n";
import DownloadResume from "@/components/shared/DownloadResume";
import TypeWriter from "@/components/shared/TypeWriter";
import { useGithubStats } from "@/hooks/useGithubStats";

/** Splits a headline into words so each can rise on its own delay. */
function Kinetic({ text, from = 0 }: { text: string; from?: number }) {
  return (
    <>
      {text.split(" ").map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="word-rise"
          style={{ "--w": from + i } as CSSProperties}
        >
          {word}
          {i < text.split(" ").length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </>
  );
}

export default function AuroraHero() {
  const { t } = useI18n();
  const { stats, username, profileUrl } = useGithubStats();

  const hello = t.default.hero.hello;
  const words = hello.split(" ").length;

  return (
    <section
      id="top"
      className="relative mx-auto w-full max-w-6xl px-5 pt-28 pb-20 sm:px-8 md:pt-36 md:pb-28"
    >
      <div className="grid gap-14 lg:grid-cols-[1.35fr_1fr] lg:items-center lg:gap-10">
        <div className="min-w-0">
          <p
            className="word-rise inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5 font-mono text-xs text-muted backdrop-blur-xl"
            style={{ "--w": 0 } as CSSProperties}
          >
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="absolute inset-0 animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative h-2 w-2 rounded-full bg-accent" />
            </span>
            {t.default.hero.available}
          </p>

          <h1 className="mt-7 text-[2.6rem] leading-[1.02] font-bold tracking-tight sm:text-6xl md:text-7xl lg:text-[5.2rem]">
            <Kinetic text={hello} from={1} />
            <br />
            <span
              className="word-rise bg-gradient-to-r from-accent via-accent-2 to-accent bg-[length:200%_auto] bg-clip-text pb-1 text-transparent"
              style={{ "--w": words + 1 } as CSSProperties}
            >
              {t.default.hero.name}
            </span>
          </h1>

          <div
            className="word-rise mt-5 flex min-h-[2rem] items-center font-mono text-base text-muted sm:text-xl"
            style={{ "--w": words + 2 } as CSSProperties}
          >
            <span className="mr-2 text-accent">/</span>
            <TypeWriter words={[t.default.hero.role1, t.default.hero.role2]} />
          </div>

          <p
            className="word-rise mt-7 max-w-xl text-sm leading-relaxed text-muted sm:text-base"
            style={{ "--w": words + 3 } as CSSProperties}
          >
            {t.default.hero.tagline}
          </p>

          <div
            className="word-rise mt-9 flex flex-wrap items-center gap-3"
            style={{ "--w": words + 4 } as CSSProperties}
          >
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-background transition-transform hover:scale-[1.03]"
            >
              {t.default.hero.viewProjects}
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </a>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-6 py-3 text-sm font-semibold backdrop-blur-xl transition-colors hover:border-accent hover:text-accent"
            >
              {t.default.hero.contactMe}
            </a>

            <DownloadResume />
          </div>
        </div>

        {/* Stat panel. Doubles as the hero's visual counterweight, so the
            layout never leaves a dead column on wide screens. */}
        <div
          className="word-rise min-w-0"
          style={{ "--w": words + 3 } as CSSProperties}
        >
          <div className="rounded-3xl border border-border bg-card/60 p-6 backdrop-blur-xl sm:p-8">
            <div className="flex items-center justify-between gap-3">
              <span className="font-mono text-xs tracking-[0.2em] text-muted uppercase">
                github
              </span>
              <a
                href={profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="truncate font-mono text-xs text-accent transition-colors hover:text-accent-2"
              >
                @{username} ↗
              </a>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-5">
              {stats.map((s) => (
                <div key={s.key} className="min-w-0">
                  <p className="text-2xl font-bold tabular-nums text-accent sm:text-3xl">
                    {s.value}
                  </p>
                  <p className="mt-1 truncate font-mono text-[11px] text-muted">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
