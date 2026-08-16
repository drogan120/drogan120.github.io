"use client";

import { useI18n } from "@/i18n";
import LastUpdated from "@/components/shared/LastUpdated";

export default function RetroFooter() {
  const { t } = useI18n();

  return (
    <footer className="relative mt-8">
      <div className="h-1 border-y border-accent/40 bg-accent/10" />
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-3 px-5 py-10 font-mono text-xs text-muted sm:flex-row sm:justify-between sm:px-8">
        <p>
          <span
            aria-hidden
            className="retro-glow inline-block h-2 w-2 rounded-sm bg-accent"
          />{" "}
          © {new Date().getFullYear()} Drogan
        </p>
        <p className="text-center">{t.default.footer.rights}</p>
        <LastUpdated />
      </div>
    </footer>
  );
}