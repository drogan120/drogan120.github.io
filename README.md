# Drogan Portfolio

Portofolio pribadi **Drogan** — Software Engineer & Android Developer.
Dibangun dengan **Next.js (App Router) + TypeScript + Tailwind CSS**, dan di-deploy sebagai situs statis ke **GitHub Pages**.

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
app/           # layout & halaman utama
components/    # Navbar, Hero, About, Skills, Projects, Contact, Footer
public/        # aset statis
```

## Kustomisasi

- **Konten profil**: edit `components/About.tsx`, `Hero.tsx`
- **Proyek**: tambah/edit di `components/Projects.tsx`
- **Link kontak**: edit `components/Contact.tsx`
- **Warna tema**: ubah variabel `--accent`, `--background`, dll di `app/globals.css`
