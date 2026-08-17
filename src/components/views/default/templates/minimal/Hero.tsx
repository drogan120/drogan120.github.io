import { useI18n } from "@/i18n";
import TypeWriter from "@/components/shared/TypeWriter";
import DownloadResume from "@/components/shared/DownloadResume";

export default function MinimalHero() {
  const { t } = useI18n();

  return (
    <section id="top" className="mx-auto max-w-5xl px-6 pt-24 pb-20">
      <p className="animate-float font-mono text-sm text-accent">
        {t.default.hero.badge}
      </p>

      <h1 className="mt-6 text-5xl font-bold leading-[1.1] tracking-tight sm:text-7xl">
        {t.default.hero.hello}{" "}
        <span className="text-muted">{t.default.hero.name}</span>
        <br />
        <TypeWriter
          words={[t.default.hero.role1, t.default.hero.role2]}
          className="bg-gradient-to-r from-accent to-accent-2 bg-clip-text text-transparent"
        />
      </h1>

      <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted">
        {t.default.hero.tagline}
      </p>

      <div className="mt-10 flex flex-wrap items-center gap-6">
        <a
          href="#projects"
          className="group inline-flex items-center gap-2 font-mono text-sm font-semibold text-accent transition-colors"
        >
          <span className="underline decoration-accent/40 underline-offset-8 group-hover:decoration-accent">
            {t.default.hero.viewProjects}
          </span>
          <span className="transition-transform group-hover:translate-x-1">
            →
          </span>
        </a>

        <DownloadResume />

        <span className="flex items-center gap-2 font-mono text-xs text-muted">
          <span className="h-2 w-2 animate-pulse rounded-full bg-accent" />
          {t.default.hero.available}
        </span>
      </div>
    </section>
  );
}
