import React from "react";
import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";

interface InArticleAdProps {
  className?: string;
}

export const InArticleAd: React.FC<InArticleAdProps> = ({ className = "" }) => {
  return (
    <div className={`my-8 p-5 bg-blue-50 border-y-2 sm:border sm:rounded-lg border-blue-200 text-slate-800 ${className}`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px] uppercase font-bold tracking-widest text-blue-600 flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-blue-600" /> SPONSORED CONTENT
        </span>
        <span className="text-[10px] text-slate-400">ADVERTISEMENT</span>
      </div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h4 className="text-base font-bold text-slate-900 leading-snug">
            Promote Your Single, Mixtape or Brand on FunAllTheWay
          </h4>
          <p className="text-xs text-slate-600 mt-1">
            Get featured on top trending charts, social media pushes, and homepage banners today.
          </p>
        </div>
        <Link
          href="/contact?tab=advertise"
          className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2 rounded uppercase tracking-wider shrink-0 transition-colors shadow-sm"
        >
          <span>PROMOTE NOW</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};
