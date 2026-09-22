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
  Play,
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
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
};

export const Home: React.FC<HomeProps> = ({ onOpenAdmissionModal }) => {
  const [latestNotice, setLatestNotice] = useState<NoticeItem | null>(null);
  const [latestEvent, setLatestEvent] = useState<EventItem | null>(null);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const loadUpdates = async () => {
      try {
        const [notices, events] = await Promise.all([getPublicNotices(), getPublicEvents()]);
        if (!isMounted) return;
        if (notices.length > 0) setLatestNotice(notices[0]);
        if (events.length > 0) setLatestEvent(events[0]);
      } catch {
        // Silent fallback
      }
    };
    loadUpdates();
    return () => {
      isMounted = false;
    };
  }, []);

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
    <div className="w-full flex flex-col bg-[#fcfbf9] text-slate-800 antialiased selection:bg-[#164e37] selection:text-white">
      {/* ── 1. Compact Notice Bar ──────────────────────────────────── */}
      <NoticeTicker onOpenAdmissionModal={onOpenAdmissionModal} />

      {/* ══════════════════════════════════════════════════════════
          2. COMPACT IMMERSIVE HERO (Side-by-Side 45/55 Layout)
      ══════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#f8fbf9] to-white border-b border-[#e7e2d7] pt-5 pb-6 sm:pt-7 sm:pb-8 lg:py-8">
        {/* Very subtle background texture */}
        <div className="absolute inset-0 pointer-events-none select-none opacity-[0.025]">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="hero-subtle" width="48" height="48" patternUnits="userSpaceOnUse">
                <path d="M 24 0 L 48 24 L 24 48 L 0 24 Z" fill="none" stroke="#164e37" strokeWidth="0.8" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hero-subtle)" />
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center min-h-0 lg:min-h-[480px] xl:min-h-[510px]">

            {/* ── LEFT COLUMN: Text, Buttons, Features (~45%) ────── */}
            <motion.div
              initial="hidden"
              animate="show"
              variants={fadeUp}
              className="lg:col-span-5 flex flex-col justify-center space-y-3.5 sm:space-y-4"
            >
              {/* Pill Eyebrow */}
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#164e37]/8 border border-[#164e37]/20 text-[10px] sm:text-[11px] font-bold text-[#164e37] uppercase tracking-widest">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c59b27]" />
                  <span>ISLAMIC ENGLISH MEDIUM SCHOOL</span>
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-2xl sm:text-3xl lg:text-[2.45rem] xl:text-[2.85rem] font-black text-[#0f231c] tracking-tight leading-[1.12]">
                Nurturing Knowledge,{' '}
                <span className="text-[#164e37] block">
                  Building Better Futures.
                </span>
              </h1>

              {/* Short Supporting Paragraph */}
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-md">
                A premier Islamic English Medium School at Korangath, Tirur — blending Quranic education, strong values, and modern learning.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2.5 pt-1">
                <Link
                  to="/about"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 bg-[#164e37] hover:bg-[#0f3b29] text-white text-xs sm:text-sm font-bold rounded-xl sm:rounded-2xl shadow-xs hover:shadow-md transition-all duration-200 group min-h-[42px] sm:min-h-[46px]"
                >
                  <span>Explore Our School</span>
                  <ArrowRight className="w-4 h-4 text-[#c59b27] group-hover:translate-x-1 transition-transform" />
                </Link>
                <button
                  type="button"
                  onClick={onOpenAdmissionModal}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 bg-white hover:bg-[#fbfaf7] text-[#0f231c] border border-[#d2cabb] hover:border-[#164e37]/40 text-xs sm:text-sm font-bold rounded-xl sm:rounded-2xl shadow-2xs transition-all duration-200 min-h-[42px] sm:min-h-[46px]"
                >
                  <GraduationCap className="w-4 h-4 text-[#164e37]" />
                  <span>Admission Enquiry</span>
                </button>
              </div>

              {/* 3 Compact Feature Indicators */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-3 border-t border-[#ede8de] max-w-md">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#eef6f2] border border-[#d3e5da] flex items-center justify-center text-[#164e37] shrink-0">
                    <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] sm:text-xs font-black text-[#0f231c] leading-tight truncate">English</p>
                    <p className="text-[8px] sm:text-[9px] font-bold text-slate-400 uppercase tracking-wider">MEDIUM</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#eef6f2] border border-[#d3e5da] flex items-center justify-center text-[#164e37] shrink-0">
                    <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#c59b27]" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] sm:text-xs font-black text-[#0f231c] leading-tight truncate">Islamic</p>
                    <p className="text-[8px] sm:text-[9px] font-bold text-slate-400 uppercase tracking-wider">VALUES</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#eef6f2] border border-[#d3e5da] flex items-center justify-center text-[#164e37] shrink-0">
                    <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#164e37]" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] sm:text-xs font-black text-[#0f231c] leading-tight truncate">Korangath</p>
                    <p className="text-[8px] sm:text-[9px] font-bold text-slate-400 uppercase tracking-wider">TIRUR</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* ── RIGHT COLUMN: Campus Visual (~55%) ─────────────── */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-7 relative h-full flex items-center"
            >
              <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-[#ded8cc] shadow-md bg-white">
                {!imgError ? (
                  <div className="relative aspect-[16/10] sm:aspect-[16/9.5] lg:aspect-[16/9.2] w-full overflow-hidden">
                    <img
                      src="/images/campus-hero.png"
                      alt="Sharafiyya English Medium School Campus"
                      className="w-full h-full object-cover object-center transform hover:scale-[1.01] transition-transform duration-500"
                      onError={() => setImgError(true)}
                    />
                    {/* Natural subtle gradient on the left edge for smooth integration */}
                    <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#f8fbf9]/30 to-transparent pointer-events-none hidden lg:block" />
                  </div>
                ) : (
                  <RealisticImageSlot
                    scene="campus"
                    aspectRatio="16/10"
                    label="Sharafiyya English Medium School Campus"
                    caption="Campus at Korangath, Tirur, Malappuram"
                    className="w-full"
                  />
                )}

                {/* Floating Location Card at Bottom Right */}
                <div className="absolute bottom-2.5 right-2.5 sm:bottom-3.5 sm:right-3.5 bg-white/95 backdrop-blur-md border border-[#e5e0d5] rounded-xl sm:rounded-2xl px-3 py-2 sm:px-3.5 sm:py-2.5 shadow-md flex items-center gap-2.5 z-10 max-w-[90%] sm:max-w-none">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#164e37] flex items-center justify-center text-[#c59b27] shrink-0">
                    <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                  <div className="min-w-0 pr-1">
                    <p className="text-[11px] sm:text-xs font-black text-[#0f231c] leading-tight truncate">
                      Campus at Korangath, Tirur
                    </p>
                    <p className="text-[9px] sm:text-[10px] text-slate-500 leading-tight truncate">
                      Korangath, Tirur, Malappuram - 676101
                    </p>
                  </div>
                  <Link
                    to="/contact"
                    className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-slate-100 hover:bg-[#164e37] hover:text-white text-slate-600 flex items-center justify-center transition-colors shrink-0"
                    title="View Campus Location"
                  >
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          3. QUICK NAVIGATION STRIP (Floating Horizontal Bar)
      ══════════════════════════════════════════════════════════ */}
      <section className="relative -mt-3 sm:-mt-4 z-10 px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/95 backdrop-blur-md border border-[#e2ddd1] rounded-2xl shadow-sm px-3 py-2.5 sm:px-4 sm:py-3">
            <div className="flex items-center justify-between gap-1 sm:gap-2 overflow-x-auto scrollbar-none">
              {quickNavItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.label}
                    to={item.path}
                    className="flex items-center gap-1.5 sm:gap-2 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl text-[11px] sm:text-xs font-bold text-slate-700 hover:text-[#164e37] hover:bg-[#164e37]/5 transition-all whitespace-nowrap group shrink-0"
                  >
                    <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-[#eef6f2] group-hover:bg-[#164e37] text-[#164e37] group-hover:text-white flex items-center justify-center transition-colors shrink-0">
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <span>{item.label}</span>
                    <ChevronRight className="w-3 h-3 text-slate-400 group-hover:text-[#164e37] group-hover:translate-x-0.5 transition-all" />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          4. ABOUT SECTION (Compact Editorial Layout)
      ══════════════════════════════════════════════════════════ */}
      <section className="py-10 sm:py-14 lg:py-16 bg-[#fcfbf9] border-b border-[#e7e2d7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left: School Image / Video Slot */}
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="lg:col-span-6 relative"
            >
              <div className="rounded-2xl sm:rounded-3xl overflow-hidden border border-[#ded8cc] shadow-sm bg-white relative">
                <RealisticImageSlot
                  scene="classroom"
                  aspectRatio="16/10"
                  label="Classroom at Sharafiyya"
                  caption="Dedicated learning spaces at Sharafiyya English Medium School"
                />
                {/* Watch Video Badge */}
                <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-md border border-white/20 text-white rounded-full px-3 py-1.5 flex items-center gap-2 text-xs font-semibold shadow-xs pointer-events-none">
                  <div className="w-5 h-5 rounded-full bg-white text-[#0f231c] flex items-center justify-center">
                    <Play className="w-2.5 h-2.5 fill-current" />
                  </div>
                  <span>Campus Environment</span>
                </div>
              </div>
            </motion.div>

            {/* Right: Editorial Narrative */}
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="lg:col-span-6 space-y-3.5 sm:space-y-4"
            >
              <div className="flex items-center gap-2">
                <span className="h-px w-6 bg-[#c59b27]" />
                <span className="text-[11px] uppercase tracking-widest font-extrabold text-[#164e37]">
                  ABOUT US
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0f231c] tracking-tight leading-tight">
                More Than Just an Education,{' '}
                <span className="text-[#164e37]">It's a Foundation for Life.</span>
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                At Sharafiyya English Medium School, we believe in nurturing well-rounded individuals through quality education, Islamic values, and modern scholastic discipline. Located in Korangath, Tirur, we prepare our students to excel in academic knowledge and moral character.
              </p>

              <div className="pt-2">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 bg-[#164e37] hover:bg-[#0f3b29] text-white text-xs sm:text-sm font-bold rounded-xl sm:rounded-2xl shadow-xs transition-all duration-200 group min-h-[44px]"
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
          5. ACADEMICS PREVIEW (Compact Programme Cards)
      ══════════════════════════════════════════════════════════ */}
      <section className="py-10 sm:py-14 bg-white border-b border-[#e7e2d7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 sm:mb-8 gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="h-px w-6 bg-[#c59b27]" />
                <span className="text-[11px] uppercase tracking-widest font-extrabold text-[#164e37]">
                  OUR ACADEMICS
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#0f231c] tracking-tight">
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
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.06 }}
              >
                <Link
                  to="/departments"
                  className="group flex flex-col h-full bg-[#fcfbf9] hover:bg-white rounded-2xl border border-[#e5e0d5] hover:border-[#164e37]/40 hover:shadow-sm p-4 sm:p-5 transition-all duration-200"
                >
                  <span className="text-xl font-serif font-bold text-[#164e37]/30 group-hover:text-[#164e37] transition-colors">
                    {card.num}
                  </span>
                  <h3 className="text-sm font-bold text-[#0f231c] mt-1.5 mb-1 group-hover:text-[#164e37] transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed flex-1">{card.desc}</p>
                  <div className="flex items-center gap-1 mt-3 text-[11px] font-bold text-[#164e37] opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>Curriculum details</span>
                    <ArrowRight className="w-3 h-3 text-[#c59b27]" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          6. LATEST UPDATE (Compact Single Item Notice/Event)
      ══════════════════════════════════════════════════════════ */}
      <section className="py-8 sm:py-10 bg-[#fcfbf9] border-b border-[#e7e2d7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          <div className="flex items-center justify-between mb-3.5">
            <div className="flex items-center gap-2">
              <span className="h-px w-5 bg-[#c59b27]" />
              <span className="text-[11px] uppercase tracking-widest font-extrabold text-[#164e37]">
                LATEST UPDATE
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
              transition={{ duration: 0.35 }}
            >
              <Link
                to={singleUpdate.href}
                className="group flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-6 bg-white hover:border-[#164e37]/40 rounded-2xl border border-[#e5e0d5] hover:shadow-2xs p-4 sm:p-5 transition-all duration-200"
              >
                <div className="flex items-start sm:items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-xl bg-[#164e37]/8 border border-[#164e37]/15 flex items-center justify-center shrink-0">
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
                    <h3 className="text-xs sm:text-sm font-bold text-[#0f231c] group-hover:text-[#164e37] transition-colors truncate">
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
            <div className="bg-white rounded-2xl border border-[#e5e0d5] p-4 text-center text-xs text-slate-500">
              No recent announcements posted.{' '}
              <Link to="/events" className="text-[#164e37] font-semibold hover:underline">
                Browse calendar updates →
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          7. ADMISSIONS CTA (Horizontal Banner, No Bulky Form)
      ══════════════════════════════════════════════════════════ */}
      <section className="py-10 sm:py-14 lg:py-16 bg-[#0d281e] text-white relative overflow-hidden">
        {/* Subtle geometric pattern */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.035]">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="cta-subtle" width="56" height="56" patternUnits="userSpaceOnUse">
                <path d="M 28 0 L 56 28 L 28 56 L 0 28 Z" fill="none" stroke="#ffffff" strokeWidth="1" />
                <circle cx="28" cy="28" r="7" fill="none" stroke="#c59b27" strokeWidth="0.75" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#cta-subtle)" />
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          <div className="max-w-3xl mx-auto text-center space-y-3.5 sm:space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[10px] sm:text-[11px] font-bold text-emerald-300 uppercase tracking-widest">
              <Sparkles className="w-3 h-3 text-[#c59b27]" />
              <span>Admissions Open</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Begin Your Child's Journey With Us
            </h2>

            <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed max-w-xl mx-auto">
              Give your child the foundation of authentic Islamic education combined with modern English-medium learning. Enquire today — our administrative office will get back to you promptly.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={onOpenAdmissionModal}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#c59b27] hover:bg-[#d6a933] text-slate-950 text-xs sm:text-sm font-bold rounded-xl shadow-sm hover:shadow-md transition-all min-h-[44px] group"
              >
                <GraduationCap className="w-4 h-4" />
                <span>Admission Enquiry</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <Link
                to="/admissions"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/15 text-white text-xs sm:text-sm font-semibold border border-white/20 rounded-xl transition-colors min-h-[44px]"
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
