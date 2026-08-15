import { useI18n } from "@/i18n";

export default function MinimalProjects() {
  const { t } = useI18n();

  return (
    <section id="projects">
      <div className="mx-auto max-w-5xl px-6 py-24">
        <p className="font-mono text-sm text-accent">
          {t.default.projects.label}
        </p>
        <h2 className="mt-3 text-3xl font-bold">{t.default.projects.title}</h2>

        <div className="mt-12 divide-y divide-border border-y border-border">
          {t.default.projects.items.map((project, i) => (
            <a
              key={project.title}
              href="#projects"
              className="group grid gap-4 py-8 transition-colors md:grid-cols-[1fr_2fr_1fr] md:items-baseline"
            >
              <span className="font-mono text-xs text-muted">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-xl font-semibold transition-colors group-hover:text-accent">
                  {project.title}
                </h3>
                <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted">
                  {project.description}
                </p>
              </div>
              <div className="flex flex-wrap gap-2 md:justify-end">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-xs text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
