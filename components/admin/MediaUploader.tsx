"use client";

import React, { useState, useRef } from "react";
import {
  UploadCloud,
  CheckCircle2,
  Loader2,
  Copy,
  Check,
  Trash2,
  Star,
  Plus,
  Video,
  Image as ImageIcon,
  AlertCircle,
} from "lucide-react";

export interface UploadedFileItem {
  id: string;
  url: string;
  name: string;
  type: "image" | "video";
  size?: number;
}

interface MediaUploaderProps {
  onUploadSuccess: (
    url: string,
    resourceType: "image" | "video",
    allUrls?: string[]
  ) => void;
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
  const [uploadStatusText, setUploadStatusText] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [mediaList, setMediaList] = useState<UploadedFileItem[]>(() => {
    if (initialUrl) {
      const isVid =
        initialUrl.includes(".mp4") ||
        initialUrl.includes(".webm") ||
        initialUrl.includes(".mov") ||
        initialUrl.includes("/videos/");
      return [
        {
          id: "init_1",
          url: initialUrl,
          name: isVid ? "Attached Video" : "Attached Media",
          type: isVid ? "video" : "image",
        },
      ];
    }
    return [];
  });
  const [primaryIndex, setPrimaryIndex] = useState(0);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  /**
   * Compress high-resolution images as an instant client-side fallback if needed
   */
  const compressImage = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      if (!file.type.startsWith("image/")) {
        resolve("");
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
    setErrorMessage(null);
    const newItems: UploadedFileItem[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const isVid =
        file.type.startsWith("video/") ||
        /\.(mp4|webm|mov|mkv|avi)$/i.test(file.name);
      const resourceType: "image" | "video" = isVid ? "video" : "image";

      setUploadStatusText(
        `Uploading ${resourceType} ${i + 1}/${files.length}: ${file.name} (${(
          file.size /
          (1024 * 1024)
        ).toFixed(1)} MB)...`
      );

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
            size: file.size,
          });
        } else {
          // If server upload failed
          if (isVid) {
            throw new Error(data.error || "Video upload failed. Please try a smaller video.");
          } else {
            const compressedUrl = await compressImage(file);
            if (compressedUrl) {
              newItems.push({
                id: `media_${Date.now()}_${i}`,
                url: compressedUrl,
                name: file.name,
                type: resourceType,
                size: file.size,
              });
            }
          }
        }
      } catch (err: any) {
        console.error("Upload error for file:", file.name, err);
        setErrorMessage(
          err.message || `Failed to upload ${file.name}. Please verify network connection.`
        );
      }
    }

    const updatedList = allowMultiple ? [...mediaList, ...newItems] : newItems;
    setMediaList(updatedList);
    setUploading(false);
    setUploadStatusText("");

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
        className={`border-2 border-dashed rounded-2xl p-4 sm:p-6 text-center cursor-pointer transition-all flex flex-col items-center justify-center ${
          uploading
            ? "border-blue-500 bg-blue-50/60"
            : "border-slate-300 hover:border-blue-500 hover:bg-blue-50/30 active:bg-blue-100/50"
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
          <div className="py-3 sm:py-4 space-y-2 flex flex-col items-center">
            <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
            <p className="text-xs font-bold text-blue-700 uppercase tracking-wide">
              {uploadStatusText || "Uploading Media..."}
            </p>
            <p className="text-[10px] sm:text-[11px] text-slate-400">
              Saving videos & images to cloud CDN with instant streaming
            </p>
          </div>
        ) : (
          <div className="py-1 sm:py-2 space-y-2 text-center">
            <div className="flex items-center justify-center gap-2">
              <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shadow-xs">
                <UploadCloud className="w-5 h-5" />
              </div>
              <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center shadow-xs">
                <Video className="w-5 h-5" />
              </div>
            </div>
            <div>
              <p className="text-xs sm:text-sm font-bold text-slate-800">
                Tap to upload {allowMultiple ? "videos or photos from device" : "a video or photo"}
              </p>
              <p className="text-[10px] sm:text-xs text-slate-500 font-medium">
                Supports <span className="font-bold text-indigo-600">MP4, WebM, MOV videos</span> and <span className="font-bold text-blue-600">JPG, PNG, WebP</span> images.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Error Banner */}
      {errorMessage && (
        <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-2 text-rose-700 text-xs font-medium">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

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
              className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer py-1 px-2.5 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" /> Add More Files
            </button>
          </div>

          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {mediaList.map((item, idx) => {
              const isPrimary = idx === primaryIndex;
              const isVid =
                item.type === "video" ||
                item.url.includes(".mp4") ||
                item.url.includes(".webm") ||
                item.url.includes(".mov") ||
                item.url.includes("/videos/");

              return (
                <div
                  key={item.id}
                  className={`group relative rounded-xl overflow-hidden border-2 transition-all bg-slate-900 shadow-xs flex flex-col ${
                    isPrimary
                      ? "border-blue-600 ring-2 ring-blue-400/30"
                      : "border-slate-200"
                  }`}
                >
                  <div className="aspect-video relative overflow-hidden bg-slate-950 flex items-center justify-center">
                    {isVid ? (
                      <video
                        src={item.url}
                        controls
                        className="w-full h-full object-contain max-h-[160px]"
                      />
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
                        <Star className="w-3 h-3 fill-current" /> Main Feature
                      </span>
                    )}

                    {/* Type Tag */}
                    <span
                      className={`absolute bottom-2 left-2 px-1.5 py-0.5 rounded text-[9px] font-extrabold uppercase shadow-sm flex items-center gap-1 z-10 text-white ${
                        isVid ? "bg-indigo-600" : "bg-blue-600"
                      }`}
                    >
                      {isVid ? <Video className="w-2.5 h-2.5" /> : <ImageIcon className="w-2.5 h-2.5" />}
                      {isVid ? "Video" : "Image"}
                    </span>

                    {/* Quick Desktop Actions Overlay */}
                    <div className="hidden md:flex absolute top-2 right-2 items-center gap-1 z-20">
                      <button
                        type="button"
                        onClick={() => handleCopy(item.id, item.url)}
                        className="bg-black/70 hover:bg-blue-600 text-white p-1.5 rounded-md cursor-pointer transition-colors"
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
                        className="bg-black/70 hover:bg-rose-600 text-white p-1.5 rounded-md cursor-pointer transition-colors"
                        title="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="p-2.5 bg-white flex items-center justify-between text-[11px] border-b border-slate-100">
                    <span className="truncate text-slate-700 font-medium max-w-[120px]" title={item.name}>
                      {item.name}
                    </span>
                    {!isPrimary ? (
                      <button
                        type="button"
                        onClick={() => handleSetPrimary(idx)}
                        className="text-[10px] font-bold text-blue-600 hover:text-blue-800 bg-blue-50 px-2 py-0.5 rounded cursor-pointer"
                      >
                        Set Main
                      </button>
                    ) : (
                      <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                        Selected
                      </span>
                    )}
                  </div>

                  {/* Mobile Touch Action Bar */}
                  <div className="flex md:hidden items-center justify-between p-1.5 bg-slate-50 gap-1 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => handleCopy(item.id, item.url)}
                      className="p-1.5 bg-slate-200 text-slate-700 rounded text-xs"
                      title="Copy URL"
                    >
                      {copiedId === item.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => handleRemove(idx)}
                      className="p-1.5 bg-rose-100 text-rose-700 rounded text-xs"
                      title="Remove"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
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
