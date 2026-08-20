import React from "react";
import { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

export const metadata: Metadata = {
  title: "Terms & Conditions | Fun All The Way Limited",
  description: "Terms and conditions of service for FunAllTheWayLimited.com visitors and contributors.",
};

export default function TermsPage() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Terms & Conditions" },
        ]}
      />

      <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-6 text-slate-700 text-sm leading-relaxed">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 border-b pb-4">
          Terms & Conditions
        </h1>
        <p className="text-xs text-slate-400">Effective Date: August 20, 2026</p>

        <p>
          Welcome to <strong>Fun All The Way Limited</strong>. By accessing or using our website, you agree to comply with and be bound by the following terms and conditions.
        </p>

        <h2 className="text-lg font-bold text-slate-900 pt-2">1. Intellectual Property & Fair Use</h2>
        <p>
          All editorial content, trademarks, graphics, and logo designs on FunAllTheWayLimited.com are the property of Fun All The Way Limited or its content providers. Promotional audio tracks and preview media are shared under standard fair-use promotional provisions.
        </p>

        <h2 className="text-lg font-bold text-slate-900 pt-2">2. Content Submissions & Copyright Notices</h2>
        <p>
          If you believe that any material available on Fun All The Way Limited infringes upon your copyright, please contact us immediately via our WhatsApp / Contact page for swift review and takedown resolution.
        </p>
      </div>
    </div>
  );
}
