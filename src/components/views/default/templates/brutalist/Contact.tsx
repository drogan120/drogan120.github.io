import { useI18n } from "@/i18n";

const links = [
  { label: "GitHub", href: "https://github.com/drogan120" },
  { label: "Email", href: "mailto:drogan120@gmail.com" },
  { label: "LinkedIn", href: "https://linkedin.com/in/drogan120" },
];

export default function BrutalistContact() {
  const { t } = useI18n();

  return (
    <section id="contact" className="border-b-4 border-foreground">
      <div className="mx-auto max-w-6xl px-6 py-12 md:py-20">
        <div className="border-2 border-foreground bg-accent p-10 text-center md:p-16">
          <p className="font-mono text-xs font-black uppercase text-background">
            [{t.default.contact.label}]
          </p>
          <h2 className="mt-3 text-4xl font-black uppercase leading-none tracking-tight text-background sm:text-6xl">
            {t.default.contact.title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm font-medium text-background/80">
            {t.default.contact.description}
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-background bg-background px-6 py-3 font-mono text-sm font-black uppercase text-accent transition-all hover:bg-transparent hover:text-background"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
