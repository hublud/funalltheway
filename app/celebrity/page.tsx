import React from "react";
import { Metadata } from "next";
import { CategoryPageTemplate } from "@/components/blog/CategoryPageTemplate";

export const metadata: Metadata = {
  title: "Celebrity Gist & Exclusives | Fun All The Way Limited",
  description: "Read insider celebrity gossip, lifestyle scoops, relationship updates, and Nollywood star features.",
};

export default function CelebrityPage() {
  return (
    <CategoryPageTemplate
      title="Celebrity Gist & Star Lifestyle"
      categoryName="Celebrity"
      categorySlug="celebrity"
      description="Get the latest gist on your favorite celebrities, red carpet outfits, love lives, endorsements, and exclusive backstage interviews."
    />
  );
}
