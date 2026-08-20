import React from "react";
import { Flame } from "lucide-react";
import { Article } from "@/types";
import { ArticleCard } from "./ArticleCard";

interface FeaturedSectionProps {
  articles: Article[];
}

export const FeaturedSection: React.FC<FeaturedSectionProps> = ({ articles }) => {
  if (!articles || articles.length === 0) return null;

  const displayArticles = articles.slice(0, 5);

  return (
    <section className="mb-10">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-5 border-b-2 border-blue-600 pb-2">
        <div className="flex items-center space-x-2">
          <div className="w-2.5 h-6 bg-blue-600 rounded-xs" />
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Flame className="w-5 h-5 text-rose-600 animate-pulse" />
            FEATURED STORIES
          </h2>
        </div>
        <span className="text-xs font-bold text-blue-600 uppercase tracking-wider hidden sm:inline">
          TOP CURATED HEADLINES
        </span>
      </div>

      {/* Grid: 2 columns on mobile, 5 columns on desktop */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-4 lg:gap-5">
        {displayArticles.map((story) => (
          <ArticleCard key={story.id} article={story} />
        ))}
      </div>
    </section>
  );
};
