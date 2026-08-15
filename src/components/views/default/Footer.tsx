import { useI18n } from "@/i18n";

export default function Footer() {
  const { t } = useI18n();

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-muted sm:flex-row">
        <p className="font-mono">
          <span className="text-accent">$</span> drogan --version
        </p>
        <p>
          © {new Date().getFullYear()} Drogan. {t.default.footer.rights}
        </p>
      </div>
    </footer>
  );
}
