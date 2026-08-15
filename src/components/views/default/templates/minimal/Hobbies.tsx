import { useI18n } from "@/i18n";

export default function MinimalHobbies() {
  const { t } = useI18n();

  return (
    <section id="hobbies" className="mx-auto max-w-5xl px-6 py-16 md:py-24">
      <p className="font-mono text-sm text-accent">{t.default.hobbies.label}</p>
      <h2 className="mt-3 text-3xl font-bold">{t.default.hobbies.title}</h2>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 md:grid-cols-4">
        {t.default.hobbies.items.map((hobby) => (
          <div
            key={hobby.name}
            className="border border-border bg-card p-6 transition-colors hover:border-accent/50"
          >
            <span className="section-icon text-3xl">{hobby.icon}</span>
            <h3 className="mt-3 font-semibold">{hobby.name}</h3>
            <p className="mt-1 text-sm text-muted">{hobby.detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
