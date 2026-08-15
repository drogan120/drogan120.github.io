import { useI18n } from "@/i18n";
import PhoneMockup from "@/components/shared/PhoneMockup";

export default function ClassicGallery() {
  const { t } = useI18n();

  return (
    <section id="gallery" className="mx-auto max-w-5xl px-6 py-16 md:py-24">
      <p className="text-center font-mono text-sm text-accent">
        {t.default.gallery.label}
      </p>
      <h2 className="mt-2 text-center text-3xl font-bold">
        {t.default.gallery.title}
      </h2>
      <p className="mx-auto mt-3 max-w-xl text-center text-muted">
        {t.default.gallery.description}
      </p>

      <div className="mt-12 grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-4">
        {t.default.gallery.items.map((item) => (
          <div key={item.title} className="flex flex-col items-center gap-3">
            <PhoneMockup item={item} />
            <p className="text-center text-sm font-semibold">{item.title}</p>
            <p className="text-center font-mono text-xs text-muted">
              {item.tag}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}