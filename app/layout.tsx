import type { Metadata } from "next";
import "./globals.css";
import { TopAdBanner } from "@/components/ads/TopAdBanner";
import { Header } from "@/components/layout/Header";
import { IconCategoryNav } from "@/components/navigation/IconCategoryNav";
import { SecondaryCategoryNav } from "@/components/navigation/SecondaryCategoryNav";
import { Footer } from "@/components/layout/Footer";
import { siteConfig } from "@/data/siteConfig";

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} | Nigerian Entertainment, Music, Celebrity Gist & Comedy`,
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
  ],
  authors: [{ name: "Fun All The Way Limited Editorial Team" }],
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "en_NG",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900 antialiased selection:bg-blue-600 selection:text-white">
        {/* Top 728x90 Ad Banner */}
        <TopAdBanner />

        {/* Brand Header */}
        <Header />

        {/* Primary Icon Category Navigation */}
        <IconCategoryNav />

        {/* Secondary Pipe Category Navigation */}
        <SecondaryCategoryNav />

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
