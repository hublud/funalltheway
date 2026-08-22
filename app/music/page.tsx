import React from "react";
import { Metadata } from "next";
import { CategoryPageTemplate } from "@/components/blog/CategoryPageTemplate";

export const metadata: Metadata = {
  title: "Music, MP3s & Freebeats | Fun All The Way Limited",
  description: "Download and stream trending Nigerian music, Afrobeats releases, Amapiano mixes, and producer instrumental beats.",
};

export default function MusicPage() {
  return (
    <CategoryPageTemplate
      title="Nigerian Music, Chart Hits & Freebeats"
      categoryName="Music"
      categorySlug="music"
      description="Stream and explore chart-topping Afrobeats singles, studio instrumentals, producer freebeats, and backstage interviews with your favorite music stars."
    />
  );
}
