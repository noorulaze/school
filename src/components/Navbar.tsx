import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, MapPin, Phone, Mail, GraduationCap, ChevronRight } from 'lucide-react';
import { SCHOOL_INFO } from '../data/schoolInfo';

interface NavbarProps {
  onOpenAdmissionModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAdmissionModal }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Departments', path: '/departments' },
    { name: 'Teachers', path: '/teachers' },
    { name: 'Students', path: '/students' },
    { name: 'Events & Calendar', path: '/events' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className="w-full bg-white border-b border-[#e5e0d5] text-slate-800 relative z-30">
      {/* 1. TOP UTILITY BAR */}
      <div className="bg-[#0f3424] text-slate-200 text-xs py-1.5 px-4 sm:px-6 border-b border-[#1b5038]">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4 text-[11px] sm:text-xs">
            <span className="flex items-center gap-1.5 text-emerald-300">
              <MapPin className="w-3.5 h-3.5 text-[#c59b27]" />
              <span>{SCHOOL_INFO.location.area}, {SCHOOL_INFO.location.city}, {SCHOOL_INFO.location.district}, Kerala</span>
            </span>
            <span className="hidden md:inline text-slate-400">•</span>
            <span className="hidden md:flex items-center gap-1 text-slate-300">
              <Phone className="w-3 h-3 text-[#c59b27]" />
              <span>Desk: {SCHOOL_INFO.contact.phone}</span>
            </span>
          </div>

          <div className="flex items-center gap-3 text-[11px] sm:text-xs">
            <span className="hidden lg:flex items-center gap-1 text-slate-300">
              <Mail className="w-3 h-3 text-[#c59b27]" />
              <span>{SCHOOL_INFO.contact.email}</span>
            </span>
            <span className="hidden lg:inline text-slate-500">|</span>
            <Link
              to="/students"
              className="text-[#fde68a] hover:text-white font-medium flex items-center gap-1 transition-colors"
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Student & Parent Portal</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 2. INSTITUTION BRANDING HEADER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between gap-4">
        {/* Logo & School Name */}
        <Link to="/" className="flex items-center gap-3.5 sm:gap-4 group">
          {/* Authentic School Seal / Crest */}
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-[#164e37] text-white flex items-center justify-center shrink-0 border-2 border-[#c59b27] shadow-xs relative overflow-hidden">
            <svg viewBox="0 0 100 100" className="w-11 h-11">
              <circle cx="50" cy="50" r="46" fill="none" stroke="#c59b27" strokeWidth="2" strokeDasharray="3 2" />
              <path d="M24 64 C36 58, 45 61, 50 67 C55 61, 64 58, 76 64 L76 38 C64 34, 55 37, 50 43 C45 37, 36 34, 24 38 Z" fill="#ffffff" />
              <circle cx="50" cy="27" r="6" fill="#c59b27" />
              <circle cx="52" cy="26" r="5" fill="#164e37" />
              <line x1="50" y1="43" x2="50" y2="67" stroke="#164e37" strokeWidth="2" />
            </svg>
          </div>

          <div className="flex flex-col">
            <div className="flex items-baseline gap-2 flex-wrap">
              <h1 className="text-lg sm:text-2xl font-extrabold tracking-tight text-[#0f231c] leading-tight group-hover:text-[#164e37] transition-colors">
                {SCHOOL_INFO.officialName}
              </h1>
            </div>

            <div className="flex items-center gap-2 flex-wrap mt-0.5">
              <span className="text-xs sm:text-sm font-semibold text-[#164e37]">
                {SCHOOL_INFO.localName}
              </span>
              <span className="text-xs text-slate-400 font-normal">|</span>
              <span className="text-[11px] sm:text-xs font-normal text-slate-600">
                ഷറഫുൽ ഇസ്‌ലാം മദ്രസ, കോരങ്ങത്ത്, തിരൂർ
              </span>
            </div>

            <p className="font-amiri text-xs text-slate-500 mt-0.5 tracking-wide" dir="rtl">
              {SCHOOL_INFO.arabicCalligraphySubtitle}
            </p>
          </div>
        </Link>

        {/* Right CTA / Admission Desk Indicator */}
        <div className="hidden md:flex items-center gap-3">
          <div className="text-right hidden xl:block">
            <p className="text-xs font-semibold text-slate-700">Academic Year 2025–2026</p>
            <p className="text-[11px] text-emerald-800 font-medium">Admissions Open</p>
          </div>

          <button
            onClick={onOpenAdmissionModal}
            className="px-4 py-2 bg-[#164e37] hover:bg-[#0f3b29] text-white text-xs sm:text-sm font-semibold rounded-lg shadow-xs transition-colors flex items-center gap-1.5"
          >
            <span>Admission Enquiry</span>
            <ChevronRight className="w-4 h-4 text-[#c59b27]" />
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={onOpenAdmissionModal}
            className="px-2.5 py-1.5 bg-[#164e37] text-white text-xs font-semibold rounded-md"
          >
            Enquiry
          </button>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* 3. PRIMARY NAVIGATION BAR */}
      <nav className="hidden md:block bg-[#164e37] text-white shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          <div className="flex items-center space-x-1 py-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-2 text-xs sm:text-sm font-medium rounded-md transition-colors relative ${
                    isActive
                      ? 'text-white bg-[#0f3424] font-semibold'
                      : 'text-slate-100 hover:text-white hover:bg-[#124432]'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#c59b27]" />
                  )}
                </Link>
              );
            })}
          </div>

          <div className="text-[11px] text-emerald-200/90 font-medium hidden lg:block">
            Affiliation: {SCHOOL_INFO.institutionalDetails.affiliationBoard}
          </div>
        </div>
      </nav>

      {/* 4. MOBILE NAVIGATION DRAWER */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-2 shadow-lg">
          <div className="p-2 bg-emerald-50 rounded-lg text-xs text-emerald-950 font-medium mb-3">
            <p className="font-bold">{SCHOOL_INFO.officialName}</p>
            <p className="text-slate-600 text-[11px]">{SCHOOL_INFO.location.area}, {SCHOOL_INFO.location.city}</p>
          </div>

          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-[#164e37] text-white font-semibold'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                {link.name}
              </Link>
            );
          })}

          <div className="pt-3 border-t border-slate-200 flex flex-col gap-2">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenAdmissionModal();
              }}
              className="w-full py-2 px-3 bg-[#164e37] text-white text-xs font-bold rounded-lg text-center"
            >
              Online Admission Enquiry
            </button>
            <Link
              to="/students"
              className="w-full py-2 px-3 bg-amber-50 text-amber-900 border border-amber-200 text-xs font-bold rounded-lg text-center"
            >
              Student Portal Access
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
