"use client";

import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { Loader2 } from "lucide-react";

import { AdminLayoutProvider } from "@/components/admin/AdminLayoutContext";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    // If on the login page itself, do not enforce redirection
    if (pathname === "/admin/login") {
      setIsAuthenticated(true);
      return;
    }

    const sessionAuth = sessionStorage.getItem("fatw_admin_session");
    if (sessionAuth === "authenticated") {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      router.replace("/admin/login");
    }
  }, [pathname, router]);

  // While checking auth status
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center space-y-3">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
        <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
          Checking Admin Access...
        </p>
      </div>
    );
  }

  // If on login page, render full screen without sidebar
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  // If not authenticated, keep loading screen while redirecting to /admin/login
  if (!isAuthenticated) {
    return null;
  }

  return (
    <AdminLayoutProvider>
      <div className="min-h-screen flex flex-col md:flex-row bg-slate-100 text-slate-900">
        {/* Admin Sidebar (Desktop sidebar + Mobile drawer) */}
        <AdminSidebar />

        {/* Main Admin Content Area */}
        <div className="flex-1 flex flex-col min-w-0 w-full overflow-y-auto pb-16 md:pb-0">
          {children}
        </div>
      </div>
    </AdminLayoutProvider>
  );
}
