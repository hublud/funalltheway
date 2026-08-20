import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "qoi6iykg",
  api_key: process.env.CLOUDINARY_API_KEY || "PtTo5f07H_t8l8btdelcb7UXpXk",
  api_secret: process.env.CLOUDINARY_API_SECRET || "",
  secure: true,
});

export default cloudinary;

/**
 * Format a Cloudinary public ID or raw URL with auto-format and optimization
 */
export function getOptimizedCloudinaryUrl(
  url: string,
  options: { width?: number; height?: number; crop?: string; quality?: string } = {}
) {
  if (!url) return "/images/placeholder.jpg";
  if (!url.includes("cloudinary.com")) return url;

  const { width = 800, height, crop = "fill", quality = "auto" } = options;
  const transformations = [`f_auto`, `q_${quality}`, `w_${width}`];
  if (height) transformations.push(`h_${height}`, `c_${crop}`);

  const transformString = transformations.join(",");
  return url.replace("/upload/", `/upload/${transformString}/`);
}
