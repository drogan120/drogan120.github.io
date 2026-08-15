import { useI18n } from "@/i18n";

export default function MinimalSkills() {
  const { t } = useI18n();

  return (
    <section id="skills" className="mx-auto max-w-5xl px-6 py-24">
      <p className="font-mono text-sm text-accent">{t.default.skills.label}</p>
      <h2 className="mt-3 text-3xl font-bold">{t.default.skills.title}</h2>

      <div className="mt-12 grid gap-x-12 gap-y-10 md:grid-cols-2">
        {t.default.skills.groups.map((group) => (
          <div key={group.title} className="border-l border-border pl-6">
            <h3 className="font-mono text-sm text-muted">
              {group.icon} {group.title}
            </h3>
            <p className="mt-3 leading-relaxed text-foreground">
              {group.skills.join(" · ")}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
