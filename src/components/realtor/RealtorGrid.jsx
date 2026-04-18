import RealtorCard from './RealtorCard'

export default function RealtorGrid({ realtors, onContact }) {
  if (!realtors.length) {
    return (
      <div className="text-center py-16 text-gray-400">
        <p className="text-lg font-medium">No realtors match your filters.</p>
        <p className="text-sm mt-1">Try adjusting your search criteria.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
      {realtors.map(r => (
        <RealtorCard key={r.id} realtor={r} onContact={onContact} />
      ))}
    </div>
  )
}
