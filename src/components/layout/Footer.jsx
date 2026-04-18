import { Link } from 'react-router-dom'
import { Home } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center gap-2 text-white font-bold text-lg mb-3">
              <Home className="w-5 h-5 text-primary-400" />
              HomeQuest
            </div>
            <p className="text-sm leading-relaxed">
              Compare new construction and resale homes side by side. Find top-rated realtors to guide your purchase.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Browse</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/listings" className="hover:text-white transition-colors">All Listings</Link></li>
              <li><Link to="/listings?listingType=New+Construction" className="hover:text-white transition-colors">New Construction</Link></li>
              <li><Link to="/listings?listingType=Resale" className="hover:text-white transition-colors">Resale Homes</Link></li>
              <li><Link to="/cities" className="hover:text-white transition-colors">Browse by City</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Realtors</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/realtors" className="hover:text-white transition-colors">Find a Realtor</Link></li>
              <li><Link to="/realtors?specialization=New+Construction" className="hover:text-white transition-colors">New Build Specialists</Link></li>
              <li><Link to="/realtors?specialization=First-Time+Buyers" className="hover:text-white transition-colors">First-Time Buyer Agents</Link></li>
              <li><Link to="/realtors?specialization=Luxury" className="hover:text-white transition-colors">Luxury Realtors</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 text-sm text-center">
          © {new Date().getFullYear()} HomeQuest. All property data is for demonstration purposes only.
        </div>
      </div>
    </footer>
  )
}
