import type { KudzuReport } from '../lib/kudzuReports'
import { formatDate } from '../lib/format'

type Props = {
  reports: KudzuReport[]
}

export function ModelAccuracy({ reports }: Props) {
  const withPhotos = reports.filter((report) => report.photo_url).length
  const withPlaceNames = reports.filter((report) => report.location_name).length
  const latest = reports[0]

  const stats = [
    { label: 'Total sightings', value: reports.length },
    { label: 'With photos', value: withPhotos },
    { label: 'With place names', value: withPlaceNames },
  ]

  return (
    <section className="card accuracy-card" aria-labelledby="accuracy-title">
      <div className="card-heading">
        <h2 id="accuracy-title">Model accuracy</h2>
        <p>
          Accuracy scores appear once the AI suggestions are connected and their results are checked
          against confirmed sightings.
        </p>
      </div>

      <dl className="stat-grid">
        {stats.map((stat) => (
          <div key={stat.label} className="stat">
            <dt>{stat.label}</dt>
            <dd>{stat.value}</dd>
          </div>
        ))}
      </dl>

      <p className="status-text">
        {latest ? `Latest sighting: ${formatDate(latest.created_at)}` : 'No sightings yet.'}
      </p>
    </section>
  )
}
