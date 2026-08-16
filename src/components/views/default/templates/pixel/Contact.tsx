"use client";

import { useI18n } from "@/i18n";
import DownloadResume from "@/components/shared/DownloadResume";
import { Section } from "./Chrome";

const links = [
  { label: "GitHub", href: "https://github.com/drogan120" },
  { label: "Email", href: "mailto:drogan120@gmail.com" },
  { label: "LinkedIn", href: "https://linkedin.com/in/drogan120" },
];

export default function PixelContact() {
  const { t } = useI18n();

  return (
    <Section id="contact">
      <div className="pixel-frame relative overflow-hidden bg-card px-6 py-16 text-center sm:px-12 sm:py-20">
        <div className="relative">
          <p className="pixel-glow font-mono text-xs tracking-[0.3em] text-accent uppercase">
            {t.default.contact.label.replace("// ", "")}
          </p>

          <h2 className="mt-5 font-mono text-3xl leading-tight font-black tracking-tight text-foreground sm:text-5xl">
            {t.default.contact.title}
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
            {t.default.contact.description}
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <a
              href="mailto:drogan120@gmail.com"
              className="border-2 border-accent bg-accent px-6 py-3 text-sm font-black text-background shadow-[4px_4px_0_0_var(--accent-2)] transition-transform hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none"
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
                className="font-mono text-xs text-muted underline decoration-accent/40 underline-offset-8 transition-colors hover:text-accent hover:decoration-accent sm:text-sm"
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