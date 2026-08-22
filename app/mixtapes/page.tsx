import React from "react";
import { Metadata } from "next";
import { CategoryPageTemplate } from "@/components/blog/CategoryPageTemplate";

export const metadata: Metadata = {
  title: "DJ Mixtapes & Party Mixes | Fun All The Way Limited",
  description: "Download and stream the hottest Nigerian DJ mixtapes, Afrobeats party sets, Amapiano vibes, and trending street mixes.",
};

export default function MixtapesPage() {
  return (
    <CategoryPageTemplate
      title="DJ Mixtapes & Non-Stop Party Mixes"
      categoryName="Mixtape"
      categorySlug="mixtapes"
      description="Download and stream the hottest Nigerian DJ club mixtapes, trending Afrobeats party sets, Amapiano vibes, and non-stop street playlists."
    />
  );
}
