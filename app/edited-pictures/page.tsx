import React from "react";
import { Metadata } from "next";
import { CategoryPageTemplate } from "@/components/blog/CategoryPageTemplate";

export const metadata: Metadata = {
  title: "Edited Pictures | Fun All The Way Limited",
  description: "Explore professional photo manipulation, studio skin retouching, background changes, and celebrity picture edits.",
};

export default function EditedPicturesPage() {
  return (
    <CategoryPageTemplate
      title="Edited Pictures & Retouching Showcases"
      categoryName="Edited Pictures"
      description="Explore our high-end photo editing portfolio: studio retouching, luxury background replacements, wardrobe modifications, and viral visual transformations."
    />
  );
}
