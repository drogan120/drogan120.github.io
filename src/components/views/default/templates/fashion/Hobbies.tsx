import { useI18n } from "@/i18n";

export default function FashionHobbies() {
  const { t } = useI18n();

  return (
    <section id="hobbies" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-8 py-24">
        <p className="text-center text-xs uppercase tracking-[0.4em] text-accent">
          {t.default.hobbies.label}
        </p>
        <h2 className="mt-6 text-center font-serif text-5xl font-light">
          {t.default.hobbies.title}
        </h2>

        <div className="mt-16 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {t.default.hobbies.items.map((hobby) => (
            <div key={hobby.name} className="bg-background p-10 text-center">
              <span className="text-4xl">{hobby.icon}</span>
              <h3 className="mt-5 font-serif text-lg">{hobby.name}</h3>
              <p className="mt-2 text-sm text-muted">{hobby.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
