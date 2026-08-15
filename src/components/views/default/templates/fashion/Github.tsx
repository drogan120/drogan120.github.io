import { useI18n } from "@/i18n";

export default function FashionGithub() {
  const { t } = useI18n();

  const stats = [
    { icon: "📦", value: t.default.github.repos, key: "repos" },
    { icon: "⭐", value: t.default.github.stars, key: "stars" },
    { icon: "👥", value: t.default.github.followers, key: "followers" },
    { icon: "🌱", value: t.default.github.contributions, key: "contributions" },
  ] as const;

  return (
    <section id="github" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-8 py-16 md:py-24">
        <p className="text-center text-xs uppercase tracking-[0.4em] text-accent">
          {t.default.github.label}
        </p>
        <h2 className="mt-6 text-center font-serif text-5xl font-light">
          {t.default.github.title}
        </h2>

        <div className="mx-auto mt-14 grid max-w-4xl gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.key} className="bg-background p-10 text-center">
              <span className="text-3xl">{s.icon}</span>
              <p className="mt-4 font-serif text-5xl font-light text-accent">
                {t.default.github[s.key]}
              </p>
              <p className="mt-2 text-xs uppercase tracking-[0.3em] text-muted">
                {s.value}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="https://github.com/drogan120"
            target="_blank"
            rel="noopener noreferrer"
            className="group pop-on-click relative text-xs uppercase tracking-[0.3em] transition-colors hover:text-accent"
          >
            @drogan120 {t.default.github.viewProfile}
            <span className="absolute -bottom-2 left-0 h-px w-full bg-accent opacity-0 transition-opacity group-hover:opacity-100" />
          </a>
        </div>
      </div>
    </section>
  );
}
