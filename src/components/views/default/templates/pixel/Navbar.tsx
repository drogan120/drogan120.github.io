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
 * 8-bit nav: a chunky cartridge bar with a blocky brand, like the title screen
 * of a NES game.
 */
export default function PixelNavbar() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b-2 border-accent bg-background">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        <a href="#top" className="flex shrink-0 items-center gap-2">
          <span aria-hidden className="inline-block h-3.5 w-3.5 bg-accent" />
          <span className="font-pixel text-sm tracking-tight text-foreground">
            DROGAN
          </span>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="px-3 py-1.5 font-mono text-xs font-bold text-muted transition-colors hover:bg-accent hover:text-background"
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
            className="flex h-9 w-9 items-center justify-center border-2 border-accent font-mono text-lg text-accent lg:hidden"
            aria-label="Menu"
            aria-expanded={open}
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t-2 border-accent bg-background px-5 py-4 lg:hidden">
          <ul className="grid grid-cols-2 gap-2">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block border-2 border-border bg-card px-3 py-2.5 font-mono text-sm text-muted transition-colors hover:border-accent hover:text-accent"
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