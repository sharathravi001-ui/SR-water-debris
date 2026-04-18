import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Home, Menu, X } from 'lucide-react'

const links = [
  { to: '/listings', label: 'Buy' },
  { to: '/cities', label: 'Cities' },
  { to: '/realtors', label: 'Realtors' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 font-bold text-xl text-primary-600">
            <Home className="w-6 h-6" />
            HomeQuest
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {links.map(l => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors ${isActive ? 'text-primary-600' : 'text-gray-600 hover:text-gray-900'}`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/realtors"
              className="text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              Find a Realtor
            </Link>
            <Link
              to="/listings"
              className="bg-primary-600 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
            >
              Browse Homes
            </Link>
          </div>

          <button
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-gray-200 bg-white px-4 py-4 space-y-3">
          {links.map(l => (
            <NavLink
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `block text-sm font-medium py-2 ${isActive ? 'text-primary-600' : 'text-gray-700'}`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <Link
            to="/listings"
            onClick={() => setOpen(false)}
            className="block bg-primary-600 text-white text-sm font-semibold px-4 py-2 rounded-lg text-center mt-2"
          >
            Browse Homes
          </Link>
        </div>
      )}
    </header>
  )
}
