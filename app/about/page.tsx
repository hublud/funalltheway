import React from "react";
import { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Flame, ShieldCheck, Award, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | Fun All The Way Limited",
  description: "Learn more about Fun All The Way Limited - Nigeria's premier entertainment and lifestyle media platform.",
};

export default function AboutPage() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "About Us" },
        ]}
      />

      <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-6">
        <div className="flex items-center space-x-3 pb-4 border-b border-slate-100">
          <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center text-white">
            <Flame className="w-6 h-6 text-yellow-300" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">About Fun All The Way Limited</h1>
            <p className="text-xs text-blue-600 font-bold uppercase tracking-wider">
              Nigeria’s Premier Entertainment, Media & Creative Services Hub
            </p>
          </div>
        </div>

        <p className="text-slate-700 leading-relaxed text-base">
          <strong>Fun All The Way Limited</strong> is a fast-paced, digital-first entertainment, lifestyle, and creative media company dedicated to showcasing the vibrancy of African music, cinema, comedy, creative arts, and youth culture.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-4">
          <div className="p-4 rounded-lg bg-blue-50 border border-blue-100 text-center">
            <Users className="w-6 h-6 text-blue-600 mx-auto mb-2" />
            <h3 className="font-bold text-slate-900 text-sm">2.5M+ Readers</h3>
            <p className="text-xs text-slate-500 mt-1">Connecting millions of entertainment fans worldwide</p>
          </div>
          <div className="p-4 rounded-lg bg-blue-50 border border-blue-100 text-center">
            <Award className="w-6 h-6 text-blue-600 mx-auto mb-2" />
            <h3 className="font-bold text-slate-900 text-sm">Real-time Curation</h3>
            <p className="text-xs text-slate-500 mt-1">24/7 dedicated coverage of Afrobeats & Nollywood</p>
          </div>
          <div className="p-4 rounded-lg bg-blue-50 border border-blue-100 text-center">
            <ShieldCheck className="w-6 h-6 text-blue-600 mx-auto mb-2" />
            <h3 className="font-bold text-slate-900 text-sm">Creative Opportunities</h3>
            <p className="text-xs text-slate-500 mt-1">Empowering editors, beatmakers, and visual artists</p>
          </div>
        </div>

        <h2 className="text-xl font-bold text-slate-900 pt-2">Our Mission</h2>
        <p className="text-slate-700 leading-relaxed text-sm">
          To provide an authentic, engaging, and culturally resonant platform that bridges independent African storytellers, artists, and creators with a passionate global audience.
        </p>
      </div>
    </div>
  );
}
