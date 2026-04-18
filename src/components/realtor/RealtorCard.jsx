import { Crown, MessageCircle, User } from 'lucide-react'
import StarRating from '../common/StarRating'
import Badge from '../common/Badge'

export default function RealtorCard({ realtor, onContact }) {
  const { name, photo, agency, city, state, rating, reviewCount, yearsExperience, closedDeals, specializations, topRated } = realtor

  return (
    <div className={`bg-white rounded-2xl border shadow-sm overflow-hidden hover:shadow-md transition-shadow flex flex-col ${topRated ? 'border-amber-300 ring-1 ring-amber-200' : 'border-gray-100'}`}>
      {topRated && (
        <div className="bg-amber-400 text-white text-xs font-bold px-4 py-1.5 flex items-center gap-1.5">
          <Crown className="w-3.5 h-3.5" />
          Top Rated Realtor
        </div>
      )}

      <div className="p-5 flex gap-4 flex-1">
        <div className="flex-shrink-0">
          <img
            src={photo}
            alt={name}
            className={`w-20 h-20 rounded-full object-cover border-2 ${topRated ? 'border-amber-300' : 'border-gray-200'}`}
          />
        </div>

        <div className="flex-1 min-w-0 space-y-1.5">
          <div>
            <h3 className="font-bold text-gray-900 text-base leading-tight">{name}</h3>
            <p className="text-sm text-gray-500">{agency}</p>
            <p className="text-xs text-gray-400">{city}, {state}</p>
          </div>
          <StarRating rating={rating} count={reviewCount} />
          <div className="flex flex-wrap gap-1 pt-0.5">
            {specializations.slice(0, 3).map(s => (
              <span key={s} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{s}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="px-5 pb-2 flex items-center gap-2 text-xs text-gray-500 border-t border-gray-50 pt-3">
        <span>{yearsExperience} yrs exp</span>
        <span className="text-gray-300">·</span>
        <span>{closedDeals} deals closed</span>
      </div>

      <div className="px-5 pb-5 pt-3 flex gap-2">
        <button
          onClick={() => onContact(realtor, 'about')}
          className="flex-1 flex items-center justify-center gap-1.5 text-sm font-medium border border-gray-200 rounded-lg py-2 text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <User className="w-4 h-4" />
          Profile
        </button>
        <button
          onClick={() => onContact(realtor, 'contact')}
          className="flex-1 flex items-center justify-center gap-1.5 text-sm font-semibold bg-primary-600 text-white rounded-lg py-2 hover:bg-primary-700 transition-colors"
        >
          <MessageCircle className="w-4 h-4" />
          Contact
        </button>
      </div>
    </div>
  )
}
