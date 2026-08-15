# Drogan Portfolio

Portofolio pribadi **Drogan** — Software Engineer & Android Developer.
Dibangun dengan **Next.js (App Router) + TypeScript + Tailwind CSS**, dan di-deploy sebagai situs statis ke **GitHub Pages**.

## Fitur

- **3 tampilan (view)**: `default`, `apiDocs` (gaya dokumentasi API), `terminal` (interaktif) — di-switch via SettingsBar
- **3 template di view default**: `minimal`, `playful`, `classic` — di-switch via TemplateSwitcher
- **Dark / Light mode** — tersimpan di localStorage
- **3 bahasa**: English (default), Indonesia, 日本語 — tersimpan di localStorage

## Tech Stack

- [Next.js](https://nextjs.org) (static export)
- TypeScript
- Tailwind CSS
- pnpm (package manager)

## Menjalankan di Lokal

```bash
pnpm install     # install dependencies
pnpm dev         # dev server di http://localhost:3000
pnpm lint        # cek eslint
pnpm build       # build static ke folder out/
pnpm deploy      # build + tambah .nojekyll (untuk GitHub Pages)
```

## Deploy ke GitHub Pages

Ada 2 cara:

1. **Automatis (disarankan)** — Setelah push ke branch `main`, GitHub Actions
   (`.github/workflows/deploy.yml`) otomatis build dan deploy ke Pages.
   Aktifkan dulu di repo: *Settings → Pages → Source: GitHub Actions*.

2. **Manual** — Jalankan `pnpm deploy`, lalu upload isi folder `out/` ke branch `gh-pages`.

## Struktur

```
src/
├── app/                    # layout & halaman utama
│   └── themes/             # palettes.css (5 color scheme × dark/light)
├── components/
│   ├── providers/          # Theme, ColorScheme, Template, I18n providers
│   ├── shared/             # SettingsBar (template/theme/color/bahasa switcher)
│   └── views/
│       ├── default/        # 7 template: minimal, playful, classic, brutalist, fashion, pastel, glass
│       ├── api-docs/       # tampilan gaya dokumentasi API
│       └── terminal/       # tampilan terminal interaktif
├── data/                   # en.json, id.json, ja.json (data pribadi per bahasa)
├── hooks/                  # useLocalStorage
└── i18n/                   # en.ts, id.ts, ja.ts + I18nProvider
```

## Kustomisasi

- **Teks per bahasa**: edit `src/i18n/en.ts`, `id.ts`, `ja.ts` (struktur harus sama)
- **Data pribadi**: edit `src/data/en.json`, `id.json`, `ja.json` (nama, tagline, about, skills, projects, contact)
- **Tambah template baru**: buat folder di `src/components/views/default/templates/`, lalu daftarkan di `TemplateProvider` & `SettingsBar`
- **Warna/color scheme**: ubah token di `src/app/themes/palettes.css` (5 palet × dark/light)
- **Konten proyek/skills**: edit `src/data/*.json`
