"use client";

import React from "react";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { ArticleGrid } from "@/components/blog/ArticleGrid";
import { HorizontalAd } from "@/components/ads/HorizontalAd";
import { Article } from "@/types";
import { useStore } from "@/lib/store";

interface CategoryPageTemplateProps {
  title: string;
  categoryName: string;
  description: string;
  articles?: Article[];
}

export const CategoryPageTemplate: React.FC<CategoryPageTemplateProps> = ({
  title,
  categoryName,
  description,
  articles,
}) => {
  const { articles: storeArticles, isLoaded } = useStore();

  const activeArticles =
    storeArticles.filter(
      (a) => a.category.toLowerCase() === categoryName.toLowerCase() ||
             a.categorySlug.toLowerCase() === categoryName.toLowerCase()
    );

  const displayArticles = activeArticles.length > 0 ? activeArticles : (articles || storeArticles);

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

      {/* Full-Width Category Content Grid */}
      <ArticleGrid
        articles={displayArticles}
        title={`${categoryName.toUpperCase()} STORIES`}
        columns={5}
        showLoadMore={true}
        isLoading={!isLoaded}
      />
    </div>
  );
};
