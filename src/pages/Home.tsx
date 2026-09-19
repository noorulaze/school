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

      {/* 2. MODERN SPLIT-SCREEN HERO SECTION */}
      <section className="relative overflow-hidden bg-white border-b border-[#e5e0d5] py-12 sm:py-16 lg:py-20">
        {/* Subtle Islamic geometric pattern in the background */}
        <div className="absolute inset-0 opacity-[0.035] pointer-events-none select-none overflow-hidden">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="islamic-hero-pattern" width="80" height="80" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 80 40 L 40 80 L 0 40 Z" fill="none" stroke="#164e37" strokeWidth="1" />
                <path d="M 40 10 L 70 40 L 40 70 L 10 40 Z" fill="none" stroke="#164e37" strokeWidth="0.75" />
                <circle cx="40" cy="40" r="12" fill="none" stroke="#164e37" strokeWidth="0.75" />
                <circle cx="0" cy="0" r="10" fill="none" stroke="#164e37" strokeWidth="0.75" />
                <circle cx="80" cy="0" r="10" fill="none" stroke="#164e37" strokeWidth="0.75" />
                <circle cx="0" cy="80" r="10" fill="none" stroke="#164e37" strokeWidth="0.75" />
                <circle cx="80" cy="80" r="10" fill="none" stroke="#164e37" strokeWidth="0.75" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#islamic-hero-pattern)" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* LEFT SIDE: Modern Editorial Content */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="lg:col-span-7 space-y-6"
            >
              {/* Eyebrow */}
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#c59b27]" />
                <span className="text-xs uppercase tracking-widest font-extrabold text-[#164e37]">
                  SHARAFUL ISLAM MADRASSA
                </span>
              </div>

              {/* Large Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0f231c] tracking-tight leading-[1.12]">
                Learning. Character. <span className="text-[#164e37]">Faith.</span>
              </h1>

              {/* Short Natural Description */}
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl">
                Dedicated to providing authentic Quranic recitation, Islamic studies, and disciplined moral education for young learners in a welcoming, character-building environment at Korangath, Tirur.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <Link
                  to="/about"
                  className="px-6 py-3.5 bg-[#164e37] hover:bg-[#0f3b29] text-white text-xs sm:text-sm font-bold rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 group hover:shadow-sm"
                >
                  <span>Explore Our School</span>
                  <ArrowRight className="w-4 h-4 text-[#c59b27] transition-transform group-hover:translate-x-1" />
                </Link>

                <button
                  type="button"
                  onClick={onOpenAdmissionModal}
                  className="px-6 py-3.5 bg-[#f4f1ea] hover:bg-[#ebe6dc] text-slate-800 border border-[#d2cabb] text-xs sm:text-sm font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  <GraduationCap className="w-4 h-4 text-[#164e37]" />
                  <span>Admission Enquiry</span>
                </button>
              </div>
            </motion.div>

            {/* RIGHT SIDE: Large Rectangular Campus Image with Floating Info Element */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.55, delay: 0.15, ease: 'easeOut' }}
              className="lg:col-span-5 relative mt-4 lg:mt-0 pb-6 sm:pb-8 lg:pb-0"
            >
              {/* Natural Rectangular Image Composition */}
              <RealisticImageSlot
                scene="campus"
                aspectRatio="4/3"
                label="Campus Grounds & Verandah"
                caption="Main campus building at Korangath, Tirur"
                className="shadow-md"
              />

              {/* Small Subtle Floating Information Element */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.3, ease: 'easeOut' }}
                className="absolute -bottom-4 -left-3 sm:-bottom-5 sm:-left-4 bg-white border border-[#d2cabb] rounded-xl px-4 py-3 shadow-md z-20 flex items-center gap-3"
              >
                <div className="w-9 h-9 rounded-lg bg-[#f4f1ea] border border-[#d2cabb] flex items-center justify-center shrink-0 text-[#164e37]">
                  <MapPin className="w-4 h-4 text-[#c59b27]" />
                </div>
                <div>
                  <span className="block text-xs font-extrabold text-[#0f231c] leading-tight">
                    Sharafiyya Korangath
                  </span>
                  <span className="block text-[11px] text-slate-500 font-medium leading-tight mt-0.5">
                    Korangath, Tirur
                  </span>
                </div>
              </motion.div>
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

      {/* 4. ABOUT PREVIEW (Modern Editorial 2-Column Section) */}
      <section className="py-14 lg:py-20 bg-white border-b border-[#e5e0d5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left: Large School/Classroom Image Placeholder (stacks on top on mobile) */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className="lg:col-span-6"
            >
              <RealisticImageSlot
                scene="classroom"
                aspectRatio="4/3"
                label="Classroom & Study Hall"
                caption="Learning environment at Sharaful Islam Madrassa, Korangath"
                className="rounded-xl shadow-xs"
              />
            </motion.div>

            {/* Right: Heading, Natural Introduction, and 3 Information Points */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.12, ease: 'easeOut' }}
              className="lg:col-span-6 space-y-6"
            >
              {/* Eyebrow */}
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-0.5 bg-[#c59b27]" />
                <span className="text-xs uppercase tracking-widest font-extrabold text-[#164e37]">
                  ABOUT OUR INSTITUTION
                </span>
              </div>

              {/* Heading */}
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0f231c] tracking-tight leading-tight">
                Education rooted in knowledge, faith and character.
              </h2>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Sharaful Islam Madrassa, widely known in the community as <strong>Sharafiyya Korangath</strong>, is an Islamic educational institution serving families in Korangath, Tirur, Malappuram. Our institution provides structured religious learning that instills reverence for the Qur'an and authentic prophetic teachings while supporting students attending daytime formal schools.
              </p>

              {/* Three Information Points */}
              <div className="space-y-4 pt-1">
                <div className="border-l-2 border-[#164e37] pl-3.5 py-0.5">
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                    Islamic Education
                  </h3>
                  <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                    Systematic instruction in foundational Aqeedah, practical Fiqh rulings, and daily worship according to authorized curriculum standards.
                  </p>
                </div>

                <div className="border-l-2 border-[#c59b27] pl-3.5 py-0.5">
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                    Arabic & Qur’anic Learning
                  </h3>
                  <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                    Step-by-step Tajweed phonetics, accurate vocal articulation (Makharij), and foundational Arabic language comprehension.
                  </p>
                </div>

                <div className="border-l-2 border-[#164e37] pl-3.5 py-0.5">
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                    Student Development
                  </h3>
                  <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                    Tarbiyyah and character formation emphasizing honesty, respect for elders, personal discipline, and positive social goodwill.
                  </p>
                </div>
              </div>

              {/* Simple Learn More Button */}
              <div className="pt-2">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#164e37] hover:bg-[#0f3b29] text-white text-xs sm:text-sm font-bold rounded-lg transition-colors group shadow-xs"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#c59b27] transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.div>
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
