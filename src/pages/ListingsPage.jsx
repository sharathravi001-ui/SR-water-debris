import { useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { LayoutGrid, Map, SlidersHorizontal, X, Wifi, WifiOff } from 'lucide-react'
import { usePropertySearch } from '../hooks/usePropertySearch'
import PropertyGrid from '../components/property/PropertyGrid'
import PropertyFilters from '../components/property/PropertyFilters'
import PropertyMap from '../components/property/PropertyMap'
import Spinner from '../components/common/Spinner'
import { cities } from '../data/cities'
import { hasApiKey } from '../api/rapidApiClient'

export default function ListingsPage() {
  const { slug } = useParams()
  const [searchParams] = useSearchParams()
  const cityOverride = slug
    ? (cities.find(c => c.slug === slug)?.name ?? '')
    : (searchParams.get('city') ?? '')

  const { filters, setFilter, resetFilters, properties, loading, error, source } = usePropertySearch(cityOverride)
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
          <div className="flex items-center gap-2 mt-0.5">
            <p className="text-sm text-gray-500">
              {loading ? 'Searching…' : `${properties.length} ${properties.length === 1 ? 'home' : 'homes'} found`}
            </p>
            {/* Live / mock indicator */}
            {!loading && (
              <span
                title={source === 'api' ? 'Live data from RapidAPI' : hasApiKey() ? 'API returned no results — showing mock data' : 'Add VITE_RAPIDAPI_KEY to .env.local to load live listings'}
                className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium ${source === 'api' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}
              >
                {source === 'api' ? <Wifi className="w-3 h-3" /> : <WifiOff className="w-3 h-3" />}
                {source === 'api' ? 'Live' : 'Demo data'}
              </span>
            )}
          </div>
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

      {/* API error banner */}
      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl">
          API error: {error} — showing demo data instead.
        </div>
      )}

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
        <div className="hidden md:block w-64 flex-shrink-0">
          <PropertyFilters filters={filters} setFilter={setFilter} resetFilters={resetFilters} />
        </div>

        <div className="flex-1 min-w-0">
          {loading ? (
            <Spinner text="Fetching listings…" />
          ) : view === 'grid' ? (
            <PropertyGrid properties={properties} />
          ) : (
            <div style={{ height: '600px' }}>
              <PropertyMap properties={properties} zoom={9} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
