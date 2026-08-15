import { useI18n } from "@/i18n";

const headerColors = [
  "from-pink-200 to-purple-200",
  "from-purple-200 to-sky-200",
  "from-sky-200 to-amber-200",
];

export default function PastelProjects() {
  const { t } = useI18n();

  return (
    <section id="projects" className="mx-auto max-w-5xl px-6 py-20">
      <div className="text-center">
        <p className="font-mono text-sm text-purple-400">
          {t.default.projects.label}
        </p>
        <h2 className="mt-2 text-3xl font-bold text-slate-800">
          {t.default.projects.title}
        </h2>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {t.default.projects.items.map((project, i) => (
          <div
            key={project.title}
            className="group flex flex-col overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-100 transition-all hover:-translate-y-1 hover:shadow-lg"
          >
            <div
              className={`flex h-32 items-center justify-center bg-gradient-to-br ${headerColors[i]} text-5xl transition-transform group-hover:scale-105`}
            >
              {project.icon}
            </div>
            <div className="flex flex-1 flex-col p-6">
              <h3 className="text-lg font-semibold text-slate-700">
                {project.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-500">
                {project.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-500"
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
