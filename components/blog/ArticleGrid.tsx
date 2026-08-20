"use client";

import React, { useState } from "react";
import { Newspaper, Loader2, ArrowRight } from "lucide-react";
import { Article } from "@/types";
import { ArticleCard } from "./ArticleCard";
import { Button } from "../ui/Button";

interface ArticleGridProps {
  articles: Article[];
  title?: string;
  subtitle?: string;
  initialCount?: number;
  showLoadMore?: boolean;
  columns?: 2 | 3 | 4 | 5;
  isLoading?: boolean;
}

export const ArticleGrid: React.FC<ArticleGridProps> = ({
  articles,
  title = "LATEST NEWS",
  subtitle = "Fresh Entertainment & Culture Updates",
  initialCount = 10,
  showLoadMore = true,
  columns = 5,
  isLoading = false,
}) => {
  const [displayCount, setDisplayCount] = useState(initialCount);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const displayedArticles = articles.slice(0, displayCount);
  const hasMore = displayCount < articles.length;

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setDisplayCount((prev) => prev + 5);
      setIsLoadingMore(false);
    }, 400);
  };

  const colClasses = {
    2: "grid grid-cols-2 gap-3 sm:gap-4",
    3: "grid grid-cols-2 sm:grid-cols-3 gap-3.5 sm:gap-5",
    4: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5 sm:gap-4 lg:gap-5",
    5: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-4 lg:gap-5",
  }[columns];

  return (
    <section className="mb-10" suppressHydrationWarning>
      {/* Section Title */}
      {title && (
        <div className="flex items-center justify-between mb-5 border-b-2 border-blue-600 pb-2">
          <div className="flex items-center space-x-2">
            <div className="w-2.5 h-6 bg-blue-600 rounded-xs" />
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <Newspaper className="w-5 h-5 text-blue-600" />
              {title}
            </h2>
          </div>
          {subtitle && (
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider hidden sm:inline">
              {subtitle}
            </span>
          )}
        </div>
      )}

      {/* Grid */}
      {isLoading ? (
        <div className={colClasses}>
          {[1, 2, 3, 4, 5].map((n) => (
            <div
              key={n}
              className="aspect-[3/4] sm:aspect-[4/5] rounded-3xl bg-slate-200 animate-pulse border border-slate-300 flex flex-col justify-end p-4 space-y-2"
            >
              <div className="h-4 bg-slate-300 rounded w-3/4" />
              <div className="h-3 bg-slate-300 rounded w-1/2" />
            </div>
          ))}
        </div>
      ) : displayedArticles.length > 0 ? (
        <div className={colClasses}>
          {displayedArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200 p-10 text-center space-y-3 shadow-xs">
          <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
            <Newspaper className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-800">No Stories Published Yet</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Ready to publish breaking Nigerian entertainment news, Afrobeats releases, and trending gist?
          </p>
          <div className="pt-2">
            <a
              href="/admin/posts/new"
              className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl uppercase tracking-wider transition-transform active:scale-95 shadow-sm"
            >
              <span>+ Create First Article</span>
            </a>
          </div>
        </div>
      )}

      {/* Load More Button */}
      {showLoadMore && hasMore && !isLoading && (
        <div className="mt-8 text-center">
          <Button
            onClick={handleLoadMore}
            disabled={isLoadingMore}
            variant="outline"
            className="px-8 py-3 font-bold text-xs uppercase tracking-wider rounded-full shadow-xs"
          >
            {isLoadingMore ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                LOADING STORIES...
              </>
            ) : (
              <>
                LOAD MORE STORIES
                <ArrowRight className="w-4 h-4 ml-1" />
              </>
            )}
          </Button>
        </div>
      )}
    </section>
  );
};
