-- Create the projects table
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  full_description TEXT,
  image TEXT NOT NULL,
  tech TEXT[] DEFAULT '{}',
  link TEXT NOT NULL,
  category TEXT NOT NULL,
  features TEXT[] DEFAULT '{}',
  gallery TEXT[] DEFAULT '{}',
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Safely add featured column if it doesn't exist
ALTER TABLE projects ADD COLUMN IF NOT EXISTS featured BOOLEAN DEFAULT false;

-- Enable Row Level Security (RLS)
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Allow public read access
DO $$ BEGIN
  CREATE POLICY "Allow public read access to projects" ON projects FOR SELECT USING (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- Allow authenticated users to insert projects
DO $$ BEGIN
  CREATE POLICY "Allow authenticated users to insert projects" ON projects FOR INSERT WITH CHECK (auth.role() = 'authenticated');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "Allow authenticated users to update projects" ON projects FOR UPDATE USING (auth.role() = 'authenticated');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "Allow authenticated users to delete projects" ON projects FOR DELETE USING (auth.role() = 'authenticated');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- Create an Auth hook to handle updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ language 'plpgsql';

DO $$ BEGIN
  CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
EXCEPTION WHEN duplicate_object THEN NULL; END $$;


-- Create the contacts table (messages)
CREATE TABLE IF NOT EXISTS contacts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'unread',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Safely add phone column if it doesn't exist
ALTER TABLE contacts ADD COLUMN IF NOT EXISTS phone TEXT;

-- Enable Row Level Security (RLS)
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Allow public to insert contact messages
DO $$ BEGIN
  CREATE POLICY "Allow public insert to contacts" ON contacts FOR INSERT WITH CHECK (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- Allow authenticated users to read/update/delete contacts
DO $$ BEGIN
  CREATE POLICY "Allow authenticated users to read contacts" ON contacts FOR SELECT USING (auth.role() = 'authenticated');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "Allow authenticated users to update contacts" ON contacts FOR UPDATE USING (auth.role() = 'authenticated');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "Allow authenticated users to delete contacts" ON contacts FOR DELETE USING (auth.role() = 'authenticated');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;


-- Create the settings table
CREATE TABLE IF NOT EXISTS settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  CREATE POLICY "Allow public read to settings" ON settings FOR SELECT USING (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "Allow authenticated users to insert settings" ON settings FOR INSERT WITH CHECK (auth.role() = 'authenticated');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "Allow authenticated users to update settings" ON settings FOR UPDATE USING (auth.role() = 'authenticated');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "Allow authenticated users to delete settings" ON settings FOR DELETE USING (auth.role() = 'authenticated');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;


-- Storage Bucket configuration
INSERT INTO storage.buckets (id, name, public) 
VALUES ('project-images', 'project-images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage Policies
DO $$ BEGIN
  CREATE POLICY "Allow public access to project-images" ON storage.objects FOR SELECT USING (bucket_id = 'project-images');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "Allow authenticated users to upload to project-images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'project-images' AND auth.role() = 'authenticated');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "Allow authenticated users to update project-images" ON storage.objects FOR UPDATE USING (bucket_id = 'project-images' AND auth.role() = 'authenticated');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "Allow authenticated users to delete project-images" ON storage.objects FOR DELETE USING (bucket_id = 'project-images' AND auth.role() = 'authenticated');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;


-- Create the categories table
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  CREATE POLICY "Allow public read to categories" ON categories FOR SELECT USING (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "Allow authenticated users to insert categories" ON categories FOR INSERT WITH CHECK (auth.role() = 'authenticated');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "Allow authenticated users to update categories" ON categories FOR UPDATE USING (auth.role() = 'authenticated');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "Allow authenticated users to delete categories" ON categories FOR DELETE USING (auth.role() = 'authenticated');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;


-- Create the services table
CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  features TEXT[] DEFAULT '{}',
  image_url TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE services ENABLE ROW LEVEL SECURITY;
DO $$ BEGIN CREATE POLICY "Allow public read to services" ON services FOR SELECT USING (true); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE POLICY "Allow authenticated users to insert services" ON services FOR INSERT WITH CHECK (auth.role() = 'authenticated'); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE POLICY "Allow authenticated users to update services" ON services FOR UPDATE USING (auth.role() = 'authenticated'); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE POLICY "Allow authenticated users to delete services" ON services FOR DELETE USING (auth.role() = 'authenticated'); EXCEPTION WHEN duplicate_object THEN NULL; END $$;


-- Create the faqs table
CREATE TABLE IF NOT EXISTS faqs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
DO $$ BEGIN CREATE POLICY "Allow public read to faqs" ON faqs FOR SELECT USING (true); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE POLICY "Allow authenticated users to insert faqs" ON faqs FOR INSERT WITH CHECK (auth.role() = 'authenticated'); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE POLICY "Allow authenticated users to update faqs" ON faqs FOR UPDATE USING (auth.role() = 'authenticated'); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE POLICY "Allow authenticated users to delete faqs" ON faqs FOR DELETE USING (auth.role() = 'authenticated'); EXCEPTION WHEN duplicate_object THEN NULL; END $$;


-- Create the testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  quote TEXT NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  image_url TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
DO $$ BEGIN CREATE POLICY "Allow public read to testimonials" ON testimonials FOR SELECT USING (true); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE POLICY "Allow authenticated users to insert testimonials" ON testimonials FOR INSERT WITH CHECK (auth.role() = 'authenticated'); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE POLICY "Allow authenticated users to update testimonials" ON testimonials FOR UPDATE USING (auth.role() = 'authenticated'); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE POLICY "Allow authenticated users to delete testimonials" ON testimonials FOR DELETE USING (auth.role() = 'authenticated'); EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- Create the about table
CREATE TABLE IF NOT EXISTS about (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  subtitle TEXT DEFAULT '(ABOUT)',
  description_left TEXT NOT NULL,
  description_right TEXT NOT NULL,
  image_url TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE about ENABLE ROW LEVEL SECURITY;
DO $$ BEGIN CREATE POLICY "Allow public read to about" ON about FOR SELECT USING (true); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE POLICY "Allow authenticated users to update about" ON about FOR UPDATE USING (auth.role() = 'authenticated'); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE POLICY "Allow authenticated users to insert about" ON about FOR INSERT WITH CHECK (auth.role() = 'authenticated'); EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- Insert default about content
INSERT INTO about (title, subtitle, description_left, description_right)
VALUES (
  'I craft modern, robust, and high-performing digital solutions that bridge the gap between imagination and reality.',
  '(ABOUT)',
  'I''m Mohammed Jaisil, a detail-oriented Full-Stack Web Developer with over 3 years of experience in creating dynamic, high-performing websites and web applications. My journey started with a passion for architectural precision in code, and has since evolved into a career dedicated to building polished, scalable products that deliver exceptional user experiences.',
  'I specialize in modern technologies like React.js, Next.js, and Node.js, while maintaining deep expertise in resilient systems like PHP (CodeIgniter) and SQL. Based in Dubai, UAE, I work at the intersection of aesthetic design and technical excellence. My goal is always the same: to build digital products that are not only functional but resonate with the people who use them.'
) ON CONFLICT DO NOTHING;

-- Optional Seed Data Scripts
-- Run these one by one if you want to populate initial data

-- INSERT INTO services (title, description, features, image_url, sort_order) VALUES 
-- ('Web Design & Development', 'Custom, responsive websites built for performance and visual appeal...', ARRAY['Responsive Design', 'Interaction Design', 'CMS Integration', 'SEO Optimization'], 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop', 1),
-- ('Frontend Development', 'Interactive, fast-loading user interfaces using modern frameworks...', ARRAY['React.js', 'Tailwind CSS', 'Framer Motion', 'TypeScript'], 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop', 2),
-- ('Backend Development', 'Scalable server-side solutions with secure APIs...', ARRAY['PHP/CodeIgniter', 'REST APIs', 'Database Design', 'Authentication'], 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop', 3),
-- ('E-Commerce Solutions', 'Online stores with product catalogs, secure payments...', ARRAY['Payment Integration', 'Inventory Management', 'Order Tracking', 'Analytics'], 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop', 4);

-- INSERT INTO faqs (question, answer, sort_order) VALUES
-- ('What''s your typical process for a new project?', 'I start with a discovery phase...', 1),
-- ('How long does a project usually take?', 'It depends on the scope...', 2),
-- ('Do you offer packages or custom quotes?', 'Both. I have a few starter packages...', 3),
-- ('What technologies do you work with?', 'I primarily work with React, PHP...', 4),
-- ('Can you work with my existing team?', 'Yes, absolutely. I''m happy to collaborate...', 5);

-- INSERT INTO testimonials (quote, name, role, image_url, sort_order) VALUES
-- ('Our website used to feel outdated. Now, everything is modern...', 'Ahmed Hassan', 'CEO of TechStartup', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face', 1),
-- ('From design to development—everything was cohesive...', 'Sarah Al-Rashid', 'Marketing Lead', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face', 2),
-- ('Working with him felt like having an in-house team that just gets it.', 'Omar Khalid', 'Founder at DigitalHub', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face', 3);
