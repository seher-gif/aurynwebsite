import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Optimize font loading with display swap
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: {
    default: "Auryn Dijital - Veri Odaklı Dijital Pazarlama & SEO",
    template: "%s | Auryn Dijital",
  },
  description: "SEO, Google Ads ve sosyal medya stratejileriyle işletmenizin büyüme potansiyelini açığa çıkarıyoruz.",
  keywords: ["SEO", "dijital pazarlama", "Google Ads", "sosyal medya yönetimi", "içerik pazarlaması", "Antalya"],
  authors: [{ name: "Auryn Dijital" }],
  creator: "Auryn Dijital",
  publisher: "Auryn Dijital",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://auryndijital.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Auryn Dijital - Veri Odaklı Dijital Pazarlama & SEO",
    description: "SEO, Google Ads ve sosyal medya stratejileriyle işletmenizin büyüme potansiyelini açığa çıkarıyoruz.",
    url: "https://auryndijital.com",
    siteName: "Auryn Dijital",
    locale: "tr_TR",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    card: "summary_large_image",
    title: "Auryn Dijital - Veri Odaklı Dijital Pazarlama & SEO",
    description: "SEO, Google Ads ve sosyal medya stratejileriyle işletmenizin büyüme potansiyelini açığa çıkarıyoruz.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
