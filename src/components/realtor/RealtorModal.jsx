import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Phone, Mail, Crown } from 'lucide-react'
import Modal from '../common/Modal'
import StarRating from '../common/StarRating'
import ContactForm from './ContactForm'
import { properties } from '../../data/properties'

export default function RealtorModal({ realtor, initialTab = 'about', onClose }) {
  const [tab, setTab] = useState(initialTab)
  if (!realtor) return null

  const listedProperties = properties.filter(p => realtor.activeListings.includes(p.id))

  return (
    <Modal isOpen={!!realtor} onClose={onClose} wide>
      <div className="flex flex-col md:flex-row min-h-[500px]">
        {/* Left panel */}
        <div className="md:w-64 bg-warm-50 border-b md:border-b-0 md:border-r border-gray-100 p-6 flex-shrink-0">
          <div className="flex flex-col items-center text-center gap-3">
            <div className="relative">
              <img
                src={realtor.photo}
                alt={realtor.name}
                className={`w-24 h-24 rounded-full object-cover border-2 ${realtor.topRated ? 'border-amber-400' : 'border-gray-200'}`}
              />
              {realtor.topRated && (
                <span className="absolute -top-1 -right-1 bg-amber-400 rounded-full p-1">
                  <Crown className="w-3 h-3 text-white" />
                </span>
              )}
            </div>
            <div>
              <h2 className="font-bold text-gray-900 text-lg leading-tight">{realtor.name}</h2>
              <p className="text-sm text-gray-500">{realtor.agency}</p>
              <p className="text-xs text-gray-400">{realtor.city}, {realtor.state}</p>
            </div>
            <StarRating rating={realtor.rating} count={realtor.reviewCount} size="md" />
            <div className="w-full space-y-1.5 text-xs text-gray-600 border-t border-gray-200 pt-4">
              <div className="flex justify-between"><span className="text-gray-400">Experience</span><span className="font-medium">{realtor.yearsExperience} years</span></div>
              <div className="flex justify-between"><span className="text-gray-400">Closed deals</span><span className="font-medium">{realtor.closedDeals}</span></div>
              <div className="flex justify-between"><span className="text-gray-400">Languages</span><span className="font-medium">{realtor.languages.join(', ')}</span></div>
            </div>
            <div className="w-full space-y-2 pt-2">
              <a href={`tel:${realtor.phone}`} className="flex items-center gap-2 text-xs text-gray-600 hover:text-primary-600 transition-colors">
                <Phone className="w-3.5 h-3.5" />{realtor.phone}
              </a>
              <a href={`mailto:${realtor.email}`} className="flex items-center gap-2 text-xs text-gray-600 hover:text-primary-600 transition-colors break-all">
                <Mail className="w-3.5 h-3.5" />{realtor.email}
              </a>
            </div>
          </div>
        </div>

        {/* Right panel */}
        <div className="flex-1 flex flex-col">
          {/* Tab bar */}
          <div className="flex border-b border-gray-100">
            {['about', 'contact'].map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`flex-1 py-3.5 text-sm font-semibold capitalize transition-colors border-b-2 -mb-px ${tab === t ? 'border-primary-500 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-800'}`}
              >
                {t === 'about' ? 'About' : 'Contact'}
              </button>
            ))}
          </div>

          {tab === 'about' ? (
            <div className="p-6 space-y-5 overflow-y-auto">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">About {realtor.name.split(' ')[0]}</h4>
                <p className="text-sm text-gray-600 leading-relaxed">{realtor.bio}</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Specializations</h4>
                <div className="flex flex-wrap gap-1.5">
                  {realtor.specializations.map(s => (
                    <span key={s} className="text-xs bg-primary-50 text-primary-700 border border-primary-100 px-2.5 py-1 rounded-full font-medium">{s}</span>
                  ))}
                </div>
              </div>
              {listedProperties.length > 0 && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Active Listings</h4>
                  <div className="space-y-2">
                    {listedProperties.map(p => (
                      <Link
                        key={p.id}
                        to={`/listings/${p.id}`}
                        onClick={onClose}
                        className="flex items-center gap-3 p-2.5 rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors"
                      >
                        <img src={p.images[0]} alt={p.title} className="w-14 h-10 rounded-lg object-cover flex-shrink-0" />
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-gray-800 truncate">${p.price.toLocaleString()}</p>
                          <p className="text-xs text-gray-500 truncate">{p.title}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <ContactForm realtor={realtor} />
          )}
        </div>
      </div>
    </Modal>
  )
}
