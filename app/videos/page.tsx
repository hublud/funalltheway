import React from "react";
import { Metadata } from "next";
import { CategoryPageTemplate } from "@/components/blog/CategoryPageTemplate";
import { MOCK_ARTICLES } from "@/data/mockArticles";

export const metadata: Metadata = {
  title: "Trending Videos & AI Visuals | Fun All The Way Limited",
  description: "Explore viral videos, TikTok sensations, Nollywood movie trailers, and AI-enhanced visuals from Fun All The Way Limited.",
};

export default function VideosPage() {
  const articles = MOCK_ARTICLES.filter((a) => a.categorySlug === "videos" || a.categorySlug === "comedy");

  return (
    <CategoryPageTemplate
      title="Trending Videos & AI Visual Media"
      categoryName="Videos"
      description="Immerse yourself in top-tier Nigerian video content, AI animations, music video premieres, and viral short films."
      articles={articles.length > 0 ? articles : MOCK_ARTICLES}
    />
  );
}
