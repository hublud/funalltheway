-- ==============================================================================
-- FunAllTheWay.com - Supabase Database Schema
-- Run this in your Supabase SQL Editor to set up all tables and security policies.
-- ==============================================================================

-- 1. Enable UUID generation extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Categories Table
CREATE TABLE IF NOT EXISTS public.categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    icon TEXT,
    description TEXT,
    is_primary BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Articles / Posts Table
CREATE TABLE IF NOT EXISTS public.articles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    excerpt TEXT,
    content JSONB DEFAULT '[]'::jsonb, -- Array of paragraphs
    image TEXT NOT NULL, -- Cloudinary URL
    category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    category_name TEXT NOT NULL,
    category_slug TEXT NOT NULL,
    location TEXT DEFAULT 'Lagos',
    author_name TEXT DEFAULT 'FunAllTheWay Editorial',
    author_avatar TEXT DEFAULT 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    author_role TEXT DEFAULT 'Editor',
    read_time TEXT DEFAULT '3 min read',
    views INTEGER DEFAULT 0,
    featured BOOLEAN DEFAULT false,
    trending_rank INTEGER,
    tags TEXT[] DEFAULT '{}',
    published_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Advertisements / Banners Table
CREATE TABLE IF NOT EXISTS public.advertisements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slot_type TEXT NOT NULL, -- 'top_banner', 'horizontal_feed', 'in_article', 'sidebar'
    title TEXT NOT NULL,
    subtitle TEXT,
    image_url TEXT, -- Cloudinary banner image URL
    destination_url TEXT DEFAULT '/contact?tab=advertise',
    button_text TEXT DEFAULT 'GET STARTED',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Create Indexes for High Performance
CREATE INDEX IF NOT EXISTS idx_articles_slug ON public.articles(slug);
CREATE INDEX IF NOT EXISTS idx_articles_category ON public.articles(category_slug);
CREATE INDEX IF NOT EXISTS idx_articles_featured ON public.articles(featured);
CREATE INDEX IF NOT EXISTS idx_articles_created_at ON public.articles(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_advertisements_slot ON public.advertisements(slot_type);

-- 6. Row Level Security (RLS) Policies
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.advertisements ENABLE ROW LEVEL SECURITY;

-- Public can read all published items
CREATE POLICY "Public can view categories" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Public can view articles" ON public.articles FOR SELECT USING (true);
CREATE POLICY "Public can view active advertisements" ON public.advertisements FOR SELECT USING (true);

-- Authenticated users (Admins) can insert/update/delete
CREATE POLICY "Admins can manage categories" ON public.categories FOR ALL USING (true);
CREATE POLICY "Admins can manage articles" ON public.articles FOR ALL USING (true);
CREATE POLICY "Admins can manage advertisements" ON public.advertisements FOR ALL USING (true);
