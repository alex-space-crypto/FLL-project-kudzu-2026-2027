export const NC_BOUNDS: [[number, number], [number, number]] = [
  [33.8, -84.4],
  [36.6, -75.4],
]

export function isInNorthCarolina(latitude: number, longitude: number): boolean {
  const [[south, west], [north, east]] = NC_BOUNDS
  return latitude >= south && latitude <= north && longitude >= west && longitude <= east
}
