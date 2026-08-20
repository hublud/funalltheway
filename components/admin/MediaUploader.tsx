"use client";

import React, { useState, useRef } from "react";
import { UploadCloud, CheckCircle2, Loader2, Copy, Check, Trash2, Star, Plus } from "lucide-react";

export interface UploadedFileItem {
  id: string;
  url: string;
  name: string;
  type: "image" | "video";
}

interface MediaUploaderProps {
  onUploadSuccess: (url: string, resourceType: "image" | "video", allUrls?: string[]) => void;
  folder?: string;
  accept?: "image/*" | "video/*" | "image/*,video/*";
  initialUrl?: string;
  allowMultiple?: boolean;
}

export const MediaUploader: React.FC<MediaUploaderProps> = ({
  onUploadSuccess,
  folder = "funalltheway/posts",
  accept = "image/*,video/*",
  initialUrl = "",
  allowMultiple = true,
}) => {
  const [uploading, setUploading] = useState(false);
  const [mediaList, setMediaList] = useState<UploadedFileItem[]>(() => {
    if (initialUrl) {
      return [{ id: "init_1", url: initialUrl, name: "Initial Media", type: initialUrl.endsWith(".mp4") ? "video" : "image" }];
    }
    return [];
  });
  const [primaryIndex, setPrimaryIndex] = useState(0);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  /**
   * Compress high-resolution images to lightweight ~80KB WebP/JPEG data URLs
   * so they never exceed browser storage quotas
   */
  const compressImage = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      if (!file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target?.result as string);
        reader.readAsDataURL(file);
        return;
      }

      const img = new Image();
      const reader = new FileReader();

      reader.onload = (e) => {
        img.onload = () => {
          const canvas = document.createElement("canvas");
          let { width, height } = img;
          const maxDim = 1200;

          if (width > maxDim || height > maxDim) {
            if (width > height) {
              height = Math.round((height * maxDim) / width);
              width = maxDim;
            } else {
              width = Math.round((width * maxDim) / height);
              height = maxDim;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            const compressed = canvas.toDataURL("image/jpeg", 0.82);
            resolve(compressed);
          } else {
            resolve(e.target?.result as string);
          }
        };
        img.src = e.target?.result as string;
      };

      reader.readAsDataURL(file);
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    const newItems: UploadedFileItem[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const isVid = file.type.startsWith("video/");
      const resourceType: "image" | "video" = isVid ? "video" : "image";

      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("folder", folder);

        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();

        if (data.success && data.url) {
          newItems.push({
            id: `media_${Date.now()}_${i}`,
            url: data.url,
            name: file.name,
            type: resourceType,
          });
        } else {
          const compressedUrl = await compressImage(file);
          newItems.push({
            id: `media_${Date.now()}_${i}`,
            url: compressedUrl,
            name: file.name,
            type: resourceType,
          });
        }
      } catch (err) {
        const compressedUrl = await compressImage(file);
        newItems.push({
          id: `media_${Date.now()}_${i}`,
          url: compressedUrl,
          name: file.name,
          type: resourceType,
        });
      }
    }

    const updatedList = allowMultiple ? [...mediaList, ...newItems] : newItems;
    setMediaList(updatedList);
    setUploading(false);

    if (updatedList.length > 0) {
      const activePrimary = updatedList[primaryIndex] || updatedList[0];
      const allUrls = updatedList.map((m) => m.url);
      onUploadSuccess(activePrimary.url, activePrimary.type, allUrls);
    }
  };

  const handleSetPrimary = (index: number) => {
    setPrimaryIndex(index);
    const selected = mediaList[index];
    if (selected) {
      const allUrls = mediaList.map((m) => m.url);
      onUploadSuccess(selected.url, selected.type, allUrls);
    }
  };

  const handleRemove = (index: number) => {
    const nextList = mediaList.filter((_, i) => i !== index);
    setMediaList(nextList);
    const nextPrimaryIdx = Math.min(primaryIndex, Math.max(0, nextList.length - 1));
    setPrimaryIndex(nextPrimaryIdx);

    if (nextList.length > 0) {
      const activePrimary = nextList[nextPrimaryIdx];
      const allUrls = nextList.map((m) => m.url);
      onUploadSuccess(activePrimary.url, activePrimary.type, allUrls);
    } else {
      onUploadSuccess("", "image", []);
    }
  };

  const handleCopy = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-4">
      {/* Upload Dropzone */}
      <div
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all flex flex-col items-center justify-center ${
          uploading
            ? "border-blue-500 bg-blue-50/60"
            : "border-slate-300 hover:border-blue-500 hover:bg-blue-50/30"
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple={allowMultiple}
          onChange={handleFileChange}
          className="hidden"
        />

        {uploading ? (
          <div className="py-4 space-y-2 flex flex-col items-center">
            <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
            <p className="text-xs font-bold text-blue-700 uppercase tracking-wide">
              Optimizing & Uploading Media...
            </p>
            <p className="text-[11px] text-slate-400">Processing images for high quality & fast loading</p>
          </div>
        ) : (
          <div className="py-2 space-y-2">
            <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mx-auto shadow-xs">
              <UploadCloud className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-800">
                Click or drag & drop to upload {allowMultiple ? "multiple images / videos" : "an image or video"}
              </p>
              <p className="text-xs text-slate-400">
                Supports JPG, PNG, WebP, and MP4. {allowMultiple && "You can select multiple files at once."}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Uploaded Gallery Grid */}
      {mediaList.length > 0 && (
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Uploaded Files ({mediaList.length})
            </span>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" /> Add More Files
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {mediaList.map((item, idx) => {
              const isPrimary = idx === primaryIndex;
              return (
                <div
                  key={item.id}
                  className={`group relative rounded-xl overflow-hidden border-2 transition-all bg-slate-900 shadow-xs ${
                    isPrimary ? "border-blue-600 ring-2 ring-blue-400/30" : "border-slate-200"
                  }`}
                >
                  <div className="aspect-video relative overflow-hidden">
                    {item.type === "video" || item.url.endsWith(".mp4") ? (
                      <video src={item.url} className="w-full h-full object-cover" />
                    ) : (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={item.url}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    )}

                    {/* Primary Badge */}
                    {isPrimary && (
                      <span className="absolute top-2 left-2 bg-blue-600 text-white text-[10px] font-black uppercase px-2 py-0.5 rounded shadow-sm flex items-center gap-1 z-10">
                        <Star className="w-3 h-3 fill-current" /> Cover Image
                      </span>
                    )}

                    {/* Action Overlay */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      {!isPrimary && (
                        <button
                          type="button"
                          onClick={() => handleSetPrimary(idx)}
                          className="bg-blue-600 hover:bg-blue-700 text-white p-1.5 rounded-md text-[11px] font-bold shadow-xs cursor-pointer"
                          title="Set as Main Cover"
                        >
                          Make Cover
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => handleCopy(item.id, item.url)}
                        className="bg-slate-800 hover:bg-slate-700 text-white p-1.5 rounded-md cursor-pointer"
                        title="Copy Link"
                      >
                        {copiedId === item.id ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRemove(idx)}
                        className="bg-rose-600 hover:bg-rose-700 text-white p-1.5 rounded-md cursor-pointer"
                        title="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="p-2 bg-white flex items-center justify-between text-[11px]">
                    <span className="truncate text-slate-700 font-medium max-w-[120px]">{item.name}</span>
                    <span className="uppercase text-[9px] font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">{item.type}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
