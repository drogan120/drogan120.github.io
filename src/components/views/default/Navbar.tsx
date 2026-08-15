"use client";

import { useEffect, useState } from "react";
import { useI18n } from "@/i18n";
import SettingsBar from "@/components/shared/SettingsBar";

const links = [
  { href: "#about", key: "about" },
  { href: "#skills", key: "skills" },
  { href: "#projects", key: "projects" },
  { href: "#contact", key: "contact" },
] as const;

export default function Navbar() {
  const { t } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-border bg-background/80 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <a href="#top" className="font-mono text-lg font-bold">
          <span className="text-accent">~</span>drogan
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm text-foreground/80 transition-colors hover:text-accent"
              >
                {t.default.nav[link.key]}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#contact"
              className="rounded-full border border-accent px-4 py-1.5 text-sm text-accent transition-colors hover:bg-accent hover:text-background"
            >
              {t.default.nav.hire}
            </a>
          </li>
        </ul>

        <div className="hidden md:block">
          <SettingsBar />
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="flex h-10 w-10 items-center justify-center text-2xl md:hidden"
          aria-label="Menu"
        >
          {open ? "✕" : "☰"}
        </button>
      </nav>

      {open && (
        <div className="border-t border-border bg-background px-6 py-4 md:hidden">
          <div className="mb-4">
            <SettingsBar />
          </div>
          <ul className="flex flex-col gap-4">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-foreground/80 transition-colors hover:text-accent"
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
