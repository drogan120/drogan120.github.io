import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "@/components/providers/Providers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://drogan120.github.io"),
  title: "Drogan — Software Engineer & Android Developer",
  description:
    "Portofolio Drogan. Software Engineer dan Android Developer yang membangun aplikasi mobile dan web yang cepat, modern, dan menyenangkan untuk dipakai.",
  openGraph: {
    title: "Drogan — Software Engineer & Android Developer",
    description:
      "Portofolio Drogan. Software Engineer dan Android Developer.",
    url: "https://drogan120.github.io",
    siteName: "Drogan Portfolio",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="id"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
