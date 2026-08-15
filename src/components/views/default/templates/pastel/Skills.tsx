"use client";

import { useState } from "react";
import { useI18n } from "@/i18n";

const pillColors = [
  "bg-accent/15 text-accent ring-1 ring-accent/20",
  "bg-accent-2/15 text-accent-2 ring-1 ring-accent-2/20",
  "bg-accent/10 text-accent ring-1 ring-accent/20",
  "bg-accent-2/10 text-accent-2 ring-1 ring-accent-2/20",
];

export default function PastelSkills() {
  const { t } = useI18n();
  const groups = t.default.skills.groups;
  const [filter, setFilter] = useState<string>("All");

  const visible =
    filter === "All"
      ? groups
      : groups.filter((g) => g.title === filter || g.skills.includes(filter));

  return (
    <section id="skills" className="mx-auto max-w-5xl px-6 py-16 md:py-24">
      <div className="text-center">
        <p className="font-mono text-sm text-accent">
          {t.default.skills.label}
        </p>
        <h2 className="mt-3 text-3xl font-bold text-foreground">
          {t.default.skills.title}
        </h2>
      </div>

      <div className="mt-10 flex flex-wrap justify-center gap-2.5">
        {["All", ...groups.map((g) => g.title)].map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setFilter(cat)}
            className={`pop-on-click rounded-full px-5 py-2 text-sm font-medium transition-all ${
              filter === cat
                ? "bg-gradient-to-r from-accent to-accent-2 text-background shadow-md"
                : "bg-card/60 text-muted ring-1 ring-border/60 hover:text-accent"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {visible.map((group, gi) => (
          <div
            key={group.title}
            className="rounded-3xl border border-border/60 bg-card/60 p-7 backdrop-blur"
          >
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted">
              {group.icon} {group.title}
            </h3>
            <div className="mt-4 flex flex-wrap gap-2.5">
              {group.skills.map((skill, si) => (
                <span
                  key={skill}
                  className={`rounded-full px-4 py-1.5 text-sm font-medium ${pillColors[(gi + si) % pillColors.length]}`}
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