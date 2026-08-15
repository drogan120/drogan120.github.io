"use client";

import { useState } from "react";
import { useI18n } from "@/i18n";

export default function FashionSkills() {
  const { t } = useI18n();
  const groups = t.default.skills.groups;
  const [filter, setFilter] = useState<string>("All");

  const visible =
    filter === "All"
      ? groups
      : groups.filter((g) => g.title === filter || g.skills.includes(filter));

  return (
    <section id="skills" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:px-8 md:py-24">
        <p className="text-center text-xs uppercase tracking-[0.4em] text-accent">
          {t.default.skills.label}
        </p>
        <h2 className="mt-6 text-center font-serif text-4xl font-light sm:text-5xl">
          {t.default.skills.title}
        </h2>

        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {["All", ...groups.map((g) => g.title)].map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setFilter(cat)}
              className={`text-xs uppercase tracking-[0.25em] transition-colors ${
                filter === cat
                  ? "border-b border-accent text-accent"
                  : "border-b border-transparent text-muted hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="mt-12 grid gap-px border border-border bg-border md:grid-cols-2 lg:grid-cols-4">
          {visible.map((group) => (
            <div key={group.title} className="bg-background p-8">
              <h3 className="text-xs uppercase tracking-[0.25em] text-accent">
                {group.icon} {group.title}
              </h3>
              <ul className="mt-6 space-y-3">
                {group.skills.map((skill) => (
                  <li
                    key={skill}
                    className="text-sm text-muted transition-colors hover:text-foreground"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}