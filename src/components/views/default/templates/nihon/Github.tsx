"use client";

import { useI18n } from "@/i18n";
import { useGithubStats } from "@/hooks/useGithubStats";
import { Section, SectionHeading, Panel } from "./Chrome";

export default function NihonGithub() {
  const { t } = useI18n();
  const { stats, username, profileUrl } = useGithubStats();

  return (
    <Section id="github">
      <SectionHeading
        kanji="開発"
        reading="かいはつ"
        eyebrow={t.default.github.label.replace("// ", "")}
        title={t.default.github.title}
        description={t.default.github.description}
      />

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Panel key={s.key}>
            <span className="text-xl">{s.icon}</span>
            <p className="mt-3 text-3xl font-black tabular-nums text-accent">
              {s.value}
            </p>
            <p className="mt-1 font-mono text-xs break-words text-muted">
              {s.label}
            </p>
          </Panel>
        ))}
      </div>

      <a
        href={profileUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 inline-flex items-center gap-2 rounded-lg border border-border bg-card px-5 py-2.5 font-mono text-sm transition-colors hover:border-accent hover:text-accent"
      >
        @{username} {t.default.github.viewProfile} ↗
      </a>
    </Section>
  );
}