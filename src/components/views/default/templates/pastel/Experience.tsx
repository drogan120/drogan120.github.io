import { useI18n } from "@/i18n";

export default function PastelExperience() {
  const { t } = useI18n();

  return (
    <section id="experience" className="mx-auto max-w-5xl px-6 py-24">
      <div className="text-center">
        <p className="font-mono text-sm text-accent">
          {t.default.experience.label}
        </p>
        <h2 className="mt-3 text-3xl font-bold text-foreground">
          {t.default.experience.title}
        </h2>
      </div>

      <div className="mt-14 space-y-5">
        {t.default.experience.items.map((item, i) => (
          <div
            key={item.title}
            className={`rounded-3xl bg-gradient-to-b ${cardColors[i % cardColors.length]} p-7 ring-1 ring-border/60 transition-transform hover:-translate-y-1`}
          >
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-card/80 px-3 py-1 font-mono text-xs font-bold text-accent">
                {item.period}
              </span>
              <span className="text-sm text-muted">{item.company}</span>
            </div>
            <h3 className="mt-3 text-lg font-semibold text-foreground">
              {item.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

const cardColors = [
  "from-accent/15 to-accent-2/10",
  "from-accent-2/15 to-accent/10",
  "from-accent/15 to-accent-2/15",
];
