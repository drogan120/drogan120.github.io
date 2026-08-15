import { useI18n } from "@/i18n";

export default function GlassAchievements() {
  const { t } = useI18n();

  return (
    <section id="achievements" className="relative">
      <div className="pointer-events-none absolute inset-x-0 top-1/2 mx-auto h-72 w-72 -translate-y-1/2 rounded-full bg-accent/15 blur-[140px]" />

      <div className="relative mx-auto max-w-5xl px-6 py-24">
        <div className="text-center">
          <p className="font-mono text-sm text-accent">
            {t.default.achievements.label}
          </p>
          <h2 className="mt-3 text-3xl font-bold">
            {t.default.achievements.title}
          </h2>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {t.default.achievements.items.map((item) => (
            <div
              key={item.title}
              className="rounded-3xl border border-white/15 bg-white/10 p-8 text-center backdrop-blur-xl transition-all hover:border-accent/40 hover:bg-white/15"
            >
              <span className="text-4xl">{item.icon}</span>
              <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {item.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
