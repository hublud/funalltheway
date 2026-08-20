"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search, Flame } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";
import { MobileMenu } from "./MobileMenu";

export const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [searchModalQuery, setSearchModalQuery] = useState("");
  const pathname = usePathname();

  const handleModalSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchModalQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchModalQuery.trim())}`;
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
        {/* Main Header Bar */}
        <div className="max-w-6xl mx-auto px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            {/* Brand Logo */}
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-md group-hover:bg-blue-700 transition-colors">
                <Flame className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-300" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg sm:text-2xl md:text-3xl font-black tracking-tight text-blue-600 leading-none">
                  FUN ALL THE WAY LIMITED
                </span>
                <span className="text-[9px] sm:text-[10px] font-bold text-slate-500 tracking-wider uppercase">
                  NIGERIAN ENTERTAINMENT & LIFESTYLE
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1 font-bold text-sm text-slate-700">
              {siteConfig.mainNav.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={`${item.href}-${item.label}`}
                    href={item.href}
                    className={`px-3 py-1.5 rounded-md transition-colors ${
                      isActive
                        ? "text-blue-600 bg-blue-50 font-extrabold"
                        : "hover:text-blue-600 hover:bg-slate-50"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* Search trigger & Mobile Menu button */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowSearchModal(true)}
                className="p-2 rounded-full text-slate-600 hover:text-blue-600 hover:bg-slate-100 transition-colors"
                aria-label="Open search dialog"
              >
                <Search className="w-5 h-5" />
              </button>

              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-2 rounded-md lg:hidden text-slate-700 hover:text-blue-600 hover:bg-slate-100 transition-colors"
                aria-label="Open navigation menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Quick Search Modal */}
      {showSearchModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white w-full max-w-lg rounded-xl shadow-2xl p-6 relative">
            <h3 className="text-lg font-bold text-slate-900 mb-3">Quick Search</h3>
            <form onSubmit={handleModalSearch} className="flex gap-2">
              <input
                type="text"
                value={searchModalQuery}
                onChange={(e) => setSearchModalQuery(e.target.value)}
                placeholder="Search articles, news, videos..."
                autoFocus
                className="flex-1 px-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900"
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm px-5 py-2.5 rounded-lg"
              >
                Go
              </button>
            </form>
            <button
              onClick={() => setShowSearchModal(false)}
              className="mt-4 text-xs text-slate-500 hover:text-slate-700 underline"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Mobile Drawer */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
};
