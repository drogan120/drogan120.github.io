import { useI18n } from "@/i18n";

const links = [
  { label: "GitHub", href: "https://github.com/drogan120" },
  { label: "Email", href: "mailto:drogan120@gmail.com" },
  { label: "LinkedIn", href: "https://linkedin.com/in/drogan120" },
];

export default function GlassContact() {
  const { t } = useI18n();

  return (
    <section id="contact" className="mx-auto max-w-5xl px-6 py-16 md:py-24">
      <div className="rounded-[2.5rem] border border-white/15 bg-white/10 p-12 text-center backdrop-blur-xl sm:p-16">
        <p className="font-mono text-sm text-accent">{t.default.contact.label}</p>
        <h2 className="mt-3 text-4xl font-bold">{t.default.contact.title}</h2>
        <p className="mx-auto mt-4 max-w-xl text-muted">
          {t.default.contact.description}
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/20 bg-white/10 px-7 py-3 font-medium backdrop-blur-md transition-all hover:border-accent/50 hover:text-accent"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
