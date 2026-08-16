"use client";

import { useI18n } from "@/i18n";
import { Section, SectionHeading, Tile } from "./Chrome";

export default function AuroraAbout() {
  const { t } = useI18n();

  return (
    <Section id="about">
      <SectionHeading
        index="01"
        eyebrow={t.default.about.label.replace("// ", "")}
        title={t.default.about.title}
      />

      <div className="mt-12 grid gap-4 md:grid-cols-3">
        {/* The prose tile spans two columns so the paragraph keeps a
            comfortable measure instead of stretching the full width. */}
        <Tile span="md:col-span-2" className="flex flex-col justify-center">
          <p className="text-sm leading-loose text-muted sm:text-base">
            {t.default.about.paragraph}
          </p>
        </Tile>

        <div className="grid gap-4">
          {t.default.about.cards.map((card, i) => (
            <Tile key={card.title}>
              <div className="flex items-start gap-3">
                <span className="text-2xl leading-none">{card.icon}</span>
                <div className="min-w-0">
                  <p className="font-mono text-[11px] text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <p className="mt-0.5 text-sm font-medium break-words">
                    {card.title}
                  </p>
                </div>
              </div>
            </Tile>
          ))}
        </div>
      </div>
    </Section>
  );
}
