"use client";

import { useI18n } from "@/i18n";
import { Section, SectionHeading } from "./Chrome";

export default function AuroraAchievements() {
  const { t } = useI18n();

  return (
    <Section id="achievements">
      <SectionHeading
        index="04"
        eyebrow={t.default.achievements.label.replace("// ", "")}
        title={t.default.achievements.title}
      />

      <ul className="mt-12 divide-y divide-border border-y border-border">
        {t.default.achievements.items.map((item, i) => (
          <li
            key={item.title}
            className="group flex items-start gap-4 py-6 transition-colors sm:gap-6"
          >
            <span className="font-mono text-xs text-muted tabular-nums">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="text-2xl leading-none">{item.icon}</span>
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold break-words transition-colors group-hover:text-accent">
                {item.title}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-muted">
                {item.detail}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
