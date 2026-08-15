import { useI18n } from "@/i18n";

export default function BrutalistHobbies() {
  const { t } = useI18n();

  return (
    <section id="hobbies" className="border-b-4 border-foreground">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="text-3xl font-black uppercase tracking-tight">
          {t.default.hobbies.title}
        </h2>
        <p className="mt-2 font-mono text-xs font-bold text-accent">
          [{t.default.hobbies.label}]
        </p>

        <div className="mt-10 grid gap-0 sm:grid-cols-2 lg:grid-cols-4">
          {t.default.hobbies.items.map((hobby) => (
            <div
              key={hobby.name}
              className="border-2 border-foreground p-6 transition-colors hover:bg-accent hover:text-background"
            >
              <span className="text-3xl">{hobby.icon}</span>
              <h3 className="mt-4 font-mono text-sm font-black uppercase">
                {hobby.name}
              </h3>
              <p className="mt-2 text-sm">{hobby.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
