const projects = [
  {
    title: "Aplikasi Android Pertama",
    description:
      "Aplikasi Android sederhana untuk mencatat catatan harian, dibangun dengan Kotlin dan Jetpack Compose.",
    tags: ["Kotlin", "Jetpack Compose"],
    icon: "📱",
  },
  {
    title: "Portofolio Website",
    description:
      "Website portofolio personal ini, dibangun dengan Next.js dan TypeScript, di-deploy ke GitHub Pages.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    icon: "⚡",
  },
  {
    title: "REST API Sederhana",
    description:
      "API CRUD untuk manajemen data sederhana menggunakan Node.js dan database PostgreSQL.",
    tags: ["Node.js", "PostgreSQL"],
    icon: "🛠️",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-5xl px-6 py-24">
      <p className="font-mono text-sm text-accent">// proyek</p>
      <h2 className="mt-2 text-3xl font-bold">Proyek Saya</h2>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {projects.map((project) => (
          <a
            key={project.title}
            href="#projects"
            className="group flex flex-col rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-accent/50 hover:shadow-lg hover:shadow-accent/5"
          >
            <span className="text-3xl">{project.icon}</span>
            <h3 className="mt-4 text-lg font-semibold transition-colors group-hover:text-accent">
              {project.title}
            </h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
              {project.description}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border px-3 py-1 text-xs text-muted"
                >
                  {tag}
                </span>
              ))}
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
