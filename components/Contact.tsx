const contactLinks = [
  {
    label: "GitHub",
    value: "github.com/drogan120",
    href: "https://github.com/drogan120",
  },
  {
    label: "Email",
    value: "drogan120@gmail.com",
    href: "mailto:drogan120@gmail.com",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/drogan120",
    href: "https://linkedin.com/in/drogan120",
  },
];

export default function Contact() {
  return (
    <section id="contact" className="border-t border-border">
      <div className="mx-auto max-w-5xl px-6 py-24 text-center">
        <p className="font-mono text-sm text-accent">// kontak</p>
        <h2 className="mt-2 text-3xl font-bold">
          Mari Berkolaborasi Bersama
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-muted">
          Punya proyek, ide, atau sekadar ingin mengobrol tentang teknologi?
          Jangan ragu untuk menghubungi saya.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          {contactLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-border px-6 py-3 text-sm transition-colors hover:border-accent hover:text-accent"
            >
              {link.value}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
