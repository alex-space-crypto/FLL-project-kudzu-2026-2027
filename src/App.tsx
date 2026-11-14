import { useCallback, useEffect, useState } from 'react'
import { AddressSearch } from './components/AddressSearch'
import { KudzuExamples } from './components/KudzuExamples'
import { Modal } from './components/Modal'
import { IdentifyPhoto } from './components/IdentifyPhoto'
import { ModelAccuracy } from './components/ModelAccuracy'
import { ReportDetail } from './components/ReportDetail'
import { ReportForm } from './components/ReportForm'
import { SatelliteMap } from './components/SatelliteMap'
import { SightingsGallery } from './components/SightingsGallery'
import { fetchReports, type KudzuReport } from './lib/kudzuReports'
import { fetchOccurrences, type KudzuOccurrence } from './lib/occurrences'
import './App.css'

type Dialog = 'report' | 'pictures' | 'identify' | null
type Coords = { latitude: number; longitude: number }

function App() {
  const [dialog, setDialog] = useState<Dialog>(null)
  const [reports, setReports] = useState<KudzuReport[]>([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState('')
  const [selected, setSelected] = useState<KudzuReport | null>(null)
  const [reportCoords, setReportCoords] = useState<Coords | null>(null)
  const [focusPoint, setFocusPoint] = useState<Coords | null>(null)
  const [showUsSightings, setShowUsSightings] = useState(false)
  const [occurrences, setOccurrences] = useState<KudzuOccurrence[]>([])
  const [occurrencesError, setOccurrencesError] = useState('')

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

  useEffect(() => {
    let cancelled = false
    fetchOccurrences()
      .then((rows) => {
        if (cancelled) return
        setOccurrences(rows)
        setOccurrencesError('')
      })
      .catch((err: unknown) => {
        if (cancelled) return
        setOccurrencesError(err instanceof Error ? err.message : 'Could not load US sightings.')
      })
    return () => {
      cancelled = true
    }
  }, [])

  const toggleUsSightings = useCallback(() => setShowUsSightings((active) => !active), [])

  const closeDetail = useCallback(() => setSelected(null), [])
  const closeDialog = useCallback(() => setDialog(null), [])

  const openReportForm = useCallback(() => {
    setReportCoords(null)
    setDialog('report')
  }, [])

  const reportArea = useCallback((center: { lat: number; lng: number }) => {
    setReportCoords({ latitude: center.lat, longitude: center.lng })
    setDialog('report')
  }, [])

  const focusAddress = useCallback((latitude: number, longitude: number) => {
    setFocusPoint({ latitude, longitude })
  }, [])

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="sidebar-brand">
          <div className="brand">Kudzu Tracker</div>
          <p className="tagline">Map where kudzu is growing across North Carolina.</p>
        </div>

        <section className="sidebar-section" aria-labelledby="search-title">
          <div className="section-heading">
            <h2 id="search-title">Find a location</h2>
          </div>
          <AddressSearch onFound={focusAddress} />
        </section>

        {!loading && !loadError && <ModelAccuracy reports={reports} />}

        <section className="sidebar-section" aria-labelledby="sightings-title">
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
      </aside>

      <main className="map-stage">
        <header className="map-topbar">
          <div>
            <h1>Kudzu sightings</h1>
            <p className="tagline">{showUsSightings ? 'United States' : 'North Carolina'}</p>
            <p className="attribution" role="status">
              {occurrencesError
                ? `Could not load past kudzu records: ${occurrencesError}`
                : `${occurrences.length.toLocaleString()} past kudzu records (blue dots) from GBIF. Human observations, not verified kudzu IDs. Some records are CC BY-NC.`}
            </p>
          </div>
          <div className="map-topbar-actions">
            <button
              type="button"
              className="secondary-button"
              aria-pressed={showUsSightings}
              onClick={toggleUsSightings}
            >
              {showUsSightings ? 'Show North Carolina only' : 'Show all US sightings'}
            </button>
            <button type="button" className="tone-button tone-sky" onClick={() => setDialog('identify')}>
              Identify a photo
            </button>
            <button type="button" className="tone-button tone-amber" onClick={() => setDialog('pictures')}>
              Pictures
            </button>
            <button type="button" className="primary-button" onClick={openReportForm}>
              Report sighting
            </button>
          </div>
        </header>

        <SatelliteMap
          reports={reports}
          occurrences={occurrences}
          showUsSightings={showUsSightings}
          focusPoint={focusPoint}
          onSelect={setSelected}
          onReportArea={reportArea}
        />
      </main>

      {dialog === 'report' && (
        <Modal labelledBy="report-title" onClose={closeDialog}>
          <div className="modal-body">
            <ReportForm onCreated={loadReports} initialCoords={reportCoords} />
          </div>
        </Modal>
      )}

      {dialog === 'pictures' && (
        <Modal labelledBy="examples-title" wide onClose={closeDialog}>
          <div className="modal-body">
            <KudzuExamples />
          </div>
        </Modal>
      )}

      {dialog === 'identify' && (
        <Modal labelledBy="identify-title" onClose={closeDialog}>
          <div className="modal-body">
            <IdentifyPhoto />
          </div>
        </Modal>
      )}

      {selected && <ReportDetail report={selected} onClose={closeDetail} />}
    </div>
  )
}

export default App
