import { useI18n } from "@/i18n";

export default function ClassicStats() {
  const { t } = useI18n();

  return (
    <section id="stats" className="mx-auto max-w-5xl px-6 py-12">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
        {t.default.stats.items.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-border bg-card p-6 text-center transition-colors hover:border-accent/50 sm:p-8"
          >
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
              <span className="text-2xl">{stat.icon}</span>
            </div>
            <p className="mt-4 text-3xl font-bold tabular-nums text-accent sm:text-4xl">
              {stat.value}
            </p>
            <p className="mt-1 text-sm text-muted">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
