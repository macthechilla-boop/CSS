import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
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
  metadataBase: new URL("https://christianseemann.space"),
  title: {
    default: "Christian Silvester Seemann — Immersive Media Artist",
    template: "%s | Christian Silvester Seemann",
  },
  description:
    "Immersive installations, glitch-driven portraits, and sustainability-focused media art by Christian Silvester Seemann.",
  keywords: [
    "Christian Silvester Seemann",
    "immersive media art",
    "glitch art",
    "data art",
    "interactive installation",
    "portfolio",
    "sustainability art",
  ],
  authors: [{ name: "Christian Silvester Seemann", url: "https://christianseemann.space" }],
  creator: "Christian Silvester Seemann",
  applicationName: "Christian Silvester Seemann Portfolio",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "https://christianseemann.space",
    siteName: "Christian Silvester Seemann",
    title: "Christian Silvester Seemann — Immersive Media Artist",
    description:
      "Immersive installations, glitch-driven portraits, and sustainability-focused media art by Christian Silvester Seemann.",
    images: [
      {
        url: "https://christianseemann.space/new-ecologies/IMG_8259.jpeg",
        width: 1200,
        height: 800,
        alt: "Glitching Carlowitz immersive projection artwork",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Christian Silvester Seemann — Immersive Media Artist",
    description:
      "Immersive installations, glitch-driven portraits, and sustainability-focused media art by Christian Silvester Seemann.",
    images: ["https://christianseemann.space/new-ecologies/IMG_8259.jpeg"],
    creator: "@christianseemann",
  },
  robots: {
    index: true,
    follow: true,
  },
  category: "portfolio",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#010409",
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Christian Silvester Seemann",
  url: "https://christianseemann.space",
  email: "mailto:christian@seemann.space",
  jobTitle: "Immersive Media Artist",
  image: "https://christianseemann.space/new-ecologies/IMG_8259.jpeg",
  knowsAbout: [
    "immersive installation",
    "sustainability",
    "glitch art",
    "data visualization",
  ],
  sameAs: ["https://christianseemann.space"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Script
          id="ld-person"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
