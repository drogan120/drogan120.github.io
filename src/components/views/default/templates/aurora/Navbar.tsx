"use client";

import { useEffect, useState } from "react";
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
 * Floating pill navigation.
 *
 * Unlike the other templates' full-width sticky bars, this detaches from the
 * top edge and centres itself, so the aurora backdrop stays visible around it.
 */
export default function AuroraNavbar() {
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
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 sm:pt-5">
      <nav
        className={`flex w-full max-w-6xl items-center justify-between gap-3 rounded-full border px-4 py-2.5 transition-all duration-500 sm:px-5 ${
          scrolled
            ? "border-border bg-card/80 shadow-lg shadow-black/5 backdrop-blur-xl"
            : "border-transparent bg-transparent"
        }`}
      >
        <a href="#top" className="shrink-0 font-mono text-base font-bold">
          <span className="text-accent">◆</span> {t.default.hero.name}
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="rounded-full px-3 py-1.5 font-mono text-xs text-muted transition-colors hover:bg-accent/10 hover:text-accent"
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
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-lg lg:hidden"
            aria-label="Menu"
            aria-expanded={open}
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {open && (
        <div className="absolute inset-x-4 top-full mt-2 rounded-3xl border border-border bg-card/95 p-4 backdrop-blur-xl lg:hidden">
          <ul className="grid grid-cols-2 gap-1">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-3 py-2.5 font-mono text-sm text-muted transition-colors hover:bg-accent/10 hover:text-accent"
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
