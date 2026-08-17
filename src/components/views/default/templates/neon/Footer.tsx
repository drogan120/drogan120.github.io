"use client";

import { useI18n } from "@/i18n";
import LastUpdated from "@/components/shared/LastUpdated";

export default function NeonFooter() {
  const { t } = useI18n();

  return (
    <footer className="relative mt-8">
      <div className="h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-3 px-5 py-10 font-mono text-xs text-muted sm:flex-row sm:justify-between sm:px-8">
        <p>
          <span className="neon-text inline-block h-2 w-2 rounded-sm bg-accent" />{" "}
          © {new Date().getFullYear()} {t.default.hero.name}
        </p>
        <p className="text-center">{t.default.footer.rights}</p>
        <LastUpdated />
      </div>
    </footer>
  );
}