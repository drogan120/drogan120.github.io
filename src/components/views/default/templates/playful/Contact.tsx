import { useI18n } from "@/i18n";

const links = [
  { label: "GitHub", href: "https://github.com/drogan120" },
  { label: "Email", href: "mailto:drogan120@gmail.com" },
  { label: "LinkedIn", href: "https://linkedin.com/in/drogan120" },
];

export default function PlayfulContact() {
  const { t } = useI18n();

  return (
    <section id="contact">
      <div className="mx-auto max-w-5xl px-6 py-16 md:py-24 text-center">
        <p className="font-mono text-sm text-accent">
          {t.default.contact.label}
        </p>
        <h2 className="mt-2 text-4xl font-extrabold tracking-tight">
          {t.default.contact.title}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-muted">
          {t.default.contact.description}
        </p>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl border-2 border-border bg-background px-6 py-3 font-medium transition-all hover:scale-105 hover:border-accent hover:text-accent"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
