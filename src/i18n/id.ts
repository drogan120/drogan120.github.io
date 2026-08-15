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
