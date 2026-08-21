import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { TopAdBanner } from "@/components/ads/TopAdBanner";
import { Header } from "@/components/layout/Header";
import { IconCategoryNav } from "@/components/navigation/IconCategoryNav";
import { SecondaryCategoryNav } from "@/components/navigation/SecondaryCategoryNav";
import { WhatsAppServicesBanner } from "@/components/navigation/WhatsAppServicesBanner";
import { Footer } from "@/components/layout/Footer";
import { siteConfig } from "@/data/siteConfig";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Nigerian Entertainment, Music, Visual Editing & Services`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Nigerian entertainment",
    "Afrobeats music mp3",
    "Celebrity gist Nigeria",
    "Nollywood movies",
    "Viral comedy skits",
    "Super Eagles sports news",
    "Jobs in Nigeria",
    "AI Editing Nigeria",
    "Before and After photo editing",
    "Picture and video photoshoot Lagos",
    "Professional Graphic Design",
    "DJ Mixtapes download",
    "Edited pictures and visual retouching",
    "Edited videos and content creation",
    "Nigerian creative media agency",
  ],
  authors: [{ name: "Fun All The Way Limited Editorial Team", url: siteConfig.url }],
  creator: "Fun All The Way Limited",
  publisher: "Fun All The Way Limited",
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
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${siteConfig.name} | Nigerian Entertainment, Music, Celebrity Gist & Creative Media`,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    creator: "@funalltheway",
  },
  icons: {
    icon: "/favicon.ico",
  },
  category: "entertainment",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google tag (gtag.js) */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-YY5HR8RQKB"
          strategy="afterInteractive"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-YY5HR8RQKB');
            `,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900 antialiased selection:bg-blue-600 selection:text-white">
        {/* Top 728x90 Ad Banner */}
        <TopAdBanner />

        {/* Brand Header */}
        <Header />

        {/* Primary Icon Category Navigation */}
        <IconCategoryNav />

        {/* Secondary Pipe Category Navigation */}
        <SecondaryCategoryNav />

        {/* WhatsApp Direct Services Action Banner */}
        <WhatsAppServicesBanner />

        {/* Page Content */}
        <main className="flex-1 w-full max-w-6xl mx-auto px-4 py-6">
          {children}
        </main>

        {/* Site Footer */}
        <Footer />
      </body>
    </html>
  );
}
