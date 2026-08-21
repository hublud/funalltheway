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
      title="DJ Mixtapes, Afrobeats & Club Mixes"
      categoryName="Mixtape"
      description="Download and stream the hottest Nigerian DJ mixtapes, Afrobeats party sets, Amapiano vibes, hype sessions, and trending street mixes."
    />
  );
}
