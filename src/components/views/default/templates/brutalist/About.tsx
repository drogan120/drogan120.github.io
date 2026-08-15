import { useI18n } from "@/i18n";

export default function BrutalistAbout() {
  const { t } = useI18n();

  return (
    <section id="about" className="border-b-4 border-foreground">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid md:grid-cols-3">
          <div className="border-2 border-foreground p-6 md:border-r-0">
            <h2 className="text-3xl font-black uppercase tracking-tight">
              {t.default.about.title}
            </h2>
            <p className="mt-2 font-mono text-xs font-bold text-accent">
              [{t.default.about.label}]
            </p>
          </div>

          <div className="border-2 border-foreground p-6 md:col-span-2 md:border-r-0">
            {t.default.about.cards.map((card, i) => (
              <div
                key={card.title}
                className="flex gap-6 border-b-2 border-foreground py-4 last:border-b-0"
              >
                <span className="w-10 shrink-0 font-mono text-lg font-black text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-mono text-sm font-bold uppercase">
                    {card.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted">{card.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-10 max-w-3xl border-l-4 border-accent pl-6 font-mono text-sm leading-loose text-muted">
          {t.default.about.paragraph}
        </p>
      </div>
    </section>
  );
}
