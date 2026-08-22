import React from "react";
import { Metadata } from "next";
import { CategoryPageTemplate } from "@/components/blog/CategoryPageTemplate";

export const metadata: Metadata = {
  title: "Picture & Video Photoshop | Fun All The Way Limited",
  description: "Advanced Photoshop editing, visual color grading, image composites, and creative video manipulation.",
};

export default function PictureVideoPhotoshopPage() {
  return (
    <CategoryPageTemplate
      title="Picture & Video Photoshop Magic"
      categoryName="Picture & Video Photoshop"
      categorySlug="picture-video-photoshop"
      description="Advanced photo manipulation, creative Photoshop artwork, background composites, digital art retouching, and visual color grading."
    />
  );
}
