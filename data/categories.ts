export interface NavCategory {
  name: string;
  slug: string;
  icon: string;
  label: string;
}

export const PRIMARY_ICON_CATEGORIES: NavCategory[] = [
  { name: "Home", slug: "/", icon: "Home", label: "Home" },
  { name: "Music", slug: "/music", icon: "Music", label: "Music" },
  { name: "Videos", slug: "/videos", icon: "PlaySquare", label: "Videos" },
  { name: "Entertainment", slug: "/entertainment", icon: "Sparkles", label: "Entertainment" },
  { name: "Sports", slug: "/sports", icon: "Trophy", label: "Sports" },
  { name: "Celebrity", slug: "/celebrity", icon: "Flame", label: "Celebrity" },
  { name: "Lifestyle", slug: "/lifestyle", icon: "Compass", label: "Lifestyle" },
  { name: "Comedy", slug: "/comedy", icon: "Laugh", label: "Comedy" },
];

export const SECONDARY_CATEGORIES = [
  { name: "AI EDITED PICTURES", slug: "/news?filter=ai-pictures" },
  { name: "AI EDITED VIDEOS", slug: "/videos?filter=ai-videos" },
  { name: "BEFORE & AFTER PICTURES", slug: "/entertainment?filter=before-after" },
  { name: "FREEBEATS & INSTRUMENTALS", slug: "/music?filter=freebeats" },
  { name: "NOLLYWOOD EXCLUSIVES", slug: "/celebrity" },
  { name: "VIRAL SKITS", slug: "/comedy" },
  { name: "VACANCIES & JOBS", slug: "/jobs" },
  { name: "SUBMIT MUSIC / VIDEO", slug: "/contact?tab=submit" },
  { name: "ADVERTISE WITH US", slug: "/contact?tab=advertise" },
];

export const ALL_CATEGORIES = [
  {
    name: "News",
    slug: "news",
    title: "Latest Nigerian & World News",
    description: "Breaking news, political updates, trending developments, and real-time happenings across Nigeria and globally.",
  },
  {
    name: "Entertainment",
    slug: "entertainment",
    title: "Entertainment News & Highlights",
    description: "The hottest entertainment scoops, movie reviews, pop culture updates, and viral content making waves.",
  },
  {
    name: "Music",
    slug: "music",
    title: "Nigerian Music, MP3s & Freebeats",
    description: "Fresh Afrobeats bangers, EP drops, official visualizers, instrumentals, and trending chart-toppers.",
  },
  {
    name: "Sports",
    slug: "sports",
    title: "Sports News & Match Previews",
    description: "Super Eagles updates, Premier League coverage, UEFA Champions League analysis, and transfer rumors.",
  },
  {
    name: "Celebrity",
    slug: "celebrity",
    title: "Celebrity Gist & Exclusives",
    description: "Insider scoops, celebrity relationships, red carpet fashion, interviews, and social media buzz.",
  },
  {
    name: "Lifestyle",
    slug: "lifestyle",
    title: "Lifestyle, Relationships & Trends",
    description: "Living well, relationship discussions, career hacks, style inspiration, and tech lifestyle tips.",
  },
  {
    name: "Comedy",
    slug: "comedy",
    title: "Comedy Skits & Jokes",
    description: "Hilarious viral skits, stand-up clips, street interviews, and comedic masterclasses from top creators.",
  },
  {
    name: "Videos",
    slug: "videos",
    title: "Trending Videos & AI Visuals",
    description: "Visual spectacles, AI-edited clips, backstage moments, music video premieres, and viral highlights.",
  },
  {
    name: "Jobs",
    slug: "jobs",
    title: "Job Openings & Career Opportunities",
    description: "Curated job opportunities, creative editing gigs, digital media roles, and tech vacancies across Nigeria.",
  },
];
