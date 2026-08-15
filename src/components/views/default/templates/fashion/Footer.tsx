import { useI18n } from "@/i18n";

export default function FashionFooter() {
  const { t } = useI18n();

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-8 py-8 text-xs uppercase tracking-[0.25em] text-muted sm:flex-row">
        <p>© {new Date().getFullYear()} Drogan</p>
        <p>{t.default.footer.rights}</p>
      </div>
    </footer>
  );
}
