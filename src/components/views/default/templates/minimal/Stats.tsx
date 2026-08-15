import { useI18n } from "@/i18n";

export default function MinimalStats() {
  const { t } = useI18n();

  return (
    <section id="stats" className="mx-auto max-w-5xl px-6 py-12">
      <div className="grid gap-px border border-border bg-border sm:grid-cols-3">
        {t.default.stats.items.map((stat) => (
          <div key={stat.label} className="bg-background p-8 text-center">
            <span className="text-2xl">{stat.icon}</span>
            <p className="mt-2 text-4xl font-bold text-accent">{stat.value}</p>
            <p className="mt-1 font-mono text-sm text-muted">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
