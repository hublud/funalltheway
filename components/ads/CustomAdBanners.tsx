"use client";

import React from "react";
import Image from "next/image";
import { MessageCircle, ExternalLink } from "lucide-react";

export const TopLandscapeAd: React.FC = () => {
  return (
    <div className="w-full my-3">
      <div className="flex flex-col items-center">
        <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 mb-1.5 self-center">
          OFFICIAL ADVERT PLACEMENT
        </span>
        <a
          href="https://wa.me/2347053641852?text=Hello%20FunAllTheWay%20I%20want%20to%20place%20an%20advert"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full block group overflow-hidden rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all relative"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/ads/advert_placement_header.jpg"
            alt="FunAllTheWay Advert Placement Banner"
            className="w-full h-auto object-contain rounded-2xl group-hover:scale-[1.005] transition-transform duration-300"
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

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Banner 1: Editing & Graphics Services */}
        <a
          href="https://wa.me/2347053641852?text=Hello%20FunAllTheWay%20I%20want%20to%20order%20Editing%20and%20Graphics%20Design%20services"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative overflow-hidden rounded-2xl border-2 border-slate-200 hover:border-blue-500 shadow-xs hover:shadow-lg transition-all bg-slate-900 flex flex-col"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/ads/editing_services_blue.jpg"
            alt="FunAllTheWay Editing and Graphics Design Package"
            className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-300 rounded-2xl"
          />
          <div className="absolute bottom-2 right-2 bg-emerald-600 text-white text-[11px] font-black uppercase px-3 py-1.5 rounded-xl shadow-lg flex items-center gap-1.5 opacity-90 group-hover:opacity-100">
            <MessageCircle className="w-3.5 h-3.5 fill-current" /> Order on WhatsApp
          </div>
        </a>

        {/* Banner 2: Welcome to Fun All The Way Limited */}
        <a
          href="https://wa.me/2347053641852?text=Hello%20FunAllTheWay%20I%20want%20to%20inquire%20about%20your%20services"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative overflow-hidden rounded-2xl border-2 border-slate-200 hover:border-blue-500 shadow-xs hover:shadow-lg transition-all bg-slate-900 flex flex-col"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/ads/welcome_services_red.jpg"
            alt="Fun All The Way Limited Creative Edits"
            className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-300 rounded-2xl"
          />
          <div className="absolute bottom-2 right-2 bg-emerald-600 text-white text-[11px] font-black uppercase px-3 py-1.5 rounded-xl shadow-lg flex items-center gap-1.5 opacity-90 group-hover:opacity-100">
            <MessageCircle className="w-3.5 h-3.5 fill-current" /> Contact Us Now
          </div>
        </a>
      </div>
    </section>
  );
};
