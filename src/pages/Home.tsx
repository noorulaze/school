import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  GraduationCap,
  ArrowRight,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Clock,
  FileText,
  School,
  CheckCircle2,
  Compass,
  Send,
  Sparkles
} from 'lucide-react';
import { motion } from 'framer-motion';
import { SCHOOL_INFO } from '../data/schoolInfo';
import { EVENTS } from '../data/events';
import { NoticeTicker } from '../components/NoticeTicker';
import { RealisticImageSlot } from '../components/RealisticImageSlot';
import { PlaceholderBadge } from '../components/PlaceholderBadge';

interface HomeProps {
  onOpenAdmissionModal: () => void;
}

export const Home: React.FC<HomeProps> = ({ onOpenAdmissionModal }) => {
  const [quickContactSent, setQuickContactSent] = useState(false);
  const [quickForm, setQuickForm] = useState({ name: '', email: '', phone: '', message: '' });

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setQuickContactSent(true);
  };

  return (
    <div className="w-full flex flex-col bg-[#fbfaf7] text-slate-800">
      {/* 1. Official Notice Ticker */}
      <NoticeTicker onOpenAdmissionModal={onOpenAdmissionModal} />

      {/* 2. MODERN HERO SECTION */}
      <section className="relative overflow-hidden bg-white border-b border-[#e5e0d5] py-12 lg:py-16">
        {/* Subtle geometric Islamic border watermark */}
        <div className="absolute top-0 right-0 w-96 h-96 opacity-[0.03] pointer-events-none">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <polygon points="100,10 190,100 100,190 10,100" fill="#164e37" />
            <polygon points="100,20 180,100 100,180 20,100" fill="none" stroke="#164e37" strokeWidth="2" />
            <circle cx="100" cy="100" r="40" fill="none" stroke="#164e37" strokeWidth="2" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: Modern Editorial Typography */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="lg:col-span-7 space-y-5"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#f4f1ea] border border-[#d2cabb] text-xs font-semibold text-[#164e37]">
                <School className="w-3.5 h-3.5 text-[#c59b27]" />
                <span>Official Institution Portal • Korangath, Tirur</span>
              </div>

              <div className="space-y-1.5">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0f231c] tracking-tight leading-[1.15]">
                  {SCHOOL_INFO.officialName}
                </h1>
                <p className="text-lg sm:text-xl font-bold text-[#164e37]">
                  {SCHOOL_INFO.localName} <span className="font-normal text-slate-500 text-sm sm:text-base">(ഷറഫിയ്യ കോരങ്ങത്ത്)</span>
                </p>
                <p className="font-amiri text-base text-slate-600 pt-1" dir="rtl">
                  {SCHOOL_INFO.arabicCalligraphySubtitle}
                </p>
              </div>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
                An esteemed Islamic educational institution in Korangath, Tirur, Malappuram, dedicated to nurturing young minds with authentic religious education, Quranic recitation with Tajweed, and enduring moral values.
              </p>

              {/* Two Clear Primary Action Buttons */}
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <Link
                  to="/about"
                  className="px-6 py-3 bg-[#164e37] hover:bg-[#0f3b29] text-white text-xs sm:text-sm font-bold rounded-xl shadow-xs transition-all flex items-center gap-2 group hover:shadow-sm"
                >
                  <span>Explore Our School</span>
                  <ArrowRight className="w-4 h-4 text-[#c59b27] transition-transform group-hover:translate-x-1" />
                </Link>

                <button
                  onClick={onOpenAdmissionModal}
                  className="px-6 py-3 bg-[#f4f1ea] hover:bg-[#ebe6dc] text-slate-800 border border-[#d2cabb] text-xs sm:text-sm font-bold rounded-xl transition-colors flex items-center gap-2"
                >
                  <GraduationCap className="w-4 h-4 text-[#164e37]" />
                  <span>Admission Enquiry</span>
                </button>
              </div>

              {/* Institution Key Attributes Bar */}
              <div className="pt-4 border-t border-[#e5e0d5] grid grid-cols-3 gap-3 text-xs">
                <div>
                  <span className="block font-bold text-slate-900">Locality</span>
                  <span className="text-slate-500">Korangath, Tirur</span>
                </div>
                <div>
                  <span className="block font-bold text-slate-900">Curriculum</span>
                  <span className="text-slate-500">Islamic & General</span>
                </div>
                <div>
                  <span className="block font-bold text-slate-900">Batches</span>
                  <span className="text-slate-500">Morning & Evening</span>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Large Realistic School/Campus Image Showcase */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.15, ease: 'easeOut' }}
              className="lg:col-span-5"
            >
              <RealisticImageSlot
                scene="campus"
                aspectRatio="4/3"
                label="Campus Grounds & Verandah"
                caption="Main educational building at Korangath, Tirur"
                className="shadow-md"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. QUICK INFORMATION SECTION (Clean Horizontal Strip) */}
      <section className="bg-[#f4f1ea] border-b border-[#e5e0d5] py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {[
              {
                title: 'About Institution',
                desc: 'History & values',
                icon: School,
                link: '/about',
                action: null,
              },
              {
                title: 'Admissions',
                desc: 'Enquiry & criteria',
                icon: GraduationCap,
                link: null,
                action: onOpenAdmissionModal,
              },
              {
                title: 'Student Portal',
                desc: 'Coming Soon',
                icon: FileText,
                link: '/students',
                action: null,
              },
              {
                title: 'School Events',
                desc: 'Calendar & milestones',
                icon: Calendar,
                link: '/events',
                action: null,
              },
              {
                title: 'Contact Office',
                desc: 'Korangath desk',
                icon: MapPin,
                link: '/contact',
                action: null,
              },
            ].map((item, idx) => {
              const Icon = item.icon;
              const content = (
                <div className="p-3.5 bg-white rounded-xl border border-[#e5e0d5] hover:border-[#164e37] hover:shadow-xs transition-all flex items-center gap-3 text-left">
                  <div className="w-8 h-8 rounded-lg bg-[#f4f1ea] text-[#164e37] flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-[#164e37]" />
                  </div>
                  <div className="min-w-0">
                    <span className="block text-xs font-bold text-slate-900 truncate">
                      {item.title}
                    </span>
                    <span className="block text-[11px] text-slate-500 truncate">
                      {item.desc}
                    </span>
                  </div>
                </div>
              );

              if (item.action) {
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={item.action}
                    className="w-full text-left col-span-2 sm:col-span-1"
                  >
                    {content}
                  </button>
                );
              }

              return (
                <Link key={idx} to={item.link!} className="w-full block">
                  {content}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. ABOUT PREVIEW (Editorial Split Layout) */}
      <section className="py-14 lg:py-16 bg-white border-b border-[#e5e0d5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Image on one side */}
            <div className="lg:col-span-6 order-2 lg:order-1">
              <RealisticImageSlot
                scene="quran_study"
                aspectRatio="16/10"
                label="Qur'an & Tajweed Study Session"
                caption="Recitation coaching and character formation"
                className="shadow-sm"
              />
            </div>

            {/* Short content on the other side */}
            <div className="lg:col-span-6 space-y-4 order-1 lg:order-2">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#164e37] uppercase tracking-wider">
                <Compass className="w-3.5 h-3.5 text-[#c59b27]" />
                <span>Our Heritage & Values</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0f231c] tracking-tight">
                Authentic Islamic Foundations for Modern Young Minds
              </h2>

              <p className="text-sm text-slate-600 leading-relaxed">
                Sharaful Islam Madrassa, widely known in the area as Sharafiyya Korangath, has long stood as an anchor for religious instruction in Tirur. Our pedagogy balances traditional classical texts with compassionate, structured teaching.
              </p>

              <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                <div className="p-3 bg-[#fbfaf7] rounded-lg border border-[#e5e0d5]">
                  <strong className="block text-slate-900 font-bold">Moral Guidance (Akhlaq)</strong>
                  <p className="text-slate-500 mt-0.5">Truthfulness, respect for elders, and community service.</p>
                </div>
                <div className="p-3 bg-[#fbfaf7] rounded-lg border border-[#e5e0d5]">
                  <strong className="block text-slate-900 font-bold">Tajweed Precision</strong>
                  <p className="text-slate-500 mt-0.5">Accurate pronunciation according to classical rules.</p>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 text-xs font-bold text-[#164e37] hover:text-[#0f3b29] hover:underline"
                >
                  <span>Learn More About Our Institution</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. ACADEMIC SECTIONS (Clean Prospectus Stream Layout - NOT Repetitive Cards) */}
      <section className="py-14 lg:py-16 bg-[#fbfaf7] border-b border-[#e5e0d5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mb-10">
            <span className="text-xs font-bold text-[#164e37] uppercase tracking-wider block mb-1">
              Curriculum & Programs
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0f231c]">
              Academic Departments & Learning Streams
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              Structured progressive modules designed to build sound knowledge of the Quran, Sunnah, and Islamic manners alongside regular school education.
            </p>
          </div>

          {/* Editorial Stream List */}
          <div className="divide-y divide-[#e5e0d5] border-y border-[#e5e0d5]">
            {[
              {
                number: '01',
                title: 'Islamic Studies & Jurisprudence (Fiqh)',
                arabic: 'الفقه الإسلامي والعقيدة',
                desc: 'Comprehensive instruction in Aqeedah, purification (Taharah), prayer (Salah), and daily ethical rulings.',
                scope: 'Classes 1–10 • Daily Practical Guidance',
              },
              {
                number: '02',
                title: 'Qur’an Recitation & Hadith Studies',
                arabic: 'علوم القرآن الكريم والحديث',
                desc: 'Step-by-step Tajweed articulation, memorization of selected chapters, and study of forty fundamental Prophetic Hadiths.',
                scope: 'Classes 1–10 • Melodic Tilawat & Translation',
              },
              {
                number: '03',
                title: 'Arabic Language & Literacy',
                arabic: 'اللغة العربية وقواعدها',
                desc: 'Foundational Arabic reading, writing, essential vocabulary, and introductory grammar tailored for comprehension.',
                scope: 'Classes 2–8 • Reading, Vocabulary, Expression',
              },
              {
                number: '04',
                title: 'General Moral Education & Character (Akhlaq)',
                arabic: 'التربية الإسلامية والأخلاق',
                desc: 'Character formation, Islamic history, exemplary biographies of the Companions, and civic responsibility.',
                scope: 'All Enrolled Classes • Weekly Character Circles',
              },
            ].map((stream) => (
              <div
                key={stream.number}
                className="py-6 sm:py-7 grid grid-cols-1 md:grid-cols-12 gap-4 items-center hover:bg-white/60 px-3 rounded-lg transition-colors"
              >
                <div className="md:col-span-1 text-[#164e37] font-extrabold text-xl sm:text-2xl font-mono">
                  {stream.number}
                </div>

                <div className="md:col-span-5 space-y-1">
                  <h3 className="text-base sm:text-lg font-bold text-slate-900">
                    {stream.title}
                  </h3>
                  <p className="font-amiri text-xs text-[#c59b27]" dir="rtl">
                    {stream.arabic}
                  </p>
                </div>

                <div className="md:col-span-4 text-xs text-slate-600">
                  <p>{stream.desc}</p>
                </div>

                <div className="md:col-span-2 text-right md:text-right">
                  <span className="inline-block text-[11px] font-semibold text-[#164e37] bg-[#f4f1ea] px-2.5 py-1 rounded-md border border-[#d2cabb]">
                    {stream.scope}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-between items-center text-xs text-slate-500">
            <span>Aligned with recognized Kerala Islamic Education Board curriculum</span>
            <Link to="/departments" className="text-[#164e37] font-bold hover:underline flex items-center gap-1">
              <span>View Full Syllabus Matrix</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 6. NOTICE BOARD (Modern Announcement Section with Date Placeholders) */}
      <section className="py-14 bg-white border-b border-[#e5e0d5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-3">
            <div>
              <span className="text-xs font-bold text-[#164e37] uppercase tracking-wider block">
                Official Circulars
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0f231c]">
                Institution Notice Board
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <PlaceholderBadge label="Official Announcements Desk" size="sm" />
              <Link
                to="/events"
                className="text-xs font-bold text-[#164e37] hover:underline flex items-center gap-1"
              >
                <span>All Circulars</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="border border-[#e5e0d5] rounded-xl overflow-hidden divide-y divide-[#e5e0d5]">
            {[
              {
                id: 'NB-01',
                category: 'Admissions',
                title: 'Admissions Open for Academic Year 2025–2026',
                date: '[Admission Date Placeholder — Contact Office]',
                details: 'Applications for Class 1 and lateral enrolments are being accepted at the madrassa office during working hours.',
                badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-200',
              },
              {
                id: 'NB-02',
                category: 'Schedule',
                title: 'Morning Batch Assembly & Azkar Timetable',
                date: '[Circular Date Placeholder]',
                details: 'Students are requested to assemble 10 minutes prior to 6:45 AM for congregational morning invocations.',
                badgeColor: 'bg-blue-100 text-blue-900 border-blue-200',
              },
              {
                id: 'NB-03',
                category: 'Parents Meet',
                title: 'Parent-Teacher Consultative Session Announcement',
                date: '[Date to be confirmed by Committee]',
                details: 'Quarterly review meeting schedule will be communicated through the student diary.',
                badgeColor: 'bg-amber-100 text-amber-900 border-amber-200',
              },
            ].map((notice) => (
              <div key={notice.id} className="p-4 sm:p-5 bg-[#fbfaf7] hover:bg-white transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${notice.badgeColor}`}>
                      {notice.category}
                    </span>
                    <span className="text-xs font-mono text-slate-400">{notice.id}</span>
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900">
                    {notice.title}
                  </h3>
                  <p className="text-xs text-slate-600 max-w-2xl">
                    {notice.details}
                  </p>
                </div>

                <div className="shrink-0 sm:text-right">
                  <span className="inline-block text-[11px] font-semibold text-slate-500 bg-white sm:bg-transparent px-2 sm:px-0 py-1 sm:py-0 rounded border sm:border-0 border-[#d2cabb]">
                    {notice.date}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. EVENTS SECTION (Modern Editorial Event Layout) */}
      <section className="py-14 lg:py-16 bg-[#fbfaf7] border-b border-[#e5e0d5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-3">
            <div>
              <span className="text-xs font-bold text-[#164e37] uppercase tracking-wider block">
                Academic & Islamic Programs
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0f231c]">
                Upcoming School Events
              </h2>
            </div>

            <Link
              to="/events"
              className="text-xs font-bold text-[#164e37] hover:underline flex items-center gap-1"
            >
              <span>Full Calendar & Notices</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {EVENTS.slice(0, 3).map((event) => (
              <div
                key={event.id}
                className="p-5 bg-white rounded-xl border border-[#e5e0d5] hover:border-[#164e37] transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#164e37] bg-[#f4f1ea] px-2 py-0.5 rounded">
                      {event.category}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {event.timePlaceholder}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 leading-snug">
                    {event.title}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-2">
                    {event.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#f0ece3] text-xs text-slate-500 flex items-center justify-between">
                  <span className="flex items-center gap-1.5 font-medium">
                    <Calendar className="w-3.5 h-3.5 text-[#c59b27]" />
                    <span>{event.datePlaceholder}</span>
                  </span>
                  <span>{event.venuePlaceholder}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. GALLERY SECTION (Modern Asymmetric / Masonry-style Layout) */}
      <section className="py-14 lg:py-16 bg-white border-b border-[#e5e0d5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-3">
            <div>
              <span className="text-xs font-bold text-[#164e37] uppercase tracking-wider block">
                Campus Atmosphere
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0f231c]">
                Institution Photo Highlights
              </h2>
            </div>

            <Link
              to="/gallery"
              className="text-xs font-bold text-[#164e37] hover:underline flex items-center gap-1"
            >
              <span>Explore All 5 Categories</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Asymmetric Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Large Feature Slot (7 cols) */}
            <div className="md:col-span-7">
              <RealisticImageSlot
                scene="campus"
                aspectRatio="16/10"
                label="Campus Grounds & Front Verandah"
                caption="Sharaful Islam Madrassa, Korangath Campus"
                className="h-full min-h-[280px]"
              />
            </div>

            {/* Stacked Right Slots (5 cols) */}
            <div className="md:col-span-5 grid grid-cols-1 gap-4">
              <RealisticImageSlot
                scene="classroom"
                aspectRatio="16/10"
                label="Classroom Study Hall"
                caption="Interactive learning and recitation desks"
              />
              <RealisticImageSlot
                scene="library"
                aspectRatio="16/10"
                label="Reference Books & Folios"
                caption="Islamic literature & curriculum textbooks"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 9. STUDENT PORTAL SECTION (Modern Call-To-Action with 'Coming Soon') */}
      <section className="py-14 bg-[#123628] text-white border-b border-[#164e37] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1b5038] border border-[#276e4e] text-xs font-semibold text-emerald-200">
                <Sparkles className="w-3.5 h-3.5 text-[#c59b27]" />
                <span>Parent & Student Portal • Digital System</span>
                <span className="text-[10px] font-bold bg-[#c59b27] text-slate-900 px-2 py-0.5 rounded-full">
                  Coming Soon
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Direct Access to Attendance, Progress Cards & Notices
              </h2>

              <p className="text-xs sm:text-sm text-emerald-100/90 max-w-2xl leading-relaxed">
                We are setting up the official student portal for Sharafiyya Korangath. Once live, guardians will be able to verify attendance, quarterly evaluations, and download fee receipts directly using the student admission number.
              </p>

              <div className="flex items-center gap-3 pt-2">
                <Link
                  to="/students"
                  className="px-5 py-2.5 bg-[#c59b27] hover:bg-[#b48318] text-slate-950 text-xs font-bold rounded-lg shadow-xs transition-colors inline-flex items-center gap-1.5"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Preview Portal Interface & Timetables</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-4 p-5 rounded-xl bg-[#0f2c21] border border-[#1b5038] text-xs space-y-2.5">
              <strong className="block text-white text-xs uppercase tracking-wider">
                Planned Portal Features:
              </strong>
              <ul className="space-y-1.5 text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#c59b27] shrink-0" />
                  <span>Verified Student Attendance Tracking</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#c59b27] shrink-0" />
                  <span>Quarterly Evaluation Scorecards</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#c59b27] shrink-0" />
                  <span>Direct Communication with Class Muallim</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#c59b27] shrink-0" />
                  <span>Daily Masnoon Azkar Reference Guides</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 10. CONTACT SECTION (Clean Two-Column Area with Contact Form & Placeholders) */}
      <section className="py-14 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Col: Contact Information & Placeholders */}
            <div className="lg:col-span-5 space-y-5">
              <div>
                <span className="text-xs font-bold text-[#164e37] uppercase tracking-wider block">
                  Get In Touch
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0f231c]">
                  Contact School Office
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  Inquiries regarding admissions, class batches, and general administrative questions.
                </p>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-4 rounded-xl bg-[#fbfaf7] border border-[#e5e0d5] flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#164e37] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-900">Madrassa Campus Address</strong>
                    <span className="text-slate-600 block mt-0.5">
                      Korangath, Tirur, Malappuram District, Kerala – 676101
                    </span>
                    <span className="text-[10px] text-slate-400 mt-1 block">
                      Transit: ~3.5 km from Tirur Railway Station
                    </span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#fbfaf7] border border-[#e5e0d5] flex items-start gap-3">
                  <Phone className="w-4 h-4 text-[#164e37] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-900">Office Phone</strong>
                    <span className="text-slate-600 block mt-0.5 font-mono">
                      {SCHOOL_INFO.contact.phone}
                    </span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#fbfaf7] border border-[#e5e0d5] flex items-start gap-3">
                  <Mail className="w-4 h-4 text-[#164e37] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-900">Official Email</strong>
                    <span className="text-slate-600 block mt-0.5 font-mono">
                      {SCHOOL_INFO.contact.email}
                    </span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#fbfaf7] border border-[#e5e0d5] flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#164e37] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-900">Office Visiting Hours</strong>
                    <span className="text-slate-600 block mt-0.5">
                      {SCHOOL_INFO.contact.officeHours}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Col: Contact Form */}
            <div className="lg:col-span-7 bg-[#fbfaf7] p-6 sm:p-8 rounded-2xl border border-[#e5e0d5] shadow-2xs">
              <h3 className="text-lg font-bold text-[#0f231c] mb-1">
                Send an Inquiry Message
              </h3>
              <p className="text-xs text-slate-600 mb-5">
                Fill in your details below and our administrative office will respond during working hours.
              </p>

              {quickContactSent ? (
                <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                  <strong className="block text-sm font-bold text-emerald-900">
                    Message Received
                  </strong>
                  <p className="text-xs text-slate-600 max-w-sm mx-auto">
                    Thank you, {quickForm.name || 'Applicant'}. Your inquiry has been submitted to the office of Sharaful Islam Madrassa.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setQuickContactSent(false);
                      setQuickForm({ name: '', email: '', phone: '', message: '' });
                    }}
                    className="text-xs font-semibold text-[#164e37] hover:underline mt-2 inline-block"
                  >
                    Send another inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleQuickSubmit} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Abdullah K."
                        value={quickForm.name}
                        onChange={(e) => setQuickForm({ ...quickForm, name: e.target.value })}
                        className="w-full px-3 py-2.5 text-xs bg-white border border-[#d2cabb] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#164e37]"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 Phone number"
                        value={quickForm.phone}
                        onChange={(e) => setQuickForm({ ...quickForm, phone: e.target.value })}
                        className="w-full px-3 py-2.5 text-xs bg-white border border-[#d2cabb] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#164e37]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="example@mail.com"
                      value={quickForm.email}
                      onChange={(e) => setQuickForm({ ...quickForm, email: e.target.value })}
                      className="w-full px-3 py-2.5 text-xs bg-white border border-[#d2cabb] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#164e37]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Message / Inquiry Details *
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Please specify your query regarding admissions, syllabus, or timings..."
                      value={quickForm.message}
                      onChange={(e) => setQuickForm({ ...quickForm, message: e.target.value })}
                      className="w-full px-3 py-2.5 text-xs bg-white border border-[#d2cabb] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#164e37] resize-none"
                    />
                  </div>

                  <div className="flex items-center gap-3 pt-1">
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-[#164e37] hover:bg-[#0f3b29] text-white font-bold rounded-lg shadow-xs transition-colors flex items-center gap-2"
                    >
                      <Send className="w-3.5 h-3.5 text-[#c59b27]" />
                      <span>Submit Inquiry</span>
                    </button>

                    <button
                      type="button"
                      onClick={onOpenAdmissionModal}
                      className="px-4 py-2.5 bg-white hover:bg-[#f4f1ea] text-slate-700 font-semibold border border-[#d2cabb] rounded-lg transition-colors"
                    >
                      Admission Form
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
