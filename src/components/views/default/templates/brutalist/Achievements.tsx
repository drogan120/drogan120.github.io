import { useI18n } from "@/i18n";

export default function BrutalistAchievements() {
  const { t } = useI18n();

  return (
    <section id="achievements" className="border-b-4 border-foreground">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="text-3xl font-black uppercase tracking-tight">
          {t.default.achievements.title}
        </h2>
        <p className="mt-2 font-mono text-xs font-bold text-accent">
          [{t.default.achievements.label}]
        </p>

        <div className="mt-10 grid gap-0 md:grid-cols-3">
          {t.default.achievements.items.map((item) => (
            <div
              key={item.title}
              className="border-2 border-foreground p-6 transition-colors hover:bg-accent hover:text-background"
            >
              <span className="text-3xl">{item.icon}</span>
              <h3 className="mt-4 font-mono text-sm font-black uppercase">
                {item.title}
              </h3>
              <p className="mt-2 text-sm">{item.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
