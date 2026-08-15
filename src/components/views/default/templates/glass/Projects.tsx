import { useI18n } from "@/i18n";

export default function GlassProjects() {
  const { t } = useI18n();

  return (
    <section id="projects" className="relative">
      <div className="pointer-events-none absolute inset-x-0 top-1/2 mx-auto h-72 w-72 -translate-y-1/2 rounded-full bg-accent/15 blur-[140px]" />

      <div className="relative mx-auto max-w-5xl px-6 py-16 md:py-24">
        <div className="text-center">
          <p className="font-mono text-sm text-accent">
            {t.default.projects.label}
          </p>
          <h2 className="mt-3 text-3xl font-bold">{t.default.projects.title}</h2>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {t.default.projects.items.map((project) => (
            <div
              key={project.title}
              className="group flex flex-col rounded-3xl border border-white/15 bg-white/10 p-7 backdrop-blur-xl transition-all hover:-translate-y-1 hover:border-accent/40 hover:shadow-xl hover:shadow-accent/10"
            >
              <span className="section-icon text-3xl">{project.icon}</span>
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
                    className="rounded-full border border-white/15 px-3 py-1 text-xs text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
