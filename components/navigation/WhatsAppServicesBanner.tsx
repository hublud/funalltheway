"use client";

import React from "react";
import { MessageCircle, Sparkles, GraduationCap, ArrowRight } from "lucide-react";

export const WhatsAppServicesBanner: React.FC = () => {
  const whatsappNumber = "2347053641852";

  const services = [
    {
      id: "photo_edit",
      icon: Sparkles,
      badge: "HOT EDITING SERVICE",
      badgeColor: "bg-amber-400 text-slate-950",
      title: "Change Picture Background, Cloth, Heels, Make Up & Bag Change",
      subtitle: "Tap to send your photos & request instant retouching on WhatsApp",
      waText:
        "Hello FunAllTheWay, I want to request Picture Background, Cloth, Heels, Make Up and Bag Change editing service.",
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
    },
  ];

  return (
    <section className="w-full bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 border-b border-emerald-800/60 py-2.5 sm:py-3 shadow-inner">
      <div className="max-w-6xl mx-auto px-3 sm:px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3">
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
                className="group relative flex items-center justify-between gap-3 bg-white/10 hover:bg-emerald-600/30 border border-emerald-400/30 hover:border-emerald-400 rounded-xl sm:rounded-2xl p-2.5 sm:p-3 transition-all duration-200 shadow-xs hover:shadow-md hover:-translate-y-0.5"
              >
                <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                  {/* WhatsApp + Icon Avatar */}
                  <div className="relative shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-slate-900 flex items-center justify-center">
                      <MessageCircle className="w-2 h-2 text-slate-950 fill-slate-950" />
                    </div>
                  </div>

                  {/* Text Details */}
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span
                        className={`text-[9px] sm:text-[10px] font-extrabold uppercase px-1.5 py-0.2 rounded-xs tracking-wider ${item.badgeColor}`}
                      >
                        {item.badge}
                      </span>
                    </div>
                    <h3 className="text-xs sm:text-sm font-black text-white leading-snug line-clamp-1 group-hover:text-emerald-200 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-[10px] sm:text-[11px] text-emerald-200/80 line-clamp-1">
                      {item.subtitle}
                    </p>
                  </div>
                </div>

                {/* WhatsApp Action CTA Pill */}
                <div className="shrink-0 flex items-center gap-1 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-[10px] sm:text-xs px-2.5 sm:px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm transition-all group-hover:scale-105">
                  <MessageCircle className="w-3.5 h-3.5 fill-slate-950 text-slate-950" />
                  <span className="hidden sm:inline">WhatsApp</span>
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
