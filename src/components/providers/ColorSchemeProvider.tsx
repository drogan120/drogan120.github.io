"use client";

import { createContext, useContext, useEffect } from "react";
import type { ReactNode } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

export type ColorScheme =
  | "mauve"
  | "pastel"
  | "ocean"
  | "forest"
  | "sunset";

type ColorSchemeContextValue = {
  scheme: ColorScheme;
  setScheme: (scheme: ColorScheme) => void;
};

const ColorSchemeContext = createContext<ColorSchemeContextValue>({
  scheme: "mauve",
  setScheme: () => {},
});

const SCHEMES: ColorScheme[] = ["mauve", "pastel", "ocean", "forest", "sunset"];

export function ColorSchemeProvider({ children }: { children: ReactNode }) {
  const [scheme, setScheme] = useLocalStorage<ColorScheme>(
    "drogan.scheme",
    "mauve"
  );

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove(...SCHEMES.map((s) => `scheme-${s}`));
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
