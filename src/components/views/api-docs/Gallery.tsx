import { useI18n } from "@/i18n";
import Json from "./Json";

export default function Gallery() {
  const { t } = useI18n();

  return (
    <section id="gallery" className="mx-auto max-w-4xl px-6 py-16">
      <div className="flex items-center gap-3">
        <span className="rounded-md bg-get/15 px-2.5 py-1 font-mono text-xs font-bold text-get">
          GET
        </span>
        <h2 className="font-mono text-xl font-semibold">/gallery</h2>
      </div>

      <p className="mt-6 max-w-3xl text-sm text-muted">
        {t.apiDocs.gallery.description}
      </p>

      <div className="mt-8 overflow-hidden rounded-xl border border-border bg-card">
        <div className="border-b border-border px-4 py-2 font-mono text-xs text-muted">
          {t.apiDocs.gallery.response}
        </div>
        <Json data={t.apiDocs.gallery.data} />
      </div>
    </section>
  );
}