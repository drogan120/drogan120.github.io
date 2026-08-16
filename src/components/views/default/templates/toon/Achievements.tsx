"use client";

import { useI18n } from "@/i18n";
import { Section, SectionHeading, Card } from "./Chrome";

export default function ToonAchievements() {
  const { t } = useI18n();

  return (
    <Section id="achievements">
      <SectionHeading
        index="04"
        eyebrow={t.default.achievements.label.replace("// ", "")}
        title={t.default.achievements.title}
      />

      <div className="mt-12 grid gap-4 sm:grid-cols-3">
        {t.default.achievements.items.map((item, i) => (
          <Card key={item.title}>
            <span
              aria-hidden
              className="absolute right-4 top-3 font-mono text-4xl font-black text-accent/15"
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="text-2xl leading-none">{item.icon}</span>
            <h3 className="mt-4 font-bold break-words">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {item.detail}
            </p>
          </Card>
        ))}
      </div>
    </Section>
  );
}