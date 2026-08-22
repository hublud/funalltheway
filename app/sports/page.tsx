import React from "react";
import { Metadata } from "next";
import { CategoryPageTemplate } from "@/components/blog/CategoryPageTemplate";

export const metadata: Metadata = {
  title: "Sports News & Football | Fun All The Way Limited",
  description: "Stay informed on Super Eagles, European football leagues, match highlights, and global athletic updates.",
};

export default function SportsPage() {
  return (
    <CategoryPageTemplate
      title="Sports News, Football & Fixtures"
      categoryName="Sport News"
      categorySlug="sports"
      description="Real-time coverage of Nigerian football, Super Eagles fixtures, Premier League action, UEFA Champions League, and breaking transfer updates."
    />
  );
}
