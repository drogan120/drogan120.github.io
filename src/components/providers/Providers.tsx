"use client";

import type { ReactNode } from "react";
import { ThemeProvider } from "./ThemeProvider";
import { ViewProvider } from "./ViewProvider";
import { I18nProvider } from "@/i18n";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <ViewProvider>
        <I18nProvider>{children}</I18nProvider>
      </ViewProvider>
    </ThemeProvider>
  );
}
