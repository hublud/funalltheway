import React from "react";
import Link from "next/link";
import { TrendingUp, Clock } from "lucide-react";
import { Article } from "@/types";
import { BlogImage } from "../ui/BlogImage";

interface PopularPostsProps {
  articles: Article[];
  className?: string;
}

export const PopularPosts: React.FC<PopularPostsProps> = ({ articles, className = "" }) => {
  return (
    <div className={`bg-white rounded-lg border border-slate-200 p-5 shadow-xs ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between pb-3 mb-4 border-b-2 border-blue-600">
        <h3 className="text-base font-black text-slate-900 uppercase tracking-wide flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-blue-600" />
          POPULAR STORIES
        </h3>
        <span className="text-[10px] uppercase font-bold text-slate-400">TRENDING</span>
      </div>

      {/* List */}
      <div className="space-y-4">
        {articles.map((article, index) => (
          <div key={article.id} className="group flex items-start gap-3 relative pb-3 border-b border-slate-100 last:border-0 last:pb-0">
            {/* Number Rank Badge */}
            <span className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-black shrink-0 ${
              index === 0
                ? "bg-rose-600 text-white"
                : index === 1
                ? "bg-blue-600 text-white"
                : index === 2
                ? "bg-amber-500 text-white"
                : "bg-slate-100 text-slate-600"
            }`}>
              {index + 1}
            </span>

            {/* Thumbnail */}
            <Link
              href={`/article/${article.slug}`}
              className="w-16 h-14 rounded overflow-hidden shrink-0 relative block"
            >
              <BlogImage
                src={article.image}
                alt={article.title}
                aspectRatio="square"
                className="w-full h-full"
              />
            </Link>

            {/* Details */}
            <div className="flex-1 min-w-0">
              <Link href={`/article/${article.slug}`}>
                <h4 className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-blue-600 transition-colors line-clamp-2 leading-tight">
                  {article.title}
                </h4>
              </Link>
              <div className="flex items-center gap-2 mt-1 text-[10px] text-slate-400">
                <span className="font-medium text-blue-600">{article.category}</span>
                {article.publishedAt && (
                  <>
                    <span>•</span>
                    <span>{article.publishedAt}</span>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
