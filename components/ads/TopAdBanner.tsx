"use client";

import React from "react";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import { useStore } from "@/lib/store";

interface TopAdBannerProps {
  className?: string;
}

export const TopAdBanner: React.FC<TopAdBannerProps> = ({ className = "" }) => {
  const { getAdBySlot } = useStore();
  const ad = getAdBySlot("top_banner");

  if (ad && !ad.isActive) return null;

  const title = ad?.title || "PROMOTE YOUR MUSIC & BRAND";
  const subtitle = ad?.subtitle || "Reach Over 2.5 Million Active Entertainment Fans Daily";
  const destinationUrl = ad?.destinationUrl || "/contact?tab=advertise";
  const buttonText = ad?.buttonText || "ADVERTISE HERE";

  return (
    <div className={`w-full bg-slate-50 border-b border-slate-200/80 py-2.5 px-4 ${className}`}>
      <div className="max-w-6xl mx-auto flex flex-col items-center justify-center">
        <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 mb-1">
          SPONSORED ADVERTISEMENT
        </span>
        <div className="w-full max-w-[728px] h-[75px] sm:h-[90px] bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-800 rounded border border-blue-700/50 shadow-sm flex items-center justify-between px-4 sm:px-8 text-white relative overflow-hidden group">
          {/* Background image if custom graphic uploaded */}
          {ad?.imageUrl && (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={ad.imageUrl}
              alt="Ad Banner"
              className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none"
            />
          )}

          {/* Subtle animated light reflection */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full duration-1000 transition-transform" />

          <div className="flex items-center space-x-3 sm:space-x-4 z-10">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-blue-500/30 border border-blue-400/40 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-300" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-extrabold uppercase tracking-wide text-yellow-300 line-clamp-1">
                {title}
              </div>
              <div className="text-[11px] sm:text-xs text-blue-100 font-medium line-clamp-1">
                {subtitle}
              </div>
            </div>
          </div>

          <Link
            href={destinationUrl}
            className="z-10 bg-yellow-400 hover:bg-yellow-300 text-slate-950 text-xs font-bold px-3 sm:px-4 py-1.5 sm:py-2 rounded uppercase tracking-wider transition-transform active:scale-95 shrink-0 hidden sm:inline-block"
          >
            {buttonText}
          </Link>
        </div>
      </div>
    </div>
  );
};
