import { useState, useEffect } from 'react'
import { hasApiKey } from '../api/rapidApiClient'
import { getUSPropertyDetail, getCAPropertyDetail } from '../api/propertyApi'
import { properties as mockProperties } from '../data/properties'

export function usePropertyDetail(id) {
  const [property, setProperty] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!id) return

    // Always check mock first (handles ids like 'prop-001' and 'prop-ca-001')
    const mock = mockProperties.find(p => p.id === id)

    if (!hasApiKey() || (mock && !id.startsWith('us-') && !id.startsWith('ca-'))) {
      setProperty(mock ?? null)
      setLoading(false)
      return
    }

    setLoading(true)
    setError(null)

    const isCa = id.startsWith('ca-')
    const fetchFn = isCa ? getCAPropertyDetail : getUSPropertyDetail

    fetchFn(id)
      .then(data => {
        setProperty(data ?? mock ?? null)
      })
      .catch(err => {
        console.warn('Property detail fetch failed, falling back to mock:', err.message)
        setProperty(mock ?? null)
        if (err.message !== 'NO_API_KEY') setError(err.message)
      })
      .finally(() => setLoading(false))
  }, [id])

  return { property, loading, error }
}
