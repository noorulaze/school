import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, MapPin, Phone, GraduationCap, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SCHOOL_INFO } from '../data/schoolInfo';

interface NavbarProps {
  onOpenAdmissionModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAdmissionModal }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Track scroll for clean header shadow
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Departments', path: '/departments' },
    { name: 'Teachers', path: '/teachers' },
    { name: 'Students', path: '/students' },
    { name: 'Events', path: '/events' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full">
      {/* 1. Sleek Top Notification / Location Strip */}
      <div className="bg-[#0f3829] text-slate-200 text-[11px] py-1.5 px-4 sm:px-6 border-b border-[#1b5038]">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-emerald-200 truncate">
            <MapPin className="w-3 h-3 text-[#c59b27] shrink-0" />
            <span className="truncate">
              {SCHOOL_INFO.location.area}, {SCHOOL_INFO.location.city}, Malappuram, Kerala (PIN: 676101)
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-4 text-slate-300 text-[11px]">
            <span className="flex items-center gap-1">
              <Phone className="w-2.5 h-2.5 text-[#c59b27]" />
              <span>Office Desk: {SCHOOL_INFO.contact.phone}</span>
            </span>
            <span className="text-slate-500">•</span>
            <Link
              to="/students"
              className="text-[#fde68a] hover:text-white font-medium flex items-center gap-1 transition-colors"
            >
              <GraduationCap className="w-3 h-3" />
              <span>Student Portal</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Unified Modern Navigation Bar */}
      <nav
        className={`w-full bg-white/95 backdrop-blur-md border-b border-[#e5e0d5] transition-all duration-300 ${
          isScrolled ? 'shadow-sm py-2.5' : 'py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">
          {/* Modern Institutional Logo & Name Area */}
          <Link to="/" className="flex items-center gap-3 group shrink-0">
            {/* School Crest */}
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#164e37] text-white flex items-center justify-center shrink-0 border border-[#c59b27] shadow-xs relative overflow-hidden transition-transform duration-300 group-hover:scale-105">
              <svg viewBox="0 0 100 100" className="w-8 h-8">
                <circle cx="50" cy="50" r="46" fill="none" stroke="#c59b27" strokeWidth="2" strokeDasharray="3 2" />
                <path d="M24 64 C36 58, 45 61, 50 67 C55 61, 64 58, 76 64 L76 38 C64 34, 55 37, 50 43 C45 37, 36 34, 24 38 Z" fill="#ffffff" />
                <circle cx="50" cy="27" r="5" fill="#c59b27" />
                <circle cx="52" cy="26" r="4" fill="#164e37" />
                <line x1="50" y1="43" x2="50" y2="67" stroke="#164e37" strokeWidth="2" />
              </svg>
            </div>

            <div className="flex flex-col">
              <span className="text-base sm:text-lg font-extrabold text-[#0f231c] tracking-tight leading-tight group-hover:text-[#164e37] transition-colors">
                {SCHOOL_INFO.officialName}
              </span>
              <div className="flex items-center gap-1.5 text-[11px] text-[#164e37] font-medium leading-none mt-0.5">
                <span>{SCHOOL_INFO.localName}</span>
                <span className="text-slate-300">•</span>
                <span className="text-slate-500 font-normal">ഷറഫിയ്യ കോരങ്ങത്ത്</span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                    isActive
                      ? 'text-[#164e37] bg-[#f4f1ea] font-bold'
                      : 'text-slate-700 hover:text-[#164e37] hover:bg-slate-50'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Header Action: Admission Enquiry Button */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={onOpenAdmissionModal}
              className="px-4 py-2 bg-[#164e37] hover:bg-[#0f3b29] text-white text-xs font-bold rounded-lg shadow-xs transition-all flex items-center gap-2 group hover:shadow-sm"
            >
              <GraduationCap className="w-4 h-4 text-[#c59b27] transition-transform group-hover:scale-110" />
              <span>Admission Enquiry</span>
            </button>
          </div>

          {/* Mobile Menu Trigger Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="lg:hidden p-2 rounded-lg text-slate-700 hover:text-[#164e37] hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-[#164e37]"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* 3. Modern Animated Mobile Navigation Sheet */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="lg:hidden w-full bg-white border-b border-[#e5e0d5] shadow-lg overflow-hidden"
          >
            <div className="max-w-7xl mx-auto px-4 py-5 space-y-4">
              {/* Mobile Navigation Links */}
              <div className="grid grid-cols-2 gap-1.5">
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.path;
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={`px-3 py-2.5 rounded-lg text-xs font-semibold flex items-center justify-between transition-colors ${
                        isActive
                          ? 'bg-[#164e37] text-white'
                          : 'bg-[#fbfaf7] text-slate-700 hover:bg-[#f4f1ea]'
                      }`}
                    >
                      <span>{link.name}</span>
                      <ChevronRight className={`w-3 h-3 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                    </Link>
                  );
                })}
              </div>

              {/* Mobile Admission Button */}
              <div className="pt-2 border-t border-[#e5e0d5]">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenAdmissionModal();
                  }}
                  className="w-full py-3 bg-[#164e37] hover:bg-[#0f3b29] text-white text-xs font-bold rounded-lg shadow-xs flex items-center justify-center gap-2"
                >
                  <GraduationCap className="w-4 h-4 text-[#c59b27]" />
                  <span>Online Admission Enquiry</span>
                </button>
              </div>

              {/* Quick Contact info in mobile drawer */}
              <div className="pt-2 text-[11px] text-slate-500 flex justify-between items-center px-1">
                <span>Office: {SCHOOL_INFO.contact.phone}</span>
                <span>Korangath, Tirur</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
