"use client";

import { useState, useEffect } from "react";
import { Article, Category } from "@/types";
import { MOCK_ARTICLES } from "@/data/mockArticles";
import { ALL_CATEGORIES, PRIMARY_ICON_CATEGORIES } from "@/data/categories";
import { createClient } from "@/utils/supabase/client";

export interface AdSetting {
  id: string;
  slotType: "top_banner" | "horizontal_feed" | "in_article" | "sidebar";
  title: string;
  subtitle: string;
  imageUrl?: string;
  destinationUrl: string;
  buttonText: string;
  isActive: boolean;
}

const DEFAULT_ADS: AdSetting[] = [
  {
    id: "top_banner_1",
    slotType: "top_banner",
    title: "PROMOTE YOUR MUSIC & BRAND",
    subtitle: "Reach Over 2.5 Million Active Entertainment Fans Daily",
    destinationUrl: "/contact?tab=advertise",
    buttonText: "ADVERTISE HERE",
    isActive: true,
  },
  {
    id: "horizontal_1",
    slotType: "horizontal_feed",
    title: "NIGERIA'S #1 MUSIC & MEDIA PROMOTION PLATFORM",
    subtitle: "Upload your tracks, press releases & music videos to millions of listeners worldwide.",
    destinationUrl: "/contact?tab=advertise",
    buttonText: "GET STARTED",
    isActive: true,
  },
  {
    id: "in_article_1",
    slotType: "in_article",
    title: "Promote Your Single, Mixtape or Brand on FunAllTheWay",
    subtitle: "Get featured on top trending charts, social media pushes, and homepage banners today.",
    destinationUrl: "/contact?tab=advertise",
    buttonText: "PROMOTE NOW",
    isActive: true,
  },
];

const ARTICLES_STORAGE_KEY = "funalltheway_articles";
const CATEGORIES_STORAGE_KEY = "funalltheway_categories";
const ADS_STORAGE_KEY = "funalltheway_ads";

const INITIAL_CATEGORIES: Category[] = ALL_CATEGORIES.map((c) => ({
  id: c.slug,
  name: c.name,
  slug: c.slug,
  description: c.description,
  isPrimaryIcon: PRIMARY_ICON_CATEGORIES.some((p) => p.name.toLowerCase() === c.name.toLowerCase()),
}));

class DataStore {
  private articles: Article[] = [];
  private categories: Category[] = [];
  private ads: AdSetting[] = [];
  private listeners: Set<() => void> = new Set();
  private initialized = false;
  private isLoaded = false;
  private supabase = createClient();

  constructor() {
    if (typeof window !== "undefined") {
      this.initSync();
    }
  }

  // Instant synchronous cache read
  public initSync() {
    if (this.initialized) return;
    try {
      const storedArticles = localStorage.getItem(ARTICLES_STORAGE_KEY);
      if (storedArticles) {
        this.articles = JSON.parse(storedArticles);
      } else {
        this.articles = [];
      }

      const storedCategories = localStorage.getItem(CATEGORIES_STORAGE_KEY);
      this.categories = storedCategories ? JSON.parse(storedCategories) : INITIAL_CATEGORIES;

      const storedAds = localStorage.getItem(ADS_STORAGE_KEY);
      this.ads = storedAds ? JSON.parse(storedAds) : DEFAULT_ADS;
    } catch {
      this.articles = [];
      this.categories = INITIAL_CATEGORIES;
      this.ads = DEFAULT_ADS;
    }
    this.initialized = true;
    this.isLoaded = true;

    // Fetch from Supabase in background
    this.fetchFromSupabase();
  }

  private async fetchFromSupabase() {
    try {
      const { data: dbArticles, error: artErr } = await this.supabase
        .from("articles")
        .select("*")
        .order("created_at", { ascending: false });

      if (!artErr && dbArticles && dbArticles.length > 0) {
        this.articles = dbArticles.map((row: any) => ({
          id: row.id,
          title: row.title,
          slug: row.slug,
          excerpt: row.excerpt,
          content: row.content || [],
          image: row.image,
          category: row.category_name || row.category || "News",
          categorySlug: row.category_slug || "news",
          location: row.location || "Lagos",
          author: {
            name: row.author_name || "Editor",
            avatar: row.author_avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
            role: row.author_role || "Contributing Editor",
          },
          publishedAt: row.published_at ? new Date(row.published_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "Recent",
          readTime: row.read_time || "3 min read",
          views: row.views || 0,
          featured: Boolean(row.featured),
        }));
        this.saveLocally();
      }

      const { data: dbCategories, error: catErr } = await this.supabase
        .from("categories")
        .select("*");

      if (!catErr && dbCategories && dbCategories.length > 0) {
        this.categories = dbCategories.map((row: any) => ({
          id: row.id,
          name: row.name,
          slug: row.slug,
          description: row.description || "",
          isPrimaryIcon: Boolean(row.is_primary),
        }));
        this.saveLocally();
      }

      const { data: dbAds, error: adErr } = await this.supabase
        .from("advertisements")
        .select("*");

      if (!adErr && dbAds && dbAds.length > 0) {
        this.ads = dbAds.map((row: any) => ({
          id: row.id,
          slotType: row.slot_type,
          title: row.title,
          subtitle: row.subtitle || "",
          imageUrl: row.image_url,
          destinationUrl: row.destination_url || "/contact",
          buttonText: row.button_text || "GET STARTED",
          isActive: Boolean(row.is_active),
        }));
        this.saveLocally();
      }
    } catch (e) {
      console.log("Active with local cache sync");
    } finally {
      this.notify();
    }
  }

  private saveLocally() {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(ARTICLES_STORAGE_KEY, JSON.stringify(this.articles));
    } catch (e: any) {
      try {
        const compact = this.articles.slice(0, 30).map((a) => ({
          ...a,
          content: a.content?.slice(0, 2),
        }));
        localStorage.setItem(ARTICLES_STORAGE_KEY, JSON.stringify(compact));
      } catch {
        // In-memory cache handles smoothly
      }
    }

    try {
      localStorage.setItem(CATEGORIES_STORAGE_KEY, JSON.stringify(this.categories));
      localStorage.setItem(ADS_STORAGE_KEY, JSON.stringify(this.ads));
    } catch (e) {
      console.error(e);
    }
    this.notify();
  }

  private notify() {
    this.listeners.forEach((listener) => listener());
  }

  public subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  public getIsLoaded(): boolean {
    return this.isLoaded;
  }

  public getArticles(): Article[] {
    if (!this.initialized && typeof window !== "undefined") this.initSync();
    if (typeof window !== "undefined" && this.articles.length === 0) {
      try {
        const stored = localStorage.getItem(ARTICLES_STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) {
            this.articles = parsed;
          }
        }
      } catch {}
    }
    return this.articles;
  }

  public getArticleBySlug(slug: string): Article | undefined {
    return this.getArticles().find((a) => a.slug === slug);
  }

  public async addArticle(article: Omit<Article, "id" | "publishedAt" | "views">): Promise<Article> {
    const newArticle: Article = {
      ...article,
      id: `post_${Date.now()}`,
      publishedAt: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      views: 0,
    };
    this.articles = [newArticle, ...this.articles];
    this.saveLocally();
    this.notify();

    try {
      await this.supabase.from("articles").insert({
        title: newArticle.title,
        slug: newArticle.slug,
        excerpt: newArticle.excerpt,
        content: newArticle.content || [],
        image: newArticle.image,
        category_name: newArticle.category,
        category_slug: newArticle.categorySlug,
        location: newArticle.location,
        author_name: newArticle.author.name,
        author_avatar: newArticle.author.avatar,
        author_role: newArticle.author.role,
        read_time: newArticle.readTime,
        featured: newArticle.featured,
      });
    } catch (e) {
      console.error("Supabase insert error:", e);
    }

    return newArticle;
  }

  public async updateArticle(idOrSlug: string, updates: Partial<Article>): Promise<boolean> {
    const idx = this.articles.findIndex((a) => a.id === idOrSlug || a.slug === idOrSlug);
    if (idx === -1) return false;

    this.articles[idx] = { ...this.articles[idx], ...updates };
    this.saveLocally();
    this.notify();

    try {
      await this.supabase
        .from("articles")
        .update({
          title: updates.title,
          slug: updates.slug,
          excerpt: updates.excerpt,
          content: updates.content,
          image: updates.image,
          category_name: updates.category,
          category_slug: updates.categorySlug,
          location: updates.location,
          read_time: updates.readTime,
          featured: updates.featured,
          updated_at: new Date().toISOString(),
        })
        .or(`id.eq.${idOrSlug},slug.eq.${idOrSlug}`);
    } catch (e) {
      console.error("Supabase update error:", e);
    }

    return true;
  }

  public async deleteArticle(idOrSlug: string): Promise<boolean> {
    this.articles = this.articles.filter((a) => a.id !== idOrSlug && a.slug !== idOrSlug);
    this.saveLocally();
    this.notify();

    try {
      await this.supabase.from("articles").delete().or(`id.eq.${idOrSlug},slug.eq.${idOrSlug}`);
    } catch (e) {
      console.error("Supabase delete error:", e);
    }

    return true;
  }

  public getCategories(): Category[] {
    if (!this.initialized && typeof window !== "undefined") this.initSync();
    return this.categories;
  }

  public async addCategory(category: Omit<Category, "id">): Promise<Category> {
    const newCat: Category = {
      ...category,
      id: `cat_${Date.now()}`,
    };
    this.categories = [...this.categories, newCat];
    this.saveLocally();

    try {
      await this.supabase.from("categories").insert({
        name: newCat.name,
        slug: newCat.slug,
        description: newCat.description,
        is_primary: newCat.isPrimaryIcon,
      });
    } catch (e) {
      console.error("Supabase category insert error:", e);
    }

    return newCat;
  }

  public async deleteCategory(id: string): Promise<boolean> {
    this.categories = this.categories.filter((c) => c.id !== id && c.slug !== id);
    this.saveLocally();

    try {
      await this.supabase.from("categories").delete().eq("id", id);
      await this.supabase.from("categories").delete().eq("slug", id);
    } catch (e) {
      console.error("Supabase category delete error:", e);
    }

    return true;
  }

  public getAds(): AdSetting[] {
    if (!this.initialized && typeof window !== "undefined") this.initSync();
    return this.ads;
  }

  public getAdBySlot(slotType: string): AdSetting | undefined {
    return this.getAds().find((ad) => ad.slotType === slotType && ad.isActive);
  }

  public async updateAd(slotType: string, updates: Partial<AdSetting>) {
    const idx = this.ads.findIndex((ad) => ad.slotType === slotType);
    if (idx !== -1) {
      this.ads[idx] = { ...this.ads[idx], ...updates };
    } else {
      this.ads.push({
        id: `ad_${Date.now()}`,
        slotType: slotType as any,
        title: updates.title || "Promote on FunAllTheWay",
        subtitle: updates.subtitle || "",
        destinationUrl: updates.destinationUrl || "/contact",
        buttonText: updates.buttonText || "GET STARTED",
        isActive: updates.isActive !== undefined ? updates.isActive : true,
        ...updates,
      });
    }
    this.saveLocally();

    try {
      const ad = this.ads.find((a) => a.slotType === slotType);
      if (ad) {
        await this.supabase.from("advertisements").upsert({
          slot_type: ad.slotType,
          title: ad.title,
          subtitle: ad.subtitle,
          image_url: ad.imageUrl,
          destination_url: ad.destinationUrl,
          button_text: ad.buttonText,
          is_active: ad.isActive,
        });
      }
    } catch (e) {
      console.error("Supabase ad upsert error:", e);
    }
  }
}

export const store = new DataStore();

export function useStore() {
  const [mounted, setMounted] = useState(false);
  const [, setTick] = useState(0);

  useEffect(() => {
    setMounted(true);
    store.initSync();
    return store.subscribe(() => setTick((t) => t + 1));
  }, []);

  return {
    isLoaded: mounted,
    isMounted: mounted,
    articles: mounted ? store.getArticles() : [],
    categories: mounted ? store.getCategories() : [],
    ads: mounted ? store.getAds() : [],
    getAdBySlot: (slot: string) => store.getAdBySlot(slot),
    addArticle: (data: any) => store.addArticle(data),
    updateArticle: (id: string, data: any) => store.updateArticle(id, data),
    deleteArticle: (id: string) => store.deleteArticle(id),
    addCategory: (data: any) => store.addCategory(data),
    deleteCategory: (id: string) => store.deleteCategory(id),
    updateAd: (slot: string, data: any) => store.updateAd(slot, data),
  };
}
