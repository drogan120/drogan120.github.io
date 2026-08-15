"use client";

import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/i18n";
import type { Language } from "@/i18n";
import { languages } from "@/i18n";
import { useTheme } from "@/components/providers/ThemeProvider";
import { useColorScheme } from "@/components/providers/ColorSchemeProvider";
import type { ColorScheme } from "@/components/providers/ColorSchemeProvider";
import { useTemplate } from "@/components/providers/TemplateProvider";
import type { Template } from "@/components/providers/TemplateProvider";
import { useCommandPalette } from "@/components/shared/CommandPalette";

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-b border-border pb-3 last:border-b-0 last:pb-0">
      <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-muted">
        {title}
      </p>
      {children}
    </div>
  );
}

function OptionGroup<T extends string>({
  options,
  value,
  onSelect,
}: {
  options: { value: T; label: string }[];
  value: T;
  onSelect: (v: T) => void;
}) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onSelect(opt.value)}
          className={`rounded-lg px-3 py-1.5 font-mono text-xs transition-colors ${
            value === opt.value
              ? "bg-accent font-semibold text-background"
              : "bg-card text-muted hover:text-foreground"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

export default function SettingsBar() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const { template, setTemplate } = useTemplate();
  const { theme, setTheme } = useTheme();
  const { scheme, setScheme } = useColorScheme();
  const { lang, setLang, t } = useI18n();
  const palette = useCommandPalette();

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const templateOptions: { value: Template; label: string }[] = [
    { value: "minimal", label: "Minimal" },
    { value: "playful", label: "Playful" },
    { value: "classic", label: "Classic" },
    { value: "brutalist", label: "Brutalist" },
    { value: "fashion", label: "Fashion" },
    { value: "pastel", label: "Pastel" },
    { value: "glass", label: "Glass" },
    { value: "apiDocs", label: "API Docs" },
    { value: "terminal", label: "Terminal" },
  ];

  const schemeOptions: { value: ColorScheme; label: string }[] = [
    { value: "mauve", label: "Mauve" },
    { value: "pastel", label: "Pastel" },
    { value: "ocean", label: "Ocean" },
    { value: "forest", label: "Forest" },
    { value: "sunset", label: "Sunset" },
  ];

  const langOptions = (Object.keys(languages) as Language[]).map((key) => ({
    value: key,
    label: languages[key].label,
  }));

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-base transition-colors hover:border-accent"
        aria-label="Settings"
        title="Settings"
      >
        {open ? "✕" : "⚙️"}
      </button>

      {open && (
        <div className="absolute right-0 z-50 mt-2 max-h-[75vh] w-64 max-w-[calc(100vw-2rem)] space-y-3 overflow-y-auto rounded-xl border border-border bg-background p-4 shadow-2xl shadow-black/40">
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              palette.open();
            }}
            className="flex w-full items-center justify-between gap-2 rounded-lg border border-border px-3 py-2 text-left text-xs transition-colors hover:border-accent hover:text-accent"
          >
            <span className="flex min-w-0 items-center gap-2">
              <span aria-hidden>🔍</span>
              <span className="truncate">{t.palette.open}</span>
            </span>
            <span className="shrink-0 font-mono text-[10px] text-muted">⌘K</span>
          </button>

          <Group title="Template">
            <OptionGroup
              options={templateOptions}
              value={template}
              onSelect={setTemplate}
            />
          </Group>

          <Group title="Theme">
            <div className="flex gap-1.5">
              {(["dark", "light"] as const).map((t2) => (
                <button
                  key={t2}
                  onClick={() => setTheme(t2)}
                  className={`flex-1 rounded-lg px-3 py-1.5 font-mono text-xs transition-colors ${
                    theme === t2
                      ? "bg-accent font-semibold text-background"
                      : "bg-card text-muted hover:text-foreground"
                  }`}
                >
                  {t2 === "dark" ? t.theme.dark : t.theme.light}
                </button>
              ))}
            </div>
          </Group>

          <Group title="Color">
            <OptionGroup
              options={schemeOptions}
              value={scheme}
              onSelect={setScheme}
            />
          </Group>

          <Group title="Language">
            <OptionGroup options={langOptions} value={lang} onSelect={setLang} />
          </Group>
        </div>
      )}
    </div>
  );
}
