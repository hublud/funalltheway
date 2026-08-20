"use client";

import React, { useState } from "react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { useStore } from "@/lib/store";
import { Plus, Trash2, FolderTree, CheckCircle2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { DeleteModal } from "@/components/admin/DeleteModal";

export default function AdminCategoriesPage() {
  const { categories, addCategory, deleteCategory } = useStore();
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [isPrimary, setIsPrimary] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; name: string } | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

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

  return (
    <div className="flex-1 flex flex-col pb-20 md:pb-12">
      <AdminHeader
        title="Category Manager"
        subtitle="Create, organize, and delete content categories"
      />

      <div className="p-3 sm:p-6 space-y-4 sm:space-y-6 max-w-7xl">
        {notification && (
          <div className="p-3.5 sm:p-4 bg-emerald-50 border border-emerald-300 rounded-xl text-emerald-800 text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{notification}</span>
          </div>
        )}

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
                  className="w-4 h-4 text-blue-600 rounded"
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
          </div>

          {/* Categories List Table */}
          <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-900">
                All Categories ({categories.length})
              </h2>
              <span className="text-xs text-slate-400">Manage site taxonomy</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-100">
                  <tr>
                    <th className="px-5 py-3.5">Name</th>
                    <th className="px-5 py-3.5">Slug</th>
                    <th className="px-5 py-3.5">Description</th>
                    <th className="px-5 py-3.5 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {categories.map((cat) => (
                    <tr key={cat.id || cat.slug} className="hover:bg-slate-50/80 transition-colors">
                      <td className="px-5 py-3.5 font-bold text-slate-900 flex items-center gap-2">
                        <span>{cat.name}</span>
                        {cat.isPrimaryIcon && (
                          <span className="bg-blue-100 text-blue-800 text-[10px] px-1.5 py-0.2 rounded font-extrabold uppercase">
                            ICON NAV
                          </span>
                        )}
                      </td>
                      <td className="px-5 py-3.5 font-mono text-slate-500 text-[11px]">
                        /{cat.slug}
                      </td>
                      <td className="px-5 py-3.5 text-slate-500 line-clamp-1 max-w-xs">
                        {cat.description}
                      </td>
                      <td className="px-5 py-3.5 text-right">
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
