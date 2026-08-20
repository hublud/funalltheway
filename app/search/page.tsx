"use client";

import React, { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useStore } from "@/lib/store";
import { MOCK_ARTICLES } from "@/data/mockArticles";
import { Article } from "@/types";
import { ArticleGrid } from "@/components/blog/ArticleGrid";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Search, Sparkles, Filter, X } from "lucide-react";

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialQuery = searchParams.get("q") || "";

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const { articles: storeArticles, isLoaded } = useStore();

  useEffect(() => {
    if (initialQuery) {
      setSearchQuery(initialQuery);
    }
  }, [initialQuery]);

  // Combine store articles and mock articles safely
  const allArticles = useMemo(() => {
    const combined = [...storeArticles];
    const existingSlugs = new Set(combined.map((a) => a.slug));
    for (const mock of MOCK_ARTICLES) {
      if (!existingSlugs.has(mock.slug)) {
        combined.push(mock);
      }
    }
    return combined;
  }, [storeArticles]);

  // Filter based on search query and category
  const filteredArticles = useMemo(() => {
    let list = allArticles;

    if (selectedCategory !== "all") {
      list = list.filter(
        (a) => a.categorySlug?.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    if (!searchQuery.trim()) {
      return list;
    }

    const q = searchQuery.toLowerCase().trim();
    return list.filter((article) => {
      const matchTitle = article.title?.toLowerCase().includes(q);
      const matchExcerpt = article.excerpt?.toLowerCase().includes(q);
      const matchCategory = article.category?.toLowerCase().includes(q);
      const matchAuthor = article.author?.name?.toLowerCase().includes(q);
      const matchContent = Array.isArray(article.content)
        ? article.content.some((p) => p.toLowerCase().includes(q))
        : false;

      return matchTitle || matchExcerpt || matchCategory || matchAuthor || matchContent;
    });
  }, [allArticles, searchQuery, selectedCategory]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const trendingTags = [
    "Wizkid",
    "Davido",
    "Burna Boy",
    "Nollywood",
    "Asake",
    "Rema",
    "Premier League",
    "Comedy",
    "Afrobeats",
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Search Results" },
        ]}
      />

      {/* Search Header Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-950 text-white p-6 sm:p-8 rounded-3xl shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-xs uppercase font-extrabold tracking-widest text-yellow-300">
          <Search className="w-4 h-4" /> Real-Time Article Search
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          {initialQuery ? (
            <>
              Search Results for: <span className="text-yellow-300">&ldquo;{initialQuery}&rdquo;</span>
            </>
          ) : (
            "Explore Stories, Entertainment & Releases"
          )}
        </h1>

        {/* Live Search Form */}
        <form
          onSubmit={handleSearchSubmit}
          className="relative flex items-center bg-white rounded-2xl shadow-lg p-2 max-w-3xl"
        >
          <div className="pl-3 pr-2 text-slate-400">
            <Search className="w-5 h-5" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Nigerian news, music, celebrity gist, videos..."
            className="w-full py-2 px-1 text-sm sm:text-base text-slate-900 placeholder-slate-400 focus:outline-none"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="p-1.5 text-slate-400 hover:text-slate-600 rounded-full mr-2"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm uppercase tracking-wider px-6 py-2.5 rounded-xl transition-all shrink-0 cursor-pointer shadow-sm active:scale-95"
          >
            Search
          </button>
        </form>

        {/* Quick Trending Tags */}
        <div className="flex items-center flex-wrap gap-2 pt-1 text-xs">
          <span className="text-blue-200 font-bold flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" /> Popular:
          </span>
          {trendingTags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => {
                setSearchQuery(tag);
                router.push(`/search?q=${encodeURIComponent(tag)}`);
              }}
              className="px-2.5 py-1 rounded-lg bg-white/15 hover:bg-white/30 text-white text-xs font-semibold transition-colors"
            >
              #{tag}
            </button>
          ))}
        </div>
      </div>

      {/* Category Filter Pills & Results Count */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 text-xs">
          <span className="font-bold text-slate-500 flex items-center gap-1 shrink-0 mr-1">
            <Filter className="w-3.5 h-3.5" /> Filter:
          </span>
          {[
            { label: "All Categories", slug: "all" },
            { label: "News", slug: "news" },
            { label: "Entertainment", slug: "entertainment" },
            { label: "Music", slug: "music" },
            { label: "Celebrity", slug: "celebrity" },
            { label: "Comedy", slug: "comedy" },
            { label: "Sports", slug: "sports" },
            { label: "Jobs", slug: "jobs" },
            { label: "Lifestyle", slug: "lifestyle" },
          ].map((cat) => (
            <button
              key={cat.slug}
              onClick={() => setSelectedCategory(cat.slug)}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all shrink-0 ${
                selectedCategory === cat.slug
                  ? "bg-blue-600 text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="text-xs font-bold text-slate-600 shrink-0">
          Showing <span className="text-blue-600 font-extrabold">{filteredArticles.length}</span>{" "}
          {filteredArticles.length === 1 ? "story" : "stories"}
        </div>
      </div>

      {/* Results Grid */}
      <ArticleGrid
        articles={filteredArticles}
        columns={3}
        showLoadMore={false}
        isLoading={!isLoaded}
      />
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="p-12 text-center text-slate-400 animate-pulse text-sm">
          Loading Search Desk...
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  );
}
