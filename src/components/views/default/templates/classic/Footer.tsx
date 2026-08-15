import { useI18n } from "@/i18n";
import LastUpdated from "@/components/shared/LastUpdated";

export default function ClassicFooter() {
  const { t } = useI18n();

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 px-6 py-8 text-sm text-muted sm:flex-row">
        <p className="font-semibold">Drogan</p>
        <p>
          © {new Date().getFullYear()}. {t.default.footer.rights}
        </p>
      </div>
          <div className="mx-auto max-w-6xl px-6 pb-6 text-center font-mono text-xs text-muted/70">
        <LastUpdated />
      </div>
    </footer>
  );
}
