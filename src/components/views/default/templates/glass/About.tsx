import { useI18n } from "@/i18n";

export default function GlassAbout() {
  const { t } = useI18n();

  return (
    <section id="about" className="relative">
      <div className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-64 w-64 rounded-full bg-accent-2/20 blur-[120px]" />

      <div className="relative mx-auto max-w-5xl px-6 py-16 md:py-24">
        <div className="text-center">
          <p className="font-mono text-sm text-accent">{t.default.about.label}</p>
          <h2 className="mt-3 text-3xl font-bold">{t.default.about.title}</h2>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {t.default.about.cards.map((card) => (
            <div
              key={card.title}
              className="rounded-3xl border border-white/15 bg-white/10 p-8 backdrop-blur-xl transition-all hover:border-accent/40 hover:bg-white/15"
            >
              <span className="section-icon text-3xl">{card.icon}</span>
              <h3 className="mt-3 text-lg font-semibold">{card.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {card.description}
              </p>
            </div>
          ))}
        </div>

        <p className="mx-auto mt-14 max-w-3xl text-center leading-relaxed text-muted">
          {t.default.about.paragraph}
        </p>
      </div>
    </section>
  );
}
