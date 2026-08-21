export interface NavCategory {
  name: string;
  slug: string;
  icon: string;
  label: string;
}

export const PRIMARY_ICON_CATEGORIES: NavCategory[] = [
  { name: "Home", slug: "/", icon: "Home", label: "Home" },
  { name: "Edited Pictures", slug: "/edited-pictures", icon: "ImageIcon", label: "Edited Picture" },
  { name: "Edited Videos", slug: "/edited-videos", icon: "Video", label: "Edited Video" },
  { name: "Ai Editing", slug: "/ai-editing", icon: "Bot", label: "Ai Editing" },
  { name: "Before & After Pictures", slug: "/before-after-pictures", icon: "SlidersHorizontal", label: "Before & After" },
  { name: "Picture and Video Photoshoot", slug: "/picture-video-photoshoot", icon: "Camera", label: "Photoshoot" },
  { name: "Graphic Design", slug: "/graphic-design", icon: "Palette", label: "Graphic Design" },
  { name: "Sport News", slug: "/sports", icon: "Trophy", label: "Sport News" },
  { name: "Mixtape", slug: "/mixtapes", icon: "Disc3", label: "Mixtape" },
  { name: "Music", slug: "/music", icon: "Music", label: "Music" },
  { name: "Celebrity", slug: "/celebrity", icon: "Flame", label: "Celebrity" },
  { name: "Comedy", slug: "/comedy", icon: "Laugh", label: "Comedy" },
];

export const SECONDARY_CATEGORIES = [
  { name: "AI EDITING", slug: "/ai-editing" },
  { name: "BEFORE & AFTER PICTURES", slug: "/before-after-pictures" },
  { name: "PICTURE & VIDEO PHOTOSHOOT", slug: "/picture-video-photoshoot" },
  { name: "GRAPHIC DESIGN", slug: "/graphic-design" },
  { name: "SPORT NEWS", slug: "/sports" },
  { name: "MIXTAPES", slug: "/mixtapes" },
  { name: "EDITED PICTURES", slug: "/edited-pictures" },
  { name: "EDITED VIDEOS", slug: "/edited-videos" },
  { name: "FREEBEATS & INSTRUMENTALS", slug: "/music?filter=freebeats" },
  { name: "NOLLYWOOD EXCLUSIVES", slug: "/celebrity" },
  { name: "VIRAL SKITS", slug: "/comedy" },
  { name: "VACANCIES & JOBS", slug: "/jobs" },
  { name: "SUBMIT MUSIC / VIDEO", slug: "/contact?tab=submit" },
  { name: "ADVERTISE WITH US", slug: "/contact?tab=advertise" },
];

export const ALL_CATEGORIES = [
  {
    name: "Ai Editing",
    slug: "ai-editing",
    title: "AI Editing & Generative Visuals",
    description: "Hyper-realistic AI portraits, futuristic visual avatars, generative expansions, AI-assisted video enhancement, and next-gen visual creations.",
  },
  {
    name: "Before and after Pictures",
    slug: "before-after-pictures",
    title: "Before & After Transformation Pictures",
    description: "Witness striking visual transformations, high-end studio skin retouching, background replacements, and before-and-after photo editing showcases.",
  },
  {
    name: "Picture and Video Photoshoot",
    slug: "picture-video-photoshoot",
    title: "Picture & Video Photoshoot Sessions",
    description: "Professional studio and outdoor photoshoot sessions, video shoots, event coverage, model lookbooks, and high-resolution picture transformations.",
  },
  {
    name: "Graphic Design",
    slug: "graphic-design",
    title: "Graphic Design, Cover Art & Branding",
    description: "Stunning flyers, album cover artworks, logos, brand identities, billboards, and digital promotional designs for artists and companies.",
  },
  {
    name: "Sport News",
    slug: "sports",
    title: "Sports News, Football & Match Updates",
    description: "Super Eagles news, Nigerian athletes, Premier League coverage, UEFA Champions League, and breaking transfer updates.",
  },
  {
    name: "Mixtape",
    slug: "mixtapes",
    title: "DJ Mixtapes & Party Mixes",
    description: "Download and stream the hottest Nigerian DJ mixtapes, Afrobeats party sets, Amapiano vibes, and trending street mixes.",
  },
  {
    name: "Edited Pictures",
    slug: "edited-pictures",
    title: "Edited Pictures & Visual Retouching",
    description: "Discover studio photo manipulations, skin retouching, background swaps, celebrity transformations, and high-definition photo editing services.",
  },
  {
    name: "Edited Videos",
    slug: "edited-videos",
    title: "Edited Videos, Shorts & Visuals",
    description: "Explore cinematic video edits, viral comedy clips, sound syncs, music visualizers, transitions, and high-impact digital video productions.",
  },
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
