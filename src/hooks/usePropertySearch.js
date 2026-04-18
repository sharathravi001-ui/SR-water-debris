import { useState, useEffect, useCallback } from 'react'
import { hasApiKey } from '../api/rapidApiClient'
import { searchUSProperties, searchCAProperties, isCaCity, cityToProvince } from '../api/propertyApi'
import { properties as mockProperties } from '../data/properties'

// Applies filters to mock data (used when API key isn't set or API fails)
function filterMock(filters) {
  return mockProperties.filter(p => {
    if (filters.search) {
      const q = filters.search.toLowerCase()
      if (!p.title.toLowerCase().includes(q) &&
          !p.city.toLowerCase().includes(q) &&
          !p.address.toLowerCase().includes(q)) return false
    }
    if (filters.city && p.city.toLowerCase() !== filters.city.toLowerCase()) return false
    if (filters.listingType !== 'All' && p.listingType !== filters.listingType) return false
    if (p.price < filters.priceMin || p.price > filters.priceMax) return false
    if (filters.beds && p.beds < parseInt(filters.beds)) return false
    if (filters.baths && p.baths < parseInt(filters.baths)) return false
    if (filters.type && p.type !== filters.type) return false
    return true
  })
}

const defaultFilters = {
  search: '',
  city: '',
  listingType: 'All',
  priceMin: 0,
  priceMax: 2000000,
  beds: '',
  baths: '',
  type: '',
}

export function usePropertySearch(cityOverride = '') {
  const [filters, setFilters] = useState({ ...defaultFilters, city: cityOverride })
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [source, setSource] = useState('mock') // 'api' | 'mock'

  function setFilter(key, value) {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  function resetFilters() {
    setFilters({ ...defaultFilters, city: cityOverride })
  }

  const fetchProperties = useCallback(async () => {
    if (!hasApiKey()) {
      setProperties(filterMock(filters))
      setSource('mock')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const city = filters.city || cityOverride
      let results = []

      if (!city) {
        // No city selected — fetch a mix of US cities and CA cities in parallel
        const [usRes, caRes] = await Promise.allSettled([
          searchUSProperties({ ...filters, city: 'Austin', state: 'TX', limit: 12 }),
          searchCAProperties({ city: 'Toronto', province: 'ON', priceMin: filters.priceMin, priceMax: filters.priceMax, beds: filters.beds, limit: 12 }),
        ])
        if (usRes.status === 'fulfilled') results.push(...usRes.value)
        if (caRes.status === 'fulfilled') results.push(...caRes.value)
      } else if (isCaCity(city)) {
        results = await searchCAProperties({
          city,
          province: cityToProvince(city),
          priceMin: filters.priceMin,
          priceMax: filters.priceMax,
          beds: filters.beds,
          limit: 24,
        })
      } else {
        results = await searchUSProperties({
          city,
          priceMin: filters.priceMin,
          priceMax: filters.priceMax,
          beds: filters.beds,
          baths: filters.baths,
          type: filters.type,
          limit: 24,
        })
      }

      // Apply listingType filter client-side (API doesn't always support it)
      if (filters.listingType !== 'All') {
        results = results.filter(p => p.listingType === filters.listingType)
      }

      setProperties(results.length ? results : filterMock(filters))
      setSource(results.length ? 'api' : 'mock')
    } catch (err) {
      // Graceful fallback to mock data on any API error
      console.warn('API fetch failed, using mock data:', err.message)
      setProperties(filterMock(filters))
      setSource('mock')
      if (err.message !== 'NO_API_KEY') setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [filters, cityOverride])

  // Debounce: wait 500ms after filters stop changing before fetching
  useEffect(() => {
    const t = setTimeout(fetchProperties, 500)
    return () => clearTimeout(t)
  }, [fetchProperties])

  return { filters, setFilter, resetFilters, properties, loading, error, source }
}
