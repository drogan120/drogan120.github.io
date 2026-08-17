"use client";

import { useI18n } from "@/i18n";
import DownloadResume from "@/components/shared/DownloadResume";
import { Section } from "./Chrome";

const links = [
  { label: "GitHub", href: "https://github.com/drogan120" },
  { label: "Email", href: "mailto:drogan120@gmail.com" },
  { label: "LinkedIn", href: "https://linkedin.com/in/drogan120" },
];

export default function BrokenContact() {
  const { t } = useI18n();

  return (
    <Section id="contact">
      <div className="broken-tape relative -rotate-1 bg-card px-6 py-16 text-center sm:px-12 sm:py-20">
        <span
          aria-hidden
          className="pointer-events-none absolute -top-32 left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-accent/15 blur-3xl"
        />

        <div className="relative">
          <p className="broken-stack inline-block font-mono text-xs tracking-[0.3em] text-accent-2 uppercase" data-text={t.default.contact.label.replace("// ", "")}>
            {t.default.contact.label.replace("// ", "")}
          </p>

          <h2 className="mt-5 text-3xl leading-tight font-black tracking-tight sm:text-5xl">
            <span className="broken-glitch-layer" data-text={t.default.contact.title}>
              {t.default.contact.title}
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
            {t.default.contact.description}
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <a
              href="mailto:drogan120@gmail.com"
              className="rotate-1 inline-flex items-center gap-2 border border-accent bg-accent px-6 py-3 text-sm font-bold text-background transition-transform hover:rotate-0"
            >
              {t.default.nav.hire} →
            </a>
            <DownloadResume />
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
            {links.map((link, i) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`font-mono text-xs text-muted underline decoration-accent/40 underline-offset-8 transition-colors hover:text-accent hover:decoration-accent sm:text-sm ${
                  i % 2 === 1 ? "translate-y-1" : ""
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
