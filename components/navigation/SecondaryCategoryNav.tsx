"use client";

import React from "react";
import Link from "next/link";
import { SECONDARY_CATEGORIES } from "@/data/categories";

export const SecondaryCategoryNav: React.FC = () => {
  return (
    <div className="w-full bg-slate-100/90 border-b border-slate-200/80 py-2 px-3 sm:px-4">
      <div className="max-w-6xl mx-auto">
        {/* Wrap items to next line across all screen sizes */}
        <div className="flex items-center justify-center flex-wrap gap-y-1.5 gap-x-1.5 sm:gap-x-2.5 text-center py-0.5">
          {SECONDARY_CATEGORIES.map((cat, idx) => (
            <React.Fragment key={cat.name}>
              <Link
                href={cat.slug}
                className="whitespace-nowrap text-[11px] sm:text-xs font-bold text-blue-700 hover:text-blue-900 transition-colors tracking-wide py-0.5 px-1 hover:underline underline-offset-4"
              >
                {cat.name}
              </Link>
              {idx < SECONDARY_CATEGORIES.length - 1 && (
                <span className="text-slate-300 font-semibold select-none">
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
