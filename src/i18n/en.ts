import data from "@/data/en.json";

const en = {
  theme: {
    dark: "Dark",
    light: "Light",
  },
  default: {
    nav: {
      about: "About",
      skills: "Skills",
      experience: "Experience",
      blog: "Blog",
      gallery: "Gallery",
      projects: "Projects",
      contact: "Contact",
      hire: "Hire Me",
    },
    hero: {
      badge: "Welcome to my portfolio",
      hello: "Hi, I'm",
      tagline: data.default.hero.tagline,
      viewProjects: "View Projects",
      contactMe: "Contact Me",
      available: "Available for work",
      role1: data.default.hero.role1,
      role2: data.default.hero.role2,
    },
    about: {
      label: "// about me",
      title: "About Me",
      cards: data.default.about.cards,
      paragraph: data.default.about.paragraph,
    },
    skills: {
      label: "// skills",
      title: "What I Do",
      groups: data.default.skills.groups,
    },
    experience: {
      label: "// experience",
      title: "My Journey",
      items: data.default.experience.items,
    },
    stats: {
      title: "By the numbers",
      items: data.default.stats,
    },
    achievements: {
      label: "// achievements",
      title: "Achievements",
      items: data.default.achievements.items,
    },
    hobbies: {
      label: "// hobbies",
      title: "Beyond the Code",
      items: data.default.hobbies.items,
    },
    github: {
      label: "// github",
      title: "GitHub",
      description: "Pinned stats from my GitHub profile.",
      repos: "Repositories",
      stars: "Stars",
      followers: "Followers",
      contributions: "Contributions",
      viewProfile: "View Profile",
    },
    blog: {
      label: "// blog",
      title: "Writing",
      description:
        "Why I picked the tools I use — languages, platforms, and the reasoning behind them.",
      filterLanguage: "Language",
      filterTag: "Tag",
      readMore: "Read",
      empty: "No posts match this filter.",
      showing: "posts",
      viewAll: "View all posts",
      readFull: "Read full article",
      preview: "Preview",
    },
    gallery: {
      label: "// gallery",
      title: "App Screenshots",
      description: "A quick look at the apps I've built.",
      view: "View",
      items: data.default.gallery.items,
    },
    resume: {
      download: "Download Resume",
      printHeading: "Drogan — Resume",
    },
    projects: {
      label: "// projects",
      title: "My Projects",
      items: data.default.projects.items,
    },
    contact: {
      label: "// contact",
      title: "Let's Collaborate",
      description: data.default.contact.description,
    },
    footer: {
      rights: "All rights reserved.",
    },
  },
  apiDocs: {
    version: "v1.0.0",
    intro: "Introduction",
    hello: "$ hello",
    endpoints: "Endpoints",
    ping: "$ ping drogan.dev",
    pong: "pong · 200 OK",
    hero: {
      curl: data.apiDocs.hero.curl,
      data: data.apiDocs.hero.data,
    },
    about: {
      response: "Response 200",
      data: data.apiDocs.about.data,
    },
    skills: {
      response: "Response 200",
      data: data.apiDocs.skills.data,
    },
    projects: {
      response: "Response 200",
      description: data.apiDocs.projects.description,
      data: data.apiDocs.projects.data,
    },
    experience: {
      response: "Response 200",
      description: data.apiDocs.experience.description,
      data: data.apiDocs.experience.data,
    },
    stats: {
      response: "Response 200",
      description: data.apiDocs.stats.description,
      data: data.apiDocs.stats.data,
    },
    achievements: {
      response: "Response 200",
      description: data.apiDocs.achievements.description,
      data: data.apiDocs.achievements.data,
    },
    hobbies: {
      response: "Response 200",
      description: data.apiDocs.hobbies.description,
      data: data.apiDocs.hobbies.data,
    },
    github: {
      response: "Response 200",
      description: data.apiDocs.github.description,
      data: data.apiDocs.github.data,
    },
    blog: {
      response: "Response 200",
      description: data.apiDocs.blog.description,
    },
    gallery: {
      response: "Response 200",
      description: data.apiDocs.gallery.description,
      data: data.apiDocs.gallery.data,
    },
    contact: {
      description: data.apiDocs.contact.description,
      requestBody: "Request Body",
      response: "Response",
      waiting: "Waiting for request...",
      sent: data.apiDocs.contact.sent,
      fields: {
        name: "name",
        email: "email",
        message: "message",
      },
      altEndpoints: "// alternative direct endpoints",
      post: "POST",
    },
  },
};

export default en;
export type Dictionary = typeof en;
