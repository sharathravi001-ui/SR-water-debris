import { Link } from 'react-router-dom'
import { cities } from '../data/cities'
import { MapPin } from 'lucide-react'

export default function CityBrowsePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Browse by City</h1>
        <p className="text-gray-500 mt-1">Explore new construction and resale homes across top US markets.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cities.map(city => (
          <Link
            key={city.slug}
            to={`/cities/${city.slug}`}
            className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow aspect-video"
          >
            <img
              src={city.image}
              alt={city.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
              <div className="flex items-center gap-1.5 mb-1">
                <MapPin className="w-4 h-4 opacity-80" />
                <h2 className="text-xl font-bold">{city.name}, {city.state}</h2>
              </div>
              <p className="text-sm text-white/80">
                {city.activeListings} listings · avg ${city.avgPrice.toLocaleString()}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
