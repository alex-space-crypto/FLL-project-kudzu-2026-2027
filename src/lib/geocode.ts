import { isInNorthCarolina, NC_BOUNDS } from './northCarolina'

export type GeocodeResult = {
  latitude: number
  longitude: number
  label: string
}

const GEOCODE_URL = 'https://nominatim.openstreetmap.org/search'

export async function findNorthCarolinaAddress(query: string): Promise<GeocodeResult | null> {
  const [[south, west], [north, east]] = NC_BOUNDS
  const params = new URLSearchParams({
    q: query,
    format: 'json',
    limit: '5',
    countrycodes: 'us',
    bounded: '1',
    viewbox: `${west},${north},${east},${south}`,
  })

  const response = await fetch(`${GEOCODE_URL}?${params.toString()}`, {
    headers: { Accept: 'application/json' },
  })
  if (!response.ok) throw new Error('Address search is unavailable right now. Please try again.')

  const results: unknown = await response.json()
  if (!Array.isArray(results)) throw new Error('Address search returned an unexpected response.')

  for (const item of results) {
    const latitude = Number(item?.lat)
    const longitude = Number(item?.lon)
    if (Number.isFinite(latitude) && Number.isFinite(longitude) && isInNorthCarolina(latitude, longitude)) {
      return { latitude, longitude, label: String(item.display_name ?? query) }
    }
  }
  return null
}
