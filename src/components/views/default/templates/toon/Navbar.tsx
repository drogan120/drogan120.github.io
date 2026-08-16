"use client";

import { useState } from "react";
import { useI18n } from "@/i18n";
import SettingsBar from "@/components/shared/SettingsBar";

const links = [
  { href: "#about", key: "about" },
  { href: "#skills", key: "skills" },
  { href: "#experience", key: "experience" },
  { href: "#blog", key: "blog" },
  { href: "#gallery", key: "gallery" },
  { href: "#projects", key: "projects" },
  { href: "#contact", key: "contact" },
] as const;

/**
 * Cel-shaded nav: a chunky bar with a bold comic brand, like the HUD of a
 * cartoon racer.
 */
export default function ToonNavbar() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b-4 border-foreground/20 bg-background">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        <a href="#top" className="flex shrink-0 items-center gap-2">
          <span aria-hidden className="toon-shadow text-2xl text-accent">
            ⚑
          </span>
          <span className="toon-shadow font-mono text-xl font-black tracking-widest">
            DROGAN
          </span>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="px-3 py-1.5 font-mono text-xs font-bold text-muted transition-colors hover:text-accent"
              >
                {t.default.nav[link.key]}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex shrink-0 items-center gap-2">
          <SettingsBar />
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="flex h-9 w-9 items-center justify-center border-4 border-foreground/20 font-mono text-lg text-accent lg:hidden"
            aria-label="Menu"
            aria-expanded={open}
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t-4 border-foreground/20 bg-background px-5 py-4 lg:hidden">
          <ul className="grid grid-cols-2 gap-2">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block border-2 border-foreground/20 bg-card px-3 py-2.5 font-mono text-sm text-muted transition-colors hover:border-accent hover:text-accent"
                >
                  {t.default.nav[link.key]}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}