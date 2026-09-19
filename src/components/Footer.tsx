import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, ChevronRight, School } from 'lucide-react';
import { SCHOOL_INFO } from '../data/schoolInfo';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0f2d1f] text-slate-300 border-t-4 border-[#c59b27]">
      {/* Arabic Inscription Bar */}
      <div className="bg-[#0a2016] py-3.5 px-4 text-center border-b border-[#184631]">
        <p className="font-amiri text-lg sm:text-xl text-[#fde68a] tracking-wider" dir="rtl">
          بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
        </p>
      </div>

      {/* Main Footer Directory */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-xs sm:text-sm">
          {/* Column 1: School Identity */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#164e37] border border-[#c59b27] flex items-center justify-center text-white">
                <School className="w-4 h-4 text-[#fde68a]" />
              </div>
              <div>
                <h3 className="font-bold text-white text-sm leading-snug">
                  {SCHOOL_INFO.officialName}
                </h3>
                <p className="text-xs text-[#c59b27] font-semibold">
                  {SCHOOL_INFO.localName}
                </p>
              </div>
            </div>

            <p className="text-slate-300 text-xs leading-relaxed">
              An Islamic educational institution providing authentic Quranic literacy, moral discipline (Akhlaq), and character mentorship in Korangath, Tirur.
            </p>

            <div className="text-[11px] text-emerald-200/90 pt-1 border-t border-[#184631]">
              <p><strong>Board Affiliation:</strong> {SCHOOL_INFO.institutionalDetails.affiliationBoard}</p>
              <p><strong>Registration:</strong> {SCHOOL_INFO.institutionalDetails.registrationNumber}</p>
            </div>
          </div>

          {/* Column 2: Academic Wings */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider text-[#c59b27] border-b border-[#184631] pb-1.5">
              Educational Wings
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <Link to="/departments" className="hover:text-white transition-colors flex items-center gap-1 text-slate-300">
                  <ChevronRight className="w-3 h-3 text-[#c59b27]" />
                  <span>Quranic Studies & Tajweed</span>
                </Link>
              </li>
              <li>
                <Link to="/departments" className="hover:text-white transition-colors flex items-center gap-1 text-slate-300">
                  <ChevronRight className="w-3 h-3 text-[#c59b27]" />
                  <span>Islamic Jurisprudence (Fiqh)</span>
                </Link>
              </li>
              <li>
                <Link to="/departments" className="hover:text-white transition-colors flex items-center gap-1 text-slate-300">
                  <ChevronRight className="w-3 h-3 text-[#c59b27]" />
                  <span>Arabic Language & Grammar</span>
                </Link>
              </li>
              <li>
                <Link to="/departments" className="hover:text-white transition-colors flex items-center gap-1 text-slate-300">
                  <ChevronRight className="w-3 h-3 text-[#c59b27]" />
                  <span>Hadith & Prophetic Biography</span>
                </Link>
              </li>
              <li>
                <Link to="/departments" className="hover:text-white transition-colors flex items-center gap-1 text-slate-300">
                  <ChevronRight className="w-3 h-3 text-[#c59b27]" />
                  <span>Primary Foundation Wing</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Quick Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider text-[#c59b27] border-b border-[#184631] pb-1.5">
              Quick Links
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <Link to="/about" className="hover:text-white transition-colors flex items-center gap-1 text-slate-300">
                  <ChevronRight className="w-3 h-3 text-[#c59b27]" />
                  <span>About Our Institution</span>
                </Link>
              </li>
              <li>
                <Link to="/students" className="hover:text-white transition-colors flex items-center gap-1 text-slate-300">
                  <ChevronRight className="w-3 h-3 text-[#c59b27]" />
                  <span>Student & Parent Services</span>
                </Link>
              </li>
              <li>
                <Link to="/teachers" className="hover:text-white transition-colors flex items-center gap-1 text-slate-300">
                  <ChevronRight className="w-3 h-3 text-[#c59b27]" />
                  <span>Faculty & Muallims</span>
                </Link>
              </li>
              <li>
                <Link to="/events" className="hover:text-white transition-colors flex items-center gap-1 text-slate-300">
                  <ChevronRight className="w-3 h-3 text-[#c59b27]" />
                  <span>Academic Calendar & Notices</span>
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors flex items-center gap-1 text-slate-300">
                  <ChevronRight className="w-3 h-3 text-[#c59b27]" />
                  <span>Admission Enquiry & Directions</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Location & Office */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider text-[#c59b27] border-b border-[#184631] pb-1.5">
              Administrative Office
            </h4>
            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#c59b27] shrink-0 mt-0.5" />
                <span>
                  {SCHOOL_INFO.location.area}, {SCHOOL_INFO.location.city}, {SCHOOL_INFO.location.district} District, Kerala, India
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#c59b27] shrink-0" />
                <span className="font-mono">{SCHOOL_INFO.contact.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#c59b27] shrink-0" />
                <span className="font-mono break-all">{SCHOOL_INFO.contact.email}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{SCHOOL_INFO.contact.officeHours}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Administrative Note */}
        <div className="mt-8 pt-4 border-t border-[#184631] text-[11px] text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <p>
            * Official institutional portal of {SCHOOL_INFO.officialName} ({SCHOOL_INFO.localName}). Information is maintained by the Madrasa Managing Committee.
          </p>
          <p className="text-slate-500">
            Korangath, Tirur • Malappuram, Kerala
          </p>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="bg-[#081810] py-3 text-center text-[11px] text-slate-500 border-t border-[#123625]">
        © {new Date().getFullYear()} {SCHOOL_INFO.officialName}. All rights reserved.
      </div>
    </footer>
  );
};
