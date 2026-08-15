import { useI18n } from "@/i18n";

export default function GlassSkills() {
  const { t } = useI18n();

  return (
    <section id="skills" className="relative">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 mx-auto h-64 w-64 rounded-full bg-accent/20 blur-[120px]" />

      <div className="relative mx-auto max-w-5xl px-6 py-16 md:py-24">
        <div className="text-center">
          <p className="font-mono text-sm text-accent">{t.default.skills.label}</p>
          <h2 className="mt-3 text-3xl font-bold">{t.default.skills.title}</h2>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {t.default.skills.groups.map((group) => (
            <div
              key={group.title}
              className="rounded-3xl border border-white/15 bg-white/10 p-7 backdrop-blur-xl"
            >
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted">
                {group.icon} {group.title}
              </h3>
              <div className="mt-4 flex flex-wrap gap-2.5">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm backdrop-blur-md transition-colors hover:border-accent/50 hover:text-accent"
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
