import { useI18n } from "@/i18n";

export default function MinimalAchievements() {
  const { t } = useI18n();

  return (
    <section id="achievements" className="mx-auto max-w-5xl px-6 py-16 md:py-24">
      <p className="font-mono text-sm text-accent">{t.default.achievements.label}</p>
      <h2 className="mt-3 text-3xl font-bold">{t.default.achievements.title}</h2>

      <div className="mt-12 space-y-4">
        {t.default.achievements.items.map((item) => (
          <div
            key={item.title}
            className="flex items-start gap-4 border border-border bg-card p-5 transition-colors hover:border-accent/50"
          >
            <span className="text-2xl">{item.icon}</span>
            <div>
              <h3 className="font-semibold">{item.title}</h3>
              <p className="mt-1 text-sm text-muted">{item.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
