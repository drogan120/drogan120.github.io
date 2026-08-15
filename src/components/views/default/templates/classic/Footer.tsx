import { useI18n } from "@/i18n";

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
    </footer>
  );
}
