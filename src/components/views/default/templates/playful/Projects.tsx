import { useI18n } from "@/i18n";

const gradients = [
  "from-accent/30 to-accent-2/30",
  "from-accent-2/30 to-accent/30",
  "from-accent/30 to-transparent",
];

export default function PlayfulProjects() {
  const { t } = useI18n();

  return (
    <section id="projects" className="mx-auto max-w-5xl px-6 py-24">
      <div className="text-center">
        <p className="font-mono text-sm text-accent">
          {t.default.projects.label}
        </p>
        <h2 className="mt-2 text-4xl font-extrabold tracking-tight">
          {t.default.projects.title}
        </h2>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {t.default.projects.items.map((project, i) => (
          <a
            key={project.title}
            href="#projects"
            className="group relative overflow-hidden rounded-3xl border border-border bg-card p-6 transition-all hover:-translate-y-2 hover:shadow-2xl hover:shadow-accent/10"
          >
            <div
              className={`pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br ${gradients[i]} blur-2xl transition-opacity opacity-40 group-hover:opacity-80`}
            />
            <span className="relative text-3xl">{project.icon}</span>
            <h3 className="relative mt-4 text-lg font-bold transition-colors group-hover:text-accent">
              {project.title}
            </h3>
            <p className="relative mt-2 text-sm leading-relaxed text-muted">
              {project.description}
            </p>
            <div className="relative mt-4 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border px-3 py-1 text-xs font-medium text-muted"
                >
                  {tag}
                </span>
              ))}
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
