"use client";

import { useI18n } from "@/i18n";

export default function DownloadResume() {
  const { t } = useI18n();

  return (
    <>
      <button
        type="button"
        onClick={() => window.print()}
        className="pop-on-click rounded-lg border border-border px-4 py-2 font-mono text-sm text-muted transition-colors hover:border-accent hover:text-accent"
      >
        {t.default.resume.download} ↓
      </button>

      <div className="print-resume" aria-hidden="true">
        <h1 className="text-2xl font-bold">{t.default.resume.printHeading}</h1>
        <p className="mt-1 text-sm">{t.default.hero.tagline}</p>

        <h2 className="mt-6 text-lg font-semibold">
          {t.default.skills.title}
        </h2>
        <ul className="mt-2 list-disc pl-5">
          {t.default.skills.groups.map((group) => (
            <li key={group.title}>
              {group.title}: {group.skills.join(", ")}
            </li>
          ))}
        </ul>

        <h2 className="mt-6 text-lg font-semibold">
          {t.default.experience.title}
        </h2>
        <ul className="mt-2 list-disc pl-5">
          {t.default.experience.items.map((item) => (
            <li key={item.title}>
              <strong>{item.title}</strong> — {item.period}
              <p className="mt-0.5 text-sm">{item.description}</p>
            </li>
          ))}
        </ul>

        <h2 className="mt-6 text-lg font-semibold">
          {t.default.projects.title}
        </h2>
        <ul className="mt-2 list-disc pl-5">
          {t.default.projects.items.map((project) => (
            <li key={project.title}>
              <strong>{project.title}</strong> — {project.description}
            </li>
          ))}
        </ul>

        <p className="mt-8 text-xs text-muted">
          © {new Date().getFullYear()} Ali Mahmudin
        </p>
      </div>
    </>
  );
}