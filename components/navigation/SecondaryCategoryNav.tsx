"use client";

import React from "react";
import Link from "next/link";
import { SECONDARY_CATEGORIES } from "@/data/categories";

export const SecondaryCategoryNav: React.FC = () => {
  return (
    <div className="w-full bg-slate-100/90 border-b border-slate-200/80 py-2.5 px-4 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Horizontal scroll for mobile, flex-wrap centered for desktop */}
        <div className="flex items-center sm:justify-center flex-nowrap sm:flex-wrap gap-y-1.5 gap-x-2 overflow-x-auto no-scrollbar py-1">
          {SECONDARY_CATEGORIES.map((cat, idx) => (
            <React.Fragment key={cat.name}>
              <Link
                href={cat.slug}
                className="whitespace-nowrap text-xs font-bold text-blue-700 hover:text-blue-900 transition-colors tracking-wide shrink-0 py-0.5 px-1 hover:underline underline-offset-4"
              >
                {cat.name}
              </Link>
              {idx < SECONDARY_CATEGORIES.length - 1 && (
                <span className="text-slate-300 font-semibold select-none shrink-0">
                  |
                </span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};
