const RAPIDAPI_KEY = import.meta.env.VITE_RAPIDAPI_KEY

// Returns true when a key has been provided in .env.local
export function hasApiKey() {
  return !!RAPIDAPI_KEY && RAPIDAPI_KEY !== 'your_rapidapi_key_here'
}

export async function rapidGet(host, path, params = {}) {
  if (!hasApiKey()) throw new Error('NO_API_KEY')

  const url = new URL(`https://${host}${path}`)
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== '') url.searchParams.set(k, v)
  })

  const res = await fetch(url.toString(), {
    method: 'GET',
    headers: {
      'x-rapidapi-key': RAPIDAPI_KEY,
      'x-rapidapi-host': host,
    },
  })

  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(`RapidAPI ${res.status}: ${text.slice(0, 200)}`)
  }

  return res.json()
}
