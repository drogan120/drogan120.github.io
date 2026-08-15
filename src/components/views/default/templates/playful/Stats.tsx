import { useI18n } from "@/i18n";

export default function PlayfulStats() {
  const { t } = useI18n();

  return (
    <section id="stats" className="mx-auto max-w-5xl px-6 py-12">
      <div className="grid gap-6 sm:grid-cols-3">
        {t.default.stats.items.map((stat) => (
          <div
            key={stat.label}
            className="rounded-3xl border border-border bg-background p-8 text-center transition-all hover:scale-105 hover:border-accent/50"
          >
            <span className="text-3xl">{stat.icon}</span>
            <p className="mt-3 bg-gradient-to-r from-accent to-accent-2 bg-clip-text text-4xl font-extrabold text-transparent">
              {stat.value}
            </p>
            <p className="mt-1 text-sm text-muted">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
