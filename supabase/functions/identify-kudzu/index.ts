const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-Info, Apikey',
}

const MAX_IMAGE_CHARS = 7_000_000
const IMAGE_PATTERN = /^data:image\/(jpeg|png|webp|gif);base64,[A-Za-z0-9+/=]+$/

const SYSTEM_PROMPT = `You identify kudzu (Pueraria montana var. lobata) in photos for a North Carolina sighting map.
Kudzu features: large trifoliate leaves with three broad, often lobed leaflets; woody vines with brown fuzzy hairs on new stems; grape-like purple flower clusters in late summer; dense green vines that blanket trees, fences, power poles, and hillsides.
Reply only with JSON in this shape:
{"is_kudzu": boolean, "confidence": number from 0 to 1, "explanation": one short plain-language sentence describing what you see, "look_alikes": a short phrase naming similar plants, or an empty string}
If the photo is too unclear to decide, set is_kudzu to false, keep confidence at 0.3 or lower, and say so in the explanation.`

function json(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 200, headers: corsHeaders })
  }
  if (req.method !== 'POST') {
    return json({ error: 'Method not allowed.' }, 405)
  }

  try {
    const apiKey = Deno.env.get('OPENAI_API_KEY')
    if (!apiKey) {
      return json({ error: 'Photo identification is not set up yet.' }, 503)
    }

    const body = await req.json()
    const image = typeof body?.image === 'string' ? body.image : ''
    if (image.length > MAX_IMAGE_CHARS || !IMAGE_PATTERN.test(image)) {
      return json({ error: 'Send a JPG, PNG, WebP, or GIF photo under 5 MB.' }, 400)
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        response_format: { type: 'json_object' },
        max_tokens: 300,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          {
            role: 'user',
            content: [
              { type: 'text', text: 'Is this kudzu?' },
              { type: 'image_url', image_url: { url: image, detail: 'low' } },
            ],
          },
        ],
      }),
    })
    if (!response.ok) {
      return json({ error: 'The identification service is unavailable right now.' }, 502)
    }

    const payload = await response.json()
    const content = payload?.choices?.[0]?.message?.content
    const result = typeof content === 'string' ? JSON.parse(content) : null
    if (typeof result?.is_kudzu !== 'boolean' || typeof result?.confidence !== 'number') {
      return json({ error: 'The identification service returned an unexpected answer.' }, 502)
    }

    return json(
      {
        is_kudzu: result.is_kudzu,
        confidence: Math.min(1, Math.max(0, result.confidence)),
        explanation: typeof result.explanation === 'string' ? result.explanation : '',
        look_alikes: typeof result.look_alikes === 'string' ? result.look_alikes : '',
      },
      200,
    )
  } catch (err) {
    console.error('identify-kudzu failed', err)
    return json({ error: 'Something went wrong. Please try again.' }, 500)
  }
})
