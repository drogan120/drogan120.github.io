"use client";

import { useState } from "react";
import { useI18n } from "@/i18n";
import Json from "./Json";

const contactLinks = [
  {
    key: "github",
    value: "github.com/drogan120",
    href: "https://github.com/drogan120",
  },
  {
    key: "email",
    value: "drogan120@gmail.com",
    href: "mailto:drogan120@gmail.com",
  },
  {
    key: "linkedin",
    value: "linkedin.com/in/drogan120",
    href: "https://linkedin.com/in/drogan120",
  },
];

export default function Contact() {
  const { t } = useI18n();
  const [sent, setSent] = useState(false);

  return (
    <section id="contact" className="mx-auto max-w-4xl px-6 py-16">
      <div className="flex items-center gap-3">
        <span className="rounded-md bg-post/15 px-2.5 py-1 font-mono text-xs font-bold text-post">
          POST
        </span>
        <h2 className="font-mono text-xl font-semibold">/contact</h2>
      </div>

      <p className="mt-6 max-w-3xl leading-relaxed text-muted">
        {t.apiDocs.contact.description}
      </p>

      <div className="mt-8 grid gap-8 md:grid-cols-2">
        <div className="rounded-xl border border-border bg-card">
          <div className="flex items-center gap-2 border-b border-border px-4 py-2.5 font-mono text-xs text-muted">
            <span className="h-2.5 w-2.5 rounded-full bg-post" />
            {t.apiDocs.contact.requestBody}
          </div>
          <div className="space-y-4 p-4">
            <div>
              <label className="mb-1.5 block font-mono text-xs text-muted">
                {t.apiDocs.contact.fields.name}{" "}
                <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                placeholder="string"
                className="w-full rounded-lg border border-border bg-background px-3 py-2 font-mono text-sm transition-colors focus:border-accent"
              />
            </div>
            <div>
              <label className="mb-1.5 block font-mono text-xs text-muted">
                {t.apiDocs.contact.fields.email}{" "}
                <span className="text-red-400">*</span>
              </label>
              <input
                type="email"
                placeholder="string"
                className="w-full rounded-lg border border-border bg-background px-3 py-2 font-mono text-sm transition-colors focus:border-accent"
              />
            </div>
            <div>
              <label className="mb-1.5 block font-mono text-xs text-muted">
                {t.apiDocs.contact.fields.message}{" "}
                <span className="text-red-400">*</span>
              </label>
              <textarea
                rows={3}
                placeholder="string"
                className="w-full resize-none rounded-lg border border-border bg-background px-3 py-2 font-mono text-sm transition-colors focus:border-accent"
              />
            </div>
            <button
              onClick={() => setSent(true)}
              className="w-full rounded-lg bg-post px-5 py-2.5 font-mono text-sm font-bold text-background transition-transform hover:scale-[1.02]"
            >
              {t.apiDocs.contact.post}
            </button>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card">
          <div className="border-b border-border px-4 py-2.5 font-mono text-xs text-muted">
            {t.apiDocs.contact.response} {sent ? "200" : "—"}
          </div>
          {sent ? (
            <Json data={t.apiDocs.contact.sent} />
          ) : (
            <pre className="p-4 font-mono text-sm text-muted">
              {"{"}
              <span className="block pl-4">
                {t.apiDocs.contact.waiting}
              </span>
              {"}"}
            </pre>
          )}
        </div>

        <div className="md:col-span-2">
          <p className="mb-3 font-mono text-xs text-muted">
            {t.apiDocs.contact.altEndpoints}
          </p>
          <div className="flex flex-wrap gap-3">
            {contactLinks.map((link) => (
              <a
                key={link.key}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="min-w-0 rounded-lg border border-border px-4 py-2 font-mono text-sm text-foreground transition-colors hover:border-accent hover:text-accent"
              >
                <span className="mr-2 text-muted">{link.key}:</span>
                <span className="break-all">{link.value}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
