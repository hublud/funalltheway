import React from "react";
import { Metadata } from "next";
import { CategoryPageTemplate } from "@/components/blog/CategoryPageTemplate";
import { MOCK_ARTICLES } from "@/data/mockArticles";

export const metadata: Metadata = {
  title: "Sports News & Football Updates | Fun All The Way Limited",
  description: "Stay updated on the Super Eagles, Premier League matches, Champions League scores, and Nigerian sports athletes.",
};

export default function SportsPage() {
  const articles = MOCK_ARTICLES.filter((a) => a.categorySlug === "sports");

  return (
    <CategoryPageTemplate
      title="Sports News & Match Previews"
      categoryName="Sports"
      description="Comprehensive sports journalism tracking Nigeria's Super Eagles, NPFL breakthroughs, European leagues, boxing showdowns, and live match previews."
      articles={articles.length > 0 ? articles : MOCK_ARTICLES}
    />
  );
}
