import { useI18n } from "@/i18n";

export default function MinimalAbout() {
  const { t } = useI18n();

  return (
    <section id="about">
      <div className="mx-auto max-w-5xl px-6 py-24">
        <p className="font-mono text-sm text-accent">
          {t.default.about.label}
        </p>
        <h2 className="mt-3 text-3xl font-bold">{t.default.about.title}</h2>

        <div className="mt-12 grid gap-10 md:grid-cols-[1fr_1.4fr]">
          <div className="space-y-6">
            {t.default.about.cards.map((card, i) => (
              <div key={card.title}>
                <h3 className="font-mono text-sm font-semibold text-accent">
                  0{i + 1}
                </h3>
                <p className="mt-1 text-sm text-foreground">{card.title}</p>
              </div>
            ))}
          </div>

          <p className="max-w-xl leading-loose text-muted">
            {t.default.about.paragraph}
          </p>
        </div>
      </div>
    </section>
  );
}
