import { useI18n } from "@/i18n";

const headerColors = [
  "from-accent/25 to-accent-2/20",
  "from-accent-2/25 to-accent/20",
  "from-accent/20 to-accent-2/25",
];

export default function PastelProjects() {
  const { t } = useI18n();

  return (
    <section id="projects" className="mx-auto max-w-5xl px-6 py-16 md:py-24">
      <div className="text-center">
        <p className="font-mono text-sm text-accent">
          {t.default.projects.label}
        </p>
        <h2 className="mt-3 text-3xl font-bold text-foreground">
          {t.default.projects.title}
        </h2>
      </div>

      <div className="mt-14 grid gap-5 md:grid-cols-3">
        {t.default.projects.items.map((project, i) => (
          <div
            key={project.title}
            className="group flex flex-col overflow-hidden rounded-3xl bg-card/60 ring-1 ring-border/60 backdrop-blur transition-all hover:-translate-y-1 hover:shadow-lg"
          >
            <div
              className={`flex h-32 items-center justify-center bg-gradient-to-br ${headerColors[i]} text-5xl`}
            >
              {project.icon}
            </div>
            <div className="flex flex-1 flex-col p-6">
              <h3 className="text-lg font-semibold text-foreground">
                {project.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                {project.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-4 flex gap-4 border-t border-border/60 pt-3">
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-bold text-accent transition-colors hover:text-accent-2"
                >
                  repo ↗
                </a>
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-muted transition-colors hover:text-accent"
                  >
                    demo ↗
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
