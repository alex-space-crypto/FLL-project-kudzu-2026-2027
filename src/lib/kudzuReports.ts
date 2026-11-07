import { supabase } from './supabase'
import { isInNorthCarolina } from './northCarolina'

export type KudzuReport = {
  id: string
  latitude: number
  longitude: number
  location_name: string | null
  description: string | null
  photo_url: string | null
  created_at: string
}

export type NewKudzuReport = Omit<KudzuReport, 'id' | 'created_at'>

const PHOTO_BUCKET = 'kudzu-photos'
const MAX_PHOTO_BYTES = 5 * 1024 * 1024
const ALLOWED_PHOTO_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']

export async function fetchReports(): Promise<KudzuReport[]> {
  const { data, error } = await supabase
    .from('kudzu_reports')
    .select('id, latitude, longitude, location_name, description, photo_url, created_at')
    .order('created_at', { ascending: false })

  if (error) throw new Error(error.message)
  return (data ?? []).filter((report) => isInNorthCarolina(report.latitude, report.longitude))
}

export async function createReport(report: NewKudzuReport): Promise<void> {
  const { error } = await supabase.from('kudzu_reports').insert(report)
  if (error) throw new Error(error.message)
}

export async function uploadPhoto(file: File): Promise<string> {
  if (!ALLOWED_PHOTO_TYPES.includes(file.type)) {
    throw new Error('Photo must be a JPG, PNG, WebP, or GIF image.')
  }
  if (file.size > MAX_PHOTO_BYTES) {
    throw new Error('Photo must be 5 MB or smaller.')
  }

  const extension = file.name.split('.').pop()?.toLowerCase() ?? 'jpg'
  const path = `${crypto.randomUUID()}.${extension}`

  const { error } = await supabase.storage
    .from(PHOTO_BUCKET)
    .upload(path, file, { contentType: file.type, cacheControl: '3600' })
  if (error) throw new Error(error.message)

  const { data } = supabase.storage.from(PHOTO_BUCKET).getPublicUrl(path)
  return data.publicUrl
}
