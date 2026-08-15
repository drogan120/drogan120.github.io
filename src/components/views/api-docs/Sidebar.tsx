"use client";

import { useEffect, useState } from "react";
import { useI18n } from "@/i18n";
import SettingsBar from "@/components/shared/SettingsBar";

const endpoints = [
  { method: "GET", path: "/about", href: "#about" },
  { method: "GET", path: "/skills", href: "#skills" },
  { method: "GET", path: "/projects", href: "#projects" },
  { method: "POST", path: "/contact", href: "#contact" },
];

const methodColor: Record<string, string> = {
  GET: "text-get",
  POST: "text-post",
};

function MethodBadge({ method }: { method: string }) {
  return (
    <span className={`w-10 shrink-0 font-mono text-xs font-bold ${methodColor[method] ?? "text-muted"}`}>
      {method}
    </span>
  );
}

export default function Sidebar() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#top");

  useEffect(() => {
    const onScroll = () => {
      const current = endpoints
        .map((e) => document.querySelector(e.href))
        .filter((el): el is HTMLElement => el !== null)
        .filter((el) => el.getBoundingClientRect().top <= 120)
        .sort(
          (a, b) =>
            b.getBoundingClientRect().top - a.getBoundingClientRect().top
        )[0];
      if (current) setActive(`#${current.id}`);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed right-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card text-xl md:hidden"
        aria-label="Menu"
      >
        {open ? "✕" : "☰"}
      </button>

      <aside
        className={`fixed inset-y-0 left-0 z-40 w-72 overflow-y-auto border-r border-border bg-card transition-transform duration-300 md:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6">
          <a href="#top" className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent font-mono text-sm font-bold text-background">
              ~
            </span>
            <div>
              <p className="font-mono text-sm font-semibold">drogan</p>
              <p className="text-xs text-muted">{t.apiDocs.version}</p>
            </div>
          </a>

          <div className="mt-8">
            <SettingsBar />
          </div>

          <p className="mt-8 mb-3 text-xs font-semibold uppercase tracking-wider text-muted">
            {t.apiDocs.intro}
          </p>
          <a
            href="#top"
            onClick={() => setOpen(false)}
            className={`block rounded-lg px-3 py-2 font-mono text-sm transition-colors ${
              active === "#top"
                ? "bg-background text-accent"
                : "text-foreground/80 hover:text-accent"
            }`}
          >
            <span className="mr-2 text-muted">$</span>
            {t.apiDocs.hello.replace("$ ", "")}
          </a>

          <p className="mt-8 mb-3 text-xs font-semibold uppercase tracking-wider text-muted">
            {t.apiDocs.endpoints}
          </p>
          <nav className="space-y-1">
            {endpoints.map((ep) => (
              <a
                key={ep.path}
                href={ep.href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-colors ${
                  active === ep.href
                    ? "bg-background text-foreground"
                    : "text-foreground/70 hover:text-accent"
                }`}
              >
                <MethodBadge method={ep.method} />
                <span className="font-mono text-sm">{ep.path}</span>
              </a>
            ))}
          </nav>

          <div className="mt-10 rounded-lg border border-border bg-background p-3 font-mono text-xs text-muted">
            <p>
              <span className="text-accent">$</span>{" "}
              {t.apiDocs.ping.replace("$ ", "")}
            </p>
            <p className="mt-1 text-get">{t.apiDocs.pong}</p>
          </div>
        </div>
      </aside>
    </>
  );
}
