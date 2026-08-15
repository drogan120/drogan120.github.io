import { useI18n } from "@/i18n";

export default function About() {
  const { t } = useI18n();

  return (
    <section id="about" className="mx-auto max-w-5xl px-6 py-24">
      <p className="font-mono text-sm text-accent">{t.default.about.label}</p>
      <h2 className="mt-2 text-3xl font-bold">{t.default.about.title}</h2>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {t.default.about.cards.map((card) => (
          <div
            key={card.title}
            className="rounded-2xl border border-border bg-card p-6 transition-colors hover:border-accent/50"
          >
            <h3 className="text-lg font-semibold text-accent">{card.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {card.description}
            </p>
          </div>
        ))}
      </div>

      <p className="mt-10 max-w-3xl leading-relaxed text-muted">
        {t.default.about.paragraph}
      </p>
    </section>
  );
}
