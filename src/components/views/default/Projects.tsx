import { useI18n } from "@/i18n";

export default function Projects() {
  const { t } = useI18n();

  return (
    <section id="projects" className="mx-auto max-w-5xl px-6 py-24">
      <p className="font-mono text-sm text-accent">{t.default.projects.label}</p>
      <h2 className="mt-2 text-3xl font-bold">{t.default.projects.title}</h2>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {t.default.projects.items.map((project) => (
          <a
            key={project.title}
            href="#projects"
            className="group flex flex-col rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-accent/50 hover:shadow-lg hover:shadow-accent/5"
          >
            <span className="text-3xl">{project.icon}</span>
            <h3 className="mt-4 text-lg font-semibold transition-colors group-hover:text-accent">
              {project.title}
            </h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
              {project.description}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border px-3 py-1 text-xs text-muted"
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
