import { Link } from 'react-router-dom'
import Badge from '../common/Badge'
import PropertyStats from './PropertyStats'

function formatPrice(price, currency) {
  const symbol = currency === 'CAD' ? 'C$' : '$'
  const suffix = currency === 'CAD' ? ' CAD' : ''
  return `${symbol}${price.toLocaleString()}${suffix}`
}

export default function PropertyCard({ property }) {
  const { id, title, address, city, state, country, price, currency, beds, baths, sqft, garages, listingType, status, images } = property

  return (
    <Link
      to={`/listings/${id}`}
      className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 flex flex-col"
    >
      <div className="relative overflow-hidden aspect-video bg-gray-100">
        <img
          src={images[0]}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap">
          <Badge label={listingType} />
          {status !== 'Active' && <Badge label={status} />}
          {country === 'CA' && <Badge label="🇨🇦 Canada" />}
        </div>
      </div>

      <div className="p-4 flex flex-col gap-2 flex-1">
        <div className="flex items-start justify-between gap-2">
          <p className="font-bold text-xl text-gray-900">
            {formatPrice(price, currency)}
          </p>
        </div>
        <h3 className="font-semibold text-gray-800 text-sm line-clamp-2 leading-snug">{title}</h3>
        <p className="text-xs text-gray-500">{address}, {city}, {state}</p>
        <div className="mt-auto pt-2 border-t border-gray-100">
          <PropertyStats beds={beds} baths={baths} sqft={sqft} garages={garages} />
        </div>
      </div>
    </Link>
  )
}
