import { useI18n } from "@/i18n";

const links = [
  { label: "GitHub", href: "https://github.com/drogan120" },
  { label: "Email", href: "mailto:drogan120@gmail.com" },
  { label: "LinkedIn", href: "https://linkedin.com/in/drogan120" },
];

export default function PastelContact() {
  const { t } = useI18n();

  return (
    <section id="contact" className="mx-auto max-w-5xl px-6 py-24">
      <div className="rounded-[2.5rem] bg-gradient-to-br from-pink-100/60 via-purple-100/60 to-pink-100/60 p-12 text-center sm:p-16 dark:from-pink-400/20 dark:via-purple-400/20 dark:to-purple-400/20 dark:ring-1 dark:ring-white/10">
        <p className="font-mono text-sm text-purple-400 dark:text-purple-300">
          {t.default.contact.label}
        </p>
        <h2 className="mt-3 text-4xl font-bold text-slate-700 dark:text-purple-50">
          {t.default.contact.title}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-slate-500 dark:text-purple-100/60">
          {t.default.contact.description}
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-white px-7 py-3 font-medium text-slate-600 shadow-sm ring-1 ring-slate-200 transition-transform hover:scale-105 dark:bg-white/10 dark:text-purple-100 dark:ring-white/10"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
