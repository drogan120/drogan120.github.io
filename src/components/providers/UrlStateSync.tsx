"use client";

import { useEffect } from "react";
import { useTheme } from "@/components/providers/ThemeProvider";
import type { Theme } from "@/components/providers/ThemeProvider";
import { useColorScheme } from "@/components/providers/ColorSchemeProvider";
import type { ColorScheme } from "@/components/providers/ColorSchemeProvider";
import { useTemplate } from "@/components/providers/TemplateProvider";
import type { Template } from "@/components/providers/TemplateProvider";
import { useI18n } from "@/i18n";
import type { Language } from "@/i18n";

const VALID = {
  template: [
    "minimal",
    "playful",
    "classic",
    "brutalist",
    "fashion",
    "pastel",
    "glass",
    "apiDocs",
    "terminal",
  ] as const,
  scheme: ["mauve", "pastel", "ocean", "forest", "sunset"] as const,
  lang: ["en", "id", "ja"] as const,
  theme: ["dark", "light"] as const,
};

function getValid<T extends string>(key: string, list: readonly T[]): T | null {
  if (typeof window === "undefined") return null;
  const value = new URLSearchParams(window.location.search).get(key);
  return value && (list as readonly string[]).includes(value)
    ? (value as T)
    : null;
}

function updateParams(patch: Record<string, string>) {
  const params = new URLSearchParams(window.location.search);
  for (const [key, value] of Object.entries(patch)) {
    params.set(key, value);
  }
  window.history.replaceState(
    null,
    "",
    `${window.location.pathname}?${params.toString()}`
  );
}

export function UrlStateSync() {
  const { template } = useTemplate();
  const { setTemplate } = useTemplate();
  const { scheme, setScheme } = useColorScheme();
  const { lang, setLang } = useI18n();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const t = getValid<Template>("template", VALID.template);
    if (t) setTemplate(t);
    const s = getValid<ColorScheme>("scheme", VALID.scheme);
    if (s) setScheme(s);
    const l = getValid<Language>("lang", VALID.lang);
    if (l) setLang(l);
    const th = getValid<Theme>("theme", VALID.theme);
    if (th) setTheme(th);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    updateParams({ template, scheme, lang, theme });
  }, [template, scheme, lang, theme]);

  return null;
}
