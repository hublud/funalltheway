"use client";

import React from "react";
import Link from "next/link";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { TopLandscapeAd, DualPromoBanners } from "@/components/ads/CustomAdBanners";
import {
  Sparkles,
  Camera,
  Video,
  Shirt,
  Bot,
  SlidersHorizontal,
  GraduationCap,
  Layers,
  Palette,
  Newspaper,
  Briefcase,
  Flame,
  Trophy,
  Music,
  Tv,
  Smile,
  Disc3,
  MessageCircle,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

export default function ServicesPage() {
  const creativeServices = [
    {
      num: "01",
      title: "Picture Editing",
      desc: "High-end studio skin retouching, color grading, lighting adjustment, and portrait enhancements.",
      icon: Camera,
      badge: "Popular",
      color: "from-blue-600 to-indigo-600",
      waText: "Hello Fun All The Way Limited, I want to order Picture Editing services.",
    },
    {
      num: "02",
      title: "Video Editing",
      desc: "Shorts, TikTok, YouTube videos, music visualizers, cinema-grade transitions, and sound sync.",
      icon: Video,
      badge: "Trending",
      color: "from-purple-600 to-pink-600",
      waText: "Hello Fun All The Way Limited, I want to order Video Editing services.",
    },
    {
      num: "03",
      title: "Background, Cloth, Heels, Makeup & Bag Change",
      desc: "Realistic virtual wardrobe changes, luxury background replacements, makeup retouches, and accessories swapping.",
      icon: Shirt,
      badge: "Signature",
      color: "from-rose-600 to-red-600",
      waText: "Hello Fun All The Way Limited, I want to order Background / Cloth / Makeup Change services.",
    },
    {
      num: "04",
      title: "AI Editing & Generative Visuals",
      desc: "Hyper-realistic AI portraits, futuristic visual avatars, generative expansions, and concept artwork.",
      icon: Bot,
      badge: "AI Powered",
      color: "from-emerald-600 to-teal-600",
      waText: "Hello Fun All The Way Limited, I want to order AI Editing and Generative Art.",
    },
    {
      num: "05",
      title: "Before & After Pictures",
      desc: "Showcase transformation edits for beauty brands, fashion lookbooks, real estate, and portfolio pieces.",
      icon: SlidersHorizontal,
      badge: "Showcase",
      color: "from-amber-600 to-yellow-600",
      waText: "Hello Fun All The Way Limited, I want to order Before and After Picture edits.",
    },
    {
      num: "06",
      title: "Picture, Video & AI Editing Training",
      desc: "Master digital photo manipulation, video editing software, and generative AI tools with step-by-step practical masterclasses.",
      icon: GraduationCap,
      badge: "Masterclass",
      color: "from-cyan-600 to-blue-600",
      waText: "Hello Fun All The Way Limited, I want to register for Picture, Video and AI Editing Training.",
    },
    {
      num: "07",
      title: "Picture & Video Photoshoot",
      desc: "Professional studio and outdoor photoshoot sessions, video shoots, event coverage, model lookbooks, and high-resolution picture sessions.",
      icon: Camera,
      badge: "Signature",
      color: "from-indigo-600 to-blue-700",
      waText: "Hello Fun All The Way Limited, I want to book a Picture & Video Photoshoot session.",
    },
    {
      num: "08",
      title: "Graphic Design",
      desc: "Flyers, music album cover art, branding packages, logos, billboards, and social media promotional materials.",
      icon: Palette,
      badge: "Creative",
      color: "from-pink-600 to-rose-700",
      waText: "Hello Fun All The Way Limited, I want to order Graphic Design / Cover Art services.",
    },
  ];

  const mediaServices = [
    { title: "General Nigeria News & Updates", icon: Newspaper, href: "/news" },
    { title: "Job Vacancies in Nigeria & Abroad", icon: Briefcase, href: "/jobs" },
    { title: "Celebrity Gist & Nollywood", icon: Flame, href: "/celebrity" },
    { title: "Sports News & Match Reports", icon: Trophy, href: "/sports" },
    { title: "Music, MP3s & Releases", icon: Music, href: "/music" },
    { title: "Viral Videos & AI Visuals", icon: Tv, href: "/videos" },
    { title: "Comedy Skits & Street Pranks", icon: Smile, href: "/comedy" },
    { title: "DJ Mixtapes & Freebeats", icon: Disc3, href: "/music" },
  ];

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Our Services" },
        ]}
      />

      {/* Top Landscape Ad */}
      <TopLandscapeAd />

      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white p-6 sm:p-10 rounded-3xl shadow-lg relative overflow-hidden space-y-4">
        <div className="inline-flex items-center gap-2 bg-yellow-400/20 text-yellow-300 border border-yellow-400/30 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider">
          <Sparkles className="w-4 h-4" /> Welcome to Fun All The Way Limited
        </div>
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
          Our Professional Services & Creative Solutions
        </h1>
        <p className="text-sm sm:text-base text-blue-100 max-w-3xl leading-relaxed">
          From industry-leading <strong>Photo, Video & AI Editing Services</strong> to 24/7 breaking Nigerian entertainment, music, jobs, and lifestyle media coverage — <strong>Fun All The Way Limited Got You Covered!</strong>
        </p>

        <div className="pt-2 flex flex-wrap gap-3">
          <a
            href="https://wa.me/2347053641852?text=Hello%20Fun%20All%20The%20Way%20Limited%2C%20I%20want%20to%20order%20creative%20services."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider px-6 py-3 rounded-xl shadow-md transition-all active:scale-95"
          >
            <MessageCircle className="w-4 h-4 fill-current" /> Order on WhatsApp (07053641852)
          </a>
          <a
            href="https://wa.me/2348156763457?text=Hello%20Fun%20All%20The%20Way%20Limited%2C%20I%20want%20to%20inquire%20about%20your%20services."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider px-6 py-3 rounded-xl shadow-md transition-all active:scale-95"
          >
            <MessageCircle className="w-4 h-4 fill-current" /> WhatsApp Line 2 (08156763457)
          </a>
        </div>
      </div>

      {/* Section 1: Main Creative Services Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b-2 border-blue-600 pb-2">
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-blue-600">
              FEATURED CREATIVE PACKAGES
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              Our Professional Creative & Editing Services
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          {creativeServices.map((service) => {
            const Icon = service.icon;
            const waUrl = `https://wa.me/2347053641852?text=${encodeURIComponent(service.waText)}`;
            return (
              <div
                key={service.num}
                className="group bg-white rounded-2xl border-2 border-slate-200 hover:border-blue-500 p-5 shadow-xs hover:shadow-xl transition-all flex flex-col justify-between space-y-4 relative"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-black text-slate-400 font-mono">
                      #{service.num}
                    </span>
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200">
                      {service.badge}
                    </span>
                  </div>

                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${service.color} text-white flex items-center justify-center shadow-md mb-3 group-hover:scale-105 transition-transform`}>
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-base font-black text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                    {service.title}
                  </h3>

                  <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                    {service.desc}
                  </p>
                </div>

                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-600 text-emerald-700 hover:text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 border border-emerald-200 hover:border-emerald-600 shadow-xs"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-current" />
                  <span>Order on WhatsApp</span>
                </a>
              </div>
            );
          })}
        </div>
      </div>

      {/* Promotional Showcase Ad Banners */}
      <DualPromoBanners placementTitle="FUN ALL THE WAY LIMITED OFFICIAL PACKAGES" />

      {/* Section 2: Other Services We Render */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div>
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-emerald-600">
            DIGITAL MEDIA & ENTERTAINMENT
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">
            Other Services & Publications We Render
          </h2>
          <p className="text-xs text-slate-500">
            Click any section below to explore our daily updated digital media publications.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          {mediaServices.map((media) => {
            const Icon = media.icon;
            return (
              <Link
                key={media.title}
                href={media.href}
                className="group p-4 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 transition-all flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-slate-800 group-hover:text-blue-600 truncate">
                    {media.title}
                  </span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all shrink-0" />
              </Link>
            );
          })}
        </div>
      </div>

      {/* WhatsApp Quick Action Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-md flex flex-col md:flex-row items-center justify-between gap-6 border-2 border-emerald-500/40">
        <div className="space-y-1 text-center md:text-left">
          <span className="text-xs font-black uppercase tracking-widest text-emerald-400">
            Fun All The Way Limited Got U Covered!
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-white">
            Ready to order an edit or place an advert?
          </h3>
          <p className="text-xs text-slate-400">
            Reach our creative editors & direct support hotline on WhatsApp right now.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <a
            href="https://wa.me/2347053641852"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-95 font-mono"
          >
            <MessageCircle className="w-4 h-4 fill-current" /> 07053641852
          </a>
          <a
            href="https://wa.me/2348156763457"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-95 font-mono"
          >
            <MessageCircle className="w-4 h-4 fill-current" /> 08156763457
          </a>
        </div>
      </div>
    </div>
  );
}
