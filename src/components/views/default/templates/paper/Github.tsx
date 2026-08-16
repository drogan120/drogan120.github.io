"use client";

import { useI18n } from "@/i18n";
import { useGithubStats } from "@/hooks/useGithubStats";
import { Section, SectionHeading, Card } from "./Chrome";

export default function PaperGithub() {
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
        {stats.map((s) => (
          <Card key={s.key}>
            <span className="text-xl">{s.icon}</span>
            <p className="mt-3 font-serif text-4xl font-bold tabular-nums text-accent">
              {s.value}
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
        className="mt-8 inline-flex items-center gap-2 rounded border border-border bg-card px-5 py-2.5 font-mono text-sm transition-colors hover:border-accent hover:text-accent"
      >
        @{username} {t.default.github.viewProfile} ↗
      </a>
    </Section>
  );
}