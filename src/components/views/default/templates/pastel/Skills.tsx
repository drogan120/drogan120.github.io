import { useI18n } from "@/i18n";

const pillColors = [
  "bg-pink-100 text-pink-500",
  "bg-purple-100 text-purple-500",
  "bg-sky-100 text-sky-500",
  "bg-amber-100 text-amber-500",
];

export default function PastelSkills() {
  const { t } = useI18n();

  return (
    <section id="skills" className="mx-auto max-w-5xl px-6 py-20">
      <div className="text-center">
        <p className="font-mono text-sm text-purple-400">
          {t.default.skills.label}
        </p>
        <h2 className="mt-2 text-3xl font-bold text-slate-800">
          {t.default.skills.title}
        </h2>
      </div>

      <div className="mt-12 grid gap-8 md:grid-cols-2">
        {t.default.skills.groups.map((group, gi) => (
          <div
            key={group.title}
            className="rounded-3xl border border-slate-100 bg-white/70 p-6 shadow-sm backdrop-blur"
          >
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
              {group.title}
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
