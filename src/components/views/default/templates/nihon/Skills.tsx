"use client";

import { useI18n } from "@/i18n";
import { Section, SectionHeading, Panel } from "./Chrome";

export default function NihonSkills() {
  const { t } = useI18n();

  return (
    <Section id="skills">
      <SectionHeading
        kanji="技能"
        reading="ぎのう"
        eyebrow={t.default.skills.label.replace("// ", "")}
        title={t.default.skills.title}
      />

      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        {t.default.skills.groups.map((group) => (
          <Panel key={group.title}>
            <div className="flex items-center gap-3">
              <span className="text-xl">{group.icon}</span>
              <h3 className="font-mono text-sm font-bold tracking-wide break-words">
                {group.title}
              </h3>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-lg border border-border bg-background/60 px-3 py-1 font-mono text-[11px] text-muted transition-colors group-hover:border-accent/40 sm:text-xs"
                >
                  {skill}
                </span>
              ))}
            </div>
          </Panel>
        ))}
      </div>
    </Section>
  );
}