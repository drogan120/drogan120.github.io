import { useI18n } from "@/i18n";

export default function ClassicAbout() {
  const { t } = useI18n();

  return (
    <section id="about" className="border-y border-border bg-card/40">
      <div className="mx-auto max-w-5xl px-6 py-24">
        <p className="text-center font-mono text-sm text-accent">
          {t.default.about.label}
        </p>
        <h2 className="mt-2 text-center text-3xl font-bold">
          {t.default.about.title}
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {t.default.about.cards.map((card, i) => (
            <div
              key={card.title}
              className="rounded-2xl border border-border bg-background p-6 text-center transition-colors hover:border-accent/50"
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 font-mono font-bold text-accent">
                {i + 1}
              </div>
              <h3 className="mt-4 text-lg font-semibold">{card.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {card.description}
              </p>
            </div>
          ))}
        </div>

        <p className="mx-auto mt-12 max-w-3xl text-center leading-relaxed text-muted">
          {t.default.about.paragraph}
        </p>
      </div>
    </section>
  );
}
