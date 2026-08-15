"use client";

import { createContext, useContext } from "react";
import type { ReactNode } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import en from "./en";
import id from "./id";
import ja from "./ja";
import type { Dictionary } from "./en";

export const languages = {
  en: { label: "EN", name: "English", dict: en },
  id: { label: "ID", name: "Bahasa Indonesia", dict: id },
  ja: { label: "JP", name: "日本語", dict: ja },
} as const;

export type Language = keyof typeof languages;

type I18nContextValue = {
  lang: Language;
  setLang: (lang: Language) => void;
  t: Dictionary;
};

const I18nContext = createContext<I18nContextValue>({
  lang: "en",
  setLang: () => {},
  t: en,
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useLocalStorage<Language>("drogan.lang", "en");

  const validLang: Language = lang in languages ? lang : "en";

  return (
    <I18nContext.Provider
      value={{ lang: validLang, setLang, t: languages[validLang].dict }}
    >
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
