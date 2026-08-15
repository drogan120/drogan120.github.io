import { useI18n } from "@/i18n";

const links = [
  { label: "GitHub", href: "https://github.com/drogan120" },
  { label: "Email", href: "mailto:drogan120@gmail.com" },
  { label: "LinkedIn", href: "https://linkedin.com/in/drogan120" },
];

export default function FashionContact() {
  const { t } = useI18n();

  return (
    <section id="contact" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-8 py-28 text-center">
        <p className="text-xs uppercase tracking-[0.4em] text-accent">
          {t.default.contact.label}
        </p>
        <h2 className="mx-auto mt-8 max-w-3xl font-serif text-4xl font-light leading-tight sm:text-6xl">
          {t.default.contact.title}
        </h2>
        <p className="mx-auto mt-8 max-w-xl text-sm leading-loose text-muted">
          {t.default.contact.description}
        </p>

        <div className="mx-auto mt-14 flex max-w-lg flex-col gap-8">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between border-b border-border pb-3 transition-colors hover:border-accent"
            >
              <span className="text-xs uppercase tracking-[0.3em] text-muted transition-colors group-hover:text-foreground">
                {link.label}
              </span>
              <span className="font-serif text-lg font-light text-accent transition-transform group-hover:translate-x-1">
                →
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
