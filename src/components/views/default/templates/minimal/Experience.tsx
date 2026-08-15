import { useI18n } from "@/i18n";

export default function MinimalExperience() {
  const { t } = useI18n();

  return (
    <section id="experience" className="mx-auto max-w-5xl px-6 py-24">
      <p className="font-mono text-sm text-accent">{t.default.experience.label}</p>
      <h2 className="mt-3 text-3xl font-bold">{t.default.experience.title}</h2>

      <div className="mt-12 space-y-0">
        {t.default.experience.items.map((item) => (
          <div key={item.title} className="flex gap-6 border-l border-border pl-6 pb-10 last:pb-0">
            <div className="min-w-0">
              <p className="font-mono text-xs text-muted">{item.period}</p>
              <h3 className="mt-1 text-lg font-semibold">{item.title}</h3>
              <p className="font-mono text-sm text-accent">{item.company}</p>
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
