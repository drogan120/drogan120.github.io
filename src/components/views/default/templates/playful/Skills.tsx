"use client";

import { useState } from "react";
import { useI18n } from "@/i18n";

export default function PlayfulSkills() {
  const { t } = useI18n();
  const groups = t.default.skills.groups;
  const [filter, setFilter] = useState<string>("All");

  const visible =
    filter === "All"
      ? groups
      : groups.filter((g) => g.title === filter || g.skills.includes(filter));

  return (
    <section id="skills">
      <div className="mx-auto max-w-5xl px-6 py-16 md:py-24">
        <div className="text-center">
          <p className="font-mono text-sm text-accent">
            {t.default.skills.label}
          </p>
          <h2 className="mt-2 text-4xl font-extrabold tracking-tight">
            {t.default.skills.title}
          </h2>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {["All", ...groups.map((g) => g.title)].map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setFilter(cat)}
              className={`pop-on-click rounded-full px-5 py-2 text-sm font-semibold transition-all ${
                filter === cat
                  ? "bg-gradient-to-r from-accent to-accent-2 text-background shadow-lg shadow-accent/30"
                  : "border border-border text-muted hover:scale-105 hover:border-accent hover:text-accent"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {visible.map((group) => (
            <div
              key={group.title}
              className="rounded-3xl border border-border bg-background p-6"
            >
              <h3 className="flex items-center gap-2 font-bold">
                <span className="bg-gradient-to-r from-accent to-accent-2 bg-clip-text text-transparent">
                  {group.icon}
                </span>
                {group.title}
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-card px-3.5 py-1.5 text-sm font-medium transition-all hover:scale-105 hover:bg-accent hover:text-background"
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