import { useI18n } from "@/i18n";

export default function ClassicAchievements() {
  const { t } = useI18n();

  return (
    <section id="achievements" className="mx-auto max-w-5xl px-6 py-16 md:py-24">
      <p className="text-center font-mono text-sm text-accent">
        {t.default.achievements.label}
      </p>
      <h2 className="mt-2 text-center text-3xl font-bold">
        {t.default.achievements.title}
      </h2>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {t.default.achievements.items.map((item) => (
          <div
            key={item.title}
            className="rounded-2xl border border-border bg-card p-6 text-center transition-colors hover:border-accent/50"
          >
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent/10">
              <span className="text-2xl">{item.icon}</span>
            </div>
            <h3 className="mt-4 font-semibold">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{item.detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
