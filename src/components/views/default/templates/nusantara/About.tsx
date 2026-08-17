"use client";

import { useI18n } from "@/i18n";
import { Section, SectionHeading, Panel } from "./Chrome";

export default function NusantaraAbout() {
  const { t } = useI18n();

  return (
    <Section id="about">
      <SectionHeading
        eyebrow={t.default.about.label.replace("// ", "")}
        title={t.default.about.title}
      />

      <div className="mt-12 grid gap-4 md:grid-cols-3">
        <Panel className="md:col-span-2 md:flex md:flex-col md:justify-center">
          <p className="text-sm leading-loose text-muted sm:text-base">
            {t.default.about.paragraph}
          </p>
        </Panel>

        <div className="grid gap-4">
          {t.default.about.cards.map((card) => (
            <Panel key={card.title}>
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
            </Panel>
          ))}
        </div>
      </div>
    </Section>
  );
}
