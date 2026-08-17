"use client";

import { useI18n } from "@/i18n";
import { Section, SectionHeading, Card } from "./Chrome";

export default function BrokenSkills() {
  const { t } = useI18n();

  return (
    <Section id="skills">
      <SectionHeading
        index="02"
        eyebrow={t.default.skills.label.replace("// ", "")}
        title={t.default.skills.title}
      />

      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        {t.default.skills.groups.map((group, i) => (
          <Card
            key={group.title}
            tilt={i % 2 === 0 ? 1 : 2}
            offset={i + 1}
            sticker={i % 2 === 0 ? "note" : "#todo"}
          >
            <h3 className="broken-scribble inline-block text-sm font-bold tracking-wide break-words">
              {group.icon} {group.title}
            </h3>

            <div className="mt-5 flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <span
                  key={skill}
                  className="border border-border bg-background/60 px-3 py-1 font-mono text-[11px] text-muted transition-colors group-hover:border-accent/60 group-hover:text-accent sm:text-xs"
                >
                  {skill}
                </span>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
}
