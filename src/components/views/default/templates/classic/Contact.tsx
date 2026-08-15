import { useI18n } from "@/i18n";

const stats = [
  { value: "3+", label: "Projects" },
  { value: "2+", label: "Years Coding" },
  { value: "∞", label: "Curiosity" },
];

const links = [
  { label: "GitHub", href: "https://github.com/drogan120" },
  { label: "Email", href: "mailto:drogan120@gmail.com" },
  { label: "LinkedIn", href: "https://linkedin.com/in/drogan120" },
];

export default function ClassicContact() {
  const { t } = useI18n();

  return (
    <section id="contact" className="mx-auto max-w-5xl px-6 py-24 text-center">
      <p className="font-mono text-sm text-accent">
        {t.default.contact.label}
      </p>
      <h2 className="mt-2 text-3xl font-bold">{t.default.contact.title}</h2>
      <p className="mx-auto mt-4 max-w-xl text-muted">
        {t.default.contact.description}
      </p>

      <div className="mt-12 grid grid-cols-3 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-border bg-card p-6"
          >
            <p className="text-3xl font-bold text-accent">{stat.value}</p>
            <p className="mt-1 text-sm text-muted">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl border border-border bg-card px-6 py-3 font-medium transition-colors hover:border-accent hover:text-accent"
          >
            {link.label}
          </a>
        ))}
      </div>
    </section>
  );
}
