"use client";

import { useEffect, useState } from "react";
import { useI18n } from "@/i18n";
import SettingsBar from "@/components/shared/SettingsBar";
import { Hanko, Furigana } from "./Chrome";

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
 * Nihon nav: a slim ink bar with a hanko brand mark and furigana reading on
 * the name, links underlined like brush strokes on hover.
 */
export default function NihonNavbar() {
  const { t } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-shadow duration-300 ${
        scrolled ? "shadow-lg shadow-black/10" : ""
      }`}
    >
      <div className="border-b border-border bg-background/95 backdrop-blur">
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
          <a href="#top" className="flex shrink-0 items-center gap-2.5">
            <Hanko small>龍</Hanko>
            <span className="font-mono text-base font-black tracking-widest">
              <Furigana text="ドロガン" reading="どろがん" className="text-accent" />
            </span>
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="nihon-navlink rounded-lg px-3 py-1.5 font-mono text-xs text-muted transition-colors hover:text-accent"
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
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-lg lg:hidden"
              aria-label="Menu"
              aria-expanded={open}
            >
              {open ? "✕" : "☰"}
            </button>
          </div>
        </nav>
      </div>

      {open && (
        <div className="border-b border-border bg-background px-5 py-4 lg:hidden">
          <ul className="grid grid-cols-2 gap-2">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg border border-border px-3 py-2.5 font-mono text-sm text-muted transition-colors hover:border-accent hover:text-accent"
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