"use client";

import { useTemplate } from "@/components/providers/TemplateProvider";
import DefaultView from "@/components/views/default";
import ApiDocsView from "@/components/views/api-docs";
import TerminalView from "@/components/views/terminal";

export default function Home() {
  const { template } = useTemplate();
  if (template === "apiDocs") return <ApiDocsView />;
  if (template === "terminal") return <TerminalView />;
  return <DefaultView />;
}
