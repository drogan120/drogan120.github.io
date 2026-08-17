import { useI18n } from "@/i18n";
import TypeWriter from "@/components/shared/TypeWriter";
import DownloadResume from "@/components/shared/DownloadResume";

export default function ClassicHero() {
  const { t } = useI18n();

  return (
    <section id="top" className="mx-auto max-w-5xl px-6 pt-20 pb-16 sm:pt-24 sm:pb-20">
      <div className="flex flex-col items-center gap-8 text-center md:flex-row md:gap-10 md:text-left">
        <div className="relative shrink-0">
          <div className="flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent-2 text-5xl sm:h-40 sm:w-40 sm:text-6xl">
            👨‍💻
          </div>
          <span className="absolute -bottom-1 -right-1 h-7 w-7 animate-bounce-soft rounded-full bg-accent ring-4 ring-background sm:h-8 sm:w-8" />
        </div>

        <div className="min-w-0">
          <p className="text-base font-medium text-accent sm:text-lg">
            {t.default.hero.badge}
          </p>
          <h1 className="mt-2 text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
            {t.default.hero.hello} {t.default.hero.name}
          </h1>
          <p className="mt-3 text-lg font-semibold text-foreground/90 sm:text-xl">
            <TypeWriter
              words={[t.default.hero.role1, t.default.hero.role2]}
              className="text-accent"
            />
          </p>
          <p className="mt-4 max-w-xl text-muted">{t.default.hero.tagline}</p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4 md:justify-start">
            <a
              href="#projects"
              className="pop-on-click rounded-xl bg-foreground px-6 py-3 font-semibold text-background transition-transform hover:scale-105"
            >
              {t.default.hero.viewProjects}
            </a>
            <a
              href="#contact"
              className="pop-on-click rounded-xl border border-border px-6 py-3 font-semibold transition-colors hover:border-accent hover:text-accent"
            >
              {t.default.hero.contactMe}
            </a>
            <DownloadResume />
          </div>
        </div>
      </div>
    </section>
  );
}
