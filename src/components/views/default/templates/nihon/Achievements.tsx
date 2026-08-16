"use client";

import { useI18n } from "@/i18n";
import { Section, SectionHeading } from "./Chrome";

export default function NihonAchievements() {
  const { t } = useI18n();

  return (
    <Section id="achievements">
      <SectionHeading
        kanji="受賞"
        reading="じゅしょう"
        eyebrow={t.default.achievements.label.replace("// ", "")}
        title={t.default.achievements.title}
      />

      <div className="mt-12 grid gap-4 sm:grid-cols-3">
        {t.default.achievements.items.map((item, i) => (
          <article
            key={item.title}
            className="nihon-panel rounded-2xl p-6 transition-transform duration-500 hover:-translate-y-1 sm:p-7"
          >
            <div className="flex items-center justify-between">
              <span className="text-2xl leading-none">{item.icon}</span>
              <span
                aria-hidden
                className="font-mono text-2xl font-black text-accent/20"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
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