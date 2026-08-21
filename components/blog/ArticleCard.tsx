import React from "react";
import Link from "next/link";
import { ArrowUpRight, Play, Film, Images } from "lucide-react";
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
  const isVideo =
    article.image?.match(/\.(mp4|webm|mov|mkv|avi|3gp)$/i) ||
    article.image?.includes("/videos/") ||
    article.mediaList?.some((m) => m.type === "video");

  const hasMultipleMedia = article.mediaList && article.mediaList.length > 1;

  return (
    <article
      className={`group relative overflow-hidden rounded-3xl border-2 sm:border-[3px] border-white/90 bg-slate-900 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 aspect-[3/4] sm:aspect-[4/5] flex flex-col justify-end ${className}`}
    >
      {/* Full-bleed background media */}
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

      {/* Top badges */}
      <div className="absolute top-3 left-3 z-10 pointer-events-none flex items-center gap-1.5">
        <span className="bg-black/40 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-xs">
          {article.category}
        </span>

        {isVideo && (
          <span className="bg-indigo-600/80 backdrop-blur-md border border-indigo-400/30 text-white text-[10px] font-black px-2 py-1 rounded-full uppercase tracking-wider shadow-xs flex items-center gap-1">
            <Play className="w-2.5 h-2.5 fill-current" /> Video
          </span>
        )}

        {hasMultipleMedia && !isVideo && (
          <span className="bg-blue-600/80 backdrop-blur-md border border-blue-400/30 text-white text-[10px] font-black px-2 py-1 rounded-full uppercase tracking-wider shadow-xs flex items-center gap-1">
            <Images className="w-2.5 h-2.5" /> +{article.mediaList!.length}
          </span>
        )}
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

        {/* Action / Read button */}
        <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-white/15">
          <span className="text-[10px] text-slate-300 font-medium truncate max-w-[120px]">
            {article.author?.name || "Editor"}
          </span>

          <Link
            href={`/article/${article.slug}`}
            className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider bg-white/15 hover:bg-blue-600 text-white px-2.5 py-0.5 rounded-full border border-white/25 transition-colors shrink-0 flex items-center gap-1"
          >
            <span>{isVideo ? "WATCH / READ" : "READ"}</span>
            <ArrowUpRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </article>
  );
};
