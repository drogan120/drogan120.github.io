"use client";

import { useI18n } from "@/i18n";
import { Section, SectionHeading } from "./Chrome";

export default function AnimeProjects() {
  const { t } = useI18n();

  return (
    <Section id="projects">
      <SectionHeading
        kanji="プロジェクト"
        eyebrow={t.default.projects.label.replace("// ", "")}
        title={t.default.projects.title}
      />

      <div className="mt-12 space-y-4">
        {t.default.projects.items.map((project, i) => (
          <article
            key={project.title}
            className="group relative overflow-hidden rounded-2xl border-2 border-border bg-card p-6 transition-colors duration-500 hover:border-accent/50 sm:p-8"
          >
            <span
              aria-hidden
              className="pointer-events-none absolute -top-2 right-4 font-mono text-7xl font-black text-accent/[0.08] transition-transform duration-500 select-none group-hover:-translate-y-1 sm:text-8xl"
            >
              {String(i + 1).padStart(2, "0")}
            </span>

            <div className="relative flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="min-w-0 lg:max-w-2xl">
                <h3 className="text-xl font-bold break-words transition-colors group-hover:text-accent sm:text-2xl">
                  {project.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {project.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-lg border border-border bg-background/60 px-3 py-1 font-mono text-[11px] text-muted"
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
                  className="inline-flex items-center gap-1.5 rounded-lg border-b-4 border-accent bg-accent px-4 py-2 font-mono text-xs font-bold text-background transition-transform hover:translate-y-0.5 hover:border-b-2"
                >
                  repo ↗
                </a>
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg border-2 border-border px-4 py-2 font-mono text-xs font-bold text-muted transition-colors hover:border-accent hover:text-accent"
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