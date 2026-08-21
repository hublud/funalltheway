"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { X, Search, ChevronRight } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const [mobileQuery, setMobileQuery] = useState("");
  const router = useRouter();

  if (!isOpen) return null;

  const handleMobileSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (mobileQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(mobileQuery.trim())}`);
      onClose();
    }
  };

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "⭐ Our Services & Edits", href: "/services" },
    { label: "📸 Edited Pictures", href: "/edited-pictures" },
    { label: "🎬 Edited Videos", href: "/edited-videos" },
    { label: "🤖 AI Editing", href: "/ai-editing" },
    { label: "🔄 Before & After Pictures", href: "/before-after-pictures" },
    { label: "📷 Picture & Video Photoshoot", href: "/picture-video-photoshoot" },
    { label: "🎨 Graphic Design", href: "/graphic-design" },
    { label: "⚽ Sport News", href: "/sports" },
    { label: "🎧 Mixtape", href: "/mixtapes" },
    { label: "News", href: "/news" },
    { label: "Entertainment", href: "/entertainment" },
    { label: "Music", href: "/music" },
    { label: "Celebrity", href: "/celebrity" },
    { label: "Lifestyle", href: "/lifestyle" },
    { label: "Comedy", href: "/comedy" },
    { label: "Videos", href: "/videos" },
    { label: "Jobs", href: "/jobs" },
    { label: "Contact & Advertise", href: "/contact" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="relative ml-auto w-full max-w-xs sm:max-w-sm bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-blue-600 text-white">
          <span className="font-black text-base tracking-wider">FUN ALL THE WAY LIMITED</span>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-blue-700 text-white transition-colors"
            aria-label="Close menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Search */}
        <div className="p-4 bg-slate-50 border-b border-slate-200">
          <form onSubmit={handleMobileSearch} className="relative flex items-center">
            <input
              type="text"
              value={mobileQuery}
              onChange={(e) => setMobileQuery(e.target.value)}
              placeholder="Search news, music, gist..."
              className="w-full pl-3 pr-10 py-2 text-sm bg-white border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800"
            />
            <button
              type="submit"
              className="absolute right-2 p-1 text-slate-500 hover:text-blue-600"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Links */}
        <div className="flex-1 overflow-y-auto p-4 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={`${link.href}-${link.label}`}
              href={link.href}
              onClick={onClose}
              className="flex items-center justify-between px-3 py-2.5 rounded-md text-sm font-bold text-slate-800 hover:bg-blue-50 hover:text-blue-600 transition-colors"
            >
              <span>{link.label}</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </Link>
          ))}
        </div>

        {/* Footer info */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 text-xs text-slate-500 text-center">
          <p>© 2026 {siteConfig.name}</p>
        </div>
      </div>
    </div>
  );
};
