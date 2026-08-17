import { useI18n } from "@/i18n";
import LastUpdated from "@/components/shared/LastUpdated";

export default function MinimalFooter() {
  const { t } = useI18n();

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 px-6 py-8 font-mono text-xs text-muted sm:flex-row">
        <p>© {new Date().getFullYear()} {t.default.hero.name}</p>
        <p>{t.default.footer.rights}</p>
      </div>
      <div className="mx-auto max-w-5xl px-6 pb-6 text-center font-mono text-xs text-muted/70">
        <LastUpdated />
      </div>
    </footer>
  );
}
