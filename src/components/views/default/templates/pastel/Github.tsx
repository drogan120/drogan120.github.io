import { useI18n } from "@/i18n";

const cardColors = [
  "from-accent/15 to-accent-2/10",
  "from-accent-2/15 to-accent/10",
  "from-accent/15 to-accent-2/15",
  "from-accent-2/15 to-accent/15",
];

export default function PastelGithub() {
  const { t } = useI18n();

  const stats = [
    { icon: "📦", value: t.default.github.repos, key: "repos" },
    { icon: "⭐", value: t.default.github.stars, key: "stars" },
    { icon: "👥", value: t.default.github.followers, key: "followers" },
    { icon: "🌱", value: t.default.github.contributions, key: "contributions" },
  ] as const;

  return (
    <section id="github" className="mx-auto max-w-5xl px-6 py-16 md:py-24">
      <div className="text-center">
        <p className="font-mono text-sm text-accent">
          {t.default.github.label}
        </p>
        <h2 className="mt-3 text-3xl font-bold text-foreground">
          {t.default.github.title}
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-muted">
          {t.default.github.description}
        </p>
      </div>

      <div className="mt-14 grid grid-cols-2 gap-5 lg:grid-cols-4">
        {stats.map((s, i) => (
          <div
            key={s.key}
            className={`rounded-3xl bg-gradient-to-b ${cardColors[i % cardColors.length]} p-8 text-center ring-1 ring-border/60 transition-transform hover:-translate-y-1`}
          >
            <span className="text-3xl">{s.icon}</span>
            <p className="mt-3 text-4xl font-extrabold text-foreground">
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
          className="pop-on-click rounded-full bg-gradient-to-r from-accent to-accent-2 px-8 py-3.5 font-medium text-background shadow-lg transition-transform hover:scale-105"
        >
          @drogan120 {t.default.github.viewProfile} ↗
        </a>
      </div>
    </section>
  );
}
