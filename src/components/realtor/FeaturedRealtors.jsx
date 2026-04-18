import { Link } from 'react-router-dom'
import { Crown, ArrowRight } from 'lucide-react'
import StarRating from '../common/StarRating'
import { realtors } from '../../data/realtors'

export default function FeaturedRealtors({ onContact, limit = 4 }) {
  const featured = realtors.filter(r => r.topRated).slice(0, limit)

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Crown className="w-5 h-5 text-amber-500" />
          <h2 className="font-bold text-gray-900 text-xl">Top-Rated Realtors</h2>
        </div>
        <Link to="/realtors" className="text-sm text-primary-600 hover:underline font-medium flex items-center gap-1">
          See all <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-2 -mx-1 px-1">
        {featured.map(r => (
          <div
            key={r.id}
            className="flex-shrink-0 w-56 bg-white rounded-2xl border border-amber-200 ring-1 ring-amber-100 p-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3 mb-3">
              <img
                src={r.photo}
                alt={r.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-amber-300"
              />
              <div className="min-w-0">
                <p className="font-bold text-gray-900 text-sm leading-tight truncate">{r.name}</p>
                <p className="text-xs text-gray-500 truncate">{r.city}, {r.state}</p>
              </div>
            </div>
            <StarRating rating={r.rating} count={r.reviewCount} />
            <div className="flex flex-wrap gap-1 mt-2">
              {r.specializations.slice(0, 2).map(s => (
                <span key={s} className="text-xs bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full">{s}</span>
              ))}
            </div>
            {onContact && (
              <button
                onClick={() => onContact(r, 'contact')}
                className="mt-3 w-full text-xs font-semibold bg-primary-600 text-white rounded-lg py-1.5 hover:bg-primary-700 transition-colors"
              >
                Contact
              </button>
            )}
          </div>
        ))}

        <Link
          to="/realtors"
          className="flex-shrink-0 w-44 border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center gap-2 text-gray-400 hover:border-primary-300 hover:text-primary-600 transition-colors p-4"
        >
          <ArrowRight className="w-6 h-6" />
          <span className="text-xs font-medium text-center">View all realtors</span>
        </Link>
      </div>
    </div>
  )
}
