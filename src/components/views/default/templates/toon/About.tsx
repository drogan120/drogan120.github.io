"use client";

import { useI18n } from "@/i18n";
import { Section, SectionHeading, Card } from "./Chrome";

export default function ToonAbout() {
  const { t } = useI18n();

  return (
    <Section id="about">
      <SectionHeading
        index="01"
        eyebrow={t.default.about.label.replace("// ", "")}
        title={t.default.about.title}
      />

      <div className="mt-12 grid gap-4 md:grid-cols-3">
        <Card tag="pit.stop" className="md:col-span-2">
          <p className="font-mono text-sm leading-loose text-muted sm:text-base">
            {t.default.about.paragraph}
          </p>
        </Card>

        <div className="grid gap-4">
          {t.default.about.cards.map((card) => (
            <Card key={card.title}>
              <div className="flex items-start gap-3">
                <span className="text-2xl leading-none">{card.icon}</span>
                <div className="min-w-0">
                  <p className="font-mono text-[11px] text-accent">
                    {card.title}
                  </p>
                  <p className="mt-0.5 text-sm text-muted break-words">
                    {card.description}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Section>
  );
}