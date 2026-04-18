import { Star } from 'lucide-react'

export default function StarRating({ rating, count, size = 'sm' }) {
  const full = Math.floor(rating)
  const half = rating % 1 >= 0.5
  const empty = 5 - full - (half ? 1 : 0)
  const sz = size === 'sm' ? 'w-3.5 h-3.5' : 'w-5 h-5'

  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center">
        {Array.from({ length: full }).map((_, i) => (
          <Star key={`f${i}`} className={`${sz} fill-amber-400 text-amber-400`} />
        ))}
        {half && <Star className={`${sz} fill-amber-200 text-amber-400`} />}
        {Array.from({ length: empty }).map((_, i) => (
          <Star key={`e${i}`} className={`${sz} text-gray-300`} />
        ))}
      </div>
      <span className="text-sm font-semibold text-gray-800">{rating.toFixed(1)}</span>
      {count != null && (
        <span className="text-xs text-gray-500">({count})</span>
      )}
    </div>
  )
}
