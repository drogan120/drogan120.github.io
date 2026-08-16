"use client";

import { useI18n } from "@/i18n";
import { Section, SectionHeading } from "./Chrome";

export default function AnimeAchievements() {
  const { t } = useI18n();

  return (
    <Section id="achievements">
      <SectionHeading
        kanji="受賞"
        eyebrow={t.default.achievements.label.replace("// ", "")}
        title={t.default.achievements.title}
      />

      <div className="mt-12 grid gap-4 sm:grid-cols-3">
        {t.default.achievements.items.map((item, i) => (
          <article
            key={item.title}
            className="relative rounded-2xl border-2 border-border bg-card p-6 transition-transform duration-500 hover:-translate-y-1 sm:p-7"
          >
            <span
              aria-hidden
              className="absolute right-4 top-3 font-mono text-4xl font-black text-accent/10"
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="text-2xl leading-none">{item.icon}</span>
            <h3 className="mt-4 font-bold break-words">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {item.detail}
            </p>
          </article>
        ))}
      </div>
    </Section>
  );
}