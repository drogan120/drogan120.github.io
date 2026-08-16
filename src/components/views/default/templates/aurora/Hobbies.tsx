"use client";

import { useI18n } from "@/i18n";
import { Section, SectionHeading, Tile } from "./Chrome";

export default function AuroraHobbies() {
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
          <Tile key={hobby.name}>
            <span className="block text-3xl transition-transform duration-500 group-hover:scale-110">
              {hobby.icon}
            </span>
            <h3 className="mt-4 font-semibold break-words">{hobby.name}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted">
              {hobby.detail}
            </p>
          </Tile>
        ))}
      </div>
    </Section>
  );
}
