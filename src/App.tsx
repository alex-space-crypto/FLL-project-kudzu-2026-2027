import { useCallback, useEffect, useState } from 'react'
import { ReportForm } from './components/ReportForm'
import { ReportDetail } from './components/ReportDetail'
import { SatelliteMap } from './components/SatelliteMap'
import { SightingsGallery } from './components/SightingsGallery'
import { fetchReports, type KudzuReport } from './lib/kudzuReports'
import './App.css'

type Tab = 'reports' | 'images'

const TABS: { id: Tab; label: string }[] = [
  { id: 'reports', label: 'Reports' },
  { id: 'images', label: 'Satellite images' },
]

function App() {
  const [tab, setTab] = useState<Tab>('reports')
  const [reports, setReports] = useState<KudzuReport[]>([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState('')
  const [selected, setSelected] = useState<KudzuReport | null>(null)
  const [reportCoords, setReportCoords] = useState<{ latitude: number; longitude: number } | null>(null)

  const loadReports = useCallback(async () => {
    setLoading(true)
    try {
      setReports(await fetchReports())
      setLoadError('')
    } catch (err) {
      setLoadError(err instanceof Error ? err.message : 'Could not load sightings.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void loadReports()
  }, [loadReports])

  const closeDetail = useCallback(() => setSelected(null), [])

  const reportArea = useCallback((center: { lat: number; lng: number }) => {
    setReportCoords({ latitude: center.lat, longitude: center.lng })
    setTab('reports')
  }, [])

  return (
    <div className="app">
      <header className="app-header">
        <div className="brand">Kudzu Tracker</div>
        <p className="tagline">Map where kudzu is growing across North Carolina.</p>
      </header>

      <nav className="tabs" role="tablist" aria-label="Sections">
        {TABS.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            id={`tab-${item.id}`}
            aria-selected={tab === item.id}
            aria-controls={`panel-${item.id}`}
            className="tab"
            onClick={() => setTab(item.id)}
          >
            {item.label}
          </button>
        ))}
      </nav>

      {tab === 'reports' ? (
        <main className="layout" role="tabpanel" id="panel-reports" aria-labelledby="tab-reports">
          <aside className="layout-form">
            <ReportForm onCreated={loadReports} initialCoords={reportCoords} />
          </aside>

          <section className="layout-gallery" aria-labelledby="sightings-title">
            <div className="section-heading">
              <h2 id="sightings-title">Recent sightings</h2>
              <span className="count">{reports.length}</span>
            </div>

            {loading && <p className="status-text">Loading sightings...</p>}
            {!loading && loadError && (
              <div className="error-box" role="alert">
                <p>We couldn't load sightings: {loadError}</p>
                <button type="button" className="secondary-button" onClick={loadReports}>
                  Try again
                </button>
              </div>
            )}
            {!loading && !loadError && <SightingsGallery reports={reports} onSelect={setSelected} />}
          </section>
        </main>
      ) : (
        <section className="map-section" role="tabpanel" id="panel-images" aria-labelledby="tab-images">
          {loadError && (
            <div className="error-box" role="alert">
              <p>We couldn't load sightings: {loadError}</p>
              <button type="button" className="secondary-button" onClick={loadReports}>
                Try again
              </button>
            </div>
          )}
          <SatelliteMap reports={reports} onSelect={setSelected} onReportArea={reportArea} />
        </section>
      )}

      {selected && <ReportDetail report={selected} onClose={closeDetail} />}
    </div>
  )
}

export default App
