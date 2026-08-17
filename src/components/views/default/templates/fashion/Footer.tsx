import { useI18n } from "@/i18n";
import LastUpdated from "@/components/shared/LastUpdated";

export default function FashionFooter() {
  const { t } = useI18n();

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-8 py-8 text-xs uppercase tracking-[0.25em] text-muted sm:flex-row">
        <p>© {new Date().getFullYear()} {t.default.hero.name}</p>
        <p>{t.default.footer.rights}</p>
      </div>
          <div className="mx-auto max-w-6xl px-6 pb-6 text-center font-mono text-xs text-muted/70">
        <LastUpdated />
      </div>
    </footer>
  );
}
