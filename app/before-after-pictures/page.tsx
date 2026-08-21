import React from "react";
import { Metadata } from "next";
import { CategoryPageTemplate } from "@/components/blog/CategoryPageTemplate";

export const metadata: Metadata = {
  title: "Before & After Pictures | Fun All The Way Limited",
  description: "Witness striking visual transformations, high-end studio skin retouching, background replacements, and photo editing showcases.",
};

export default function BeforeAfterPicturesPage() {
  return (
    <CategoryPageTemplate
      title="Before & After Transformation Showcases"
      categoryName="Before and after Pictures"
      description="Witness striking visual transformations, high-end studio skin retouching, background replacements, wardrobe fixes, and before-and-after photo editing masterpieces."
    />
  );
}
