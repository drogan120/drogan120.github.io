import { useI18n } from "@/i18n";

export default function MinimalContact() {
  const { t } = useI18n();

  const links = [
    { label: "GitHub", href: "https://github.com/drogan120" },
    { label: "Email", href: "mailto:drogan120@gmail.com" },
    { label: "LinkedIn", href: "https://linkedin.com/in/drogan120" },
  ];

  return (
    <section id="contact" className="mx-auto max-w-5xl px-6 py-16 md:py-24 text-center">
      <p className="font-mono text-sm text-accent">
        {t.default.contact.label}
      </p>
      <h2 className="mt-3 text-3xl font-bold">{t.default.contact.title}</h2>
      <p className="mx-auto mt-4 max-w-xl text-muted">
        {t.default.contact.description}
      </p>

      <div className="mt-12 flex flex-wrap items-center justify-center gap-8">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-sm text-muted underline decoration-border underline-offset-8 transition-colors hover:text-accent hover:decoration-accent"
          >
            {link.label}
          </a>
        ))}
      </div>
    </section>
  );
}
