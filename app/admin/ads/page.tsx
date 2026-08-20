"use client";

import React, { useState } from "react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { MediaUploader } from "@/components/admin/MediaUploader";
import { useStore, AdSetting } from "@/lib/store";
import { Megaphone, Save, CheckCircle2, Eye } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function AdminAdsPage() {
  const { ads, updateAd } = useStore();
  const [selectedSlot, setSelectedSlot] = useState<"top_banner" | "horizontal_feed" | "in_article">("top_banner");
  const [notification, setNotification] = useState<string | null>(null);

  const currentAd = ads.find((a) => a.slotType === selectedSlot) || {
    id: selectedSlot,
    slotType: selectedSlot,
    title: "Promote Your Brand on FunAllTheWay",
    subtitle: "High-visibility banner with active reader reach.",
    destinationUrl: "/contact?tab=advertise",
    buttonText: "GET STARTED",
    isActive: true,
  };

  const [title, setTitle] = useState(currentAd.title);
  const [subtitle, setSubtitle] = useState(currentAd.subtitle);
  const [destinationUrl, setDestinationUrl] = useState(currentAd.destinationUrl);
  const [buttonText, setButtonText] = useState(currentAd.buttonText);
  const [imageUrl, setImageUrl] = useState(currentAd.imageUrl || "");
  const [isActive, setIsActive] = useState(currentAd.isActive);

  const handleSlotChange = (slot: "top_banner" | "horizontal_feed" | "in_article") => {
    setSelectedSlot(slot);
    const ad = ads.find((a) => a.slotType === slot);
    if (ad) {
      setTitle(ad.title);
      setSubtitle(ad.subtitle);
      setDestinationUrl(ad.destinationUrl);
      setButtonText(ad.buttonText);
      setImageUrl(ad.imageUrl || "");
      setIsActive(ad.isActive);
    }
  };

  const handleSaveAd = (e: React.FormEvent) => {
    e.preventDefault();
    updateAd(selectedSlot, {
      title: title.trim(),
      subtitle: subtitle.trim(),
      destinationUrl: destinationUrl.trim() || "/contact?tab=advertise",
      buttonText: buttonText.trim() || "ADVERTISE",
      imageUrl: imageUrl.trim() || undefined,
      isActive,
    });

    setNotification(`Updated ${selectedSlot.replace("_", " ").toUpperCase()} advertisement settings.`);
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="flex-1 flex flex-col pb-12">
      <AdminHeader
        title="Advertisement & Banner Manager"
        subtitle="Customize live banner titles, upload Cloudinary sponsor images, and manage ad slots"
      />

      <div className="p-6 space-y-6 max-w-5xl">
        {notification && (
          <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-xl text-emerald-800 text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{notification}</span>
          </div>
        )}

        {/* Slot Selector Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            type="button"
            onClick={() => handleSlotChange("top_banner")}
            className={`p-4 rounded-xl border text-left transition-all ${
              selectedSlot === "top_banner"
                ? "border-blue-600 bg-blue-50/70 shadow-xs"
                : "border-slate-200 bg-white hover:bg-slate-50"
            }`}
          >
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              728 × 90 LEADERBOARD
            </span>
            <p className="text-sm font-bold text-slate-900 mt-1">Top Page Banner</p>
            <p className="text-xs text-slate-500 mt-0.5">Fixed at the top of every page</p>
          </button>

          <button
            type="button"
            onClick={() => handleSlotChange("horizontal_feed")}
            className={`p-4 rounded-xl border text-left transition-all ${
              selectedSlot === "horizontal_feed"
                ? "border-blue-600 bg-blue-50/70 shadow-xs"
                : "border-slate-200 bg-white hover:bg-slate-50"
            }`}
          >
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              IN-FEED BANNER
            </span>
            <p className="text-sm font-bold text-slate-900 mt-1">Horizontal Feed Ad</p>
            <p className="text-xs text-slate-500 mt-0.5">Displayed between article sections</p>
          </button>

          <button
            type="button"
            onClick={() => handleSlotChange("in_article")}
            className={`p-4 rounded-xl border text-left transition-all ${
              selectedSlot === "in_article"
                ? "border-blue-600 bg-blue-50/70 shadow-xs"
                : "border-slate-200 bg-white hover:bg-slate-50"
            }`}
          >
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              MID-ARTICLE SLOT
            </span>
            <p className="text-sm font-bold text-slate-900 mt-1">In-Article Contextual Ad</p>
            <p className="text-xs text-slate-500 mt-0.5">Inserted inside article body</p>
          </button>
        </div>

        {/* Ad Customizer Form */}
        <form onSubmit={handleSaveAd} className="space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center gap-2">
                <Megaphone className="w-5 h-5 text-blue-600" />
                <h2 className="text-base font-bold text-slate-900">
                  Edit {selectedSlot.replace("_", " ").toUpperCase()}
                </h2>
              </div>
              <label className="flex items-center gap-2 text-xs font-bold cursor-pointer text-slate-700">
                <input
                  type="checkbox"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded"
                />
                <span>Slot Active</span>
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Ad Headline Title *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. PROMOTE YOUR MUSIC & BRAND"
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Button CTA Text
                </label>
                <input
                  type="text"
                  value={buttonText}
                  onChange={(e) => setButtonText(e.target.value)}
                  placeholder="e.g. ADVERTISE HERE or GET STARTED"
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Ad Subtitle / Pitch Copy
              </label>
              <textarea
                rows={2}
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                placeholder="e.g. Reach over 2.5 million active entertainment fans daily across Lagos and London."
                className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Destination URL / Link
              </label>
              <input
                type="text"
                value={destinationUrl}
                onChange={(e) => setDestinationUrl(e.target.value)}
                placeholder="/contact?tab=advertise or external link"
                className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none"
              />
            </div>
          </div>

          {/* Cloudinary Banner Image */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h2 className="text-base font-bold text-slate-900">
                Optional Banner Graphic (Cloudinary Upload)
              </h2>
              <span className="text-xs text-blue-600 font-bold">Cloudinary</span>
            </div>

            <MediaUploader
              folder="funalltheway/ads"
              initialUrl={imageUrl}
              onUploadSuccess={(url) => setImageUrl(url)}
            />

            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                Direct Banner Image URL:
              </label>
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://res.cloudinary.com/..."
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg font-mono text-slate-700"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <Button
              type="submit"
              variant="primary"
              size="md"
              className="font-bold text-xs uppercase tracking-wider px-8 shadow-md"
            >
              <Save className="w-4 h-4 mr-1.5" />
              SAVE AD SETTINGS
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
