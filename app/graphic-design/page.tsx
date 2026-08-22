import React from "react";
import { Metadata } from "next";
import { CategoryPageTemplate } from "@/components/blog/CategoryPageTemplate";

export const metadata: Metadata = {
  title: "Graphic Design & Branding | Fun All The Way Limited",
  description: "Stunning flyers, album cover artworks, logos, brand identities, and digital promotional designs.",
};

export default function GraphicDesignPage() {
  return (
    <CategoryPageTemplate
      title="Graphic Design, Artworks & Branding"
      categoryName="Graphic Design"
      categorySlug="graphic-design"
      description="Stunning event flyers, Afrobeats album cover designs, corporate logos, social media promo graphics, and brand identity projects."
    />
  );
}
