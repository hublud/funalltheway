import React from "react";
import { Metadata } from "next";
import { CategoryPageTemplate } from "@/components/blog/CategoryPageTemplate";

export const metadata: Metadata = {
  title: "Graphic Design & Branding | Fun All The Way Limited",
  description: "Stunning event flyers, album cover artworks, logos, brand identities, billboards, and digital promotional designs.",
};

export default function GraphicDesignPage() {
  return (
    <CategoryPageTemplate
      title="Graphic Design, Artworks & Branding"
      categoryName="Graphic Design"
      description="Stunning event flyers, album cover artworks, corporate logos, social media graphics, billboards, and brand design showcases."
    />
  );
}
