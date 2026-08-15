import { useI18n } from "@/i18n";

export default function GlassExperience() {
  const { t } = useI18n();

  return (
    <section id="experience" className="relative">
      <div className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-64 w-64 rounded-full bg-accent/15 blur-[120px]" />

      <div className="relative mx-auto max-w-5xl px-6 py-16 md:py-24">
        <div className="text-center">
          <p className="font-mono text-sm text-accent">
            {t.default.experience.label}
          </p>
          <h2 className="mt-3 text-3xl font-bold">
            {t.default.experience.title}
          </h2>
        </div>

        <div className="mt-14 space-y-5">
          {t.default.experience.items.map((item) => (
            <div
              key={item.title}
              className="rounded-3xl border border-white/15 bg-white/10 p-7 backdrop-blur-xl transition-all hover:border-accent/40 hover:bg-white/15"
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 font-mono text-xs text-accent">
                  {item.period}
                </span>
                <span className="text-sm text-muted">{item.company}</span>
              </div>
              <h3 className="mt-3 text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
