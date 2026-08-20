import React from "react";
import Link from "next/link";
import {
  Flame,
  ShieldCheck,
  ChevronRight,
  MessageCircle,
  Mail,
} from "lucide-react";
import { siteConfig } from "@/data/siteConfig";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-slate-900 text-slate-300 pt-12 pb-8 border-t-4 border-blue-600">
      <div className="max-w-6xl mx-auto px-4">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-10 border-b border-slate-800">
          {/* Col 1: About & Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded bg-blue-600 flex items-center justify-center text-white">
                <Flame className="w-5 h-5 text-yellow-300" />
              </div>
              <span className="text-lg sm:text-xl font-black text-white tracking-wider">
                FUN ALL THE WAY LIMITED
              </span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed">
              Nigeria’s premier entertainment & digital media publication, bringing you breaking news, Afrobeats releases, viral comedy, celebrity updates, and 24-hour creative editing services.
            </p>
            <div className="flex items-center space-x-2 text-xs text-blue-400 font-semibold pt-1">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Verified Digital Media Platform</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-blue-500 pl-2">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs">
              {siteConfig.footerQuickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="flex items-center text-slate-400 hover:text-white transition-colors py-0.5"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-blue-500 mr-1.5" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Direct WhatsApp & Email Helpdesk */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-blue-500 pl-2">
              Direct Contact
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Reach our editorial and advert team directly via WhatsApp or email:
            </p>
            
            <div className="space-y-2.5">
              <a
                href="https://wa.me/2347053641852"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-800 hover:bg-emerald-900/50 border border-slate-700 hover:border-emerald-500 transition-all text-xs font-bold text-emerald-400"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>WhatsApp: 07053641852</span>
              </a>

              <a
                href="https://wa.me/2348156763457"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-800 hover:bg-blue-900/50 border border-slate-700 hover:border-blue-500 transition-all text-xs font-bold text-blue-400"
              >
                <MessageCircle className="w-4 h-4 text-blue-400 shrink-0" />
                <span>WhatsApp: 08156763457</span>
              </a>

              <a
                href="mailto:funalltheway2025@gmail.com"
                className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-all text-xs font-bold text-slate-300 font-mono"
              >
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <span>funalltheway2025@gmail.com</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright notice */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 Fun All The Way Limited. All Rights Reserved.</p>
          <div className="flex space-x-4">
            <Link href="/privacy" className="hover:text-slate-300 transition-colors">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-slate-300 transition-colors">
              Terms of Service
            </Link>
            <span>•</span>
            <Link href="/contact" className="hover:text-slate-300 transition-colors">
              Contact Us
            </Link>
            <span>•</span>
            <Link
              href="/admin/login"
              className="text-slate-400 hover:text-yellow-300 transition-colors font-bold"
            >
              🔒 Admin Login
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
