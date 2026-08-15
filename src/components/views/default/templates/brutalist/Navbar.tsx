"use client";

import { useEffect, useState } from "react";
import { useI18n } from "@/i18n";
import SettingsBar from "@/components/shared/SettingsBar";

const links = [
  { href: "#about", key: "about" },
  { href: "#skills", key: "skills" },
  { href: "#experience", key: "experience" },
  { href: "#blog", key: "blog" },
  { href: "#projects", key: "projects" },
  { href: "#contact", key: "contact" },
] as const;

export default function BrutalistNavbar() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b-4 border-foreground bg-background">
      <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        <a href="#top" className="font-mono text-lg font-black uppercase tracking-tight">
          Drogan<span className="text-accent">_</span>
        </a>

        <ul className="hidden items-center md:flex">
          {links.map((link, i) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="flex h-14 items-center border-l-2 border-foreground px-6 font-mono text-sm uppercase transition-colors hover:bg-accent hover:text-background"
              >
                <span className="mr-2 text-accent">{i + 1}</span>
                {t.default.nav[link.key]}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <SettingsBar />
          <button
            onClick={() => setOpen(!open)}
            className="flex h-10 w-10 items-center justify-center border-2 border-foreground font-mono text-lg font-bold md:hidden"
            aria-label="Menu"
          >
            {open ? "✕" : "≡"}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t-2 border-foreground bg-background">
          <ul className="flex flex-col">
            {links.map((link, i) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center border-b-2 border-foreground px-6 py-4 font-mono text-sm uppercase hover:bg-accent hover:text-background"
                >
                  <span className="mr-2 text-accent">{i + 1}</span>
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
