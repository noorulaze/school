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
} from 'lucide-react';
import { motion } from 'framer-motion';
import { NoticeTicker } from '../components/NoticeTicker';
import { RealisticImageSlot } from '../components/RealisticImageSlot';
import { submitAdmissionEnquiry, getPublicNotices, getPublicEvents } from '../services/publicService';
import type { NoticeItem, EventItem } from '../types/firestore';

interface HomeProps {
  onOpenAdmissionModal: () => void;
}

export const Home: React.FC<HomeProps> = ({ onOpenAdmissionModal }) => {
  const [enquiryForm, setEnquiryForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    studentName: '',
    enquiryType: 'Admission',
    message: '',
  });
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
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
      } catch {
        // silent fail
      }
    };
    load();
  }, []);

  const validate = () => {
    const errs: { [k: string]: string } = {};
    if (!enquiryForm.fullName.trim() || enquiryForm.fullName.trim().length < 2)
      errs.fullName = 'Full name is required.';
    if (enquiryForm.phone.replace(/\D/g, '').length < 10)
      errs.phone = 'Enter a valid 10-digit phone number.';
    if (enquiryForm.email.trim()) {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(enquiryForm.email.trim()))
        errs.email = 'Enter a valid email address.';
    }
    if (!enquiryForm.studentName.trim() || enquiryForm.studentName.trim().length < 2)
      errs.studentName = 'Student name is required.';
    if (!enquiryForm.message.trim() || enquiryForm.message.trim().length < 5)
      errs.message = 'Please describe your enquiry.';
    setFormErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    try {
      await submitAdmissionEnquiry({
        applicantName: enquiryForm.fullName.trim(),
        parentName: enquiryForm.fullName.trim(),
        studentName: enquiryForm.studentName.trim(),
        phone: enquiryForm.phone.trim(),
        email: enquiryForm.email.trim() || undefined,
        enquiryType: enquiryForm.enquiryType as any,
        message: enquiryForm.message.trim(),
      });
      setSubmitted(true);
    } catch (err: any) {
      alert(err.message || 'Submission failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Latest Update: prefer a notice if available, otherwise an event
  const update = latestNotice
    ? { type: 'notice' as const, id: latestNotice.id, label: latestNotice.category || 'Notice', title: latestNotice.title, date: latestNotice.date, href: `/notice/${latestNotice.id}`, viewAll: '/events' }
    : latestEvent
    ? { type: 'event' as const, id: latestEvent.id, label: latestEvent.category || 'Event', title: latestEvent.title, date: latestEvent.date, href: `/events/${latestEvent.id}`, viewAll: '/events' }
    : null;

  return (
    <div className="w-full flex flex-col bg-[#fbfaf7] text-slate-800">
      {/* Notice Ticker */}
      <NoticeTicker onOpenAdmissionModal={onOpenAdmissionModal} />

      {/* ── 1. HERO ────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-white border-b border-[#e5e0d5] py-10 sm:py-14 lg:py-18">
        {/* Subtle geometric background */}
        <div className="absolute inset-0 opacity-[0.035] pointer-events-none select-none">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="hero-geo" width="72" height="72" patternUnits="userSpaceOnUse">
                <path d="M 36 0 L 72 36 L 36 72 L 0 36 Z" fill="none" stroke="#164e37" strokeWidth="1" />
                <circle cx="36" cy="36" r="10" fill="none" stroke="#164e37" strokeWidth="0.75" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hero-geo)" />
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
            {/* Left */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="md:col-span-6 lg:col-span-5 space-y-5"
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#c59b27]" />
                <span className="text-[11px] uppercase tracking-widest font-extrabold text-[#164e37]">
                  Sharafiyya Korangath
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0f231c] tracking-tight leading-[1.12]">
                Where Faith Meets{' '}
                <span className="text-[#164e37]">Excellence.</span>
              </h1>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-md">
                A premier Islamic English Medium School nurturing young minds through authentic Quranic education,
                strong values, and modern learning at Korangath, Tirur.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 pt-1">
                <button
                  type="button"
                  onClick={onOpenAdmissionModal}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#164e37] hover:bg-[#0f3b29] text-white text-sm font-bold rounded-xl shadow-sm transition-all min-h-[44px]"
                >
                  <GraduationCap className="w-4 h-4 text-[#c59b27]" />
                  Admission Enquiry
                </button>
                <Link
                  to="/about"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#f4f1ea] hover:bg-[#ebe6dc] text-slate-800 border border-[#d2cabb] text-sm font-semibold rounded-xl transition-colors min-h-[44px] group"
                >
                  Learn More
                  <ArrowRight className="w-4 h-4 text-[#164e37] transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.div>

            {/* Right */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.12 }}
              className="md:col-span-6 lg:col-span-7 relative"
            >
              <div className="rounded-2xl overflow-hidden shadow-md max-h-[300px] sm:max-h-[380px] md:max-h-none">
                <RealisticImageSlot
                  scene="campus"
                  aspectRatio="16/10"
                  label="Campus"
                  caption="Sharafiyya Korangath campus, Tirur"
                  className=""
                />
              </div>
              {/* Location chip */}
              <div className="absolute -bottom-4 left-4 bg-white border border-[#d2cabb] rounded-xl px-3 py-2 shadow-md flex items-center gap-2 z-10">
                <MapPin className="w-4 h-4 text-[#c59b27] shrink-0" />
                <div className="min-w-0">
                  <span className="block text-xs font-bold text-[#0f231c] truncate">Korangath, Tirur</span>
                  <span className="block text-[10px] text-slate-500 truncate">Malappuram, Kerala</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 2. ABOUT SNIPPET ──────────────────────────────────────── */}
      <section className="py-12 md:py-16 bg-white border-b border-[#e5e0d5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="hidden lg:block rounded-xl overflow-hidden shadow-xs">
              <RealisticImageSlot
                scene="classroom"
                aspectRatio="4/3"
                label="Classroom"
                caption="Learning environment at Sharafiyya"
                className=""
              />
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="h-px w-5 bg-[#c59b27]" />
                <span className="text-xs uppercase tracking-widest font-extrabold text-[#164e37]">About Us</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0f231c] tracking-tight leading-tight">
                Education rooted in knowledge, faith and character.
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Sharaful Islam Madrassa — <strong>Sharafiyya Korangath</strong> — is an Islamic English Medium School
                in Korangath, Tirur, Malappuram. We provide structured religious and academic learning that builds
                Quranic knowledge, moral character, and lifelong values.
              </p>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#164e37] hover:bg-[#0f3b29] text-white text-sm font-bold rounded-xl transition-colors group shadow-xs min-h-[44px]"
              >
                Learn More
                <ArrowRight className="w-3.5 h-3.5 text-[#c59b27] transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. WHY SHARAFIYYA ─────────────────────────────────────── */}
      <section className="py-12 md:py-16 bg-[#fbfaf7] border-b border-[#e5e0d5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          <div className="text-center max-w-xl mx-auto mb-10">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="h-px w-5 bg-[#c59b27]" />
              <span className="text-xs uppercase tracking-widest font-extrabold text-[#164e37]">Why Choose Us</span>
              <span className="h-px w-5 bg-[#c59b27]" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0f231c] tracking-tight">
              What Makes Sharafiyya Different
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                icon: BookOpen,
                title: 'English Medium',
                desc: 'Modern instruction in English for confident, globally-ready learners.',
              },
              {
                icon: Star,
                title: 'Islamic Values',
                desc: 'Authentic Quranic education grounded in Ahlus Sunnah principles.',
              },
              {
                icon: Users,
                title: 'Character First',
                desc: 'Tarbiyyah and moral formation at the heart of every programme.',
              },
              {
                icon: Lightbulb,
                title: 'Modern Learning',
                desc: 'Contemporary teaching methods that complement formal schooling.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-xl border border-[#e5e0d5] p-5 space-y-3 hover:border-[#164e37]/40 hover:shadow-xs transition-all"
              >
                <div className="w-9 h-9 rounded-lg bg-[#f4f1ea] flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-[#164e37]" />
                </div>
                <h3 className="text-sm font-bold text-[#0f231c]">{item.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. ACADEMICS PREVIEW ──────────────────────────────────── */}
      <section className="py-12 md:py-16 bg-white border-b border-[#e5e0d5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="h-px w-5 bg-[#c59b27]" />
                <span className="text-xs uppercase tracking-widest font-extrabold text-[#164e37]">Academics</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0f231c] tracking-tight">
                Our Programmes
              </h2>
            </div>
            <Link
              to="/departments"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#164e37] hover:text-[#0f3b29] group shrink-0"
            >
              Explore Academics
              <ArrowRight className="w-3.5 h-3.5 text-[#c59b27] transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { num: '01', title: "Qur'an & Tajweed", desc: 'Proper recitation, Makharij, and Hifz of essential Surahs.' },
              { num: '02', title: 'Islamic Studies', desc: 'Aqeedah, Fiqh, and daily worship for student life.' },
              { num: '03', title: 'Arabic Language', desc: 'Reading, writing, and foundational grammar.' },
              { num: '04', title: 'Moral Education', desc: 'Character building and general academic support.' },
            ].map((item) => (
              <Link
                key={item.num}
                to="/departments"
                className="group bg-[#fbfaf7] rounded-xl border border-[#e5e0d5] hover:border-[#164e37]/40 hover:bg-white hover:shadow-xs p-5 transition-all"
              >
                <span className="text-2xl font-serif font-bold text-[#164e37]">{item.num}</span>
                <h3 className="text-sm font-bold text-[#0f231c] mt-2 mb-1 group-hover:text-[#164e37] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
              </Link>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              to="/departments"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#164e37] hover:bg-[#0f3b29] text-white text-sm font-semibold rounded-xl transition-colors group shadow-xs min-h-[44px]"
            >
              Explore Academics
              <ArrowRight className="w-3.5 h-3.5 text-[#c59b27] transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── 5. LATEST UPDATE ──────────────────────────────────────── */}
      <section className="py-12 md:py-16 bg-[#fbfaf7] border-b border-[#e5e0d5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          <div className="flex items-end justify-between mb-6 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="h-px w-5 bg-[#c59b27]" />
                <span className="text-xs uppercase tracking-widest font-extrabold text-[#164e37]">
                  Latest Update
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0f231c] tracking-tight">
                News & Notices
              </h2>
            </div>
            <Link
              to="/events"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#164e37] hover:text-[#0f3b29] group shrink-0"
            >
              View All
              <ArrowRight className="w-3.5 h-3.5 text-[#c59b27] transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {update ? (
            <Link
              to={update.href}
              className="group flex flex-col sm:flex-row sm:items-center gap-5 bg-white rounded-xl border border-[#e5e0d5] hover:border-[#164e37]/40 hover:shadow-xs p-5 sm:p-6 transition-all"
            >
              <div className="shrink-0">
                <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold">
                  {update.label}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-bold text-[#0f231c] group-hover:text-[#164e37] transition-colors truncate">
                  {update.title}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5 font-mono">{update.date}</p>
              </div>
              <div className="shrink-0 flex items-center gap-1 text-xs font-semibold text-[#164e37]">
                <span>Read More</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#c59b27] transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ) : (
            <div className="bg-white rounded-xl border border-[#e5e0d5] p-6 text-center text-sm text-slate-500">
              No announcements at this time.{' '}
              <Link to="/events" className="text-[#164e37] font-semibold hover:underline">
                Browse all updates →
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* ── 6. ADMISSION CTA ──────────────────────────────────────── */}
      <section className="py-14 md:py-18 bg-[#0d281e] text-white relative overflow-hidden">
        {/* subtle pattern */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="cta-geo" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 30 0 L 60 30 L 30 60 L 0 30 Z" fill="none" stroke="#ffffff" strokeWidth="0.75" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#cta-geo)" />
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Left: CTA text */}
            <div className="space-y-5">
              <div className="flex items-center gap-2">
                <span className="h-px w-5 bg-[#c59b27]" />
                <span className="text-xs uppercase tracking-widest font-extrabold text-emerald-300">
                  Admissions Open
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Begin Your Child's Journey With Us
              </h2>
              <p className="text-sm text-emerald-100/80 leading-relaxed max-w-md">
                Give your child the foundation of authentic Islamic education combined with modern learning.
                Enquire today — our office will get back to you promptly.
              </p>
              <button
                type="button"
                onClick={onOpenAdmissionModal}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#c59b27] hover:bg-[#d6a933] text-slate-950 text-sm font-bold rounded-xl transition-all shadow-sm group min-h-[44px]"
              >
                <GraduationCap className="w-4 h-4" />
                Admission Enquiry
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
              <div className="pt-2">
                <Link
                  to="/contact"
                  className="text-xs text-emerald-300/70 hover:text-emerald-200 underline underline-offset-2"
                >
                  Or visit us at Korangath, Tirur →
                </Link>
              </div>
            </div>

            {/* Right: Inline enquiry form */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 sm:p-6 shadow-xl">
              {submitted ? (
                <div className="text-center space-y-3 py-6">
                  <div className="w-12 h-12 rounded-full bg-emerald-800/40 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6 text-[#c59b27]" />
                  </div>
                  <h3 className="text-base font-bold text-white">Enquiry Received</h3>
                  <p className="text-xs text-emerald-200/80 leading-relaxed max-w-xs mx-auto">
                    Thank you, <strong>{enquiryForm.fullName}</strong>. We'll be in touch shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setEnquiryForm({ fullName: '', phone: '', email: '', studentName: '', enquiryType: 'Admission', message: '' });
                      setFormErrors({});
                    }}
                    className="text-xs text-emerald-300 hover:text-white underline mt-1"
                  >
                    Submit another enquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  <h3 className="text-sm font-bold text-white">Quick Enquiry Form</h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <input
                        type="text"
                        placeholder="Your full name *"
                        value={enquiryForm.fullName}
                        onChange={(e) => { setEnquiryForm({ ...enquiryForm, fullName: e.target.value }); if (formErrors.fullName) setFormErrors({ ...formErrors, fullName: '' }); }}
                        className={`w-full px-3 py-2.5 text-xs bg-white/10 border ${formErrors.fullName ? 'border-rose-400' : 'border-white/20'} text-white placeholder-white/40 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#c59b27]`}
                      />
                      {formErrors.fullName && <p className="text-rose-400 text-[10px] mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3 shrink-0" />{formErrors.fullName}</p>}
                    </div>
                    <div>
                      <input
                        type="tel"
                        placeholder="Phone number *"
                        value={enquiryForm.phone}
                        onChange={(e) => { setEnquiryForm({ ...enquiryForm, phone: e.target.value }); if (formErrors.phone) setFormErrors({ ...formErrors, phone: '' }); }}
                        className={`w-full px-3 py-2.5 text-xs bg-white/10 border ${formErrors.phone ? 'border-rose-400' : 'border-white/20'} text-white placeholder-white/40 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#c59b27]`}
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
                      className={`w-full px-3 py-2.5 text-xs bg-white/10 border ${formErrors.studentName ? 'border-rose-400' : 'border-white/20'} text-white placeholder-white/40 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#c59b27]`}
                    />
                    {formErrors.studentName && <p className="text-rose-400 text-[10px] mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3 shrink-0" />{formErrors.studentName}</p>}
                  </div>

                  <div>
                    <select
                      value={enquiryForm.enquiryType}
                      onChange={(e) => setEnquiryForm({ ...enquiryForm, enquiryType: e.target.value })}
                      className="w-full px-3 py-2.5 text-xs bg-white/10 border border-white/20 text-white rounded-lg focus:outline-none focus:ring-1 focus:ring-[#c59b27] cursor-pointer"
                    >
                      <option value="Admission" className="text-slate-900 bg-white">Admission</option>
                      <option value="Academic Information" className="text-slate-900 bg-white">Academic Information</option>
                      <option value="Student Information" className="text-slate-900 bg-white">Student Information</option>
                      <option value="General Enquiry" className="text-slate-900 bg-white">General Enquiry</option>
                    </select>
                  </div>

                  <div>
                    <textarea
                      rows={3}
                      placeholder="Your message or question... *"
                      value={enquiryForm.message}
                      onChange={(e) => { setEnquiryForm({ ...enquiryForm, message: e.target.value }); if (formErrors.message) setFormErrors({ ...formErrors, message: '' }); }}
                      className={`w-full px-3 py-2.5 text-xs bg-white/10 border ${formErrors.message ? 'border-rose-400' : 'border-white/20'} text-white placeholder-white/40 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#c59b27] resize-none`}
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
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
