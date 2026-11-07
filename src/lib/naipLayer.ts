import L from 'leaflet'

const NAIP_EXPORT_URL =
  'https://apps.geo.fpac.usda.gov/geo-imagery/rest/services/naip/conus_naip/ImageServer/exportImage'
const NAIP_ATTRIBUTION = 'Imagery &copy; USDA Farm Production and Conservation (NAIP)'
const WEB_MERCATOR_HALF_WORLD = 20037508.342789244
const TILE_PIXELS = 256

class NaipLayer extends L.GridLayer {
  createTile(coords: L.Coords, done: L.DoneCallback): HTMLElement {
    const tile = document.createElement('img')
    const span = (WEB_MERCATOR_HALF_WORLD * 2) / 2 ** coords.z
    const minX = -WEB_MERCATOR_HALF_WORLD + coords.x * span
    const maxY = WEB_MERCATOR_HALF_WORLD - coords.y * span
    const params = new URLSearchParams({
      bbox: `${minX},${maxY - span},${minX + span},${maxY}`,
      bboxSR: '3857',
      imageSR: '3857',
      size: `${TILE_PIXELS},${TILE_PIXELS}`,
      format: 'jpg',
      f: 'image',
    })
    tile.alt = ''
    tile.onload = () => done(undefined, tile)
    tile.onerror = () => done(new Error('NAIP tile failed to load'), tile)
    tile.src = `${NAIP_EXPORT_URL}?${params.toString()}`
    return tile
  }
}

export function createNaipLayer(): L.GridLayer {
  return new NaipLayer({ attribution: NAIP_ATTRIBUTION, maxZoom: 19, tileSize: TILE_PIXELS })
}
