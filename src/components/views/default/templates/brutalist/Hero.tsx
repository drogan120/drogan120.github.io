import { useI18n } from "@/i18n";

export default function BrutalistHero() {
  const { t } = useI18n();

  return (
    <section id="top" className="border-b-4 border-foreground">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <div className="grid md:grid-cols-[1.2fr_1fr]">
          <div className="border-2 border-foreground p-8 shadow-[8px_8px_0_0_var(--foreground)] md:p-12">
            <p className="inline-block animate-bounce-soft border-2 border-accent bg-accent px-3 py-1 font-mono text-xs font-bold uppercase text-background">
              {t.default.hero.badge}
            </p>

            <h1 className="mt-6 text-5xl font-black uppercase leading-[0.95] tracking-tight sm:text-7xl">
              {t.default.hero.hello}
              <br />
              <span className="text-accent">Drogan</span>
            </h1>

            <p className="mt-4 font-mono text-lg font-bold uppercase">
              {t.default.hero.role1} / {t.default.hero.role2}
            </p>

            <p className="mt-6 max-w-md font-mono text-sm leading-relaxed text-muted">
              {t.default.hero.tagline}
            </p>
          </div>

          <div className="flex flex-col justify-between border-2 border-t-0 border-foreground md:border-l-0 md:border-t-2">
            <div className="flex h-full items-center justify-center bg-foreground p-8">
              <p className="text-center font-mono text-xs font-bold uppercase tracking-widest text-background">
                Available
                <br />
                for work
                <br />
                <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-accent" />
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href="#projects"
            className="pop-on-click border-2 border-foreground bg-accent px-6 py-3 font-mono text-sm font-bold uppercase text-background shadow-[4px_4px_0_0_var(--foreground)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
          >
            {t.default.hero.viewProjects}
          </a>
          <a
            href="#contact"
            className="pop-on-click border-2 border-foreground px-6 py-3 font-mono text-sm font-bold uppercase transition-colors hover:bg-foreground hover:text-background"
          >
            {t.default.hero.contactMe}
          </a>
        </div>
      </div>
    </section>
  );
}
