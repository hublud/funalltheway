"use client";

import React, { use } from "react";
import Link from "next/link";
import { Calendar, Clock, ArrowLeft, ArrowRight, Tag, AlertCircle, Images, Film, Play, Download, ChevronDown, Music, Headphones } from "lucide-react";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Badge } from "@/components/ui/Badge";
import { BlogImage } from "@/components/ui/BlogImage";
import { SocialShare } from "@/components/blog/SocialShare";
import { RelatedPosts } from "@/components/blog/RelatedPosts";
import { TopLandscapeAd, DualPromoBanners } from "@/components/ads/CustomAdBanners";
import { HorizontalAd } from "@/components/ads/HorizontalAd";
import { InArticleAd } from "@/components/ads/InArticleAd";
import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/Button";

interface ArticlePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function ArticleDetailsPage({ params }: ArticlePageProps) {
  const { slug } = use(params);
  const { articles } = useStore();

  const articleIndex = articles.findIndex((a) => a.slug === slug);
  const article = articleIndex !== -1 ? articles[articleIndex] : null;

  if (!article) {
    return (
      <div className="max-w-2xl mx-auto py-16 px-4 text-center space-y-4">
        <div className="w-14 h-14 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-black text-slate-900">Story Not Found</h1>
        <p className="text-sm text-slate-500 max-w-md mx-auto">
          The requested article may have been moved, removed, or is still being published.
        </p>
        <div className="pt-2 flex justify-center gap-3">
          <Link href="/">
            <Button variant="primary" size="md" className="font-bold text-xs uppercase">
              ← Return to Homepage
            </Button>
          </Link>
          <Link href="/admin/posts/new">
            <Button variant="outline" size="md" className="font-bold text-xs uppercase">
              Write New Article
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const prevArticle = articleIndex > 0 ? articles[articleIndex - 1] : null;
  const nextArticle =
    articleIndex < articles.length - 1 ? articles[articleIndex + 1] : null;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Top Breadcrumb */}
      <Breadcrumb
        items={[
          { label: article.category || "News", href: `/${article.categorySlug || "news"}` },
          { label: article.title },
        ]}
      />

      {/* Top Landscape Advert Banner */}
      <TopLandscapeAd />

      {/* Article Container */}
      <article className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-xs">
        {/* Category Badge & Metadata */}
        <div className="flex items-center gap-2 mb-3">
          <Badge
            label={article.category}
            href={`/${article.categorySlug}`}
            variant="primary"
            size="md"
          />
        </div>

        {/* Article Title */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 leading-tight mb-4 tracking-tight">
          {article.title}
        </h1>

        {/* Excerpt Lead */}
        {article.excerpt && !article.excerpt.includes("Enter the first paragraph") && (
          <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed mb-6 border-l-4 border-blue-600 pl-4 py-1 bg-slate-50 rounded-r">
            {article.excerpt}
          </p>
        )}

        {/* Author info & Timestamps */}
        <div className="flex flex-wrap items-center justify-between gap-4 py-3.5 border-y border-slate-100 text-xs text-slate-500 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden relative bg-slate-100 border border-slate-200">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={article.author?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"}
                alt={article.author?.name || "Author"}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="font-bold text-slate-900">{article.author?.name || "Editorial Desk"}</p>
              <p className="text-[11px] text-slate-400">{article.author?.role || "Contributing Editor"}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-slate-500">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              {article.publishedAt || "Recent"}
            </span>
          </div>
        </div>

        {/* Formatted Content, Feature Media & Dedicated Players */}
        {(() => {
          const isMusicVideo =
            article.categorySlug === 'music-videos' ||
            article.categorySlug === 'comedy' ||
            (article.category && (
              article.category.toLowerCase().includes('video') ||
              article.category.toLowerCase().includes('comedy')
            ));

          const isAudioCategory =
            !isMusicVideo && (
              article.categorySlug === 'mixtapes' ||
              article.categorySlug === 'music' ||
              (article.category && (
                article.category.toLowerCase().includes('mixtape') ||
                article.category.toLowerCase().includes('music')
              ))
            );

          // Resolve Audio, Stream, and Video URLs
          let audioMp3Url: string | null = article.audioUrl || null;
          let audioStreamUrl: string | null = article.streamUrl || null;
          let videoEmbedUrl: string | null = article.videoUrl || null;

          if (!audioMp3Url) {
            (article.tags || []).forEach((t) => {
              if (t.startsWith('MEDIA:') && t.toLowerCase().includes('.mp3')) {
                audioMp3Url = t.replace('MEDIA:', '').trim();
              }
            });
          }
          if (!audioStreamUrl) {
            (article.tags || []).forEach((t) => {
              if (t.startsWith('STREAM:')) {
                audioStreamUrl = t.replace('STREAM:', '').trim();
              }
            });
          }
          if (!videoEmbedUrl) {
            (article.tags || []).forEach((t) => {
              if (t.startsWith('MEDIA:') && (t.includes('youtube.com') || t.includes('youtu.be') || t.match(/\.(mp4|webm|mov|mkv)/i))) {
                videoEmbedUrl = t.replace('MEDIA:', '').trim();
              }
            });
          }

          // Check content for MP3, Stream, or YouTube URLs
          (article.content || []).forEach((p) => {
            if (!audioMp3Url) {
              const m = p.match(/https?:\/\/[^\s"'<>]+\.mp3(?:\?[^\s"'<>]*)?/i);
              if (m) audioMp3Url = m[0];
            }
            if (!audioStreamUrl) {
              const s = p.match(/https?:\/\/(?:www\.)?audiomack\.com\/[^\s"'<>]+/i);
              if (s) audioStreamUrl = s[0];
            }
            if (!videoEmbedUrl) {
              const y = p.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/i);
              if (y) videoEmbedUrl = `https://www.youtube.com/watch?v=${y[1]}`;
              const v = p.match(/https?:\/\/[^\s"'<>]+\.(mp4|webm|mov|mkv)(?:\?[^\s"'<>]*)?/i);
              if (v) videoEmbedUrl = v[0];
            }
          });

          // YouTube or MP4 Video Extraction (Active for any post with video, especially Music Videos)
          const ytVideoId = videoEmbedUrl
            ? (videoEmbedUrl.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/i)?.[1] || null)
            : null;
          const directVideoUrl = videoEmbedUrl && !ytVideoId
            ? (videoEmbedUrl.match(/https?:\/\/[^\s"'<>]+\.(mp4|webm|mov|mkv)(?:\?[^\s"'<>]*)?/i)?.[0] || null)
            : null;
          const hasVideoEmbed = Boolean(ytVideoId || directVideoUrl);

          // Track Title & Artist breakdown
          const rawTitle = article.title || '';
          let trackTitle = rawTitle
            .replace(/^\[?(?:Gospel\s+)?Mixtape\]?\s*(?:Mp3:?-?)?\s*/i, '')
            .replace(/^Download\s+(?:Mixtape\s+)?(?:Mp3:?-?)?\s*/i, '')
            .trim();
          let artistName = "FunAllTheWay Exclusives";
          if (trackTitle.includes(" - ")) {
            const parts = trackTitle.split(" - ");
            artistName = `By ${parts[0].trim()}`;
            trackTitle = parts.slice(1).join(" - ").trim();
          } else if (trackTitle.includes(" by ")) {
            const parts = trackTitle.split(/ by /i);
            trackTitle = parts[0].trim();
            artistName = `By ${parts[1].trim()}`;
          }

          // Filter paragraphs
          const validParagraphs = (article.content || [])
            .map((p) => {
              // Strip any raw HTML tags (e.g. <div class="..."> or <iframe...>)
              return p.replace(/<[^>]+>/g, '').trim();
            })
            .filter((p) => {
              if (!p || p.length < 5 || p.includes("Enter the first paragraph")) return false;
              // If paragraph is just an iframe or video URL line, discard it since dedicated video player will render it
              if (p.includes("youtube.com") || p.includes("youtu.be") || p.match(/^https?:\/\/[^\s]+\.(mp4|webm|mov|mkv)$/i)) {
                return false;
              }
              // If audio category, discard advertiser YouTube video links and raw MP3/Stream lines
              if (isAudioCategory) {
                if (p.includes("Watch Official Video on YouTube") || p.includes("youtube.com/") || p.includes("youtu.be/")) return false;
                if (p.includes("MP3 Download:") || p.includes("Download & Stream MP3 Audio:") || p.includes("Stream: https://") || p.includes("Download Here:") || p.includes("Stream Here:")) return false;
              }
              return true;
            });

          // Branded native download URL on FunAllTheWay (prevents cross-origin blocking & hides external URLs)
          const brandedDownloadUrl = audioMp3Url
            ? `/api/download?url=${encodeURIComponent(audioMp3Url)}&title=${encodeURIComponent(trackTitle || article.title)}`
            : null;
          const downloadFilename = `${(trackTitle || article.title).replace(/[^a-zA-Z0-9_-]/g, "-")}-FunAllTheWay.mp3`;

          const hasAudioPlayer = Boolean(audioMp3Url) || Boolean(audioStreamUrl);

          return (
            <>
              {/* Feature Media: Embedded 16:9 HD Video Player or Full Image */}
              <div className="mb-6 flex items-center justify-center">
                <div className="w-full max-w-3xl rounded-2xl overflow-hidden border border-slate-200 bg-slate-950 flex items-center justify-center shadow-lg">
                  {ytVideoId ? (
                    <div className="w-full aspect-video">
                      <iframe
                        src={`https://www.youtube-nocookie.com/embed/${ytVideoId}?autoplay=0&rel=0`}
                        title={`${article.title} - Video Player`}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      />
                    </div>
                  ) : directVideoUrl || article.image?.match(/\.(mp4|webm|mov|mkv|avi|3gp)$/i) || article.image?.includes("/videos/") ? (
                    <video
                      src={directVideoUrl || article.image}
                      controls
                      playsInline
                      className="w-full max-h-[480px] object-contain rounded-2xl"
                    />
                  ) : (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full max-h-[480px] sm:max-h-[520px] object-contain rounded-2xl block mx-auto"
                    />
                  )}
                </div>
              </div>

              {/* Top In-Article Ad */}
              <InArticleAd />

              <div className="space-y-6">
                {/* Quick Video Streaming Status Banner */}
                {hasVideoEmbed && (
                  <div className="flex items-center justify-between p-3.5 bg-slate-900 text-white rounded-xl mb-4 shadow-sm border border-slate-800">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <Film className="w-4 h-4 text-red-500 flex-shrink-0 animate-pulse" />
                      <span className="text-xs font-bold truncate">
                        Official Video Stream • HD Player Ready
                      </span>
                    </div>
                    <span className="inline-flex items-center gap-1 text-[11px] font-black uppercase tracking-wider bg-red-600 text-white px-3 py-1.5 rounded flex-shrink-0">
                      <Play className="w-3 h-3 fill-current" />
                      <span>Stream in HD</span>
                    </span>
                  </div>
                )}

                {/* Quick Jump Bar for Audio Posts */}
                {hasAudioPlayer && (
                  <div className="flex items-center justify-between p-3.5 bg-slate-900 text-white rounded-xl mb-4 shadow-sm border border-slate-800">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <Headphones className="w-4 h-4 text-emerald-400 flex-shrink-0 animate-pulse" />
                      <span className="text-xs font-bold truncate">
                        {audioMp3Url ? 'Official MP3 Audio Track Ready' : 'Audio Track Available'}
                      </span>
                    </div>
                    <a
                      href="#audio-player-card"
                      className="inline-flex items-center gap-1 text-[11px] font-black uppercase tracking-wider bg-[#48bb78] hover:bg-[#3ba565] text-white px-3 py-1.5 rounded transition-all active:scale-95 flex-shrink-0"
                    >
                      <span>Download MP3</span>
                      <ChevronDown className="w-3.5 h-3.5" />
                    </a>
                  </div>
                )}

                {/* Text Paragraphs & Embedded Video Content */}
                <div className="prose prose-slate max-w-none text-slate-800 text-base leading-relaxed space-y-5">
                {validParagraphs.map((para, idx) => {
                  const ytMatch = !isAudioCategory && para.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/i);
                  const isDirectVideo = !isAudioCategory && para.match(/https?:\/\/[^\s]+\.(mp4|webm|mov|mkv)/i);

                  return (
                    <React.Fragment key={idx}>
                      {ytMatch ? (
                        <div className="my-6">
                          <div className="w-full aspect-video rounded-2xl overflow-hidden shadow-xl border border-slate-200 bg-slate-950">
                            <iframe
                              src={`https://www.youtube-nocookie.com/embed/${ytMatch[1]}?autoplay=0&rel=0`}
                              title={`${article.title} - Video Player`}
                              className="w-full h-full"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                              allowFullScreen
                            />
                          </div>
                        </div>
                      ) : isDirectVideo ? (
                        <div className="my-6 rounded-2xl overflow-hidden shadow-xl border border-slate-200 bg-slate-950">
                          <video
                            src={isDirectVideo[0]}
                            controls
                            playsInline
                            className="w-full max-h-[460px] object-contain rounded-2xl"
                          />
                        </div>
                      ) : (
                        <p>{para}</p>
                      )}
                      {/* Insert Ad after 2nd paragraph */}
                      {idx === 1 && <InArticleAd />}
                    </React.Fragment>
                  );
                })}
              </div>

              {/* Dedicated Sleek Dark Audio Player Card (Matching User Reference Image Exactly) */}
              {hasAudioPlayer && (
                <div
                  id="audio-player-card"
                  className="my-8 rounded-xl bg-black border border-neutral-800 p-5 sm:p-7 text-white shadow-2xl relative overflow-hidden"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4 min-w-0">
                      {/* Album Art Thumbnail */}
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden bg-neutral-900 border border-neutral-700 flex-shrink-0 shadow-md">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={article.image}
                          alt={trackTitle}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {/* Track Details */}
                      <div className="min-w-0">
                        <h3 className="text-base sm:text-xl font-bold text-white truncate tracking-tight">
                          {trackTitle || article.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-neutral-400 font-medium mt-1 truncate">
                          {artistName}
                        </p>
                      </div>
                    </div>
                    {/* Brand / Logo */}
                    <div className="text-right flex-shrink-0">
                      <span className="text-xs sm:text-sm font-black tracking-widest text-white/90 uppercase font-mono">
                        FUNALLTHEWAY
                      </span>
                    </div>
                  </div>

                  {/* Audio Player Bar */}
                  {audioMp3Url ? (
                    <div className="mt-5">
                      <audio
                        id="article-audio-element"
                        src={audioMp3Url}
                        controls
                        preload="metadata"
                        className="w-full rounded bg-neutral-900 accent-[#48bb78]"
                      />
                    </div>
                  ) : audioStreamUrl ? (
                    <div className="mt-4 p-3 bg-neutral-900 rounded-xl border border-neutral-800 flex items-center justify-between">
                      <span className="text-xs text-neutral-400">Streaming player available via Audiomack</span>
                      <a
                        href={audioStreamUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-bold text-emerald-400 hover:underline"
                      >
                        Open Stream →
                      </a>
                    </div>
                  ) : (
                    <div className="mt-4 p-3 bg-neutral-900 rounded-xl border border-neutral-800 text-center text-xs text-neutral-400">
                      Audio track is currently being prepared for streaming & download
                    </div>
                  )}

                  {/* Vertically Stacked Green Download & Stream Buttons (Matching Reference Image) */}
                  <div className="flex flex-col items-center justify-center gap-2.5 mt-5 pt-4 border-t border-neutral-900">
                    {brandedDownloadUrl ? (
                      <a
                        href={brandedDownloadUrl}
                        download={downloadFilename}
                        className="inline-flex items-center justify-center gap-2 px-8 py-2.5 rounded bg-[#48bb78] hover:bg-[#3ba565] text-white font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer min-w-[220px]"
                        title="Download MP3 directly to your device"
                      >
                        <span>DOWNLOAD HERE</span>
                        <ChevronDown className="w-4 h-4 stroke-[3]" />
                      </a>
                    ) : (
                      <button
                        type="button"
                        disabled
                        className="inline-flex items-center justify-center gap-2 px-8 py-2.5 rounded bg-neutral-800 text-neutral-400 font-bold text-xs uppercase tracking-wider min-w-[220px] cursor-not-allowed"
                      >
                        <span>DOWNLOAD COMING SOON</span>
                      </button>
                    )}

                    {audioMp3Url ? (
                      <button
                        type="button"
                        onClick={() => {
                          const audio = document.getElementById('article-audio-element') as HTMLAudioElement;
                          if (audio) {
                            if (audio.paused) {
                              audio.play();
                            } else {
                              audio.pause();
                            }
                          }
                        }}
                        className="inline-flex items-center justify-center gap-2 px-8 py-2.5 rounded bg-[#48bb78] hover:bg-[#3ba565] text-white font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer min-w-[220px]"
                        title="Stream & Listen Online"
                      >
                        <span>STREAM HERE</span>
                        <ChevronDown className="w-4 h-4 stroke-[3]" />
                      </button>
                    ) : audioStreamUrl ? (
                      <a
                        href={audioStreamUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-8 py-2.5 rounded bg-[#48bb78] hover:bg-[#3ba565] text-white font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer min-w-[220px]"
                        title="Stream Online"
                      >
                        <span>STREAM HERE</span>
                        <ChevronDown className="w-4 h-4 stroke-[3]" />
                      </a>
                    ) : null}
                  </div>
                </div>
              )}
            </div>
            </>
          );
        })()}

        {/* Additional Attached Media Gallery (Photos / Videos if multiple uploaded) */}
        {(() => {
          const additionalMedia = (article.mediaList || []).filter(
            (m) => m.url !== article.image
          );
          if (additionalMedia.length === 0) return null;

          return (
            <div className="space-y-4 my-8 p-4 sm:p-6 bg-slate-50 rounded-2xl border border-slate-200">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
                <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                  <Images className="w-4 h-4 text-blue-600" />
                  Attached Media & Gallery ({additionalMedia.length})
                </h3>
                <span className="text-[10px] text-slate-400 font-bold uppercase">Tap to view</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {additionalMedia.map((media, idx) => {
                  const isMediaVid =
                    media.type === "video" ||
                    media.url.match(/\.(mp4|webm|mov|mkv|avi|3gp)$/i) ||
                    media.url.includes("/videos/");

                  return (
                    <div
                      key={idx}
                      className="rounded-xl overflow-hidden border border-slate-200 bg-slate-950 flex flex-col items-center justify-center shadow-xs"
                    >
                      {isMediaVid ? (
                        <video
                          src={media.url}
                          controls
                          playsInline
                          className="w-full max-h-[340px] object-contain"
                        />
                      ) : (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img
                          src={media.url}
                          alt={`${article.title} - Media ${idx + 1}`}
                          className="w-full max-h-[380px] object-contain"
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })()}

        {/* Article Tags */}
        {(() => {
          const displayTags = (article.tags || []).filter(
            (t) =>
              t &&
              !t.startsWith("MEDIA:") &&
              !t.startsWith("STREAM:") &&
              !t.startsWith("SRC:") &&
              !t.includes("http://") &&
              !t.includes("https://")
          );
          if (displayTags.length === 0) return null;
          return (
            <div className="flex items-center flex-wrap gap-2 mt-8 pt-4 border-t border-slate-100">
              <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
                <Tag className="w-3.5 h-3.5" /> TAGS:
              </span>
              {displayTags.map((tag) => (
                <Link
                  key={tag}
                  href={`/search?q=${encodeURIComponent(tag)}`}
                  className="text-xs bg-slate-100 hover:bg-blue-50 hover:text-blue-600 px-2.5 py-1 rounded text-slate-700 font-medium transition-colors"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          );
        })()}

        {/* Social Sharing */}
        <SocialShare title={article.title} />

        {/* Middle Promotional Showcase Banners */}
        <DualPromoBanners placementTitle="FUN ALL THE WAY LIMITED SERVICES & PACKAGES" />

        {/* Previous / Next Article Navigation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-slate-200">
          {prevArticle ? (
            <Link
              href={`/article/${prevArticle.slug}`}
              className="p-4 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 transition-all group"
            >
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1 group-hover:text-blue-600">
                <ArrowLeft className="w-3.5 h-3.5" /> PREVIOUS STORY
              </span>
              <p className="text-xs font-bold text-slate-800 line-clamp-2 mt-1 group-hover:text-blue-600">
                {prevArticle.title}
              </p>
            </Link>
          ) : <div />}

          {nextArticle ? (
            <Link
              href={`/article/${nextArticle.slug}`}
              className="p-4 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 transition-all text-right group"
            >
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-end gap-1 group-hover:text-blue-600">
                NEXT STORY <ArrowRight className="w-3.5 h-3.5" />
              </span>
              <p className="text-xs font-bold text-slate-800 line-clamp-2 mt-1 group-hover:text-blue-600">
                {nextArticle.title}
              </p>
            </Link>
          ) : <div />}
        </div>

        {/* Related Stories Grid */}
        <RelatedPosts articles={articles} currentArticleId={article.id} />
      </article>

      {/* Bottom Dual Promotional Banners */}
      <DualPromoBanners placementTitle="SPECIAL ADVERT & PROMOTION PACKAGES" />

      {/* Bottom Horizontal Ad */}
      <HorizontalAd />
    </div>
  );
}
