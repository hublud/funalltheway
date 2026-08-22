"use client";

import React from "react";
import Link from "next/link";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { ArticleGrid } from "@/components/blog/ArticleGrid";
import { HorizontalAd } from "@/components/ads/HorizontalAd";
import { useStore } from "@/lib/store";
import { Sparkles, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface CategoryPageTemplateProps {
  title: string;
  categoryName: string;
  categorySlug?: string;
  description: string;
}

export const CategoryPageTemplate: React.FC<CategoryPageTemplateProps> = ({
  title,
  categoryName,
  categorySlug,
  description,
}) => {
  const { articles: storeArticles, isLoaded } = useStore();

  const targetSlug = (categorySlug || categoryName)
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

  const targetName = categoryName
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

  const activeArticles = storeArticles.filter((a) => {
    const artSlug = (a.categorySlug || "")
      .toLowerCase()
      .replace(/&/g, "and")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

    const artCat = (a.category || "")
      .toLowerCase()
      .replace(/&/g, "and")
      .replace(/[^a-z0-9]+/g, " ")
      .trim();

    return (
      artSlug === targetSlug ||
      artCat === targetName ||
      artSlug.replace(/s$/, "") === targetSlug.replace(/s$/, "") ||
      artCat.replace(/s$/, "") === targetName.replace(/s$/, "") ||
      (targetSlug.length > 3 && artSlug.includes(targetSlug)) ||
      (artSlug.length > 3 && targetSlug.includes(artSlug)) ||
      (targetName.length > 3 && artCat.includes(targetName)) ||
      (artCat.length > 3 && targetName.includes(artCat))
    );
  });

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: "Categories", href: "/" },
          { label: categoryName },
        ]}
      />

      {/* Category Header Banner */}
      <div className="bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-900 text-white rounded-2xl p-6 sm:p-8 shadow-sm">
        <span className="text-xs uppercase font-extrabold tracking-widest text-yellow-300">
          CATEGORY SPOTLIGHT
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-white mt-1 mb-2 tracking-tight">
          {title}
        </h1>
        <p className="text-sm text-blue-100 max-w-3xl leading-relaxed">
          {description}
        </p>
      </div>

      {/* In-feed Ad */}
      <HorizontalAd />

      {/* Category Content Grid or Clean Empty State */}
      {isLoaded && activeArticles.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 text-center space-y-4 shadow-xs">
          <div className="w-14 h-14 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
            <Sparkles className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">
            No Stories Published in {categoryName} Yet
          </h2>
          <p className="text-sm text-slate-500 max-w-md mx-auto">
            Fresh updates, media uploads, and exclusive features for this category will appear right here.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <Link href="/">
              <Button variant="outline" size="sm">
                Explore All Stories
              </Button>
            </Link>
            <Link href="/admin/posts/new">
              <Button variant="primary" size="sm" className="flex items-center gap-1">
                <PlusCircle className="w-4 h-4" /> Add Story to {categoryName}
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <ArticleGrid
          articles={activeArticles}
          title={`${categoryName.toUpperCase()} STORIES (${activeArticles.length})`}
          columns={5}
          showLoadMore={true}
          isLoading={!isLoaded}
        />
      )}
    </div>
  );
};
