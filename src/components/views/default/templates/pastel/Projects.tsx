import { useI18n } from "@/i18n";

const headerColors = [
  "from-pink-200/60 to-purple-200/60 dark:from-pink-400/25 dark:to-purple-400/20",
  "from-purple-200/60 to-pink-200/60 dark:from-purple-400/25 dark:to-pink-400/20",
  "from-pink-200/60 to-purple-200/60 dark:from-pink-400/20 dark:to-purple-400/25",
];

export default function PastelProjects() {
  const { t } = useI18n();

  return (
    <section id="projects" className="mx-auto max-w-5xl px-6 py-24">
      <div className="text-center">
        <p className="font-mono text-sm text-purple-400 dark:text-purple-300">
          {t.default.projects.label}
        </p>
        <h2 className="mt-3 text-3xl font-bold text-slate-800 dark:text-purple-50">
          {t.default.projects.title}
        </h2>
      </div>

      <div className="mt-14 grid gap-5 md:grid-cols-3">
        {t.default.projects.items.map((project, i) => (
          <div
            key={project.title}
            className="group flex flex-col overflow-hidden rounded-3xl bg-white/60 ring-1 ring-slate-100 backdrop-blur transition-all hover:-translate-y-1 hover:shadow-lg dark:bg-gradient-to-b dark:from-purple-400/15 dark:to-pink-400/5 dark:ring-white/10"
          >
            <div
              className={`flex h-32 items-center justify-center bg-gradient-to-br ${headerColors[i]} text-5xl`}
            >
              {project.icon}
            </div>
            <div className="flex flex-1 flex-col p-6">
              <h3 className="text-lg font-semibold text-slate-700 dark:text-purple-50">
                {project.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-500 dark:text-purple-100/60">
                {project.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-500 dark:bg-white/10 dark:text-purple-100/70"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
