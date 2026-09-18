import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, MapPin, Phone, GraduationCap, Sparkles, BookOpen, Clock } from 'lucide-react';
import { SCHOOL_INFO } from '../data/schoolInfo';

interface NavbarProps {
  onOpenAdmissionModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAdmissionModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

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
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Top Utility Bar */}
      <div className="bg-slate-900 text-slate-200 text-xs py-1.5 px-4 sm:px-6 border-b border-emerald-800/40">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-emerald-300">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>{SCHOOL_INFO.location.area}, {SCHOOL_INFO.location.city}, {SCHOOL_INFO.location.district}</span>
            </div>
            <div className="hidden md:flex items-center gap-1.5 text-slate-300">
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              <span>Office Hours: 7:30 AM – 5:30 PM</span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-[11px] sm:text-xs">
            <div className="flex items-center gap-1 text-slate-300">
              <Phone className="w-3 h-3 text-amber-400" />
              <span className="hidden sm:inline">Official Desk:</span>
              <span className="text-amber-300 font-mono">[Contact Pending]</span>
            </div>
            <div className="h-3 w-px bg-slate-700 hidden sm:block" />
            <Link
              to="/students"
              className="text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1 transition-colors"
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Portal Access</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav
        className={`w-full transition-all duration-300 border-b ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md border-emerald-100 py-2.5'
            : 'bg-white border-slate-200/80 py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Logo & School Identity */}
          <Link to="/" className="flex items-center gap-3 group">
            {/* Custom Crest Emblem */}
            <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-950 p-2 text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-300 border border-amber-400/40">
              <BookOpen className="w-6 h-6 text-white" />
              <div className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-amber-400 flex items-center justify-center shadow-xs">
                <Sparkles className="w-2 h-2 text-emerald-950" />
              </div>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight leading-tight group-hover:text-emerald-800 transition-colors">
                  {SCHOOL_INFO.officialName}
                </span>
              </div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-xs font-semibold text-emerald-700 tracking-wider">
                  {SCHOOL_INFO.localName}
                </span>
                <span className="text-[10px] text-slate-400 font-normal">|</span>
                <span className="text-[11px] text-slate-500 font-normal">
                  {SCHOOL_INFO.location.area}, {SCHOOL_INFO.location.city}
                </span>
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
                  className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-all ${
                    isActive
                      ? 'text-emerald-900 bg-emerald-50/90 font-semibold shadow-2xs border border-emerald-200/60'
                      : 'text-slate-600 hover:text-emerald-800 hover:bg-slate-50'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Desktop Right Action Buttons */}
          <div className="hidden md:flex items-center gap-2.5">
            <button
              onClick={onOpenAdmissionModal}
              className="px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-emerald-800 to-emerald-900 hover:from-emerald-900 hover:to-emerald-950 rounded-xl transition-all shadow-sm hover:shadow-md border border-emerald-700/40 flex items-center gap-1.5"
            >
              <span>Admission Enquiry</span>
            </button>

            <Link
              to="/students"
              className="px-3.5 py-2 text-xs sm:text-sm font-semibold text-emerald-900 bg-amber-400/20 hover:bg-amber-400/30 border border-amber-400/50 rounded-xl transition-all flex items-center gap-1.5"
            >
              <GraduationCap className="w-4 h-4 text-emerald-800" />
              <span>Student Portal</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={onOpenAdmissionModal}
              className="md:hidden px-2.5 py-1.5 text-xs font-semibold text-white bg-emerald-800 rounded-lg"
            >
              Enquire
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:text-emerald-900 hover:bg-slate-100 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown / Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white/98 backdrop-blur-lg px-4 pt-3 pb-6 space-y-1 shadow-xl animate-in slide-in-from-top duration-200">
            <div className="p-2 mb-2 bg-emerald-50/80 rounded-xl border border-emerald-100 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-emerald-950">{SCHOOL_INFO.officialName}</p>
                <p className="text-[11px] text-emerald-700">{SCHOOL_INFO.localName} • {SCHOOL_INFO.location.area}</p>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-200/70 text-emerald-900 font-semibold">
                Tirur
              </span>
            </div>

            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? 'text-emerald-900 bg-emerald-100/70 font-semibold'
                      : 'text-slate-700 hover:text-emerald-800 hover:bg-slate-50'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}

            <div className="pt-4 border-t border-slate-100 flex flex-col gap-2">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenAdmissionModal();
                }}
                className="w-full py-2.5 px-4 text-center text-sm font-semibold text-white bg-emerald-800 rounded-xl shadow-xs"
              >
                Admission Enquiry
              </button>

              <Link
                to="/students"
                className="w-full py-2.5 px-4 text-center text-sm font-semibold text-emerald-900 bg-amber-400/25 border border-amber-400/50 rounded-xl flex items-center justify-center gap-1.5"
              >
                <GraduationCap className="w-4 h-4" />
                <span>Student Portal Foundation</span>
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
