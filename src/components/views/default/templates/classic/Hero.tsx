import { useI18n } from "@/i18n";
import TypeWriter from "@/components/shared/TypeWriter";

export default function ClassicHero() {
  const { t } = useI18n();

  return (
    <section id="top" className="mx-auto max-w-5xl px-6 pt-24 pb-20">
      <div className="flex flex-col items-center gap-10 text-center md:flex-row md:text-left">
        <div className="relative shrink-0">
          <div className="section-icon flex h-40 w-40 items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent-2 text-6xl">
            👨‍💻
          </div>
          <span className="absolute -bottom-1 -right-1 h-8 w-8 animate-bounce-soft rounded-full bg-accent ring-4 ring-background" />
        </div>

        <div>
          <p className="text-lg font-medium text-accent">
            {t.default.hero.badge}
          </p>
          <h1 className="mt-2 text-4xl font-bold sm:text-5xl">
            {t.default.hero.hello} Drogan
          </h1>
          <p className="mt-3 text-xl font-semibold text-foreground/90">
            <TypeWriter
              words={[t.default.hero.role1, t.default.hero.role2]}
              className="text-accent"
            />
          </p>
          <p className="mt-4 max-w-xl text-muted">{t.default.hero.tagline}</p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
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
          </div>
        </div>
      </div>
    </section>
  );
}
