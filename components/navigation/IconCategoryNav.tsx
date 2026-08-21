"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Music,
  PlaySquare,
  Sparkles,
  Trophy,
  Flame,
  Compass,
  Smile,
  ImageIcon,
  Video,
  Wand2,
  Camera,
  Bot,
  SlidersHorizontal,
  Layers,
  Palette,
  Disc3,
} from "lucide-react";
import { PRIMARY_ICON_CATEGORIES } from "@/data/categories";

const iconMap: Record<string, React.ElementType> = {
  Home: Home,
  Music: Music,
  PlaySquare: PlaySquare,
  Sparkles: Sparkles,
  Trophy: Trophy,
  Flame: Flame,
  Compass: Compass,
  Laugh: Smile,
  Smile: Smile,
  ImageIcon: ImageIcon,
  Image: ImageIcon,
  Video: Video,
  Wand2: Wand2,
  Camera: Camera,
  Bot: Bot,
  SlidersHorizontal: SlidersHorizontal,
  Layers: Layers,
  Palette: Palette,
  Disc3: Disc3,
};

export const IconCategoryNav: React.FC = () => {
  const pathname = usePathname();

  return (
    <nav className="w-full bg-white border-b border-slate-200 shadow-xs py-2.5 sm:py-3.5">
      <div className="max-w-7xl mx-auto px-2 sm:px-4">
        {/* Desktop / Tablet: Responsive flex row */}
        <div className="hidden md:flex flex-wrap items-center justify-center gap-1 sm:gap-2">
          {PRIMARY_ICON_CATEGORIES.map((item) => {
            const IconComponent = iconMap[item.icon] || Sparkles;
            const isActive = pathname === item.slug;

            return (
              <Link
                key={item.name}
                href={item.slug}
                className={`group flex flex-col items-center justify-center py-1.5 px-2.5 sm:px-3 rounded-xl transition-all duration-200 ${
                  isActive
                    ? "text-blue-600 bg-blue-50 font-bold"
                    : "text-slate-700 hover:text-blue-600 hover:bg-slate-50"
                }`}
              >
                <div
                  className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center mb-1 transition-all duration-300 group-hover:scale-110 group-hover:shadow-sm ${
                    isActive
                      ? "bg-blue-600 text-white shadow"
                      : "bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white"
                  }`}
                >
                  <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 transition-transform" />
                </div>
                <span className="text-[11px] sm:text-xs font-bold tracking-tight uppercase whitespace-nowrap">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>

        {/* Mobile / Tablet: Responsive 4-col on tablet, 4-col / 2-col on mobile */}
        <div className="grid grid-cols-4 sm:grid-cols-4 md:hidden gap-2">
          {PRIMARY_ICON_CATEGORIES.map((item) => {
            const IconComponent = iconMap[item.icon] || Sparkles;
            const isActive = pathname === item.slug;

            return (
              <Link
                key={item.name}
                href={item.slug}
                className={`flex flex-col items-center justify-center p-2 rounded-lg text-center transition-all ${
                  isActive
                    ? "bg-blue-50 text-blue-600 font-bold"
                    : "text-slate-700 hover:text-blue-600 hover:bg-slate-50"
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center mb-1 ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "bg-blue-50 text-blue-600"
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-bold uppercase truncate max-w-full">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
