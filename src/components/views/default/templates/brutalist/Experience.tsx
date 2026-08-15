import { useI18n } from "@/i18n";

export default function BrutalistExperience() {
  const { t } = useI18n();

  return (
    <section id="experience" className="border-b-4 border-foreground">
      <div className="mx-auto max-w-6xl px-6 py-12 md:py-20">
        <h2 className="text-3xl font-black uppercase tracking-tight">
          {t.default.experience.title}
        </h2>
        <p className="mt-2 font-mono text-xs font-bold text-accent">
          [{t.default.experience.label}]
        </p>

        <div className="mt-10">
          {t.default.experience.items.map((item, i) => (
            <div
              key={item.title}
              className={`flex gap-8 border-2 border-foreground p-6 ${i !== 0 ? "border-t-0" : ""}`}
            >
              <span className="w-10 shrink-0 font-mono text-lg font-black text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="font-mono text-sm font-bold uppercase">
                  {item.title}
                </h3>
                <p className="mt-1 font-mono text-xs font-bold text-accent">
                  {item.period} · {item.company}
                </p>
                <p className="mt-2 text-sm text-muted">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
