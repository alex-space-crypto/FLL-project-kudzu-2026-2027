import { assertValidPhoto } from './kudzuReports'

export type KudzuIdentification = {
  isKudzu: boolean
  confidence: number
  explanation: string
  lookAlikes: string
}

const IDENTIFY_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/identify-kudzu`
const ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

function readAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === 'string') resolve(reader.result)
      else reject(new Error('Could not read that photo. Please try another one.'))
    }
    reader.onerror = () => reject(new Error('Could not read that photo. Please try another one.'))
    reader.readAsDataURL(file)
  })
}

export async function identifyKudzuPhoto(file: File): Promise<KudzuIdentification> {
  assertValidPhoto(file)
  const image = await readAsDataUrl(file)

  const response = await fetch(IDENTIFY_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${ANON_KEY}`,
      apikey: ANON_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ image }),
  })

  const payload: unknown = await response.json().catch(() => null)
  if (!response.ok) {
    const message = (payload as { error?: unknown } | null)?.error
    throw new Error(typeof message === 'string' ? message : 'Photo identification failed. Please try again.')
  }

  const data = payload as Partial<Record<'is_kudzu' | 'confidence' | 'explanation' | 'look_alikes', unknown>> | null
  if (
    typeof data?.is_kudzu !== 'boolean' ||
    typeof data.confidence !== 'number' ||
    typeof data.explanation !== 'string' ||
    typeof data.look_alikes !== 'string'
  ) {
    throw new Error('Photo identification returned an unexpected answer. Please try again.')
  }

  return {
    isKudzu: data.is_kudzu,
    confidence: data.confidence,
    explanation: data.explanation,
    lookAlikes: data.look_alikes,
  }
}
