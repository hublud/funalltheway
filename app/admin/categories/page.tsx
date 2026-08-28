"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { useStore } from "@/lib/store";
import {
  Plus,
  Trash2,
  FolderTree,
  CheckCircle2,
  BarChart3,
  FileText,
  TrendingUp,
  AlertCircle,
  Search,
  ArrowUpRight,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { DeleteModal } from "@/components/admin/DeleteModal";
import { Category } from "@/types";

export default function AdminCategoriesPage() {
  const { categories, articles, addCategory, deleteCategory } = useStore();
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [isPrimary, setIsPrimary] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; name: string } | null>(null);
  const [notification, setNotification] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setName(val);
    const autoSlug = val
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
    setSlug(autoSlug);
  };

  const handleCreateCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    addCategory({
      name: name.trim(),
      slug: slug.trim() || name.toLowerCase().replace(/\s+/g, "-"),
      description: description.trim() || `The latest ${name.trim()} stories on FunAllTheWay.`,
      isPrimaryIcon: isPrimary,
    });

    setName("");
    setSlug("");
    setDescription("");
    setIsPrimary(false);
    setNotification(`Created category "${name.trim()}" successfully.`);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleConfirmDelete = () => {
    if (deleteTarget) {
      deleteCategory(deleteTarget.id);
      setNotification(`Deleted category "${deleteTarget.name}".`);
      setDeleteTarget(null);
      setTimeout(() => setNotification(null), 3000);
    }
  };

  // Helper to count posts for a given category
  const getPostCount = (cat: Category) => {
    const cName = (cat.name || "").toLowerCase().trim();
    const cSlug = (cat.slug || "").toLowerCase().trim();
    return articles.filter((a) => {
      const artCat = (a.category || "").toLowerCase().trim();
      const artSlug = (a.categorySlug || "").toLowerCase().trim();
      return artCat === cName || artSlug === cSlug || artCat === cSlug;
    }).length;
  };

  // Category stats summary
  const totalPostsCount = articles.length;
  const categoriesWithPosts = categories.map((cat) => ({
    ...cat,
    count: getPostCount(cat),
  }));

  const topCategory = [...categoriesWithPosts].sort((a, b) => b.count - a.count)[0];
  const emptyCategoriesCount = categoriesWithPosts.filter((c) => c.count === 0).length;

  const filteredCategories = categoriesWithPosts.filter((cat) => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      cat.name.toLowerCase().includes(term) ||
      cat.slug.toLowerCase().includes(term) ||
      (cat.description && cat.description.toLowerCase().includes(term))
    );
  });

  return (
    <div className="flex-1 flex flex-col pb-20 md:pb-12">
      <AdminHeader
        title="Category Manager"
        subtitle="Create, organize, and inspect post stats across all taxonomy categories"
      />

      <div className="p-3 sm:p-6 space-y-4 sm:space-y-6 max-w-7xl">
        {notification && (
          <div className="p-3.5 sm:p-4 bg-emerald-50 border border-emerald-300 rounded-xl text-emerald-800 text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{notification}</span>
          </div>
        )}

        {/* Quick Stats Overview Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between text-slate-500 text-xs font-bold mb-1">
              <span>Total Categories</span>
              <FolderTree className="w-4 h-4 text-blue-600" />
            </div>
            <p className="text-2xl font-black text-slate-900">{categories.length}</p>
            <p className="text-[11px] text-slate-400 mt-1">Taxonomy nodes</p>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between text-slate-500 text-xs font-bold mb-1">
              <span>Published Posts</span>
              <FileText className="w-4 h-4 text-indigo-600" />
            </div>
            <p className="text-2xl font-black text-slate-900">{totalPostsCount}</p>
            <p className="text-[11px] text-slate-400 mt-1">Distributed across categories</p>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between text-slate-500 text-xs font-bold mb-1">
              <span>Top Category</span>
              <TrendingUp className="w-4 h-4 text-emerald-600" />
            </div>
            <p className="text-lg font-black text-slate-900 truncate">
              {topCategory?.name || "None"}
            </p>
            <p className="text-[11px] text-emerald-600 font-bold mt-1">
              {topCategory?.count || 0} posts published
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-4 rounded-2xl text-white shadow-md flex flex-col justify-between">
            <div className="flex items-center justify-between text-blue-100 text-xs font-bold">
              <span>Analytics & Trends</span>
              <BarChart3 className="w-4 h-4 text-yellow-300" />
            </div>
            <div className="mt-2">
              <Link
                href="/admin/stats"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/20 hover:bg-white text-white hover:text-slate-950 font-bold text-xs transition-all"
              >
                <span>View Full Stats Tab</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-start">
          {/* Add Category Form */}
          <div className="lg:col-span-4 bg-white rounded-2xl p-4 sm:p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center gap-2 border-b pb-3">
              <FolderTree className="w-5 h-5 text-blue-600" />
              <h2 className="text-base font-bold text-slate-900">Add New Category</h2>
            </div>

            <form onSubmit={handleCreateCategory} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Category Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. AI Technology"
                  value={name}
                  onChange={handleNameChange}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                  Slug (Auto)
                </label>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs bg-slate-100 border border-slate-200 rounded-lg font-mono text-slate-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  placeholder="Brief description for category header..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="primaryIcon"
                  checked={isPrimary}
                  onChange={(e) => setIsPrimary(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded cursor-pointer"
                />
                <label htmlFor="primaryIcon" className="text-xs text-slate-700 font-bold cursor-pointer">
                  Show in Primary Icon Navigation
                </label>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="sm"
                className="w-full font-bold text-xs uppercase tracking-wider py-2.5"
              >
                <Plus className="w-4 h-4 mr-1" />
                CREATE CATEGORY
              </Button>
            </form>

            {emptyCategoriesCount > 0 && (
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-2 text-amber-800 text-xs">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">{emptyCategoriesCount} empty {emptyCategoriesCount === 1 ? "category" : "categories"}</p>
                  <p className="text-[11px] text-amber-700 mt-0.5">
                    Categories with 0 posts may appear empty to readers on the live website.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Categories List Table with Post Count & Stats */}
          <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  All Categories ({filteredCategories.length})
                </h2>
                <p className="text-xs text-slate-400">
                  Manage site taxonomy and view real-time post counts
                </p>
              </div>

              <div className="relative w-full sm:w-56">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Filter categories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-8 pr-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-100">
                  <tr>
                    <th className="px-4 sm:px-5 py-3.5">Name</th>
                    <th className="px-4 sm:px-5 py-3.5">Slug</th>
                    <th className="px-4 sm:px-5 py-3.5 text-center">Post Stats</th>
                    <th className="px-4 sm:px-5 py-3.5">Description</th>
                    <th className="px-4 sm:px-5 py-3.5 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredCategories.map((cat) => (
                    <tr key={cat.id || cat.slug} className="hover:bg-slate-50/80 transition-colors">
                      <td className="px-4 sm:px-5 py-3.5 font-bold text-slate-900">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span>{cat.name}</span>
                          {cat.isPrimaryIcon && (
                            <span className="bg-blue-100 text-blue-800 text-[10px] px-1.5 py-0.2 rounded font-extrabold uppercase">
                              ICON NAV
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="px-4 sm:px-5 py-3.5 font-mono text-slate-500 text-[11px]">
                        /{cat.slug}
                      </td>

                      {/* Post Count Stats Column */}
                      <td className="px-4 sm:px-5 py-3.5 text-center">
                        <Link
                          href={`/admin/posts?category=${encodeURIComponent(cat.name)}`}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold transition-transform hover:scale-105 ${
                            cat.count > 0
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100"
                              : "bg-slate-100 text-slate-400 border border-slate-200 hover:bg-slate-200"
                          }`}
                          title={`View ${cat.count} articles in ${cat.name}`}
                        >
                          <FileText className="w-3 h-3" />
                          <span>{cat.count} {cat.count === 1 ? "post" : "posts"}</span>
                        </Link>
                      </td>

                      <td className="px-4 sm:px-5 py-3.5 text-slate-500 line-clamp-1 max-w-xs">
                        {cat.description || "—"}
                      </td>

                      <td className="px-4 sm:px-5 py-3.5 text-right whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => setDeleteTarget({ id: cat.id || cat.slug, name: cat.name })}
                          className="text-rose-600 hover:text-rose-800 font-bold text-xs p-1 rounded hover:bg-rose-50 cursor-pointer inline-flex items-center gap-1"
                          title="Delete category"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filteredCategories.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-5 py-8 text-center text-slate-400 font-bold text-xs">
                        No categories found matching &quot;{searchTerm}&quot;
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Modal */}
      <DeleteModal
        isOpen={Boolean(deleteTarget)}
        title="Confirm Category Deletion"
        itemName={deleteTarget?.name || ""}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
