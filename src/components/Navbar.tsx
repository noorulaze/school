import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, GraduationCap, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SCHOOL_INFO } from '../data/schoolInfo';

interface NavbarProps {
  onOpenAdmissionModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAdmissionModal }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(64);
  const headerRef = useRef<HTMLElement>(null);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Update header height when scrolled or resized
  useEffect(() => {
    const updateHeight = () => {
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.offsetHeight);
      }
    };
    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, [isScrolled]);

  // Track scroll position for header background transition
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Academics', path: '/departments', alias: ['/academics', '/departments'] },
    { name: 'Teachers', path: '/teachers' },
    { name: 'Students', path: '/students' },
    { name: 'Events', path: '/events' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
  ];

  const isLinkActive = (path: string, alias?: string[]) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    if (alias && alias.some((a) => location.pathname === a || location.pathname.startsWith(a + '/'))) {
      return true;
    }
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <header
      ref={headerRef}
      className={`sticky top-0 z-50 w-full transition-all duration-300 ease-in-out ${
        isScrolled
          ? 'bg-white/98 backdrop-blur-md border-b border-[#ded8cc] shadow-[0_2px_12px_-2px_rgba(15,35,28,0.06)] py-2.5'
          : 'bg-[#fbfaf7] border-b border-[#e5e0d5] py-3 sm:py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* LEFT: School Logo & Institutional Identity */}
        <Link
          to="/"
          aria-label={`${SCHOOL_INFO.officialName} (${SCHOOL_INFO.localName}) Home`}
          className="flex items-center gap-3 group shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#164e37] rounded-lg p-1 -m-1"
        >
          {/* School Logo Placeholder Crest */}
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-[#164e37] text-white flex items-center justify-center shrink-0 border border-[#c59b27]/60 shadow-2xs relative overflow-hidden transition-transform duration-300 group-hover:scale-105">
            <svg viewBox="0 0 100 100" className="w-7 h-7 sm:w-8 sm:h-8" aria-hidden="true">
              <circle cx="50" cy="50" r="46" fill="none" stroke="#c59b27" strokeWidth="2.5" strokeDasharray="3 2" />
              <path
                d="M24 64 C36 58, 45 61, 50 67 C55 61, 64 58, 76 64 L76 38 C64 34, 55 37, 50 43 C45 37, 36 34, 24 38 Z"
                fill="#ffffff"
              />
              <circle cx="50" cy="27" r="5" fill="#c59b27" />
              <circle cx="52" cy="26" r="4" fill="#164e37" />
              <line x1="50" y1="43" x2="50" y2="67" stroke="#164e37" strokeWidth="2.5" />
            </svg>
          </div>

          {/* School Name & Local Identifier */}
          <div className="flex flex-col">
            <span className="text-sm sm:text-base font-extrabold text-[#0f231c] tracking-tight leading-snug group-hover:text-[#164e37] transition-colors">
              {SCHOOL_INFO.officialName}
            </span>
            <span className="text-[11px] sm:text-xs text-[#164e37] font-medium leading-none tracking-wide mt-0.5">
              {SCHOOL_INFO.localName}
            </span>
          </div>
        </Link>

        {/* CENTER: Desktop Navigation */}
        <nav
          className="hidden lg:flex items-center gap-1 xl:gap-1.5"
          aria-label="Main Navigation"
          role="menubar"
        >
          {navLinks.map((link) => {
            const active = isLinkActive(link.path, link.alias);
            return (
              <Link
                key={link.name}
                to={link.path}
                role="menuitem"
                aria-current={active ? 'page' : undefined}
                className={`relative px-2.5 xl:px-3 py-1.5 rounded-md text-xs font-semibold tracking-wide transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#164e37] focus-visible:ring-offset-1 ${
                  active
                    ? 'text-[#164e37] bg-[#164e37]/8 font-bold'
                    : 'text-slate-700 hover:text-[#164e37] hover:bg-[#164e37]/5'
                }`}
              >
                <span>{link.name}</span>
                {active && (
                  <span
                    aria-hidden="true"
                    className="absolute bottom-0 left-2.5 right-2.5 h-[2px] bg-[#c59b27] rounded-full"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* RIGHT: Primary Action & Mobile Toggle */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          {/* Admission Enquiry Primary Button */}
          <button
            type="button"
            onClick={onOpenAdmissionModal}
            className="hidden sm:inline-flex items-center gap-2 px-3.5 xl:px-4 py-2 bg-[#164e37] hover:bg-[#0f3b29] text-white text-xs font-bold rounded-lg border border-[#c59b27]/30 shadow-2xs hover:shadow-xs transition-all duration-200 group active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c59b27] focus-visible:ring-offset-2"
          >
            <GraduationCap className="w-3.5 h-3.5 text-[#c59b27] transition-transform duration-200 group-hover:scale-110" />
            <span>Admission Enquiry</span>
          </button>

          {/* Mobile Hamburger Menu Toggle */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-nav-panel"
            className="lg:hidden p-2 rounded-lg text-slate-700 hover:text-[#164e37] hover:bg-[#164e37]/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#164e37] focus-visible:ring-offset-1"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6 text-[#164e37]" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* MOBILE NAVIGATION DRAWER */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <div
            id="mobile-nav-panel"
            style={{ top: `${headerHeight}px` }}
            className="lg:hidden fixed inset-x-0 bottom-0 z-40 bg-black/40 backdrop-blur-none"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="w-full bg-[#fbfaf7] border-b border-[#e5e0d5] shadow-xl max-h-[calc(100vh-64px)] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 space-y-4">
                {/* Navigation Links list */}
                <nav className="grid grid-cols-1 sm:grid-cols-2 gap-1.5" aria-label="Mobile Navigation">
                  {navLinks.map((link) => {
                    const active = isLinkActive(link.path, link.alias);
                    return (
                      <Link
                        key={link.name}
                        to={link.path}
                        aria-current={active ? 'page' : undefined}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`px-3.5 py-3 rounded-lg text-xs font-semibold flex items-center justify-between transition-colors min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#164e37] ${
                          active
                            ? 'bg-[#164e37] text-white shadow-2xs font-bold'
                            : 'bg-white text-slate-800 hover:bg-[#f4f1ea] border border-[#eee9df]'
                        }`}
                      >
                        <span>{link.name}</span>
                        <ChevronRight className={`w-3.5 h-3.5 ${active ? 'text-[#c59b27]' : 'text-slate-400'}`} />
                      </Link>
                    );
                  })}
                </nav>

                {/* Admission Button in Drawer */}
                <div className="pt-2 border-t border-[#e5e0d5] space-y-3">
                  <button
                    type="button"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      onOpenAdmissionModal();
                    }}
                    className="w-full py-3 px-4 bg-[#164e37] hover:bg-[#0f3b29] text-white text-xs font-bold rounded-lg border border-[#c59b27]/30 shadow-xs flex items-center justify-center gap-2 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c59b27]"
                  >
                    <GraduationCap className="w-4 h-4 text-[#c59b27]" />
                    <span>Admission Enquiry</span>
                  </button>

                  {/* Institution Location Subtitle */}
                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 px-1">
                    <span className="font-medium text-slate-700">Sharafiyya Korangath</span>
                    <span>Korangath, Tirur, Malappuram</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </header>
  );
};
