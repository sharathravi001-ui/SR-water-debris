import { cities } from '../../data/cities'

const bedOptions = ['1', '2', '3', '4', '5']
const bathOptions = ['1', '2', '3', '4']
const typeOptions = ['Single Family', 'Condo', 'Townhouse']

export default function PropertyFilters({ filters, setFilter, resetFilters }) {
  return (
    <aside className="bg-white border border-gray-200 rounded-2xl p-5 space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-gray-900">Filters</h3>
        <button
          onClick={resetFilters}
          className="text-xs text-primary-600 hover:underline font-medium"
        >
          Clear all
        </button>
      </div>

      {/* Listing type toggle */}
      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Type</label>
        <div className="flex rounded-lg border border-gray-200 overflow-hidden text-sm">
          {['All', 'New Construction', 'Resale'].map(t => (
            <button
              key={t}
              onClick={() => setFilter('listingType', t)}
              className={`flex-1 py-2 text-center font-medium transition-colors text-xs ${filters.listingType === t ? 'bg-primary-600 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              {t === 'New Construction' ? 'New Build' : t}
            </button>
          ))}
        </div>
      </div>

      {/* City */}
      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">City</label>
        <select
          value={filters.city}
          onChange={e => setFilter('city', e.target.value)}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-300"
        >
          <option value="">Any city</option>
          {cities.map(c => (
            <option key={c.slug} value={c.name}>{c.name}, {c.state}</option>
          ))}
        </select>
      </div>

      {/* Price range */}
      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
          Price: ${filters.priceMin.toLocaleString()} – ${filters.priceMax === 2000000 ? '2M+' : filters.priceMax.toLocaleString()}
        </label>
        <div className="space-y-2">
          <input
            type="range"
            min={0}
            max={2000000}
            step={25000}
            value={filters.priceMin}
            onChange={e => setFilter('priceMin', Number(e.target.value))}
            className="w-full accent-primary-600"
          />
          <input
            type="range"
            min={0}
            max={2000000}
            step={25000}
            value={filters.priceMax}
            onChange={e => setFilter('priceMax', Number(e.target.value))}
            className="w-full accent-primary-600"
          />
        </div>
      </div>

      {/* Beds */}
      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Min Bedrooms</label>
        <div className="flex gap-1.5 flex-wrap">
          {['Any', ...bedOptions].map(b => (
            <button
              key={b}
              onClick={() => setFilter('beds', b === 'Any' ? '' : b)}
              className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors ${
                (b === 'Any' ? filters.beds === '' : filters.beds === b)
                  ? 'bg-primary-600 text-white border-primary-600'
                  : 'border-gray-200 text-gray-600 hover:border-gray-400'
              }`}
            >
              {b === 'Any' ? 'Any' : `${b}+`}
            </button>
          ))}
        </div>
      </div>

      {/* Baths */}
      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Min Bathrooms</label>
        <div className="flex gap-1.5 flex-wrap">
          {['Any', ...bathOptions].map(b => (
            <button
              key={b}
              onClick={() => setFilter('baths', b === 'Any' ? '' : b)}
              className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors ${
                (b === 'Any' ? filters.baths === '' : filters.baths === b)
                  ? 'bg-primary-600 text-white border-primary-600'
                  : 'border-gray-200 text-gray-600 hover:border-gray-400'
              }`}
            >
              {b === 'Any' ? 'Any' : `${b}+`}
            </button>
          ))}
        </div>
      </div>

      {/* Property type */}
      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Property Type</label>
        <div className="space-y-1.5">
          <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
            <input
              type="radio"
              name="type"
              value=""
              checked={filters.type === ''}
              onChange={() => setFilter('type', '')}
              className="accent-primary-600"
            />
            Any type
          </label>
          {typeOptions.map(t => (
            <label key={t} className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
              <input
                type="radio"
                name="type"
                value={t}
                checked={filters.type === t}
                onChange={() => setFilter('type', t)}
                className="accent-primary-600"
              />
              {t}
            </label>
          ))}
        </div>
      </div>
    </aside>
  )
}
