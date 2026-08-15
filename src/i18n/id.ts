import data from "@/data/id.json";
import type { Dictionary } from "./en";

const id: Dictionary = {
  theme: {
    dark: "Gelap",
    light: "Terang",
  },
  default: {
    nav: {
      about: "Tentang",
      skills: "Keahlian",
      experience: "Pengalaman",
      blog: "Blog",
      gallery: "Gallery",
      projects: "Proyek",
      contact: "Kontak",
      hire: "Hire Me",
    },
    hero: {
      badge: "Selamat datang di portofolio saya",
      hello: "Halo, saya",
      tagline: data.default.hero.tagline,
      viewProjects: "Lihat Proyek",
      contactMe: "Hubungi Saya",
      available: "Tersedia untuk kerja",
      role1: data.default.hero.role1,
      role2: data.default.hero.role2,
    },
    about: {
      label: "// tentang saya",
      title: "Sekilas Tentang Saya",
      cards: data.default.about.cards,
      paragraph: data.default.about.paragraph,
    },
    skills: {
      label: "// keahlian",
      title: "Yang Saya Kuasai",
      groups: data.default.skills.groups,
    },
    experience: {
      label: "// pengalaman",
      title: "Perjalanan Saya",
      items: data.default.experience.items,
    },
    stats: {
      title: "Angka-angka singkat",
      items: data.default.stats,
    },
    achievements: {
      label: "// pencapaian",
      title: "Pencapaian",
      items: data.default.achievements.items,
    },
    hobbies: {
      label: "// hobi",
      title: "Di Luar Coding",
      items: data.default.hobbies.items,
    },
    github: {
      label: "// github",
      title: "GitHub",
      description: "Statistik singkat dari profil GitHub saya.",
      repos: "Repositori",
      stars: "Bintang",
      followers: "Pengikut",
      contributions: "Kontribusi",
      viewProfile: "Lihat Profil",
    },
    blog: {
      label: "// blog",
      title: "Tulisan",
      description:
        "Alasan di balik tools yang saya pakai — bahasa, platform, dan pertimbangannya.",
      filterLanguage: "Bahasa",
      filterTag: "Tag",
      readMore: "Baca",
      empty: "Tidak ada tulisan yang cocok dengan filter ini.",
      showing: "tulisan",
      viewAll: "Lihat semua tulisan",
      readFull: "Baca artikel lengkap",
      preview: "Pratinjau",
    },
    gallery: {
      label: "// galeri",
      title: "Tangkapan Layar Aplikasi",
      description: "Sekilas aplikasi yang pernah saya buat.",
      view: "Lihat",
      items: data.default.gallery.items,
    },
    resume: {
      download: "Download Resume",
      printHeading: "Drogan — Resume",
    },
    projects: {
      label: "// proyek",
      title: "Proyek Saya",
      items: data.default.projects.items,
    },
    contact: {
      label: "// kontak",
      title: "Mari Berkolaborasi Bersama",
      description: data.default.contact.description,
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
      curl: data.apiDocs.hero.curl,
      data: data.apiDocs.hero.data,
    },
    about: {
      response: "Respons 200",
      data: data.apiDocs.about.data,
    },
    skills: {
      response: "Respons 200",
      data: data.apiDocs.skills.data,
    },
    projects: {
      response: "Respons 200",
      description: data.apiDocs.projects.description,
      data: data.apiDocs.projects.data,
    },
    experience: {
      response: "Respons 200",
      description: data.apiDocs.experience.description,
      data: data.apiDocs.experience.data,
    },
    stats: {
      response: "Respons 200",
      description: data.apiDocs.stats.description,
      data: data.apiDocs.stats.data,
    },
    achievements: {
      response: "Respons 200",
      description: data.apiDocs.achievements.description,
      data: data.apiDocs.achievements.data,
    },
    hobbies: {
      response: "Respons 200",
      description: data.apiDocs.hobbies.description,
      data: data.apiDocs.hobbies.data,
    },
    github: {
      response: "Respons 200",
      description: data.apiDocs.github.description,
      data: data.apiDocs.github.data,
    },
    blog: {
      response: "Respons 200",
      description: data.apiDocs.blog.description,
    },
    gallery: {
      response: "Respons 200",
      description: data.apiDocs.gallery.description,
      data: data.apiDocs.gallery.data,
    },
    contact: {
      description: data.apiDocs.contact.description,
      requestBody: "Request Body",
      response: "Respons",
      waiting: "Menunggu request...",
      sent: data.apiDocs.contact.sent,
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
