"use client";

import { useI18n } from "@/i18n";
import { Section, SectionHeading } from "./Chrome";

export default function NeonExperience() {
  const { t } = useI18n();

  return (
    <Section id="experience">
      <SectionHeading
        index="03"
        eyebrow={t.default.experience.label.replace("// ", "")}
        title={t.default.experience.title}
      />

      <ol className="relative mt-12 space-y-8">
        {t.default.experience.items.map((item) => (
          <li
            key={item.title}
            className="relative rounded-xl border border-border bg-card/80 p-6 shadow-[0_0_24px_-12px_var(--accent)] transition-colors hover:border-accent/50 sm:p-7"
          >
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs tracking-wider text-accent">
                {item.period}
              </span>
              <span
                aria-hidden
                className="h-1.5 w-1.5 rounded-full bg-accent"
              />
              <span className="font-mono text-xs text-muted">
                {item.company}
              </span>
            </div>
            <h3 className="mt-3 text-lg font-bold break-words sm:text-xl">
              {item.title}
            </h3>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
              {item.description}
            </p>
          </li>
        ))}
      </ol>
    </Section>
  );
}