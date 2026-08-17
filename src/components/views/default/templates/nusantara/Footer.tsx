"use client";

import { useI18n } from "@/i18n";
import LastUpdated from "@/components/shared/LastUpdated";
import { KawungMotif } from "./Chrome";

export default function NusantaraFooter() {
  const { t } = useI18n();

  return (
    <footer className="relative mt-8">
      <div className="nusantara-tirta h-3" aria-hidden />
      <div className="border-t border-border" />
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-3 px-5 py-10 font-mono text-xs text-muted sm:flex-row sm:justify-between sm:px-8">
        <p className="flex items-center gap-2">
          <KawungMotif className="h-5 w-5 text-accent" />
          © {new Date().getFullYear()} {t.default.hero.name}
        </p>
        <p className="text-center">
          {t.default.footer.rights}
          <span aria-hidden className="ml-2 text-accent">
            Terima kasih
          </span>
        </p>
        <LastUpdated />
      </div>
    </footer>
  );
}