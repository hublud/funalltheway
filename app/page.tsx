"use client";

import React from "react";
import { SearchBar } from "@/components/search/SearchBar";
import { FeaturedSection } from "@/components/blog/FeaturedSection";
import { ArticleGrid } from "@/components/blog/ArticleGrid";
import { ArticleCard } from "@/components/blog/ArticleCard";
import { TopLandscapeAd, DualPromoBanners } from "@/components/ads/CustomAdBanners";
import { useStore } from "@/lib/store";
import { Music, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  const { articles, isLoaded } = useStore();

  const featuredArticles = articles.filter((a) => a.featured);
  const latestArticles = articles;
  const musicArticles = articles.filter(
    (a) => a.categorySlug === "music" || a.categorySlug === "videos"
  );

  return (
    <div className="space-y-6">
      {/* 1. Top Landscape Advertisement Banner */}
      <TopLandscapeAd />

      {/* 2. Large Prominent Search Bar */}
      <SearchBar />

      {/* 3. Top Promotional Banners (Editing Services & Welcome Flyers) */}
      <DualPromoBanners placementTitle="TOP SPONSORED PROMOTIONS & EDITING SERVICES" />

      {/* 4. Featured Stories Section (if any featured articles exist) */}
      {featuredArticles.length > 0 && (
        <FeaturedSection articles={featuredArticles} />
      )}

      {/* 5. Full-Width Latest News Grid (2 cols mobile, 5 cols desktop) */}
      <ArticleGrid
        articles={latestArticles}
        title="LATEST NEWS & HAPPENINGS"
        subtitle="Real-time updates across Nigeria"
        columns={5}
        initialCount={10}
        showLoadMore={true}
        isLoading={!isLoaded}
      />

      {/* 6. Dedicated Category Spotlight: Music & Entertainment */}
      {musicArticles.length > 0 && (
        <section className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs">
          <div className="flex items-center justify-between pb-3 mb-5 border-b-2 border-blue-600">
            <div className="flex items-center space-x-2">
              <div className="w-2.5 h-6 bg-blue-600 rounded-xs" />
              <h3 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                <Music className="w-5 h-5 text-blue-600" />
                MUSIC, FREEBEATS & VIDEOS
              </h3>
            </div>
            <Link
              href="/music"
              className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 uppercase tracking-wider"
            >
              View All Music <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-4 lg:gap-5">
            {musicArticles.slice(0, 5).map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </section>
      )}

      {/* 7. Bottom Promotional Banners (Editing Services & Welcome Flyers) */}
      <DualPromoBanners placementTitle="FUN ALL THE WAY SERVICES & DIRECT CONTACT" />
    </div>
  );
}
