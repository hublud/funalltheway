"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Search, X, ArrowUpRight, Newspaper, Flame, Clock } from "lucide-react";
import { useStore } from "@/lib/store";
import { MOCK_ARTICLES } from "@/data/mockArticles";
import { Article } from "@/types";

interface SearchBarProps {
  placeholder?: string;
  className?: string;
  initialQuery?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "Search articles, news, music, celebrities, jobs...",
  className = "",
  initialQuery = "",
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { articles: storeArticles } = useStore();

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

  // Live matching articles (max 5 in dropdown)
  const matches = useMemo(() => {
    if (!query.trim() || query.trim().length < 2) return [];
    const q = query.toLowerCase().trim();
    return allArticles
      .filter((article) => {
        const matchTitle = article.title?.toLowerCase().includes(q);
        const matchExcerpt = article.excerpt?.toLowerCase().includes(q);
        const matchCategory = article.category?.toLowerCase().includes(q);
        return matchTitle || matchExcerpt || matchCategory;
      })
      .slice(0, 5);
  }, [allArticles, query]);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setIsOpen(false);
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div
      ref={dropdownRef}
      className={`w-full max-w-4xl mx-auto px-4 py-2 relative z-30 ${className}`}
    >
      <form
        onSubmit={handleSearch}
        className="relative flex items-center bg-white rounded-2xl shadow-sm hover:shadow-md border-2 border-slate-300 focus-within:border-blue-600 focus-within:ring-4 focus-within:ring-blue-100 transition-all p-1.5"
      >
        <div className="pl-3 pr-2 text-slate-400">
          <Search className="w-5 h-5" />
        </div>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onFocus={() => setIsOpen(true)}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          placeholder={placeholder}
          className="w-full py-2 px-1 text-sm sm:text-base text-slate-900 bg-transparent placeholder-slate-400 focus:outline-none"
        />

        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              inputRef.current?.focus();
            }}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-full mr-2"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-xs sm:text-sm uppercase tracking-wider px-5 sm:px-8 py-2.5 rounded-xl transition-all shrink-0 shadow-sm cursor-pointer active:scale-95"
        >
          SEARCH
        </button>
      </form>

      {/* Live Dropdown Results */}
      {isOpen && query.trim().length >= 2 && (
        <div className="absolute left-4 right-4 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 z-50">
          {matches.length > 0 ? (
            <div className="divide-y divide-slate-100">
              <div className="px-4 py-2 bg-slate-50 flex items-center justify-between text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <span>Matching Stories ({matches.length})</span>
                <span className="text-blue-600">Live Preview</span>
              </div>

              {matches.map((article) => (
                <Link
                  key={article.id}
                  href={`/article/${article.slug}`}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 p-3 hover:bg-blue-50/70 transition-colors group"
                >
                  {/* Thumbnail */}
                  <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 bg-slate-100 relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 rounded-md bg-blue-100 text-blue-700 text-[10px] font-extrabold uppercase tracking-wider">
                        {article.category}
                      </span>
                      <span className="text-[10px] text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {article.publishedAt}
                      </span>
                    </div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 line-clamp-1 group-hover:text-blue-600 transition-colors">
                      {article.title}
                    </h4>
                  </div>

                  <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
                </Link>
              ))}

              {/* View All Matches Footer */}
              <button
                type="button"
                onClick={handleSearch}
                className="w-full p-3 text-center text-xs font-bold text-blue-600 hover:bg-blue-50 transition-colors flex items-center justify-center gap-1.5"
              >
                <span>View all search results for &ldquo;{query}&rdquo;</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <div className="p-6 text-center space-y-2">
              <Newspaper className="w-8 h-8 text-slate-300 mx-auto" />
              <p className="text-xs font-bold text-slate-700">
                No matching stories found for &ldquo;{query}&rdquo;
              </p>
              <p className="text-[11px] text-slate-400">
                Try searching for artist names like Wizkid, Davido, or general topics like Afrobeats or Nollywood.
              </p>
              <button
                type="button"
                onClick={handleSearch}
                className="mt-2 text-xs font-bold text-blue-600 hover:underline inline-block"
              >
                Search all articles anyway &rarr;
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
