/*
# Create kudzu reports table and photo storage

1. New Tables
- `kudzu_reports`
  - `id` (uuid, primary key)
  - `latitude` (double precision, required)
  - `longitude` (double precision, required)
  - `location_name` (text, optional place description)
  - `description` (text, optional notes about the kudzu)
  - `photo_url` (text, optional public link to an uploaded photo)
  - `created_at` (timestamptz, defaults to now)

2. Storage
- New public bucket `kudzu-photos` for report photos (images only, 5 MB max).

3. Security
- RLS enabled on `kudzu_reports`.
- The app has no sign-in, so anon and authenticated roles can read and submit reports.
- Reports cannot be edited or deleted from the app.
- Photo bucket: anyone can view; anon and authenticated can upload images only.

4. Important notes
- Coordinates are checked to be valid latitude and longitude ranges.
*/

CREATE TABLE IF NOT EXISTS kudzu_reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  latitude double precision NOT NULL CHECK (latitude BETWEEN -90 AND 90),
  longitude double precision NOT NULL CHECK (longitude BETWEEN -180 AND 180),
  location_name text,
  description text,
  photo_url text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS kudzu_reports_created_at_idx ON kudzu_reports (created_at DESC);

ALTER TABLE kudzu_reports ENABLE ROW LEVEL SECURITY;

GRANT SELECT, INSERT ON kudzu_reports TO anon, authenticated;

DROP POLICY IF EXISTS "anon_select_kudzu_reports" ON kudzu_reports;
CREATE POLICY "anon_select_kudzu_reports" ON kudzu_reports FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_kudzu_reports" ON kudzu_reports;
CREATE POLICY "anon_insert_kudzu_reports" ON kudzu_reports FOR INSERT
  TO anon, authenticated WITH CHECK (true);

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('kudzu-photos', 'kudzu-photos', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif'])
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "public_read_kudzu_photos" ON storage.objects;
CREATE POLICY "public_read_kudzu_photos" ON storage.objects FOR SELECT
  TO anon, authenticated USING (bucket_id = 'kudzu-photos');

DROP POLICY IF EXISTS "anon_upload_kudzu_photos" ON storage.objects;
CREATE POLICY "anon_upload_kudzu_photos" ON storage.objects FOR INSERT
  TO anon, authenticated WITH CHECK (bucket_id = 'kudzu-photos');
