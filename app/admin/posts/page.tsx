"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { useStore } from "@/lib/store";
import { Plus, Search, Trash2, ExternalLink, Filter, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { DeleteModal } from "@/components/admin/DeleteModal";

export default function AdminPostsPage() {
  const { articles, deleteArticle } = useStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; slug: string; title: string } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deletedNotification, setDeletedNotification] = useState<string | null>(null);

  const categories = Array.from(new Set(articles.map((a) => a.category)));

  const filteredArticles = articles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" || article.category.toLowerCase() === selectedCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  const handleConfirmDelete = async () => {
    if (deleteTarget) {
      setIsDeleting(true);
      await deleteArticle(deleteTarget.id);
      if (deleteTarget.slug && deleteTarget.slug !== deleteTarget.id) {
        await deleteArticle(deleteTarget.slug);
      }
      setIsDeleting(false);
      setDeletedNotification(`Deleted "${deleteTarget.title}" successfully.`);
      setDeleteTarget(null);
      setTimeout(() => setDeletedNotification(null), 3000);
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      <AdminHeader
        title="Post Management"
        subtitle="Publish, inspect, and delete articles across all categories"
      />

      <div className="p-6 space-y-6 max-w-7xl">
        {deletedNotification && (
          <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-xl text-emerald-800 text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{deletedNotification}</span>
          </div>
        )}

        {/* Search & Filter Bar */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search posts by title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Filter className="w-4 h-4" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-2 text-xs text-slate-800 font-bold focus:outline-none"
              >
                <option value="all">All Categories</option>
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <Link href="/admin/posts/new">
              <Button variant="primary" size="sm" className="font-bold text-xs uppercase">
                <Plus className="w-4 h-4 mr-1" />
                CREATE POST
              </Button>
            </Link>
          </div>
        </div>

        {/* Posts Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-100">
                <tr>
                  <th className="px-5 py-3.5">Story</th>
                  <th className="px-5 py-3.5">Category</th>
                  <th className="px-5 py-3.5">Published Date</th>
                  <th className="px-5 py-3.5">Featured</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredArticles.length > 0 ? (
                  filteredArticles.map((article) => (
                    <tr key={article.id || article.slug} className="hover:bg-slate-50/80 transition-colors">
                      <td className="px-5 py-3.5 flex items-center gap-3">
                        <div className="w-14 h-12 rounded-lg overflow-hidden shrink-0 bg-slate-100 border border-slate-200">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={article.image}
                            alt={article.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="max-w-xs sm:max-w-md">
                          <Link
                            href={`/article/${article.slug}`}
                            target="_blank"
                            className="font-bold text-slate-900 hover:text-blue-600 transition-colors line-clamp-1 flex items-center gap-1"
                          >
                            <span>{article.title}</span>
                            <ExternalLink className="w-3 h-3 text-slate-400 shrink-0" />
                          </Link>
                          <span className="text-[11px] text-slate-400 line-clamp-1">
                            {article.excerpt}
                          </span>
                        </div>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className="bg-blue-50 text-blue-700 font-bold px-2 py-0.5 rounded text-[11px]">
                          {article.category}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-slate-500 font-medium">
                        {article.publishedAt}
                      </td>
                      <td className="px-5 py-3.5">
                        {article.featured ? (
                          <span className="bg-rose-50 text-rose-700 border border-rose-200 px-2 py-0.5 rounded text-[10px] font-black uppercase">
                            FEATURED
                          </span>
                        ) : (
                          <span className="text-slate-400 text-[11px]">Standard</span>
                        )}
                      </td>
                      <td className="px-5 py-3.5 text-right space-x-3">
                        <Link
                          href={`/article/${article.slug}`}
                          target="_blank"
                          className="text-slate-600 hover:text-blue-600 font-bold text-xs"
                        >
                          View
                        </Link>
                        <Link
                          href={`/admin/posts/edit/${article.id || article.slug}`}
                          className="text-blue-600 hover:text-blue-800 font-bold text-xs inline-flex items-center gap-0.5 p-1 rounded hover:bg-blue-50"
                        >
                          Edit
                        </Link>
                        <button
                          type="button"
                          onClick={() =>
                            setDeleteTarget({
                              id: article.id,
                              slug: article.slug,
                              title: article.title,
                            })
                          }
                          className="text-rose-600 hover:text-rose-800 font-bold text-xs p-1 rounded hover:bg-rose-50 cursor-pointer inline-flex items-center gap-0.5"
                          title="Delete article"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete</span>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-5 py-8 text-center text-slate-500 text-sm">
                      No posts found matching your filter criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteModal
        isOpen={Boolean(deleteTarget)}
        title="Confirm Post Deletion"
        itemName={deleteTarget?.title || ""}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTarget(null)}
        isDeleting={isDeleting}
      />
    </div>
  );
}
