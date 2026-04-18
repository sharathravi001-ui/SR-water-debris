import { useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { LayoutGrid, Map, SlidersHorizontal, X } from 'lucide-react'
import { usePropertyFilters } from '../hooks/usePropertyFilters'
import PropertyGrid from '../components/property/PropertyGrid'
import PropertyFilters from '../components/property/PropertyFilters'
import PropertyMap from '../components/property/PropertyMap'
import { cities } from '../data/cities'

export default function ListingsPage() {
  const { slug } = useParams()
  const [searchParams] = useSearchParams()
  const cityOverride = slug
    ? (cities.find(c => c.slug === slug)?.name ?? '')
    : (searchParams.get('city') ?? '')

  const { filters, setFilter, resetFilters, filteredProperties } = usePropertyFilters(cityOverride)
  const [view, setView] = useState('grid')
  const [showFilters, setShowFilters] = useState(false)

  const pageTitle = slug
    ? `Homes in ${cities.find(c => c.slug === slug)?.name ?? slug}`
    : 'All Listings'

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{pageTitle}</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {filteredProperties.length} {filteredProperties.length === 1 ? 'home' : 'homes'} found
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowFilters(v => !v)}
            className="md:hidden flex items-center gap-1.5 border border-gray-200 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
          </button>
          <div className="flex border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => setView('grid')}
              className={`p-2 ${view === 'grid' ? 'bg-primary-600 text-white' : 'text-gray-500 hover:bg-gray-50'}`}
              aria-label="Grid view"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setView('map')}
              className={`p-2 ${view === 'map' ? 'bg-primary-600 text-white' : 'text-gray-500 hover:bg-gray-50'}`}
              aria-label="Map view"
            >
              <Map className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile filter drawer */}
      {showFilters && (
        <div className="md:hidden mb-4 relative">
          <button
            onClick={() => setShowFilters(false)}
            className="absolute top-4 right-4 z-10 p-1 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200"
          >
            <X className="w-4 h-4" />
          </button>
          <PropertyFilters filters={filters} setFilter={setFilter} resetFilters={resetFilters} />
        </div>
      )}

      <div className="flex gap-6">
        {/* Sidebar filters — desktop only */}
        <div className="hidden md:block w-64 flex-shrink-0">
          <PropertyFilters filters={filters} setFilter={setFilter} resetFilters={resetFilters} />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {view === 'grid' ? (
            <PropertyGrid properties={filteredProperties} />
          ) : (
            <div style={{ height: '600px' }}>
              <PropertyMap properties={filteredProperties} zoom={9} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
