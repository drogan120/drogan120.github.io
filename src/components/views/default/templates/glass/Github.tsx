import { useI18n } from "@/i18n";

export default function GlassGithub() {
  const { t } = useI18n();

  const stats = [
    { icon: "📦", value: t.default.github.repos, key: "repos" },
    { icon: "⭐", value: t.default.github.stars, key: "stars" },
    { icon: "👥", value: t.default.github.followers, key: "followers" },
    { icon: "🌱", value: t.default.github.contributions, key: "contributions" },
  ] as const;

  return (
    <section id="github" className="relative">
      <div className="pointer-events-none absolute inset-x-0 top-1/2 mx-auto h-72 w-72 -translate-y-1/2 rounded-full bg-accent-2/15 blur-[140px]" />

      <div className="relative mx-auto max-w-5xl px-6 py-16 md:py-24">
        <div className="text-center">
          <p className="font-mono text-sm text-accent">
            {t.default.github.label}
          </p>
          <h2 className="mt-3 text-3xl font-bold">
            {t.default.github.title}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted">
            {t.default.github.description}
          </p>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-5 lg:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.key}
              className="rounded-3xl border border-white/15 bg-white/10 p-8 text-center backdrop-blur-xl transition-all hover:border-accent/40 hover:bg-white/15"
            >
              <span className="text-3xl">{s.icon}</span>
              <p className="mt-3 text-4xl font-bold">{t.default.github[s.key]}</p>
              <p className="mt-1 text-sm text-muted">{s.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href="https://github.com/drogan120"
            target="_blank"
            rel="noopener noreferrer"
            className="pop-on-click rounded-full border border-white/30 bg-white/15 px-8 py-3.5 font-medium backdrop-blur-md transition-all hover:bg-white/25"
          >
            @drogan120 {t.default.github.viewProfile} ↗
          </a>
        </div>
      </div>
    </section>
  );
}
