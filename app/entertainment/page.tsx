import React from "react";
import { Metadata } from "next";
import { CategoryPageTemplate } from "@/components/blog/CategoryPageTemplate";
import { MOCK_ARTICLES } from "@/data/mockArticles";

export const metadata: Metadata = {
  title: "Entertainment News | Fun All The Way Limited",
  description: "Get the latest Nollywood updates, reality show drama, movie reviews, and entertainment gist from Nigeria.",
};

export default function EntertainmentPage() {
  const articles = MOCK_ARTICLES.filter(
    (a) => a.categorySlug === "entertainment" || a.categorySlug === "celebrity"
  );

  return (
    <CategoryPageTemplate
      title="Entertainment & Nollywood News"
      categoryName="Entertainment"
      description="The ultimate destination for Nollywood blockbuster releases, celebrity gist, award show highlights, and viral entertainment trends."
      articles={articles.length > 0 ? articles : MOCK_ARTICLES}
    />
  );
}
