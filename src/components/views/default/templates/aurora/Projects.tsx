"use client";

import { useI18n } from "@/i18n";
import { Section, SectionHeading } from "./Chrome";

export default function AuroraProjects() {
  const { t } = useI18n();

  return (
    <Section id="projects">
      <SectionHeading
        index="09"
        eyebrow={t.default.projects.label.replace("// ", "")}
        title={t.default.projects.title}
      />

      <div className="mt-12 space-y-4">
        {t.default.projects.items.map((project, i) => (
          <article
            key={project.title}
            className="group relative overflow-hidden rounded-3xl border border-border bg-card/60 p-6 backdrop-blur-xl transition-[border-color,transform] duration-500 hover:-translate-y-1 hover:border-accent/50 sm:p-8"
          >
            {/* Oversized index that slides in on hover — the interaction cue
                that these rows are individual pieces of work, not a table. */}
            <span
              aria-hidden
              className="pointer-events-none absolute -top-2 right-4 font-mono text-7xl font-bold text-accent/[0.07] transition-transform duration-500 select-none group-hover:-translate-y-1 sm:text-8xl"
            >
              {String(i + 1).padStart(2, "0")}
            </span>

            <div className="relative flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="min-w-0 lg:max-w-2xl">
                <h3 className="text-xl font-semibold break-words transition-colors group-hover:text-accent sm:text-2xl">
                  {project.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {project.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-border bg-background/50 px-3 py-1 font-mono text-[11px] text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex shrink-0 flex-wrap gap-2">
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 font-mono text-xs font-semibold text-background transition-transform hover:scale-105"
                >
                  repo ↗
                </a>
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 font-mono text-xs font-semibold text-muted transition-colors hover:border-accent hover:text-accent"
                  >
                    demo ↗
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
