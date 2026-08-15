import { useI18n } from "@/i18n";

const pillColors = [
  "bg-pink-100/80 text-pink-500 dark:bg-pink-400/20 dark:text-pink-200 dark:ring-1 dark:ring-pink-300/20",
  "bg-purple-100/80 text-purple-500 dark:bg-purple-400/20 dark:text-purple-200 dark:ring-1 dark:ring-purple-300/20",
  "bg-pink-100/80 text-pink-500 dark:bg-pink-400/15 dark:text-pink-200 dark:ring-1 dark:ring-pink-300/20",
  "bg-purple-100/80 text-purple-500 dark:bg-purple-400/15 dark:text-purple-200 dark:ring-1 dark:ring-purple-300/20",
];

export default function PastelSkills() {
  const { t } = useI18n();

  return (
    <section id="skills" className="mx-auto max-w-5xl px-6 py-24">
      <div className="text-center">
        <p className="font-mono text-sm text-purple-400 dark:text-purple-300">
          {t.default.skills.label}
        </p>
        <h2 className="mt-3 text-3xl font-bold text-slate-800 dark:text-purple-50">
          {t.default.skills.title}
        </h2>
      </div>

      <div className="mt-14 grid gap-5 md:grid-cols-2">
        {t.default.skills.groups.map((group, gi) => (
          <div
            key={group.title}
            className="rounded-3xl border border-slate-100 bg-white/60 p-7 backdrop-blur dark:border-white/10 dark:bg-gradient-to-b dark:from-purple-400/15 dark:to-pink-400/10"
          >
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 dark:text-purple-100/50">
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
