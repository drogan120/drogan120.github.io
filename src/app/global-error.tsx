"use client";

/**
 * Last-resort boundary: it replaces the root layout, so the theme tokens and
 * the class-setting script are gone. Everything here is inline-styled with
 * literal colours so it renders even when nothing else does.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="id">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 20,
          padding: 24,
          textAlign: "center",
          background: "#0b0b0f",
          color: "#f4f4f5",
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
        }}
      >
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: "30%",
            background: "linear-gradient(160deg, #a78bfa, #f472b6)",
          }}
        />

        <h1 style={{ margin: 0, fontSize: 24, fontWeight: 700 }}>
          Aplikasi gagal dimuat
        </h1>

        <p
          style={{
            margin: 0,
            maxWidth: 420,
            fontSize: 14,
            lineHeight: 1.6,
            color: "#a1a1aa",
          }}
        >
          Terjadi kesalahan fatal saat memuat halaman. Muat ulang untuk mencoba
          lagi.
        </p>

        <button
          type="button"
          onClick={reset}
          style={{
            border: 0,
            borderRadius: 9999,
            padding: "10px 20px",
            fontSize: 14,
            fontWeight: 600,
            color: "#0b0b0f",
            background: "#a78bfa",
            cursor: "pointer",
          }}
        >
          Muat Ulang
        </button>

        {error.digest && (
          <p
            style={{
              margin: 0,
              fontFamily: "ui-monospace, monospace",
              fontSize: 12,
              color: "#71717a",
              wordBreak: "break-all",
            }}
          >
            digest: {error.digest}
          </p>
        )}
      </body>
    </html>
  );
}
