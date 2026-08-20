import React from "react";
import { Metadata } from "next";
import { CategoryPageTemplate } from "@/components/blog/CategoryPageTemplate";
import { MOCK_ARTICLES } from "@/data/mockArticles";

export const metadata: Metadata = {
  title: "Comedy Skits & Viral Jokes | Fun All The Way Limited",
  description: "Watch the funniest Nigerian comedy skits, viral creator clips, stand-up routines, and memes.",
};

export default function ComedyPage() {
  const articles = MOCK_ARTICLES.filter((a) => a.categorySlug === "comedy");

  return (
    <CategoryPageTemplate
      title="Comedy Skits, Stand-Up & Jokes"
      categoryName="Comedy"
      description="Enjoy non-stop laughter with Nigeria's most creative comedic masters, trending skit creators, and meme culture highlights."
      articles={articles.length > 0 ? articles : MOCK_ARTICLES}
    />
  );
}
