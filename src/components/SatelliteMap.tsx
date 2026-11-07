import { useEffect, useRef, useState } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import type { KudzuReport } from '../lib/kudzuReports'
import { NC_BOUNDS } from '../lib/northCarolina'
import { createNaipLayer } from '../lib/naipLayer'
import { AddressSearch } from './AddressSearch'

const SINGLE_REPORT_ZOOM = 16
const MIN_SELECTION_ZOOM = 15
const ADDRESS_ZOOM = 17
const HALO_STYLE: L.CircleMarkerOptions = {
  radius: 22,
  color: '#facc15',
  weight: 3,
  fill: false,
  className: 'kudzu-halo',
  interactive: false,
}
const MARKER_STYLE: L.CircleMarkerOptions = {
  radius: 9,
  color: '#ffffff',
  weight: 2,
  fillColor: '#facc15',
  fillOpacity: 0.95,
}
const AREA_STYLE: L.PathOptions = {
  color: '#facc15',
  weight: 2,
  fillColor: '#facc15',
  fillOpacity: 0.12,
  dashArray: '6 4',
  interactive: false,
}

type Props = {
  reports: KudzuReport[]
  onSelect?: (report: KudzuReport) => void
  onReportArea?: (center: { lat: number; lng: number }) => void
}

export function SatelliteMap({ reports, onSelect, onReportArea }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<L.Map | null>(null)
  const areaRectRef = useRef<L.Rectangle | null>(null)
  const dragStartRef = useRef<L.LatLng | null>(null)
  const [zoom, setZoom] = useState(6)
  const [selectMode, setSelectMode] = useState(false)
  const [selection, setSelection] = useState<L.LatLngBounds | null>(null)

  const canSelect = zoom >= MIN_SELECTION_ZOOM
  const selectedReports = selection
    ? reports.filter((report) => selection.contains([report.latitude, report.longitude]))
    : []

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const map = L.map(container, {
      minZoom: 6,
      maxBounds: L.latLngBounds(NC_BOUNDS).pad(0.2),
      maxBoundsViscosity: 1,
    })
    createNaipLayer().addTo(map)
    map.on('zoomend', () => {
      const currentZoom = map.getZoom()
      setZoom(currentZoom)
      if (currentZoom < MIN_SELECTION_ZOOM) setSelectMode(false)
    })
    mapRef.current = map

    return () => {
      map.remove()
      mapRef.current = null
    }
  }, [])

  useEffect(() => {
    const map = mapRef.current
    if (!map || !selectMode) return

    map.dragging.disable()
    map.getContainer().style.cursor = 'crosshair'

    const handleMouseDown = (event: L.LeafletMouseEvent) => {
      dragStartRef.current = event.latlng
      areaRectRef.current?.remove()
      areaRectRef.current = L.rectangle(L.latLngBounds(event.latlng, event.latlng), AREA_STYLE).addTo(map)
    }

    const handleMouseMove = (event: L.LeafletMouseEvent) => {
      const start = dragStartRef.current
      if (!start) return
      areaRectRef.current?.setBounds(L.latLngBounds(start, event.latlng))
    }

    const handleMouseUp = (event: L.LeafletMouseEvent) => {
      const start = dragStartRef.current
      dragStartRef.current = null
      if (!start) return
      setSelection(L.latLngBounds(start, event.latlng))
      setSelectMode(false)
    }

    map.on('mousedown', handleMouseDown)
    map.on('mousemove', handleMouseMove)
    map.on('mouseup', handleMouseUp)

    return () => {
      map.off('mousedown', handleMouseDown)
      map.off('mousemove', handleMouseMove)
      map.off('mouseup', handleMouseUp)
      map.dragging.enable()
      map.getContainer().style.cursor = ''
      dragStartRef.current = null
    }
  }, [selectMode])

  useEffect(() => {
    const map = mapRef.current
    if (!map) return

    const layer = L.layerGroup().addTo(map)
    const points: L.LatLngTuple[] = []

    for (const report of reports) {
      const latlng: L.LatLngTuple = [report.latitude, report.longitude]
      points.push(latlng)
      L.circleMarker(latlng, HALO_STYLE).addTo(layer)
      const marker = L.circleMarker(latlng, MARKER_STYLE).addTo(layer)
      marker.bindTooltip(report.location_name ?? 'Kudzu sighting')
      if (onSelect) marker.on('click', () => onSelect(report))
    }

    if (points.length === 1) {
      map.setView(points[0], SINGLE_REPORT_ZOOM)
    } else if (points.length > 1) {
      map.fitBounds(L.latLngBounds(points), { padding: [32, 32], maxZoom: SINGLE_REPORT_ZOOM })
    } else {
      map.fitBounds(NC_BOUNDS)
    }

    return () => {
      layer.remove()
    }
  }, [reports, onSelect])

  function locateAddress(latitude: number, longitude: number) {
    mapRef.current?.flyTo([latitude, longitude], ADDRESS_ZOOM, { duration: 1.2 })
  }

  function clearSelection() {
    areaRectRef.current?.remove()
    areaRectRef.current = null
    setSelection(null)
  }

  function renderHint() {
    if (selectMode) return 'Click and drag over the area you want to check.'
    if (!canSelect) return `Zoom in to level ${MIN_SELECTION_ZOOM} or closer to select an area.`
    if (!selection) return 'Select an area to see the sightings inside it.'
    const count = selectedReports.length
    return count === 1 ? '1 sighting inside the selected area.' : `${count} sightings inside the selected area.`
  }

  return (
    <>
      {onReportArea && (
        <div className="map-toolbar">
          <AddressSearch onFound={locateAddress} />
          <div className="map-toolbar-actions">
            <button
              type="button"
              className={selectMode ? 'primary-button' : 'secondary-button'}
              disabled={!canSelect}
              onClick={() => setSelectMode((active) => !active)}
            >
              {selectMode ? 'Cancel selection' : 'Select area'}
            </button>
            {selection && !selectMode && (
              <>
                <button type="button" className="primary-button" onClick={() => onReportArea(selection.getCenter())}>
                  Report kudzu in this area
                </button>
                <button type="button" className="secondary-button" onClick={clearSelection}>
                  Clear
                </button>
              </>
            )}
          </div>
          <p className="map-hint" role="status">
            {renderHint()}
          </p>
        </div>
      )}
      <div ref={containerRef} className="satellite-map" />
    </>
  )
}
