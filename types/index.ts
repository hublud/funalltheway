export interface MediaItem {
  id?: string;
  url: string;
  type: "image" | "video";
  name?: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content?: string[];
  image: string; // Primary cover image or video URL
  videoUrl?: string; // Dedicated video URL if attached
  audioUrl?: string; // Direct audio/mp3 download URL
  streamUrl?: string; // Streaming link (e.g. Audiomack)
  mediaList?: MediaItem[]; // Full list of attached media (images and videos)
  category: string;
  categorySlug: string;
  location?: string;
  author: {
    name: string;
    avatar: string;
    role?: string;
  };
  publishedAt: string;
  createdAt?: string;
  readTime: string;
  views?: number;
  featured?: boolean;
  trendingRank?: number;
  tags?: string[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  iconName?: string;
  isPrimaryIcon?: boolean;
  isSecondary?: boolean;
}

export interface Comment {
  id: string;
  author: string;
  avatar: string;
  date: string;
  content: string;
  likes: number;
}
