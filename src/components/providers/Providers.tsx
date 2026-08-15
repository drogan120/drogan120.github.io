"use client";

import type { ReactNode } from "react";
import { ThemeProvider } from "./ThemeProvider";
import { ColorSchemeProvider } from "./ColorSchemeProvider";
import { TemplateProvider } from "./TemplateProvider";
import { I18nProvider } from "@/i18n";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <ColorSchemeProvider>
        <TemplateProvider>
          <I18nProvider>{children}</I18nProvider>
        </TemplateProvider>
      </ColorSchemeProvider>
    </ThemeProvider>
  );
}
