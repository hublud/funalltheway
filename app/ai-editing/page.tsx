import React from "react";
import { Metadata } from "next";
import { CategoryPageTemplate } from "@/components/blog/CategoryPageTemplate";

export const metadata: Metadata = {
  title: "AI Editing & Generative Visuals | Fun All The Way Limited",
  description: "Explore AI photo enhancement, AI video visualizers, generative transformations, and futuristic visual artwork.",
};

export default function AiEditingPage() {
  return (
    <CategoryPageTemplate
      title="AI Editing & Next-Gen Visuals"
      categoryName="Ai Editing"
      description="Hyper-realistic AI portraits, visual avatar transformations, generative scene expansions, and AI-assisted video editing showcases."
    />
  );
}
