"use client";

import React from "react";
import Link from "next/link";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { useStore } from "@/lib/store";
import {
  FileText,
  FolderTree,
  Megaphone,
  TrendingUp,
  Plus,
  ExternalLink,
  Eye,
  Calendar,
  Cloud,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function AdminOverviewPage() {
  const { articles, categories, ads } = useStore();

  const totalViews = articles.reduce((sum, a) => sum + (a.views || 1200), 0);
  const activeAdsCount = ads.filter((a) => a.isActive).length;

  const stats = [
    {
      title: "Total Articles",
      value: articles.length,
      icon: FileText,
      color: "bg-blue-600",
      change: "+12% this week",
    },
    {
      title: "Active Categories",
      value: categories.length,
      icon: FolderTree,
      color: "bg-indigo-600",
      change: "Organized categories",
    },
    {
      title: "Estimated Readers",
      value: totalViews.toLocaleString(),
      icon: Eye,
      color: "bg-emerald-600",
      change: "Real-time impressions",
    },
    {
      title: "Active Ad Slots",
      value: activeAdsCount,
      icon: Megaphone,
      color: "bg-amber-600",
      change: "Monetization active",
    },
  ];

  return (
    <div className="flex-1 flex flex-col">
      <AdminHeader
        title="Editorial & Content Dashboard"
        subtitle="Real-time control over posts, categories, Cloudinary media, and banner ads"
      />

      <div className="p-3 sm:p-6 space-y-4 sm:space-y-6 max-w-7xl pb-20 md:pb-12">
        {/* Metric Cards Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.title}
                className="bg-white rounded-2xl p-3.5 sm:p-5 border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2"
              >
                <div>
                  <p className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider">
                    {stat.title}
                  </p>
                  <p className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5 sm:mt-1">
                    {stat.value}
                  </p>
                  <p className="text-[10px] sm:text-[11px] text-slate-400 font-medium mt-0.5 sm:mt-1 truncate">
                    {stat.change}
                  </p>
                </div>
                <div
                  className={`w-9 h-9 sm:w-12 sm:h-12 rounded-xl ${stat.color} text-white flex items-center justify-center shadow-md shrink-0`}
                >
                  <Icon className="w-4 h-4 sm:w-6 sm:h-6" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Cloudinary & Quick Post Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-5">
          {/* Cloudinary Card */}
          <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Cloud className="w-5 h-5 text-yellow-300 shrink-0" />
                <h3 className="font-bold text-sm sm:text-base">Cloudinary CDN Storage</h3>
              </div>
              <p className="text-xs text-blue-100 max-w-md leading-relaxed">
                Cloud Name: <strong className="text-yellow-300 font-mono">qoi6iykg</strong>. Auto-optimizing JPEG, WebP & MP4 visualizers.
              </p>
            </div>
            <Link href="/admin/media" className="w-full sm:w-auto">
              <Button
                variant="primary"
                size="sm"
                className="bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-bold text-xs uppercase w-full sm:w-auto"
              >
                Open Media
              </Button>
            </Link>
          </div>

          {/* Quick Post Action Card */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-bold text-sm sm:text-base text-slate-900">Publish New Story</h3>
              <p className="text-xs text-slate-500">
                Write a breaking gist or upload a new Afrobeats song release.
              </p>
            </div>
            <Link href="/admin/posts/new" className="w-full sm:w-auto">
              <Button variant="primary" size="sm" className="font-bold text-xs uppercase w-full sm:w-auto">
                <Plus className="w-4 h-4 mr-1" />
                New Article
              </Button>
            </Link>
          </div>
        </div>

        {/* Recent Articles Section */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h2 className="text-sm sm:text-base font-bold text-slate-900">Recent Publications</h2>
              <p className="text-xs text-slate-500">Latest articles published on FunAllTheWay.com</p>
            </div>
            <Link href="/admin/posts">
              <Button variant="outline" size="sm" className="text-xs font-bold py-1 px-2.5">
                View All
              </Button>
            </Link>
          </div>

          {/* Mobile Card View (< md) */}
          <div className="block md:hidden divide-y divide-slate-100">
            {articles.slice(0, 5).map((article) => (
              <div key={article.id} className="p-3.5 flex gap-3 items-center justify-between">
                <div className="flex gap-3 items-center min-w-0">
                  <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-slate-100 border border-slate-200">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <span className="bg-blue-50 text-blue-700 font-bold px-1.5 py-0.2 rounded text-[9px] uppercase inline-block mb-0.5">
                      {article.category}
                    </span>
                    <Link
                      href={`/article/${article.slug}`}
                      target="_blank"
                      className="font-bold text-slate-900 hover:text-blue-600 text-xs line-clamp-1 block"
                    >
                      {article.title}
                    </Link>
                    <span className="text-[10px] text-slate-400">
                      {article.publishedAt}
                    </span>
                  </div>
                </div>
                <Link
                  href={`/admin/posts/edit/${article.id || article.slug}`}
                  className="shrink-0 px-2 py-1 rounded bg-blue-50 text-blue-700 font-bold text-xs hover:bg-blue-100"
                >
                  Edit
                </Link>
              </div>
            ))}
          </div>

          {/* Desktop Table (>= md) */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-100">
                <tr>
                  <th className="px-5 py-3.5">Story</th>
                  <th className="px-5 py-3.5">Category</th>
                  <th className="px-5 py-3.5">Location</th>
                  <th className="px-5 py-3.5">Date</th>
                  <th className="px-5 py-3.5">Status</th>
                  <th className="px-5 py-3.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {articles.slice(0, 5).map((article) => (
                  <tr key={article.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-5 py-3.5 flex items-center gap-3">
                      <div className="w-12 h-10 rounded-lg overflow-hidden shrink-0 bg-slate-100 border border-slate-200">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={article.image}
                          alt={article.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="max-w-xs sm:max-w-md">
                        <Link
                          href={`/article/${article.slug}`}
                          target="_blank"
                          className="font-bold text-slate-900 hover:text-blue-600 transition-colors line-clamp-1 flex items-center gap-1"
                        >
                          <span>{article.title}</span>
                          <ExternalLink className="w-3 h-3 text-slate-400 shrink-0" />
                        </Link>
                        <span className="text-[11px] text-slate-400">
                          By {article.author.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="bg-blue-50 text-blue-700 font-bold px-2 py-0.5 rounded text-[11px]">
                        {article.category}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 font-bold text-slate-800">
                      📍 {article.location || "Nigeria"}
                    </td>
                    <td className="px-5 py-3.5 text-slate-500 font-medium">
                      {article.publishedAt}
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="inline-flex items-center gap-1 text-emerald-700 font-bold text-[11px]">
                        ● Published
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-right space-x-2">
                      <Link
                        href={`/admin/posts/edit/${article.id || article.slug}`}
                        className="text-blue-600 hover:underline font-bold text-xs"
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
