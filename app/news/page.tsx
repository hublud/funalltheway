import React from "react";
import { Metadata } from "next";
import { CategoryPageTemplate } from "@/components/blog/CategoryPageTemplate";
import { MOCK_ARTICLES } from "@/data/mockArticles";

export const metadata: Metadata = {
  title: "Latest News | Fun All The Way Limited",
  description: "Breaking news, political updates, trending stories, and happening events across Nigeria.",
};

export default function NewsPage() {
  const articles = MOCK_ARTICLES.filter(
    (a) => a.categorySlug === "news" || a.categorySlug === "entertainment"
  );

  return (
    <CategoryPageTemplate
      title="Latest Nigerian & Global News"
      categoryName="News"
      description="Stay ahead with real-time reporting, trending national discussions, exclusive interviews, and breaking developments from Lagos, Abuja, and around the world."
      articles={articles.length > 0 ? articles : MOCK_ARTICLES}
    />
  );
}
