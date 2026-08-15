import { useI18n } from "@/i18n";

export default function MinimalFooter() {
  const { t } = useI18n();

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 px-6 py-8 font-mono text-xs text-muted sm:flex-row">
        <p>© {new Date().getFullYear()} Drogan</p>
        <p>{t.default.footer.rights}</p>
      </div>
    </footer>
  );
}
