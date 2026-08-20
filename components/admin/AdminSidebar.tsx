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
  X,
  Menu,
} from "lucide-react";
import { useAdminLayout } from "./AdminLayoutContext";

export const AdminSidebar: React.FC = () => {
  const pathname = usePathname();
  const { isMobileNavOpen, setIsMobileNavOpen, toggleMobileNav } = useAdminLayout();

  const menuItems = [
    { label: "Overview", href: "/admin", icon: LayoutDashboard },
    { label: "All Posts", href: "/admin/posts", icon: FileText },
    { label: "New Post", href: "/admin/posts/new", icon: PlusCircle },
    { label: "Categories", href: "/admin/categories", icon: FolderTree },
    { label: "Banner Ads", href: "/admin/ads", icon: Megaphone },
    { label: "Media Library", href: "/admin/media", icon: ImageIcon },
  ];

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("fatw_admin_session");
      localStorage.removeItem("fatw_admin_auth_timestamp");
      window.location.href = "/admin/login";
    }
  };

  const navContent = (
    <>
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-800 flex items-center justify-between">
        <Link
          href="/admin"
          onClick={() => setIsMobileNavOpen(false)}
          className="flex items-center space-x-2"
        >
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

        {/* Mobile close button */}
        <button
          type="button"
          onClick={() => setIsMobileNavOpen(false)}
          className="md:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          aria-label="Close admin menu"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
        <div className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500 px-3 mb-2">
          MAIN MENU
        </div>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href ||
            (item.href !== "/admin" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsMobileNavOpen(false)}
              className={`flex items-center gap-3 px-3.5 py-3 md:py-2.5 rounded-xl md:rounded-lg text-sm md:text-xs font-bold transition-all ${
                isActive
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/80"
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
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
          onClick={() => setIsMobileNavOpen(false)}
          className="flex items-center justify-between px-3 py-2.5 md:py-2 rounded-lg bg-slate-800/80 text-slate-300 hover:text-white hover:bg-blue-600 transition-all text-xs font-bold"
        >
          <span>View Public Site</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>
        <button
          type="button"
          onClick={handleLogout}
          className="w-full flex items-center justify-between px-3 py-2.5 md:py-2 rounded-lg text-slate-400 hover:text-rose-300 hover:bg-rose-950/50 transition-all text-xs font-bold cursor-pointer"
        >
          <span>Log Out</span>
          <LogOut className="w-3.5 h-3.5" />
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 bg-slate-900 text-slate-300 min-h-screen flex-col border-r border-slate-800 shrink-0 sticky top-0 h-screen">
        {navContent}
      </aside>

      {/* Mobile Slide-in Drawer */}
      {isMobileNavOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMobileNavOpen(false)}
          />

          {/* Drawer Menu */}
          <div className="relative w-72 max-w-[85vw] bg-slate-900 text-slate-300 h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-left duration-300 border-r border-slate-800">
            {navContent}
          </div>
        </div>
      )}

      {/* Mobile Bottom Navigation Bar for 1-tap quick actions */}
      <div className="fixed bottom-0 inset-x-0 bg-slate-900/95 backdrop-blur-md border-t border-slate-800 z-40 md:hidden px-2 py-1.5 flex items-center justify-around text-slate-400 shadow-2xl">
        <Link
          href="/admin"
          className={`flex flex-col items-center justify-center py-1 px-2 rounded-lg text-[10px] font-bold ${
            pathname === "/admin" ? "text-blue-400" : "hover:text-slate-200"
          }`}
        >
          <LayoutDashboard className="w-4 h-4 mb-0.5" />
          <span>Home</span>
        </Link>

        <Link
          href="/admin/posts"
          className={`flex flex-col items-center justify-center py-1 px-2 rounded-lg text-[10px] font-bold ${
            pathname === "/admin/posts" ? "text-blue-400" : "hover:text-slate-200"
          }`}
        >
          <FileText className="w-4 h-4 mb-0.5" />
          <span>Posts</span>
        </Link>

        {/* Central Prominent Post Button */}
        <Link
          href="/admin/posts/new"
          className="flex flex-col items-center justify-center -mt-4"
        >
          <div className="w-11 h-11 rounded-full bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center shadow-lg border-2 border-slate-900 transition-transform active:scale-95">
            <PlusCircle className="w-6 h-6" />
          </div>
          <span className="text-[10px] font-black text-blue-400 mt-0.5">New Post</span>
        </Link>

        <Link
          href="/admin/media"
          className={`flex flex-col items-center justify-center py-1 px-2 rounded-lg text-[10px] font-bold ${
            pathname === "/admin/media" ? "text-blue-400" : "hover:text-slate-200"
          }`}
        >
          <ImageIcon className="w-4 h-4 mb-0.5" />
          <span>Media</span>
        </Link>

        <button
          type="button"
          onClick={toggleMobileNav}
          className="flex flex-col items-center justify-center py-1 px-2 rounded-lg text-[10px] font-bold hover:text-slate-200 cursor-pointer"
        >
          <Menu className="w-4 h-4 mb-0.5" />
          <span>Menu</span>
        </button>
      </div>
    </>
  );
};
