import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search } from 'lucide-react'
import { useRealtorFilters } from '../hooks/useRealtorFilters'
import RealtorGrid from '../components/realtor/RealtorGrid'
import RealtorFilters from '../components/realtor/RealtorFilters'
import RealtorModal from '../components/realtor/RealtorModal'
import FeaturedRealtors from '../components/realtor/FeaturedRealtors'

export default function RealtorMarketplacePage() {
  const [searchParams] = useSearchParams()
  const cityOverride = searchParams.get('city') ?? ''
  const { filters, setFilter, resetFilters, filteredRealtors } = useRealtorFilters(cityOverride)
  const [selectedRealtor, setSelectedRealtor] = useState(null)
  const [modalTab, setModalTab] = useState('about')

  function handleContact(realtor, tab = 'contact') {
    setSelectedRealtor(realtor)
    setModalTab(tab)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Hero */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Realtor Marketplace</h1>
        <p className="text-gray-500 mt-1">
          Connect with top-rated local realtors who specialise in new construction and resale homes.
        </p>
      </div>

      {/* Search bar */}
      <div className="relative mb-8 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search by name, agency, or city…"
          value={filters.search}
          onChange={e => setFilter('search', e.target.value)}
          className="w-full border border-gray-200 rounded-xl pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-300"
        />
      </div>

      {/* Featured strip */}
      <div className="mb-10">
        <FeaturedRealtors onContact={handleContact} />
      </div>

      <div className="flex gap-6">
        {/* Sidebar */}
        <div className="hidden md:block w-60 flex-shrink-0">
          <RealtorFilters filters={filters} setFilter={setFilter} resetFilters={resetFilters} />
        </div>

        {/* Grid */}
        <div className="flex-1 min-w-0">
          <p className="text-sm text-gray-500 mb-4">
            {filteredRealtors.length} {filteredRealtors.length === 1 ? 'realtor' : 'realtors'} found
          </p>
          <RealtorGrid realtors={filteredRealtors} onContact={handleContact} />
        </div>
      </div>

      <RealtorModal
        realtor={selectedRealtor}
        initialTab={modalTab}
        onClose={() => setSelectedRealtor(null)}
      />
    </div>
  )
}
