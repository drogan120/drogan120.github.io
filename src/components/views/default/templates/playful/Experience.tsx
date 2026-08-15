import { useI18n } from "@/i18n";

export default function PlayfulExperience() {
  const { t } = useI18n();

  return (
    <section id="experience" className="mx-auto max-w-5xl px-6 py-16 md:py-24">
      <div className="text-center">
        <p className="font-mono text-sm text-accent">{t.default.experience.label}</p>
        <h2 className="mt-2 text-4xl font-extrabold tracking-tight">
          {t.default.experience.title}
        </h2>
      </div>

      <div className="mt-14 space-y-6">
        {t.default.experience.items.map((item) => (
          <div
            key={item.title}
            className="rounded-3xl border border-border bg-card p-7 transition-all hover:-translate-y-1 hover:border-accent/50 hover:shadow-xl hover:shadow-accent/10"
          >
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-accent/10 px-3 py-1 font-mono text-xs font-bold text-accent">
                {item.period}
              </span>
              <span className="text-sm text-muted">{item.company}</span>
            </div>
            <h3 className="mt-3 text-lg font-bold">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
