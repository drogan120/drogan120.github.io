import data from "@/data/ja.json";
import type { Dictionary } from "./en";

const ja: Dictionary = {
  theme: {
    dark: "ダーク",
    light: "ライト",
  },
  default: {
    nav: {
      about: "自己紹介",
      skills: "スキル",
      experience: "経験",
      projects: "プロジェクト",
      contact: "お問い合わせ",
      hire: "採用する",
    },
    hero: {
      badge: "私のポートフォリオへようこそ",
      hello: "こんにちは、",
      tagline: data.default.hero.tagline,
      viewProjects: "プロジェクトを見る",
      contactMe: "お問い合わせ",
      available: "仕事の相談を受付中",
      role1: data.default.hero.role1,
      role2: data.default.hero.role2,
    },
    about: {
      label: "// 自己紹介",
      title: "私について",
      cards: data.default.about.cards,
      paragraph: data.default.about.paragraph,
    },
    skills: {
      label: "// スキル",
      title: "得意分野",
      groups: data.default.skills.groups,
    },
    experience: {
      label: "// 経験",
      title: "歩み",
      items: data.default.experience.items,
    },
    stats: {
      title: "数字で見る",
      items: data.default.stats,
    },
    achievements: {
      label: "// 実績",
      title: "実績",
      items: data.default.achievements.items,
    },
    hobbies: {
      label: "// 趣味",
      title: "コードの外側",
      items: data.default.hobbies.items,
    },
    projects: {
      label: "// プロジェクト",
      title: "プロジェクト",
      items: data.default.projects.items,
    },
    contact: {
      label: "// お問い合わせ",
      title: "一緒に仕事をしませんか",
      description: data.default.contact.description,
    },
    footer: {
      rights: "All rights reserved.",
    },
  },
  apiDocs: {
    version: "v1.0.0",
    intro: "はじめに",
    hello: "$ hello",
    endpoints: "エンドポイント",
    ping: "$ ping drogan.dev",
    pong: "pong · 200 OK",
    hero: {
      curl: data.apiDocs.hero.curl,
      data: data.apiDocs.hero.data,
    },
    about: {
      response: "レスポンス 200",
      data: data.apiDocs.about.data,
    },
    skills: {
      response: "レスポンス 200",
      data: data.apiDocs.skills.data,
    },
    projects: {
      response: "レスポンス 200",
      description: data.apiDocs.projects.description,
      data: data.apiDocs.projects.data,
    },
    experience: {
      response: "レスポンス 200",
      description: data.apiDocs.experience.description,
      data: data.apiDocs.experience.data,
    },
    stats: {
      response: "レスポンス 200",
      description: data.apiDocs.stats.description,
      data: data.apiDocs.stats.data,
    },
    achievements: {
      response: "レスポンス 200",
      description: data.apiDocs.achievements.description,
      data: data.apiDocs.achievements.data,
    },
    hobbies: {
      response: "レスポンス 200",
      description: data.apiDocs.hobbies.description,
      data: data.apiDocs.hobbies.data,
    },
    contact: {
      description: data.apiDocs.contact.description,
      requestBody: "リクエストボディ",
      response: "レスポンス",
      waiting: "リクエスト待機中...",
      sent: data.apiDocs.contact.sent,
      fields: {
        name: "name",
        email: "email",
        message: "message",
      },
      altEndpoints: "// 直接のエンドポイント",
      post: "POST",
    },
  },
};

export default ja;
