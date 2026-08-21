"use client";

import React from "react";
import { MessageCircle, Sparkles, GraduationCap, ArrowRight, Camera, Flame } from "lucide-react";

export const WhatsAppServicesBanner: React.FC = () => {
  const whatsappNumber = "2347053641852";

  const services = [
    {
      id: "vip_photoshoot",
      icon: Camera,
      badge: "🔥 HOT VIP DEAL • ₦100,000",
      badgeColor: "bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500 text-slate-950 font-black shadow-xs",
      title: "We Organise & Shoot Professional Photo Shoot",
      subtitle: "15 Pictures & 10 Videos with different outfits for ₦100,000",
      waText:
        "Hello FunAllTheWay, I want to book the Professional Photo & Video Shoot Package (15 Pictures & 10 Videos with different outfits for ₦100,000).",
      isFeatured: true,
    },
    {
      id: "photo_edit",
      icon: Sparkles,
      badge: "HOT EDITING SERVICE",
      badgeColor: "bg-amber-400 text-slate-950",
      title: "Change Picture Background, Cloth, Heels, Make Up & Bag Change",
      subtitle: "Tap to send your photos & request instant retouching on WhatsApp",
      waText:
        "Hello FunAllTheWay, I want to request Picture Background, Cloth, Heels, Make Up and Bag Change editing service.",
      isFeatured: false,
    },
    {
      id: "training",
      icon: GraduationCap,
      badge: "MASTERCLASS TRAINING",
      badgeColor: "bg-yellow-300 text-slate-950",
      title: "Learn Picture, Video and AI Editing Training",
      subtitle: "Tap to register for hands-on mentorship & professional video/AI editing classes",
      waText:
        "Hello FunAllTheWay, I am interested in joining the Picture, Video and AI Editing Training.",
      isFeatured: false,
    },
  ];

  return (
    <section className="w-full bg-gradient-to-r from-emerald-950 via-teal-950 to-slate-950 border-b border-emerald-800/60 py-2.5 sm:py-3.5 shadow-inner">
      <div className="max-w-7xl mx-auto px-3 sm:px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2.5 sm:gap-3">
          {services.map((item) => {
            const Icon = item.icon;
            const link = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
              item.waText
            )}`;

            return (
              <a
                key={item.id}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative flex items-center justify-between gap-3 rounded-xl sm:rounded-2xl p-2.5 sm:p-3 transition-all duration-200 shadow-xs hover:shadow-lg hover:-translate-y-0.5 ${
                  item.isFeatured
                    ? "bg-gradient-to-r from-amber-500/20 via-rose-500/20 to-emerald-500/20 border-2 border-amber-400/80 hover:border-amber-300 shadow-amber-500/10"
                    : "bg-white/10 hover:bg-emerald-600/30 border border-emerald-400/30 hover:border-emerald-400"
                }`}
              >
                <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                  {/* WhatsApp + Icon Avatar */}
                  <div
                    className={`relative shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shadow-md group-hover:scale-105 transition-transform ${
                      item.isFeatured
                        ? "bg-gradient-to-tr from-amber-500 via-rose-500 to-pink-500 text-white ring-2 ring-amber-400/50"
                        : "bg-emerald-500 text-white"
                    }`}
                  >
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-slate-900 flex items-center justify-center">
                      <MessageCircle className="w-2 h-2 text-slate-950 fill-slate-950" />
                    </div>
                  </div>

                  {/* Text Details */}
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span
                        className={`text-[9px] sm:text-[10px] font-extrabold uppercase px-1.5 py-0.2 rounded-xs tracking-wider flex items-center gap-1 ${item.badgeColor}`}
                      >
                        {item.isFeatured && <Flame className="w-3 h-3 text-rose-600 fill-rose-600 animate-pulse shrink-0" />}
                        <span>{item.badge}</span>
                      </span>
                    </div>
                    <h3 className={`text-xs sm:text-sm font-black leading-snug line-clamp-1 transition-colors ${
                      item.isFeatured ? "text-amber-200 group-hover:text-yellow-100" : "text-white group-hover:text-emerald-200"
                    }`}>
                      {item.title}
                    </h3>
                    <p className="text-[10px] sm:text-[11px] text-emerald-200/80 line-clamp-1">
                      {item.subtitle}
                    </p>
                  </div>
                </div>

                {/* WhatsApp Action CTA Pill */}
                <div
                  className={`shrink-0 flex items-center gap-1 font-black text-[10px] sm:text-xs px-2.5 sm:px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm transition-all group-hover:scale-105 ${
                    item.isFeatured
                      ? "bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-amber-400 text-slate-950 ring-1 ring-yellow-300"
                      : "bg-emerald-500 hover:bg-emerald-400 text-slate-950"
                  }`}
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-slate-950 text-slate-950" />
                  <span className="hidden sm:inline">Book</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};
