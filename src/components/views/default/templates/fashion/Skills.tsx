import { useI18n } from "@/i18n";

export default function FashionSkills() {
  const { t } = useI18n();

  return (
    <section id="skills" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-8 py-16 md:py-24">
        <p className="text-center text-xs uppercase tracking-[0.4em] text-accent">
          {t.default.skills.label}
        </p>
        <h2 className="mt-6 text-center font-serif text-5xl font-light">
          {t.default.skills.title}
        </h2>

        <div className="mt-16 grid gap-px border border-border bg-border md:grid-cols-2 lg:grid-cols-4">
          {t.default.skills.groups.map((group) => (
            <div key={group.title} className="bg-background p-8">
              <h3 className="text-xs uppercase tracking-[0.25em] text-accent">
                {group.icon} {group.title}
              </h3>
              <ul className="mt-6 space-y-3">
                {group.skills.map((skill) => (
                  <li
                    key={skill}
                    className="text-sm text-muted transition-colors hover:text-foreground"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
