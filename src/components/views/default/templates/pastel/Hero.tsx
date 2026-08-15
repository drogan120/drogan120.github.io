import { useI18n } from "@/i18n";
import TypeWriter from "@/components/shared/TypeWriter";
import DownloadResume from "@/components/shared/DownloadResume";

const blobs = [
  { className: "bg-accent/20", top: "0%", left: "10%", delay: "0s" },
  { className: "bg-accent-2/20", top: "45%", left: "70%", delay: "3s" },
  { className: "bg-accent/15", top: "10%", left: "60%", delay: "6s" },
];

export default function PastelHero() {
  const { t } = useI18n();

  return (
    <section id="top" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        {blobs.map((b, i) => (
          <div
            key={i}
            className={`absolute h-72 w-72 animate-float-slow rounded-full blur-3xl ${b.className}`}
            style={{ top: b.top, left: b.left, animationDelay: b.delay }}
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-5xl px-6 py-24 text-center sm:py-32">
        <span className="inline-block animate-float rounded-full bg-card/80 px-5 py-2 text-sm font-medium text-muted shadow-sm backdrop-blur ring-1 ring-border/60">
          👋 {t.default.hero.badge}
        </span>

        <h1 className="mt-8 text-5xl font-bold tracking-tight text-foreground sm:text-6xl">
          {t.default.hero.hello}{" "}
          <span className="bg-gradient-to-r from-accent via-accent-2 to-accent bg-clip-text text-transparent">
            Drogan
          </span>
        </h1>

        <TypeWriter
          words={[t.default.hero.role1, t.default.hero.role2]}
          className="mt-4 inline-block bg-gradient-to-r from-accent to-accent-2 bg-clip-text text-xl font-semibold text-transparent sm:text-2xl"
        />

        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted">
          {t.default.hero.tagline}
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#projects"
            className="pop-on-click rounded-full bg-gradient-to-r from-accent to-accent-2 px-8 py-3.5 font-medium text-background shadow-lg transition-transform hover:scale-105"
          >
            {t.default.hero.viewProjects}
          </a>
          <a
            href="#contact"
            className="pop-on-click rounded-full bg-card px-8 py-3.5 font-medium text-foreground shadow-sm ring-1 ring-border transition-transform hover:scale-105"
          >
            {t.default.hero.contactMe}
          </a>
          <DownloadResume />
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-center gap-4">
          <span className="flex items-center gap-2 rounded-full bg-card/80 px-4 py-2 text-sm font-medium text-muted shadow-sm backdrop-blur ring-1 ring-border/60">
            <span className="h-2 w-2 animate-pulse rounded-full bg-accent" />
            {t.default.hero.available}
          </span>
          <span className="rounded-full bg-card/80 px-4 py-2 text-sm font-medium text-muted shadow-sm backdrop-blur ring-1 ring-border/60">
            {t.default.hero.role1}
          </span>
          <span className="rounded-full bg-card/80 px-4 py-2 text-sm font-medium text-muted shadow-sm backdrop-blur ring-1 ring-border/60">
            {t.default.hero.role2}
          </span>
        </div>
      </div>
    </section>
  );
}
