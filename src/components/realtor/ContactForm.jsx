import { useState } from 'react'
import { CheckCircle } from 'lucide-react'

export default function ContactForm({ realtor }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [sent, setSent] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    setSent(true)
  }

  if (sent) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-6 text-center space-y-3">
        <CheckCircle className="w-12 h-12 text-primary-500" />
        <h3 className="font-bold text-gray-900 text-lg">Message sent to {realtor.name.split(' ')[0]}!</h3>
        <p className="text-sm text-gray-500">
          {realtor.name.split(' ')[0]} typically responds within 24 hours. Check your email for confirmation.
        </p>
        <button
          onClick={() => setSent(false)}
          className="mt-4 text-sm text-primary-600 hover:underline font-medium"
        >
          Send another message
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6">
      <h3 className="font-bold text-gray-900 text-base">
        Send a message to {realtor.name.split(' ')[0]}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1">Your Name</label>
          <input
            required
            type="text"
            value={form.name}
            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            placeholder="Jane Smith"
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-300"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1">Email</label>
          <input
            required
            type="email"
            value={form.email}
            onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
            placeholder="jane@email.com"
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-300"
          />
        </div>
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-500 mb-1">Phone (optional)</label>
        <input
          type="tel"
          value={form.phone}
          onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
          placeholder="(555) 000-0000"
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-300"
        />
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-500 mb-1">Message</label>
        <textarea
          required
          rows={4}
          value={form.message}
          onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
          placeholder="Hi, I'm interested in new construction homes in your area and would love your help comparing options..."
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-300 resize-none"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-primary-600 text-white font-semibold py-2.5 rounded-lg hover:bg-primary-700 transition-colors text-sm"
      >
        Send Message
      </button>
      <p className="text-xs text-gray-400 text-center">
        By sending, you agree that {realtor.name.split(' ')[0]} may follow up by email or phone.
      </p>
    </form>
  )
}
