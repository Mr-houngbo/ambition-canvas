-- Create projets table
CREATE TABLE public.projets (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  titre TEXT NOT NULL,
  categorie TEXT,
  description_courte TEXT,
  description_detaillee TEXT,
  statut TEXT DEFAULT 'idee' CHECK (statut IN ('idee', 'en_cours', 'en_pause', 'termine', 'abandonne')),
  horizon_temps TEXT DEFAULT 'moyen_terme' CHECK (horizon_temps IN ('court_terme', 'moyen_terme', 'long_terme')),
  tags TEXT[] DEFAULT '{}',
  motivation TEXT,
  ressources TEXT,
  date_creation TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  est_public BOOLEAN DEFAULT false,
  image_url TEXT
);

-- Enable Row Level Security
ALTER TABLE public.projets ENABLE ROW LEVEL SECURITY;

-- Since there's no authentication, allow all operations (personal tool)
CREATE POLICY "Allow all read operations" ON public.projets FOR SELECT USING (true);
CREATE POLICY "Allow all insert operations" ON public.projets FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow all update operations" ON public.projets FOR UPDATE USING (true);
CREATE POLICY "Allow all delete operations" ON public.projets FOR DELETE USING (true);

-- Create storage bucket for project images
INSERT INTO storage.buckets (id, name, public) VALUES ('images_projets', 'images_projets', true);

-- Storage policies for public access
CREATE POLICY "Public read access for images" ON storage.objects FOR SELECT USING (bucket_id = 'images_projets');
CREATE POLICY "Public insert access for images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'images_projets');
CREATE POLICY "Public update access for images" ON storage.objects FOR UPDATE USING (bucket_id = 'images_projets');
CREATE POLICY "Public delete access for images" ON storage.objects FOR DELETE USING (bucket_id = 'images_projets');