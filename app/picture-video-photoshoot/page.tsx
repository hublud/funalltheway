import React from "react";
import { Metadata } from "next";
import { CategoryPageTemplate } from "@/components/blog/CategoryPageTemplate";

export const metadata: Metadata = {
  title: "Picture & Video Photoshoot | Fun All The Way Limited",
  description: "Professional studio and outdoor photoshoot sessions, video shoots, event coverage, and high-resolution picture transformations.",
};

export default function PictureVideoPhotoshootPage() {
  return (
    <CategoryPageTemplate
      title="Picture & Video Photoshoot Sessions"
      categoryName="Picture & Video Photoshoot"
      categorySlug="picture-video-photoshoot"
      description="Professional indoor and outdoor photoshoot sessions, video productions, event coverages, model lookbooks, and high-resolution visual storytelling."
    />
  );
}
