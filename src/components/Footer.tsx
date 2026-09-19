import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, ArrowRight, Shield } from 'lucide-react';
import { SCHOOL_INFO } from '../data/schoolInfo';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#0d281e] text-slate-300 border-t-2 border-[#c59b27]">
      {/* 1. Traditional Bismillah Inscription Bar */}
      <div className="py-5 bg-[#0a2018] border-b border-[#1b4332] text-center px-4">
        <p className="font-amiri text-lg sm:text-xl text-[#d4af37] tracking-wider" dir="rtl">
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </p>
        <p className="text-[11px] text-emerald-200/80 mt-1 uppercase tracking-widest font-semibold">
          Sharaful Islam Madrassa • Sharafiyya Korangath • Korangath, Tirur
        </p>
      </div>

      {/* 2. Main 4-Column Directory */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Col 1: Institutional Profile (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#164e37] text-white flex items-center justify-center shrink-0 border border-[#c59b27]">
                <Shield className="w-5 h-5 text-[#c59b27]" />
              </div>
              <div>
                <h3 className="text-white font-extrabold text-base tracking-tight leading-tight">
                  {SCHOOL_INFO.officialName}
                </h3>
                <p className="text-xs text-emerald-300 font-medium">
                  {SCHOOL_INFO.localName} <span className="text-slate-400 font-normal">(ഷറഫിയ്യ കോരങ്ങത്ത്)</span>
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Dedicated Islamic educational institution in Korangath, Tirur, providing authentic religious education, Quranic literacy, and moral guidance to nurture knowledgeable, upright students.
            </p>

            <div className="p-3 rounded-lg bg-[#123628] border border-[#1e4d3b] text-[11px] text-emerald-200/90 space-y-1">
              <p><strong>Board:</strong> {SCHOOL_INFO.institutionalDetails.affiliationBoard}</p>
              <p><strong>Locality:</strong> Korangath, Tirur, Malappuram, Kerala</p>
            </div>
          </div>

          {/* Col 2: Quick Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider border-b border-[#1b4332] pb-2">
              Institution Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              {[
                { name: 'About Our Institution', path: '/about' },
                { name: 'Curriculum & Departments', path: '/departments' },
                { name: 'Faculty & Muallims Directory', path: '/teachers' },
                { name: 'Student Services & Portal', path: '/students' },
                { name: 'Events & Academic Calendar', path: '/events' },
                { name: 'Campus Photo Gallery', path: '/gallery' },
                { name: 'Contact Administrative Office', path: '/contact' },
              ].map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="hover:text-white hover:translate-x-1 transition-all inline-flex items-center gap-1.5 text-slate-300"
                  >
                    <ArrowRight className="w-3 h-3 text-[#c59b27]" />
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Academic Streams (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider border-b border-[#1b4332] pb-2">
              Academic Streams
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c59b27]" />
                <span>Islamic Studies (Fiqh)</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c59b27]" />
                <span>Qur’an & Tajweed</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c59b27]" />
                <span>Arabic Language</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c59b27]" />
                <span>General & Moral Studies</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c59b27]" />
                <span>Daily Azkar & Sunnah</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Campus Desk & Transit (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider border-b border-[#1b4332] pb-2">
              Campus & Office Desk
            </h4>
            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#c59b27] shrink-0 mt-0.5" />
                <span>Korangath, Tirur, Malappuram District, Kerala – 676101</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#c59b27] shrink-0" />
                <span>Desk: {SCHOOL_INFO.contact.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#c59b27] shrink-0" />
                <span>{SCHOOL_INFO.contact.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#c59b27] shrink-0" />
                <span>Office: {SCHOOL_INFO.contact.officeHours}</span>
              </div>
              <div className="pt-2 text-[11px] text-slate-400 border-t border-[#1b4332]">
                <p>Transit: ~3.5 km from Tirur Railway Station</p>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Sub-footer & Non-fabrication Statement */}
        <div className="mt-10 pt-6 border-t border-[#1b4332] flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left text-[11px] text-slate-400">
          <p>
            © {new Date().getFullYear()} {SCHOOL_INFO.officialName} ({SCHOOL_INFO.localName}). All rights reserved.
          </p>
          <p className="text-[10px] text-emerald-300/80">
            Korangath, Tirur, Malappuram, Kerala, India • Official Institutional Website
          </p>
        </div>
      </div>
    </footer>
  );
};
