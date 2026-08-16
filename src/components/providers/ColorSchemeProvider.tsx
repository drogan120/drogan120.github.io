"use client";

import { createContext, useContext, useEffect } from "react";
import type { ReactNode } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { DEFAULT_SCHEME, SCHEME_NAMES } from "@/data/schemes";
import type { ColorScheme } from "@/data/schemes";

// Re-exported so existing consumers can keep importing the type from here.
export type { ColorScheme };

type ColorSchemeContextValue = {
  scheme: ColorScheme;
  setScheme: (scheme: ColorScheme) => void;
};

const ColorSchemeContext = createContext<ColorSchemeContextValue>({
  scheme: DEFAULT_SCHEME,
  setScheme: () => {},
});

export function ColorSchemeProvider({ children }: { children: ReactNode }) {
  const [scheme, setScheme] = useLocalStorage<ColorScheme>(
    "drogan.scheme",
    DEFAULT_SCHEME
  );

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove(...SCHEME_NAMES.map((s) => `scheme-${s}`));
    root.classList.add(`scheme-${scheme}`);
  }, [scheme]);

  return (
    <ColorSchemeContext.Provider value={{ scheme, setScheme }}>
      {children}
    </ColorSchemeContext.Provider>
  );
}

export function useColorScheme() {
  return useContext(ColorSchemeContext);
}
