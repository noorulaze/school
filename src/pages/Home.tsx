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
  Sparkles,
  BookOpen,
  Languages
} from 'lucide-react';
import { motion } from 'framer-motion';
import { SCHOOL_INFO } from '../data/schoolInfo';
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

      {/* 5. ACADEMIC PROGRAMS & LEARNING AREAS (Modern Editorial Layout) */}
      <section className="relative overflow-hidden py-14 lg:py-20 bg-[#fbfaf7] border-b border-[#e5e0d5]">
        {/* Subtle Islamic geometric pattern in the background only */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none select-none overflow-hidden">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="islamic-learning-pattern" width="80" height="80" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 80 40 L 40 80 L 0 40 Z" fill="none" stroke="#164e37" strokeWidth="1" />
                <path d="M 40 10 L 70 40 L 40 70 L 10 40 Z" fill="none" stroke="#164e37" strokeWidth="0.75" />
                <circle cx="40" cy="40" r="4" fill="none" stroke="#c59b27" strokeWidth="0.75" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#islamic-learning-pattern)" />
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          {/* Section Header */}
          <div className="max-w-3xl mb-10 sm:mb-12">
            <div className="flex items-center gap-2 mb-2">
              <span className="h-px w-5 bg-[#c59b27]"></span>
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#164e37]">
                Academic Programs & Streams
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0f231c] tracking-tight">
              Learning at Sharaful Islam
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2.5 font-normal leading-relaxed">
              An educational environment that brings together Islamic learning, language, knowledge and student development.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <PlaceholderBadge label="Editable Placeholder Categories" size="sm" />
              <span className="text-xs text-slate-500 italic">
                These are editable placeholder categories. Official syllabus and departments will be updated upon institutional confirmation.
              </span>
            </div>
          </div>

          {/* 4 Learning Areas - Modern Editorial Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
            {[
              {
                number: '01',
                title: 'Qur’an & Hadith',
                desc: 'Structured guidance in Qur’anic recitation with Tajweed rules, memorization of essential Surahs, and foundational study of Prophetic Hadiths.',
                icon: BookOpen,
              },
              {
                number: '02',
                title: 'Islamic Studies',
                desc: 'Comprehensive instruction in Aqeedah (faith), practical Fiqh (jurisprudence), daily worship practices, and Islamic ethics for student life.',
                icon: Sparkles,
              },
              {
                number: '03',
                title: 'Arabic Language',
                desc: 'Foundational Arabic literacy focusing on reading, writing, essential vocabulary, and communicative grammar to understand classical texts.',
                icon: Languages,
              },
              {
                number: '04',
                title: 'General Education',
                desc: 'Supplementary academic guidance and moral development that complement regular schooling, fostering intellectual curiosity and discipline.',
                icon: School,
              },
            ].map((item) => (
              <Link
                key={item.number}
                to="/departments"
                className="group relative flex flex-col justify-between p-6 sm:p-7 bg-white/80 hover:bg-white rounded-lg border border-[#e5e0d5] hover:border-[#164e37]/40 hover:shadow-xs transition-all duration-200"
              >
                <div>
                  {/* Top Bar: Number & Subtle Small Visual Mark */}
                  <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#eee9df]">
                    <span className="text-2xl sm:text-3xl font-serif font-bold text-[#164e37] tracking-tight">
                      {item.number}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-[#f4f1ea] flex items-center justify-center text-[#164e37] group-hover:bg-[#164e37] group-hover:text-white transition-colors">
                      <item.icon className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-base sm:text-lg font-bold text-[#0f231c] group-hover:text-[#164e37] transition-colors mb-2">
                    {item.title}
                  </h3>

                  {/* Short Editable Description */}
                  <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>

                {/* Subtle Hover Interaction: Revealing small "Explore" indicator */}
                <div className="pt-4 mt-6 border-t border-[#f0ece3] flex items-center justify-between text-xs font-semibold">
                  <span className="text-slate-500 group-hover:text-[#164e37] transition-colors">
                    Curriculum Area
                  </span>
                  <div className="flex items-center gap-1 text-[#c59b27] group-hover:text-[#164e37] transition-colors">
                    <span className="text-[11px] font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                      Explore
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 transform transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Button Below */}
          <div className="mt-10 sm:mt-12 text-center">
            <Link
              to="/departments"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#164e37] hover:bg-[#0f3b29] text-white text-xs sm:text-sm font-semibold rounded-lg transition-colors group shadow-xs"
            >
              <span>Explore Academics</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#c59b27] transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* 6. NOTICE BOARD / LATEST UPDATES (Modern Horizontal Editorial Notice Section) */}
      <section className="py-14 lg:py-18 bg-white border-b border-[#e5e0d5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="h-px w-5 bg-[#c59b27]"></span>
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#164e37]">
                  Announcements Desk
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0f231c] tracking-tight">
                Latest Updates
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1.5 font-normal">
                Important announcements and updates from the institution.
              </p>
            </div>

            <div className="flex items-center gap-2.5">
              <PlaceholderBadge label="Editable Notices" size="sm" />
              <Link
                to="/events"
                className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 bg-[#f4f1ea] hover:bg-[#eae5d9] text-[#164e37] text-xs font-bold rounded-lg border border-[#d2cabb] transition-colors group"
              >
                <span>View All Notices</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#c59b27] transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Horizontal Editorial Notice Grid: Desktop (3-col horizontal), Tablet (2-col), Mobile (vertical list) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {[
              {
                id: 'notice-1',
                category: 'Academic Notice',
                datePlaceholder: '[Date Placeholder]',
                title: 'Academic Notice',
                description: 'Important academic announcements will appear here. Regular examination timetables, syllabus progressions, and term schedules are posted by the office.',
                badgeStyle: 'bg-emerald-50 text-emerald-800 border-emerald-200',
              },
              {
                id: 'notice-2',
                category: 'Admission Update',
                datePlaceholder: '[Date Placeholder]',
                title: 'Admission Update',
                description: 'Admission-related information will be updated here. Application forms, intake schedules, and enrollment guidelines for upcoming batches will be confirmed here.',
                badgeStyle: 'bg-blue-50 text-blue-800 border-blue-200',
              },
              {
                id: 'notice-3',
                category: 'Institution Notice',
                datePlaceholder: '[Date Placeholder]',
                title: 'Institution Notice',
                description: 'Important notices and announcements will appear here. General circulars, institutional schedules, and parent-teacher updates will be communicated here.',
                badgeStyle: 'bg-amber-50 text-amber-800 border-amber-200',
              },
            ].map((notice) => (
              <Link
                key={notice.id}
                to="/events"
                className="group relative flex flex-col justify-between p-5 sm:p-6 bg-[#fbfaf7] hover:bg-white rounded-lg border border-[#e5e0d5] hover:border-[#164e37]/40 hover:shadow-xs transition-all duration-200"
              >
                <div>
                  {/* Category & Date Placeholder Header */}
                  <div className="flex items-center justify-between gap-2 pb-3 mb-3 border-b border-[#eee9df]">
                    <span className={`text-[11px] font-semibold px-2 py-0.5 rounded border ${notice.badgeStyle}`}>
                      {notice.category}
                    </span>
                    <span className="text-[11px] font-mono text-slate-500">
                      {notice.datePlaceholder}
                    </span>
                  </div>

                  {/* Notice Title */}
                  <h3 className="text-base sm:text-lg font-bold text-[#0f231c] group-hover:text-[#164e37] transition-colors mb-2">
                    {notice.title}
                  </h3>

                  {/* Short Description */}
                  <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed font-normal">
                    {notice.description}
                  </p>
                </div>

                {/* Arrow / Read More Indicator */}
                <div className="pt-4 mt-5 border-t border-[#eee9df] flex items-center justify-between text-xs font-semibold">
                  <span className="text-slate-500 group-hover:text-[#164e37] transition-colors">
                    Official Notice
                  </span>
                  <div className="inline-flex items-center gap-1.5 text-[#164e37]">
                    <span className="text-xs font-semibold">Read More</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#c59b27] transform transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Button Below (Always visible on mobile / sm screens) */}
          <div className="mt-8 sm:mt-10 text-center sm:hidden">
            <Link
              to="/events"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#f4f1ea] hover:bg-[#eae5d9] text-[#164e37] text-xs sm:text-sm font-bold rounded-lg border border-[#d2cabb] transition-colors group shadow-xs"
            >
              <span>View All Notices</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#c59b27] transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* 7. EVENTS & PROGRAMS (Modern Editorial Asymmetric Layout) */}
      <section className="py-14 lg:py-20 bg-[#fbfaf7] border-b border-[#e5e0d5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="h-px w-5 bg-[#c59b27]"></span>
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#164e37]">
                  Campus Life & Calendar
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0f231c] tracking-tight">
                Events & Programs
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1.5 font-normal">
                Moments of learning, participation and community.
              </p>
            </div>

            <div className="flex items-center gap-2.5">
              <PlaceholderBadge label="Editable Events" size="sm" />
              <Link
                to="/events"
                className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-[#f4f1ea] text-[#164e37] text-xs font-bold rounded-lg border border-[#d2cabb] transition-colors group shadow-2xs"
              >
                <span>View All Events</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#c59b27] transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Editorial Asymmetric Layout: Left = 1 Large Featured, Right = 2 Smaller Stacked */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
            {/* Left: Featured Event Placeholder (Large) */}
            <div className="lg:col-span-7 flex">
              <Link
                to="/events"
                className="group relative w-full flex flex-col justify-between bg-white rounded-lg border border-[#e5e0d5] hover:border-[#164e37]/40 hover:shadow-xs transition-all duration-200 overflow-hidden"
              >
                {/* Image Container with Subtle Zoom */}
                <div className="overflow-hidden bg-[#f4f1ea]">
                  <div className="transform transition-transform duration-500 ease-out group-hover:scale-[1.03]">
                    <RealisticImageSlot
                      scene="assembly"
                      aspectRatio="16/10"
                      label="School Program Photograph Placeholder"
                      caption="Annual educational gathering and student assembly in Korangath"
                    />
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Metadata */}
                    <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-3 border-b border-[#eee9df]">
                      <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded border bg-emerald-50 text-emerald-800 border-emerald-200">
                        Featured Program
                      </span>
                      <span className="flex items-center gap-1.5 text-xs text-slate-500 font-mono">
                        <Calendar className="w-3.5 h-3.5 text-[#c59b27]" />
                        <span>[Date Placeholder]</span>
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl sm:text-2xl font-bold text-[#0f231c] group-hover:text-[#164e37] transition-colors mb-2.5">
                      Annual Educational Program
                    </h3>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                      The flagship educational gathering bringing together students, teachers, and guardians for Quranic presentations, moral discussions, and recognizing student efforts. Specific dates, guest schedules, and timetable will be updated upon official announcement.
                    </p>
                  </div>

                  {/* Action Link */}
                  <div className="pt-4 mt-6 border-t border-[#eee9df] flex items-center justify-between text-xs font-semibold">
                    <span className="text-slate-500 group-hover:text-[#164e37] transition-colors">
                      Institutional Event
                    </span>
                    <div className="inline-flex items-center gap-1.5 text-[#164e37]">
                      <span className="text-xs font-semibold">View Details</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#c59b27] transform transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </Link>
            </div>

            {/* Right: 2 Smaller Secondary Event Items */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-5 sm:gap-6">
              {/* Secondary Event 1: Student Activity */}
              <Link
                to="/events"
                className="group relative flex-1 flex flex-col sm:flex-row bg-white rounded-lg border border-[#e5e0d5] hover:border-[#164e37]/40 hover:shadow-xs transition-all duration-200 overflow-hidden"
              >
                <div className="sm:w-2/5 overflow-hidden bg-[#f4f1ea] shrink-0">
                  <div className="h-full transform transition-transform duration-500 ease-out group-hover:scale-[1.03]">
                    <RealisticImageSlot
                      scene="activities"
                      aspectRatio="4/3"
                      label="Student Activity Photo Placeholder"
                      caption="Student co-curricular activity and study circle"
                    />
                  </div>
                </div>

                <div className="p-4 sm:p-5 sm:w-3/5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 pb-2 mb-2 border-b border-[#eee9df]">
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded border bg-blue-50 text-blue-800 border-blue-200">
                        Student Activity
                      </span>
                      <span className="text-[11px] text-slate-500 font-mono">
                        [Date Placeholder]
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-[#0f231c] group-hover:text-[#164e37] transition-colors mb-1.5">
                      Student Activity
                    </h4>

                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                      Interactive student workshops, peer study circles, and character-building extracurricular sessions conducted under teacher supervision.
                    </p>
                  </div>

                  <div className="pt-3 mt-3 border-t border-[#eee9df] flex items-center justify-end text-xs font-semibold text-[#164e37]">
                    <div className="inline-flex items-center gap-1">
                      <span className="text-xs">View Details</span>
                      <ArrowRight className="w-3 h-3 text-[#c59b27] transform transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </Link>

              {/* Secondary Event 2: Islamic Learning Program */}
              <Link
                to="/events"
                className="group relative flex-1 flex flex-col sm:flex-row bg-white rounded-lg border border-[#e5e0d5] hover:border-[#164e37]/40 hover:shadow-xs transition-all duration-200 overflow-hidden"
              >
                <div className="sm:w-2/5 overflow-hidden bg-[#f4f1ea] shrink-0">
                  <div className="h-full transform transition-transform duration-500 ease-out group-hover:scale-[1.03]">
                    <RealisticImageSlot
                      scene="quran_study"
                      aspectRatio="4/3"
                      label="Educational Event Photo Placeholder"
                      caption="Structured Islamic study session and Quranic learning circle"
                    />
                  </div>
                </div>

                <div className="p-4 sm:p-5 sm:w-3/5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 pb-2 mb-2 border-b border-[#eee9df]">
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded border bg-amber-50 text-amber-800 border-amber-200">
                        Islamic Learning Program
                      </span>
                      <span className="text-[11px] text-slate-500 font-mono">
                        [Date Placeholder]
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-[#0f231c] group-hover:text-[#164e37] transition-colors mb-1.5">
                      Islamic Learning Program
                    </h4>

                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                      Specialized weekend and seasonal educational sessions focused on Tajweed mastery, Fiqh guidance, and prophetic ethical traditions.
                    </p>
                  </div>

                  <div className="pt-3 mt-3 border-t border-[#eee9df] flex items-center justify-end text-xs font-semibold text-[#164e37]">
                    <div className="inline-flex items-center gap-1">
                      <span className="text-xs">View Details</span>
                      <ArrowRight className="w-3 h-3 text-[#c59b27] transform transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>

          {/* View All Events Button Below */}
          <div className="mt-10 sm:mt-12 text-center">
            <Link
              to="/events"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#164e37] hover:bg-[#0f3b29] text-white text-xs sm:text-sm font-semibold rounded-lg transition-colors group shadow-xs"
            >
              <span>View All Events</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#c59b27] transition-transform group-hover:translate-x-1" />
            </Link>
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
