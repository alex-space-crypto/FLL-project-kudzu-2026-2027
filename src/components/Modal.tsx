import { useEffect, type ReactNode } from 'react'

type Props = {
  labelledBy: string
  wide?: boolean
  onClose: () => void
  children: ReactNode
}

export function Modal({ labelledBy, wide = false, onClose, children }: Props) {
  useEffect(() => {
    function handleKey(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [onClose])

  return (
    <div className="overlay" onClick={onClose}>
      <div
        className={wide ? 'modal-panel modal-wide' : 'modal-panel'}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" className="close-button" onClick={onClose} aria-label="Close">
          &times;
        </button>
        {children}
      </div>
    </div>
  )
}
