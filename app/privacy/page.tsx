import React from "react";
import { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

export const metadata: Metadata = {
  title: "Privacy Policy | Fun All The Way Limited",
  description: "Privacy policy and data protection practices for FunAllTheWayLimited.com.",
};

export default function PrivacyPage() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Privacy Policy" },
        ]}
      />

      <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-6 text-slate-700 text-sm leading-relaxed">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 border-b pb-4">
          Privacy Policy
        </h1>
        <p className="text-xs text-slate-400">Last updated: August 20, 2026</p>

        <p>
          At <strong>Fun All The Way Limited</strong>, we are committed to safeguarding the privacy of our visitors. This Privacy Policy outlines the types of personal data we receive and collect when you visit our website, and how we safeguard your information.
        </p>

        <h2 className="text-lg font-bold text-slate-900 pt-2">1. Information Collection</h2>
        <p>
          We may collect personal information such as names and email addresses when voluntarily submitted by our visitors through our newsletter subscription, contact forms, or commenting sections.
        </p>

        <h2 className="text-lg font-bold text-slate-900 pt-2">2. Cookies & Advertising</h2>
        <p>
          We and third-party advertising partners (such as Google AdSense) may use cookies to deliver personalized advertising based on a user’s prior visits to our website and other sites across the internet.
        </p>

        <h2 className="text-lg font-bold text-slate-900 pt-2">3. Data Protection</h2>
        <p>
          We implement rigorous security measures to protect against unauthorized access, alteration, or disclosure of your personal data.
        </p>
      </div>
    </div>
  );
}
