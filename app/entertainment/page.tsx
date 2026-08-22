import React from "react";
import { Metadata } from "next";
import { CategoryPageTemplate } from "@/components/blog/CategoryPageTemplate";

export const metadata: Metadata = {
  title: "Entertainment News | Fun All The Way Limited",
  description: "Get the latest Nigerian entertainment updates, cinema scoops, concert coverage, and celebrity highlights.",
};

export default function EntertainmentPage() {
  return (
    <CategoryPageTemplate
      title="Entertainment News & Pop Culture"
      categoryName="Entertainment"
      categorySlug="entertainment"
      description="Catch the hottest scoops from Nollywood, music festivals, red carpet awards, viral social media moments, and pop culture discussions."
    />
  );
}
