import { supabase } from './supabase'

export type KudzuOccurrence = {
  id: number
  latitude: number
  longitude: number
  state: string | null
  observed_year: number | null
  source: string | null
  license: string | null
}

const PAGE_SIZE = 1000

export async function fetchOccurrences(): Promise<KudzuOccurrence[]> {
  const rows: KudzuOccurrence[] = []
  for (let from = 0; ; from += PAGE_SIZE) {
    const { data, error } = await supabase
      .from('kudzu_occurrences')
      .select('id, latitude, longitude, state, observed_year, source, license')
      .order('id', { ascending: true })
      .range(from, from + PAGE_SIZE - 1)

    if (error) throw new Error(error.message)
    if (!data) throw new Error('No occurrence data was returned.')
    rows.push(...data)
    if (data.length < PAGE_SIZE) return rows
  }
}
