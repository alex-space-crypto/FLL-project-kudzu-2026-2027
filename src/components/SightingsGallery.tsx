import type { KudzuReport } from '../lib/kudzuReports'
import { formatCoordinates, formatDate } from '../lib/format'

type Props = {
  reports: KudzuReport[]
  onSelect: (report: KudzuReport) => void
}

export function SightingsGallery({ reports, onSelect }: Props) {
  if (reports.length === 0) {
    return (
      <div className="empty-state">
        <h3>No sightings yet</h3>
        <p>Be the first to report kudzu in your area.</p>
      </div>
    )
  }

  return (
    <ul className="sightings-grid">
      {reports.map((report) => (
        <li key={report.id}>
          <button type="button" className="sighting-card" onClick={() => onSelect(report)}>
            <div className="sighting-photo">
              {report.photo_url ? (
                <img src={report.photo_url} alt={report.location_name ?? 'Kudzu sighting'} loading="lazy" />
              ) : (
                <span className="no-photo">No photo</span>
              )}
            </div>
            <div className="sighting-body">
              <h3>{report.location_name ?? formatCoordinates(report.latitude, report.longitude)}</h3>
              {report.description && <p>{report.description}</p>}
              <time dateTime={report.created_at}>{formatDate(report.created_at)}</time>
            </div>
          </button>
        </li>
      ))}
    </ul>
  )
}
