import { useI18n } from "@/i18n";

export default function GlassStats() {
  const { t } = useI18n();

  return (
    <section id="stats" className="relative">
      <div className="pointer-events-none absolute inset-x-0 mx-auto h-64 w-64 rounded-full bg-accent-2/15 blur-[120px]" />

      <div className="relative mx-auto max-w-5xl px-6 py-12">
        <div className="grid gap-5 sm:grid-cols-3">
          {t.default.stats.items.map((stat) => (
            <div
              key={stat.label}
              className="rounded-3xl border border-white/15 bg-white/10 p-8 text-center backdrop-blur-xl transition-all hover:border-accent/40 hover:bg-white/15"
            >
              <span className="text-3xl">{stat.icon}</span>
              <p className="mt-3 text-4xl font-bold">{stat.value}</p>
              <p className="mt-1 text-sm text-muted">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
