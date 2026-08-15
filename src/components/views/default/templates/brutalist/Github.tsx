import { useI18n } from "@/i18n";

export default function BrutalistGithub() {
  const { t } = useI18n();

  const stats = [
    { icon: "📦", value: t.default.github.repos, key: "repos" },
    { icon: "⭐", value: t.default.github.stars, key: "stars" },
    { icon: "👥", value: t.default.github.followers, key: "followers" },
    { icon: "🌱", value: t.default.github.contributions, key: "contributions" },
  ] as const;

  return (
    <section id="github" className="border-b-4 border-foreground">
      <div className="mx-auto max-w-6xl px-6 py-12 md:py-20">
        <h2 className="text-3xl font-black uppercase tracking-tight">
          {t.default.github.title}
        </h2>
        <p className="mt-2 font-mono text-xs font-bold text-accent">
          [{t.default.github.label}]
        </p>

        <div className="mt-10 grid grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={s.key}
              className={`border-2 border-foreground p-6 ${
                i !== 0 ? "border-l-0 sm:border-l-0" : ""
              } ${i % 2 === 1 ? "max-sm:border-t-0" : ""} ${
                i >= 2 ? "lg:border-t-0" : ""
              }`}
            >
              <span className="text-2xl">{s.icon}</span>
              <p className="mt-2 font-mono text-4xl font-black text-accent">
                {t.default.github[s.key]}
              </p>
              <p className="mt-1 font-mono text-xs font-bold uppercase">
                {s.value}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href="https://github.com/drogan120"
            target="_blank"
            rel="noopener noreferrer"
            className="pop-on-click border-2 border-foreground bg-accent px-6 py-3 font-mono text-sm font-bold uppercase text-background shadow-[4px_4px_0_0_var(--foreground)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
          >
            @drogan120 {t.default.github.viewProfile} ↗
          </a>
        </div>
      </div>
    </section>
  );
}
