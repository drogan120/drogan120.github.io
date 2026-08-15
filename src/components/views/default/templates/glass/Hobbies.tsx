import { useI18n } from "@/i18n";

export default function GlassHobbies() {
  const { t } = useI18n();

  return (
    <section id="hobbies" className="relative">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 mx-auto h-64 w-64 rounded-full bg-accent/15 blur-[120px]" />

      <div className="relative mx-auto max-w-5xl px-6 py-16 md:py-24">
        <div className="text-center">
          <p className="font-mono text-sm text-accent">
            {t.default.hobbies.label}
          </p>
          <h2 className="mt-3 text-3xl font-bold">
            {t.default.hobbies.title}
          </h2>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {t.default.hobbies.items.map((hobby) => (
            <div
              key={hobby.name}
              className="rounded-3xl border border-white/15 bg-white/10 p-7 text-center backdrop-blur-xl transition-all hover:border-accent/40 hover:bg-white/15"
            >
              <span className="section-icon text-4xl">{hobby.icon}</span>
              <h3 className="mt-3 font-semibold">{hobby.name}</h3>
              <p className="mt-1 text-sm text-muted">{hobby.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
