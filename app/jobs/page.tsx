import React from "react";
import { Metadata } from "next";
import { CategoryPageTemplate } from "@/components/blog/CategoryPageTemplate";

export const metadata: Metadata = {
  title: "Job Openings & Careers | Fun All The Way Limited",
  description: "Browse verified job vacancies, creative media gigs, freelance opportunities, and corporate openings in Nigeria.",
};

export default function JobsPage() {
  return (
    <CategoryPageTemplate
      title="Verified Job Vacancies & Creative Gigs"
      categoryName="Jobs"
      categorySlug="jobs"
      description="Find the latest job openings, freelance graphic design & video editing contracts, digital media opportunities, and corporate vacancies across Nigeria."
    />
  );
}
