import { useI18n } from "@/i18n";

export default function PlayfulHobbies() {
  const { t } = useI18n();

  return (
    <section id="hobbies" className="mx-auto max-w-5xl px-6 py-24">
      <div className="text-center">
        <p className="font-mono text-sm text-accent">{t.default.hobbies.label}</p>
        <h2 className="mt-2 text-4xl font-extrabold tracking-tight">
          {t.default.hobbies.title}
        </h2>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {t.default.hobbies.items.map((hobby) => (
          <div
            key={hobby.name}
            className="rounded-3xl border border-border bg-background p-6 text-center transition-all hover:scale-105 hover:border-accent/50"
          >
            <span className="text-4xl">{hobby.icon}</span>
            <h3 className="mt-3 font-bold">{hobby.name}</h3>
            <p className="mt-1 text-sm text-muted">{hobby.detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
