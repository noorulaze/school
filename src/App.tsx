import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Link } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { AdmissionModal } from './components/AdmissionModal';

// Pages
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Departments } from './pages/Departments';
import { Teachers } from './pages/Teachers';
import { Students } from './pages/Students';
import { Events } from './pages/Events';
import { Gallery } from './pages/Gallery';
import { Contact } from './pages/Contact';

// Scroll to top helper on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// 404 Fallback component
function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-16">
      <h1 className="text-4xl sm:text-6xl font-extrabold text-emerald-900 mb-4">404</h1>
      <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-2">Page Not Found</h2>
      <p className="text-sm text-slate-600 max-w-md mb-6">
        The page you are looking for might have been moved or does not exist on the Sharaful Islam Madrassa portal.
      </p>
      <Link
        to="/"
        className="px-6 py-2.5 bg-emerald-800 text-white font-semibold text-sm rounded-xl shadow-xs hover:bg-emerald-900 transition-colors"
      >
        Return to Home Overview
      </Link>
    </div>
  );
}

export function App() {
  const [isAdmissionModalOpen, setIsAdmissionModalOpen] = useState(false);

  const handleOpenAdmissionModal = () => setIsAdmissionModalOpen(true);
  const handleCloseAdmissionModal = () => setIsAdmissionModalOpen(false);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-[#FDFBF7] text-slate-800 font-sans selection:bg-emerald-800 selection:text-white">
        <Navbar onOpenAdmissionModal={handleOpenAdmissionModal} />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home onOpenAdmissionModal={handleOpenAdmissionModal} />} />
            <Route path="/about" element={<About onOpenAdmissionModal={handleOpenAdmissionModal} />} />
            <Route path="/departments" element={<Departments onOpenAdmissionModal={handleOpenAdmissionModal} />} />
            <Route path="/academics" element={<Departments onOpenAdmissionModal={handleOpenAdmissionModal} />} />
            <Route path="/teachers" element={<Teachers />} />
            <Route path="/students" element={<Students onOpenAdmissionModal={handleOpenAdmissionModal} />} />
            <Route path="/events" element={<Events />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact onOpenAdmissionModal={handleOpenAdmissionModal} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <Footer />

        <AdmissionModal
          isOpen={isAdmissionModalOpen}
          onClose={handleCloseAdmissionModal}
        />
      </div>
    </BrowserRouter>
  );
}

export default App;
