"use client";

import React, { useState, useEffect } from "react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { MediaUploader } from "@/components/admin/MediaUploader";
import {
  Copy,
  Check,
  Cloud,
  Video,
  Image as ImageIcon,
  Film,
  RefreshCw,
} from "lucide-react";
import { createClient } from "@/utils/supabase/client";

interface UploadedMediaItem {
  id: string;
  url: string;
  name: string;
  type: "image" | "video";
  date: string;
}

const INITIAL_DEMO_MEDIA: UploadedMediaItem[] = [
  {
    id: "m1",
    name: "Afrobeats Showcase",
    url: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1200&auto=format&fit=crop&q=80",
    type: "image",
    date: "Recent",
  },
  {
    id: "m2",
    name: "Studio Session",
    url: "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=1200&auto=format&fit=crop&q=80",
    type: "image",
    date: "Recent",
  },
];

export default function AdminMediaPage() {
  const [mediaList, setMediaList] = useState<UploadedMediaItem[]>(INITIAL_DEMO_MEDIA);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<"all" | "video" | "image">("all");
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  const fetchStorageMedia = async () => {
    setLoading(true);
    try {
      // List videos folder
      const { data: videoFiles } = await supabase.storage
        .from("media")
        .list("posts/videos", { limit: 50, sortBy: { column: "created_at", order: "desc" } });

      // List images folder
      const { data: imageFiles } = await supabase.storage
        .from("media")
        .list("posts/images", { limit: 50, sortBy: { column: "created_at", order: "desc" } });

      const liveItems: UploadedMediaItem[] = [];

      if (videoFiles) {
        videoFiles.forEach((file) => {
          if (file.name !== ".emptyFolderPlaceholder") {
            const { data } = supabase.storage
              .from("media")
              .getPublicUrl(`posts/videos/${file.name}`);
            liveItems.push({
              id: file.id || file.name,
              name: file.name,
              url: data.publicUrl,
              type: "video",
              date: file.created_at
                ? new Date(file.created_at).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })
                : "Recent",
            });
          }
        });
      }

      if (imageFiles) {
        imageFiles.forEach((file) => {
          if (file.name !== ".emptyFolderPlaceholder") {
            const { data } = supabase.storage
              .from("media")
              .getPublicUrl(`posts/images/${file.name}`);
            liveItems.push({
              id: file.id || file.name,
              name: file.name,
              url: data.publicUrl,
              type: "image",
              date: file.created_at
                ? new Date(file.created_at).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })
                : "Recent",
            });
          }
        });
      }

      if (liveItems.length > 0) {
        setMediaList(liveItems);
      }
    } catch (e) {
      console.log("Using cached media list");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStorageMedia();
  }, []);

  const handleUploadSuccess = (url: string, resourceType: "image" | "video") => {
    const newItem: UploadedMediaItem = {
      id: `media_${Date.now()}`,
      name: url.split("/").pop() || "Uploaded File",
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

  const filteredMedia = mediaList.filter((item) => {
    if (activeFilter === "video") return item.type === "video" || item.url.includes(".mp4");
    if (activeFilter === "image") return item.type === "image" && !item.url.includes(".mp4");
    return true;
  });

  return (
    <div className="flex-1 flex flex-col pb-20 md:pb-12">
      <AdminHeader
        title="Cloud Media & Video Library"
        subtitle="Upload, stream, and organize videos (MP4, WebM) and images with instant CDN delivery"
      />

      <div className="p-3 sm:p-6 space-y-4 sm:space-y-6 max-w-7xl">
        {/* Upload Box */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between border-b pb-3">
            <div className="flex items-center gap-2">
              <Cloud className="w-5 h-5 text-blue-600" />
              <h2 className="text-base font-bold text-slate-900">
                Upload Videos & Photos
              </h2>
            </div>
            <span className="text-xs text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded font-mono font-bold">
              Cloud Storage Active
            </span>
          </div>

          <MediaUploader
            folder="posts"
            onUploadSuccess={handleUploadSuccess}
            allowMultiple={true}
          />
        </div>

        {/* Media Grid */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b pb-3">
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-slate-900">
                Media Library ({filteredMedia.length})
              </h2>
              {loading && <RefreshCw className="w-4 h-4 text-blue-600 animate-spin" />}
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => setActiveFilter("all")}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition-colors ${
                  activeFilter === "all"
                    ? "bg-white text-slate-900 shadow-xs"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                All Files
              </button>
              <button
                type="button"
                onClick={() => setActiveFilter("video")}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition-colors flex items-center gap-1 ${
                  activeFilter === "video"
                    ? "bg-indigo-600 text-white shadow-xs"
                    : "text-slate-500 hover:text-indigo-600"
                }`}
              >
                <Video className="w-3.5 h-3.5" /> Videos
              </button>
              <button
                type="button"
                onClick={() => setActiveFilter("image")}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition-colors flex items-center gap-1 ${
                  activeFilter === "image"
                    ? "bg-blue-600 text-white shadow-xs"
                    : "text-slate-500 hover:text-blue-600"
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5" /> Images
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredMedia.map((item) => {
              const isVid =
                item.type === "video" ||
                item.url.includes(".mp4") ||
                item.url.includes(".webm") ||
                item.url.includes(".mov");

              return (
                <div
                  key={item.id}
                  className="group bg-slate-900 rounded-xl border border-slate-200 overflow-hidden flex flex-col justify-between shadow-xs hover:shadow-md transition-all"
                >
                  <div className="relative aspect-video overflow-hidden bg-slate-950 flex items-center justify-center">
                    {isVid ? (
                      <video
                        src={item.url}
                        controls
                        className="w-full h-full object-contain max-h-[180px]"
                      />
                    ) : (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={item.url}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    )}

                    <span
                      className={`absolute top-2 left-2 px-1.5 py-0.5 rounded text-[9px] font-extrabold uppercase shadow-sm flex items-center gap-1 z-10 text-white ${
                        isVid ? "bg-indigo-600" : "bg-blue-600"
                      }`}
                    >
                      {isVid ? <Film className="w-2.5 h-2.5" /> : <ImageIcon className="w-2.5 h-2.5" />}
                      {isVid ? "Video" : "Image"}
                    </span>

                    <div className="absolute top-2 right-2 flex gap-1 z-10">
                      <button
                        type="button"
                        onClick={() => handleCopy(item.id, item.url)}
                        className="p-1.5 rounded-md bg-black/70 hover:bg-blue-600 text-white backdrop-blur-xs transition-colors"
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

                  <div className="p-3 bg-white space-y-1">
                    <p className="text-xs font-bold text-slate-800 truncate" title={item.name}>
                      {item.name}
                    </p>
                    <p className="text-[10px] font-mono text-slate-400 truncate">{item.url}</p>
                    <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-100">
                      <span className="uppercase font-bold text-blue-600">{item.type}</span>
                      <span>{item.date}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
