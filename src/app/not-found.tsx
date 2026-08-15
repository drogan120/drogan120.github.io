import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "404 — Halaman Tidak Ditemukan",
  description: "Halaman yang kamu cari tidak ada di portofolio ini.",
  robots: { index: false, follow: false },
};

/**
 * Static export turns this into 404.html. It deliberately avoids the theme
 * providers and i18n so it can still render if a route fails early — the CSS
 * tokens are already applied by the inline script in the root layout.
 */
export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 px-6 py-16 text-center">
      <div className="flex flex-col items-center gap-4">
        <div className="buddy buddy-lg buddy-float">
          <span className="buddy-eye buddy-eye-left" />
          <span className="buddy-eye buddy-eye-right" />
          <span className="buddy-mouth buddy-mouth-sad" />
        </div>
        <span className="buddy-shadow w-16 opacity-20" />
      </div>

      <div className="space-y-3">
        <p className="bg-gradient-to-r from-accent to-accent-2 bg-clip-text pb-1 font-mono text-6xl leading-tight font-bold text-transparent sm:text-7xl">
          404
        </p>
        <h1 className="text-2xl font-bold sm:text-3xl">Halaman ini nyasar</h1>
        <p className="mx-auto max-w-md text-sm leading-relaxed text-muted sm:text-base">
          Alamat yang kamu buka tidak ada. Mungkin salah ketik, atau halamannya
          sudah pindah.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-background transition-transform hover:scale-105"
        >
          Kembali ke Beranda
        </Link>
        <Link
          href="/blog"
          className="rounded-full border border-border px-5 py-2.5 text-sm font-semibold transition-colors hover:border-accent hover:text-accent"
        >
          Lihat Blog
        </Link>
      </div>

      <p className="font-mono text-xs text-muted">
        error 404 · route not found
      </p>
    </main>
  );
}
