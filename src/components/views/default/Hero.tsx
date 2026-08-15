import { useI18n } from "@/i18n";

export default function Hero() {
  const { t } = useI18n();

  return (
    <section id="top" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 flex justify-center">
        <div className="h-[500px] w-[800px] rounded-full bg-accent/10 blur-[120px]" />
      </div>

      <div className="relative mx-auto flex max-w-5xl flex-col items-center px-6 pt-24 pb-20 text-center">
        <span className="mb-6 rounded-full border border-border bg-card px-4 py-1.5 text-xs text-muted">
          👋 {t.default.hero.badge}
        </span>

        <h1 className="text-4xl font-bold leading-tight sm:text-6xl">
          {t.default.hero.hello}{" "}
          <span className="bg-gradient-to-r from-accent to-accent-2 bg-clip-text text-transparent">
            Drogan
          </span>
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-muted">
          {t.default.hero.tagline}
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#projects"
            className="rounded-full bg-accent px-6 py-3 font-medium text-background transition-transform hover:scale-105"
          >
            {t.default.hero.viewProjects}
          </a>
          <a
            href="#contact"
            className="rounded-full border border-border px-6 py-3 font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
          >
            {t.default.hero.contactMe}
          </a>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-center gap-x-10 gap-y-6 text-muted">
          <span className="flex items-center gap-2 font-mono text-sm">
            <span className="h-2 w-2 animate-pulse rounded-full bg-accent" />
            {t.default.hero.available}
          </span>
          <span className="hidden font-mono text-sm sm:block">
            {t.default.hero.role1}
          </span>
          <span className="hidden font-mono text-sm sm:block">
            {t.default.hero.role2}
          </span>
        </div>
      </div>
    </section>
  );
}
