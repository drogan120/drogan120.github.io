"use client";

import { useTemplate } from "@/components/providers/TemplateProvider";
import MinimalTemplate from "./templates/minimal";
import PlayfulTemplate from "./templates/playful";
import ClassicTemplate from "./templates/classic";

export default function DefaultView() {
  const { template } = useTemplate();

  if (template === "playful") return <PlayfulTemplate />;
  if (template === "classic") return <ClassicTemplate />;
  return <MinimalTemplate />;
}
