"use client";

import { useI18n } from "@/i18n";
import { useGithubStats } from "@/hooks/useGithubStats";
import { Section, SectionHeading, Card } from "./Chrome";

export default function BrokenGithub() {
  const { t } = useI18n();
  const { stats, username, profileUrl } = useGithubStats();

  return (
    <Section id="github">
      <SectionHeading
        index="06"
        eyebrow={t.default.github.label.replace("// ", "")}
        title={t.default.github.title}
        description={t.default.github.description}
      />

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <Card key={s.key} tilt={i % 2 === 0 ? 1 : 2} offset={i}>
            <span className="text-xl">{s.icon}</span>
            <p className="mt-3 text-3xl font-black tabular-nums text-accent">
              <span className="broken-stack" data-text={s.value}>
                {s.value}
              </span>
            </p>
            <p className="mt-1 font-mono text-xs break-words text-muted">
              {s.label}
            </p>
          </Card>
        ))}
      </div>

      <a
        href={profileUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 inline-flex items-center gap-2 border border-accent-2/50 bg-card px-5 py-2.5 font-mono text-sm text-accent-2 transition-colors hover:border-accent-2 hover:bg-accent-2 hover:text-background"
      >
        @{username} {t.default.github.viewProfile} ↗
      </a>
    </Section>
  );
}
