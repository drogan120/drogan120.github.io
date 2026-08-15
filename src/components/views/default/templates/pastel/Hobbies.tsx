import { useI18n } from "@/i18n";

export default function PastelHobbies() {
  const { t } = useI18n();

  return (
    <section id="hobbies" className="mx-auto max-w-5xl px-6 py-16 md:py-24">
      <div className="text-center">
        <p className="font-mono text-sm text-accent">
          {t.default.hobbies.label}
        </p>
        <h2 className="mt-3 text-3xl font-bold text-foreground">
          {t.default.hobbies.title}
        </h2>
      </div>

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {t.default.hobbies.items.map((hobby, i) => (
          <div
            key={hobby.name}
            className={`rounded-3xl bg-gradient-to-b ${cardColors[i % cardColors.length]} p-7 text-center ring-1 ring-border/60 transition-transform hover:-translate-y-1`}
          >
            <span className="section-icon text-4xl">{hobby.icon}</span>
            <h3 className="mt-3 font-semibold text-foreground">
              {hobby.name}
            </h3>
            <p className="mt-1 text-sm text-muted">{hobby.detail}</p>
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
  "from-accent-2/15 to-accent/15",
];
