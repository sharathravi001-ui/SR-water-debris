import { cities } from '../../data/cities'

const specializations = ['New Construction', 'First-Time Buyers', 'Luxury', 'Investment', 'Resale', 'Relocation', 'Downsizing', 'Condos']
const ratings = [{ label: 'Any', value: 0 }, { label: '4+', value: 4 }, { label: '4.5+', value: 4.5 }, { label: '5 ★', value: 5 }]
const sortOptions = [
  { value: 'topRated', label: 'Top Rated' },
  { value: 'mostReviews', label: 'Most Reviews' },
  { value: 'mostExperience', label: 'Most Experience' },
]

export default function RealtorFilters({ filters, setFilter, resetFilters }) {
  return (
    <aside className="bg-white border border-gray-200 rounded-2xl p-5 space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-gray-900">Filters</h3>
        <button onClick={resetFilters} className="text-xs text-primary-600 hover:underline font-medium">
          Clear all
        </button>
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
          {cities.map(c => <option key={c.slug} value={c.name}>{c.name}, {c.state}</option>)}
        </select>
      </div>

      {/* Min rating */}
      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Min Rating</label>
        <div className="flex gap-1.5 flex-wrap">
          {ratings.map(r => (
            <button
              key={r.value}
              onClick={() => setFilter('minRating', r.value)}
              className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors ${
                filters.minRating === r.value
                  ? 'bg-amber-400 text-white border-amber-400'
                  : 'border-gray-200 text-gray-600 hover:border-gray-400'
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      {/* Specialization */}
      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Specialization</label>
        <div className="space-y-1.5">
          <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
            <input type="radio" name="spec" value="" checked={filters.specialization === ''} onChange={() => setFilter('specialization', '')} className="accent-primary-600" />
            Any
          </label>
          {specializations.map(s => (
            <label key={s} className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
              <input type="radio" name="spec" value={s} checked={filters.specialization === s} onChange={() => setFilter('specialization', s)} className="accent-primary-600" />
              {s}
            </label>
          ))}
        </div>
      </div>

      {/* Sort */}
      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Sort By</label>
        <select
          value={filters.sortBy}
          onChange={e => setFilter('sortBy', e.target.value)}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-300"
        >
          {sortOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      </div>
    </aside>
  )
}
