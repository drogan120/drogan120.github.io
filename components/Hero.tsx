export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 flex justify-center">
        <div className="h-[500px] w-[800px] rounded-full bg-accent/10 blur-[120px]" />
      </div>

      <div className="relative mx-auto flex max-w-5xl flex-col items-center px-6 pt-24 pb-20 text-center">
        <span className="mb-6 rounded-full border border-border bg-card px-4 py-1.5 text-xs text-muted">
          👋 Halo, selamat datang di portofolio saya
        </span>

        <h1 className="text-4xl font-bold leading-tight sm:text-6xl">
          Halo, saya{" "}
          <span className="bg-gradient-to-r from-accent to-accent-2 bg-clip-text text-transparent">
            Drogan
          </span>
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-muted">
          Software Engineer & Android Developer. Saya membangun aplikasi yang
          cepat, modern, dan menyenangkan untuk dipakai.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#projects"
            className="rounded-full bg-accent px-6 py-3 font-medium text-background transition-transform hover:scale-105"
          >
            Lihat Proyek
          </a>
          <a
            href="#contact"
            className="rounded-full border border-border px-6 py-3 font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
          >
            Hubungi Saya
          </a>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-center gap-x-10 gap-y-6 text-muted">
          <span className="flex items-center gap-2 font-mono text-sm">
            <span className="h-2 w-2 animate-pulse rounded-full bg-accent" />
            Available untuk kerja
          </span>
          <span className="hidden font-mono text-sm sm:block">
            software engineer
          </span>
          <span className="hidden font-mono text-sm sm:block">
            android developer
          </span>
        </div>
      </div>
    </section>
  );
}
