import React from "react";
import { Metadata } from "next";
import { CategoryPageTemplate } from "@/components/blog/CategoryPageTemplate";

export const metadata: Metadata = {
  title: "Comedy Skits & Viral Videos | Fun All The Way Limited",
  description: "Watch hilarious comedy skits, street interviews, and viral jokes from top Nigerian content creators.",
};

export default function ComedyPage() {
  return (
    <CategoryPageTemplate
      title="Viral Comedy Skits & Laughs"
      categoryName="Comedy"
      categorySlug="comedy"
      description="Enjoy non-stop laughs with viral comedy videos, trending comedian skits, street pranks, and hilarious parodies from across Africa."
    />
  );
}
