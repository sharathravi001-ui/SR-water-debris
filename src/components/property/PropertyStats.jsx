import { BedDouble, Bath, SquareStack, Car } from 'lucide-react'

export default function PropertyStats({ beds, baths, sqft, garages, size = 'sm' }) {
  const cls = size === 'sm' ? 'text-xs' : 'text-sm'
  const iconCls = size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4'

  return (
    <div className={`flex items-center gap-3 text-gray-600 flex-wrap ${cls}`}>
      <span className="flex items-center gap-1">
        <BedDouble className={iconCls} />
        {beds} bd
      </span>
      <span className="flex items-center gap-1">
        <Bath className={iconCls} />
        {baths} ba
      </span>
      <span className="flex items-center gap-1">
        <SquareStack className={iconCls} />
        {sqft.toLocaleString()} sqft
      </span>
      {garages > 0 && (
        <span className="flex items-center gap-1">
          <Car className={iconCls} />
          {garages} car
        </span>
      )}
    </div>
  )
}
