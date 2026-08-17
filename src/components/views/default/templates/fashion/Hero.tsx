import { useI18n } from "@/i18n";
import TypeWriter from "@/components/shared/TypeWriter";
import DownloadResume from "@/components/shared/DownloadResume";

export default function FashionHero() {
  const { t } = useI18n();

  return (
    <section id="top" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:px-8 md:py-28">
        <div className="text-center">
          <p className="text-[10px] uppercase tracking-[0.3em] text-accent sm:text-xs sm:tracking-[0.4em]">
            {t.default.hero.badge}
          </p>

          <h1 className="mt-8 break-words font-serif text-5xl font-light leading-[1.05] sm:text-7xl md:text-8xl">
            {t.default.hero.hello}
          </h1>

          <p className="mt-4 font-serif text-2xl font-light italic tracking-wide text-accent sm:text-4xl">
            {t.default.hero.name}
          </p>
          <p className="mt-10 text-sm uppercase tracking-[0.3em] text-muted">
            <TypeWriter
              words={[t.default.hero.role1, t.default.hero.role2]}
              className="text-accent"
            />
          </p>

          <div className="mx-auto mt-10 h-px w-24 bg-foreground" />

          <p className="mx-auto mt-10 max-w-xl text-sm leading-loose text-muted">
            {t.default.hero.tagline}
          </p>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-10">
            <a
              href="#projects"
              className="group pop-on-click relative text-xs uppercase tracking-[0.3em] transition-colors hover:text-accent"
            >
              {t.default.hero.viewProjects}
              <span className="absolute -bottom-2 left-0 h-px w-full bg-accent opacity-0 transition-opacity group-hover:opacity-100" />
            </a>
            <a
              href="#contact"
              className="group pop-on-click relative text-xs uppercase tracking-[0.3em] transition-colors hover:text-accent"
            >
              {t.default.hero.contactMe}
              <span className="absolute -bottom-2 left-0 h-px w-full bg-accent opacity-0 transition-opacity group-hover:opacity-100" />
            </a>
            <DownloadResume />
          </div>

          <p className="mt-16 inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-muted">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
            {t.default.hero.available}
          </p>
        </div>
      </div>
    </section>
  );
}
