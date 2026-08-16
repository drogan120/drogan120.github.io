"use client";

import { useI18n } from "@/i18n";
import DownloadResume from "@/components/shared/DownloadResume";
import { Section } from "./Chrome";

const links = [
  { label: "GitHub", href: "https://github.com/drogan120" },
  { label: "Email", href: "mailto:drogan120@gmail.com" },
  { label: "LinkedIn", href: "https://linkedin.com/in/drogan120" },
];

export default function AuroraContact() {
  const { t } = useI18n();

  return (
    <Section id="contact">
      <div className="relative overflow-hidden rounded-[2rem] border border-border bg-card/60 px-6 py-16 text-center backdrop-blur-xl sm:px-12 sm:py-20">
        {/* Accent wash anchored to the top edge, so the CTA feels lit from
            above rather than uniformly tinted. */}
        <span
          aria-hidden
          className="pointer-events-none absolute -top-32 left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-accent/20 blur-3xl"
        />

        <div className="relative">
          <p className="font-mono text-xs tracking-[0.25em] text-accent uppercase">
            {t.default.contact.label.replace("// ", "")}
          </p>

          <h2 className="mx-auto mt-5 max-w-2xl bg-gradient-to-br from-foreground via-foreground to-accent bg-clip-text pb-1 text-3xl leading-tight font-bold tracking-tight text-transparent sm:text-5xl">
            {t.default.contact.title}
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
            {t.default.contact.description}
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <a
              href="mailto:drogan120@gmail.com"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-background transition-transform hover:scale-105"
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
