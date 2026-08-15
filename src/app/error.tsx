"use client";

import { useEffect } from "react";
import Link from "next/link";

/**
 * Route-level error boundary. Kept free of context hooks on purpose: if a
 * provider is what threw, calling its hook here would crash the boundary too.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

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
        <p className="bg-gradient-to-r from-accent to-accent-2 bg-clip-text pb-1 font-mono text-5xl leading-tight font-bold text-transparent sm:text-6xl">
          500
        </p>
        <h1 className="text-2xl font-bold sm:text-3xl">Ada yang error</h1>
        <p className="mx-auto max-w-md text-sm leading-relaxed text-muted sm:text-base">
          Maaf, terjadi kesalahan tak terduga. Coba muat ulang bagian ini — biasanya
          langsung beres.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={reset}
          className="rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-background transition-transform hover:scale-105"
        >
          Coba Lagi
        </button>
        <Link
          href="/"
          className="rounded-full border border-border px-5 py-2.5 text-sm font-semibold transition-colors hover:border-accent hover:text-accent"
        >
          Kembali ke Beranda
        </Link>
      </div>

      {error.digest && (
        <p className="font-mono text-xs break-all text-muted">
          digest: {error.digest}
        </p>
      )}
    </main>
  );
}
