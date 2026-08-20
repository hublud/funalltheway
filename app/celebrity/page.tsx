import React from "react";
import { Metadata } from "next";
import { CategoryPageTemplate } from "@/components/blog/CategoryPageTemplate";
import { MOCK_ARTICLES } from "@/data/mockArticles";

export const metadata: Metadata = {
  title: "Celebrity Gist & Nollywood Updates | Fun All The Way Limited",
  description: "Exclusive celebrity gist, trending interviews, Nollywood red-carpet fashion, and lifestyle scoops.",
};

export default function CelebrityPage() {
  const articles = MOCK_ARTICLES.filter((a) => a.categorySlug === "celebrity");

  return (
    <CategoryPageTemplate
      title="Celebrity Gist & Exclusives"
      categoryName="Celebrity"
      description="Get the inside scoop on top African stars, fashion spotlights, social media drama, red carpet glam, and celebrity milestone celebrations."
      articles={articles.length > 0 ? articles : MOCK_ARTICLES}
    />
  );
}
