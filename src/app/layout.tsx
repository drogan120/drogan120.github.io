import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import { Providers } from "@/components/providers/Providers";
import {
  ScrollProgressBar,
  BackToTop,
} from "@/components/shared/PageChrome";
import Preloader from "@/components/shared/Preloader";
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

const SITE_URL = "https://drogan120.github.io";
const TITLE = "Drogan — Software Engineer & Android Developer";
const DESCRIPTION =
  "Portofolio Drogan. Software Engineer dan Android Developer yang membangun aplikasi mobile dan web yang cepat, modern, dan menyenangkan untuk dipakai.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s — Drogan",
  },
  description: DESCRIPTION,
  applicationName: "Drogan Portfolio",
  authors: [{ name: "Drogan", url: SITE_URL }],
  creator: "Drogan",
  keywords: [
    "Drogan",
    "software engineer",
    "android developer",
    "kotlin",
    "jetpack compose",
    "typescript",
    "next.js",
    "python",
    "portfolio",
  ],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: "Drogan Portfolio",
    locale: "id_ID",
    alternateLocale: ["en_US", "ja_JP"],
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: TITLE,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og.png"],
  },
  category: "technology",
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: "Drogan",
      alternateName: "drogan120",
      url: SITE_URL,
      image: `${SITE_URL}/og.png`,
      jobTitle: "Software Engineer & Android Developer",
      description: DESCRIPTION,
      knowsLanguage: ["id", "en", "ja"],
      knowsAbout: [
        "Android development",
        "Kotlin",
        "Jetpack Compose",
        "TypeScript",
        "Next.js",
        "Python",
      ],
      sameAs: ["https://github.com/drogan120"],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Drogan Portfolio",
      description: DESCRIPTION,
      inLanguage: ["id", "en", "ja"],
      publisher: { "@id": `${SITE_URL}/#person` },
    },
  ],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />
        <noscript>
          <style>{`.reveal{opacity:1!important;transform:none!important}.preloader{display:none!important}.card-in{opacity:1!important;animation:none!important}`}</style>
        </noscript>
      </head>
      <body className="min-h-full flex flex-col">
        <Preloader />
        <ScrollProgressBar />
        <BackToTop />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
