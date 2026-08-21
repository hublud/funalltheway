"use client";

import React, { useState } from "react";

interface BlogImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  fill?: boolean;
  aspectRatio?: "video" | "square" | "portrait" | "wide";
}

export const BlogImage: React.FC<BlogImageProps> = ({
  src,
  alt,
  className = "",
  priority = false,
  fill = false,
  aspectRatio = "video",
}) => {
  const [hasError, setHasError] = useState(false);

  const isVideo =
    src?.match(/\.(mp4|webm|mov|mkv|avi|3gp)$/i) || src?.includes("/videos/");

  const getOptimizedSrc = (rawSrc: string) => {
    if (!rawSrc) return "/images/placeholder.jpg";
    if (rawSrc.startsWith("cloudinary://")) {
      const publicId = rawSrc.replace("cloudinary://", "");
      return `https://res.cloudinary.com/demo/image/upload/f_auto,q_auto,w_800/${publicId}`;
    }
    return rawSrc;
  };

  const imageSrc = hasError
    ? "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&auto=format&fit=crop&q=80"
    : getOptimizedSrc(src);

  const aspectClasses = {
    video: "aspect-[16/9]",
    square: "aspect-square",
    portrait: "aspect-[3/4]",
    wide: "aspect-[21/9]",
  }[aspectRatio];

  return (
    <div
      className={`relative overflow-hidden bg-slate-950 ${
        !fill ? aspectClasses : "w-full h-full"
      } ${className}`}
    >
      {isVideo ? (
        <video
          src={src}
          muted
          autoPlay
          loop
          playsInline
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={imageSrc}
          alt={alt || "Fun All The Way Media"}
          loading={priority ? "eager" : "lazy"}
          onError={() => setHasError(true)}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      )}
    </div>
  );
};
