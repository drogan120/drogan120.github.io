"use client";

import { useState } from "react";
import { useI18n } from "@/i18n";

export default function GlassSkills() {
  const { t } = useI18n();
  const groups = t.default.skills.groups;
  const [filter, setFilter] = useState<string>("All");

  const visible =
    filter === "All"
      ? groups
      : groups.filter((g) => g.title === filter || g.skills.includes(filter));

  return (
    <section id="skills" className="relative">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 mx-auto h-64 w-64 rounded-full bg-accent/20 blur-[120px]" />

      <div className="relative mx-auto max-w-5xl px-6 py-16 md:py-24">
        <div className="text-center">
          <p className="font-mono text-sm text-accent">{t.default.skills.label}</p>
          <h2 className="mt-3 text-3xl font-bold">{t.default.skills.title}</h2>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {["All", ...groups.map((g) => g.title)].map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setFilter(cat)}
              className={`rounded-full border px-4 py-1.5 text-sm backdrop-blur-md transition-all ${
                filter === cat
                  ? "border-accent/60 bg-white/15 text-foreground"
                  : "border-white/20 bg-white/5 text-muted hover:border-accent/40 hover:text-accent"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {visible.map((group) => (
            <div
              key={group.title}
              className="rounded-3xl border border-white/15 bg-white/10 p-7 backdrop-blur-xl"
            >
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted">
                {group.icon} {group.title}
              </h3>
              <div className="mt-4 flex flex-wrap gap-2.5">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm backdrop-blur-md transition-colors hover:border-accent/50 hover:text-accent"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}