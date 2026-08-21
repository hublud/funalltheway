import React from "react";
import { Metadata } from "next";
import { CategoryPageTemplate } from "@/components/blog/CategoryPageTemplate";

export const metadata: Metadata = {
  title: "Picture and Video Photoshoot | Fun All The Way Limited",
  description: "Professional studio and outdoor photoshoot sessions, video shoots, event coverage, model lookbooks, and picture shoots.",
};

export default function PictureVideoPhotoshootPage() {
  return (
    <CategoryPageTemplate
      title="Picture & Video Photoshoot Sessions"
      categoryName="Picture and Video Photoshoot"
      description="Professional studio and outdoor photoshoot sessions, video shoots, event coverage, model lookbooks, and high-resolution picture sessions."
    />
  );
}
