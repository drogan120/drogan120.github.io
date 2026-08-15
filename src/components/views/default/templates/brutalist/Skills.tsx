import { useI18n } from "@/i18n";

export default function BrutalistSkills() {
  const { t } = useI18n();

  return (
    <section id="skills" className="border-b-4 border-foreground">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="text-3xl font-black uppercase tracking-tight">
          {t.default.skills.title}
        </h2>
        <p className="mt-2 font-mono text-xs font-bold text-accent">
          [{t.default.skills.label}]
        </p>

        <div className="mt-10 grid md:grid-cols-2">
          {t.default.skills.groups.map((group, gi) => (
            <div
              key={group.title}
              className={`p-6 ${gi % 2 === 0 ? "border-t-2 border-l-2 border-foreground" : "border-t-2 border-foreground md:border-r-2"} ${gi >= 2 ? "border-b-2" : ""}`}
            >
              <h3 className="font-mono text-sm font-black uppercase text-accent">
                {group.icon} {group.title}
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="border-2 border-foreground px-3 py-1 font-mono text-sm font-bold uppercase transition-colors hover:bg-accent hover:text-background"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
