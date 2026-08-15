import { useI18n } from "@/i18n";
import PhoneMockup from "@/components/shared/PhoneMockup";

export default function GlassGallery() {
  const { t } = useI18n();

  return (
    <section id="gallery" className="relative">
      <div className="pointer-events-none absolute inset-x-0 top-1/2 mx-auto h-72 w-72 -translate-y-1/2 rounded-full bg-accent/15 blur-[140px]" />

      <div className="relative mx-auto max-w-5xl px-6 py-16 md:py-24">
        <div className="text-center">
          <p className="font-mono text-sm text-accent">
            {t.default.gallery.label}
          </p>
          <h2 className="mt-3 text-3xl font-bold">{t.default.gallery.title}</h2>
          <p className="mx-auto mt-3 max-w-xl text-muted">
            {t.default.gallery.description}
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-4">
          {t.default.gallery.items.map((item) => (
            <div
              key={item.title}
              className="flex flex-col items-center gap-3 rounded-3xl border border-white/15 bg-white/10 p-5 backdrop-blur-xl transition-all hover:border-accent/40 hover:bg-white/15"
            >
              <PhoneMockup item={item} />
              <p className="text-center text-sm font-bold">{item.title}</p>
              <p className="text-center font-mono text-xs text-muted">
                {item.tag}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}