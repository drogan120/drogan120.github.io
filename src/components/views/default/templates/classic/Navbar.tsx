"use client";

import { useEffect, useState } from "react";
import { useI18n } from "@/i18n";
import SettingsBar from "@/components/shared/SettingsBar";
import TemplateSwitcher from "../../TemplateSwitcher";

const links = [
  { href: "#about", key: "about" },
  { href: "#skills", key: "skills" },
  { href: "#projects", key: "projects" },
  { href: "#contact", key: "contact" },
] as const;

export default function ClassicNavbar() {
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
          ? "border-b border-border bg-background/85 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <a href="#top" className="flex items-center gap-2 text-lg font-semibold">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent-2 text-sm font-bold text-background">
            D
          </span>
          drogan
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm text-muted transition-colors hover:text-foreground"
              >
                {t.default.nav[link.key]}
              </a>
            </li>
          ))}
          <li>
            <TemplateSwitcher />
          </li>
          <li>
            <SettingsBar />
          </li>
        </ul>

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
          <div className="mb-4 space-y-3">
            <TemplateSwitcher />
            <SettingsBar />
          </div>
          <ul className="flex flex-col gap-4">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-muted transition-colors hover:text-foreground"
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
