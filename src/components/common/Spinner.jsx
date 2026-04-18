export default function Spinner({ text = 'Loading listings…' }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4 text-gray-400">
      <div className="w-10 h-10 border-4 border-gray-200 border-t-primary-500 rounded-full animate-spin" />
      <p className="text-sm">{text}</p>
    </div>
  )
}
