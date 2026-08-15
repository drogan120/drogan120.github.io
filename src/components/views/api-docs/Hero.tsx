import { useI18n } from "@/i18n";
import Json from "./Json";

export default function Hero() {
  const { t } = useI18n();

  return (
    <section id="top" className="mx-auto max-w-4xl px-6 pt-16 pb-12 md:pt-24">
      <div className="rounded-xl border border-border bg-card">
        <div className="flex items-center gap-2 border-b border-border px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-red-500/70" />
          <span className="h-3 w-3 rounded-full bg-yellow-500/70" />
          <span className="h-3 w-3 rounded-full bg-green-500/70" />
          <span className="ml-4 font-mono text-xs text-muted">
            drogan@portfolio: ~/api
          </span>
        </div>

        <div className="p-5">
          <p className="font-mono text-sm">
            <span className="text-get">$</span> {t.apiDocs.hero.curl}
          </p>
          <div className="mt-4 border-l-2 border-accent/40 pl-4">
            <Json data={t.apiDocs.hero.data} />
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-4 px-1">
        <a
          href="#projects"
          className="rounded-lg bg-accent px-5 py-2.5 font-mono text-sm font-semibold text-background transition-transform hover:scale-105"
        >
          GET /projects
        </a>
        <a
          href="#contact"
          className="rounded-lg border border-border px-5 py-2.5 font-mono text-sm text-foreground transition-colors hover:border-accent hover:text-accent"
        >
          POST /contact
        </a>
      </div>
    </section>
  );
}
