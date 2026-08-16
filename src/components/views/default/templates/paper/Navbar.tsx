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
 * Zine masthead nav: a double-rule header with serif branding, like a
 * newspaper masthead.
 */
export default function PaperNavbar() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur">
      <div className="border-b border-border">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
          <a
            href="#top"
            className="font-serif text-2xl font-bold tracking-tight text-foreground"
          >
            <span className="text-accent">The</span> Drogan
            <span aria-hidden className="ml-1 text-accent">
              Vol.
            </span>
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="rounded px-3 py-1.5 font-mono text-xs text-muted transition-colors hover:text-accent"
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
              className="flex h-9 w-9 items-center justify-center rounded border border-border text-lg lg:hidden"
              aria-label="Menu"
              aria-expanded={open}
            >
              {open ? "✕" : "☰"}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="border-b border-border bg-background px-5 py-4 lg:hidden">
          <ul className="grid grid-cols-2 gap-2">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded border border-border px-3 py-2.5 font-mono text-sm text-muted transition-colors hover:border-accent hover:text-accent"
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