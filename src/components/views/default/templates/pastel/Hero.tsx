import { useI18n } from "@/i18n";

const blobs = [
  { className: "bg-pink-200/50 dark:bg-pink-500/15", top: "0%", left: "10%" },
  { className: "bg-purple-200/50 dark:bg-purple-500/15", top: "45%", left: "70%" },
  { className: "bg-purple-200/50 dark:bg-pink-500/10", top: "10%", left: "60%" },
];

export default function PastelHero() {
  const { t } = useI18n();

  return (
    <section id="top" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        {blobs.map((b, i) => (
          <div
            key={i}
            className={`absolute h-72 w-72 rounded-full blur-3xl ${b.className}`}
            style={{ top: b.top, left: b.left }}
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-5xl px-6 py-24 text-center sm:py-32">
        <span className="inline-block rounded-full bg-white/70 px-5 py-2 text-sm font-medium text-slate-500 shadow-sm backdrop-blur dark:bg-purple-400/15 dark:text-purple-100 dark:ring-1 dark:ring-purple-300/20">
          👋 {t.default.hero.badge}
        </span>

        <h1 className="mt-8 text-5xl font-bold tracking-tight text-slate-800 sm:text-6xl dark:text-purple-50">
          {t.default.hero.hello}{" "}
          <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-pink-300 bg-clip-text text-transparent">
            Drogan
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-500 dark:text-purple-100/60">
          {t.default.hero.tagline}
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#projects"
            className="rounded-full bg-gradient-to-r from-pink-400 to-purple-400 px-8 py-3.5 font-medium text-white shadow-lg shadow-pink-200/50 transition-transform hover:scale-105 dark:shadow-pink-500/20"
          >
            {t.default.hero.viewProjects}
          </a>
          <a
            href="#contact"
            className="rounded-full bg-white px-8 py-3.5 font-medium text-slate-600 shadow-sm ring-1 ring-slate-200 transition-transform hover:scale-105 dark:bg-purple-400/20 dark:text-purple-100 dark:ring-purple-300/20"
          >
            {t.default.hero.contactMe}
          </a>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-center gap-4">
          <span className="flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-sm font-medium text-slate-500 shadow-sm backdrop-blur dark:bg-pink-400/15 dark:text-pink-100 dark:ring-1 dark:ring-pink-300/20">
            <span className="h-2 w-2 animate-pulse rounded-full bg-pink-400" />
            {t.default.hero.available}
          </span>
          <span className="rounded-full bg-white/70 px-4 py-2 text-sm font-medium text-slate-500 shadow-sm backdrop-blur dark:bg-purple-400/15 dark:text-purple-100 dark:ring-1 dark:ring-purple-300/20">
            {t.default.hero.role1}
          </span>
          <span className="rounded-full bg-white/70 px-4 py-2 text-sm font-medium text-slate-500 shadow-sm backdrop-blur dark:bg-pink-400/15 dark:text-pink-100 dark:ring-1 dark:ring-pink-300/20">
            {t.default.hero.role2}
          </span>
        </div>
      </div>
    </section>
  );
}
