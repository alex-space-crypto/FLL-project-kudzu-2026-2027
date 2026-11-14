import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react'
import { identifyKudzuPhoto, type KudzuIdentification } from '../lib/identifyKudzu'
import { ReportForm } from './ReportForm'

type Props = {
  onSubmitted: () => void
}

export function IdentifyPhoto({ onSubmitted }: Props) {
  const [file, setFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState('')
  const [busy, setBusy] = useState(false)
  const [result, setResult] = useState<KudzuIdentification | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!file) return
    const url = URL.createObjectURL(file)
    setPreviewUrl(url)
    return () => URL.revokeObjectURL(url)
  }, [file])

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    setFile(event.target.files?.[0] ?? null)
    setResult(null)
    setError('')
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!file) return

    setBusy(true)
    setResult(null)
    setError('')
    try {
      setResult(await identifyKudzuPhoto(file))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Photo identification failed. Please try again.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="identify">
      <div className="card-heading">
        <h2 id="identify-title">Identify a photo</h2>
        <p>Upload a picture of a plant and we'll tell you whether it looks like kudzu.</p>
      </div>

      <form className="identify-form" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="identify-photo">Choose a photo (up to 5 MB)</label>
          <input
            id="identify-photo"
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            onChange={handleFileChange}
          />
        </div>

        {previewUrl && <img className="identify-preview" src={previewUrl} alt="Selected plant photo" />}

        <button type="submit" className="primary-button" disabled={!file || busy}>
          {busy ? 'Checking photo...' : 'Check photo'}
        </button>
      </form>

      {error && (
        <div className="error-box" role="alert">
          <p>{error}</p>
        </div>
      )}

      {result && (
        <div className={`verdict ${result.isKudzu ? 'is-kudzu' : 'is-other'}`} role="status">
          <p className="verdict-title">{result.isKudzu ? 'Looks like kudzu' : 'Probably not kudzu'}</p>
          <p className="verdict-confidence">Confidence: {Math.round(result.confidence * 100)}%</p>
          {result.explanation && <p>{result.explanation}</p>}
          {result.lookAlikes && <p className="verdict-note">Could be confused with: {result.lookAlikes}</p>}
          <p className="verdict-note">This is an automated guess. Confirm in person before acting on it.</p>
        </div>
      )}

      <div className="identify-report">
        <ReportForm photo={file} onCreated={onSubmitted} />
      </div>
    </div>
  )
}
