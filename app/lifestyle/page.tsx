import React from "react";
import { Metadata } from "next";
import { CategoryPageTemplate } from "@/components/blog/CategoryPageTemplate";
import { MOCK_ARTICLES } from "@/data/mockArticles";

export const metadata: Metadata = {
  title: "Lifestyle & Relationships | Fun All The Way Limited",
  description: "Explore relationship tips, Nigerian culture, wellness trends, fashion lookbooks, and lifestyle guidance.",
};

export default function LifestylePage() {
  const articles = MOCK_ARTICLES.filter((a) => a.categorySlug === "lifestyle");

  return (
    <CategoryPageTemplate
      title="Lifestyle, Wellness & Trends"
      categoryName="Lifestyle"
      description="Inspiring ideas for everyday living, mental health, romantic relationships, career advice, and urban survival routines."
      articles={articles.length > 0 ? articles : MOCK_ARTICLES}
    />
  );
}
