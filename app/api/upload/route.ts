import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://gboczafpctiselwkxcvi.supabase.co";
const serviceKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "";

export const maxDuration = 60; // Allow sufficient time for larger video uploads

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const folder = (formData.get("folder") as string) || "posts";

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const isVideo =
      file.type.startsWith("video/") ||
      /\.(mp4|webm|mov|mkv|avi|3gp)$/i.test(file.name);
    const resourceType: "video" | "image" = isVideo ? "video" : "image";

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Sanitize filename and create unique storage path
    const extension =
      file.name.split(".").pop()?.toLowerCase() || (isVideo ? "mp4" : "jpg");
    const cleanName = file.name
      .replace(/\.[^/.]+$/, "")
      .replace(/[^a-zA-Z0-9_-]/g, "_")
      .toLowerCase();
    const fileName = `${Date.now()}_${cleanName.slice(0, 50)}.${extension}`;
    const filePath = `${folder}/${resourceType}s/${fileName}`;

    if (!serviceKey) {
      return NextResponse.json(
        { success: false, error: "Storage service key not configured" },
        { status: 500 }
      );
    }

    const supabaseAdmin = createClient(supabaseUrl, serviceKey);

    // Upload to Supabase Storage 'media' public bucket
    const { error: uploadError } = await supabaseAdmin.storage
      .from("media")
      .upload(filePath, buffer, {
        contentType: file.type || (isVideo ? "video/mp4" : "image/jpeg"),
        upsert: true,
      });

    if (uploadError) {
      console.error("Supabase Storage upload error:", uploadError);
      return NextResponse.json(
        { success: false, error: uploadError.message },
        { status: 500 }
      );
    }

    // Get public URL
    const { data: publicUrlData } = supabaseAdmin.storage
      .from("media")
      .getPublicUrl(filePath);

    return NextResponse.json({
      success: true,
      url: publicUrlData.publicUrl,
      publicId: filePath,
      resourceType,
      fileName: file.name,
      fileSize: file.size,
    });
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to process and upload media file",
      },
      { status: 500 }
    );
  }
}
