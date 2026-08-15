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

export default function PastelNavbar() {
  const { t } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/70 shadow-sm backdrop-blur-md dark:bg-gradient-to-r dark:from-purple-500/10 dark:via-pink-500/10 dark:to-sky-500/10"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <a
          href="#top"
          className="text-lg font-bold text-slate-700 dark:text-slate-200"
        >
          <span className="text-pink-400">✦</span> drogan
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm font-medium text-slate-500 transition-colors hover:text-pink-400 dark:text-slate-400"
              >
                {t.default.nav[link.key]}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <SettingsBar />
          <button
            onClick={() => setOpen(!open)}
            className="flex h-9 w-9 items-center justify-center text-xl text-slate-700 md:hidden dark:text-slate-200"
            aria-label="Menu"
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-slate-100 bg-white px-6 py-4 md:hidden dark:border-white/10 dark:bg-gradient-to-b dark:from-purple-500/15 dark:to-sky-500/10">
          <ul className="flex flex-col gap-4">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-sm font-medium text-slate-500 dark:text-slate-400"
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
