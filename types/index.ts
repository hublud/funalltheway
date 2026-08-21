export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content?: string[];
  image: string;
  category: string;
  categorySlug: string;
  location?: string;
  author: {
    name: string;
    avatar: string;
    role?: string;
  };
  publishedAt: string;
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
