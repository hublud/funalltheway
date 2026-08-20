import React from "react";
import Link from "next/link";
import { Megaphone, ExternalLink } from "lucide-react";

interface SidebarAdProps {
  className?: string;
}

export const SidebarAd: React.FC<SidebarAdProps> = ({ className = "" }) => {
  return (
    <div className={`w-full flex flex-col items-center ${className}`}>
      <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 mb-1.5 self-start">
        ADVERTISEMENT · 300 × 250
      </span>
      <div className="w-full max-w-[320px] sm:max-w-none h-[250px] bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white rounded-lg p-5 border border-blue-800/40 shadow-sm flex flex-col justify-between relative overflow-hidden group">
        <div className="flex items-center justify-between z-10">
          <span className="inline-flex items-center gap-1.5 bg-blue-600/80 text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded text-blue-100">
            <Megaphone className="w-3 h-3 text-yellow-300" /> SPONSORED
          </span>
          <span className="text-[10px] text-slate-400 font-mono">300x250</span>
        </div>

        <div className="z-10 text-center my-auto">
          <h4 className="text-lg font-black text-white leading-tight uppercase mb-1">
            Grow Your Digital Reach
          </h4>
          <p className="text-xs text-blue-200 line-clamp-2 mb-3">
            Targeted entertainment campaigns, music premieres, and viral influencer distribution.
          </p>
          <Link
            href="/contact?tab=advertise"
            className="inline-flex items-center gap-1.5 bg-yellow-400 hover:bg-yellow-300 text-slate-950 text-xs font-extrabold px-4 py-2 rounded-md uppercase tracking-wider transition-all"
          >
            <span>BOOK THIS SLOT</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="z-10 flex justify-between items-center text-[10px] text-slate-400 border-t border-slate-800 pt-2">
          <span>FunAllTheWay Ad Network</span>
          <Link href="/contact?tab=advertise" className="hover:text-yellow-300 transition-colors">
            Learn More
          </Link>
        </div>
      </div>
    </div>
  );
};
