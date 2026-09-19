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
  Languages,
  AlertCircle
} from 'lucide-react';
import { motion } from 'framer-motion';
import { NoticeTicker } from '../components/NoticeTicker';
import { RealisticImageSlot } from '../components/RealisticImageSlot';
import { PlaceholderBadge } from '../components/PlaceholderBadge';

interface HomeProps {
  onOpenAdmissionModal: () => void;
}

export const Home: React.FC<HomeProps> = ({ onOpenAdmissionModal }) => {
  // Admission Enquiry Form State
  const [enquiryForm, setEnquiryForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    studentName: '',
    enquiryType: 'Admission',
    message: ''
  });
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionState, setSubmissionState] = useState<'idle' | 'backend_pending'>('idle');

  const validateForm = () => {
    const errors: { [key: string]: string } = {};

    if (!enquiryForm.fullName.trim() || enquiryForm.fullName.trim().length < 2) {
      errors.fullName = 'Full Name is required (minimum 2 characters).';
    }

    const phoneDigits = enquiryForm.phone.replace(/[^0-9]/g, '');
    if (!enquiryForm.phone.trim()) {
      errors.phone = 'Phone number is required for follow-up.';
    } else if (phoneDigits.length < 10) {
      errors.phone = 'Please enter a valid 10-digit phone number.';
    }

    if (enquiryForm.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(enquiryForm.email.trim())) {
        errors.email = 'Please enter a valid email address.';
      }
    }

    if (!enquiryForm.studentName.trim() || enquiryForm.studentName.trim().length < 2) {
      errors.studentName = 'Student or applicant name is required.';
    }

    if (!enquiryForm.message.trim() || enquiryForm.message.trim().length < 5) {
      errors.message = 'Please enter your message or enquiry details (minimum 5 characters).';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleEnquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    // Simulate validation & network processing before revealing honest backend-pending status
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmissionState('backend_pending');
    }, 600);
  };

  return (
    <div className="w-full flex flex-col bg-[#fbfaf7] text-slate-800">
      {/* 1. Official Notice Ticker */}
      <NoticeTicker onOpenAdmissionModal={onOpenAdmissionModal} />

      {/* 2. MODERN SPLIT-SCREEN HERO SECTION */}
      <section className="relative overflow-hidden bg-white border-b border-[#e5e0d5] py-10 sm:py-16 lg:py-20">
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

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 lg:gap-12 xl:gap-14 items-center">
            {/* LEFT SIDE: Modern Editorial Content (~45% on desktop) */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="md:col-span-6 lg:col-span-5 space-y-4 sm:space-y-6"
            >
              {/* Eyebrow */}
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#c59b27]" />
                <span className="text-[11px] sm:text-xs uppercase tracking-widest font-extrabold text-[#164e37]">
                  SHARAFUL ISLAM MADRASSA
                </span>
              </div>

              {/* Large Responsive Heading */}
              <h1 className="text-3xl sm:text-4xl md:text-3xl lg:text-5xl xl:text-5xl font-extrabold text-[#0f231c] tracking-tight leading-[1.14]">
                Learning. Character. <span className="text-[#164e37]">Faith.</span>
              </h1>

              {/* Short Natural Description */}
              <p className="text-xs sm:text-sm lg:text-base text-slate-600 leading-relaxed max-w-xl">
                Dedicated to providing authentic Quranic recitation, Islamic studies, and disciplined moral education for young learners in a welcoming, character-building environment at Korangath, Tirur.
              </p>

              {/* Action Buttons with comfortable touch & desktop UX */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 pt-1 sm:pt-2">
                <Link
                  to="/about"
                  className="w-full sm:w-auto px-5 sm:px-6 py-3 sm:py-3.5 bg-[#164e37] hover:bg-[#0f3b29] text-white text-xs sm:text-sm font-bold rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 group hover:shadow-sm min-h-[44px]"
                >
                  <span>Explore Our School</span>
                  <ArrowRight className="w-4 h-4 text-[#c59b27] transition-transform group-hover:translate-x-1" />
                </Link>

                <button
                  type="button"
                  onClick={onOpenAdmissionModal}
                  className="w-full sm:w-auto px-5 sm:px-6 py-3 sm:py-3.5 bg-[#f4f1ea] hover:bg-[#ebe6dc] text-slate-800 border border-[#d2cabb] text-xs sm:text-sm font-bold rounded-xl transition-colors flex items-center justify-center gap-2 min-h-[44px]"
                >
                  <GraduationCap className="w-4 h-4 text-[#164e37]" />
                  <span>Admission Enquiry</span>
                </button>
              </div>
            </motion.div>

            {/* RIGHT SIDE: Natural Rectangular Image (~55% on desktop) with Safe Floating Info Element */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.55, delay: 0.15, ease: 'easeOut' }}
              className="md:col-span-6 lg:col-span-7 relative mt-2 md:mt-0 pb-6 sm:pb-8 lg:pb-0"
            >
              {/* Natural Image Composition */}
              <div className="max-h-[260px] sm:max-h-[340px] md:max-h-none overflow-hidden rounded-xl">
                <RealisticImageSlot
                  scene="campus"
                  aspectRatio="16/10"
                  label="Campus Grounds & Verandah"
                  caption="Main campus building at Korangath, Tirur"
                  className="shadow-md"
                />
              </div>

              {/* Floating Info Element Protected from Edge Overflow */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.3, ease: 'easeOut' }}
                className="absolute -bottom-3 left-2 sm:-bottom-4 sm:left-2 md:-bottom-4 md:-left-3 lg:-bottom-5 lg:-left-4 bg-white border border-[#d2cabb] rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 lg:py-3 shadow-md z-20 flex items-center gap-2.5 sm:gap-3 max-w-[calc(100%-16px)]"
              >
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-[#f4f1ea] border border-[#d2cabb] flex items-center justify-center shrink-0 text-[#164e37]">
                  <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#c59b27]" />
                </div>
                <div className="min-w-0">
                  <span className="block text-xs font-extrabold text-[#0f231c] leading-tight truncate">
                    Sharafiyya Korangath
                  </span>
                  <span className="block text-[10px] sm:text-[11px] text-slate-500 font-medium leading-tight mt-0.5 truncate">
                    Korangath, Tirur
                  </span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. QUICK INFORMATION SECTION (Clean 5-Item Grid without dangling card) */}
      <section className="bg-[#f4f1ea] border-b border-[#e5e0d5] py-4 sm:py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2 sm:gap-3 lg:gap-4">
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
                desc: 'Calendar & updates',
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
              // 5th item spans full width on 2-col mobile to prevent single dangling element
              const spanClass = idx === 4 ? 'col-span-2 md:col-span-1' : 'col-span-1';
              const content = (
                <div className="p-2.5 sm:p-3.5 bg-white rounded-xl border border-[#e5e0d5] hover:border-[#164e37] hover:shadow-xs transition-all flex items-center gap-2.5 sm:gap-3 text-left min-h-[44px] h-full">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#f4f1ea] text-[#164e37] flex items-center justify-center shrink-0">
                    <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#164e37]" />
                  </div>
                  <div className="min-w-0">
                    <span className="block text-[11px] sm:text-xs font-bold text-slate-900 truncate">
                      {item.title}
                    </span>
                    <span className="block text-[10px] sm:text-[11px] text-slate-500 truncate">
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
                    className={`w-full text-left ${spanClass}`}
                  >
                    {content}
                  </button>
                );
              }

              return (
                <Link key={idx} to={item.link!} className={`block ${spanClass}`}>
                  {content}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. ABOUT PREVIEW (Modern Editorial 2-Column Section) */}
      <section className="py-12 md:py-16 lg:py-20 bg-white border-b border-[#e5e0d5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 lg:gap-14 items-center">
            {/* Left: Large School/Classroom Image Placeholder */}
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
              className="lg:col-span-6 space-y-5 sm:space-y-6"
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
              <div className="space-y-3.5 sm:space-y-4 pt-1">
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
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#164e37] hover:bg-[#0f3b29] text-white text-xs sm:text-sm font-bold rounded-lg transition-colors group shadow-xs min-h-[44px]"
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
      <section className="relative overflow-hidden py-12 md:py-16 lg:py-20 bg-[#fbfaf7] border-b border-[#e5e0d5]">
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

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          {/* Section Header */}
          <div className="max-w-3xl mb-8 sm:mb-10 lg:mb-12">
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
            <div className="mt-3.5 flex flex-wrap items-center gap-2">
              <PlaceholderBadge label="Editable Placeholder Categories" size="sm" />
              <span className="text-xs text-slate-500 italic">
                These are editable placeholder categories. Official syllabus and departments will be updated upon institutional confirmation.
              </span>
            </div>
          </div>

          {/* 4 Learning Areas - 2 cols on tablet, 4 cols on desktop */}
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
                className="group relative flex flex-col justify-between p-5 sm:p-6 lg:p-7 bg-white/80 hover:bg-white rounded-xl border border-[#e5e0d5] hover:border-[#164e37]/40 hover:shadow-xs transition-all duration-200 h-full"
              >
                <div>
                  {/* Top Bar: Number & Subtle Small Visual Mark */}
                  <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-[#eee9df]">
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

                {/* Subtle Hover Interaction */}
                <div className="pt-3.5 mt-5 border-t border-[#f0ece3] flex items-center justify-between text-xs font-semibold">
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
          <div className="mt-8 sm:mt-10 lg:mt-12 text-center">
            <Link
              to="/departments"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#164e37] hover:bg-[#0f3b29] text-white text-xs sm:text-sm font-semibold rounded-lg transition-colors group shadow-xs min-h-[44px]"
            >
              <span>Explore Academics</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#c59b27] transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* 6. NOTICE BOARD / LATEST UPDATES (Modern Horizontal Editorial Notice Section) */}
      <section className="py-12 md:py-16 lg:py-18 bg-white border-b border-[#e5e0d5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
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
                className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 bg-[#f4f1ea] hover:bg-[#eae5d9] text-[#164e37] text-xs font-bold rounded-lg border border-[#d2cabb] transition-colors group min-h-[40px]"
              >
                <span>View All Notices</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#c59b27] transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Horizontal Editorial Notice Grid: Desktop (3-col horizontal), Tablet (2-col balanced), Mobile (vertical list) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {[
              {
                id: 'notice-1',
                category: 'Academic Notice',
                datePlaceholder: '[Date Placeholder]',
                title: 'Academic Notice',
                description: 'Important academic announcements will appear here. Regular examination timetables, syllabus progressions, and term schedules are posted by the office.',
                badgeStyle: 'bg-emerald-50 text-emerald-800 border-emerald-200',
                colSpan: 'col-span-1',
              },
              {
                id: 'notice-2',
                category: 'Admission Update',
                datePlaceholder: '[Date Placeholder]',
                title: 'Admission Update',
                description: 'Admission-related information will be updated here. Application forms, intake schedules, and enrollment guidelines for upcoming batches will be confirmed here.',
                badgeStyle: 'bg-blue-50 text-blue-800 border-blue-200',
                colSpan: 'col-span-1',
              },
              {
                id: 'notice-3',
                category: 'Institution Notice',
                datePlaceholder: '[Date Placeholder]',
                title: 'Institution Notice',
                description: 'Important notices and announcements will appear here. General circulars, institutional schedules, and parent-teacher updates will be communicated here.',
                badgeStyle: 'bg-amber-50 text-amber-800 border-amber-200',
                colSpan: 'col-span-1 md:col-span-2 lg:col-span-1',
              },
            ].map((notice) => (
              <Link
                key={notice.id}
                to="/events"
                className={`group relative flex flex-col justify-between p-5 sm:p-6 bg-[#fbfaf7] hover:bg-white rounded-xl border border-[#e5e0d5] hover:border-[#164e37]/40 hover:shadow-xs transition-all duration-200 h-full ${notice.colSpan}`}
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
                <div className="pt-3.5 mt-5 border-t border-[#eee9df] flex items-center justify-between text-xs font-semibold">
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
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#f4f1ea] hover:bg-[#eae5d9] text-[#164e37] text-xs sm:text-sm font-bold rounded-lg border border-[#d2cabb] transition-colors group shadow-xs min-h-[44px]"
            >
              <span>View All Notices</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#c59b27] transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* 7. EVENTS & PROGRAMS (Modern Editorial Asymmetric Layout) */}
      <section className="py-12 md:py-16 lg:py-20 bg-[#fbfaf7] border-b border-[#e5e0d5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
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
                className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-[#f4f1ea] text-[#164e37] text-xs font-bold rounded-lg border border-[#d2cabb] transition-colors group shadow-2xs min-h-[40px]"
              >
                <span>View All Events</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#c59b27] transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Editorial Asymmetric Layout: Left = 1 Large Featured, Right = 2 Smaller Stacked */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
            {/* Left: Featured Event Placeholder (Large) */}
            <div className="lg:col-span-7 flex">
              <Link
                to="/events"
                className="group relative w-full flex flex-col justify-between bg-white rounded-xl border border-[#e5e0d5] hover:border-[#164e37]/40 hover:shadow-xs transition-all duration-200 overflow-hidden"
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
                <div className="p-5 sm:p-6 lg:p-7 flex-1 flex flex-col justify-between">
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

            {/* Right: 2 Smaller Secondary Event Items (side by side on tablet, stacked on desktop) */}
            <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col justify-between gap-5 sm:gap-6">
              {/* Secondary Event 1: Student Activity */}
              <Link
                to="/events"
                className="group relative flex-1 flex flex-col bg-white rounded-xl border border-[#e5e0d5] hover:border-[#164e37]/40 hover:shadow-xs transition-all duration-200 overflow-hidden"
              >
                <div className="overflow-hidden bg-[#f4f1ea] shrink-0">
                  <div className="h-full transform transition-transform duration-500 ease-out group-hover:scale-[1.03]">
                    <RealisticImageSlot
                      scene="activities"
                      aspectRatio="16/10"
                      label="Student Activity Photo Placeholder"
                      caption="Student co-curricular activity and study circle"
                    />
                  </div>
                </div>

                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
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
                className="group relative flex-1 flex flex-col bg-white rounded-xl border border-[#e5e0d5] hover:border-[#164e37]/40 hover:shadow-xs transition-all duration-200 overflow-hidden"
              >
                <div className="overflow-hidden bg-[#f4f1ea] shrink-0">
                  <div className="h-full transform transition-transform duration-500 ease-out group-hover:scale-[1.03]">
                    <RealisticImageSlot
                      scene="quran_study"
                      aspectRatio="16/10"
                      label="Educational Event Photo Placeholder"
                      caption="Structured Islamic study session and Quranic learning circle"
                    />
                  </div>
                </div>

                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
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
          <div className="mt-8 sm:mt-10 lg:mt-12 text-center">
            <Link
              to="/events"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#164e37] hover:bg-[#0f3b29] text-white text-xs sm:text-sm font-semibold rounded-lg transition-colors group shadow-xs min-h-[44px]"
            >
              <span>View All Events</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#c59b27] transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* 8. GALLERY SECTION (Modern Asymmetric Editorial Gallery) */}
      <section className="py-14 lg:py-20 bg-white border-b border-[#e5e0d5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="h-px w-5 bg-[#c59b27]"></span>
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#164e37]">
                  Campus Photo Archive
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0f231c] tracking-tight">
                Life at Sharaful Islam
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1.5 font-normal">
                A glimpse into learning, activities and moments from our institution.
              </p>
            </div>

            <div className="flex items-center gap-2.5">
              <PlaceholderBadge label="Editable Photo Archive" size="sm" />
              <Link
                to="/gallery"
                className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 bg-[#f4f1ea] hover:bg-[#eae5d9] text-[#164e37] text-xs font-bold rounded-lg border border-[#d2cabb] transition-colors group"
              >
                <span>View Full Gallery</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#c59b27] transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Asymmetric Editorial Gallery Composition */}
          {/* Top Row: 1 Large Featured (7 cols) + 2 Medium (5 cols stacked) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 lg:gap-6 mb-5 lg:mb-6">
            {/* 1 Large Featured Image: Campus (7 cols on desktop) */}
            <div className="md:col-span-2 lg:col-span-7 flex">
              <Link
                to="/gallery"
                className="group relative w-full flex flex-col justify-between rounded-lg border border-[#e5e0d5] bg-[#fbfaf7] overflow-hidden hover:border-[#164e37]/40 hover:shadow-xs transition-all duration-300"
              >
                <div className="relative overflow-hidden bg-[#f4f1ea] flex-1 min-h-[260px] sm:min-h-[320px]">
                  {/* Category Chip with Hover State */}
                  <div className="absolute top-3 left-3 z-20">
                    <span className="inline-block text-[11px] font-semibold px-2.5 py-1 rounded bg-white/95 text-[#0f231c] border border-[#e5e0d5] shadow-2xs group-hover:bg-[#164e37] group-hover:text-white group-hover:border-[#164e37] transition-all duration-200">
                      Campus
                    </span>
                  </div>

                  <div className="h-full transform transition-transform duration-500 ease-out group-hover:scale-[1.03]">
                    <RealisticImageSlot
                      scene="campus"
                      aspectRatio="16/10"
                      label="Campus Grounds & Architecture Placeholder"
                      caption="Main campus grounds, front courtyard, and verandah in Korangath"
                      className="h-full w-full"
                    />
                  </div>
                </div>

                <div className="p-4 sm:p-5 bg-white border-t border-[#eee9df] flex items-center justify-between">
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-[#0f231c] group-hover:text-[#164e37] transition-colors">
                      Campus Grounds & Architecture
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Main campus building and surrounding greenery in Korangath
                    </p>
                  </div>
                  <div className="shrink-0 text-[#164e37] flex items-center gap-1 text-xs font-semibold pl-3">
                    <span className="hidden sm:inline">View Image</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#c59b27] transform transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            </div>

            {/* 2 Medium Images (5 cols on desktop, stacked) */}
            <div className="md:col-span-2 lg:col-span-5 flex flex-col justify-between gap-5 sm:gap-6">
              {/* Medium 1: Classroom */}
              <Link
                to="/gallery"
                className="group relative flex-1 flex flex-col justify-between rounded-lg border border-[#e5e0d5] bg-[#fbfaf7] overflow-hidden hover:border-[#164e37]/40 hover:shadow-xs transition-all duration-300"
              >
                <div className="relative overflow-hidden bg-[#f4f1ea]">
                  <div className="absolute top-3 left-3 z-20">
                    <span className="inline-block text-[11px] font-semibold px-2.5 py-1 rounded bg-white/95 text-[#0f231c] border border-[#e5e0d5] shadow-2xs group-hover:bg-[#164e37] group-hover:text-white group-hover:border-[#164e37] transition-all duration-200">
                      Classroom
                    </span>
                  </div>

                  <div className="transform transition-transform duration-500 ease-out group-hover:scale-[1.03]">
                    <RealisticImageSlot
                      scene="classroom"
                      aspectRatio="16/10"
                      label="Classroom Study Hall Placeholder"
                      caption="Classroom benches and student study environment"
                    />
                  </div>
                </div>

                <div className="p-3.5 sm:p-4 bg-white border-t border-[#eee9df] flex items-center justify-between">
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-[#0f231c] group-hover:text-[#164e37] transition-colors">
                      Classroom Learning Hall
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Structured learning desks and interactive study spaces
                    </p>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-[#c59b27] transform transition-transform group-hover:translate-x-1 shrink-0 ml-2" />
                </div>
              </Link>

              {/* Medium 2: Student Activities */}
              <Link
                to="/gallery"
                className="group relative flex-1 flex flex-col justify-between rounded-lg border border-[#e5e0d5] bg-[#fbfaf7] overflow-hidden hover:border-[#164e37]/40 hover:shadow-xs transition-all duration-300"
              >
                <div className="relative overflow-hidden bg-[#f4f1ea]">
                  <div className="absolute top-3 left-3 z-20">
                    <span className="inline-block text-[11px] font-semibold px-2.5 py-1 rounded bg-white/95 text-[#0f231c] border border-[#e5e0d5] shadow-2xs group-hover:bg-[#164e37] group-hover:text-white group-hover:border-[#164e37] transition-all duration-200">
                      Student Activities
                    </span>
                  </div>

                  <div className="transform transition-transform duration-500 ease-out group-hover:scale-[1.03]">
                    <RealisticImageSlot
                      scene="activities"
                      aspectRatio="16/10"
                      label="Student Activities Placeholder"
                      caption="Student activities, study circles, and peer workshops"
                    />
                  </div>
                </div>

                <div className="p-3.5 sm:p-4 bg-white border-t border-[#eee9df] flex items-center justify-between">
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-[#0f231c] group-hover:text-[#164e37] transition-colors">
                      Student Activities & Circles
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Peer collaboration and character-building exercises
                    </p>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-[#c59b27] transform transition-transform group-hover:translate-x-1 shrink-0 ml-2" />
                </div>
              </Link>
            </div>
          </div>

          {/* Bottom Row: 3 Smaller Supporting Images (Islamic Programs, Educational Events, Community Activities) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {/* Supporting 1: Islamic Programs */}
            <Link
              to="/gallery"
              className="group relative flex flex-col justify-between rounded-lg border border-[#e5e0d5] bg-[#fbfaf7] overflow-hidden hover:border-[#164e37]/40 hover:shadow-xs transition-all duration-300"
            >
              <div className="relative overflow-hidden bg-[#f4f1ea]">
                <div className="absolute top-3 left-3 z-20">
                  <span className="inline-block text-[11px] font-semibold px-2.5 py-1 rounded bg-white/95 text-[#0f231c] border border-[#e5e0d5] shadow-2xs group-hover:bg-[#164e37] group-hover:text-white group-hover:border-[#164e37] transition-all duration-200">
                    Islamic Programs
                  </span>
                </div>

                <div className="transform transition-transform duration-500 ease-out group-hover:scale-[1.03]">
                  <RealisticImageSlot
                    scene="quran_study"
                    aspectRatio="16/10"
                    label="Islamic Programs Photo Placeholder"
                    caption="Quranic recitation circles and moral study classes"
                  />
                </div>
              </div>

              <div className="p-3.5 sm:p-4 bg-white border-t border-[#eee9df] flex items-center justify-between">
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#0f231c] group-hover:text-[#164e37] transition-colors">
                    Islamic Learning Sessions
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Focused Tajweed recitations and Fiqh foundations
                  </p>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-[#c59b27] transform transition-transform group-hover:translate-x-1 shrink-0 ml-2" />
              </div>
            </Link>

            {/* Supporting 2: Educational Events */}
            <Link
              to="/gallery"
              className="group relative flex flex-col justify-between rounded-lg border border-[#e5e0d5] bg-[#fbfaf7] overflow-hidden hover:border-[#164e37]/40 hover:shadow-xs transition-all duration-300"
            >
              <div className="relative overflow-hidden bg-[#f4f1ea]">
                <div className="absolute top-3 left-3 z-20">
                  <span className="inline-block text-[11px] font-semibold px-2.5 py-1 rounded bg-white/95 text-[#0f231c] border border-[#e5e0d5] shadow-2xs group-hover:bg-[#164e37] group-hover:text-white group-hover:border-[#164e37] transition-all duration-200">
                    Educational Events
                  </span>
                </div>

                <div className="transform transition-transform duration-500 ease-out group-hover:scale-[1.03]">
                  <RealisticImageSlot
                    scene="assembly"
                    aspectRatio="16/10"
                    label="Educational Events Photo Placeholder"
                    caption="School assembly gatherings and student presentations"
                  />
                </div>
              </div>

              <div className="p-3.5 sm:p-4 bg-white border-t border-[#eee9df] flex items-center justify-between">
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#0f231c] group-hover:text-[#164e37] transition-colors">
                    Assembly Gatherings
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Morning invocations, presentations and recognitions
                  </p>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-[#c59b27] transform transition-transform group-hover:translate-x-1 shrink-0 ml-2" />
              </div>
            </Link>

            {/* Supporting 3: Community Activities */}
            <Link
              to="/gallery"
              className="group relative flex flex-col justify-between rounded-lg border border-[#e5e0d5] bg-[#fbfaf7] overflow-hidden hover:border-[#164e37]/40 hover:shadow-xs transition-all duration-300 md:col-span-2 lg:col-span-1"
            >
              <div className="relative overflow-hidden bg-[#f4f1ea]">
                <div className="absolute top-3 left-3 z-20">
                  <span className="inline-block text-[11px] font-semibold px-2.5 py-1 rounded bg-white/95 text-[#0f231c] border border-[#e5e0d5] shadow-2xs group-hover:bg-[#164e37] group-hover:text-white group-hover:border-[#164e37] transition-all duration-200">
                    Community Activities
                  </span>
                </div>

                <div className="transform transition-transform duration-500 ease-out group-hover:scale-[1.03]">
                  <RealisticImageSlot
                    scene="library"
                    aspectRatio="16/10"
                    label="Community Activities Photo Placeholder"
                    caption="Institutional library resources and community consultative meetings"
                  />
                </div>
              </div>

              <div className="p-3.5 sm:p-4 bg-white border-t border-[#eee9df] flex items-center justify-between">
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#0f231c] group-hover:text-[#164e37] transition-colors">
                    Community Consultations
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Library reference folios and guardian community dialogue
                  </p>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-[#c59b27] transform transition-transform group-hover:translate-x-1 shrink-0 ml-2" />
              </div>
            </Link>
          </div>

          {/* View Full Gallery Button Below */}
          <div className="mt-10 sm:mt-12 text-center">
            <Link
              to="/gallery"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#164e37] hover:bg-[#0f3b29] text-white text-xs sm:text-sm font-semibold rounded-lg transition-colors group shadow-xs"
            >
              <span>View Full Gallery</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#c59b27] transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* 9. STUDENT PORTAL SECTION (Modern 2026 Split-Layout Preview) */}
      <section className="py-16 lg:py-24 bg-[#123628] text-white border-b border-[#164e37] relative overflow-hidden">
        {/* Subtle geometric background motif */}
        <div className="absolute inset-0 opacity-[0.035] pointer-events-none select-none overflow-hidden">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="portal-pattern" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 30 0 L 60 30 L 30 60 L 0 30 Z" fill="none" stroke="#ffffff" strokeWidth="0.75" />
                <circle cx="30" cy="30" r="3" fill="none" stroke="#c59b27" strokeWidth="0.75" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#portal-pattern)" />
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* LEFT COLUMN: Headings, Description, CTA */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-5 space-y-5"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1b5038] border border-[#276e4e] text-xs font-semibold text-emerald-200">
                <Sparkles className="w-3.5 h-3.5 text-[#c59b27]" />
                <span>Student & Parent Portal</span>
                <span className="text-[10px] font-bold bg-[#c59b27] text-slate-950 px-2 py-0.5 rounded-full">
                  Coming Soon
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="h-px w-5 bg-[#c59b27]"></span>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-300">
                    Digital Campus Services
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
                  Everything Students Need, In One Place
                </h2>
              </div>

              <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed font-normal">
                A dedicated digital space for students to access important academic information and resources. Planned to provide unified access to attendance records, evaluations, circulars, and study materials.
              </p>

              {/* Action Button & Subtext */}
              <div className="pt-2 space-y-2.5">
                <Link
                  to="/students"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#c59b27] hover:bg-[#d6a933] text-slate-950 text-xs sm:text-sm font-bold rounded-lg transition-all duration-200 shadow-sm group transform active:scale-98"
                >
                  <span>Open Student Portal</span>
                  <ArrowRight className="w-4 h-4 text-slate-950 transition-transform group-hover:translate-x-1" />
                </Link>
                <p className="text-xs text-emerald-300/80 font-medium">
                  Student portal access coming soon
                </p>
              </div>

              {/* Planned Feature Points */}
              <div className="pt-4 border-t border-[#1b5038] grid grid-cols-2 gap-3 text-xs text-emerald-200/90">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#c59b27] shrink-0" />
                  <span>Attendance Tracking</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#c59b27] shrink-0" />
                  <span>Academic Information</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#c59b27] shrink-0" />
                  <span>Events & Circulars</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#c59b27] shrink-0" />
                  <span>Tajweed Resources</span>
                </div>
              </div>
            </motion.div>

            {/* RIGHT COLUMN: Modern Visual Preview of Student Portal Dashboard */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              whileHover={{ y: -4 }}
              className="lg:col-span-7"
            >
              <div className="bg-[#fbfaf7] text-slate-800 rounded-xl border border-[#d8d2c4] shadow-xl overflow-hidden transition-all duration-300">
                {/* Dashboard Window Top Bar */}
                <div className="bg-[#0f2c21] text-white px-3 sm:px-5 py-2.5 sm:py-3 flex items-center justify-between gap-2 border-b border-[#1b5038]">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="flex gap-1 shrink-0">
                      <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-rose-500/80"></span>
                      <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-amber-500/80"></span>
                      <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-emerald-500/80"></span>
                    </div>
                    <span className="text-[10px] sm:text-[11px] font-mono text-emerald-200/70 border-l border-emerald-800/60 pl-2 truncate">
                      portal.sharafiyya.edu
                    </span>
                  </div>
                  <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#c59b27] text-slate-950 shrink-0">
                    Coming Soon
                  </span>
                </div>

                {/* Dashboard Main Content Body */}
                <div className="p-3 sm:p-6 space-y-3 sm:space-y-4">
                  {/* Student Profile Placeholder Card */}
                  <div className="p-3 sm:p-4 bg-white rounded-lg border border-[#e5e0d5] flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#164e37] text-white flex items-center justify-center font-bold text-sm shrink-0">
                        <GraduationCap className="w-5 h-5 text-[#c59b27]" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm sm:text-base font-bold text-[#0f231c]">
                            Student Name
                          </h4>
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                            Enrolled
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Class: <span className="font-medium text-slate-700">Class Placeholder</span> • Roll: <span className="font-mono text-slate-600">ID-XXXX</span>
                        </p>
                      </div>
                    </div>

                    {/* Attendance Placeholder Pill */}
                    <div className="sm:text-right bg-[#fbfaf7] sm:bg-transparent p-2 sm:p-0 rounded border sm:border-0 border-[#eee9df]">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">
                        Attendance Record
                      </span>
                      <span className="text-xs font-semibold text-[#164e37]">
                        [Attendance Placeholder]
                      </span>
                    </div>
                  </div>

                  {/* Dashboard Preview Modules Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {/* Module 1: Academic Information */}
                    <div className="p-3.5 bg-white rounded-lg border border-[#e5e0d5] space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-[#164e37] uppercase tracking-wider flex items-center gap-1.5">
                          <BookOpen className="w-3.5 h-3.5 text-[#c59b27]" />
                          Academic Information
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">[Module]</span>
                      </div>
                      <div className="space-y-1.5 text-xs text-slate-600">
                        <div className="flex justify-between py-1 border-b border-[#f4f1ea]">
                          <span>Current Syllabus Module:</span>
                          <span className="font-medium text-slate-800">[Placeholder]</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-[#f4f1ea]">
                          <span>Term Progress Card:</span>
                          <span className="text-emerald-700 font-semibold">[Coming Soon]</span>
                        </div>
                      </div>
                    </div>

                    {/* Module 2: Notices */}
                    <div className="p-3.5 bg-white rounded-lg border border-[#e5e0d5] space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-[#164e37] uppercase tracking-wider flex items-center gap-1.5">
                          <FileText className="w-3.5 h-3.5 text-[#c59b27]" />
                          Notices
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">[Updates]</span>
                      </div>
                      <div className="space-y-1.5 text-xs text-slate-600">
                        <div className="p-1.5 rounded bg-[#fbfaf7] border border-[#eee9df]">
                          <span className="font-semibold text-slate-800 block text-[11px]">Academic Schedule Notice</span>
                          <span className="text-[10px] text-slate-500">Official circular for students</span>
                        </div>
                      </div>
                    </div>

                    {/* Module 3: Events */}
                    <div className="p-3.5 bg-white rounded-lg border border-[#e5e0d5] space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-[#164e37] uppercase tracking-wider flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-[#c59b27]" />
                          Events
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">[Calendar]</span>
                      </div>
                      <div className="space-y-1 text-xs text-slate-600">
                        <p className="text-[11px]">Next Institutional Assembly & Examination milestones will be posted here.</p>
                      </div>
                    </div>

                    {/* Module 4: Resources */}
                    <div className="p-3.5 bg-white rounded-lg border border-[#e5e0d5] space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-[#164e37] uppercase tracking-wider flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-[#c59b27]" />
                          Resources
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">[Library]</span>
                      </div>
                      <div className="space-y-1 text-xs text-slate-600">
                        <p className="text-[11px]">Daily Masnoon Azkar, audio recitation guides, and download center.</p>
                      </div>
                    </div>
                  </div>

                  {/* Visual Preview Disclaimer Footer */}
                  <div className="p-2.5 bg-[#f4f1ea] rounded-md border border-[#e2dcd0] flex items-center justify-between text-[11px] text-slate-600">
                    <span>Preview interface • Under active development</span>
                    <span className="font-bold text-[#164e37]">Sharafiyya Korangath</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 10. CONTACT & ADMISSION ENQUIRY SECTION (Modern Two-Column Area) */}
      <section className="py-16 lg:py-24 bg-white border-b border-[#e5e0d5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Left Column: Heading, Context, Placeholders, Map Slot */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="h-px w-5 bg-[#c59b27]"></span>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-[#164e37]">
                    Contact & Enquiries
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0f231c] tracking-tight">
                  Have a Question?
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 font-normal leading-relaxed">
                  For admissions, academic information, programs, or general enquiries, get in touch with us.
                </p>
              </div>

              {/* Editable Contact Information Placeholders */}
              <div className="space-y-3 text-xs">
                {/* Location */}
                <div className="p-4 rounded-lg bg-[#fbfaf7] border border-[#e5e0d5] flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#f4f1ea] flex items-center justify-center shrink-0 text-[#164e37]">
                    <MapPin className="w-4 h-4 text-[#164e37]" />
                  </div>
                  <div>
                    <strong className="block text-slate-900 font-bold">Campus Location</strong>
                    <span className="text-slate-600 block mt-0.5 font-normal">
                      [Address Placeholder — Korangath, Tirur, Malappuram District, Kerala – 676101]
                    </span>
                    <span className="text-[10px] text-slate-400 mt-1 block font-mono">
                      Transit: ~3.5 km from Tirur Railway Station
                    </span>
                  </div>
                </div>

                {/* Phone */}
                <div className="p-4 rounded-lg bg-[#fbfaf7] border border-[#e5e0d5] flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#f4f1ea] flex items-center justify-center shrink-0 text-[#164e37]">
                    <Phone className="w-4 h-4 text-[#164e37]" />
                  </div>
                  <div>
                    <strong className="block text-slate-900 font-bold">Phone Number</strong>
                    <span className="text-slate-600 block mt-0.5 font-mono">
                      [Official Phone Number Placeholder]
                    </span>
                  </div>
                </div>

                {/* Email */}
                <div className="p-4 rounded-lg bg-[#fbfaf7] border border-[#e5e0d5] flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#f4f1ea] flex items-center justify-center shrink-0 text-[#164e37]">
                    <Mail className="w-4 h-4 text-[#164e37]" />
                  </div>
                  <div>
                    <strong className="block text-slate-900 font-bold">Email Address</strong>
                    <span className="text-slate-600 block mt-0.5 font-mono">
                      [Official Email Address Placeholder]
                    </span>
                  </div>
                </div>

                {/* Office Hours */}
                <div className="p-4 rounded-lg bg-[#fbfaf7] border border-[#e5e0d5] flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#f4f1ea] flex items-center justify-center shrink-0 text-[#164e37]">
                    <Clock className="w-4 h-4 text-[#164e37]" />
                  </div>
                  <div>
                    <strong className="block text-slate-900 font-bold">Office Hours</strong>
                    <span className="text-slate-600 block mt-0.5 font-normal">
                      [Official Office Hours Placeholder — Sunday to Thursday, 8:00 AM – 4:00 PM]
                    </span>
                  </div>
                </div>
              </div>

              {/* Location / Map Placeholder (Honest, not fake map) */}
              <div className="p-4 rounded-lg bg-[#fbfaf7] border border-[#e5e0d5] text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#164e37] uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#c59b27]" />
                    Location Map Placeholder
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">Korangath, Tirur</span>
                </div>
                <div className="h-28 bg-[#f4f1ea] rounded border border-dashed border-[#d2cabb] flex flex-col items-center justify-center text-center p-3 text-slate-500">
                  <MapPin className="w-5 h-5 text-[#164e37]/40 mb-1" />
                  <span className="font-semibold text-[11px] text-slate-700">Interactive Map Integration Pending</span>
                  <span className="text-[10px] text-slate-500 max-w-xs mt-0.5">
                    Official GPS coordinates will be embedded upon institutional confirmation.
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Clean Admission Enquiry Form */}
            <div className="lg:col-span-7 bg-[#fbfaf7] p-4 sm:p-6 lg:p-8 rounded-xl border border-[#e5e0d5] shadow-xs">
              <div className="flex items-center justify-between pb-3 mb-5 border-b border-[#eee9df]">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#0f231c]">
                    Admission & General Enquiry
                  </h3>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Submit your details and questions for the administrative office.
                  </p>
                </div>
                <PlaceholderBadge label="Enquiry Desk" size="sm" />
              </div>

              {submissionState === 'backend_pending' ? (
                <div className="p-6 bg-white border border-[#d2cabb] rounded-xl text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6 text-[#164e37]" />
                  </div>
                  <h4 className="text-base font-bold text-[#0f231c]">
                    Form Integration Coming Soon
                  </h4>
                  <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                    Thank you, <strong>{enquiryForm.fullName}</strong>. Your enquiry details for <strong>{enquiryForm.studentName}</strong> regarding <strong>{enquiryForm.enquiryType}</strong> have been validated. Online submission requires Firebase Firestore/Cloud Functions integration, which is currently under development.
                  </p>
                  <div className="p-3 bg-[#fbfaf7] rounded-lg border border-[#e5e0d5] text-left text-xs max-w-sm mx-auto space-y-1">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Applicant:</span>
                      <span className="font-semibold text-slate-800">{enquiryForm.fullName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Student:</span>
                      <span className="font-semibold text-slate-800">{enquiryForm.studentName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Phone:</span>
                      <span className="font-mono text-slate-800">{enquiryForm.phone}</span>
                    </div>
                    {enquiryForm.email && (
                      <div className="flex justify-between">
                        <span className="text-slate-500">Email:</span>
                        <span className="font-mono text-slate-800">{enquiryForm.email}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-slate-500">Type:</span>
                      <span className="text-[#164e37] font-semibold">{enquiryForm.enquiryType}</span>
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    For urgent enquiries, please visit the madrassa office in Korangath during official visiting hours.
                  </p>
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setSubmissionState('idle');
                        setEnquiryForm({ fullName: '', phone: '', email: '', studentName: '', enquiryType: 'Admission', message: '' });
                        setFormErrors({});
                      }}
                      className="px-5 py-2.5 bg-[#164e37] hover:bg-[#0f3b29] text-white text-xs font-semibold rounded-lg transition-colors inline-block cursor-pointer"
                    >
                      Submit Another Enquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleEnquirySubmit} noValidate className="space-y-4 text-xs">
                  {/* Row 1: Full Name & Phone Number */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold text-slate-800 mb-1">
                        Full Name <span className="text-rose-600">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Your full name"
                        value={enquiryForm.fullName}
                        onChange={(e) => {
                          setEnquiryForm({ ...enquiryForm, fullName: e.target.value });
                          if (formErrors.fullName) setFormErrors({ ...formErrors, fullName: '' });
                        }}
                        className={`w-full px-3 py-2.5 text-xs bg-white border ${formErrors.fullName ? 'border-rose-400 ring-1 ring-rose-300' : 'border-[#d2cabb]'} rounded-lg focus:outline-none focus:ring-1 focus:ring-[#164e37] transition-all`}
                      />
                      {formErrors.fullName && (
                        <p className="text-rose-600 text-[11px] mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3 shrink-0" />
                          <span>{formErrors.fullName}</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-800 mb-1">
                        Phone Number <span className="text-rose-600">*</span>
                      </label>
                      <input
                        type="tel"
                        placeholder="+91 Phone number"
                        value={enquiryForm.phone}
                        onChange={(e) => {
                          setEnquiryForm({ ...enquiryForm, phone: e.target.value });
                          if (formErrors.phone) setFormErrors({ ...formErrors, phone: '' });
                        }}
                        className={`w-full px-3 py-2.5 text-xs bg-white border ${formErrors.phone ? 'border-rose-400 ring-1 ring-rose-300' : 'border-[#d2cabb]'} rounded-lg focus:outline-none focus:ring-1 focus:ring-[#164e37] transition-all`}
                      />
                      {formErrors.phone && (
                        <p className="text-rose-600 text-[11px] mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3 shrink-0" />
                          <span>{formErrors.phone}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Row 2: Email & Student / Applicant Name */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold text-slate-800 mb-1">
                        Email Address <span className="text-slate-400 font-normal">(Optional)</span>
                      </label>
                      <input
                        type="email"
                        placeholder="example@mail.com"
                        value={enquiryForm.email}
                        onChange={(e) => {
                          setEnquiryForm({ ...enquiryForm, email: e.target.value });
                          if (formErrors.email) setFormErrors({ ...formErrors, email: '' });
                        }}
                        className={`w-full px-3 py-2.5 text-xs bg-white border ${formErrors.email ? 'border-rose-400 ring-1 ring-rose-300' : 'border-[#d2cabb]'} rounded-lg focus:outline-none focus:ring-1 focus:ring-[#164e37] transition-all`}
                      />
                      {formErrors.email && (
                        <p className="text-rose-600 text-[11px] mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3 shrink-0" />
                          <span>{formErrors.email}</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-800 mb-1">
                        Student / Applicant Name <span className="text-rose-600">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Student's name"
                        value={enquiryForm.studentName}
                        onChange={(e) => {
                          setEnquiryForm({ ...enquiryForm, studentName: e.target.value });
                          if (formErrors.studentName) setFormErrors({ ...formErrors, studentName: '' });
                        }}
                        className={`w-full px-3 py-2.5 text-xs bg-white border ${formErrors.studentName ? 'border-rose-400 ring-1 ring-rose-300' : 'border-[#d2cabb]'} rounded-lg focus:outline-none focus:ring-1 focus:ring-[#164e37] transition-all`}
                      />
                      {formErrors.studentName && (
                        <p className="text-rose-600 text-[11px] mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3 shrink-0" />
                          <span>{formErrors.studentName}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Row 3: Enquiry Type */}
                  <div>
                    <label className="block font-semibold text-slate-800 mb-1">
                      Enquiry Type <span className="text-rose-600">*</span>
                    </label>
                    <select
                      value={enquiryForm.enquiryType}
                      onChange={(e) => setEnquiryForm({ ...enquiryForm, enquiryType: e.target.value })}
                      className="w-full px-3 py-2.5 text-xs bg-white border border-[#d2cabb] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#164e37] cursor-pointer"
                    >
                      <option value="Admission">Admission</option>
                      <option value="Academic Information">Academic Information</option>
                      <option value="Student Information">Student Information</option>
                      <option value="General Enquiry">General Enquiry</option>
                    </select>
                  </div>

                  {/* Row 4: Message */}
                  <div>
                    <label className="block font-semibold text-slate-800 mb-1">
                      Message <span className="text-rose-600">*</span>
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Please specify your query regarding admission requirements, class batches, or academic details..."
                      value={enquiryForm.message}
                      onChange={(e) => {
                        setEnquiryForm({ ...enquiryForm, message: e.target.value });
                        if (formErrors.message) setFormErrors({ ...formErrors, message: '' });
                      }}
                      className={`w-full px-3 py-2.5 text-xs bg-white border ${formErrors.message ? 'border-rose-400 ring-1 ring-rose-300' : 'border-[#d2cabb]'} rounded-lg focus:outline-none focus:ring-1 focus:ring-[#164e37] resize-none transition-all`}
                    />
                    {formErrors.message && (
                      <p className="text-rose-600 text-[11px] mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        <span>{formErrors.message}</span>
                      </p>
                    )}
                  </div>

                  {/* Submission Row */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto px-6 py-3 min-h-[44px] bg-[#164e37] hover:bg-[#0f3b29] disabled:bg-slate-400 text-white font-bold rounded-lg shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          <span>Validating & Submitting...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5 text-[#c59b27]" />
                          <span>Send Enquiry</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={onOpenAdmissionModal}
                      className="w-full sm:w-auto px-4 py-3 min-h-[44px] bg-white hover:bg-[#f4f1ea] text-slate-700 font-semibold border border-[#d2cabb] rounded-lg transition-colors cursor-pointer text-center"
                    >
                      Admission Form Modal
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
