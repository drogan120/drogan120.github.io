import { useI18n } from "@/i18n";

export default function PastelFooter() {
  const { t } = useI18n();

  return (
    <footer className="border-t border-slate-100 dark:border-white/10">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 px-6 py-8 text-sm text-slate-400 sm:flex-row dark:text-purple-100/50">
        <p className="font-semibold text-slate-500 dark:text-purple-50">
          Drogan
        </p>
        <p>
          © {new Date().getFullYear()}. {t.default.footer.rights}
        </p>
      </div>
    </footer>
  );
}
