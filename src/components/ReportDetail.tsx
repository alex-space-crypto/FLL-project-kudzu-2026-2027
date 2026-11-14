import type { KudzuReport } from '../lib/kudzuReports'
import { formatCoordinates, formatDate } from '../lib/format'
import { Modal } from './Modal'
import { SatelliteMap } from './SatelliteMap'

type Props = {
  report: KudzuReport
  onClose: () => void
}

export function ReportDetail({ report, onClose }: Props) {
  const { latitude, longitude } = report
  const mapLinkUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`
  const earthLinkUrl = `https://earth.google.com/web/@${latitude},${longitude},0a,1500d,35y,0h,0t,0r`

  return (
    <Modal labelledBy="detail-title" onClose={onClose}>
      {report.photo_url && (
        <img className="detail-photo" src={report.photo_url} alt={report.location_name ?? 'Kudzu sighting'} />
      )}

      <div className="detail-body">
        <h2 id="detail-title">{report.location_name ?? 'Kudzu sighting'}</h2>
        <p className="detail-meta">
          {formatCoordinates(latitude, longitude)} &middot; {formatDate(report.created_at)}
        </p>
        {report.description && <p>{report.description}</p>}

        <SatelliteMap reports={[report]} />

        <div className="detail-actions">
          <a className="secondary-button" href={mapLinkUrl} target="_blank" rel="noopener noreferrer">
            Open in Google Maps
          </a>
          <a className="secondary-button" href={earthLinkUrl} target="_blank" rel="noopener noreferrer">
            Open in Google Earth
          </a>
        </div>
      </div>
    </Modal>
  )
}
