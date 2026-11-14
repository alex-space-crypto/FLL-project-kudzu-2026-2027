/*
# Create kudzu_occurrences table and GBIF import helper

1. New Tables
- `kudzu_occurrences`: public, previously recorded kudzu locations across the United States.
  - `id` (bigint, primary key): the GBIF record number, so re-imports never duplicate a record.
  - `latitude`, `longitude` (double precision): where the record was observed.
  - `state` (text): state or province reported by the source.
  - `observed_year` (integer): year of the observation when known.
  - `source` (text): name of the dataset the record came from (for example iNaturalist).
  - `license` (text): license the source published the record under.
  - `created_at` (timestamptz): when the record was imported.

2. Import helper
- `import_kudzu_occurrences_page(p_offset, p_species)` fetches one page of up to 300 records from the public GBIF occurrence search and stores new ones. Records already stored are skipped.
- It is intended to be run once to load the data and then removed in a later migration.

3. Security
- Row level security is enabled on `kudzu_occurrences`.
- `anon` and `authenticated` may only SELECT. The data is intentionally public, so the read policy is `USING (true)`.
- The import helper is not callable by `PUBLIC`, `anon`, or `authenticated`.

4. Important notes
- The `http` extension is installed in the `extensions` schema to let the database call GBIF.
- Migrations replay on a new database without running the import, because the import is run separately.
*/

CREATE EXTENSION IF NOT EXISTS http WITH SCHEMA extensions;

CREATE TABLE IF NOT EXISTS public.kudzu_occurrences (
  id bigint PRIMARY KEY,
  latitude double precision NOT NULL,
  longitude double precision NOT NULL,
  state text,
  observed_year integer,
  source text,
  license text,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.kudzu_occurrences ENABLE ROW LEVEL SECURITY;

GRANT SELECT ON public.kudzu_occurrences TO anon, authenticated;

DROP POLICY IF EXISTS "anon_select_kudzu_occurrences" ON public.kudzu_occurrences;
CREATE POLICY "anon_select_kudzu_occurrences" ON public.kudzu_occurrences FOR SELECT
TO anon, authenticated USING (true);

CREATE OR REPLACE FUNCTION public.import_kudzu_occurrences_page(p_offset integer, p_species text)
RETURNS integer
LANGUAGE plpgsql
AS $$
DECLARE
  v_url text;
  v_count integer;
BEGIN
  v_url := 'https://api.gbif.org/v1/occurrence/search?scientificName='
    || replace(p_species, ' ', '%20')
    || '&country=US&hasCoordinate=true&limit=300&offset=' || p_offset;

  WITH page AS (
    SELECT (extensions.http_get(v_url)).content::jsonb AS body
  ),
  items AS (
    SELECT item FROM page, jsonb_array_elements(body->'results') AS item
  ),
  inserted AS (
    INSERT INTO public.kudzu_occurrences (id, latitude, longitude, state, observed_year, source, license)
    SELECT
      (item->>'key')::bigint,
      (item->>'decimalLatitude')::double precision,
      (item->>'decimalLongitude')::double precision,
      item->>'stateProvince',
      NULLIF(item->>'year', '')::integer,
      item->>'datasetName',
      item->>'license'
    FROM items
    WHERE item->>'decimalLatitude' IS NOT NULL AND item->>'decimalLongitude' IS NOT NULL
    ON CONFLICT (id) DO NOTHING
    RETURNING 1
  )
  SELECT count(*) INTO v_count FROM inserted;

  RETURN v_count;
END;
$$;

REVOKE EXECUTE ON FUNCTION public.import_kudzu_occurrences_page(integer, text) FROM PUBLIC, anon, authenticated;
