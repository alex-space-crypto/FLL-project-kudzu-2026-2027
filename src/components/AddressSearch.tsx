import { useState, type FormEvent } from 'react'
import { findNorthCarolinaAddress } from '../lib/geocode'

type Props = {
  onFound: (latitude: number, longitude: number) => void
}

export function AddressSearch({ onFound }: Props) {
  const [query, setQuery] = useState('')
  const [searching, setSearching] = useState(false)
  const [message, setMessage] = useState('')
  const [isError, setIsError] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const trimmed = query.trim()
    if (!trimmed) return

    setSearching(true)
    setMessage('')
    try {
      const result = await findNorthCarolinaAddress(trimmed)
      if (!result) {
        setIsError(true)
        setMessage('No address found in North Carolina. Try adding the city or ZIP code.')
        return
      }
      onFound(result.latitude, result.longitude)
      setIsError(false)
      setMessage('Zoomed to that address.')
    } catch (err) {
      setIsError(true)
      setMessage(err instanceof Error ? err.message : 'Address search failed. Please try again.')
    } finally {
      setSearching(false)
    }
  }

  return (
    <form className="address-search" role="search" onSubmit={handleSubmit}>
      <label htmlFor="address-search-input" className="sr-only">
        Search for an address
      </label>
      <input
        id="address-search-input"
        type="text"
        placeholder="Search an address, e.g. 100 N Tryon St, Charlotte"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        maxLength={200}
      />
      <button type="submit" className="primary-button" disabled={searching || !query.trim()}>
        {searching ? 'Searching...' : 'Go to address'}
      </button>
      {message && (
        <p className={`form-message ${isError ? 'is-error' : 'is-success'}`} role="status">
          {message}
        </p>
      )}
    </form>
  )
}
