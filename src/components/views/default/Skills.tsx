import { useI18n } from "@/i18n";

export default function Skills() {
  const { t } = useI18n();

  return (
    <section id="skills" className="border-y border-border bg-card/40">
      <div className="mx-auto max-w-5xl px-6 py-24">
        <p className="font-mono text-sm text-accent">{t.default.skills.label}</p>
        <h2 className="mt-2 text-3xl font-bold">{t.default.skills.title}</h2>

        <div className="mt-10 grid gap-8 md:grid-cols-2">
          {t.default.skills.groups.map((group) => (
            <div key={group.title}>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted">
                {group.title}
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-border bg-background px-3.5 py-1.5 text-sm transition-colors hover:border-accent hover:text-accent"
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
