import React from "react";
import { Metadata } from "next";
import { CategoryPageTemplate } from "@/components/blog/CategoryPageTemplate";

export const metadata: Metadata = {
  title: "Edited Videos & Shorts | Fun All The Way Limited",
  description: "Explore cinematic video edits, viral comedy clips, sound syncs, music visualizers, transitions, and digital video productions.",
};

export default function EditedVideosPage() {
  return (
    <CategoryPageTemplate
      title="Edited Videos & Cinematic Shorts"
      categoryName="Edited Videos"
      categorySlug="edited-videos"
      description="Explore our creative video editing portfolio: viral social reels, color grading, music video visualizers, cinematic cuts, and digital effects."
    />
  );
}
