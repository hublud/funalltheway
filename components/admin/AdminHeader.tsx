"use client";

import React from "react";
import Link from "next/link";
import { Bell, Plus, ShieldCheck, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface AdminHeaderProps {
  title?: string;
  subtitle?: string;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({
  title = "Admin Dashboard",
  subtitle = "Manage FunAllTheWay articles, categories, and advertising campaigns",
}) => {
  return (
    <header className="bg-white border-b border-slate-200 px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sticky top-0 z-20">
      <div>
        <h1 className="text-xl font-black text-slate-900 tracking-tight">{title}</h1>
        <p className="text-xs text-slate-500">{subtitle}</p>
      </div>

      <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
        <Link href="/admin/posts/new">
          <Button variant="primary" size="sm" className="font-bold text-xs uppercase tracking-wider">
            <Plus className="w-4 h-4 mr-1" />
            CREATE POST
          </Button>
        </Link>

        <div className="flex items-center gap-2 pl-3 border-l border-slate-200">
          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
            AD
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-xs font-bold text-slate-900 leading-none">Super Admin</p>
            <p className="text-[10px] text-emerald-600 font-semibold flex items-center gap-0.5">
              <ShieldCheck className="w-3 h-3" /> Online
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};
