import React from "react";
import { Metadata } from "next";
import { CategoryPageTemplate } from "@/components/blog/CategoryPageTemplate";

export const metadata: Metadata = {
  title: "Official Music Videos & Visuals | Fun All The Way Limited",
  description: "Stream the latest Nigerian and global music videos, official Afrobeats visuals, 4K video premieres, dance clips, and behind-the-scenes footage.",
};

export default function MusicVideoPage() {
  return (
    <CategoryPageTemplate
      title="Official Music Videos & Visuals"
      categoryName="Music Video"
      categorySlug="music-videos"
      description="Stream the latest Nigerian and global music videos, official Afrobeats visuals, 4K video premieres, dance clips, and behind-the-scenes footage."
    />
  );
}
