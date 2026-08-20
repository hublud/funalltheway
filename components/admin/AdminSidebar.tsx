"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  FolderTree,
  Megaphone,
  Image as ImageIcon,
  ExternalLink,
  Flame,
  PlusCircle,
  LogOut,
} from "lucide-react";

export const AdminSidebar: React.FC = () => {
  const pathname = usePathname();

  const menuItems = [
    { label: "Overview", href: "/admin", icon: LayoutDashboard },
    { label: "All Posts", href: "/admin/posts", icon: FileText },
    { label: "New Post", href: "/admin/posts/new", icon: PlusCircle },
    { label: "Categories", href: "/admin/categories", icon: FolderTree },
    { label: "Banner Ads", href: "/admin/ads", icon: Megaphone },
    { label: "Media Library", href: "/admin/media", icon: ImageIcon },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 min-h-screen flex flex-col border-r border-slate-800 shrink-0">
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-800 flex items-center justify-between">
        <Link href="/admin" className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded bg-blue-600 flex items-center justify-center text-white font-bold">
            <Flame className="w-4 h-4 text-yellow-300" />
          </div>
          <div>
            <span className="font-black text-white text-base tracking-wider block leading-none">
              FATW ADMIN
            </span>
            <span className="text-[9px] text-blue-400 font-bold uppercase tracking-widest">
              MANAGEMENT PORTAL
            </span>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
        <div className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500 px-3 mb-2">
          MAIN MENU
        </div>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-bold transition-all ${
                isActive
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/80"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer Info & Quick Link */}
      <div className="p-4 border-t border-slate-800 bg-slate-950/40 space-y-2">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between px-3 py-2 rounded bg-slate-800/80 text-slate-300 hover:text-white hover:bg-blue-600 transition-all text-xs font-bold"
        >
          <span>View Public Site</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>
        <button
          type="button"
          onClick={() => {
            if (typeof window !== "undefined") {
              sessionStorage.removeItem("fatw_admin_session");
              localStorage.removeItem("fatw_admin_auth_timestamp");
              window.location.href = "/admin/login";
            }
          }}
          className="w-full flex items-center justify-between px-3 py-2 rounded text-slate-400 hover:text-rose-300 hover:bg-rose-950/50 transition-all text-xs font-bold cursor-pointer"
        >
          <span>Log Out</span>
          <LogOut className="w-3.5 h-3.5" />
        </button>
      </div>
    </aside>
  );
};
