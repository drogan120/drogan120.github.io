"use client";

import { useI18n } from "@/i18n";
import { Section, SectionHeading } from "./Chrome";

export default function PaperExperience() {
  const { t } = useI18n();

  return (
    <Section id="experience">
      <SectionHeading
        index="03"
        eyebrow={t.default.experience.label.replace("// ", "")}
        title={t.default.experience.title}
      />

      <div className="mt-12 space-y-8 border-l border-border pl-8 sm:pl-10">
        {t.default.experience.items.map((item) => (
          <article key={item.title} className="relative">
            <span
              aria-hidden
              className="absolute -left-[2.35rem] top-1 flex h-4 w-4 items-center justify-center rounded-full border border-border bg-background"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            </span>

            <p className="font-mono text-xs tracking-wider text-accent">
              {item.period}
            </p>
            <h3 className="mt-2 font-serif text-xl font-bold break-words sm:text-2xl">
              {item.title}
            </h3>
            <p className="mt-0.5 font-mono text-sm text-muted">
              {item.company}
            </p>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
              {item.description}
            </p>
          </article>
        ))}
      </div>
    </Section>
  );
}