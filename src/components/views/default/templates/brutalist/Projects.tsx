import { useI18n } from "@/i18n";

export default function BrutalistProjects() {
  const { t } = useI18n();

  return (
    <section id="projects" className="border-b-4 border-foreground">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="text-3xl font-black uppercase tracking-tight">
          {t.default.projects.title}
        </h2>
        <p className="mt-2 font-mono text-xs font-bold text-accent">
          [{t.default.projects.label}]
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {t.default.projects.items.map((project, i) => (
            <a
              key={project.title}
              href="#projects"
              className="group flex flex-col border-2 border-foreground transition-all hover:-translate-y-1 hover:shadow-[6px_6px_0_0_var(--accent)]"
            >
              <div className="flex h-24 items-center justify-between border-b-2 border-foreground bg-accent px-4">
                <span className="font-mono text-2xl font-black text-background">
                  {project.icon}
                </span>
                <span className="font-mono text-sm font-black text-background">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="font-mono text-base font-black uppercase transition-colors group-hover:text-accent">
                  {project.title}
                </h3>
                <p className="mt-2 flex-1 text-sm text-muted">
                  {project.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="border border-foreground px-2 py-0.5 font-mono text-xs font-bold uppercase"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
