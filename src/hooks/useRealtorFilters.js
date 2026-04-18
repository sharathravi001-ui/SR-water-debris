import { useState, useMemo } from 'react'
import { realtors } from '../data/realtors'

const defaultFilters = {
  search: '',
  city: '',
  minRating: 0,
  specialization: '',
  sortBy: 'topRated',
}

export function useRealtorFilters(cityOverride = '') {
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

  const filteredRealtors = useMemo(() => {
    let result = realtors.filter(r => {
      if (filters.search) {
        const q = filters.search.toLowerCase()
        if (
          !r.name.toLowerCase().includes(q) &&
          !r.agency.toLowerCase().includes(q) &&
          !r.city.toLowerCase().includes(q)
        ) return false
      }
      if (filters.city && r.city.toLowerCase() !== filters.city.toLowerCase()) return false
      if (filters.minRating && r.rating < filters.minRating) return false
      if (filters.specialization && !r.specializations.includes(filters.specialization)) return false
      return true
    })

    if (filters.sortBy === 'topRated') {
      result = [...result].sort((a, b) => {
        if (b.topRated !== a.topRated) return b.topRated ? 1 : -1
        return b.rating - a.rating
      })
    } else if (filters.sortBy === 'mostReviews') {
      result = [...result].sort((a, b) => b.reviewCount - a.reviewCount)
    } else if (filters.sortBy === 'mostExperience') {
      result = [...result].sort((a, b) => b.yearsExperience - a.yearsExperience)
    }

    return result
  }, [filters])

  return { filters, setFilter, resetFilters, filteredRealtors }
}
