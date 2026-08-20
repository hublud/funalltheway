"use client";

import React, { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { MediaUploader } from "@/components/admin/MediaUploader";
import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, Save, Plus, Trash2, AlertCircle } from "lucide-react";
import Link from "next/link";

interface EditPostPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function EditPostPage({ params }: EditPostPageProps) {
  const { id } = use(params);
  const router = useRouter();
  const { articles, categories, updateArticle } = useStore();

  const article = articles.find((a) => a.id === id || a.slug === id);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [categorySlug, setCategorySlug] = useState("news");
  const [location, setLocation] = useState("Lagos");
  const [authorName, setAuthorName] = useState("FunAllTheWay Editorial");
  const [readTime, setReadTime] = useState("3 min read");
  const [featured, setFeatured] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [paragraphs, setParagraphs] = useState<string[]>([""]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (article && !initialized) {
      setTitle(article.title);
      setSlug(article.slug);
      setExcerpt(article.excerpt || "");
      setCategorySlug(article.categorySlug || "news");
      setLocation(article.location || "Lagos");
      setAuthorName(article.author?.name || "Editor");
      setReadTime(article.readTime || "3 min read");
      setFeatured(Boolean(article.featured));
      setImageUrl(article.image || "");
      setParagraphs(article.content && article.content.length > 0 ? article.content : [""]);
      setInitialized(true);
    }
  }, [article, initialized]);

  if (!article && initialized) {
    return (
      <div className="flex-1 flex flex-col p-8 items-center justify-center text-center space-y-4">
        <div className="w-14 h-14 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-slate-800">Article Not Found</h2>
        <p className="text-xs text-slate-500">The article you are trying to edit does not exist.</p>
        <Link href="/admin/posts">
          <Button variant="primary" size="sm">Back to All Posts</Button>
        </Link>
      </div>
    );
  }

  const handleAddParagraph = () => {
    setParagraphs([...paragraphs, ""]);
  };

  const handleParagraphChange = (index: number, val: string) => {
    const next = [...paragraphs];
    next[index] = val;
    setParagraphs(next);
  };

  const handleRemoveParagraph = (index: number) => {
    if (paragraphs.length > 1) {
      setParagraphs(paragraphs.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !imageUrl) {
      alert("Please provide an article title and a feature image.");
      return;
    }

    setIsSubmitting(true);

    const selectedCatObj = categories.find((c) => c.slug === categorySlug);
    const catName = selectedCatObj ? selectedCatObj.name : "News";

    await updateArticle(article?.id || id, {
      title: title.trim(),
      slug: slug.trim() || article?.slug || `story-${Date.now()}`,
      excerpt: excerpt.trim() || paragraphs[0].slice(0, 120),
      content: paragraphs.filter((p) => p.trim().length > 0),
      image: imageUrl,
      category: catName,
      categorySlug: categorySlug,
      location: location.trim() || "Lagos",
      author: {
        name: authorName.trim() || "Editor",
        avatar: article?.author?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
        role: "Contributing Editor",
      },
      readTime: readTime || "3 min read",
      featured: featured,
    });

    setIsSubmitting(false);
    router.push("/admin/posts");
  };

  return (
    <div className="flex-1 flex flex-col pb-20 md:pb-12">
      <AdminHeader
        title="Edit Article"
        subtitle={`Updating "${article?.title || 'Story'}"`}
      />

      <div className="p-3 sm:p-6 max-w-5xl space-y-4 sm:space-y-6">
        <div className="flex items-center justify-between">
          <Link
            href="/admin/posts"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-blue-600 transition-colors py-1"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Posts</span>
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200 shadow-xs space-y-4 sm:space-y-5">
            <h2 className="text-sm sm:text-base font-bold text-slate-900 border-b pb-2 sm:pb-3">
              1. Story Details
            </h2>

            {/* Title & Slug */}
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Article Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Top 10 Afrobeats Bangers"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold"
                />
              </div>

              <div>
                <label className="block text-[10px] sm:text-[11px] font-bold text-slate-500 uppercase mb-1">
                  URL Slug
                </label>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-100 border border-slate-200 rounded-lg font-mono text-slate-600"
                />
              </div>
            </div>

            {/* Category & Read Time Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Category *
                </label>
                <select
                  value={categorySlug}
                  onChange={(e) => setCategorySlug(e.target.value)}
                  className="w-full px-3 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-lg font-bold text-slate-800 focus:outline-none"
                >
                  {categories.map((cat) => (
                    <option key={cat.slug} value={cat.slug}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Reading Time
                </label>
                <input
                  type="text"
                  placeholder="e.g. 4 min read"
                  value={readTime}
                  onChange={(e) => setReadTime(e.target.value)}
                  className="w-full px-3 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none"
                />
              </div>
            </div>

            {/* Excerpt */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Short Excerpt / Lead Summary
              </label>
              <textarea
                rows={2}
                placeholder="A compelling overview..."
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                className="w-full px-3 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none"
              />
            </div>

            {/* Featured toggle */}
            <div className="flex items-center gap-3 pt-1 sm:pt-2">
              <input
                type="checkbox"
                id="featuredToggle"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded shrink-0"
              />
              <label htmlFor="featuredToggle" className="text-xs font-bold text-slate-800 cursor-pointer">
                Spotlight this story in the Homepage <strong className="text-blue-600">Featured Section</strong>
              </label>
            </div>
          </div>

          {/* Feature Image */}
          <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200 shadow-xs space-y-3 sm:space-y-4">
            <div className="flex items-center justify-between border-b pb-2 sm:pb-3">
              <h2 className="text-sm sm:text-base font-bold text-slate-900">
                2. Feature Media
              </h2>
              <span className="text-[11px] sm:text-xs text-blue-600 font-bold">Cloudinary</span>
            </div>

            <MediaUploader
              folder="funalltheway/posts"
              initialUrl={imageUrl}
              allowMultiple={true}
              onUploadSuccess={(url) => setImageUrl(url)}
            />

            <div className="pt-1">
              <label className="block text-[10px] sm:text-[11px] font-bold text-slate-500 uppercase mb-1">
                Image / Video URL:
              </label>
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg font-mono text-slate-700"
              />
            </div>
          </div>

          {/* Article Body Content */}
          <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200 shadow-xs space-y-3 sm:space-y-4">
            <div className="flex items-center justify-between border-b pb-2 sm:pb-3">
              <h2 className="text-sm sm:text-base font-bold text-slate-900">
                3. Story Content Paragraphs
              </h2>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleAddParagraph}
                className="text-xs font-bold py-1 px-2.5"
              >
                <Plus className="w-3.5 h-3.5 mr-1" /> Add Paragraph
              </Button>
            </div>

            {paragraphs.map((p, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="font-bold">Paragraph {idx + 1}</span>
                  {paragraphs.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveParagraph(idx)}
                      className="text-rose-600 hover:text-rose-800 text-[11px] font-bold inline-flex items-center gap-1 py-0.5 px-1"
                    >
                      <Trash2 className="w-3 h-3" /> Remove
                    </button>
                  )}
                </div>
                <textarea
                  rows={3}
                  value={p}
                  onChange={(e) => handleParagraphChange(idx, e.target.value)}
                  placeholder={`Write paragraph ${idx + 1}...`}
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            ))}
          </div>

          {/* Submit Actions */}
          <div className="flex items-center justify-end gap-3 pt-2 sm:pt-4">
            <Link href="/admin/posts">
              <Button type="button" variant="outline" size="md" className="font-bold text-xs">
                Cancel
              </Button>
            </Link>
            <Button
              type="submit"
              variant="primary"
              size="md"
              disabled={isSubmitting}
              className="font-bold text-xs uppercase tracking-wider px-6 sm:px-8 py-2.5 sm:py-3 shadow-md w-full sm:w-auto"
            >
              <Save className="w-4 h-4 mr-1.5" />
              {isSubmitting ? "Saving Updates..." : "SAVE & UPDATE STORY"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
