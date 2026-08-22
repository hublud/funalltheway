import React from "react";
import { Metadata } from "next";
import { CategoryPageTemplate } from "@/components/blog/CategoryPageTemplate";

export const metadata: Metadata = {
  title: "Trending Videos | Fun All The Way Limited",
  description: "Watch trending Nigerian videos, music clips, visual highlights, and viral entertainment reels.",
};

export default function VideosPage() {
  return (
    <CategoryPageTemplate
      title="Trending Videos & Visual Reels"
      categoryName="Videos"
      categorySlug="videos"
      description="Stream viral video reels, music video premieres, exclusive event captures, and funny clips from all across the entertainment scene."
    />
  );
}
