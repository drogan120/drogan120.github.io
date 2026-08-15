import { useI18n } from "@/i18n";
import PhoneMockup from "@/components/shared/PhoneMockup";

export default function PlayfulGallery() {
  const { t } = useI18n();

  return (
    <section id="gallery">
      <div className="mx-auto max-w-5xl px-6 py-16 md:py-24">
        <div className="text-center">
          <p className="font-mono text-sm text-accent">
            {t.default.gallery.label}
          </p>
          <h2 className="mt-2 text-4xl font-extrabold tracking-tight">
            {t.default.gallery.title}
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-4">
          {t.default.gallery.items.map((item) => (
            <div
              key={item.title}
              className="flex flex-col items-center gap-3 transition-all hover:-translate-y-1"
            >
              <PhoneMockup item={item} />
              <p className="text-center text-sm font-semibold">{item.title}</p>
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