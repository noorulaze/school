import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  GraduationCap,
  ArrowRight,
  CheckCircle2,
  FileCheck,
  Calendar,
  HelpCircle,
  Clock,
  Phone,
  Send,
  AlertCircle,
  BookOpen,
  Sparkles
} from 'lucide-react';
import { motion } from 'framer-motion';
import { submitAdmissionEnquiry } from '../services/publicService';

interface AdmissionsProps {
  onOpenAdmissionModal: () => void;
}

export const Admissions: React.FC<AdmissionsProps> = ({ onOpenAdmissionModal }) => {
  const [formData, setFormData] = useState({
    parentName: '',
    studentName: '',
    phone: '',
    email: '',
    enquiryType: 'Admission',
    message: '',
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.parentName.trim() || formData.parentName.trim().length < 2) {
      errs.parentName = 'Parent / Guardian name is required.';
    }
    if (!formData.studentName.trim() || formData.studentName.trim().length < 2) {
      errs.studentName = 'Student name is required.';
    }
    if (formData.phone.replace(/\D/g, '').length < 10) {
      errs.phone = 'Please enter a valid 10-digit phone number.';
    }
    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Please enter a valid email address.';
    }
    if (!formData.message.trim() || formData.message.trim().length < 5) {
      errs.message = 'Please provide details regarding class or query.';
    }
    setFormErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    try {
      await submitAdmissionEnquiry({
        applicantName: formData.parentName.trim(),
        parentName: formData.parentName.trim(),
        studentName: formData.studentName.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim() || undefined,
        enquiryType: formData.enquiryType as 'Admission',
        message: formData.message.trim(),
      });
      setSubmitted(true);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Submission failed. Please try again.';
      alert(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const steps = [
    {
      step: '01',
      title: 'Enquiry Submission',
      desc: 'Submit your enquiry online through our website or visit the campus office at Korangath, Tirur.',
    },
    {
      step: '02',
      title: 'Interactive Consultation',
      desc: 'A brief interaction with the student and parents to understand academic background and placement.',
    },
    {
      step: '03',
      title: 'Documentation & Verification',
      desc: 'Verification of age proof, previous academic records, and completion of the enrollment dossier.',
    },
    {
      step: '04',
      title: 'Enrollment & Induction',
      desc: 'Confirmation of admission, syllabus allocation, class schedule assignment, and orientation.',
    },
  ];

  const documents = [
    'Copy of Student Birth Certificate (for age verification)',
    'Transfer Certificate (TC) or previous school progress card (if applicable)',
    'Passport-size photographs of the student (4 copies)',
    'Copy of Parent/Guardian Identification (Aadhaar / Passport)',
    'Immunization and basic health records',
  ];

  return (
    <div className="w-full flex flex-col bg-[#fbfaf7] text-slate-800">
      {/* ── Page Header ────────────────────────────────────────────── */}
      <section className="bg-white border-b border-[#e5e0d5] py-8 sm:py-12 lg:py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none select-none">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="adm-geo" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 30 0 L 60 30 L 30 60 L 0 30 Z" fill="none" stroke="#164e37" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#adm-geo)" />
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
            <Link to="/" className="hover:text-[#164e37] transition-colors">Home</Link>
            <span>/</span>
            <span className="text-[#164e37] font-semibold">Admissions</span>
          </div>

          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#164e37]/8 border border-[#164e37]/20 text-[11px] font-bold text-[#164e37] uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c59b27]" />
              Academic Year 2025–2026
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0f231c] tracking-tight leading-tight">
              Admissions at Sharafiyya English Medium School
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
              Nurturing knowledge, faith, and character. We welcome applications for students seeking authentic Islamic education combined with modern English-medium instruction at our campus in Korangath, Niramaruthur.
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={onOpenAdmissionModal}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#164e37] hover:bg-[#0f3b29] text-white text-xs sm:text-sm font-bold rounded-xl shadow-sm transition-all min-h-[44px]"
              >
                <GraduationCap className="w-4 h-4 text-[#c59b27]" />
                <span>Open Admission Enquiry Form</span>
              </button>
              <a
                href="#enquiry-section"
                className="inline-flex items-center gap-2 px-5 py-3 bg-[#f4f1ea] hover:bg-[#eae4d5] text-[#0f231c] text-xs sm:text-sm font-semibold rounded-xl border border-[#d2cabb] transition-all min-h-[44px]"
              >
                <span>View Guidelines</span>
                <ArrowRight className="w-4 h-4 text-[#164e37]" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Admission Process Steps ─────────────────────────────────── */}
      <section className="py-12 sm:py-16 bg-[#fbfaf7] border-b border-[#e5e0d5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          <div className="text-center max-w-xl mx-auto mb-10">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="h-px w-6 bg-[#c59b27]" />
              <span className="text-[11px] uppercase tracking-widest font-extrabold text-[#164e37]">Step-By-Step</span>
              <span className="h-px w-6 bg-[#c59b27]" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0f231c] tracking-tight">
              Admission Process
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              A transparent, straightforward admission journey for parents and prospective students.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {steps.map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="bg-white rounded-2xl border border-[#e5e0d5] p-5 sm:p-6 shadow-2xs hover:shadow-md hover:border-[#164e37]/30 transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-2xl font-serif font-bold text-[#164e37]/40 block mb-2">
                    {item.step}
                  </span>
                  <h3 className="text-sm font-bold text-[#0f231c] mb-2">{item.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#f0ece3] flex items-center gap-1.5 text-[11px] font-semibold text-[#164e37]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#c59b27]" />
                  <span>Phase {i + 1}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Requirements & Verification ─────────────────────────────── */}
      <section className="py-12 sm:py-16 bg-white border-b border-[#e5e0d5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Left: Documents Required */}
            <div className="lg:col-span-6 space-y-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="h-px w-6 bg-[#c59b27]" />
                <span className="text-[11px] uppercase tracking-widest font-extrabold text-[#164e37]">Required Checklist</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#0f231c]">
                Documents for Enrollment
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                To complete official enrollment records at Sharafiyya English Medium School, guardians are requested to submit the following documents at the campus office:
              </p>

              <div className="space-y-2.5 pt-2">
                {documents.map((doc) => (
                  <div
                    key={doc}
                    className="p-3.5 rounded-xl bg-[#fbfaf7] border border-[#e5e0d5] flex items-start gap-3"
                  >
                    <FileCheck className="w-4 h-4 text-[#164e37] shrink-0 mt-0.5" />
                    <span className="text-xs text-slate-700 leading-relaxed font-medium">{doc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Key Values & Information */}
            <div className="lg:col-span-6 space-y-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="h-px w-6 bg-[#c59b27]" />
                <span className="text-[11px] uppercase tracking-widest font-extrabold text-[#164e37]">Admission Guidelines</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#0f231c]">
                Important Information for Parents
              </h2>

              <div className="space-y-3">
                <div className="p-4 rounded-2xl bg-[#fbfaf7] border border-[#e5e0d5] space-y-2">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-[#164e37]" />
                    <h3 className="text-sm font-bold text-[#0f231c]">Integrated Curriculum</h3>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Our academic framework balances rigorous English-medium academic instruction with foundational Quranic study, Tajweed rules, Arabic language, and practical Islamic morals.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#fbfaf7] border border-[#e5e0d5] space-y-2">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#164e37]" />
                    <h3 className="text-sm font-bold text-[#0f231c]">Office Hours & Enquiries</h3>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    The admissions desk is available during regular institutional working hours. Parents are encouraged to schedule an appointment for detailed curriculum discussion and campus tour.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#fbfaf7] border border-[#e5e0d5] space-y-2">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#164e37]" />
                    <h3 className="text-sm font-bold text-[#0f231c]">Non-Discrimination & Character First</h3>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Admissions are open to all students committed to learning, discipline, and moral growth under our institutional guidelines.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Direct Enquiry Form Section ─────────────────────────────── */}
      <section id="enquiry-section" className="py-14 sm:py-18 bg-[#0d281e] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="adm-form-geo" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 30 0 L 60 30 L 30 60 L 0 30 Z" fill="none" stroke="#ffffff" strokeWidth="0.75" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#adm-form-geo)" />
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center gap-2">
                <span className="h-px w-6 bg-[#c59b27]" />
                <span className="text-[11px] uppercase tracking-widest font-extrabold text-emerald-300">Direct Desk</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Submit an Admission Enquiry
              </h2>
              <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed">
                Have questions regarding fees, class vacancies, or admission criteria? Fill out this enquiry form and our administration office will contact you promptly.
              </p>

              <div className="pt-2 space-y-2.5 text-xs text-emerald-200/90">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#c59b27]" />
                  <span>Campus Office: Korangath, Tirur, Malappuram</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#c59b27]" />
                  <span>Admissions open for upcoming academic term</span>
                </div>
                <div className="flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-[#c59b27]" />
                  <span>All enquiries processed confidentially</span>
                </div>
              </div>
            </div>

            {/* Right: Form */}
            <div className="lg:col-span-7 bg-white/6 backdrop-blur-sm border border-white/12 rounded-2xl p-5 sm:p-7 shadow-xl">
              {submitted ? (
                <div className="text-center py-8 space-y-3">
                  <div className="w-14 h-14 rounded-full bg-emerald-800/40 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-7 h-7 text-[#c59b27]" />
                  </div>
                  <h3 className="text-lg font-bold text-white">Enquiry Received</h3>
                  <p className="text-xs sm:text-sm text-emerald-200/80 max-w-sm mx-auto leading-relaxed">
                    Thank you, <strong>{formData.parentName}</strong>. Your enquiry for <strong>{formData.studentName}</strong> has been received by our admissions office.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ parentName: '', studentName: '', phone: '', email: '', enquiryType: 'Admission', message: '' });
                      setFormErrors({});
                    }}
                    className="text-xs text-[#c59b27] hover:text-amber-300 underline pt-2"
                  >
                    Submit another admission enquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-3.5">
                  <h3 className="text-sm font-bold text-white mb-2">Admission Enquiry Form</h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-emerald-100/90 mb-1">
                        Parent / Guardian Name <span className="text-rose-400">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Parent / Guardian name"
                        value={formData.parentName}
                        onChange={(e) => {
                          setFormData({ ...formData, parentName: e.target.value });
                          if (formErrors.parentName) setFormErrors({ ...formErrors, parentName: '' });
                        }}
                        className={`w-full px-3 py-2.5 text-xs bg-white/10 border ${
                          formErrors.parentName ? 'border-rose-400' : 'border-white/20'
                        } text-white placeholder-white/40 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#c59b27]`}
                      />
                      {formErrors.parentName && (
                        <p className="text-rose-400 text-[10px] mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3 shrink-0" />
                          {formErrors.parentName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-emerald-100/90 mb-1">
                        Student / Applicant Name <span className="text-rose-400">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Student name"
                        value={formData.studentName}
                        onChange={(e) => {
                          setFormData({ ...formData, studentName: e.target.value });
                          if (formErrors.studentName) setFormErrors({ ...formErrors, studentName: '' });
                        }}
                        className={`w-full px-3 py-2.5 text-xs bg-white/10 border ${
                          formErrors.studentName ? 'border-rose-400' : 'border-white/20'
                        } text-white placeholder-white/40 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#c59b27]`}
                      />
                      {formErrors.studentName && (
                        <p className="text-rose-400 text-[10px] mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3 shrink-0" />
                          {formErrors.studentName}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-emerald-100/90 mb-1">
                        Contact Phone <span className="text-rose-400">*</span>
                      </label>
                      <input
                        type="tel"
                        placeholder="+91 Mobile number"
                        value={formData.phone}
                        onChange={(e) => {
                          setFormData({ ...formData, phone: e.target.value });
                          if (formErrors.phone) setFormErrors({ ...formErrors, phone: '' });
                        }}
                        className={`w-full px-3 py-2.5 text-xs bg-white/10 border ${
                          formErrors.phone ? 'border-rose-400' : 'border-white/20'
                        } text-white placeholder-white/40 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#c59b27]`}
                      />
                      {formErrors.phone && (
                        <p className="text-rose-400 text-[10px] mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3 shrink-0" />
                          {formErrors.phone}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-emerald-100/90 mb-1">
                        Email Address <span className="text-emerald-300/60 font-normal">(Optional)</span>
                      </label>
                      <input
                        type="email"
                        placeholder="email@example.com"
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          if (formErrors.email) setFormErrors({ ...formErrors, email: '' });
                        }}
                        className={`w-full px-3 py-2.5 text-xs bg-white/10 border ${
                          formErrors.email ? 'border-rose-400' : 'border-white/20'
                        } text-white placeholder-white/40 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#c59b27]`}
                      />
                      {formErrors.email && (
                        <p className="text-rose-400 text-[10px] mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3 shrink-0" />
                          {formErrors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-emerald-100/90 mb-1">
                      Class Applying For & Details <span className="text-rose-400">*</span>
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Please specify class/standard, current school background, and any specific questions..."
                      value={formData.message}
                      onChange={(e) => {
                        setFormData({ ...formData, message: e.target.value });
                        if (formErrors.message) setFormErrors({ ...formErrors, message: '' });
                      }}
                      className={`w-full px-3 py-2.5 text-xs bg-white/10 border ${
                        formErrors.message ? 'border-rose-400' : 'border-white/20'
                      } text-white placeholder-white/40 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#c59b27] resize-none`}
                    />
                    {formErrors.message && (
                      <p className="text-rose-400 text-[10px] mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        {formErrors.message}
                      </p>
                    )}
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row gap-3">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto px-6 py-3 bg-[#c59b27] hover:bg-[#d6a933] disabled:opacity-50 text-slate-950 font-bold text-xs sm:text-sm rounded-xl transition-all flex items-center justify-center gap-2 min-h-[44px]"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-slate-800/30 border-t-slate-900 rounded-full animate-spin" />
                          <span>Submitting...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Submit Admission Enquiry</span>
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={onOpenAdmissionModal}
                      className="w-full sm:w-auto px-5 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm rounded-xl border border-white/20 transition-all text-center min-h-[44px]"
                    >
                      <span>Open Quick Modal</span>
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
