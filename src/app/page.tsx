"use client";

import { useView } from "@/components/providers/ViewProvider";
import DefaultView from "@/components/views/default";
import ApiDocsView from "@/components/views/api-docs";
import TerminalView from "@/components/views/terminal";

export default function Home() {
  const { view } = useView();
  if (view === "apiDocs") return <ApiDocsView />;
  if (view === "terminal") return <TerminalView />;
  return <DefaultView />;
}
