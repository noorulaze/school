import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  GraduationCap,
  ArrowRight,
  BookOpen,
  Users,
  Calendar,
  MapPin,
  Image as ImageIcon,
  Layers,
  Sparkles,
  Bell,
  ChevronRight,
  CheckCircle2,
} from 'lucide-react';
import { motion, type Variants } from 'framer-motion';
import { NoticeTicker } from '../components/NoticeTicker';
import { RealisticImageSlot } from '../components/RealisticImageSlot';
import { getPublicNotices, getPublicEvents } from '../services/publicService';
import type { NoticeItem, EventItem } from '../types/firestore';

interface HomeProps {
  onOpenAdmissionModal: () => void;
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45 },
  },
};

export const Home: React.FC<HomeProps> = ({ onOpenAdmissionModal }) => {
  const [latestNotice, setLatestNotice] = useState<NoticeItem | null>(null);
  const [latestEvent, setLatestEvent] = useState<EventItem | null>(null);

  useEffect(() => {
    let isMounted = true;
    const loadUpdates = async () => {
      try {
        const [notices, events] = await Promise.all([getPublicNotices(), getPublicEvents()]);
        if (!isMounted) return;
        if (notices.length > 0) setLatestNotice(notices[0]);
        if (events.length > 0) setLatestEvent(events[0]);
      } catch {
        // Fallback gracefully to placeholder updates
      }
    };
    loadUpdates();
    return () => {
      isMounted = false;
    };
  }, []);

  // Show only ONE single update (prefer notice, fallback to event)
  const singleUpdate = latestNotice
    ? {
        type: 'Notice',
        icon: Bell,
        category: latestNotice.category || 'Announcement',
        title: latestNotice.title,
        date: latestNotice.date,
        href: `/notice/${latestNotice.id}`,
      }
    : latestEvent
    ? {
        type: 'Event',
        icon: Calendar,
        category: latestEvent.category || 'Campus Event',
        title: latestEvent.title,
        date: latestEvent.date,
        href: `/events/${latestEvent.id}`,
      }
    : null;

  const quickNavItems = [
    { label: 'About Us', path: '/about', icon: BookOpen },
    { label: 'Admissions', path: '/admissions', icon: GraduationCap },
    { label: 'Academics', path: '/departments', icon: Layers },
    { label: 'Our Teachers', path: '/teachers', icon: Users },
    { label: 'Events', path: '/events', icon: Calendar },
    { label: 'Gallery', path: '/gallery', icon: ImageIcon },
    { label: 'Contact', path: '/contact', icon: MapPin },
  ];

  const academicCards = [
    {
      num: '01',
      title: "Qur'an & Tajweed",
      desc: 'Accurate recitation, Makharij articulation, and essential Surah memorisation.',
    },
    {
      num: '02',
      title: 'Islamic Studies',
      desc: 'Core principles of Aqeedah, Fiqh, and daily worship practices.',
    },
    {
      num: '03',
      title: 'Arabic Language',
      desc: 'Foundational grammar, vocabulary, reading, and comprehension skills.',
    },
    {
      num: '04',
      title: 'Moral Education',
      desc: 'Character formation, Sunnah ethics, and guided academic development.',
    },
  ];

  return (
    <div className="w-full flex flex-col bg-[#fbfaf7] text-slate-800 antialiased">
      {/* ── Top Notice Bar ─────────────────────────────────────────── */}
      <NoticeTicker onOpenAdmissionModal={onOpenAdmissionModal} />

      {/* ══════════════════════════════════════════════════════════
          1. HERO SECTION (Immersive Visual & Confident Typography)
      ══════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-white border-b border-[#e5e0d5] pt-8 pb-12 sm:pt-12 sm:pb-16 lg:pt-14 lg:pb-20">
        {/* Subtle geometric background detail */}
        <div className="absolute inset-0 pointer-events-none select-none opacity-[0.035]">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="hero-pattern" width="64" height="64" patternUnits="userSpaceOnUse">
                <path d="M 32 0 L 64 32 L 32 64 L 0 32 Z" fill="none" stroke="#164e37" strokeWidth="1" />
                <circle cx="32" cy="32" r="6" fill="none" stroke="#c59b27" strokeWidth="0.75" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hero-pattern)" />
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          {/* Hero Content Header */}
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-8 sm:mb-10">
            {/* Eyebrow */}
            <motion.div
              initial="hidden"
              animate="show"
              variants={fadeUp}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#164e37]/8 border border-[#164e37]/20 text-[11px] font-bold text-[#164e37] uppercase tracking-widest"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#c59b27]" />
              <span>Islamic English Medium School</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial="hidden"
              animate="show"
              variants={fadeUp}
              className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#0f231c] tracking-tight leading-[1.12]"
            >
              Nurturing Knowledge,{' '}
              <span className="text-[#164e37] relative inline-block">
                Building Better Futures.
                <span className="absolute -bottom-1 left-0 right-0 h-1 bg-[#c59b27]/30 rounded-full" />
              </span>
            </motion.h1>

            {/* Short Supporting Text */}
            <motion.p
              initial="hidden"
              animate="show"
              variants={fadeUp}
              className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto leading-relaxed"
            >
              A modern English medium education rooted in Islamic values, character and lifelong learning.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial="hidden"
              animate="show"
              variants={fadeUp}
              className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2"
            >
              <Link
                to="/about"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#164e37] hover:bg-[#0f3b29] text-white text-xs sm:text-sm font-bold rounded-xl shadow-sm hover:shadow-md transition-all duration-200 min-h-[46px] group"
              >
                <span>Explore Our School</span>
                <ArrowRight className="w-4 h-4 text-[#c59b27] group-hover:translate-x-1 transition-transform" />
              </Link>
              <button
                type="button"
                onClick={onOpenAdmissionModal}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#fbfaf7] hover:bg-[#f4f1ea] text-[#0f231c] border-2 border-[#164e37]/20 hover:border-[#164e37]/40 text-xs sm:text-sm font-semibold rounded-xl transition-all duration-200 min-h-[46px]"
              >
                <GraduationCap className="w-4 h-4 text-[#164e37]" />
                <span>Admission Enquiry</span>
              </button>
            </motion.div>

            {/* 3 Compact Feature Indicators */}
            <motion.div
              initial="hidden"
              animate="show"
              variants={fadeUp}
              className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 pt-2 text-xs font-semibold text-slate-700"
            >
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#164e37]" />
                <span>English Medium</span>
              </div>
              <span className="text-slate-300 hidden sm:inline">•</span>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#164e37]" />
                <span>Islamic Values</span>
              </div>
              <span className="text-slate-300 hidden sm:inline">•</span>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#c59b27]" />
                <span>Korangath, Tirur</span>
              </div>
            </motion.div>
          </div>

          {/* Large Immersive Campus Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
            className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-[#e5e0d5] shadow-lg max-w-5xl mx-auto"
          >
            <div className="w-full">
              <RealisticImageSlot
                scene="campus"
                aspectRatio="16/10"
                label="Sharafiyya English Medium School Campus"
                caption="Main campus environment at Korangath, Tirur"
                className="w-full"
              />
            </div>

            {/* Subtle Floating Location Card */}
            <div className="absolute bottom-3 right-3 sm:bottom-5 sm:right-5 bg-white/95 backdrop-blur-sm border border-[#e5e0d5] rounded-xl px-3.5 py-2 sm:px-4 sm:py-2.5 shadow-md flex items-center gap-2.5 z-10">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#164e37] flex items-center justify-center shrink-0">
                <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#c59b27]" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-[#0f231c] leading-tight">Campus at Korangath, Tirur</p>
                <p className="text-[10px] text-slate-500 leading-tight mt-0.5">Malappuram District, Kerala</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          2. QUICK NAVIGATION STRIP
      ══════════════════════════════════════════════════════════ */}
      <section className="bg-white border-b border-[#e5e0d5] py-3.5 sticky top-[60px] z-20 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-1 -mx-1 px-1">
            {quickNavItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.label}
                  to={item.path}
                  className="flex items-center gap-1.5 px-3.5 py-2 bg-[#fbfaf7] hover:bg-[#164e37] hover:text-white border border-[#e5e0d5] hover:border-[#164e37] text-slate-700 text-xs font-semibold rounded-xl transition-all whitespace-nowrap min-h-[38px] group shrink-0"
                >
                  <Icon className="w-3.5 h-3.5 text-[#164e37] group-hover:text-[#c59b27] transition-colors shrink-0" />
                  <span>{item.label}</span>
                  <ChevronRight className="w-3 h-3 text-slate-400 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          3. ABOUT SECTION (Compact Editorial Layout)
      ══════════════════════════════════════════════════════════ */}
      <section className="py-12 sm:py-16 lg:py-20 bg-[#fbfaf7] border-b border-[#e5e0d5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            {/* Left: School / Classroom Image */}
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-6"
            >
              <div className="rounded-2xl overflow-hidden border border-[#e5e0d5] shadow-md bg-white">
                <RealisticImageSlot
                  scene="classroom"
                  aspectRatio="4/3"
                  label="Classroom at Sharafiyya"
                  caption="Dedicated learning spaces at Sharafiyya English Medium School"
                />
              </div>
            </motion.div>

            {/* Right: Editorial Story */}
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-6 space-y-4"
            >
              <div className="flex items-center gap-2">
                <span className="h-px w-6 bg-[#c59b27]" />
                <span className="text-[11px] uppercase tracking-widest font-extrabold text-[#164e37]">
                  About Us
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0f231c] tracking-tight leading-tight">
                More Than Just an Education,{' '}
                <span className="text-[#164e37]">It's a Foundation for Life.</span>
              </h2>

              <p className="text-sm text-slate-600 leading-relaxed">
                Sharafiyya English Medium School provides structured Islamic learning combined with modern English medium academics in Korangath, Tirur. We nurture intellectual curiosity, moral uprightness, and spiritual clarity in every student.
              </p>

              <div className="pt-2">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#164e37] hover:bg-[#0f3b29] text-white text-xs sm:text-sm font-bold rounded-xl shadow-xs transition-all duration-200 group min-h-[44px]"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#c59b27] group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          4. ACADEMICS PREVIEW (Compact, Focused Programme Cards)
      ══════════════════════════════════════════════════════════ */}
      <section className="py-12 sm:py-16 bg-white border-b border-[#e5e0d5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="h-px w-6 bg-[#c59b27]" />
                <span className="text-[11px] uppercase tracking-widest font-extrabold text-[#164e37]">
                  Our Academics
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0f231c] tracking-tight">
                Academic Excellence with Islamic Values
              </h2>
            </div>
            <Link
              to="/departments"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#164e37] hover:text-[#0f3b29] group shrink-0 min-h-[36px]"
            >
              <span>Explore Academics</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#c59b27] group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {academicCards.map((card, idx) => (
              <motion.div
                key={card.num}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
              >
                <Link
                  to="/departments"
                  className="group flex flex-col h-full bg-[#fbfaf7] hover:bg-white rounded-2xl border border-[#e5e0d5] hover:border-[#164e37]/40 hover:shadow-md p-5 transition-all duration-200"
                >
                  <span className="text-2xl font-serif font-bold text-[#164e37]/30 group-hover:text-[#164e37] transition-colors">
                    {card.num}
                  </span>
                  <h3 className="text-sm font-bold text-[#0f231c] mt-2 mb-1.5 group-hover:text-[#164e37] transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed flex-1">{card.desc}</p>
                  <div className="flex items-center gap-1 mt-4 text-[11px] font-bold text-[#164e37] opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>Curriculum details</span>
                    <ArrowRight className="w-3 h-3 text-[#c59b27]" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Link
              to="/departments"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#164e37] hover:bg-[#0f3b29] text-white text-xs font-bold rounded-xl transition-colors group min-h-[44px]"
            >
              <span>Explore Academics</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#c59b27]" />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          5. LATEST UPDATE (Compact Single Item Notice/Event)
      ══════════════════════════════════════════════════════════ */}
      <section className="py-10 sm:py-12 bg-[#fbfaf7] border-b border-[#e5e0d5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="h-px w-5 bg-[#c59b27]" />
              <span className="text-[11px] uppercase tracking-widest font-extrabold text-[#164e37]">
                Latest Update
              </span>
            </div>
            <Link
              to="/events"
              className="inline-flex items-center gap-1 text-xs font-bold text-[#164e37] hover:text-[#0f3b29] group min-h-[32px]"
            >
              <span>View All</span>
              <ArrowRight className="w-3 h-3 text-[#c59b27] group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          {singleUpdate ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <Link
                to={singleUpdate.href}
                className="group flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-6 bg-white hover:border-[#164e37]/40 rounded-2xl border border-[#e5e0d5] hover:shadow-xs p-4 sm:p-5 transition-all duration-200"
              >
                <div className="flex items-start sm:items-center gap-3.5 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-[#164e37]/8 border border-[#164e37]/15 flex items-center justify-center shrink-0">
                    <singleUpdate.icon className="w-4 h-4 text-[#164e37]" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200">
                        {singleUpdate.category}
                      </span>
                      {singleUpdate.date && (
                        <span className="text-[11px] font-mono text-slate-400">{singleUpdate.date}</span>
                      )}
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-[#0f231c] group-hover:text-[#164e37] transition-colors truncate">
                      {singleUpdate.title}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-xs font-bold text-[#164e37] shrink-0 self-end sm:self-center">
                  <span>Details</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#c59b27] group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </motion.div>
          ) : (
            <div className="bg-white rounded-2xl border border-[#e5e0d5] p-5 text-center text-xs text-slate-500">
              No recent announcements posted.{' '}
              <Link to="/events" className="text-[#164e37] font-semibold hover:underline">
                Browse calendar updates →
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          6. ADMISSIONS CTA (Horizontal Banner, No Bulky Form)
      ══════════════════════════════════════════════════════════ */}
      <section className="py-12 sm:py-16 lg:py-20 bg-[#0d281e] text-white relative overflow-hidden">
        {/* Subtle geometric pattern */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.045]">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="cta-pattern" width="56" height="56" patternUnits="userSpaceOnUse">
                <path d="M 28 0 L 56 28 L 28 56 L 0 28 Z" fill="none" stroke="#ffffff" strokeWidth="1" />
                <circle cx="28" cy="28" r="7" fill="none" stroke="#c59b27" strokeWidth="0.75" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#cta-pattern)" />
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[11px] font-bold text-emerald-300 uppercase tracking-widest">
              <Sparkles className="w-3 h-3 text-[#c59b27]" />
              <span>Admissions Open</span>
            </div>

            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Begin Your Child's Journey With Us
            </h2>

            <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed max-w-xl mx-auto">
              Give your child the foundation of authentic Islamic education combined with modern English-medium learning. Enquire today — our administrative office will get back to you promptly.
            </p>

            <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={onOpenAdmissionModal}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#c59b27] hover:bg-[#d6a933] text-slate-950 text-xs sm:text-sm font-bold rounded-xl shadow-md hover:shadow-lg transition-all min-h-[46px] group"
              >
                <GraduationCap className="w-4 h-4" />
                <span>Admission Enquiry</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <Link
                to="/admissions"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white/10 hover:bg-white/15 text-white text-xs sm:text-sm font-semibold border border-white/20 rounded-xl transition-colors min-h-[46px]"
              >
                <span>View Admission Guidelines</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
