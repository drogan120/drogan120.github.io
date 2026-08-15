# Drogan Portfolio

Portofolio pribadi **Drogan** — Software Engineer & Android Developer.
Dibangun dengan **Next.js (App Router) + TypeScript + Tailwind CSS**, dan di-deploy sebagai situs statis ke **GitHub Pages**.

## Fitur

- **2 tampilan (view)**: `default` (portofolio simple) dan `apiDocs` (gaya dokumentasi API) — bisa di-switch via SettingsBar
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
│   └── themes/             # token warna per tema (dark.css, light.css)
├── components/
│   ├── providers/          # ThemeProvider, ViewProvider, Providers
│   ├── shared/             # SettingsBar (view/theme/bahasa switcher)
│   └── views/
│       ├── default/        # tampilan portofolio simple
│       └── api-docs/       # tampilan gaya dokumentasi API
├── hooks/                  # useLocalStorage
└── i18n/                   # en.ts, id.ts, ja.ts + I18nProvider
```

## Kustomisasi

- **Teks per bahasa**: edit `src/i18n/en.ts`, `id.ts`, `ja.ts` (struktur harus sama)
- **Tambah view baru**: buat folder di `src/components/views/`, lalu daftarkan di `ViewProvider` & `SettingsBar`
- **Warna tema**: ubah token di `src/app/themes/dark.css` dan `light.css`
- **Konten proyek/skills**: edit dictionary di `src/i18n/*.ts`
