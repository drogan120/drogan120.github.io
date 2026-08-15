"use client";

import { createContext, useContext } from "react";
import type { ReactNode } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

export type View = "default" | "apiDocs" | "terminal";

type ViewContextValue = {
  view: View;
  setView: (view: View) => void;
};

const ViewContext = createContext<ViewContextValue>({
  view: "default",
  setView: () => {},
});

export function ViewProvider({ children }: { children: ReactNode }) {
  const [view, setView] = useLocalStorage<View>("drogan.view", "default");

  return (
    <ViewContext.Provider value={{ view, setView }}>
      {children}
    </ViewContext.Provider>
  );
}

export function useView() {
  return useContext(ViewContext);
}
