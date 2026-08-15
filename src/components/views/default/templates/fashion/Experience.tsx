import { useI18n } from "@/i18n";

export default function FashionExperience() {
  const { t } = useI18n();

  return (
    <section id="experience" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-8 py-24">
        <p className="text-center text-xs uppercase tracking-[0.4em] text-accent">
          {t.default.experience.label}
        </p>
        <h2 className="mt-6 text-center font-serif text-5xl font-light">
          {t.default.experience.title}
        </h2>

        <div className="mt-16 space-y-0">
          {t.default.experience.items.map((item, i) => (
            <div
              key={item.title}
              className={`flex items-start gap-10 border-b border-border py-10 ${i === 0 ? "border-t" : ""}`}
            >
              <span className="w-40 shrink-0 pt-1 font-serif text-xl font-light text-accent/70">
                {item.period}
              </span>
              <div>
                <h3 className="text-sm uppercase tracking-[0.25em]">
                  {item.title}
                </h3>
                <p className="mt-1 font-serif text-lg text-accent">
                  {item.company}
                </p>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
