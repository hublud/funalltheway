import React from "react";
import { Sparkles } from "lucide-react";
import { Article } from "@/types";
import { ArticleCard } from "./ArticleCard";

interface RelatedPostsProps {
  articles: Article[];
  currentArticleId: string;
}

export const RelatedPosts: React.FC<RelatedPostsProps> = ({
  articles,
  currentArticleId,
}) => {
  const filtered = articles
    .filter((a) => a.id !== currentArticleId)
    .slice(0, 3);

  if (filtered.length === 0) return null;

  return (
    <section className="mt-12 pt-8 border-t-2 border-slate-200">
      <div className="flex items-center space-x-2 mb-6">
        <div className="w-2.5 h-6 bg-blue-600 rounded-xs" />
        <h3 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-blue-600" />
          RELATED STORIES
        </h3>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 sm:gap-5">
        {filtered.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </section>
  );
};
