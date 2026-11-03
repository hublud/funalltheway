import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/**
 * FunAllTheWay Native Media Download Streamer
 * 
 * 1. Overcomes cross-origin browser security policy:
 *    Modern browsers ignore HTML5 `download` attribute on third-party URLs.
 *    By serving from same-origin with `Content-Disposition: attachment`, 
 *    every mobile device and PC downloads the file directly.
 * 2. Whitelabel branding:
 *    Users never see external URLs like 9jaflaver.com in their browser or downloads folder.
 *    The downloaded file is neatly named e.g. "Clock-It-Mix-DJ-SweetRecord-FunAllTheWay.mp3".
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const targetUrl = searchParams.get("url");
  const rawTitle = searchParams.get("title") || "Audio-Track";

  if (!targetUrl) {
    return new NextResponse("Missing url parameter", { status: 400 });
  }

  // Validate URL protocol
  try {
    const parsed = new URL(targetUrl);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      return new NextResponse("Invalid protocol", { status: 400 });
    }
  } catch {
    return new NextResponse("Invalid URL", { status: 400 });
  }

  // Build clean, branded attachment filename
  let cleanTitle = rawTitle
    .replace(/^\[?(?:Gospel\s+)?Mixtape\]?\s*(?:Mp3:?-?)?\s*/i, "")
    .replace(/^Download\s+(?:Mixtape\s+)?(?:Mp3:?-?)?\s*/i, "")
    .replace(/[^a-zA-Z0-9\s-_]/g, "")
    .replace(/\s+/g, "-")
    .trim();

  if (!cleanTitle) cleanTitle = "FunAllTheWay-Audio";
  const filename = `${cleanTitle}-FunAllTheWay.mp3`;

  try {
    const upstreamRes = await fetch(targetUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
        "Referer": new URL(targetUrl).origin,
        "Accept": "*/*"
      }
    });

    if (!upstreamRes.ok || !upstreamRes.body) {
      // Fallback redirect if upstream refuses server fetch
      return NextResponse.redirect(targetUrl, 302);
    }

    const headers = new Headers();
    headers.set("Content-Type", upstreamRes.headers.get("content-type") || "audio/mpeg");
    headers.set("Content-Disposition", `attachment; filename="${filename}"`);
    
    const contentLength = upstreamRes.headers.get("content-length");
    if (contentLength) {
      headers.set("Content-Length", contentLength);
    }
    
    headers.set("Cache-Control", "public, max-age=86400, s-maxage=86400");
    headers.set("Accept-Ranges", "bytes");

    return new NextResponse(upstreamRes.body as any, {
      status: 200,
      headers
    });
  } catch (err: any) {
    console.error("[Download Proxy] Error streaming audio:", err.message);
    // Fallback redirect
    return NextResponse.redirect(targetUrl, 302);
  }
}

