import { useI18n } from "@/i18n";

export default function ClassicSkills() {
  const { t } = useI18n();

  return (
    <section id="skills" className="mx-auto max-w-5xl px-6 py-24">
      <p className="text-center font-mono text-sm text-accent">
        {t.default.skills.label}
      </p>
      <h2 className="mt-2 text-center text-3xl font-bold">
        {t.default.skills.title}
      </h2>

      <div className="mt-12 grid gap-8 md:grid-cols-2">
        {t.default.skills.groups.map((group) => (
          <div
            key={group.title}
            className="rounded-2xl border border-border bg-card p-6"
          >
            <h3 className="text-sm font-semibold uppercase tracking-widest text-accent">
              {group.icon} {group.title}
            </h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-lg bg-background px-3.5 py-1.5 text-sm font-medium transition-colors hover:text-accent"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
