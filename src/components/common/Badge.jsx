const variants = {
  'New Construction': 'bg-primary-100 text-primary-700 border border-primary-200',
  'Resale': 'bg-gray-100 text-gray-600 border border-gray-200',
  'Move-In Ready': 'bg-blue-100 text-blue-700 border border-blue-200',
  'Pre-Sale': 'bg-amber-100 text-amber-700 border border-amber-200',
  'Active': 'bg-green-100 text-green-700 border border-green-200',
  'Featured': 'bg-amber-400 text-white',
  'Top Rated': 'bg-amber-400 text-white',
  '🇨🇦 Canada': 'bg-red-100 text-red-700 border border-red-200',
}

export default function Badge({ label, className = '' }) {
  const cls = variants[label] ?? 'bg-gray-100 text-gray-600 border border-gray-200'
  return (
    <span className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full whitespace-nowrap ${cls} ${className}`}>
      {label}
    </span>
  )
}
