"use client";

import React, { useState } from "react";
import { Link as LinkIcon, Check } from "lucide-react";
import { WhatsAppIcon, TwitterXIcon, FacebookIcon } from "@/components/ui/SocialIcons";

interface SocialShareProps {
  url?: string;
  title?: string;
}

export const SocialShare: React.FC<SocialShareProps> = ({
  url = typeof window !== "undefined" ? window.location.href : "https://funalltheway.com",
  title = "Read this exciting story on FunAllTheWay!",
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (typeof navigator !== "undefined") {
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const shareWhatsapp = `https://api.whatsapp.com/send?text=${encodeURIComponent(
    `${title} - ${url}`
  )}`;
  const shareTwitter = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    title
  )}&url=${encodeURIComponent(url)}`;
  const shareFacebook = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    url
  )}`;

  return (
    <div className="flex items-center flex-wrap gap-2 py-4 border-y border-slate-200 my-6">
      <span className="text-xs font-bold uppercase tracking-wider text-slate-500 mr-2">
        SHARE THIS STORY:
      </span>

      {/* WhatsApp */}
      <a
        href={shareWhatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold transition-colors shadow-xs"
      >
        <WhatsAppIcon className="w-3.5 h-3.5" />
        <span>WhatsApp</span>
      </a>

      {/* Twitter / X */}
      <a
        href={shareTwitter}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-slate-900 hover:bg-black text-white text-xs font-bold transition-colors shadow-xs"
      >
        <TwitterXIcon className="w-3.5 h-3.5" />
        <span>X / Twitter</span>
      </a>

      {/* Facebook */}
      <a
        href={shareFacebook}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors shadow-xs"
      >
        <FacebookIcon className="w-3.5 h-3.5" />
        <span>Facebook</span>
      </a>

      {/* Copy Link */}
      <button
        onClick={handleCopy}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer border border-slate-300"
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5 text-emerald-600" />
            <span className="text-emerald-600">Copied!</span>
          </>
        ) : (
          <>
            <LinkIcon className="w-3.5 h-3.5" />
            <span>Copy Link</span>
          </>
        )}
      </button>
    </div>
  );
};
