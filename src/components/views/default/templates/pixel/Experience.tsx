"use client";

import { useI18n } from "@/i18n";
import { Section, SectionHeading } from "./Chrome";

export default function PixelExperience() {
  const { t } = useI18n();

  return (
    <Section id="experience">
      <SectionHeading
        index="03"
        eyebrow={t.default.experience.label.replace("// ", "")}
        title={t.default.experience.title}
      />

      <div className="mt-12 space-y-4">
        {t.default.experience.items.map((item) => (
          <article
            key={item.title}
            className="pixel-frame relative overflow-hidden bg-card p-6 sm:p-7"
          >
            <div className="flex flex-wrap items-center gap-2 pl-1">
              <span className="font-mono text-xs font-bold tracking-wider text-accent">
                {item.period}
              </span>
              <span
                aria-hidden
                className="h-1.5 w-1.5 bg-accent-2"
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
          </article>
        ))}
      </div>
    </Section>
  );
}