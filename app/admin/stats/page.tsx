"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { useStore } from "@/lib/store";
import {
  BarChart3,
  TrendingUp,
  Calendar,
  Clock,
  FileText,
  FolderTree,
  Eye,
  Plus,
  Search,
  ExternalLink,
  Flame,
  AlertTriangle,
  CheckCircle2,
  ArrowUpRight,
  Sparkles,
  Layers,
  Activity,
  ArrowDown,
  ArrowUp,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Category, Article } from "@/types";

type Timeframe = "all" | "today" | "weekly" | "monthly";
type SortOption = "posts_desc" | "daily_desc" | "weekly_desc" | "monthly_desc" | "views_desc" | "name_asc";

// Helper to parse date from article
function getArticleDate(article: Article): Date {
  if (article.createdAt) {
    const d = new Date(article.createdAt);
    if (!isNaN(d.getTime())) return d;
  }
  if (article.publishedAt && article.publishedAt !== "Recent") {
    const d = new Date(article.publishedAt);
    if (!isNaN(d.getTime())) return d;
  }
  if (article.id && article.id.startsWith("post_")) {
    const ts = parseInt(article.id.replace("post_", ""), 10);
    if (!isNaN(ts) && ts > 1000000000) return new Date(ts);
  }
  return new Date();
}

export default function AdminStatsPage() {
  const { categories, articles } = useStore();
  const [timeframe, setTimeframe] = useState<Timeframe>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("posts_desc");

  const now = useMemo(() => new Date(), []);

  // Compute stats per category
  const categoryStats = useMemo(() => {
    const oneDayMs = 24 * 60 * 60 * 1000;
    const sevenDaysMs = 7 * oneDayMs;
    const thirtyDaysMs = 30 * oneDayMs;

    return categories.map((cat) => {
      const cName = (cat.name || "").toLowerCase().trim();
      const cSlug = (cat.slug || "").toLowerCase().trim();

      // Find all articles belonging to this category
      const catArticles = articles.filter((a) => {
        const artCat = (a.category || "").toLowerCase().trim();
        const artSlug = (a.categorySlug || "").toLowerCase().trim();
        return artCat === cName || artSlug === cSlug || artCat === cSlug;
      });

      let dailyCount = 0;
      let weeklyCount = 0;
      let monthlyCount = 0;
      let totalViews = 0;

      catArticles.forEach((art) => {
        const artDate = getArticleDate(art);
        const diffMs = now.getTime() - artDate.getTime();

        if (diffMs <= oneDayMs || artDate.toDateString() === now.toDateString()) {
          dailyCount++;
        }
        if (diffMs <= sevenDaysMs) {
          weeklyCount++;
        }
        if (diffMs <= thirtyDaysMs) {
          monthlyCount++;
        }

        totalViews += art.views || 0;
      });

      const totalPosts = catArticles.length;
      const sharePercentage = articles.length > 0 ? (totalPosts / articles.length) * 100 : 0;

      // Status indicator
      let activityStatus: "high" | "moderate" | "low" | "empty" = "low";
      if (totalPosts === 0) activityStatus = "empty";
      else if (weeklyCount >= 3 || totalPosts >= 10) activityStatus = "high";
      else if (weeklyCount >= 1 || monthlyCount >= 2 || totalPosts >= 3) activityStatus = "moderate";

      return {
        ...cat,
        totalPosts,
        dailyCount,
        weeklyCount,
        monthlyCount,
        totalViews,
        sharePercentage,
        activityStatus,
        recentArticle: catArticles[0],
      };
    });
  }, [categories, articles, now]);

  // Overall KPIs
  const totalArticlesCount = articles.length;
  const totalViewsOverall = articles.reduce((sum, a) => sum + (a.views || 0), 0);

  const totalDailyPosts = useMemo(() => {
    const oneDayMs = 24 * 60 * 60 * 1000;
    return articles.filter((a) => {
      const d = getArticleDate(a);
      return now.getTime() - d.getTime() <= oneDayMs || d.toDateString() === now.toDateString();
    }).length;
  }, [articles, now]);

  const totalWeeklyPosts = useMemo(() => {
    const sevenDaysMs = 7 * 24 * 60 * 60 * 1000;
    return articles.filter((a) => {
      const d = getArticleDate(a);
      return now.getTime() - d.getTime() <= sevenDaysMs;
    }).length;
  }, [articles, now]);

  const totalMonthlyPosts = useMemo(() => {
    const thirtyDaysMs = 30 * 24 * 60 * 60 * 1000;
    return articles.filter((a) => {
      const d = getArticleDate(a);
      return now.getTime() - d.getTime() <= thirtyDaysMs;
    }).length;
  }, [articles, now]);

  // Sorted and filtered stats
  const filteredAndSortedStats = useMemo(() => {
    let result = categoryStats.filter((cat) => {
      if (!searchQuery) return true;
      const query = searchQuery.toLowerCase();
      return (
        cat.name.toLowerCase().includes(query) ||
        cat.slug.toLowerCase().includes(query) ||
        (cat.description && cat.description.toLowerCase().includes(query))
      );
    });

    result.sort((a, b) => {
      switch (sortBy) {
        case "posts_desc":
          return b.totalPosts - a.totalPosts;
        case "daily_desc":
          return b.dailyCount - a.dailyCount || b.totalPosts - a.totalPosts;
        case "weekly_desc":
          return b.weeklyCount - a.weeklyCount || b.totalPosts - a.totalPosts;
        case "monthly_desc":
          return b.monthlyCount - a.monthlyCount || b.totalPosts - a.totalPosts;
        case "views_desc":
          return b.totalViews - a.totalViews;
        case "name_asc":
          return a.name.localeCompare(b.name);
        default:
          return b.totalPosts - a.totalPosts;
      }
    });

    return result;
  }, [categoryStats, searchQuery, sortBy]);

  const topCategories = useMemo(() => {
    return [...categoryStats].sort((a, b) => b.totalPosts - a.totalPosts).slice(0, 6);
  }, [categoryStats]);

  const emptyCategories = useMemo(() => {
    return categoryStats.filter((c) => c.totalPosts === 0);
  }, [categoryStats]);

  return (
    <div className="flex-1 flex flex-col pb-20 md:pb-12">
      <AdminHeader
        title="Editorial Analytics & Stats"
        subtitle="Track post velocity per category daily, weekly, monthly, and overall reach"
      />

      <div className="p-3 sm:p-6 space-y-5 sm:space-y-6 max-w-7xl">
        {/* KPI Top Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {/* Total Posts */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-2xs relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Total Published
              </span>
              <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                <FileText className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
              {totalArticlesCount}
            </p>
            <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-1 font-medium">
              <span>Across {categories.length} categories</span>
            </div>
          </div>

          {/* Daily Posts (Today) */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-2xs relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Daily Output (Today)
              </span>
              <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <Clock className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
              {totalDailyPosts}
            </p>
            <div className="flex items-center gap-1 text-[11px] text-emerald-600 mt-1 font-bold">
              <Activity className="w-3 h-3" />
              <span>{totalDailyPosts > 0 ? "Active today" : "No posts yet today"}</span>
            </div>
          </div>

          {/* Weekly Posts */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-2xs relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Weekly Velocity (7 Days)
              </span>
              <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
                <Calendar className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
              {totalWeeklyPosts}
            </p>
            <div className="flex items-center gap-1 text-[11px] text-indigo-600 mt-1 font-bold">
              <TrendingUp className="w-3 h-3" />
              <span>{Math.round((totalWeeklyPosts / 7) * 10) / 10} avg posts/day</span>
            </div>
          </div>

          {/* Monthly Posts */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-2xs relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Monthly Volume (30 Days)
              </span>
              <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
                <Flame className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
              {totalMonthlyPosts}
            </p>
            <div className="flex items-center gap-1 text-[11px] text-amber-600 mt-1 font-bold">
              <span>{totalArticlesCount > 0 ? Math.round((totalMonthlyPosts / totalArticlesCount) * 100) : 0}% of total archive</span>
            </div>
          </div>
        </div>

        {/* Visual Charts & Category Distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
          {/* Top Categories Distribution Bar Chart */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-4 sm:p-6 border border-slate-200 shadow-2xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-blue-600" />
                  Category Post Distribution
                </h3>
                <p className="text-xs text-slate-500">
                  Share of publications across top content categories
                </p>
              </div>
              <span className="text-xs bg-blue-50 text-blue-700 font-bold px-2.5 py-1 rounded-lg self-start sm:self-auto">
                {categories.length} Categories Active
              </span>
            </div>

            <div className="space-y-3.5 pt-1">
              {topCategories.map((cat, idx) => {
                const colors = [
                  "bg-blue-600",
                  "bg-indigo-600",
                  "bg-emerald-600",
                  "bg-amber-500",
                  "bg-rose-500",
                  "bg-purple-600",
                ];
                const barColor = colors[idx % colors.length];

                return (
                  <div key={cat.id || cat.slug} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-bold">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-slate-400" />
                        <span className="text-slate-800">{cat.name}</span>
                        {cat.isPrimaryIcon && (
                          <span className="bg-blue-100 text-blue-800 text-[9px] px-1 py-0.2 rounded font-extrabold">
                            ICON
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-slate-500">
                        <span className="text-slate-900 font-black">{cat.totalPosts} posts</span>
                        <span className="text-slate-400 font-medium text-[11px] w-12 text-right">
                          {cat.sharePercentage.toFixed(1)}%
                        </span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${barColor}`}
                        style={{
                          width: `${Math.max(cat.sharePercentage, cat.totalPosts > 0 ? 3 : 0)}%`,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Publishing Velocity & Action Breakdown */}
          <div className="lg:col-span-5 bg-white rounded-2xl p-4 sm:p-6 border border-slate-200 shadow-2xs flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-emerald-600" />
                  Velocity Breakdown
                </h3>
                <span className="text-xs text-slate-400">Live Cadence</span>
              </div>

              <div className="grid grid-cols-3 gap-2.5 my-4">
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-center">
                  <span className="text-[10px] font-bold uppercase text-slate-400 block">Today</span>
                  <span className="text-xl font-black text-slate-900">{totalDailyPosts}</span>
                  <span className="text-[10px] text-slate-500 block mt-0.5">Posts</span>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-center">
                  <span className="text-[10px] font-bold uppercase text-slate-400 block">7 Days</span>
                  <span className="text-xl font-black text-blue-600">{totalWeeklyPosts}</span>
                  <span className="text-[10px] text-slate-500 block mt-0.5">Posts</span>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-center">
                  <span className="text-[10px] font-bold uppercase text-slate-400 block">30 Days</span>
                  <span className="text-xl font-black text-indigo-600">{totalMonthlyPosts}</span>
                  <span className="text-[10px] text-slate-500 block mt-0.5">Posts</span>
                </div>
              </div>

              {/* Empty Categories Warning or Quick Insights */}
              {emptyCategories.length > 0 ? (
                <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl space-y-2 text-xs">
                  <div className="flex items-center gap-1.5 text-amber-800 font-bold">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>{emptyCategories.length} Categories have 0 posts</span>
                  </div>
                  <p className="text-[11px] text-amber-700 leading-relaxed">
                    Readers visiting these categories will see no articles. Consider publishing content for:
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {emptyCategories.slice(0, 4).map((c) => (
                      <Link
                        key={c.id || c.slug}
                        href="/admin/posts/new"
                        className="bg-white border border-amber-300 text-amber-900 text-[10px] font-bold px-2 py-0.5 rounded-md hover:bg-amber-100 transition-colors inline-flex items-center gap-1"
                      >
                        <span>{c.name}</span>
                        <Plus className="w-2.5 h-2.5" />
                      </Link>
                    ))}
                    {emptyCategories.length > 4 && (
                      <span className="text-[10px] text-amber-600 font-bold px-1 py-0.5">
                        +{emptyCategories.length - 4} more
                      </span>
                    )}
                  </div>
                </div>
              ) : (
                <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2 text-emerald-800 text-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="font-bold">Great job! All categories have published articles.</span>
                </div>
              )}
            </div>

            <div className="pt-2">
              <Link href="/admin/posts/new">
                <Button
                  variant="primary"
                  size="sm"
                  className="w-full font-bold text-xs uppercase tracking-wider py-2.5"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  CREATE NEW ARTICLE
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Detailed Stats Data Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
          {/* Header & Controls */}
          <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col lg:flex-row lg:items-center justify-between gap-3 sm:gap-4">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                <FolderTree className="w-5 h-5 text-blue-600" />
                Comprehensive Category Statistics
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Breakdown of daily, weekly, monthly post counts and overall share per category
              </p>
            </div>

            {/* Filter and Search Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
              {/* Search */}
              <div className="relative w-full sm:w-56">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search category..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                />
              </div>

              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 font-bold focus:outline-none"
              >
                <option value="posts_desc">Sort: Most Total Posts</option>
                <option value="daily_desc">Sort: Daily Posts (Today)</option>
                <option value="weekly_desc">Sort: Weekly Posts (7d)</option>
                <option value="monthly_desc">Sort: Monthly Posts (30d)</option>
                <option value="views_desc">Sort: Most Views</option>
                <option value="name_asc">Sort: Name (A-Z)</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-100">
                <tr>
                  <th className="px-4 sm:px-5 py-3.5">Category</th>
                  <th className="px-4 sm:px-5 py-3.5 text-center">
                    <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      Daily (Today)
                    </span>
                  </th>
                  <th className="px-4 sm:px-5 py-3.5 text-center">
                    <span className="text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                      Weekly (7d)
                    </span>
                  </th>
                  <th className="px-4 sm:px-5 py-3.5 text-center">
                    <span className="text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                      Monthly (30d)
                    </span>
                  </th>
                  <th className="px-4 sm:px-5 py-3.5 text-center">Total Posts</th>
                  <th className="px-4 sm:px-5 py-3.5 text-center">Share</th>
                  <th className="px-4 sm:px-5 py-3.5">Est. Views</th>
                  <th className="px-4 sm:px-5 py-3.5 text-center">Activity</th>
                  <th className="px-4 sm:px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredAndSortedStats.map((cat) => (
                  <tr key={cat.id || cat.slug} className="hover:bg-slate-50/80 transition-colors">
                    {/* Category Name & Slug */}
                    <td className="px-4 sm:px-5 py-3.5">
                      <div className="font-bold text-slate-900 flex items-center gap-2">
                        <span>{cat.name}</span>
                        {cat.isPrimaryIcon && (
                          <span className="bg-blue-100 text-blue-800 text-[9px] px-1.5 py-0.2 rounded font-extrabold uppercase">
                            ICON NAV
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] font-mono text-slate-400">/{cat.slug}</span>
                    </td>

                    {/* Daily Count */}
                    <td className="px-4 sm:px-5 py-3.5 text-center">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold ${
                          cat.dailyCount > 0
                            ? "bg-emerald-100 text-emerald-800"
                            : "text-slate-400 font-medium"
                        }`}
                      >
                        {cat.dailyCount}
                      </span>
                    </td>

                    {/* Weekly Count */}
                    <td className="px-4 sm:px-5 py-3.5 text-center">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold ${
                          cat.weeklyCount > 0
                            ? "bg-indigo-100 text-indigo-800"
                            : "text-slate-400 font-medium"
                        }`}
                      >
                        {cat.weeklyCount}
                      </span>
                    </td>

                    {/* Monthly Count */}
                    <td className="px-4 sm:px-5 py-3.5 text-center">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold ${
                          cat.monthlyCount > 0
                            ? "bg-amber-100 text-amber-800"
                            : "text-slate-400 font-medium"
                        }`}
                      >
                        {cat.monthlyCount}
                      </span>
                    </td>

                    {/* Total Posts */}
                    <td className="px-4 sm:px-5 py-3.5 text-center">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-lg text-xs font-black ${
                          cat.totalPosts > 0
                            ? "bg-slate-900 text-white"
                            : "bg-slate-100 text-slate-400 font-bold"
                        }`}
                      >
                        {cat.totalPosts}
                      </span>
                    </td>

                    {/* Content Share % */}
                    <td className="px-4 sm:px-5 py-3.5 text-center font-mono text-[11px] text-slate-500 font-bold">
                      {cat.sharePercentage.toFixed(1)}%
                    </td>

                    {/* Total Estimated Views */}
                    <td className="px-4 sm:px-5 py-3.5">
                      <div className="flex items-center gap-1 font-bold text-slate-800">
                        <Eye className="w-3.5 h-3.5 text-slate-400" />
                        <span>{cat.totalViews.toLocaleString()}</span>
                      </div>
                    </td>

                    {/* Activity Status Badge */}
                    <td className="px-4 sm:px-5 py-3.5 text-center">
                      {cat.activityStatus === "high" && (
                        <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded text-[10px] font-bold">
                          ⚡ High
                        </span>
                      )}
                      {cat.activityStatus === "moderate" && (
                        <span className="bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded text-[10px] font-bold">
                          Active
                        </span>
                      )}
                      {cat.activityStatus === "low" && (
                        <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-[10px] font-medium">
                          Low
                        </span>
                      )}
                      {cat.activityStatus === "empty" && (
                        <span className="bg-rose-50 text-rose-700 border border-rose-200 px-2 py-0.5 rounded text-[10px] font-bold">
                          No Posts
                        </span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="px-4 sm:px-5 py-3.5 text-right whitespace-nowrap space-x-1.5">
                      <Link
                        href={`/admin/posts?category=${encodeURIComponent(cat.name)}`}
                        className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-2 py-1 rounded text-xs font-bold transition-colors"
                        title={`Filter posts in ${cat.name}`}
                      >
                        <span>Posts</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </Link>

                      <Link
                        href={`/category/${cat.slug}`}
                        target="_blank"
                        className="inline-flex items-center text-slate-400 hover:text-slate-700 p-1 rounded hover:bg-slate-100 transition-colors"
                        title="View category on live site"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                    </td>
                  </tr>
                ))}

                {filteredAndSortedStats.length === 0 && (
                  <tr>
                    <td colSpan={9} className="px-5 py-10 text-center text-slate-400 font-bold text-xs">
                      No categories found matching &quot;{searchQuery}&quot;
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
