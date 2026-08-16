"use client";

import { useI18n } from "@/i18n";
import { Section, SectionHeading, Card } from "./Chrome";

export default function ToonHobbies() {
  const { t } = useI18n();

  return (
    <Section id="hobbies">
      <SectionHeading
        index="05"
        eyebrow={t.default.hobbies.label.replace("// ", "")}
        title={t.default.hobbies.title}
      />

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {t.default.hobbies.items.map((hobby) => (
          <Card key={hobby.name}>
            <span className="block text-3xl">{hobby.icon}</span>
            <h3 className="mt-4 font-bold break-words">{hobby.name}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted">
              {hobby.detail}
            </p>
          </Card>
        ))}
      </div>
    </Section>
  );
}