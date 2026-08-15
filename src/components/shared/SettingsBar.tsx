"use client";

import { useI18n } from "@/i18n";
import type { Language } from "@/i18n";
import { languages } from "@/i18n";
import { useTheme } from "@/components/providers/ThemeProvider";
import { useView } from "@/components/providers/ViewProvider";
import type { View } from "@/components/providers/ViewProvider";

function ViewSwitcher() {
  const { view, setView } = useView();
  const { t } = useI18n();

  const options: { value: View; label: string }[] = [
    { value: "default", label: t.view.default },
    { value: "apiDocs", label: t.view.apiDocs },
    { value: "terminal", label: "Terminal" },
  ];

  return (
    <div className="flex rounded-lg border border-border bg-background p-1">
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => setView(opt.value)}
          className={`rounded-md px-3 py-1.5 font-mono text-xs transition-colors ${
            view === opt.value
              ? "bg-accent font-semibold text-background"
              : "text-muted hover:text-foreground"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background text-sm transition-colors hover:border-accent"
      aria-label="Toggle theme"
      title={theme === "dark" ? "Light mode" : "Dark mode"}
    >
      {theme === "dark" ? "☀️" : "🌙"}
    </button>
  );
}

function LanguageSwitcher() {
  const { lang, setLang } = useI18n();

  return (
    <div className="flex rounded-lg border border-border bg-background p-1">
      {(Object.keys(languages) as Language[]).map((key) => (
        <button
          key={key}
          onClick={() => setLang(key)}
          className={`rounded-md px-2.5 py-1.5 font-mono text-xs transition-colors ${
            lang === key
              ? "bg-accent font-semibold text-background"
              : "text-muted hover:text-foreground"
          }`}
          title={languages[key].name}
        >
          {languages[key].label}
        </button>
      ))}
    </div>
  );
}

export default function SettingsBar() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <ViewSwitcher />
      <ThemeToggle />
      <LanguageSwitcher />
    </div>
  );
}
