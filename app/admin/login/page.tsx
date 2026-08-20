"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Flame, Lock, ArrowRight, ShieldCheck, Eye, EyeOff, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

const VALID_PASSWORDS = [
  "Fun123#1@@",
  (process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "").trim(),
].filter(Boolean);

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const entered = password.trim();
    if (VALID_PASSWORDS.includes(entered)) {
      if (typeof window !== "undefined") {
        sessionStorage.setItem("fatw_admin_session", "authenticated");
        localStorage.setItem("fatw_admin_auth_timestamp", Date.now().toString());
      }
      setTimeout(() => {
        router.push("/admin");
      }, 200);
    } else {
      setIsLoading(false);
      setError("Incorrect admin password. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-slate-800 rounded-3xl p-8 border border-slate-700 shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white mx-auto shadow-md">
            <Flame className="w-7 h-7 text-yellow-300" />
          </div>
          <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white">
            FUN ALL THE WAY LIMITED
          </h1>
          <p className="text-xs font-bold uppercase tracking-widest text-blue-400">
            ADMINISTRATOR ACCESS
          </p>
        </div>

        {error && (
          <div className="p-3 bg-rose-950/70 border border-rose-600 rounded-xl text-rose-200 text-xs font-bold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase mb-1.5">
              Admin Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password..."
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(null);
                }}
                autoFocus
                required
                className="w-full pl-10 pr-11 py-3 bg-slate-900 border border-slate-600 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 p-1"
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={isLoading}
            className="w-full font-black text-xs uppercase tracking-wider py-3.5 rounded-xl shadow-lg"
          >
            <span>{isLoading ? "AUTHENTICATING..." : "ENTER ADMIN PORTAL"}</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </form>

        <div className="text-center pt-2 border-t border-slate-700/60 flex items-center justify-between text-xs text-slate-400">
          <Link href="/" className="hover:text-white transition-colors">
            ← Back to Public Website
          </Link>
          <span className="flex items-center gap-1 text-emerald-400 font-bold text-[11px]">
            <ShieldCheck className="w-3.5 h-3.5" /> Secure Session
          </span>
        </div>
      </div>
    </div>
  );
}
