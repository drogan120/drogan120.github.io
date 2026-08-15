import { useI18n } from "@/i18n";
import { useGithubStats } from "@/hooks/useGithubStats";

export default function PlayfulGithub() {
  const { t } = useI18n();
  const { stats, username, profileUrl } = useGithubStats();

  return (
    <section id="github" className="mx-auto max-w-5xl px-6 py-16 md:py-24">
      <div className="text-center">
        <p className="font-mono text-sm text-accent">{t.default.github.label}</p>
        <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
          {t.default.github.title}
        </h2>
      </div>

      <div className="mt-12 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
        {stats.map((s) => (
          <div
            key={s.key}
            className="rounded-3xl border border-border bg-card p-5 text-center transition-all hover:-translate-y-1 hover:border-accent/50 sm:p-8"
          >
            <span className="text-3xl">{s.icon}</span>
            <p className="mt-3 bg-gradient-to-r from-accent to-accent-2 bg-clip-text pb-1 text-3xl font-extrabold leading-tight tabular-nums text-transparent sm:text-4xl">
              {s.value}
            </p>
            <p className="mt-1 text-sm text-muted">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <a
          href={profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="pop-on-click rounded-2xl bg-gradient-to-r from-accent to-accent-2 px-8 py-3.5 text-center font-semibold text-background shadow-lg shadow-accent/30 transition-all hover:scale-105 hover:shadow-accent/50"
        >
          @{username} {t.default.github.viewProfile} →
        </a>
      </div>
    </section>
  );
}
