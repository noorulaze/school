import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Clock,
  Calendar,
  ChevronRight,
  GraduationCap,
  CheckCircle,
  FileText,
  Building,
  School
} from 'lucide-react';
import { SCHOOL_INFO } from '../data/schoolInfo';
import { EVENTS } from '../data/events';
import { PlaceholderBadge } from '../components/PlaceholderBadge';
import { NoticeTicker } from '../components/NoticeTicker';

interface HomeProps {
  onOpenAdmissionModal: () => void;
}

export const Home: React.FC<HomeProps> = ({ onOpenAdmissionModal }) => {
  const [quickContactSent, setQuickContactSent] = useState(false);
  const [quickForm, setQuickForm] = useState({ name: '', phone: '', message: '' });

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setQuickContactSent(true);
  };

  return (
    <div className="w-full flex flex-col bg-[#fbfaf7]">
      {/* Official Notice Ticker */}
      <NoticeTicker onOpenAdmissionModal={onOpenAdmissionModal} />

      {/* 1. WELCOME & SCHOOL INTRODUCTION */}
      <section className="bg-white border-b border-[#e5e0d5] py-10 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#f4f1ea] border border-[#d2cabb] text-xs font-semibold text-[#164e37]">
                <School className="w-3.5 h-3.5 text-[#c59b27]" />
                <span>Official Institution Portal • Korangath, Tirur</span>
              </div>

              <div className="space-y-1">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0f231c] tracking-tight">
                  {SCHOOL_INFO.officialName}
                </h1>
                <p className="text-base sm:text-lg font-semibold text-[#164e37]">
                  Affiliated Locally as {SCHOOL_INFO.localName} <span className="font-normal text-slate-500 text-sm">(ഷറഫിയ്യ കോരങ്ങത്ത്)</span>
                </p>
                <p className="font-amiri text-sm text-slate-600 pt-0.5" dir="rtl">
                  {SCHOOL_INFO.arabicCalligraphySubtitle}
                </p>
              </div>

              <div className="text-sm text-slate-700 leading-relaxed space-y-2 max-w-2xl">
                <p>
                  <strong>Sharaful Islam Madrassa</strong> is a dedicated Islamic educational institution situated in Korangath, Tirur, Malappuram District, Kerala. Known locally and held in high esteem as <strong>Sharafiyya Korangath</strong>, our institution has been serving the community by nurturing young minds with authentic religious education and noble Islamic character.
                </p>
                <p>
                  Our curriculum combines Quranic recitation with Tajweed, Islamic jurisprudence (Fiqh), Arabic literacy, and moral guidance (Akhlaq), structured with convenient morning and evening batches that support students attending regular daytime schools.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={onOpenAdmissionModal}
                  className="px-5 py-2.5 bg-[#164e37] hover:bg-[#0f3b29] text-white text-xs sm:text-sm font-bold rounded-lg shadow-xs transition-colors flex items-center gap-2"
                >
                  <GraduationCap className="w-4 h-4 text-[#c59b27]" />
                  <span>Admission Enquiry</span>
                </button>

                <Link
                  to="/about"
                  className="px-5 py-2.5 bg-[#f4f1ea] hover:bg-[#eae5da] text-slate-800 border border-[#d2cabb] text-xs sm:text-sm font-semibold rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <span>About Our Institution</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                </Link>

                <Link
                  to="/students"
                  className="px-5 py-2.5 bg-white hover:bg-slate-50 text-[#164e37] border border-[#164e37] text-xs sm:text-sm font-semibold rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <Clock className="w-4 h-4 text-[#c59b27]" />
                  <span>Class Timetable</span>
                </Link>
              </div>

              <div className="pt-3 border-t border-[#e5e0d5] text-xs text-slate-600 flex flex-wrap gap-4">
                <span><strong>Location:</strong> Korangath, Tirur, Malappuram</span>
                <span><strong>Batches:</strong> Morning & Evening</span>
                <span><strong>Board:</strong> {SCHOOL_INFO.institutionalDetails.affiliationBoard}</span>
              </div>
            </div>

            {/* Campus Photo Placeholder */}
            <div className="lg:col-span-5">
              <div className="rounded-xl border border-[#d2cabb] bg-[#f4f1ea] p-4 shadow-2xs space-y-3">
                <div className="aspect-4/3 rounded-lg bg-[#e9e4d8] border border-[#d2cabb] flex flex-col items-center justify-center p-6 text-center">
                  <Building className="w-10 h-10 text-[#164e37] mb-2" />
                  <p className="text-xs font-bold text-slate-800">
                    Campus Premises & Assembly Grounds
                  </p>
                  <p className="text-[11px] text-slate-500 mt-1 max-w-xs">
                    [Campus Photograph Placeholder — Official photo to be uploaded by the administration]
                  </p>
                  <div className="mt-3">
                    <PlaceholderBadge label="Official Photo Slot" size="sm" />
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-600 px-1">
                  <span>Sharaful Islam Madrassa (Sharafiyya Korangath)</span>
                  <span className="font-semibold text-[#164e37]">Tirur, Kerala</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. QUICK LINKS STRIP */}
      <section className="bg-[#f4f1ea] border-b border-[#e5e0d5] py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 text-center">
            <Link
              to="/about"
              className="p-2.5 bg-white rounded-lg border border-[#e5e0d5] hover:border-[#164e37] text-xs font-semibold text-slate-800 transition-colors flex items-center justify-center gap-1.5"
            >
              <School className="w-3.5 h-3.5 text-[#164e37]" />
              <span>About Us</span>
            </Link>

            <button
              onClick={onOpenAdmissionModal}
              className="p-2.5 bg-white rounded-lg border border-[#e5e0d5] hover:border-[#164e37] text-xs font-semibold text-slate-800 transition-colors flex items-center justify-center gap-1.5"
            >
              <GraduationCap className="w-3.5 h-3.5 text-[#c59b27]" />
              <span>Admissions</span>
            </button>

            <Link
              to="/students"
              className="p-2.5 bg-white rounded-lg border border-[#e5e0d5] hover:border-[#164e37] text-xs font-semibold text-slate-800 transition-colors flex items-center justify-center gap-1.5"
            >
              <FileText className="w-3.5 h-3.5 text-[#164e37]" />
              <span>Student Portal</span>
            </Link>

            <Link
              to="/events"
              className="p-2.5 bg-white rounded-lg border border-[#e5e0d5] hover:border-[#164e37] text-xs font-semibold text-slate-800 transition-colors flex items-center justify-center gap-1.5"
            >
              <Calendar className="w-3.5 h-3.5 text-[#164e37]" />
              <span>Events & Notices</span>
            </Link>

            <Link
              to="/contact"
              className="p-2.5 bg-white rounded-lg border border-[#e5e0d5] hover:border-[#164e37] text-xs font-semibold text-slate-800 transition-colors flex items-center justify-center gap-1.5 col-span-2 sm:col-span-1"
            >
              <MapPin className="w-3.5 h-3.5 text-[#c59b27]" />
              <span>Contact & Office</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 3. NOTICE BOARD SECTION */}
      <section className="py-10 bg-white border-b border-[#e5e0d5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-5 gap-2">
            <div>
              <span className="text-[11px] font-bold text-[#164e37] uppercase tracking-wider">
                Official Announcements
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#0f231c]">
                Notice Board
              </h2>
            </div>
            <Link
              to="/events"
              className="text-xs font-semibold text-[#164e37] hover:underline flex items-center gap-1"
            >
              <span>View All Circulars & Calendar</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Clean Notice Table */}
          <div className="border border-[#e5e0d5] rounded-xl overflow-hidden bg-white shadow-2xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left school-table text-xs">
                <thead>
                  <tr>
                    <th className="w-28">Date</th>
                    <th className="w-28">Category</th>
                    <th>Notice Title & Description</th>
                    <th className="w-32 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e5e0d5]">
                  <tr>
                    <td className="font-mono text-slate-500">[Date Pending]</td>
                    <td>
                      <span className="inline-block px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-900">
                        Admissions
                      </span>
                    </td>
                    <td>
                      <strong className="block text-slate-900 text-xs">Admission Open for Academic Session 2025–2026</strong>
                      <p className="text-slate-500 text-[11px]">Enrolment forms available for Class 1 & preparatory streams. Register interest online or at the office.</p>
                    </td>
                    <td className="text-right">
                      <button
                        onClick={onOpenAdmissionModal}
                        className="font-bold text-[#164e37] hover:underline"
                      >
                        Enquire Form
                      </button>
                    </td>
                  </tr>

                  <tr>
                    <td className="font-mono text-slate-500">[Date Pending]</td>
                    <td>
                      <span className="inline-block px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-100 text-amber-900">
                        Examination
                      </span>
                    </td>
                    <td>
                      <strong className="block text-slate-900 text-xs">Mid-Term Academic Assessment Circular</strong>
                      <p className="text-slate-500 text-[11px]">Timetable for oral Tajweed evaluations and written Islamic studies assessments.</p>
                    </td>
                    <td className="text-right">
                      <Link to="/events" className="font-bold text-[#164e37] hover:underline">
                        Read Details
                      </Link>
                    </td>
                  </tr>

                  <tr>
                    <td className="font-mono text-slate-500">[Date Pending]</td>
                    <td>
                      <span className="inline-block px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-100 text-blue-900">
                        Meeting
                      </span>
                    </td>
                    <td>
                      <strong className="block text-slate-900 text-xs">Parent-Teacher Consultation Meeting (PTA)</strong>
                      <p className="text-slate-500 text-[11px]">Quarterly meeting to discuss student attendance regularity, prayer habits, and moral development.</p>
                    </td>
                    <td className="text-right">
                      <Link to="/events" className="font-bold text-[#164e37] hover:underline">
                        Details
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* 4. ABOUT PREVIEW SECTION */}
      <section className="py-10 bg-[#f4f1ea] border-b border-[#e5e0d5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-8 space-y-3">
              <span className="text-[11px] font-bold text-[#164e37] uppercase tracking-wider">
                Institutional Ethos
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#0f231c]">
                About Sharaful Islam Madrassa (Sharafiyya Korangath)
              </h2>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Founded to impart authentic Islamic learning in Korangath, Tirur, our institution focuses on sound Quran recitation with Tajweed, classical Islamic jurisprudence, Arabic literacy, and moral tarbiyyah. We work in close partnership with parents to ensure students grow with strong spiritual foundations and exemplary conduct.
              </p>
              <div className="pt-2">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#164e37] hover:underline"
                >
                  <span>Read full institutional history, mission, vision & values</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            <div className="md:col-span-4 bg-white p-5 rounded-xl border border-[#e5e0d5] text-xs space-y-2">
              <span className="font-bold text-[#164e37] uppercase text-[10px] tracking-wider block">
                Our Core Mission
              </span>
              <p className="text-slate-600 leading-relaxed italic">
                "{SCHOOL_INFO.mission}"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. STUDENT PORTAL PREVIEW */}
      <section className="py-10 bg-white border-b border-[#e5e0d5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-2">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold text-[#164e37] uppercase tracking-wider">
                  Student Services Foundation
                </span>
                <span className="text-[10px] font-semibold bg-amber-100 text-amber-900 px-2 py-0.5 rounded">
                  Coming Soon
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#0f231c] mt-0.5">
                Student & Parent Portal Preview
              </h2>
            </div>
            <Link
              to="/students"
              className="text-xs font-semibold text-[#164e37] hover:underline flex items-center gap-1"
            >
              <span>Access Student Portal Page</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-[#fbfaf7] border border-[#e5e0d5] space-y-1.5">
              <strong className="block text-slate-900 text-sm">Class Timetable</strong>
              <p className="text-slate-600">Morning (6:45 AM – 8:30 AM) and Evening batch schedules across all class grades.</p>
              <span className="text-[10px] text-emerald-800 font-semibold block pt-1">Active Schedule</span>
            </div>

            <div className="p-4 rounded-xl bg-[#fbfaf7] border border-[#e5e0d5] space-y-1.5">
              <strong className="block text-slate-900 text-sm">Digital Attendance</strong>
              <p className="text-slate-600">Upcoming feature for parents to check student daily attendance records.</p>
              <span className="text-[10px] text-amber-800 font-semibold block pt-1">Coming Soon</span>
            </div>

            <div className="p-4 rounded-xl bg-[#fbfaf7] border border-[#e5e0d5] space-y-1.5">
              <strong className="block text-slate-900 text-sm">Examination Circulars</strong>
              <p className="text-slate-600">Standardized board assessment notices, terminal reports, and grading guidelines.</p>
              <span className="text-[10px] text-emerald-800 font-semibold block pt-1">Notices Active</span>
            </div>

            <div className="p-4 rounded-xl bg-[#fbfaf7] border border-[#e5e0d5] space-y-1.5">
              <strong className="block text-slate-900 text-sm">Student Etiquette</strong>
              <p className="text-slate-600">Prescribed Islamic manners, wudhu rules, punctuality, and code of conduct.</p>
              <span className="text-[10px] text-emerald-800 font-semibold block pt-1">Guidelines Active</span>
            </div>
          </div>
        </div>
      </section>

      {/* 6. UPCOMING EVENTS PREVIEW */}
      <section className="py-10 bg-[#f4f1ea] border-b border-[#e5e0d5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-2">
            <div>
              <span className="text-[11px] font-bold text-[#164e37] uppercase tracking-wider">
                Academic & Spiritual Calendar
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#0f231c]">
                Upcoming Programs & Events Preview
              </h2>
            </div>
            <Link
              to="/events"
              className="text-xs font-semibold text-[#164e37] hover:underline flex items-center gap-1"
            >
              <span>View Full Calendar</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {EVENTS.slice(0, 3).map((event) => (
              <div
                key={event.id}
                className="bg-white p-5 rounded-xl border border-[#e5e0d5] space-y-2.5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
                    <span className="font-bold text-[#164e37] uppercase">{event.category}</span>
                    <PlaceholderBadge label="Editable" size="sm" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900">
                    {event.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {event.summary}
                  </p>
                </div>

                <div className="pt-2 border-t border-[#e5e0d5] text-[11px] text-slate-500 flex justify-between">
                  <span>{event.datePlaceholder}</span>
                  <span>{event.venuePlaceholder}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. CONTACT PREVIEW */}
      <section className="py-10 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-3">
              <span className="text-[11px] font-bold text-[#164e37] uppercase tracking-wider">
                Contact & Office Desk
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#0f231c]">
                Visit Us at Korangath or Send an Enquiry
              </h2>
              <div className="text-xs text-slate-600 space-y-1.5 leading-relaxed">
                <p>
                  <strong>Postal Address:</strong> {SCHOOL_INFO.location.fullAddress}
                </p>
                <p>
                  <strong>Office Hours:</strong> {SCHOOL_INFO.contact.officeHours}
                </p>
                <p>
                  <strong>Administrative Desk:</strong> {SCHOOL_INFO.contact.phone}
                </p>
              </div>

              <div className="pt-2 flex gap-3">
                <Link
                  to="/contact"
                  className="px-4 py-2 bg-[#164e37] text-white text-xs font-bold rounded-lg hover:bg-[#0f3b29] transition-colors"
                >
                  View Directions & Map
                </Link>
                <button
                  onClick={onOpenAdmissionModal}
                  className="px-4 py-2 bg-[#f4f1ea] border border-[#d2cabb] text-slate-800 text-xs font-semibold rounded-lg hover:bg-[#eae5da] transition-colors"
                >
                  Admission Enquiry Form
                </button>
              </div>
            </div>

            {/* Quick Query Form */}
            <div className="lg:col-span-6 bg-[#fbfaf7] p-5 rounded-xl border border-[#e5e0d5]">
              <h3 className="text-sm font-bold text-slate-900 mb-2">
                Quick Administrative Enquiry
              </h3>
              {quickContactSent ? (
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-950 text-center space-y-1">
                  <CheckCircle className="w-6 h-6 text-emerald-700 mx-auto" />
                  <p className="font-bold">Thank you, {quickForm.name}</p>
                  <p className="text-slate-600">Your query has been logged in demonstration mode.</p>
                </div>
              ) : (
                <form onSubmit={handleQuickSubmit} className="space-y-2.5 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <input
                      type="text"
                      required
                      placeholder="Your Name *"
                      value={quickForm.name}
                      onChange={(e) => setQuickForm({ ...quickForm, name: e.target.value })}
                      className="w-full px-3 py-2 border border-[#d2cabb] rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-[#164e37]"
                    />
                    <input
                      type="tel"
                      required
                      placeholder="Contact Mobile *"
                      value={quickForm.phone}
                      onChange={(e) => setQuickForm({ ...quickForm, phone: e.target.value })}
                      className="w-full px-3 py-2 border border-[#d2cabb] rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-[#164e37]"
                    />
                  </div>
                  <textarea
                    rows={2}
                    required
                    placeholder="Your Question / Message *"
                    value={quickForm.message}
                    onChange={(e) => setQuickForm({ ...quickForm, message: e.target.value })}
                    className="w-full px-3 py-2 border border-[#d2cabb] rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-[#164e37] resize-none"
                  />
                  <button
                    type="submit"
                    className="w-full py-2 bg-[#164e37] hover:bg-[#0f3b29] text-white font-bold rounded-md transition-colors text-xs"
                  >
                    Submit Query
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
