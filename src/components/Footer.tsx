import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, GraduationCap } from 'lucide-react';

export const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  const quickLinks = [
    { name: 'About Us', path: '/about' },
    { name: 'Academics', path: '/departments' },
    { name: 'Faculty & Staff', path: '/teachers' },
    { name: 'Student Login', path: '/student/login' },
    { name: 'Events & Calendar', path: '/events' },
    { name: 'Photo Gallery', path: '/gallery' },
    { name: 'Admissions', path: '/admissions' },
    { name: 'Contact Office', path: '/contact' },
  ];

  const programmes = [
    "Qur'an & Tajweed",
    'Islamic Studies (Fiqh)',
    'Arabic Language',
    'Moral Education',
    'Daily Azkar & Sunnah',
  ];

  return (
    <footer className="w-full bg-[#0b2118] text-slate-300 border-t-2 border-[#c59b27]">
      {/* Bismillah bar */}
      <div className="py-4 bg-[#081912] border-b border-[#1a3d2b] text-center px-4">
        <p className="font-amiri text-xl text-[#d4af37] tracking-wider" dir="rtl">
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </p>
        <p className="text-[11px] text-emerald-200/70 mt-1 uppercase tracking-widest font-medium">
          Sharafiyya English Medium School · Islamic Education · Korangath, Niramaruthur
        </p>
      </div>

      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 py-10 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">

          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#164e37] flex items-center justify-center shrink-0 border border-[#c59b27]/50">
                <GraduationCap className="w-5 h-5 text-[#c59b27]" />
              </div>
              <div>
                <h3 className="text-white font-extrabold text-sm tracking-tight leading-snug">
                  Sharafiyya English Medium School
                </h3>
                <p className="text-[11px] text-emerald-300/80 font-medium mt-0.5">
                  Islamic English Medium School · Korangath, Niramaruthur
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Nurturing young minds through authentic Quranic education, Islamic values, and modern learning
              at Korangath, Niramaruthur, Tirur, Malappuram, Kerala.
            </p>

            <div className="p-3.5 rounded-xl bg-[#112a1e] border border-[#1e4d3b] text-[11px] text-emerald-200/80 space-y-1">
              <p><span className="text-slate-400">Location:</span> Korangath, Niramaruthur, Tirur, Malappuram, Kerala</p>
              <p><span className="text-slate-400">Type:</span> Islamic English Medium School</p>
            </div>
          </div>

          {/* Quick links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider border-b border-[#1e4d3b] pb-2">
              Quick Links
            </h4>
            <ul className="space-y-1.5">
              {quickLinks.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white hover:translate-x-1 transition-all duration-150 min-h-[32px] py-0.5"
                  >
                    <ArrowRight className="w-3 h-3 text-[#c59b27] shrink-0" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programmes */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider border-b border-[#1e4d3b] pb-2">
              Programmes
            </h4>
            <ul className="space-y-2">
              {programmes.map((p) => (
                <li key={p} className="flex items-center gap-2 text-xs text-slate-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c59b27] shrink-0" />
                  {p}
                </li>
              ))}
            </ul>
          </div>

          {/* Admissions CTA */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider border-b border-[#1e4d3b] pb-2">
              Admissions
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Enquiries for new admissions are welcome. Contact the administrative office for details on
              eligibility and the enrolment process.
            </p>
            <Link
              to="/admissions"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#164e37] hover:bg-[#0f3b29] text-white text-xs font-bold rounded-xl border border-[#c59b27]/30 transition-all group shadow-sm"
            >
              <GraduationCap className="w-3.5 h-3.5 text-[#c59b27]" />
              <span>Admission Enquiry</span>
              <ArrowRight className="w-3 h-3 text-[#c59b27] group-hover:translate-x-1 transition-transform" />
            </Link>
            <div className="pt-1">
              <p className="text-[11px] text-slate-500">
                Contact: <span className="text-slate-400">[Office details to be updated]</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#1a3d2b] py-4 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-500">
          <p>
            © {year} Sharafiyya English Medium School, Korangath. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link to="/about" className="hover:text-slate-300 transition-colors">About</Link>
            <Link to="/contact" className="hover:text-slate-300 transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
