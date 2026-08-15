const facts = [
  {
    title: "Software Engineer",
    description:
      "Membangun aplikasi web dan backend dengan arsitektur yang bersih, scalable, dan mudah dipelihara.",
  },
  {
    title: "Android Developer",
    description:
      "Mengembangkan aplikasi Android native yang responsif, mulus, dan berfokus pada pengalaman pengguna.",
  },
  {
    title: "Problem Solver",
    description:
      "Senang memecahkan masalah kompleks menjadi solusi yang sederhana dan efisien.",
  },
];

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-5xl px-6 py-24">
      <p className="font-mono text-sm text-accent">// tentang saya</p>
      <h2 className="mt-2 text-3xl font-bold">Sekilas Tentang Saya</h2>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {facts.map((fact) => (
          <div
            key={fact.title}
            className="rounded-2xl border border-border bg-card p-6 transition-colors hover:border-accent/50"
          >
            <h3 className="text-lg font-semibold text-accent">{fact.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {fact.description}
            </p>
          </div>
        ))}
      </div>

      <p className="mt-10 max-w-3xl leading-relaxed text-muted">
        Saya Drogan, seorang Software Engineer yang berfokus pada pengembangan
        aplikasi Android dan web. Perjalanan saya dimulai dari rasa ingin tahu
        yang besar terhadap teknologi, hingga kini membangun produk digital
        yang dipakai banyak orang. Saya selalu berusaha untuk terus belajar,
        karena teknologi tidak pernah berhenti berkembang.
      </p>
    </section>
  );
}
