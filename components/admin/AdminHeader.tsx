import React from "react";
import Link from "next/link";
import { Plus, ShieldCheck, Menu } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useAdminLayout } from "./AdminLayoutContext";

interface AdminHeaderProps {
  title?: string;
  subtitle?: string;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({
  title = "Admin Dashboard",
  subtitle = "Manage FunAllTheWay articles, categories, and advertising campaigns",
}) => {
  const { toggleMobileNav } = useAdminLayout();

  return (
    <header className="bg-white border-b border-slate-200 px-4 sm:px-6 py-3.5 sm:py-4 flex items-center justify-between gap-3 sticky top-0 z-20 shadow-2xs">
      <div className="flex items-center gap-3 min-w-0">
        <button
          type="button"
          onClick={toggleMobileNav}
          className="md:hidden p-2 rounded-lg text-slate-700 hover:text-blue-600 hover:bg-slate-100 transition-colors shrink-0"
          aria-label="Toggle menu"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div className="min-w-0">
          <h1 className="text-base sm:text-xl font-black text-slate-900 tracking-tight truncate">
            {title}
          </h1>
          <p className="text-[11px] sm:text-xs text-slate-500 truncate hidden sm:block">
            {subtitle}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        <Link href="/admin/posts/new">
          <Button
            variant="primary"
            size="sm"
            className="font-bold text-[11px] sm:text-xs uppercase tracking-wider px-2.5 sm:px-4 py-1.5 sm:py-2"
          >
            <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1" />
            <span>New Post</span>
          </Button>
        </Link>

        <div className="flex items-center gap-2 pl-2 sm:pl-3 border-l border-slate-200">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs shrink-0">
            AD
          </div>
          <div className="hidden lg:block text-left">
            <p className="text-xs font-bold text-slate-900 leading-none">Super Admin</p>
            <p className="text-[10px] text-emerald-600 font-semibold flex items-center gap-0.5 mt-0.5">
              <ShieldCheck className="w-3 h-3" /> Online
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};
