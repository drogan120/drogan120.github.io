"use client";

import { useState } from "react";
import { useI18n } from "@/i18n";

export default function ClassicSkills() {
  const { t } = useI18n();
  const groups = t.default.skills.groups;
  const [filter, setFilter] = useState<string>("All");

  const visible =
    filter === "All"
      ? groups
      : groups.filter((g) => g.title === filter || g.skills.includes(filter));

  return (
    <section id="skills" className="mx-auto max-w-5xl px-6 py-16 md:py-24">
      <p className="text-center font-mono text-sm text-accent">
        {t.default.skills.label}
      </p>
      <h2 className="mt-2 text-center text-3xl font-bold">
        {t.default.skills.title}
      </h2>

      <div className="mt-8 flex flex-wrap justify-center gap-2">
        {["All", ...groups.map((g) => g.title)].map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setFilter(cat)}
            className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
              filter === cat
                ? "border-accent bg-accent text-background"
                : "border-border text-muted hover:border-accent hover:text-accent"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-8 md:grid-cols-2">
        {visible.map((group) => (
          <div
            key={group.title}
            className="rounded-2xl border border-border bg-card p-6"
          >
            <h3 className="text-sm font-semibold uppercase tracking-widest text-accent">
              {group.icon} {group.title}
            </h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-lg bg-background px-3.5 py-1.5 text-sm font-medium transition-colors hover:text-accent"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}