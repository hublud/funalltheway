"use client";

import React from "react";
import Link from "next/link";
import { Zap } from "lucide-react";
import { useStore } from "@/lib/store";

interface HorizontalAdProps {
  title?: string;
  subtitle?: string;
  className?: string;
}

export const HorizontalAd: React.FC<HorizontalAdProps> = ({
  title,
  subtitle,
  className = "",
}) => {
  const { getAdBySlot } = useStore();
  const ad = getAdBySlot("horizontal_feed");

  if (ad && !ad.isActive) return null;

  const displayTitle = title || ad?.title || "NIGERIA'S #1 MUSIC & MEDIA PROMOTION PLATFORM";
  const displaySubtitle = subtitle || ad?.subtitle || "Upload your tracks, press releases & music videos to millions of listeners worldwide.";
  const destinationUrl = ad?.destinationUrl || "/contact?tab=advertise";
  const buttonText = ad?.buttonText || "GET STARTED";

  return (
    <div className={`w-full py-4 ${className}`}>
      <div className="flex flex-col items-center">
        <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 mb-1.5 self-center">
          ADVERTISEMENT · 728 × 90 LEADERBOARD
        </span>
        <div className="w-full bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white rounded-2xl p-4 sm:p-5 border border-blue-700/50 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 relative overflow-hidden">
          {ad?.imageUrl && (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={ad.imageUrl}
              alt="Ad Background"
              className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none"
            />
          )}

          <div className="flex items-center gap-3 text-center sm:text-left z-10">
            <div className="w-10 h-10 rounded-full bg-yellow-400/20 border border-yellow-400/40 flex items-center justify-center shrink-0 hidden sm:flex">
              <Zap className="w-5 h-5 text-yellow-300" />
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-extrabold uppercase text-yellow-300 tracking-wide line-clamp-1">
                {displayTitle}
              </h4>
              <p className="text-xs text-blue-100 font-medium line-clamp-1">{displaySubtitle}</p>
            </div>
          </div>
          <Link
            href={destinationUrl}
            className="z-10 bg-yellow-400 hover:bg-yellow-300 text-slate-950 text-xs font-black px-4 py-2 rounded-lg uppercase tracking-wider transition-transform active:scale-95 shrink-0"
          >
            {buttonText}
          </Link>
        </div>
      </div>
    </div>
  );
};
