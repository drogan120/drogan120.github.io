"use client";

import { useState } from "react";
import { useI18n } from "@/i18n";

export default function MinimalSkills() {
  const { t } = useI18n();
  const groups = t.default.skills.groups;
  const [filter, setFilter] = useState<string>("All");

  const visible =
    filter === "All"
      ? groups
      : groups.filter((g) => g.title === filter || g.skills.includes(filter));

  return (
    <section id="skills" className="mx-auto max-w-5xl px-6 py-16 md:py-24">
      <p className="font-mono text-sm text-accent">{t.default.skills.label}</p>
      <h2 className="mt-3 text-3xl font-bold">{t.default.skills.title}</h2>

      <div className="mt-8 flex flex-wrap gap-2">
        {["All", ...groups.map((g) => g.title)].map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setFilter(cat)}
            className={`rounded-full border px-4 py-1.5 font-mono text-sm transition-all ${
              filter === cat
                ? "border-accent bg-accent text-background"
                : "border-border text-muted hover:border-accent hover:text-accent"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-x-12 gap-y-10 md:grid-cols-2">
        {visible.map((group) => (
          <div key={group.title} className="border-l border-border pl-6">
            <h3 className="font-mono text-sm text-muted">
              {group.icon} {group.title}
            </h3>
            <p className="mt-3 leading-relaxed text-foreground">
              {group.skills.join(" · ")}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}