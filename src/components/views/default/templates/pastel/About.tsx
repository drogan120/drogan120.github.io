import { useI18n } from "@/i18n";

export default function PastelAbout() {
  const { t } = useI18n();

  return (
    <section id="about" className="mx-auto max-w-5xl px-6 py-24">
      <div className="text-center">
        <p className="font-mono text-sm text-accent">
          {t.default.about.label}
        </p>
        <h2 className="mt-3 text-3xl font-bold text-foreground">
          {t.default.about.title}
        </h2>
      </div>

      <div className="mt-14 grid gap-5 md:grid-cols-3">
        {t.default.about.cards.map((card, i) => (
          <div
            key={card.title}
            className={`rounded-3xl bg-gradient-to-b ${cardColors[i]} p-8 transition-transform hover:-translate-y-1 ring-1 ring-border/60`}
          >
            <span className={`text-3xl ${accentColors[i]}`}>
              {card.icon}
            </span>
            <h3 className="mt-3 text-lg font-semibold text-foreground">
              {card.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {card.description}
            </p>
          </div>
        ))}
      </div>

      <p className="mx-auto mt-14 max-w-3xl text-center leading-relaxed text-muted">
        {t.default.about.paragraph}
      </p>
    </section>
  );
}

const cardColors = [
  "from-accent/15 to-accent-2/10",
  "from-accent-2/15 to-accent/10",
  "from-accent/15 to-accent-2/15",
];

const accentColors = [
  "text-accent",
  "text-accent-2",
  "text-accent",
];
