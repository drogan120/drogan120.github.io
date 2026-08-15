import { useI18n } from "@/i18n";
import TypeWriter from "@/components/shared/TypeWriter";
import DownloadResume from "@/components/shared/DownloadResume";

export default function GlassHero() {
  const { t } = useI18n();

  return (
    <section id="top" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-20 left-1/4 h-80 w-80 animate-float-slow rounded-full bg-accent/30 blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 h-80 w-80 animate-float-slow rounded-full bg-accent-2/30 blur-[120px]" style={{ animationDelay: "3s" }} />
        <div className="absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/20 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-5xl px-6 py-28 text-center sm:py-36">
        <span className="inline-block animate-float rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm text-foreground/80 backdrop-blur-md">
          👋 {t.default.hero.badge}
        </span>

        <h1 className="mt-8 text-5xl font-bold tracking-tight sm:text-7xl">
          {t.default.hero.hello}{" "}
          <span className="bg-gradient-to-r from-accent to-accent-2 bg-clip-text text-transparent">
            Drogan
          </span>
        </h1>

        <TypeWriter
          words={[t.default.hero.role1, t.default.hero.role2]}
          className="mt-4 inline-block text-xl font-semibold text-accent sm:text-2xl"
        />

        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted">
          {t.default.hero.tagline}
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#projects"
            className="pop-on-click rounded-full border border-white/30 bg-white/15 px-8 py-3.5 font-medium backdrop-blur-md transition-all hover:bg-white/25"
          >
            {t.default.hero.viewProjects}
          </a>
          <a
            href="#contact"
            className="pop-on-click rounded-full border border-accent/40 bg-accent/10 px-8 py-3.5 font-medium text-accent backdrop-blur-md transition-all hover:bg-accent/20"
          >
            {t.default.hero.contactMe}
          </a>
          <DownloadResume />
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-center gap-4">
          <span className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-foreground/70 backdrop-blur-md">
            <span className="h-2 w-2 animate-pulse rounded-full bg-accent" />
            {t.default.hero.available}
          </span>
          <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-foreground/70 backdrop-blur-md">
            {t.default.hero.role1}
          </span>
          <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-foreground/70 backdrop-blur-md">
            {t.default.hero.role2}
          </span>
        </div>
      </div>
    </section>
  );
}
