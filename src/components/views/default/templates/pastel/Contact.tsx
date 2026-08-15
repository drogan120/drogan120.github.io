import { useI18n } from "@/i18n";

const links = [
  { label: "GitHub", href: "https://github.com/drogan120" },
  { label: "Email", href: "mailto:drogan120@gmail.com" },
  { label: "LinkedIn", href: "https://linkedin.com/in/drogan120" },
];

export default function PastelContact() {
  const { t } = useI18n();

  return (
    <section id="contact" className="mx-auto max-w-5xl px-6 py-20">
      <div className="overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-pink-100 via-purple-100 to-sky-100 p-12 text-center sm:p-16">
        <p className="font-mono text-sm text-purple-400">
          {t.default.contact.label}
        </p>
        <h2 className="mt-3 text-4xl font-bold text-slate-700">
          {t.default.contact.title}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-slate-500">
          {t.default.contact.description}
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-white px-7 py-3 font-medium text-slate-600 shadow-sm ring-1 ring-slate-200 transition-transform hover:scale-105"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
