import { useI18n } from "@/i18n";

export default function FashionAchievements() {
  const { t } = useI18n();

  return (
    <section id="achievements" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-8 py-24">
        <p className="text-center text-xs uppercase tracking-[0.4em] text-accent">
          {t.default.achievements.label}
        </p>
        <h2 className="mt-6 text-center font-serif text-5xl font-light">
          {t.default.achievements.title}
        </h2>

        <div className="mt-16 grid gap-px border border-border bg-border md:grid-cols-3">
          {t.default.achievements.items.map((item) => (
            <div key={item.title} className="bg-background p-10 text-center">
              <span className="text-4xl">{item.icon}</span>
              <h3 className="mt-6 text-sm uppercase tracking-[0.25em]">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {item.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
