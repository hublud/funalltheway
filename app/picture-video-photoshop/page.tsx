import React from "react";
import { Metadata } from "next";
import { CategoryPageTemplate } from "@/components/blog/CategoryPageTemplate";

export const metadata: Metadata = {
  title: "Picture and Video Photoshop | Fun All The Way Limited",
  description: "Flawless composite edits, watermark removals, flyer mockups, video grading, and high-precision visual Photoshop retouching.",
};

export default function PictureVideoPhotoshopPage() {
  return (
    <CategoryPageTemplate
      title="Picture & Video Photoshop Editing"
      categoryName="Picture and Video Photoshop"
      description="Flawless composite edits, watermark removals, flyer mockups, video color grading, lighting fixes, and high-precision visual Photoshop retouching."
    />
  );
}
