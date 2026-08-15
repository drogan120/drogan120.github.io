import { useI18n } from "@/i18n";

export default function FashionStats() {
  const { t } = useI18n();

  return (
    <section id="stats" className="border-b border-border">
      <div className="mx-auto grid max-w-6xl gap-px border border-border bg-border md:grid-cols-3">
        {t.default.stats.items.map((stat) => (
          <div key={stat.label} className="bg-background p-12 text-center">
            <span className="section-icon text-3xl">{stat.icon}</span>
            <p className="mt-4 font-serif text-6xl font-light text-accent">
              {stat.value}
            </p>
            <p className="mt-2 text-xs uppercase tracking-[0.3em] text-muted">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
