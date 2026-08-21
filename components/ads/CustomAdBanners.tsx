"use client";

import React from "react";
import Image from "next/image";
import { MessageCircle, ExternalLink } from "lucide-react";

export const TopLandscapeAd: React.FC = () => {
  return (
    <div className="w-full my-2.5 sm:my-3.5">
      <div className="flex flex-col items-center max-w-md sm:max-w-lg md:max-w-xl mx-auto px-2">
        <span className="text-[9px] sm:text-[10px] uppercase font-extrabold tracking-widest text-slate-400 mb-1 self-center">
          OFFICIAL ADVERT PLACEMENT
        </span>
        <a
          href="https://wa.me/2347053641852?text=Hello%20FunAllTheWay%20I%20want%20to%20place%20an%20advert"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full block group overflow-hidden rounded-xl sm:rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all relative"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/ads/advert_placement_header.jpg"
            alt="FunAllTheWay Advert Placement Banner"
            className="w-full h-auto object-contain rounded-xl sm:rounded-2xl block group-hover:scale-[1.01] transition-transform duration-300"
          />
        </a>
      </div>
    </div>
  );
};

export const DualPromoBanners: React.FC<{ placementTitle?: string }> = ({
  placementTitle = "FEATURED SERVICES & PROMOTIONS",
}) => {
  return (
    <section className="my-6">
      <div className="flex items-center justify-between mb-3 border-b border-slate-200 pb-1.5">
        <span className="text-[10px] sm:text-xs uppercase font-extrabold tracking-widest text-blue-600">
          ⭐ {placementTitle}
        </span>
        <a
          href="https://wa.me/2347053641852"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[10px] sm:text-xs font-bold text-slate-500 hover:text-emerald-600 flex items-center gap-1 transition-colors"
        >
          <MessageCircle className="w-3.5 h-3.5 text-emerald-500" />
          <span>WhatsApp: 07053641852 / 08156763457</span>
        </a>
      </div>

      <div className="max-w-md sm:max-w-lg md:max-w-xl mx-auto grid grid-cols-2 gap-2 sm:gap-3.5 px-1">
        {/* Banner 1: Editing & Graphics Services */}
        <a
          href="https://wa.me/2347053641852?text=Hello%20FunAllTheWay%20I%20want%20to%20order%20Editing%20and%20Graphics%20Design%20services"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative overflow-hidden rounded-xl sm:rounded-2xl border-2 border-slate-200 hover:border-blue-500 shadow-xs hover:shadow-md transition-all bg-slate-900 flex flex-col"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/ads/editing_services_blue.jpg"
            alt="FunAllTheWay Editing and Graphics Design Package"
            className="w-full h-auto object-contain block group-hover:scale-[1.01] transition-transform duration-300 rounded-xl sm:rounded-2xl"
          />
          <div className="absolute bottom-1.5 right-1.5 sm:bottom-2 sm:right-2 bg-emerald-600/95 backdrop-blur-xs text-white text-[8px] sm:text-[10px] font-black uppercase px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg shadow-md flex items-center gap-1 opacity-90 group-hover:opacity-100">
            <MessageCircle className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-current" />
            <span>WhatsApp</span>
          </div>
        </a>

        {/* Banner 2: Welcome to Fun All The Way Limited */}
        <a
          href="https://wa.me/2347053641852?text=Hello%20FunAllTheWay%20I%20want%20to%20inquire%20about%20your%20services"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative overflow-hidden rounded-xl sm:rounded-2xl border-2 border-slate-200 hover:border-blue-500 shadow-xs hover:shadow-md transition-all bg-slate-900 flex flex-col"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/ads/welcome_services_red.jpg"
            alt="Fun All The Way Limited Creative Edits"
            className="w-full h-auto object-contain block group-hover:scale-[1.01] transition-transform duration-300 rounded-xl sm:rounded-2xl"
          />
          <div className="absolute bottom-1.5 right-1.5 sm:bottom-2 sm:right-2 bg-emerald-600/95 backdrop-blur-xs text-white text-[8px] sm:text-[10px] font-black uppercase px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg shadow-md flex items-center gap-1 opacity-90 group-hover:opacity-100">
            <MessageCircle className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-current" />
            <span>Contact Us</span>
          </div>
        </a>
      </div>
    </section>
  );
};
