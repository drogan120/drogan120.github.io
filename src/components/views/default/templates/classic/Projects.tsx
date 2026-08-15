import { useI18n } from "@/i18n";

export default function ClassicProjects() {
  const { t } = useI18n();

  return (
    <section id="projects">
      <div className="mx-auto max-w-5xl px-6 py-16 md:py-24">
        <p className="text-center font-mono text-sm text-accent">
          {t.default.projects.label}
        </p>
        <h2 className="mt-2 text-center text-3xl font-bold">
          {t.default.projects.title}
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {t.default.projects.items.map((project) => (
            <div
              key={project.title}
              className="flex flex-col overflow-hidden rounded-2xl border border-border bg-background transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-accent/5"
            >
              <div className="flex h-28 items-center justify-center bg-gradient-to-br from-accent/15 to-accent-2/15 text-4xl sm:h-32">
                {project.icon}
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="break-words text-lg font-semibold">
                  {project.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                  {project.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md bg-card px-2.5 py-1 text-xs font-medium text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-4 flex gap-4 border-t border-border pt-3">
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs font-bold text-accent transition-colors hover:text-accent-2"
                  >
                    repo ↗
                  </a>
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-xs font-bold text-muted transition-colors hover:text-accent"
                    >
                      demo ↗
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
