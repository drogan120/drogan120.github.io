"use client";

import { createContext, useContext } from "react";
import type { ReactNode } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { DEFAULT_TEMPLATE } from "@/data/templates";
import type { Template } from "@/data/templates";

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

  return (
    <TemplateContext.Provider value={{ template, setTemplate }}>
      {children}
    </TemplateContext.Provider>
  );
}

export function useTemplate() {
  return useContext(TemplateContext);
}
