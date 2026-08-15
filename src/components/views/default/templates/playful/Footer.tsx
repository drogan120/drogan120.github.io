import { useI18n } from "@/i18n";

export default function PlayfulFooter() {
  const { t } = useI18n();

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 px-6 py-8 text-sm text-muted sm:flex-row">
        <p className="font-bold text-transparent bg-gradient-to-r from-accent to-accent-2 bg-clip-text">
          ✨ Drogan
        </p>
        <p>
          © {new Date().getFullYear()} Drogan. {t.default.footer.rights}
        </p>
      </div>
    </footer>
  );
}
