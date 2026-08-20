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

      <div className="p-6 space-y-6 max-w-7xl">
        {/* Metric Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.title}
                className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex items-center justify-between"
              >
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-black text-slate-900 mt-1">
                    {stat.value}
                  </p>
                  <p className="text-[11px] text-slate-400 font-medium mt-1">
                    {stat.change}
                  </p>
                </div>
                <div
                  className={`w-12 h-12 rounded-xl ${stat.color} text-white flex items-center justify-center shadow-md`}
                >
                  <Icon className="w-6 h-6" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Cloudinary & Supabase Status Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Cloudinary Card */}
          <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white rounded-2xl p-5 shadow-xs flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Cloud className="w-5 h-5 text-yellow-300" />
                <h3 className="font-bold text-base">Cloudinary CDN Storage</h3>
              </div>
              <p className="text-xs text-blue-100 max-w-md">
                Cloud Name: <strong className="text-yellow-300 font-mono">qoi6iykg</strong>. Auto-optimizing JPEG, WebP & MP4 visualizers.
              </p>
            </div>
            <Link href="/admin/media">
              <Button
                variant="primary"
                size="sm"
                className="bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-bold text-xs uppercase"
              >
                Open Media
              </Button>
            </Link>
          </div>

          {/* Quick Post Action Card */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <h3 className="font-bold text-base text-slate-900">Publish New Story</h3>
              <p className="text-xs text-slate-500">
                Write a breaking gist or upload a new Afrobeats song release.
              </p>
            </div>
            <Link href="/admin/posts/new">
              <Button variant="primary" size="sm" className="font-bold text-xs uppercase">
                <Plus className="w-4 h-4 mr-1" />
                New Article
              </Button>
            </Link>
          </div>
        </div>

        {/* Recent Articles Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900">Recent Publications</h2>
              <p className="text-xs text-slate-500">Latest articles published on FunAllTheWay.com</p>
            </div>
            <Link href="/admin/posts">
              <Button variant="outline" size="sm" className="text-xs font-bold">
                View All Posts
              </Button>
            </Link>
          </div>

          <div className="overflow-x-auto">
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
                    <td className="px-5 py-3.5 text-right">
                      <Link
                        href={`/article/${article.slug}`}
                        target="_blank"
                        className="text-blue-600 hover:underline font-bold text-xs"
                      >
                        View
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
