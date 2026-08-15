import { useI18n } from "@/i18n";
import PhoneMockup from "@/components/shared/PhoneMockup";

export default function BrutalistGallery() {
  const { t } = useI18n();

  return (
    <section id="gallery" className="border-b-4 border-foreground">
      <div className="mx-auto max-w-6xl px-6 py-12 md:py-20">
        <h2 className="text-3xl font-black uppercase tracking-tight">
          {t.default.gallery.title}
        </h2>
        <p className="mt-2 font-mono text-xs font-bold text-accent">
          [{t.default.gallery.label}]
        </p>

        <div className="mt-10 grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-4">
          {t.default.gallery.items.map((item) => (
            <div
              key={item.title}
              className="flex flex-col items-center gap-3 border-2 border-foreground bg-card p-4"
            >
              <PhoneMockup item={item} />
              <p className="text-center font-mono text-sm font-bold uppercase">
                {item.title}
              </p>
              <p className="text-center font-mono text-xs font-bold uppercase text-muted">
                {item.tag}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}