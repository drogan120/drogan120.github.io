import { useI18n } from "@/i18n";

export default function PlayfulAchievements() {
  const { t } = useI18n();

  return (
    <section id="achievements" className="mx-auto max-w-5xl px-6 py-24">
      <div className="text-center">
        <p className="font-mono text-sm text-accent">{t.default.achievements.label}</p>
        <h2 className="mt-2 text-4xl font-extrabold tracking-tight">
          {t.default.achievements.title}
        </h2>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {t.default.achievements.items.map((item) => (
          <div
            key={item.title}
            className="rounded-3xl border border-border bg-card p-8 text-center transition-all hover:-translate-y-2 hover:border-accent/50 hover:shadow-xl hover:shadow-accent/10"
          >
            <span className="text-4xl">{item.icon}</span>
            <h3 className="mt-4 text-lg font-bold">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{item.detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
