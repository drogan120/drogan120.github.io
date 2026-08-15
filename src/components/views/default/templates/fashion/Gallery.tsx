import { useI18n } from "@/i18n";
import PhoneMockup from "@/components/shared/PhoneMockup";

export default function FashionGallery() {
  const { t } = useI18n();

  return (
    <section id="gallery" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-8 py-16 md:py-24">
        <p className="text-center text-xs uppercase tracking-[0.4em] text-accent">
          {t.default.gallery.label}
        </p>
        <h2 className="mt-6 text-center font-serif text-5xl font-light">
          {t.default.gallery.title}
        </h2>

        <div className="mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-3 lg:grid-cols-4">
          {t.default.gallery.items.map((item) => (
            <div
              key={item.title}
              className="flex flex-col items-center gap-3 transition-opacity hover:opacity-80"
            >
              <PhoneMockup item={item} />
              <p className="text-center font-serif text-lg font-light">
                {item.title}
              </p>
              <p className="text-center text-[10px] uppercase tracking-[0.3em] text-muted">
                {item.tag}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}