import { useState, useMemo } from 'react'
import { properties } from '../data/properties'

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

export function usePropertyFilters(cityOverride = '') {
  const [filters, setFilters] = useState({
    ...defaultFilters,
    city: cityOverride,
  })

  function setFilter(key, value) {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  function resetFilters() {
    setFilters({ ...defaultFilters, city: cityOverride })
  }

  const filteredProperties = useMemo(() => {
    return properties.filter(p => {
      if (filters.search) {
        const q = filters.search.toLowerCase()
        if (
          !p.title.toLowerCase().includes(q) &&
          !p.city.toLowerCase().includes(q) &&
          !p.address.toLowerCase().includes(q)
        ) return false
      }
      if (filters.city && p.city.toLowerCase() !== filters.city.toLowerCase()) return false
      if (filters.listingType !== 'All' && p.listingType !== filters.listingType) return false
      if (p.price < filters.priceMin || p.price > filters.priceMax) return false
      if (filters.beds && p.beds < parseInt(filters.beds)) return false
      if (filters.baths && p.baths < parseInt(filters.baths)) return false
      if (filters.type && p.type !== filters.type) return false
      return true
    })
  }, [filters])

  return { filters, setFilter, resetFilters, filteredProperties }
}
