import { useI18n } from "@/i18n";

export default function FashionProjects() {
  const { t } = useI18n();

  return (
    <section id="projects" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-8 py-24">
        <p className="text-center text-xs uppercase tracking-[0.4em] text-accent">
          {t.default.projects.label}
        </p>
        <h2 className="mt-6 text-center font-serif text-5xl font-light">
          {t.default.projects.title}
        </h2>

        <div className="mt-16 space-y-12">
          {t.default.projects.items.map((project, i) => (
            <div
              key={project.title}
              className="group grid items-end gap-8 border-b border-border pb-12 md:grid-cols-[auto_1fr]"
            >
              <span className="font-serif text-6xl font-light text-accent/50 md:text-8xl">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="font-serif text-3xl font-light transition-colors group-hover:text-accent">
                  {project.title}
                </h3>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
                  {project.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs uppercase tracking-[0.2em] text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
