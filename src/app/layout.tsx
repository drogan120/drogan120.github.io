import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import { Providers } from "@/components/providers/Providers";
import {
  ScrollProgressBar,
  BackToTop,
} from "@/components/shared/PageChrome";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-serif",
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
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var s=localStorage.getItem('drogan.scheme')||'mauve';var t=localStorage.getItem('drogan.theme')||'dark';var r=document.documentElement;r.classList.add('scheme-'+s);r.classList.add(t);}catch(e){document.documentElement.classList.add('dark');}})();`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <ScrollProgressBar />
        <BackToTop />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
