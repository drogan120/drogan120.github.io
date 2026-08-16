"use client";

import { useI18n } from "@/i18n";
import { Section, SectionHeading } from "./Chrome";

export default function AnimeExperience() {
  const { t } = useI18n();

  return (
    <Section id="experience">
      <SectionHeading
        kanji="経験"
        eyebrow={t.default.experience.label.replace("// ", "")}
        title={t.default.experience.title}
      />

      <ol className="relative mt-12 border-l-4 border-border pl-8 sm:pl-10">
        {t.default.experience.items.map((item) => (
          <li key={item.title} className="relative pb-12 last:pb-0">
            <span
              aria-hidden
              className="absolute top-1 -left-[1.45rem] flex h-5 w-5 items-center justify-center rounded-full border-2 border-border bg-background"
            >
              <span className="h-2 w-2 rounded-full bg-accent" />
            </span>

            <span className="inline-block rounded-lg bg-accent/10 px-2.5 py-0.5 font-mono text-xs font-semibold tracking-wider text-accent">
              {item.period}
            </span>
            <h3 className="mt-3 text-lg font-bold break-words sm:text-xl">
              {item.title}
            </h3>
            <p className="mt-0.5 font-mono text-sm text-muted">
              {item.company}
            </p>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
              {item.description}
            </p>
          </li>
        ))}
      </ol>
    </Section>
  );
}