import { useParams, Link } from 'react-router-dom'
import { MapPin, Calendar, Home, ArrowLeft, Users } from 'lucide-react'
import { properties } from '../data/properties'
import { builders } from '../data/builders'
import PhotoGallery from '../components/property/PhotoGallery'
import PropertyStats from '../components/property/PropertyStats'
import PropertyMap from '../components/property/PropertyMap'
import Badge from '../components/common/Badge'
import StarRating from '../components/common/StarRating'

export default function PropertyDetailPage() {
  const { id } = useParams()
  const property = properties.find(p => p.id === id)

  if (!property) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center text-gray-500">
        <p className="text-xl font-semibold">Property not found.</p>
        <Link to="/listings" className="text-primary-600 hover:underline text-sm mt-2 inline-block">← Back to listings</Link>
      </div>
    )
  }

  const builder = property.builderId ? builders.find(b => b.id === property.builderId) : null

  // Compare with Resale: same city, lower or similar price, different listing type
  const compareProps = property.listingType === 'New Construction'
    ? properties
        .filter(p =>
          p.city === property.city &&
          p.listingType === 'Resale' &&
          p.price <= property.price * 1.05 &&
          p.id !== property.id
        )
        .slice(0, 3)
    : properties
        .filter(p =>
          p.city === property.city &&
          p.listingType === 'New Construction' &&
          p.id !== property.id
        )
        .slice(0, 2)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link to="/listings" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 mb-6">
        <ArrowLeft className="w-4 h-4" /> Back to listings
      </Link>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left column */}
        <div className="flex-1 min-w-0 space-y-8">
          <PhotoGallery images={property.images} title={property.title} />

          <div>
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge label={property.listingType} />
              <Badge label={property.status} />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">{property.title}</h1>
            <p className="flex items-center gap-1.5 text-gray-500 text-sm">
              <MapPin className="w-4 h-4" />
              {property.address}, {property.city}, {property.state} {property.zip}
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <h2 className="font-bold text-gray-900 mb-3">About this home</h2>
            <p className="text-sm text-gray-600 leading-relaxed">{property.description}</p>
            <ul className="mt-4 grid grid-cols-2 gap-2">
              {property.features.map(f => (
                <li key={f} className="flex items-center gap-2 text-sm text-gray-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-500 flex-shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          {/* Builder info */}
          {builder && (
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <h2 className="font-bold text-gray-900 mb-3">Builder</h2>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0">
                  <Home className="w-6 h-6 text-gray-400" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{builder.name}</p>
                  <p className="text-xs text-gray-500">{builder.city}, {builder.state}</p>
                  <StarRating rating={builder.rating} count={builder.reviewCount} />
                  <p className="text-sm text-gray-600 mt-2">{builder.description}</p>
                  <p className="text-sm text-primary-600 mt-1 font-medium">{builder.phone}</p>
                </div>
              </div>
            </div>
          )}

          {/* Map */}
          <div>
            <h2 className="font-bold text-gray-900 mb-3">Location</h2>
            <div style={{ height: '320px' }}>
              <PropertyMap
                properties={[property]}
                center={[property.lat, property.lng]}
                zoom={14}
              />
            </div>
          </div>
        </div>

        {/* Right sticky sidebar */}
        <div className="lg:w-80 flex-shrink-0 space-y-4">
          {/* Price card */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sticky top-20">
            <p className="text-3xl font-bold text-gray-900">
              {property.currency === 'CAD' ? 'C$' : '$'}{property.price.toLocaleString()}
              {property.currency === 'CAD' && <span className="text-base font-normal text-gray-400 ml-1">CAD</span>}
            </p>
            {property.mlsNumber && (
              <p className="text-xs text-gray-400 mt-0.5 font-mono">MLS# {property.mlsNumber}</p>
            )}
            <PropertyStats beds={property.beds} baths={property.baths} sqft={property.sqft} garages={property.garages} size="md" />
            <div className="mt-4 space-y-2 text-sm text-gray-600 border-t border-gray-100 pt-4">
              {property.listingType === 'New Construction' ? (
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span>{property.completionDate}</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Home className="w-4 h-4 text-gray-400" />
                  <span>Built {property.yearBuilt}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span>{property.city}, {property.state}</span>
              </div>
            </div>

            <Link
              to={`/realtors?city=${encodeURIComponent(property.city)}`}
              className="mt-4 flex items-center justify-center gap-2 w-full bg-primary-600 text-white font-semibold py-2.5 rounded-xl hover:bg-primary-700 transition-colors text-sm"
            >
              <Users className="w-4 h-4" />
              Find a Realtor in {property.city}
            </Link>
          </div>

          {/* Compare with Resale */}
          {compareProps.length > 0 && (
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <h3 className="font-bold text-gray-900 mb-1 text-sm">
                {property.listingType === 'New Construction' ? '🏘 Compare with Resale Homes' : '🏗 New Construction Nearby'}
              </h3>
              <p className="text-xs text-gray-500 mb-3">
                {property.listingType === 'New Construction'
                  ? 'Similar resale homes in this area at equal or lower price'
                  : 'New builds near this resale home'}
              </p>
              <div className="space-y-2.5">
                {compareProps.map(cp => (
                  <Link
                    key={cp.id}
                    to={`/listings/${cp.id}`}
                    className="flex items-center gap-3 p-2 rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <img src={cp.images[0]} alt={cp.title} className="w-14 h-10 rounded-lg object-cover flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-gray-900">{cp.currency === 'CAD' ? 'C$' : '$'}{cp.price.toLocaleString()}</p>
                      <p className="text-xs text-gray-500 truncate">{cp.beds}bd · {cp.baths}ba · {cp.sqft.toLocaleString()} sqft</p>
                      <div className="flex items-center gap-1 mt-0.5">
                        <Badge label={cp.listingType} />
                        {cp.listingType === 'Resale' && cp.yearBuilt && (
                          <span className="text-xs text-gray-400">Built {cp.yearBuilt}</span>
                        )}
                      </div>
                    </div>
                    <div className="ml-auto text-xs font-semibold text-right flex-shrink-0">
                      {property.listingType === 'New Construction' && cp.price < property.price && (
                        <span className="text-primary-600">
                          -${(property.price - cp.price).toLocaleString()}
                        </span>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
