"use client";

import { useI18n } from "@/i18n";
import LastUpdated from "@/components/shared/LastUpdated";

export default function AnimeFooter() {
  const { t } = useI18n();

  return (
    <footer className="relative mt-8">
      <div className="border-t-2 border-border" />
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-3 px-5 py-10 font-mono text-xs text-muted sm:flex-row sm:justify-between sm:px-8">
        <p>
          <span className="text-accent">☀</span> © {new Date().getFullYear()}{" "}
          Drogan
        </p>
        <p className="text-center">
          {t.default.footer.rights}
          <span aria-hidden className="ml-2 text-accent">
            どうもありがとう
          </span>
        </p>
        <LastUpdated />
      </div>
    </footer>
  );
}