"use client";

import { useI18n } from "@/i18n";
import DownloadResume from "@/components/shared/DownloadResume";
import { Section } from "./Chrome";

const links = [
  { label: "GitHub", href: "https://github.com/drogan120" },
  { label: "Email", href: "mailto:drogan120@gmail.com" },
  { label: "LinkedIn", href: "https://linkedin.com/in/drogan120" },
];

export default function PaperContact() {
  const { t } = useI18n();

  return (
    <Section id="contact">
      <div className="paper-frame relative overflow-hidden rounded-md bg-card px-6 py-16 text-center sm:px-12 sm:py-20">
        <span
          aria-hidden
          className="pointer-events-none absolute -top-32 left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-accent/10 blur-3xl"
        />

        <div className="relative">
          <p className="paper-stamp paper-stamp-tilt">
            {t.default.contact.label.replace("// ", "")}
          </p>

          <h2 className="mx-auto mt-6 max-w-2xl font-serif text-4xl leading-tight font-bold tracking-tight sm:text-6xl">
            {t.default.contact.title}
          </h2>

          <p className="mx-auto mt-5 max-w-xl font-serif text-lg italic leading-relaxed text-muted sm:text-xl">
            {t.default.contact.description}
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <a
              href="mailto:drogan120@gmail.com"
              className="rounded border-2 border-accent bg-accent px-6 py-3 text-sm font-bold text-background transition-transform hover:-translate-y-0.5"
            >
              {t.default.nav.hire} →
            </a>
            <DownloadResume />
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-muted underline decoration-border underline-offset-8 transition-colors hover:text-accent hover:decoration-accent sm:text-sm"
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