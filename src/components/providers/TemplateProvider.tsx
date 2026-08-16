"use client";

import { createContext, useContext, useCallback } from "react";
import type { ReactNode } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { DEFAULT_TEMPLATE, templateScheme } from "@/data/templates";
import type { Template } from "@/data/templates";
import { useColorScheme } from "./ColorSchemeProvider";

// Re-exported so existing `import type { Template } from ".../TemplateProvider"`
// call sites keep working now that the list lives in src/data/templates.ts.
export type { Template };

type TemplateContextValue = {
  template: Template;
  setTemplate: (template: Template) => void;
};

const TemplateContext = createContext<TemplateContextValue>({
  template: DEFAULT_TEMPLATE,
  setTemplate: () => {},
});

export function TemplateProvider({ children }: { children: ReactNode }) {
  const [template, setTemplate] = useLocalStorage<Template>(
    "drogan.template",
    DEFAULT_TEMPLATE
  );
  const { setScheme } = useColorScheme();

  /**
   * Switching template also applies its companion scheme (the one registered
   * next to it in src/data/templates.ts). It is only a default — the visitor
   * can still pick any other scheme afterwards, and re-selecting a template
   * re-applies its own.
   */
  const selectTemplate = useCallback(
    (next: Template) => {
      setTemplate(next);
      const scheme = templateScheme(next);
      if (scheme) setScheme(scheme);
    },
    [setTemplate, setScheme]
  );

  return (
    <TemplateContext.Provider value={{ template, setTemplate: selectTemplate }}>
      {children}
    </TemplateContext.Provider>
  );
}

export function useTemplate() {
  return useContext(TemplateContext);
}