"use client";

import { useI18n } from "@/i18n";
import LastUpdated from "@/components/shared/LastUpdated";

export default function BrokenFooter() {
  const { t } = useI18n();

  return (
    <footer className="relative mt-8">
      <div aria-hidden className="broken-tear mx-auto w-full max-w-6xl px-5 sm:px-8" />
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-3 px-5 py-10 font-mono text-xs text-muted sm:flex-row sm:justify-between sm:px-8">
        <p className="-rotate-1">
          <span
            aria-hidden
            className="broken-glitch mr-1 inline-block h-2 w-2 border border-accent-2 bg-accent"
          />{" "}
          © {new Date().getFullYear()} Drogan
        </p>
        <p className="rotate-1">
          <span className="broken-stack" data-text={t.default.footer.rights}>
            {t.default.footer.rights}
          </span>
        </p>
        <LastUpdated />
      </div>
    </footer>
  );
}
