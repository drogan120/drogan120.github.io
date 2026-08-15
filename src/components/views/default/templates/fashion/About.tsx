import { useI18n } from "@/i18n";

export default function FashionAbout() {
  const { t } = useI18n();

  return (
    <section id="about" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-8 py-24">
        <div className="grid gap-16 md:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-accent">
              {t.default.about.label}
            </p>
            <h2 className="mt-6 font-serif text-5xl font-light leading-tight">
              {t.default.about.title}
            </h2>
            <div className="mt-10 h-px w-full bg-border" />
            <p className="mt-8 max-w-md text-sm leading-loose text-muted">
              {t.default.about.paragraph}
            </p>
          </div>

          <div className="space-y-0">
            {t.default.about.cards.map((card, i) => (
              <div
                key={card.title}
                className="group flex items-start gap-8 border-b border-border py-8 transition-colors hover:bg-card/50 first:border-t"
              >
                <span className="font-serif text-3xl font-light text-accent/60">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-sm uppercase tracking-[0.25em]">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {card.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
