"use client";

import React, { use } from "react";
import Link from "next/link";
import { Calendar, Clock, ArrowLeft, ArrowRight, Tag, AlertCircle } from "lucide-react";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Badge } from "@/components/ui/Badge";
import { BlogImage } from "@/components/ui/BlogImage";
import { SocialShare } from "@/components/blog/SocialShare";
import { RelatedPosts } from "@/components/blog/RelatedPosts";
import { TopLandscapeAd, DualPromoBanners } from "@/components/ads/CustomAdBanners";
import { HorizontalAd } from "@/components/ads/HorizontalAd";
import { InArticleAd } from "@/components/ads/InArticleAd";
import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/Button";

interface ArticlePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function ArticleDetailsPage({ params }: ArticlePageProps) {
  const { slug } = use(params);
  const { articles } = useStore();

  const articleIndex = articles.findIndex((a) => a.slug === slug);
  const article = articleIndex !== -1 ? articles[articleIndex] : null;

  if (!article) {
    return (
      <div className="max-w-2xl mx-auto py-16 px-4 text-center space-y-4">
        <div className="w-14 h-14 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-black text-slate-900">Story Not Found</h1>
        <p className="text-sm text-slate-500 max-w-md mx-auto">
          The requested article may have been moved, removed, or is still being published.
        </p>
        <div className="pt-2 flex justify-center gap-3">
          <Link href="/">
            <Button variant="primary" size="md" className="font-bold text-xs uppercase">
              ← Return to Homepage
            </Button>
          </Link>
          <Link href="/admin/posts/new">
            <Button variant="outline" size="md" className="font-bold text-xs uppercase">
              Write New Article
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const prevArticle = articleIndex > 0 ? articles[articleIndex - 1] : null;
  const nextArticle =
    articleIndex < articles.length - 1 ? articles[articleIndex + 1] : null;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Top Breadcrumb */}
      <Breadcrumb
        items={[
          { label: article.category || "News", href: `/${article.categorySlug || "news"}` },
          { label: article.title },
        ]}
      />

      {/* Top Landscape Advert Banner */}
      <TopLandscapeAd />

      {/* Article Container */}
      <article className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-xs">
        {/* Category Badge & Metadata */}
        <div className="flex items-center gap-2 mb-3">
          <Badge
            label={article.category}
            href={`/${article.categorySlug}`}
            variant="primary"
            size="md"
          />
        </div>

        {/* Article Title */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 leading-tight mb-4 tracking-tight">
          {article.title}
        </h1>

        {/* Excerpt Lead */}
        {article.excerpt && (
          <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed mb-6 border-l-4 border-blue-600 pl-4 py-1 bg-slate-50 rounded-r">
            {article.excerpt}
          </p>
        )}

        {/* Author info & Timestamps */}
        <div className="flex flex-wrap items-center justify-between gap-4 py-3.5 border-y border-slate-100 text-xs text-slate-500 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden relative bg-slate-100 border border-slate-200">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={article.author?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"}
                alt={article.author?.name || "Author"}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="font-bold text-slate-900">{article.author?.name || "Editorial Desk"}</p>
              <p className="text-[11px] text-slate-400">{article.author?.role || "Contributing Editor"}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-slate-500">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              {article.publishedAt || "Recent"}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              {article.readTime || "3 min read"}
            </span>
          </div>
        </div>

        {/* Feature Media */}
        <div className="mb-6 rounded-2xl overflow-hidden border border-slate-200 bg-slate-900 shadow-sm">
          {article.image.endsWith(".mp4") ? (
            <video src={article.image} controls className="w-full max-h-[500px] object-cover" />
          ) : (
            <BlogImage
              src={article.image}
              alt={article.title}
              aspectRatio="video"
              priority={true}
              className="w-full max-h-[500px]"
            />
          )}
        </div>

        {/* Top In-Article Ad */}
        <InArticleAd />

        {/* Formatted Content Paragraphs */}
        <div className="prose prose-slate max-w-none text-slate-800 text-base leading-relaxed space-y-5">
          {article.content && article.content.length > 0 ? (
            article.content.map((para, idx) => (
              <React.Fragment key={idx}>
                <p>{para}</p>
                {/* Insert Ad after 2nd paragraph */}
                {idx === 1 && <InArticleAd />}
              </React.Fragment>
            ))
          ) : (
            <p>
              This report contains coverage from Nigerian entertainment sources. Stay tuned for ongoing live updates on FunAllTheWayLimited.com.
            </p>
          )}
        </div>

        {/* Article Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="flex items-center flex-wrap gap-2 mt-8 pt-4 border-t border-slate-100">
            <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
              <Tag className="w-3.5 h-3.5" /> TAGS:
            </span>
            {article.tags.map((tag) => (
              <Link
                key={tag}
                href={`/search?q=${encodeURIComponent(tag)}`}
                className="text-xs bg-slate-100 hover:bg-blue-50 hover:text-blue-600 px-2.5 py-1 rounded text-slate-700 font-medium transition-colors"
              >
                #{tag}
              </Link>
            ))}
          </div>
        )}

        {/* Social Sharing */}
        <SocialShare title={article.title} />

        {/* Middle Promotional Showcase Banners */}
        <DualPromoBanners placementTitle="FUN ALL THE WAY LIMITED SERVICES & PACKAGES" />

        {/* Previous / Next Article Navigation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-slate-200">
          {prevArticle ? (
            <Link
              href={`/article/${prevArticle.slug}`}
              className="p-4 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 transition-all group"
            >
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1 group-hover:text-blue-600">
                <ArrowLeft className="w-3.5 h-3.5" /> PREVIOUS STORY
              </span>
              <p className="text-xs font-bold text-slate-800 line-clamp-2 mt-1 group-hover:text-blue-600">
                {prevArticle.title}
              </p>
            </Link>
          ) : <div />}

          {nextArticle ? (
            <Link
              href={`/article/${nextArticle.slug}`}
              className="p-4 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 transition-all text-right group"
            >
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-end gap-1 group-hover:text-blue-600">
                NEXT STORY <ArrowRight className="w-3.5 h-3.5" />
              </span>
              <p className="text-xs font-bold text-slate-800 line-clamp-2 mt-1 group-hover:text-blue-600">
                {nextArticle.title}
              </p>
            </Link>
          ) : <div />}
        </div>

        {/* Related Stories Grid */}
        <RelatedPosts articles={articles} currentArticleId={article.id} />
      </article>

      {/* Bottom Dual Promotional Banners */}
      <DualPromoBanners placementTitle="SPECIAL ADVERT & PROMOTION PACKAGES" />

      {/* Bottom Horizontal Ad */}
      <HorizontalAd />
    </div>
  );
}
