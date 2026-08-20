"use client";

import React, { useState } from "react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { MediaUploader } from "@/components/admin/MediaUploader";
import { Image as ImageIcon, Copy, Check, ExternalLink, Cloud } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface UploadedMediaItem {
  id: string;
  url: string;
  type: "image" | "video";
  date: string;
}

const INITIAL_MEDIA: UploadedMediaItem[] = [
  {
    id: "m1",
    url: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1200&auto=format&fit=crop&q=80",
    type: "image",
    date: "Aug 19, 2026",
  },
  {
    id: "m2",
    url: "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=1200&auto=format&fit=crop&q=80",
    type: "image",
    date: "Aug 19, 2026",
  },
  {
    id: "m3",
    url: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=1200&auto=format&fit=crop&q=80",
    type: "image",
    date: "Aug 18, 2026",
  },
  {
    id: "m4",
    url: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=1200&auto=format&fit=crop&q=80",
    type: "image",
    date: "Aug 18, 2026",
  },
];

export default function AdminMediaPage() {
  const [mediaList, setMediaList] = useState<UploadedMediaItem[]>(INITIAL_MEDIA);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleUploadSuccess = (url: string, resourceType: "image" | "video") => {
    const newItem: UploadedMediaItem = {
      id: `media_${Date.now()}`,
      url,
      type: resourceType,
      date: "Just now",
    };
    setMediaList([newItem, ...mediaList]);
  };

  const handleCopy = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="flex-1 flex flex-col pb-20 md:pb-12">
      <AdminHeader
        title="Cloudinary Media Library"
        subtitle="Upload, optimize, and organize images and videos hosted on Cloudinary CDN"
      />

      <div className="p-3 sm:p-6 space-y-4 sm:space-y-6 max-w-7xl">
        {/* Upload Box */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between border-b pb-3">
            <div className="flex items-center gap-2">
              <Cloud className="w-5 h-5 text-blue-600" />
              <h2 className="text-base font-bold text-slate-900">Upload Media to Cloudinary</h2>
            </div>
            <span className="text-xs text-slate-400 font-mono">Cloud: qoi6iykg</span>
          </div>

          <MediaUploader
            folder="funalltheway/library"
            onUploadSuccess={handleUploadSuccess}
          />
        </div>

        {/* Media Grid */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b pb-3">
            <h2 className="text-base font-bold text-slate-900">
              Media Files ({mediaList.length})
            </h2>
            <span className="text-xs text-slate-400">Click copy icon to use in articles</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {mediaList.map((item) => (
              <div
                key={item.id}
                className="group bg-slate-50 rounded-xl border border-slate-200 overflow-hidden flex flex-col justify-between shadow-xs hover:shadow-md transition-all"
              >
                <div className="relative aspect-video overflow-hidden bg-slate-900">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.url}
                    alt="Media item"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute top-2 right-2 flex gap-1">
                    <button
                      type="button"
                      onClick={() => handleCopy(item.id, item.url)}
                      className="p-1.5 rounded-md bg-black/60 hover:bg-blue-600 text-white backdrop-blur-xs transition-colors"
                      title="Copy URL"
                    >
                      {copiedId === item.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-300" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="p-3 space-y-1">
                  <p className="text-[11px] font-mono text-slate-500 truncate">{item.url}</p>
                  <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-200">
                    <span className="uppercase font-bold text-blue-600">{item.type}</span>
                    <span>{item.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
