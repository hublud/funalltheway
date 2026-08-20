import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const folder = (formData.get("folder") as string) || "funalltheway";

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const isVideo = file.type.startsWith("video/");
    const resourceType = isVideo ? "video" : "image";

    // Upload to Cloudinary using upload_stream
    const uploadResult = await new Promise<{ secure_url: string; public_id: string }>(
      (resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: folder,
            resource_type: resourceType,
          },
          (error, result) => {
            if (error) reject(error);
            else if (result) resolve({ secure_url: result.secure_url, public_id: result.public_id });
            else reject(new Error("Cloudinary upload failed"));
          }
        );
        stream.end(buffer);
      }
    );

    return NextResponse.json({
      success: true,
      url: uploadResult.secure_url,
      publicId: uploadResult.public_id,
      resourceType,
    });
  } catch (error: any) {
    console.error("Upload error:", error);
    // If Cloudinary API credentials reject, provide a graceful mock fallback for local testing
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to upload to Cloudinary",
      },
      { status: 500 }
    );
  }
}
