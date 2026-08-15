import { useI18n } from "@/i18n";

const pillColors = [
  "bg-accent/15 text-accent ring-1 ring-accent/20",
  "bg-accent-2/15 text-accent-2 ring-1 ring-accent-2/20",
  "bg-accent/10 text-accent ring-1 ring-accent/20",
  "bg-accent-2/10 text-accent-2 ring-1 ring-accent-2/20",
];

export default function PastelSkills() {
  const { t } = useI18n();

  return (
    <section id="skills" className="mx-auto max-w-5xl px-6 py-16 md:py-24">
      <div className="text-center">
        <p className="font-mono text-sm text-accent">
          {t.default.skills.label}
        </p>
        <h2 className="mt-3 text-3xl font-bold text-foreground">
          {t.default.skills.title}
        </h2>
      </div>

      <div className="mt-14 grid gap-5 md:grid-cols-2">
        {t.default.skills.groups.map((group, gi) => (
          <div
            key={group.title}
            className="rounded-3xl border border-border/60 bg-card/60 p-7 backdrop-blur"
          >
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted">
              {group.icon} {group.title}
            </h3>
            <div className="mt-4 flex flex-wrap gap-2.5">
              {group.skills.map((skill, si) => (
                <span
                  key={skill}
                  className={`rounded-full px-4 py-1.5 text-sm font-medium ${pillColors[(gi + si) % pillColors.length]}`}
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
