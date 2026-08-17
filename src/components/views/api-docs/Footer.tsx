import { useI18n } from "@/i18n";
import LastUpdated from "@/components/shared/LastUpdated";

export default function Footer() {
  const { t } = useI18n();

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-4xl flex-col items-center justify-between gap-3 px-6 py-6 font-mono text-xs text-muted sm:flex-row">
        <p>
          <span className="text-accent">$</span> ali --version
        </p>
        <p>{t.apiDocs.version} · MIT © {new Date().getFullYear()} Ali Mahmudin</p>
      </div>
          <div className="mx-auto max-w-4xl px-6 pb-6 text-center font-mono text-xs text-muted/70">
        <LastUpdated />
      </div>
    </footer>
  );
}
