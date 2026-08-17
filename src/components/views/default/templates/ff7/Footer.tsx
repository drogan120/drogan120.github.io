"use client";

import { useI18n } from "@/i18n";
import LastUpdated from "@/components/shared/LastUpdated";

export default function Ff7Footer() {
  const { t } = useI18n();

  return (
    <footer className="relative mt-8">
      <div className="ff7-divider" />
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-3 px-5 py-10 font-mono text-xs text-muted sm:flex-row sm:justify-between sm:px-8">
        <p>
          <span
            aria-hidden
            className="ff7-glow inline-block h-2 w-2 rounded-full bg-accent"
          />{" "}
          © {new Date().getFullYear()} {t.default.hero.name}
        </p>
        <p className="text-center">{t.default.footer.rights}</p>
        <LastUpdated />
      </div>
    </footer>
  );
}