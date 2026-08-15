import { useI18n } from "@/i18n";

export default function PastelStats() {
  const { t } = useI18n();

  return (
    <section id="stats" className="mx-auto max-w-5xl px-6 py-12">
      <div className="grid gap-5 sm:grid-cols-3">
        {t.default.stats.items.map((stat, i) => (
          <div
            key={stat.label}
            className={`rounded-3xl bg-gradient-to-b ${cardColors[i % cardColors.length]} p-8 text-center ring-1 ring-border/60 transition-transform hover:-translate-y-1`}
          >
            <span className="text-3xl">{stat.icon}</span>
            <p className="mt-3 text-4xl font-extrabold text-foreground">
              {stat.value}
            </p>
            <p className="mt-1 text-sm text-muted">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

const cardColors = [
  "from-accent/15 to-accent-2/10",
  "from-accent-2/15 to-accent/10",
  "from-accent/15 to-accent-2/15",
];
