import { useI18n } from "@/i18n";
import { useGithubStats } from "@/hooks/useGithubStats";

export default function ClassicGithub() {
  const { t } = useI18n();
  const { stats, username, profileUrl } = useGithubStats();

  return (
    <section id="github" className="mx-auto max-w-5xl px-6 py-16 md:py-24">
      <p className="text-center font-mono text-sm text-accent">
        {t.default.github.label}
      </p>
      <h2 className="mt-2 text-center text-2xl font-bold sm:text-3xl">
        {t.default.github.title}
      </h2>
      <p className="mx-auto mt-3 max-w-xl text-center text-muted">
        {t.default.github.description}
      </p>

      <div className="mt-12 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
        {stats.map((s) => (
          <div
            key={s.key}
            className="rounded-2xl border border-border bg-card p-5 text-center transition-colors hover:border-accent/50 sm:p-8"
          >
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
              <span className="text-2xl">{s.icon}</span>
            </div>
            <p className="mt-4 text-3xl font-bold tabular-nums text-accent sm:text-4xl">
              {s.value}
            </p>
            <p className="mt-1 text-sm text-muted">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 text-center">
        <a
          href={profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="pop-on-click inline-block rounded-xl bg-foreground px-6 py-3 font-semibold text-background transition-transform hover:scale-105"
        >
          @{username} {t.default.github.viewProfile} ↗
        </a>
      </div>
    </section>
  );
}
