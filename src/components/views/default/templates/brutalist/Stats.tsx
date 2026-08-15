import { useI18n } from "@/i18n";

export default function BrutalistStats() {
  const { t } = useI18n();

  return (
    <section id="stats" className="border-b-4 border-foreground">
      <div className="mx-auto grid max-w-6xl md:grid-cols-3">
        {t.default.stats.items.map((stat, i) => (
          <div
            key={stat.label}
            className={`p-8 ${i !== 0 ? "md:border-l-4 md:border-t-0 border-t-4 border-foreground" : ""}`}
          >
            <span className="text-2xl">{stat.icon}</span>
            <p className="mt-2 font-mono text-5xl font-black text-accent">
              {stat.value}
            </p>
            <p className="mt-1 font-mono text-xs font-bold uppercase">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
