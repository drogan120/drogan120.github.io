import { useI18n } from "@/i18n";
import LastUpdated from "@/components/shared/LastUpdated";

export default function BrutalistFooter() {
  const { t } = useI18n();

  return (
    <footer className="bg-foreground">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-6 font-mono text-xs font-bold uppercase text-background sm:flex-row">
        <p>© {new Date().getFullYear()} {t.default.hero.name}</p>
        <p>{t.default.footer.rights}</p>
      </div>
          <div className="mx-auto max-w-6xl px-6 pb-6 text-center font-mono text-xs font-bold uppercase text-background/60">
        <LastUpdated />
      </div>
    </footer>
  );
}
