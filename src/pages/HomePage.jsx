import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Search, ArrowRight, Building2 } from 'lucide-react'
import { properties } from '../data/properties'
import { cities } from '../data/cities'
import { builders } from '../data/builders'
import PropertyGrid from '../components/property/PropertyGrid'
import FeaturedRealtors from '../components/realtor/FeaturedRealtors'
import RealtorModal from '../components/realtor/RealtorModal'

export default function HomePage() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [selectedRealtor, setSelectedRealtor] = useState(null)
  const [modalTab, setModalTab] = useState('contact')

  function handleSearch(e) {
    e.preventDefault()
    navigate(`/listings?city=${encodeURIComponent(search)}`)
  }

  function handleContact(realtor, tab = 'contact') {
    setSelectedRealtor(realtor)
    setModalTab(tab)
  }

  const featuredProperties = properties.filter(p => p.featured).slice(0, 6)

  return (
    <div>
      {/* Hero */}
      <section
        className="relative min-h-[500px] flex items-center justify-center text-white"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1560184897-ae75f418493e?w=1600&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-gray-900/40" />
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            Find Your Dream Home.<br />
            <span className="text-primary-300">New Build or Resale.</span>
          </h1>
          <p className="text-white/80 text-lg mb-8">
            Compare new construction and resale homes side by side, then connect with a top-rated realtor to guide your decision.
          </p>
          <form onSubmit={handleSearch} className="flex gap-2 max-w-lg mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by city (e.g. Austin, Denver)…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3.5 rounded-xl text-gray-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary-400"
              />
            </div>
            <button
              type="submit"
              className="bg-primary-600 hover:bg-primary-700 px-5 py-3.5 rounded-xl font-semibold text-sm transition-colors whitespace-nowrap"
            >
              Search
            </button>
          </form>
          <div className="flex justify-center gap-6 mt-5 flex-wrap">
            {['New Construction', 'Resale'].map(t => (
              <Link
                key={t}
                to={`/listings?listingType=${encodeURIComponent(t)}`}
                className="text-sm text-white/70 hover:text-white underline underline-offset-2 transition-colors"
              >
                Browse {t} →
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Browse by city */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Browse by City</h2>
          <Link to="/cities" className="text-sm text-primary-600 hover:underline font-medium flex items-center gap-1">
            See all <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {cities.map(city => (
            <Link
              key={city.slug}
              to={`/cities/${city.slug}`}
              className="group relative rounded-xl overflow-hidden aspect-square shadow-sm hover:shadow-md transition-shadow"
            >
              <img src={city.image} alt={city.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-2 text-white">
                <p className="text-xs font-bold leading-tight">{city.name}</p>
                <p className="text-xs text-white/70">{city.state}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured listings */}
      <section className="bg-warm-50 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Featured Homes</h2>
              <p className="text-sm text-gray-500 mt-0.5">Handpicked new builds and resale homes across top markets</p>
            </div>
            <Link to="/listings" className="text-sm text-primary-600 hover:underline font-medium flex items-center gap-1">
              View all <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <PropertyGrid properties={featuredProperties} />
        </div>
      </section>

      {/* Featured Realtors */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <FeaturedRealtors onContact={handleContact} limit={4} />
        <div className="mt-6 text-center">
          <Link
            to="/realtors"
            className="inline-flex items-center gap-2 bg-primary-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-primary-700 transition-colors text-sm"
          >
            Find a Realtor <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Trusted builders bar */}
      <section className="bg-gray-50 border-t border-gray-100 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-semibold text-gray-400 uppercase tracking-widest mb-6">
            Trusted Builders
          </p>
          <div className="flex flex-wrap justify-center gap-8 items-center">
            {builders.map(b => (
              <div key={b.id} className="flex items-center gap-2 text-gray-500 hover:text-gray-800 transition-colors">
                <Building2 className="w-5 h-5" />
                <span className="text-sm font-semibold">{b.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <RealtorModal
        realtor={selectedRealtor}
        initialTab={modalTab}
        onClose={() => setSelectedRealtor(null)}
      />
    </div>
  )
}
