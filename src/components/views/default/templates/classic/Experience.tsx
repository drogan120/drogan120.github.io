import { useI18n } from "@/i18n";

export default function ClassicExperience() {
  const { t } = useI18n();

  return (
    <section id="experience" className="mx-auto max-w-5xl px-6 py-24">
      <p className="text-center font-mono text-sm text-accent">
        {t.default.experience.label}
      </p>
      <h2 className="mt-2 text-center text-3xl font-bold">
        {t.default.experience.title}
      </h2>

      <div className="mt-12 space-y-8">
        {t.default.experience.items.map((item) => (
          <div key={item.title} className="flex gap-6 rounded-2xl border border-border bg-card p-6">
            <div className="w-40 shrink-0 pt-0.5">
              <span className="font-mono text-sm font-bold text-accent">
                {item.period}
              </span>
            </div>
            <div className="border-l border-border pl-6">
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="mt-1 text-sm text-accent">{item.company}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
