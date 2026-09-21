import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  GraduationCap,
  ArrowRight,
  BookOpen,
  Users,
  Star,
  Lightbulb,
  MapPin,
  AlertCircle,
  Send,
  CheckCircle2,
  Calendar,
  Bell,
  ChevronRight,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { NoticeTicker } from '../components/NoticeTicker';
import { RealisticImageSlot } from '../components/RealisticImageSlot';
import { submitAdmissionEnquiry, getPublicNotices, getPublicEvents } from '../services/publicService';
import type { NoticeItem, EventItem } from '../types/firestore';

interface HomeProps {
  onOpenAdmissionModal: () => void;
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export const Home: React.FC<HomeProps> = ({ onOpenAdmissionModal }) => {
  const [enquiryForm, setEnquiryForm] = useState({
    fullName: '', phone: '', email: '', studentName: '', enquiryType: 'Admission', message: '',
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [latestNotice, setLatestNotice] = useState<NoticeItem | null>(null);
  const [latestEvent, setLatestEvent] = useState<EventItem | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const [notices, events] = await Promise.all([getPublicNotices(), getPublicEvents()]);
        if (notices.length > 0) setLatestNotice(notices[0]);
        if (events.length > 0) setLatestEvent(events[0]);
      } catch { /* silent */ }
    };
    load();
  }, []);

  const validate = () => {
    const e: Record<string, string> = {};
    if (enquiryForm.fullName.trim().length < 2) e.fullName = 'Full name is required.';
    if (enquiryForm.phone.replace(/\D/g, '').length < 10) e.phone = 'Enter a valid phone number.';
    if (enquiryForm.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(enquiryForm.email.trim()))
      e.email = 'Enter a valid email address.';
    if (enquiryForm.studentName.trim().length < 2) e.studentName = 'Student name is required.';
    if (enquiryForm.message.trim().length < 5) e.message = 'Please add a short message.';
    setFormErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    try {
      await submitAdmissionEnquiry({
        applicantName: enquiryForm.fullName.trim(),
        parentName: enquiryForm.fullName.trim(),
        studentName: enquiryForm.studentName.trim(),
        phone: enquiryForm.phone.trim(),
        email: enquiryForm.email.trim() || undefined,
        enquiryType: enquiryForm.enquiryType as 'Admission' | 'General Enquiry' | 'Academic Information' | 'Student Information',
        message: enquiryForm.message.trim(),
      });
      setSubmitted(true);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Submission failed. Please try again.';
      alert(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const update = latestNotice
    ? { icon: Bell, label: latestNotice.category || 'Notice', title: latestNotice.title, date: latestNotice.date, href: `/notice/${latestNotice.id}` }
    : latestEvent
    ? { icon: Calendar, label: latestEvent.category || 'Event', title: latestEvent.title, date: latestEvent.date, href: `/events/${latestEvent.id}` }
    : null;

  return (
    <div className="w-full flex flex-col bg-[#fbfaf7]">
      {/* ── Notice Ticker ─────────────────────────────────────────── */}
      <NoticeTicker onOpenAdmissionModal={onOpenAdmissionModal} />

      {/* ══════════════════════════════════════════════════════════
          1. HERO
      ══════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-white border-b border-[#e5e0d5]">
        {/* Geometric background */}
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden opacity-[0.04]">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="hero-geo" width="80" height="80" patternUnits="userSpaceOnUse">
                <path d="M40 0 L80 40 L40 80 L0 40 Z" fill="none" stroke="#164e37" strokeWidth="1.5" />
                <circle cx="40" cy="40" r="12" fill="none" stroke="#164e37" strokeWidth="0.75" />
                <circle cx="40" cy="40" r="3" fill="#c59b27" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hero-geo)" />
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 pt-10 pb-12 sm:pt-14 sm:pb-16 lg:pt-16 lg:pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">

            {/* Left: Editorial text */}
            <motion.div
              initial="hidden"
              animate="show"
              transition={{ staggerChildren: 0.1 }}
              className="lg:col-span-5 xl:col-span-5 space-y-5"
            >
              {/* Label */}
              <motion.div variants={fadeUp} transition={{ duration: 0.4 }}>
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#164e37]/8 border border-[#164e37]/20 text-[11px] font-bold text-[#164e37] uppercase tracking-widest">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c59b27]" />
                  Islamic English Medium School
                </span>
              </motion.div>

              {/* Headline */}
              <motion.div variants={fadeUp} transition={{ duration: 0.45 }}>
                <h1 className="text-3xl sm:text-4xl lg:text-[2.6rem] xl:text-5xl font-extrabold text-[#0f231c] tracking-tight leading-[1.1]">
                  Learning with Purpose.{' '}
                  <span className="text-[#164e37] relative">
                    Growing with Values.
                    <svg className="absolute -bottom-1 left-0 w-full" height="4" viewBox="0 0 200 4" preserveAspectRatio="none">
                      <path d="M0 2 Q100 0 200 2" stroke="#c59b27" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                    </svg>
                  </span>
                </h1>
              </motion.div>

              {/* Tagline */}
              <motion.p
                variants={fadeUp}
                transition={{ duration: 0.45 }}
                className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-sm"
              >
                A premier Islamic English Medium School at Korangath, Tirur — blending Quranic education,
                strong values, and modern learning.
              </motion.p>

              {/* CTAs */}
              <motion.div
                variants={fadeUp}
                transition={{ duration: 0.45 }}
                className="flex flex-col sm:flex-row gap-3 pt-1"
              >
                <Link
                  to="/about"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#164e37] hover:bg-[#0f3b29] text-white text-sm font-bold rounded-xl shadow-md hover:shadow-lg transition-all duration-200 group min-h-[44px]"
                >
                  <span>Explore Our School</span>
                  <ArrowRight className="w-4 h-4 text-[#c59b27] group-hover:translate-x-1 transition-transform" />
                </Link>
                <button
                  type="button"
                  onClick={onOpenAdmissionModal}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#fbfaf7] hover:bg-[#f4f1ea] text-slate-800 border-2 border-[#164e37]/20 hover:border-[#164e37]/40 text-sm font-semibold rounded-xl transition-all min-h-[44px] group"
                >
                  <GraduationCap className="w-4 h-4 text-[#164e37]" />
                  <span>Admission Enquiry</span>
                </button>
              </motion.div>

              {/* Mini stats */}
              <motion.div
                variants={fadeUp}
                transition={{ duration: 0.45 }}
                className="flex items-center gap-5 pt-2"
              >
                {[
                  { value: 'English', label: 'Medium' },
                  { value: 'Islamic', label: 'Values' },
                  { value: 'Korangath', label: 'Tirur' },
                ].map((s) => (
                  <div key={s.label} className="text-center">
                    <p className="text-sm font-extrabold text-[#0f231c]">{s.value}</p>
                    <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">{s.label}</p>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right: Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
              className="lg:col-span-7 xl:col-span-7 relative"
            >
              {/* Main image */}
              <div className="rounded-2xl overflow-hidden shadow-xl ring-1 ring-[#e5e0d5]">
                <RealisticImageSlot
                  scene="campus"
                  aspectRatio="16/10"
                  label="Sharafiyya English Medium School Campus"
                  caption="Campus at Korangath, Tirur, Malappuram"
                />
              </div>

              {/* Floating location card */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="absolute -bottom-4 left-4 sm:left-6 bg-white rounded-xl border border-[#e5e0d5] shadow-lg px-3.5 py-2.5 flex items-center gap-2.5 z-10"
              >
                <div className="w-8 h-8 rounded-lg bg-[#164e37] flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-[#c59b27]" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#0f231c]">Korangath, Tirur</p>
                  <p className="text-[10px] text-slate-500">Malappuram, Kerala · 676101</p>
                </div>
              </motion.div>

              {/* Floating Islamic identity badge */}
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.4 }}
                className="absolute -top-3 right-4 sm:right-6 bg-[#164e37] rounded-xl px-3 py-2 shadow-lg z-10"
              >
                <p className="text-[10px] font-bold text-[#c59b27] uppercase tracking-widest">Est. Korangath</p>
                <p className="text-xs font-extrabold text-white">Islamic Education</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          2. QUICK LINKS
      ══════════════════════════════════════════════════════════ */}
      <section className="border-b border-[#e5e0d5] bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 py-4">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none -mx-1 px-1">
            {[
              { label: 'About Us', to: '/about', icon: BookOpen },
              { label: 'Admissions', to: '/contact', icon: GraduationCap },
              { label: 'Student Portal', to: '/students', icon: Users },
              { label: 'Events', to: '/events', icon: Calendar },
              { label: 'Contact', to: '/contact', icon: MapPin },
            ].map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className="flex items-center gap-1.5 px-3.5 py-2 bg-[#fbfaf7] hover:bg-[#164e37] hover:text-white border border-[#e5e0d5] hover:border-[#164e37] text-slate-700 text-xs font-semibold rounded-xl transition-all whitespace-nowrap min-h-[38px] group shrink-0"
              >
                <item.icon className="w-3.5 h-3.5 text-[#164e37] group-hover:text-[#c59b27] transition-colors shrink-0" />
                <span>{item.label}</span>
                <ChevronRight className="w-3 h-3 opacity-60 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          3. ABOUT SNIPPET
      ══════════════════════════════════════════════════════════ */}
      <section className="py-14 sm:py-16 lg:py-20 bg-[#fbfaf7] border-b border-[#e5e0d5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="rounded-2xl overflow-hidden shadow-md ring-1 ring-[#e5e0d5]">
                <RealisticImageSlot
                  scene="classroom"
                  aspectRatio="4/3"
                  label="Classroom at Sharafiyya"
                  caption="Students learning at Sharafiyya English Medium School"
                />
              </div>
              {/* Accent blob */}
              <div className="absolute -bottom-3 -right-3 w-20 h-20 rounded-2xl bg-[#164e37]/8 border border-[#164e37]/10 -z-10" />
            </motion.div>

            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="space-y-5"
            >
              <div className="flex items-center gap-2">
                <span className="h-px w-8 bg-[#c59b27]" />
                <span className="text-[11px] uppercase tracking-widest font-extrabold text-[#164e37]">About Us</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-[1.85rem] xl:text-3xl font-extrabold text-[#0f231c] tracking-tight leading-snug">
                More Than Just an Education.{' '}
                <span className="text-[#164e37]">It's a Foundation for Life.</span>
              </h2>

              <p className="text-sm text-slate-600 leading-relaxed">
                Sharafiyya English Medium School — <strong className="text-slate-800">Sharafiyya Korangath</strong> — is an
                Islamic English Medium School in Korangath, Tirur, Malappuram. We provide structured Quranic education,
                Islamic studies, Arabic language, and moral formation that builds character, knowledge, and lifelong values.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 pt-1">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#164e37] hover:bg-[#0f3b29] text-white text-sm font-bold rounded-xl shadow-sm transition-all group min-h-[44px]"
                >
                  Learn More
                  <ArrowRight className="w-3.5 h-3.5 text-[#c59b27] group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-[#f4f1ea] text-slate-700 border border-[#d2cabb] text-sm font-semibold rounded-xl transition-colors min-h-[44px]"
                >
                  Contact Us
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          4. WHY SHARAFIYYA
      ══════════════════════════════════════════════════════════ */}
      <section className="py-14 sm:py-16 bg-white border-b border-[#e5e0d5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-center max-w-lg mx-auto mb-10"
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="h-px w-6 bg-[#c59b27]" />
              <span className="text-[11px] uppercase tracking-widest font-extrabold text-[#164e37]">Why Choose Us</span>
              <span className="h-px w-6 bg-[#c59b27]" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0f231c] tracking-tight">
              What Makes Sharafiyya Different
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
            {[
              {
                icon: BookOpen,
                color: 'bg-emerald-50 text-[#164e37] border-emerald-100',
                title: 'English Medium Education',
                desc: 'Modern instruction in English for confident, globally-ready learners alongside strong Islamic foundations.',
              },
              {
                icon: Star,
                color: 'bg-amber-50 text-amber-700 border-amber-100',
                title: 'Islamic Values',
                desc: 'Authentic Quranic education grounded in Ahlus Sunnah principles, shaping faith and understanding.',
              },
              {
                icon: Users,
                color: 'bg-blue-50 text-blue-700 border-blue-100',
                title: 'Character Development',
                desc: 'Tarbiyyah and moral formation at the heart of every programme — shaping integrity and responsibility.',
              },
              {
                icon: Lightbulb,
                color: 'bg-purple-50 text-purple-700 border-purple-100',
                title: 'Modern Learning',
                desc: 'Contemporary teaching methods that complement formal schooling and prepare students for the future.',
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="bg-[#fbfaf7] hover:bg-white rounded-2xl border border-[#e5e0d5] hover:border-[#164e37]/30 hover:shadow-md p-5 space-y-3 transition-all duration-200 group"
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${item.color}`}>
                  <item.icon className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-[#0f231c] group-hover:text-[#164e37] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          5. ACADEMICS PREVIEW
      ══════════════════════════════════════════════════════════ */}
      <section className="py-14 sm:py-16 bg-[#fbfaf7] border-b border-[#e5e0d5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <span className="h-px w-6 bg-[#c59b27]" />
                <span className="text-[11px] uppercase tracking-widest font-extrabold text-[#164e37]">Academics</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0f231c] tracking-tight">
                Our Programmes
              </h2>
            </motion.div>
            <Link
              to="/departments"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#164e37] hover:text-[#0f3b29] group shrink-0 min-h-[32px]"
            >
              Explore Academics
              <ArrowRight className="w-3.5 h-3.5 text-[#c59b27] group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { num: '01', title: "Qur'an & Tajweed", desc: 'Proper recitation, Makharij, and memorisation of selected Surahs.' },
              { num: '02', title: 'Islamic Studies', desc: 'Aqeedah, Fiqh, and practical worship for everyday student life.' },
              { num: '03', title: 'Arabic Language', desc: 'Reading, writing, and foundational grammar for Quranic comprehension.' },
              { num: '04', title: 'Moral Education', desc: 'Character building, daily Azkar, and Sunnah practices.' },
            ].map((item, i) => (
              <motion.div
                key={item.num}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <Link
                  to="/departments"
                  className="group flex flex-col h-full bg-white rounded-2xl border border-[#e5e0d5] hover:border-[#164e37]/40 hover:shadow-md p-5 transition-all duration-200"
                >
                  <span className="text-2xl font-serif font-bold text-[#164e37]/30 group-hover:text-[#164e37]/60 transition-colors">
                    {item.num}
                  </span>
                  <h3 className="text-sm font-bold text-[#0f231c] mt-2 mb-2 group-hover:text-[#164e37] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed flex-1">{item.desc}</p>
                  <div className="flex items-center gap-1 mt-4 text-[11px] font-bold text-[#164e37] opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>Learn more</span>
                    <ArrowRight className="w-3 h-3 text-[#c59b27]" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              to="/departments"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#164e37] hover:bg-[#0f3b29] text-white text-sm font-semibold rounded-xl transition-colors group shadow-sm min-h-[44px]"
            >
              Explore All Programmes
              <ArrowRight className="w-3.5 h-3.5 text-[#c59b27] group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          6. LATEST UPDATE
      ══════════════════════════════════════════════════════════ */}
      <section className="py-12 sm:py-14 bg-white border-b border-[#e5e0d5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          <div className="flex items-end justify-between mb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="h-px w-6 bg-[#c59b27]" />
                <span className="text-[11px] uppercase tracking-widest font-extrabold text-[#164e37]">Latest Update</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#0f231c] tracking-tight">
                News & Notices
              </h2>
            </div>
            <Link
              to="/events"
              className="inline-flex items-center gap-1 text-xs font-bold text-[#164e37] hover:text-[#0f3b29] group"
            >
              View All <ArrowRight className="w-3 h-3 text-[#c59b27] group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          {update ? (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <Link
                to={update.href}
                className="group flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 bg-[#fbfaf7] hover:bg-white rounded-2xl border border-[#e5e0d5] hover:border-[#164e37]/30 hover:shadow-md p-5 sm:p-6 transition-all duration-200"
              >
                <div className="w-10 h-10 rounded-xl bg-[#164e37]/8 border border-[#164e37]/15 flex items-center justify-center shrink-0">
                  <update.icon className="w-5 h-5 text-[#164e37]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {update.label}
                    </span>
                    {update.date && (
                      <span className="text-[11px] text-slate-500 font-mono">{update.date}</span>
                    )}
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-[#0f231c] group-hover:text-[#164e37] transition-colors truncate">
                    {update.title}
                  </h3>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#164e37] shrink-0">
                  <span>Read More</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#c59b27] group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </motion.div>
          ) : (
            <div className="bg-[#fbfaf7] rounded-2xl border border-[#e5e0d5] p-6 text-center text-sm text-slate-500">
              No announcements at this time.{' '}
              <Link to="/events" className="text-[#164e37] font-semibold hover:underline">
                Browse all updates →
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          7. ADMISSION CTA
      ══════════════════════════════════════════════════════════ */}
      <section className="py-14 sm:py-16 lg:py-20 bg-[#0d281e] text-white relative overflow-hidden">
        {/* Geometric pattern */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.05]">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="cta-geo" width="64" height="64" patternUnits="userSpaceOnUse">
                <path d="M32 0 L64 32 L32 64 L0 32 Z" fill="none" stroke="#ffffff" strokeWidth="1" />
                <circle cx="32" cy="32" r="8" fill="none" stroke="#c59b27" strokeWidth="0.75" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#cta-geo)" />
          </svg>
        </div>
        {/* Gold accent line */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#c59b27] to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* Left CTA text */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="space-y-5"
            >
              <div className="flex items-center gap-2">
                <span className="h-px w-6 bg-[#c59b27]" />
                <span className="text-[11px] uppercase tracking-widest font-extrabold text-emerald-300">Admissions Open</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Begin Your Child's Journey With Us
              </h2>
              <p className="text-sm text-emerald-100/80 leading-relaxed max-w-md">
                Give your child the foundation of authentic Islamic education combined with modern English-medium learning.
                Enquire today — our team will respond promptly.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 pt-1">
                <button
                  type="button"
                  onClick={onOpenAdmissionModal}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#c59b27] hover:bg-[#d6a933] text-slate-950 text-sm font-bold rounded-xl transition-all shadow-md group min-h-[44px]"
                >
                  <GraduationCap className="w-4 h-4" />
                  Admission Enquiry
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white/8 hover:bg-white/15 text-white text-sm font-semibold border border-white/20 rounded-xl transition-all min-h-[44px]"
                >
                  Contact Office
                </Link>
              </div>
            </motion.div>

            {/* Right: inline form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white/6 backdrop-blur-sm border border-white/12 rounded-2xl p-5 sm:p-6 shadow-xl"
            >
              {submitted ? (
                <div className="text-center space-y-3 py-8">
                  <div className="w-14 h-14 rounded-full bg-emerald-800/40 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-7 h-7 text-[#c59b27]" />
                  </div>
                  <h3 className="text-base font-bold text-white">Enquiry Received!</h3>
                  <p className="text-sm text-emerald-200/80 max-w-xs mx-auto leading-relaxed">
                    Thank you, <strong>{enquiryForm.fullName}</strong>. We'll be in touch shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setEnquiryForm({ fullName: '', phone: '', email: '', studentName: '', enquiryType: 'Admission', message: '' });
                      setFormErrors({});
                    }}
                    className="text-xs text-[#c59b27] hover:text-amber-300 underline transition-colors"
                  >
                    Submit another enquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-3">
                  <h3 className="text-sm font-bold text-white mb-4">Quick Enquiry</h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <input
                        type="text"
                        placeholder="Your full name *"
                        value={enquiryForm.fullName}
                        onChange={(e) => { setEnquiryForm({ ...enquiryForm, fullName: e.target.value }); if (formErrors.fullName) setFormErrors({ ...formErrors, fullName: '' }); }}
                        className={`w-full px-3 py-2.5 text-xs bg-white/10 border ${formErrors.fullName ? 'border-rose-400' : 'border-white/20'} text-white placeholder-white/40 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#c59b27] transition-all`}
                      />
                      {formErrors.fullName && <p className="text-rose-400 text-[10px] mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3 shrink-0" />{formErrors.fullName}</p>}
                    </div>
                    <div>
                      <input
                        type="tel"
                        placeholder="Phone number *"
                        value={enquiryForm.phone}
                        onChange={(e) => { setEnquiryForm({ ...enquiryForm, phone: e.target.value }); if (formErrors.phone) setFormErrors({ ...formErrors, phone: '' }); }}
                        className={`w-full px-3 py-2.5 text-xs bg-white/10 border ${formErrors.phone ? 'border-rose-400' : 'border-white/20'} text-white placeholder-white/40 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#c59b27] transition-all`}
                      />
                      {formErrors.phone && <p className="text-rose-400 text-[10px] mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3 shrink-0" />{formErrors.phone}</p>}
                    </div>
                  </div>

                  <div>
                    <input
                      type="text"
                      placeholder="Student / applicant name *"
                      value={enquiryForm.studentName}
                      onChange={(e) => { setEnquiryForm({ ...enquiryForm, studentName: e.target.value }); if (formErrors.studentName) setFormErrors({ ...formErrors, studentName: '' }); }}
                      className={`w-full px-3 py-2.5 text-xs bg-white/10 border ${formErrors.studentName ? 'border-rose-400' : 'border-white/20'} text-white placeholder-white/40 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#c59b27] transition-all`}
                    />
                    {formErrors.studentName && <p className="text-rose-400 text-[10px] mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3 shrink-0" />{formErrors.studentName}</p>}
                  </div>

                  <select
                    value={enquiryForm.enquiryType}
                    onChange={(e) => setEnquiryForm({ ...enquiryForm, enquiryType: e.target.value })}
                    className="w-full px-3 py-2.5 text-xs bg-white/10 border border-white/20 text-white rounded-xl focus:outline-none focus:ring-1 focus:ring-[#c59b27] cursor-pointer"
                  >
                    <option value="Admission" className="text-slate-900 bg-white">Admission</option>
                    <option value="Academic Information" className="text-slate-900 bg-white">Academic Information</option>
                    <option value="Student Information" className="text-slate-900 bg-white">Student Information</option>
                    <option value="General Enquiry" className="text-slate-900 bg-white">General Enquiry</option>
                  </select>

                  <div>
                    <textarea
                      rows={3}
                      placeholder="Your question or message... *"
                      value={enquiryForm.message}
                      onChange={(e) => { setEnquiryForm({ ...enquiryForm, message: e.target.value }); if (formErrors.message) setFormErrors({ ...formErrors, message: '' }); }}
                      className={`w-full px-3 py-2.5 text-xs bg-white/10 border ${formErrors.message ? 'border-rose-400' : 'border-white/20'} text-white placeholder-white/40 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#c59b27] resize-none transition-all`}
                    />
                    {formErrors.message && <p className="text-rose-400 text-[10px] mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3 shrink-0" />{formErrors.message}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 bg-[#c59b27] hover:bg-[#d6a933] disabled:opacity-50 text-slate-950 font-bold text-sm rounded-xl transition-all flex items-center justify-center gap-2 min-h-[44px]"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-slate-700/30 border-t-slate-800 rounded-full animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Enquiry
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};
