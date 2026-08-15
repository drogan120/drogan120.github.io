import { useI18n } from "@/i18n";
import { useGithubStats } from "@/hooks/useGithubStats";

export default function GlassGithub() {
  const { t } = useI18n();
  const { stats, username, profileUrl } = useGithubStats();

  return (
    <section id="github" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-1/2 mx-auto h-72 w-72 max-w-full -translate-y-1/2 rounded-full bg-accent-2/15 blur-[140px]" />

      <div className="relative mx-auto max-w-5xl px-6 py-16 md:py-24">
        <div className="text-center">
          <p className="font-mono text-sm text-accent">
            {t.default.github.label}
          </p>
          <h2 className="mt-3 text-2xl font-bold sm:text-3xl">
            {t.default.github.title}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted">
            {t.default.github.description}
          </p>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.key}
              className="rounded-3xl border border-white/15 bg-white/10 p-5 text-center backdrop-blur-xl transition-all hover:border-accent/40 hover:bg-white/15 sm:p-8"
            >
              <span className="text-3xl">{s.icon}</span>
              <p className="mt-3 text-3xl font-bold tabular-nums sm:text-4xl">
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
            className="pop-on-click inline-block rounded-full border border-white/30 bg-white/15 px-8 py-3.5 font-medium backdrop-blur-md transition-all hover:bg-white/25"
          >
            @{username} {t.default.github.viewProfile} ↗
          </a>
        </div>
      </div>
    </section>
  );
}
