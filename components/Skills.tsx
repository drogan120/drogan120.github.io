const skillGroups = [
  {
    title: "Mobile",
    skills: ["Kotlin", "Java", "Jetpack Compose", "Android SDK", "Flutter"],
  },
  {
    title: "Web",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Node.js"],
  },
  {
    title: "Backend & Database",
    skills: ["Node.js", "PostgreSQL", "MySQL", "Firebase", "REST API"],
  },
  {
    title: "Tools & Lainnya",
    skills: ["Git", "GitHub Actions", "Docker", "Figma", "Linux"],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="border-y border-border bg-card/40">
      <div className="mx-auto max-w-5xl px-6 py-24">
        <p className="font-mono text-sm text-accent">// keahlian</p>
        <h2 className="mt-2 text-3xl font-bold">Yang Saya Kuasai</h2>

        <div className="mt-10 grid gap-8 md:grid-cols-2">
          {skillGroups.map((group) => (
            <div key={group.title}>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted">
                {group.title}
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-border bg-background px-3.5 py-1.5 text-sm transition-colors hover:border-accent hover:text-accent"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
