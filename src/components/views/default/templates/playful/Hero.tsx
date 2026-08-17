import { useI18n } from "@/i18n";
import TypeWriter from "@/components/shared/TypeWriter";
import DownloadResume from "@/components/shared/DownloadResume";

export default function PlayfulHero() {
  const { t } = useI18n();

  return (
    <section id="top" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 left-1/4 h-72 w-72 animate-float-slow rounded-full bg-accent/20 blur-[100px]" />
        <div className="absolute -top-10 right-1/4 h-72 w-72 animate-float-slow rounded-full bg-accent-2/20 blur-[100px]" style={{ animationDelay: "4s" }} />
        <div className="absolute bottom-0 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-accent/10 blur-[120px]" />
      </div>

      <div className="relative mx-auto flex max-w-5xl flex-col items-center px-6 pt-28 pb-24 text-center">
        <span className="animate-float mb-6 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent">
          👋 {t.default.hero.badge}
        </span>

        <h1 className="text-5xl font-extrabold leading-tight tracking-tight sm:text-7xl">
          <span className="bg-gradient-to-r from-accent via-accent-2 to-accent bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
            {t.default.hero.hello} {t.default.hero.name}!
          </span>
        </h1>

        <TypeWriter
          words={[t.default.hero.role1, t.default.hero.role2]}
          className="mt-4 bg-gradient-to-r from-accent to-accent-2 bg-clip-text text-xl font-bold text-transparent sm:text-2xl"
        />

        <p className="mt-6 max-w-2xl text-lg text-muted">
          {t.default.hero.tagline}
        </p>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#projects"
            className="pop-on-click rounded-2xl bg-gradient-to-r from-accent to-accent-2 px-8 py-3.5 font-semibold text-background shadow-lg shadow-accent/30 transition-all hover:scale-105 hover:shadow-accent/50"
          >
            {t.default.hero.viewProjects} →
          </a>
          <a
            href="#contact"
            className="pop-on-click rounded-2xl border-2 border-border px-8 py-3.5 font-semibold text-foreground transition-all hover:border-accent hover:text-accent"
          >
            {t.default.hero.contactMe}
          </a>
          <DownloadResume />
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-center gap-6">
          <span className="flex items-center gap-2 rounded-full bg-card px-4 py-2 font-mono text-sm text-muted">
            <span className="h-2 w-2 animate-pulse rounded-full bg-accent" />
            {t.default.hero.available}
          </span>
          <span className="rounded-full bg-card px-4 py-2 font-mono text-sm text-muted">
            {t.default.hero.role1}
          </span>
          <span className="rounded-full bg-card px-4 py-2 font-mono text-sm text-muted">
            {t.default.hero.role2}
          </span>
        </div>
      </div>
    </section>
  );
}
