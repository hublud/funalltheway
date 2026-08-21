import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Article } from "@/types";
import { BlogImage } from "../ui/BlogImage";

interface ArticleCardProps {
  article: Article;
  className?: string;
  showExcerpt?: boolean;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  className = "",
}) => {
  return (
    <article
      className={`group relative overflow-hidden rounded-3xl border-2 sm:border-[3px] border-white/90 bg-slate-900 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 aspect-[3/4] sm:aspect-[4/5] flex flex-col justify-end ${className}`}
    >
      {/* Full-bleed background image */}
      <Link
        href={`/article/${article.slug}`}
        className="absolute inset-0 w-full h-full block overflow-hidden"
      >
        <BlogImage
          src={article.image}
          alt={article.title}
          fill={true}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Dark subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 via-45% to-transparent transition-opacity group-hover:via-black/55" />
      </Link>

      {/* Top category pill badge */}
      <div className="absolute top-3 left-3 z-10 pointer-events-none">
        <span className="bg-black/40 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-xs">
          {article.category}
        </span>
      </div>

      {/* Top right quick-link icon */}
      <Link
        href={`/article/${article.slug}`}
        className="absolute top-3 right-3 z-10 w-7 h-7 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-blue-600 hover:border-blue-600 shadow-xs"
        aria-label={`Read ${article.title}`}
      >
        <ArrowUpRight className="w-4 h-4" />
      </Link>

      {/* Bottom overlay text content */}
      <div className="relative z-10 p-3.5 sm:p-4 text-white pointer-events-auto">
        <Link href={`/article/${article.slug}`} className="block">
          <h3 className="text-sm sm:text-base md:text-lg font-black text-white leading-tight tracking-tight drop-shadow-md line-clamp-2 group-hover:text-blue-200 transition-colors">
            {article.title}
          </h3>
        </Link>

        {/* Publication info / Read button */}
        <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-white/15">
          <div className="text-[11px] sm:text-xs font-bold text-slate-300 drop-shadow-sm truncate">
            <span>{article.publishedAt}</span>
          </div>

          <Link
            href={`/article/${article.slug}`}
            className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider bg-white/15 hover:bg-blue-600 text-white px-2.5 py-0.5 rounded-full border border-white/25 transition-colors shrink-0"
          >
            READ
          </Link>
        </div>
      </div>
    </article>
  );
};
