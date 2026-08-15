import type { Dictionary } from "./en";

const id: Dictionary = {
  view: {
    default: "Default",
    apiDocs: "API Docs",
  },
  theme: {
    dark: "Gelap",
    light: "Terang",
  },
  default: {
    nav: {
      about: "Tentang",
      skills: "Keahlian",
      projects: "Proyek",
      contact: "Kontak",
      hire: "Hire Me",
    },
    hero: {
      badge: "Selamat datang di portofolio saya",
      hello: "Halo, saya",
      tagline:
        "Software Engineer & Android Developer. Saya membangun aplikasi yang cepat, modern, dan menyenangkan untuk dipakai.",
      viewProjects: "Lihat Proyek",
      contactMe: "Hubungi Saya",
      available: "Tersedia untuk kerja",
      role1: "software engineer",
      role2: "android developer",
    },
    about: {
      label: "// tentang saya",
      title: "Sekilas Tentang Saya",
      cards: [
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
      ],
      paragraph:
        "Saya Drogan, seorang Software Engineer yang berfokus pada pengembangan aplikasi Android dan web. Perjalanan saya dimulai dari rasa ingin tahu yang besar terhadap teknologi, hingga kini membangun produk digital yang dipakai banyak orang. Saya selalu berusaha untuk terus belajar, karena teknologi tidak pernah berhenti berkembang.",
    },
    skills: {
      label: "// keahlian",
      title: "Yang Saya Kuasai",
      groups: [
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
      ],
    },
    projects: {
      label: "// proyek",
      title: "Proyek Saya",
      items: [
        {
          title: "Aplikasi Android Pertama",
          description:
            "Aplikasi Android sederhana untuk mencatat catatan harian, dibangun dengan Kotlin dan Jetpack Compose.",
          tags: ["Kotlin", "Jetpack Compose"],
          icon: "📱",
        },
        {
          title: "Website Portofolio",
          description:
            "Website portofolio pribadi ini, dibangun dengan Next.js dan TypeScript, di-deploy ke GitHub Pages.",
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
      ],
    },
    contact: {
      label: "// kontak",
      title: "Mari Berkolaborasi Bersama",
      description:
        "Punya proyek, ide, atau sekadar ingin mengobrol tentang teknologi? Jangan ragu untuk menghubungi saya.",
    },
    footer: {
      rights: "Semua hak dilindungi.",
    },
  },
  apiDocs: {
    version: "v1.0.0",
    intro: "Pendahuluan",
    hello: "$ hello",
    endpoints: "Endpoints",
    ping: "$ ping drogan.dev",
    pong: "pong · 200 OK",
    hero: {
      curl: "curl -X GET https://drogan.dev/api/v1/intro",
      data: {
        status: 200,
        message: "halo, dunia!",
        name: "Drogan",
        role: "Software Engineer & Android Developer",
        focus: [
          "Aplikasi Android (Kotlin, Jetpack Compose)",
          "Aplikasi web (Next.js, TypeScript)",
          "Arsitektur yang bersih & scalable",
        ],
        available_for_work: true,
      },
    },
    about: {
      response: "Respons 200",
      data: {
        name: "Drogan",
        title: "Software Engineer & Android Developer",
        experience:
          "Membangun aplikasi yang cepat, modern, dan menyenangkan untuk dipakai",
        traits: [
          "Problem solver",
          "Terus belajar",
          "Advokat clean code",
        ],
      },
    },
    skills: {
      response: "Respons 200",
      data: [
        {
          category: "Mobile",
          skills: ["Kotlin", "Java", "Jetpack Compose", "Android SDK", "Flutter"],
        },
        {
          category: "Web",
          skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Node.js"],
        },
        {
          category: "Backend & Database",
          skills: ["Node.js", "PostgreSQL", "MySQL", "Firebase", "REST API"],
        },
        {
          category: "Tools & Lainnya",
          skills: ["Git", "GitHub Actions", "Docker", "Figma", "Linux"],
        },
      ],
    },
    projects: {
      response: "Respons 200",
      description:
        "Daftar proyek yang sedang/sudah saya kerjakan. Kembalikan semua data dalam bentuk array.",
      data: [
        {
          id: 1,
          name: "aplikasi-catatan",
          description: "Aplikasi Android untuk mencatat catatan harian.",
          tech: ["Kotlin", "Jetpack Compose"],
          status: "done",
        },
        {
          id: 2,
          name: "portfolio-website",
          description: "Website ini sendiri — statis & di-deploy ke GitHub Pages.",
          tech: ["Next.js", "TypeScript", "Tailwind CSS"],
          status: "live",
        },
        {
          id: 3,
          name: "rest-api-basic",
          description: "API CRUD sederhana untuk manajemen data.",
          tech: ["Node.js", "PostgreSQL"],
          status: "in_progress",
        },
      ],
    },
    contact: {
      description:
        "Punya proyek, ide, atau sekadar ingin mengobrol tentang teknologi? Kirim request ke endpoint di bawah — saya biasanya merespons dalam 1×24 jam.",
      requestBody: "Request Body",
      response: "Respons",
      waiting: "Menunggu request...",
      sent: {
        status: 200,
        message: "Pesan terkirim!",
        note: "Biasanya dibalas dalam 1x24 jam.",
      },
      fields: {
        name: "name",
        email: "email",
        message: "message",
      },
      altEndpoints: "// alternatif endpoint langsung",
      post: "POST",
    },
  },
};

export default id;
