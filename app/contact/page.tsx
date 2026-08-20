"use client";

import React from "react";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import {
  MessageCircle,
  Mail,
  MapPin,
  Megaphone,
  UploadCloud,
  Palette,
  Briefcase,
  ShieldAlert,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export default function ContactPage() {
  const whatsappTopics = [
    {
      title: "Advertise With Us",
      desc: "Leaderboard banners, sponsored posts, homepage spotlight & media promotions.",
      icon: Megaphone,
      color: "bg-blue-600",
      phone: "07053641852",
      waLink:
        "https://wa.me/2347053641852?text=Hello%20FunAllTheWay%2C%20I%20want%20to%20inquire%20about%20placing%20an%20advert%20banner%20%2F%20sponsored%20post.",
    },
    {
      title: "Submit Music & Beats",
      desc: "Afrobeats tracks, freebeats, instrumental drops & music video premieres.",
      icon: UploadCloud,
      color: "bg-amber-600",
      phone: "07053641852",
      waLink:
        "https://wa.me/2347053641852?text=Hello%20FunAllTheWay%2C%20I%20would%20like%20to%20submit%20my%20music%20%2F%20song%20%2F%20beat%20for%20upload.",
    },
    {
      title: "Photo & Video Editing Services",
      desc: "Picture retouching, background & cloth changes, 24-hour turnaround design packages.",
      icon: Palette,
      color: "bg-rose-600",
      phone: "07053641852",
      waLink:
        "https://wa.me/2347053641852?text=Hello%20FunAllTheWay%2C%20I%20want%20to%20order%20Photo%20%2F%20Video%20Editing%20and%20Graphics%20Design%20services.",
    },
    {
      title: "Jobs & General Inquiries",
      desc: "Job vacancy listings, creator partnerships & general media inquiries.",
      icon: Briefcase,
      color: "bg-emerald-600",
      phone: "08156763457",
      waLink:
        "https://wa.me/2348156763457?text=Hello%20FunAllTheWay%2C%20I%20have%20a%20general%20inquiry%20%2F%20job%20board%20question.",
    },
    {
      title: "DMCA & Content Take-Down",
      desc: "Official copyright notices and intellectual property inquiries.",
      icon: ShieldAlert,
      color: "bg-slate-700",
      phone: "07053641852",
      waLink:
        "https://wa.me/2347053641852?text=Hello%20FunAllTheWay%2C%20I%20am%20submitting%20a%20DMCA%20%2F%20Content%20Take-Down%20notice.",
    },
  ];

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Contact & WhatsApp Desk" },
        ]}
      />

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-950 text-white p-6 sm:p-10 rounded-3xl shadow-sm space-y-3 relative overflow-hidden">
        <div className="inline-flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" /> Instant WhatsApp Response
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
          Direct Contact & WhatsApp Support Desk
        </h1>
        <p className="text-sm text-blue-100 max-w-2xl leading-relaxed">
          We operate exclusively via <strong>WhatsApp Direct Chat</strong> and official email for fast turnaround on adverts, music submissions, editing gigs, and inquiries.
        </p>
      </div>

      {/* Main Direct WhatsApp Callouts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Line 1 */}
        <a
          href="https://wa.me/2347053641852?text=Hello%20FunAllTheWay%2C%20I%20am%20reaching%20out%20for%20assistance."
          target="_blank"
          rel="noopener noreferrer"
          className="group bg-emerald-600 hover:bg-emerald-700 text-white rounded-3xl p-6 shadow-md hover:shadow-xl transition-all flex items-center justify-between gap-4"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
              <MessageCircle className="w-8 h-8 text-white fill-current" />
            </div>
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-200 block">
                Primary Hotline 1
              </span>
              <span className="text-xl sm:text-2xl font-black block font-mono">
                07053641852
              </span>
              <span className="text-xs text-emerald-100 font-medium">
                Tap to Chat on WhatsApp (+234 705 364 1852)
              </span>
            </div>
          </div>
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-1 transition-transform shrink-0">
            <ArrowRight className="w-5 h-5 text-white" />
          </div>
        </a>

        {/* Line 2 */}
        <a
          href="https://wa.me/2348156763457?text=Hello%20FunAllTheWay%2C%20I%20am%20reaching%20out%20for%20assistance."
          target="_blank"
          rel="noopener noreferrer"
          className="group bg-blue-600 hover:bg-blue-700 text-white rounded-3xl p-6 shadow-md hover:shadow-xl transition-all flex items-center justify-between gap-4"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
              <MessageCircle className="w-8 h-8 text-white fill-current" />
            </div>
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-blue-200 block">
                Support Line 2
              </span>
              <span className="text-xl sm:text-2xl font-black block font-mono">
                08156763457
              </span>
              <span className="text-xs text-blue-100 font-medium">
                Tap to Chat on WhatsApp (+234 815 676 3457)
              </span>
            </div>
          </div>
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-1 transition-transform shrink-0">
            <ArrowRight className="w-5 h-5 text-white" />
          </div>
        </a>
      </div>

      {/* Topic Based Quick Chat Grid */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div>
          <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
            What Would You Like to Inquire About?
          </h2>
          <p className="text-xs text-slate-500">
            Select a service below to open a pre-filled WhatsApp conversation directly with our team.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {whatsappTopics.map((topic) => {
            const Icon = topic.icon;
            return (
              <a
                key={topic.title}
                href={topic.waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-5 rounded-2xl border-2 border-slate-200 hover:border-emerald-500 bg-slate-50 hover:bg-emerald-50/40 transition-all flex flex-col justify-between space-y-3"
              >
                <div className="space-y-2">
                  <div className={`w-10 h-10 rounded-xl ${topic.color} text-white flex items-center justify-center shadow-xs`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                    {topic.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {topic.desc}
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-slate-200/80 text-xs font-bold text-emerald-600 group-hover:text-emerald-700">
                  <span className="flex items-center gap-1">
                    <MessageCircle className="w-3.5 h-3.5 fill-current" /> Chat on WhatsApp
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </a>
            );
          })}
        </div>
      </div>

      {/* Official Email & Physical Location Info */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shrink-0">
            <Mail className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block">
              Official Email Correspondence
            </span>
            <a
              href="mailto:funalltheway2025@gmail.com"
              className="text-base sm:text-lg font-bold text-white hover:text-blue-300 transition-colors font-mono"
            >
              funalltheway2025@gmail.com
            </a>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs text-slate-400">
          <MapPin className="w-4 h-4 text-rose-400 shrink-0" />
          <span>Lekki Phase 1, Lagos State, Nigeria</span>
        </div>
      </div>
    </div>
  );
}
