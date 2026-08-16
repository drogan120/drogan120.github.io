"use client";

import { useI18n } from "@/i18n";
import { Section, SectionHeading } from "./Chrome";

export default function AuroraExperience() {
  const { t } = useI18n();

  return (
    <Section id="experience">
      <SectionHeading
        index="03"
        eyebrow={t.default.experience.label.replace("// ", "")}
        title={t.default.experience.title}
      />

      <ol className="relative mt-12 pl-8 sm:pl-10">
        {/* Gradient spine. Fades out at the bottom so the timeline reads as
            open-ended rather than terminated. */}
        <span
          aria-hidden
          className="absolute top-2 bottom-0 left-[3px] w-px bg-gradient-to-b from-accent via-accent-2 to-transparent"
        />

        {t.default.experience.items.map((item) => (
          <li key={item.title} className="relative pb-12 last:pb-0">
            <span
              aria-hidden
              className="absolute top-1.5 -left-8 h-[7px] w-[7px] rounded-full bg-accent ring-4 ring-background sm:-left-10"
            />

            <p className="font-mono text-xs tracking-wider text-accent">
              {item.period}
            </p>
            <h3 className="mt-2 text-lg font-semibold break-words sm:text-xl">
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
