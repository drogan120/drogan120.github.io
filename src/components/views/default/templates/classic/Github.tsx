import { useI18n } from "@/i18n";

export default function ClassicGithub() {
  const { t } = useI18n();

  const stats = [
    { icon: "📦", value: t.default.github.repos, key: "repos" },
    { icon: "⭐", value: t.default.github.stars, key: "stars" },
    { icon: "👥", value: t.default.github.followers, key: "followers" },
    { icon: "🌱", value: t.default.github.contributions, key: "contributions" },
  ] as const;

  return (
    <section id="github" className="mx-auto max-w-5xl px-6 py-16 md:py-24">
      <p className="text-center font-mono text-sm text-accent">
        {t.default.github.label}
      </p>
      <h2 className="mt-2 text-center text-3xl font-bold">
        {t.default.github.title}
      </h2>
      <p className="mx-auto mt-3 max-w-xl text-center text-muted">
        {t.default.github.description}
      </p>

      <div className="mt-12 grid grid-cols-2 gap-6 lg:grid-cols-4">
        {stats.map((s) => (
          <div
            key={s.key}
            className="rounded-2xl border border-border bg-card p-8 text-center transition-colors hover:border-accent/50"
          >
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
              <span className="text-2xl">{s.icon}</span>
            </div>
            <p className="mt-4 text-4xl font-bold text-accent">
              {t.default.github[s.key]}
            </p>
            <p className="mt-1 text-sm text-muted">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 text-center">
        <a
          href="https://github.com/drogan120"
          target="_blank"
          rel="noopener noreferrer"
          className="pop-on-click inline-block rounded-xl bg-foreground px-6 py-3 font-semibold text-background transition-transform hover:scale-105"
        >
          @drogan120 {t.default.github.viewProfile} ↗
        </a>
      </div>
    </section>
  );
}
