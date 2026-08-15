"use client";

import { createContext, useContext } from "react";
import type { ReactNode } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

export type Template = "minimal" | "playful" | "classic" | "brutalist" | "fashion";

type TemplateContextValue = {
  template: Template;
  setTemplate: (template: Template) => void;
};

const TemplateContext = createContext<TemplateContextValue>({
  template: "minimal",
  setTemplate: () => {},
});

export function TemplateProvider({ children }: { children: ReactNode }) {
  const [template, setTemplate] = useLocalStorage<Template>(
    "drogan.template",
    "minimal"
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
