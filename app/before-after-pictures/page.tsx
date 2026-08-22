import React from "react";
import { Metadata } from "next";
import { CategoryPageTemplate } from "@/components/blog/CategoryPageTemplate";

export const metadata: Metadata = {
  title: "Before & After Pictures | Fun All The Way Limited",
  description: "Witness striking visual transformations, high-end studio skin retouching, and before-and-after photo editing showcases.",
};

export default function BeforeAfterPicturesPage() {
  return (
    <CategoryPageTemplate
      title="Before & After Transformation Showcases"
      categoryName="Before & After Pictures"
      categorySlug="before-after-pictures"
      description="Witness striking visual transformations, studio skin retouching, background replacements, lighting enhancements, and before-and-after photo editing demonstrations."
    />
  );
}
