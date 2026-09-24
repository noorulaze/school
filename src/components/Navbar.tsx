import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, GraduationCap, ChevronRight, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  onOpenAdmissionModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAdmissionModal }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(64);
  const headerRef = useRef<HTMLElement>(null);
  const location = useLocation();

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const update = () => {
      if (headerRef.current) setHeaderHeight(headerRef.current.offsetHeight);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [isScrolled]);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 15);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) setIsMobileMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Academics', path: '/departments', alias: ['/academics', '/departments'] },
    { name: 'Teachers', path: '/teachers' },
    { name: 'Students', path: '/students' },
    { name: 'Events', path: '/events' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Admissions', path: '/admissions' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string, alias?: string[]) => {
    if (path === '/') return location.pathname === '/';
    if (alias?.some((a) => location.pathname === a || location.pathname.startsWith(a + '/'))) return true;
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <header
      ref={headerRef}
      className={`sticky top-0 z-50 w-full transition-all duration-300 ease-in-out ${
        isScrolled
          ? 'bg-[#0e3827]/98 sm:bg-white/98 backdrop-blur-md border-b border-[#164e37] sm:border-[#ded8cc] shadow-[0_2px_14px_-4px_rgba(15,35,28,0.18)] sm:shadow-[0_2px_14px_-4px_rgba(15,35,28,0.08)] py-1.5 sm:py-2 lg:py-2.5'
          : 'bg-[#0e3827] sm:bg-[#fbfaf7] border-b border-[#164e37] sm:border-[#e5e0d5] py-2 sm:py-2.5 lg:py-3'
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 xl:px-10 flex items-center justify-between gap-2">
        {/* Logo + Name */}
        <Link
          to="/"
          aria-label="Sharafiyya English Medium School Home"
          className="flex items-center gap-2 sm:gap-2.5 group shrink min-w-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c59b27] sm:focus-visible:ring-[#164e37] rounded-lg p-0.5"
        >
          {/* Crest */}
          <div className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-xl bg-[#164e37] flex items-center justify-center shrink-0 border border-[#c59b27]/80 sm:border-[#c59b27]/50 shadow-xs transition-transform duration-300 group-hover:scale-105 overflow-hidden">
            <svg viewBox="0 0 100 100" className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7" aria-hidden="true">
              <circle cx="50" cy="50" r="46" fill="none" stroke="#c59b27" strokeWidth="2.5" strokeDasharray="3 2" />
              <path d="M24 64 C36 58, 45 61, 50 67 C55 61, 64 58, 76 64 L76 38 C64 34, 55 37, 50 43 C45 37, 36 34, 24 38 Z" fill="#ffffff" />
              <circle cx="50" cy="27" r="5" fill="#c59b27" />
              <circle cx="52" cy="26" r="4" fill="#164e37" />
              <line x1="50" y1="43" x2="50" y2="67" stroke="#164e37" strokeWidth="2.5" />
            </svg>
          </div>

          {/* Text */}
          <div className="flex flex-col min-w-0">
            <span className="text-xs sm:text-sm font-extrabold text-white sm:text-[#0f231c] tracking-tight leading-tight group-hover:text-amber-200 sm:group-hover:text-[#164e37] transition-colors truncate">
              Sharafiyya English Medium School
            </span>
            <span className="text-[9px] sm:text-[10px] text-[#c59b27] sm:text-[#164e37] font-semibold sm:font-medium leading-none tracking-wide mt-0.5 truncate">
              Korangath, Tirur · Islamic School
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1" aria-label="Main Navigation">
          {navLinks.map((link) => {
            const active = isActive(link.path, link.alias);
            return (
              <Link
                key={link.name}
                to={link.path}
                aria-current={active ? 'page' : undefined}
                className={`relative px-2.5 xl:px-3 py-1.5 rounded-lg text-[11px] xl:text-xs font-semibold tracking-wide transition-all duration-200 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#164e37] ${
                  active
                    ? 'text-[#164e37] bg-[#164e37]/8 font-bold'
                    : 'text-slate-600 hover:text-[#164e37] hover:bg-[#164e37]/5'
                }`}
              >
                {link.name}
                {active && (
                  <span className="absolute bottom-0 left-2.5 right-2.5 h-[2px] bg-[#c59b27] rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right: CTA + Mobile toggle */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Mobile compact student icon */}
          <Link
            to="/student/login"
            aria-label="Student Portal"
            className="sm:hidden p-2 rounded-xl bg-white/10 text-white border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            <User className="w-4 h-4 text-amber-300" />
          </Link>

          {/* Desktop/Tablet Student button */}
          <Link
            to="/student/login"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 bg-[#f4f9f6] hover:bg-[#e6f2ec] text-[#164e37] text-[11px] xl:text-xs font-bold rounded-xl border border-[#cbe3d5] shadow-2xs hover:shadow-xs transition-all duration-200 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#164e37]"
          >
            <User className="w-3.5 h-3.5 text-[#164e37]" />
            <span>Student Login</span>
          </Link>

          <button
            type="button"
            onClick={onOpenAdmissionModal}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 xl:px-4 py-2 bg-[#164e37] hover:bg-[#0f3b29] text-white text-[11px] xl:text-xs font-bold rounded-xl border border-[#c59b27]/30 shadow-sm hover:shadow-md transition-all duration-200 group whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c59b27]"
          >
            <GraduationCap className="w-3.5 h-3.5 text-[#c59b27] group-hover:scale-110 transition-transform shrink-0" />
            <span>Admission Enquiry</span>
          </button>

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-nav"
            className="lg:hidden p-2 rounded-xl text-white sm:text-slate-700 hover:text-amber-200 sm:hover:text-[#164e37] hover:bg-white/10 sm:hover:bg-[#164e37]/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c59b27] sm:focus-visible:ring-[#164e37]"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5 text-amber-300 sm:text-[#164e37]" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <div
            id="mobile-nav"
            style={{ top: `${headerHeight}px` }}
            className="lg:hidden fixed inset-x-0 bottom-0 z-40 bg-black/40"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="w-full bg-[#fbfaf7] border-b border-[#e5e0d5] shadow-xl max-h-[calc(100dvh-64px)] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="max-w-7xl mx-auto px-4 py-5 space-y-3">
                <nav className="grid grid-cols-2 gap-2" aria-label="Mobile Navigation">
                  {navLinks.map((link) => {
                    const active = isActive(link.path, link.alias);
                    return (
                      <Link
                        key={link.name}
                        to={link.path}
                        aria-current={active ? 'page' : undefined}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`px-3.5 py-3 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#164e37] ${
                          active
                            ? 'bg-[#164e37] text-white shadow-sm'
                            : 'bg-white text-slate-800 hover:bg-[#f4f1ea] border border-[#eee9df]'
                        }`}
                      >
                        <span>{link.name}</span>
                        <ChevronRight className={`w-3.5 h-3.5 ${active ? 'text-[#c59b27]' : 'text-slate-400'}`} />
                      </Link>
                    );
                  })}
                </nav>

                <div className="pt-3 border-t border-[#e5e0d5] space-y-2">
                  <Link
                    to="/student/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full py-2.5 px-4 bg-[#f4f9f6] hover:bg-[#e6f2ec] text-[#164e37] text-xs font-bold rounded-xl border border-[#cbe3d5] flex items-center justify-center gap-2 transition-colors"
                  >
                    <User className="w-4 h-4 text-[#164e37]" />
                    <span>Student Login</span>
                  </Link>

                  <button
                    type="button"
                    onClick={() => { setIsMobileMenuOpen(false); onOpenAdmissionModal(); }}
                    className="w-full py-3 px-4 bg-[#164e37] hover:bg-[#0f3b29] text-white text-xs font-bold rounded-xl border border-[#c59b27]/30 flex items-center justify-center gap-2 transition-colors"
                  >
                    <GraduationCap className="w-4 h-4 text-[#c59b27]" />
                    <span>Admission Enquiry</span>
                  </button>
                  <p className="text-center text-[11px] text-slate-400 pb-1">
                    Sharafiyya English Medium School · Korangath, Tirur
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </header>
  );
};
