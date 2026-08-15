import { useI18n } from "@/i18n";

export default function PastelAchievements() {
  const { t } = useI18n();

  return (
    <section id="achievements" className="mx-auto max-w-5xl px-6 py-24">
      <div className="text-center">
        <p className="font-mono text-sm text-accent">
          {t.default.achievements.label}
        </p>
        <h2 className="mt-3 text-3xl font-bold text-foreground">
          {t.default.achievements.title}
        </h2>
      </div>

      <div className="mt-14 grid gap-5 md:grid-cols-3">
        {t.default.achievements.items.map((item, i) => (
          <div
            key={item.title}
            className={`rounded-3xl bg-gradient-to-b ${cardColors[i % cardColors.length]} p-8 text-center ring-1 ring-border/60 transition-transform hover:-translate-y-1`}
          >
            <span className="text-4xl">{item.icon}</span>
            <h3 className="mt-4 text-lg font-semibold text-foreground">
              {item.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {item.detail}
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
