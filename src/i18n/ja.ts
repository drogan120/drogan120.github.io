import type { Dictionary } from "./en";

const ja: Dictionary = {
  view: {
    default: "デフォルト",
    apiDocs: "API ドキュメント",
  },
  theme: {
    dark: "ダーク",
    light: "ライト",
  },
  default: {
    nav: {
      about: "自己紹介",
      skills: "スキル",
      projects: "プロジェクト",
      contact: "お問い合わせ",
      hire: "採用する",
    },
    hero: {
      badge: "私のポートフォリオへようこそ",
      hello: "こんにちは、",
      tagline:
        "ソフトウェアエンジニア & Android デベロッパー。高速でモダンで楽しいアプリを開発しています。",
      viewProjects: "プロジェクトを見る",
      contactMe: "お問い合わせ",
      available: "仕事の相談を受付中",
      role1: "ソフトウェアエンジニア",
      role2: "android デベロッパー",
    },
    about: {
      label: "// 自己紹介",
      title: "私について",
      cards: [
        {
          title: "ソフトウェアエンジニア",
          description:
            "クリーンでスケーラブル、メンテナンスしやすいアーキテクチャで Web アプリとバックエンドを構築しています。",
        },
        {
          title: "Android デベロッパー",
          description:
            "レスポンシブで滑らか、ユーザー体験を重視したネイティブ Android アプリを開発しています。",
        },
        {
          title: "問題解決者",
          description:
            "複雑な問題をシンプルで効率的な解決策に変えるのが得意です。",
        },
      ],
      paragraph:
        "私は Drogan、Android と Web 開発に焦点を当てたソフトウェアエンジニアです。テクノロジーへの大きな好奇心から始まり、今では多くの人に使われるデジタルプロダクトを開発しています。テクノロジーは常に進化し続けるため、学び続けることを大切にしています。",
    },
    skills: {
      label: "// スキル",
      title: "得意分野",
      groups: [
        {
          title: "モバイル",
          skills: ["Kotlin", "Java", "Jetpack Compose", "Android SDK", "Flutter"],
        },
        {
          title: "Web",
          skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Node.js"],
        },
        {
          title: "バックエンド & データベース",
          skills: ["Node.js", "PostgreSQL", "MySQL", "Firebase", "REST API"],
        },
        {
          title: "ツール & その他",
          skills: ["Git", "GitHub Actions", "Docker", "Figma", "Linux"],
        },
      ],
    },
    projects: {
      label: "// プロジェクト",
      title: "プロジェクト",
      items: [
        {
          title: "最初の Android アプリ",
          description:
            "Kotlin と Jetpack Compose で作られた、日々のメモを残すためのシンプルな Android アプリ。",
          tags: ["Kotlin", "Jetpack Compose"],
          icon: "📱",
        },
        {
          title: "ポートフォリオサイト",
          description:
            "このポートフォリオサイト。Next.js と TypeScript で構築し、GitHub Pages にデプロイ。",
          tags: ["Next.js", "TypeScript", "Tailwind CSS"],
          icon: "⚡",
        },
        {
          title: "シンプルな REST API",
          description:
            "Node.js と PostgreSQL を使用したシンプルなデータ管理用 CRUD API。",
          tags: ["Node.js", "PostgreSQL"],
          icon: "🛠️",
        },
      ],
    },
    contact: {
      label: "// お問い合わせ",
      title: "一緒に仕事をしませんか",
      description:
        "プロジェクトのアイデアや技術に関するお話など、お気軽にご連絡ください。",
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
      curl: "curl -X GET https://drogan.dev/api/v1/intro",
      data: {
        status: 200,
        message: "こんにちは、世界！",
        name: "Drogan",
        role: "ソフトウェアエンジニア & Android デベロッパー",
        focus: [
          "Android アプリ (Kotlin, Jetpack Compose)",
          "Web アプリ (Next.js, TypeScript)",
          "クリーンでスケーラブルなアーキテクチャ",
        ],
        available_for_work: true,
      },
    },
    about: {
      response: "レスポンス 200",
      data: {
        name: "Drogan",
        title: "ソフトウェアエンジニア & Android デベロッパー",
        experience: "高速でモダンで楽しいアプリを開発",
        traits: ["問題解決", "学び続ける", "クリーンコードの提唱"],
      },
    },
    skills: {
      response: "レスポンス 200",
      data: [
        {
          category: "モバイル",
          skills: ["Kotlin", "Java", "Jetpack Compose", "Android SDK", "Flutter"],
        },
        {
          category: "Web",
          skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Node.js"],
        },
        {
          category: "バックエンド & データベース",
          skills: ["Node.js", "PostgreSQL", "MySQL", "Firebase", "REST API"],
        },
        {
          category: "ツール & その他",
          skills: ["Git", "GitHub Actions", "Docker", "Figma", "Linux"],
        },
      ],
    },
    projects: {
      response: "レスポンス 200",
      description:
        "取り組んでいる・完了したプロジェクトの一覧。データは配列として返されます。",
      data: [
        {
          id: 1,
          name: "aplikasi-catatan",
          description: "日々のメモを残すための Android アプリ。",
          tech: ["Kotlin", "Jetpack Compose"],
          status: "done",
        },
        {
          id: 2,
          name: "portfolio-website",
          description: "このサイト自体 — 静的 & GitHub Pages にデプロイ。",
          tech: ["Next.js", "TypeScript", "Tailwind CSS"],
          status: "live",
        },
        {
          id: 3,
          name: "rest-api-basic",
          description: "データ管理用のシンプルな CRUD API。",
          tech: ["Node.js", "PostgreSQL"],
          status: "in_progress",
        },
      ],
    },
    contact: {
      description:
        "プロジェクトのアイデアや技術に関するお話など、下のエンドポイントにリクエストを送ってください。通常 24 時間以内に返信します。",
      requestBody: "リクエストボディ",
      response: "レスポンス",
      waiting: "リクエスト待機中...",
      sent: {
        status: 200,
        message: "メッセージを送信しました！",
        note: "通常 24 時間以内に返信します。",
      },
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
