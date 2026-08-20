import React from "react";
import { Metadata } from "next";
import { CategoryPageTemplate } from "@/components/blog/CategoryPageTemplate";
import { MOCK_ARTICLES } from "@/data/mockArticles";

export const metadata: Metadata = {
  title: "Creative & Media Jobs in Nigeria | Fun All The Way Limited",
  description: "Browse verified job vacancies for video editors, graphic designers, content creators, copywriters, and social media managers.",
};

export default function JobsPage() {
  const articles = MOCK_ARTICLES.filter((a) => a.categorySlug === "jobs");

  return (
    <CategoryPageTemplate
      title="Creative, Media & Editing Jobs Available"
      categoryName="Jobs"
      description="Find verified openings for video editors, AI prompt designers, graphic creators, social media managers, and music studio assistants in Nigeria."
      articles={articles.length > 0 ? articles : MOCK_ARTICLES}
    />
  );
}
