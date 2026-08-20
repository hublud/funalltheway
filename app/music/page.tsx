import React from "react";
import { Metadata } from "next";
import { CategoryPageTemplate } from "@/components/blog/CategoryPageTemplate";
import { MOCK_ARTICLES } from "@/data/mockArticles";

export const metadata: Metadata = {
  title: "Music, MP3s & Freebeats | Fun All The Way Limited",
  description: "Download and stream trending Nigerian music, Afrobeats releases, Amapiano mixes, and producer instrumental beats.",
};

export default function MusicPage() {
  const articles = MOCK_ARTICLES.filter((a) => a.categorySlug === "music");

  return (
    <CategoryPageTemplate
      title="Nigerian Music, Chart Hits & Freebeats"
      categoryName="Music"
      description="Stream and explore chart-topping Afrobeats singles, studio instrumentals, producer freebeats, and backstage interviews with your favorite music stars."
      articles={articles.length > 0 ? articles : MOCK_ARTICLES}
    />
  );
}
