import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ResumeProvider } from './context/ResumeContext';
import ResumeBuilderPage from './pages/ResumeBuilderPage';
import CoverLetterPage from './pages/CoverLetterPage';

// Original real estate pages preserved
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import ListingsPage from './pages/ListingsPage';
import PropertyDetailPage from './pages/PropertyDetailPage';
import CityBrowsePage from './pages/CityBrowsePage';
import RealtorMarketplacePage from './pages/RealtorMarketplacePage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  return (
    <HashRouter>
      <ResumeProvider>
        <Routes>
          {/* Resume Builder routes (no outer navbar/footer) */}
          <Route path="/resume" element={<ResumeBuilderPage />} />
          <Route path="/resume/cover-letter" element={<CoverLetterPage />} />

          {/* Original real estate routes */}
          <Route
            path="/*"
            element={
              <div className="min-h-screen flex flex-col">
                <Navbar />
                <main className="flex-1">
                  <Routes>
                    <Route path="/" element={<Navigate to="/resume" replace />} />
                    <Route path="/listings" element={<ListingsPage />} />
                    <Route path="/listings/:id" element={<PropertyDetailPage />} />
                    <Route path="/cities" element={<CityBrowsePage />} />
                    <Route path="/cities/:slug" element={<ListingsPage />} />
                    <Route path="/realtors" element={<RealtorMarketplacePage />} />
                    <Route path="*" element={<NotFoundPage />} />
                  </Routes>
                </main>
                <Footer />
              </div>
            }
          />
        </Routes>
      </ResumeProvider>
    </HashRouter>
  );
}
