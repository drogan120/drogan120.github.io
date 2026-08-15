import { useI18n } from "@/i18n";
import { useGithubStats } from "@/hooks/useGithubStats";

export default function MinimalGithub() {
  const { t } = useI18n();
  const { stats, username, profileUrl } = useGithubStats();

  return (
    <section id="github" className="mx-auto max-w-5xl px-6 py-16 md:py-24">
      <p className="font-mono text-sm text-accent">{t.default.github.label}</p>
      <h2 className="mt-3 text-2xl font-bold sm:text-3xl">
        {t.default.github.title}
      </h2>
      <p className="mt-3 max-w-xl text-muted">{t.default.github.description}</p>

      <div className="mt-10 grid grid-cols-2 gap-px border border-border bg-border sm:grid-cols-4">
        {stats.map((s) => (
          <div key={s.key} className="bg-background p-5 text-center sm:p-6">
            <span className="text-2xl">{s.icon}</span>
            <p className="mt-2 text-2xl font-bold tabular-nums text-accent sm:text-3xl">
              {s.value}
            </p>
            <p className="mt-1 font-mono text-xs text-muted">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <a
          href={profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex flex-wrap items-center justify-center gap-2 rounded-lg bg-accent px-5 py-2.5 font-mono text-sm font-semibold text-background transition-transform hover:scale-105"
        >
          @{username} {t.default.github.viewProfile} ↗
        </a>
      </div>
    </section>
  );
}
