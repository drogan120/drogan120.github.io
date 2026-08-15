import { useI18n } from "@/i18n";

export default function BrutalistFooter() {
  const { t } = useI18n();

  return (
    <footer className="bg-foreground">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-6 font-mono text-xs font-bold uppercase text-background sm:flex-row">
        <p>© {new Date().getFullYear()} Drogan</p>
        <p>{t.default.footer.rights}</p>
      </div>
    </footer>
  );
}
