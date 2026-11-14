import { useState, type FormEvent } from 'react'
import { createReport, uploadPhoto } from '../lib/kudzuReports'
import { isInNorthCarolina } from '../lib/northCarolina'

type Props = {
  onCreated: () => void
  initialCoords?: { latitude: number; longitude: number } | null
}

type Status = 'idle' | 'locating' | 'submitting' | 'success' | 'error'

export function ReportForm({ onCreated, initialCoords }: Props) {
  const [latitude, setLatitude] = useState(initialCoords ? initialCoords.latitude.toFixed(6) : '')
  const [longitude, setLongitude] = useState(initialCoords ? initialCoords.longitude.toFixed(6) : '')
  const [locationName, setLocationName] = useState('')
  const [description, setDescription] = useState('')
  const [photo, setPhoto] = useState<File | null>(null)
  const [status, setStatus] = useState<Status>('idle')
  const [message, setMessage] = useState('')

  const busy = status === 'locating' || status === 'submitting'

  function useCurrentLocation() {
    if (!navigator.geolocation) {
      setStatus('error')
      setMessage('Your browser does not support location. Enter coordinates manually.')
      return
    }
    setStatus('locating')
    setMessage('')
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude.toFixed(6))
        setLongitude(position.coords.longitude.toFixed(6))
        setStatus('idle')
      },
      () => {
        setStatus('error')
        setMessage("We couldn't get your location. Enter it manually or try again.")
      },
      { enableHighAccuracy: true, timeout: 10000 },
    )
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const lat = Number(latitude)
    const lng = Number(longitude)
    const coordinatesValid =
      latitude.trim() !== '' &&
      longitude.trim() !== '' &&
      Number.isFinite(lat) &&
      Number.isFinite(lng) &&
      lat >= -90 &&
      lat <= 90 &&
      lng >= -180 &&
      lng <= 180

    if (!coordinatesValid) {
      setStatus('error')
      setMessage('Enter a valid latitude (-90 to 90) and longitude (-180 to 180).')
      return
    }

    if (!isInNorthCarolina(lat, lng)) {
      setStatus('error')
      setMessage('Kudzu sightings can only be reported inside North Carolina.')
      return
    }

    setStatus('submitting')
    setMessage('')
    try {
      const photoUrl = photo ? await uploadPhoto(photo) : null
      await createReport({
        latitude: lat,
        longitude: lng,
        location_name: locationName.trim() || null,
        description: description.trim() || null,
        photo_url: photoUrl,
      })
      event.currentTarget.reset()
      setLatitude('')
      setLongitude('')
      setLocationName('')
      setDescription('')
      setPhoto(null)
      setStatus('success')
      setMessage('Thanks! Your sighting has been added.')
      onCreated()
    } catch (err) {
      setStatus('error')
      setMessage(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    }
  }

  return (
    <form className="card report-form" onSubmit={handleSubmit}>
      <div className="card-heading">
        <h2 id="report-title">Report kudzu</h2>
        <p>Spotted vines in North Carolina? Add the location and a photo so others can find it.</p>
      </div>

      <div className="field">
        <div className="field-row">
          <label htmlFor="latitude">Latitude</label>
          <button
            type="button"
            className="link-button"
            onClick={useCurrentLocation}
            disabled={busy}
          >
            {status === 'locating' ? 'Locating...' : 'Use my location'}
          </button>
        </div>
        <div className="coords">
          <input
            id="latitude"
            inputMode="decimal"
            placeholder="e.g. 35.2271"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            required
          />
          <input
            id="longitude"
            inputMode="decimal"
            placeholder="e.g. -80.8431"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            aria-label="Longitude"
            required
          />
        </div>
      </div>

      <div className="field">
        <label htmlFor="location-name">Place name (optional)</label>
        <input
          id="location-name"
          placeholder="e.g. Behind the feed store on Hwy 9"
          value={locationName}
          onChange={(e) => setLocationName(e.target.value)}
          maxLength={120}
        />
      </div>

      <div className="field">
        <label htmlFor="description">Notes (optional)</label>
        <textarea
          id="description"
          rows={3}
          placeholder="How big is the patch? Is it covering trees or fences?"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          maxLength={500}
        />
      </div>

      <div className="field">
        <label htmlFor="photo">Photo (optional, up to 5 MB)</label>
        <input
          id="photo"
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          onChange={(e) => setPhoto(e.target.files?.[0] ?? null)}
        />
      </div>

      <button type="submit" className="primary-button" disabled={busy}>
        {status === 'submitting' ? 'Submitting...' : 'Submit sighting'}
      </button>

      {message && (
        <p className={`form-message ${status === 'error' ? 'is-error' : 'is-success'}`} role="status">
          {message}
        </p>
      )}
    </form>
  )
}
