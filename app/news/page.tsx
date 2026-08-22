import React from "react";
import { Metadata } from "next";
import { CategoryPageTemplate } from "@/components/blog/CategoryPageTemplate";

export const metadata: Metadata = {
  title: "Latest Nigerian News | Fun All The Way Limited",
  description: "Real-time updates, breaking headlines, national developments, and trending news across Nigeria.",
};

export default function NewsPage() {
  return (
    <CategoryPageTemplate
      title="Latest Nigerian & Global News"
      categoryName="News"
      categorySlug="news"
      description="Stay updated with authentic, real-time reports on politics, entertainment, culture, national developments, and breaking headlines from across Nigeria."
    />
  );
}
