import React from "react";
import { Metadata } from "next";
import { CategoryPageTemplate } from "@/components/blog/CategoryPageTemplate";

export const metadata: Metadata = {
  title: "Edited Videos | Fun All The Way Limited",
  description: "Watch high-definition edited videos, music visualizers, cinema-grade transitions, shorts, and creative video edits.",
};

export default function EditedVideosPage() {
  return (
    <CategoryPageTemplate
      title="Edited Videos & Cinematic Visuals"
      categoryName="Edited Videos"
      description="Watch cinema-grade video edits, TikTok & YouTube shorts, sound-synced reels, music visualizers, and digital video productions."
    />
  );
}
