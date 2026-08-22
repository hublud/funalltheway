import React from "react";
import { Metadata } from "next";
import { CategoryPageTemplate } from "@/components/blog/CategoryPageTemplate";

export const metadata: Metadata = {
  title: "Lifestyle & Culture | Fun All The Way Limited",
  description: "Explore relationship tips, Nigerian lifestyle trends, wellness, fashion, and modern living advice.",
};

export default function LifestylePage() {
  return (
    <CategoryPageTemplate
      title="Lifestyle, Fashion & Living"
      categoryName="Lifestyle"
      categorySlug="lifestyle"
      description="Inspiring guides on modern lifestyle, fashion trends, wellness, relationships, career hacks, and urban African culture."
    />
  );
}
