import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, BookOpen, Sparkles, Heart, ShieldAlert, ArrowRight } from 'lucide-react';
import { SCHOOL_INFO } from '../data/schoolInfo';
import { IslamicPattern } from './IslamicPattern';

export const Footer: React.FC = () => {
  return (
    <footer className="relative bg-slate-950 text-slate-300 overflow-hidden border-t-2 border-amber-500/40">
      {/* Background Islamic Pattern */}
      <IslamicPattern variant="grid" opacity={0.05} />

      {/* Top Banner with Arabic Calligraphy & Bismillah */}
      <div className="bg-emerald-950/80 border-b border-emerald-900/60 py-6 px-4 text-center relative z-10">
        <p className="font-amiri text-2xl sm:text-3xl text-amber-300/90 tracking-widest mb-1" dir="rtl">
          بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
        </p>
        <p className="font-amiri text-lg text-emerald-200/80 tracking-wide" dir="rtl">
          {SCHOOL_INFO.arabicCalligraphySubtitle}
        </p>
      </div>

      {/* Main Footer Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: School Identity */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-800 text-white flex items-center justify-center border border-amber-400/50 shadow-md">
                <BookOpen className="w-5 h-5 text-amber-300" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base leading-tight">
                  {SCHOOL_INFO.officialName}
                </h3>
                <p className="text-xs text-amber-400 font-semibold tracking-wide">
                  {SCHOOL_INFO.localName}
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Dedicated to cultivating authentic Islamic knowledge, moral integrity (Akhlaq), and compassionate leadership in Korangath, Tirur, Malappuram.
            </p>

            <div className="p-3 bg-emerald-950/60 rounded-xl border border-emerald-800/40">
              <div className="flex items-center gap-1.5 text-xs text-amber-300 font-medium mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Madrassa Motto</span>
              </div>
              <p className="text-xs italic text-slate-300">
                "{SCHOOL_INFO.institutionalDetails.motto}"
              </p>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link to="/" className="text-slate-300 hover:text-amber-300 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-emerald-500" /> Home Overview
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-slate-300 hover:text-amber-300 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-emerald-500" /> About & History
                </Link>
              </li>
              <li>
                <Link to="/departments" className="text-slate-300 hover:text-amber-300 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-emerald-500" /> Educational Wings
                </Link>
              </li>
              <li>
                <Link to="/teachers" className="text-slate-300 hover:text-amber-300 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-emerald-500" /> Teaching Faculty
                </Link>
              </li>
              <li>
                <Link to="/students" className="text-slate-300 hover:text-amber-300 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-emerald-500" /> Student Portal Foundation
                </Link>
              </li>
              <li>
                <Link to="/events" className="text-slate-300 hover:text-amber-300 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-emerald-500" /> Events & Calendar
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-slate-300 hover:text-amber-300 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-emerald-500" /> Campus Gallery
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-300 hover:text-amber-300 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-emerald-500" /> Contact & Admissions
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Location & Campus Details */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              Campus Location
            </h4>
            <div className="space-y-2.5 text-xs sm:text-sm">
              <div className="flex items-start gap-2.5 text-slate-300">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  <strong>{SCHOOL_INFO.officialName}</strong><br />
                  ({SCHOOL_INFO.localName})<br />
                  {SCHOOL_INFO.location.area}, {SCHOOL_INFO.location.city}<br />
                  {SCHOOL_INFO.location.district} District, {SCHOOL_INFO.location.state}, {SCHOOL_INFO.location.country}
                </span>
              </div>

              <div className="flex items-center gap-2.5 text-slate-400 text-xs">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{SCHOOL_INFO.contact.officeHours}</span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                to="/contact"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-300 hover:text-amber-300 transition-colors"
              >
                <span>View Directions & Map Details</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

          {/* Column 4: Contact & Administration Notice */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              Official Desk
            </h4>

            <div className="space-y-2.5 text-xs sm:text-sm">
              <div className="flex items-center gap-2.5 text-slate-300">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="font-mono text-xs">{SCHOOL_INFO.contact.phone}</span>
              </div>

              <div className="flex items-center gap-2.5 text-slate-300">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="font-mono text-xs break-all">{SCHOOL_INFO.contact.email}</span>
              </div>
            </div>

            <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 text-[11px] text-slate-400 flex items-start gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <p>
                <strong>Editorial Notice:</strong> Contact details, staff directories, and academic timetables shown are structured placeholders awaiting official release by the school management.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Credits */}
        <div className="mt-12 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} {SCHOOL_INFO.officialName} ({SCHOOL_INFO.localName}). All rights reserved.
          </div>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Korangath, Tirur, Malappuram</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              Kerala <Heart className="w-3 h-3 text-emerald-500 fill-emerald-500" />
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
