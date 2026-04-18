import PropertyCard from './PropertyCard'

export default function PropertyGrid({ properties }) {
  if (!properties.length) {
    return (
      <div className="col-span-full text-center py-20 text-gray-400">
        <p className="text-lg font-medium">No properties match your filters.</p>
        <p className="text-sm mt-1">Try adjusting your search criteria.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties.map(p => (
        <PropertyCard key={p.id} property={p} />
      ))}
    </div>
  )
}
