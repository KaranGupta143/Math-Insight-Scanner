
-- Create scans table
CREATE TABLE public.scans (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  image_url TEXT NOT NULL,
  result JSONB,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.scans ENABLE ROW LEVEL SECURITY;

-- For prototype, allow all access (no auth required)
CREATE POLICY "Allow all read access on scans" ON public.scans FOR SELECT USING (true);
CREATE POLICY "Allow all insert access on scans" ON public.scans FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow all update access on scans" ON public.scans FOR UPDATE USING (true);
CREATE POLICY "Allow all delete access on scans" ON public.scans FOR DELETE USING (true);

-- Create storage bucket
INSERT INTO storage.buckets (id, name, public) VALUES ('scan-images', 'scan-images', true);

-- Storage policies
CREATE POLICY "Anyone can upload scan images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'scan-images');
CREATE POLICY "Anyone can view scan images" ON storage.objects FOR SELECT USING (bucket_id = 'scan-images');
CREATE POLICY "Anyone can delete scan images" ON storage.objects FOR DELETE USING (bucket_id = 'scan-images');

-- Update timestamp trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_scans_updated_at
  BEFORE UPDATE ON public.scans
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
