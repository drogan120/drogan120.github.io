"use client";

import { useTemplate } from "@/components/providers/TemplateProvider";
import type { Template } from "@/components/providers/TemplateProvider";

const options: { value: Template; label: string }[] = [
  { value: "minimal", label: "Minimal" },
  { value: "playful", label: "Playful" },
  { value: "classic", label: "Classic" },
];

export default function TemplateSwitcher() {
  const { template, setTemplate } = useTemplate();

  return (
    <div className="flex rounded-lg border border-border bg-card p-1">
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => setTemplate(opt.value)}
          className={`rounded-md px-2.5 py-1 font-mono text-xs transition-colors ${
            template === opt.value
              ? "bg-accent font-semibold text-background"
              : "text-muted hover:text-foreground"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
