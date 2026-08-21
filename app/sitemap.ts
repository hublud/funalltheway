import { MetadataRoute } from "next";
import { siteConfig } from "@/data/siteConfig";
import { ALL_CATEGORIES } from "@/data/categories";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url;
  const currentDate = new Date();

  // Static site pages
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: currentDate,
      changeFrequency: "always",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/jobs`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: currentDate,
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: currentDate,
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${baseUrl}/search`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.6,
    },
  ];

  // Category pages
  const categoryRoutes: MetadataRoute.Sitemap = ALL_CATEGORIES.map((cat) => ({
    url: `${baseUrl}/${cat.slug}`,
    lastModified: currentDate,
    changeFrequency: "daily",
    priority: 0.8,
  }));

  // Fetch dynamic articles if Supabase is connected
  let articleRoutes: MetadataRoute.Sitemap = [];
  if (isSupabaseConfigured) {
    try {
      const { data: articles } = await supabase
        .from("articles")
        .select("slug, updated_at, created_at")
        .order("created_at", { ascending: false });

      if (articles && articles.length > 0) {
        articleRoutes = articles.map((art) => ({
          url: `${baseUrl}/article/${art.slug}`,
          lastModified: art.updated_at ? new Date(art.updated_at) : art.created_at ? new Date(art.created_at) : currentDate,
          changeFrequency: "weekly",
          priority: 0.75,
        }));
      }
    } catch {
      // Fallback cleanly
    }
  }

  return [...staticRoutes, ...categoryRoutes, ...articleRoutes];
}
