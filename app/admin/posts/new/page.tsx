"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { MediaUploader } from "@/components/admin/MediaUploader";
import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, Save, Sparkles, Plus, Trash2 } from "lucide-react";
import Link from "next/link";

export default function CreatePostPage() {
  const router = useRouter();
  const { categories, addArticle } = useStore();

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

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTitle(val);
    const autoSlug = val
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
    setSlug(autoSlug);
  };

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
      alert("Please provide an article title and upload a feature image.");
      return;
    }

    setIsSubmitting(true);

    const selectedCatObj = categories.find((c) => c.slug === categorySlug);
    const catName = selectedCatObj ? selectedCatObj.name : "News";

    await addArticle({
      title: title.trim(),
      slug: slug.trim() || `story-${Date.now()}`,
      excerpt: excerpt.trim() || (paragraphs[0] ? paragraphs[0].slice(0, 120) : ""),
      content: paragraphs.filter((p) => p.trim().length > 0),
      image: imageUrl,
      category: catName,
      categorySlug: categorySlug,
      author: {
        name: authorName.trim() || "Editor",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
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
        title="Create New Story"
        subtitle="Write a new article and upload media directly to Cloudinary"
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
                  placeholder="e.g. Top 10 Afrobeats Bangers Dominating Playlists This Week"
                  value={title}
                  onChange={handleTitleChange}
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold"
                />
              </div>

              <div>
                <label className="block text-[10px] sm:text-[11px] font-bold text-slate-500 uppercase mb-1">
                  URL Slug (Auto-generated)
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
                placeholder="A compelling 1-2 sentence overview for the card..."
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

          {/* Feature Media */}
          <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200 shadow-xs space-y-3 sm:space-y-4">
            <div className="flex items-center justify-between border-b pb-2 sm:pb-3">
              <h2 className="text-sm sm:text-base font-bold text-slate-900">
                2. Feature Media (Photos / Video)
              </h2>
              <span className="text-[11px] sm:text-xs text-blue-600 font-bold">Videos & Images</span>
            </div>

            <MediaUploader
              folder="funalltheway/posts"
              initialUrl={imageUrl}
              allowMultiple={true}
              onUploadSuccess={(url) => setImageUrl(url)}
            />

            {/* Direct URL input fallback */}
            <div className="pt-1">
              <label className="block text-[10px] sm:text-[11px] font-bold text-slate-500 uppercase mb-1">
                Or enter image / video direct URL:
              </label>
              <input
                type="url"
                placeholder="https://images.unsplash.com/... or https://res.cloudinary.com/..."
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

          {/* Submit Actions (Desktop + Mobile inline) */}
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
              {isSubmitting ? "Publishing..." : "PUBLISH STORY NOW"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
