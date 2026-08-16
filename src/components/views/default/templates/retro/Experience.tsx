"use client";

import { useI18n } from "@/i18n";
import { Section, SectionHeading } from "./Chrome";

export default function RetroExperience() {
  const { t } = useI18n();

  return (
    <Section id="experience">
      <SectionHeading
        index="03"
        eyebrow={t.default.experience.label.replace("// ", "")}
        title={t.default.experience.title}
      />

      <div className="mt-12 space-y-8">
        {t.default.experience.items.map((item) => (
          <article
            key={item.title}
            className="relative overflow-hidden rounded-lg border border-accent/30 bg-card/80 p-6 shadow-[0_0_24px_-14px_var(--accent)] transition-colors hover:border-accent/70 sm:p-7"
          >
            <span
              aria-hidden
              className="pointer-events-none absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-accent to-accent-2"
            />
            <div className="flex flex-wrap items-center gap-2 pl-2">
              <span className="font-mono text-xs tracking-wider text-accent">
                {item.period}
              </span>
              <span
                aria-hidden
                className="h-1.5 w-1.5 rounded-full bg-accent-2"
              />
              <span className="font-mono text-xs text-muted">
                {item.company}
              </span>
            </div>
            <h3 className="mt-3 pl-2 text-lg font-bold break-words sm:text-xl">
              {item.title}
            </h3>
            <p className="mt-3 max-w-2xl pl-2 text-sm leading-relaxed text-muted">
              {item.description}
            </p>
          </article>
        ))}
      </div>
    </Section>
  );
}