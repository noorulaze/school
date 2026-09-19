import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  Compass,
  GraduationCap
} from 'lucide-react';
import { SCHOOL_INFO } from '../data/schoolInfo';
import { PlaceholderBadge } from '../components/PlaceholderBadge';

interface ContactProps {
  onOpenAdmissionModal: () => void;
}

export const Contact: React.FC<ContactProps> = ({ onOpenAdmissionModal }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="w-full flex flex-col bg-[#fbfaf7] text-slate-800">
      {/* 1. Page Header */}
      <section className="bg-white border-b border-[#e5e0d5] py-8 sm:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
            <Link to="/" className="hover:text-[#164e37]">Home</Link>
            <span>/</span>
            <span className="text-[#164e37] font-semibold">Contact & Administrative Office</span>
          </div>

          <div className="max-w-3xl">
            <h1 className="text-2xl sm:text-4xl font-extrabold text-[#0f231c] tracking-tight">
              Contact Administrative Office
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
              Official address, office consultation hours, and direct inquiry communication for {SCHOOL_INFO.officialName} ({SCHOOL_INFO.localName}), Korangath, Tirur.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Main Content (Two-Column Layout) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Official Administrative Details & Placeholders */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 sm:p-7 rounded-2xl border border-[#e5e0d5] space-y-4 shadow-2xs">
              <div>
                <span className="text-[10px] font-bold text-[#164e37] uppercase tracking-wider bg-[#f4f1ea] px-2.5 py-1 rounded border border-[#d2cabb]">
                  Administrative Desk
                </span>
                <h2 className="text-lg font-bold text-slate-900 mt-2">
                  {SCHOOL_INFO.officialName}
                </h2>
                <p className="text-xs text-[#164e37] font-semibold">
                  {SCHOOL_INFO.localName} <span className="text-slate-500 font-normal">(ഷറഫിയ്യ കോരങ്ങത്ത്)</span>
                </p>
                <p className="font-amiri text-xs text-slate-500 mt-1" dir="rtl">
                  {SCHOOL_INFO.arabicCalligraphySubtitle}
                </p>
              </div>

              {/* 4 Official Contact Channels with Placeholders */}
              <div className="space-y-3 pt-2 text-xs border-t border-[#e5e0d5]">
                {/* 1. Address */}
                <div className="p-3.5 rounded-xl bg-[#fbfaf7] border border-[#e5e0d5] space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-800 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#164e37]" />
                      <span>Campus Location</span>
                    </span>
                    <PlaceholderBadge label="Verified Locality" size="sm" />
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    Korangath, Tirur, Malappuram District, Kerala, India – 676101
                  </p>
                </div>

                {/* 2. Phone */}
                <div className="p-3.5 rounded-xl bg-[#fbfaf7] border border-[#e5e0d5] space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-800 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-[#164e37]" />
                      <span>Office Telephone</span>
                    </span>
                    <PlaceholderBadge label="Official Slot" size="sm" />
                  </div>
                  <p className="text-slate-700 font-mono text-xs">
                    {SCHOOL_INFO.contact.phone}
                  </p>
                </div>

                {/* 3. Email */}
                <div className="p-3.5 rounded-xl bg-[#fbfaf7] border border-[#e5e0d5] space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-800 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-[#164e37]" />
                      <span>Administrative Email</span>
                    </span>
                    <PlaceholderBadge label="Official Slot" size="sm" />
                  </div>
                  <p className="text-slate-700 font-mono text-xs">
                    {SCHOOL_INFO.contact.email}
                  </p>
                </div>

                {/* 4. Hours */}
                <div className="p-3.5 rounded-xl bg-[#fbfaf7] border border-[#e5e0d5] space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-800 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#164e37]" />
                      <span>Office Visiting Hours</span>
                    </span>
                    <PlaceholderBadge label="Standardized Schedule" size="sm" />
                  </div>
                  <p className="text-slate-600">
                    {SCHOOL_INFO.contact.officeHours}
                  </p>
                </div>
              </div>
            </div>

            {/* Transit & Commute Information */}
            <div className="p-5 rounded-2xl bg-[#f4f1ea] border border-[#d2cabb] space-y-2 text-xs">
              <span className="font-bold text-slate-900 flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-[#164e37]" />
                <span>Transit & Directions from Tirur Town:</span>
              </span>
              <p className="text-slate-600 leading-relaxed">
                Located in the residential community of Korangath, easily accessible via local auto-rickshaw or personal transport:
              </p>
              <ul className="space-y-1 text-slate-600 pt-1">
                <li>• Approx. 3.5 km from <strong>Tirur Railway Station</strong></li>
                <li>• Approx. 3.0 km from <strong>Tirur Town Bus Stand</strong></li>
                <li>• Near Korangath local junction and community mosque</li>
              </ul>
            </div>
          </div>

          {/* Right Column: Contact Inquiry Form (with exact 4 fields: Name, Email, Phone, Message) */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-[#e5e0d5] shadow-2xs">
            <h2 className="text-xl font-bold text-[#0f231c]">
              Send Official Inquiry Message
            </h2>
            <p className="text-xs text-slate-600 mt-1 mb-6">
              Complete the form below to communicate with the administrative office regarding admissions, curriculum, or batch timings.
            </p>

            {isSubmitted ? (
              <div className="p-8 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h3 className="text-base font-bold text-emerald-950">
                  Inquiry Successfully Received
                </h3>
                <p className="text-xs text-slate-700 max-w-md mx-auto leading-relaxed">
                  Thank you, <strong>{formData.name}</strong>. Your inquiry has been forwarded to the office desk of Sharaful Islam Madrassa. Our staff will respond to <strong>{formData.email}</strong> or <strong>{formData.phone}</strong> during working hours.
                </p>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({ name: '', email: '', phone: '', message: '' });
                    }}
                    className="px-5 py-2 bg-[#164e37] text-white text-xs font-bold rounded-lg transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                {/* Field 1: Name */}
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs bg-white border border-[#d2cabb] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#164e37]"
                  />
                </div>

                {/* Field 2: Email */}
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs bg-white border border-[#d2cabb] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#164e37]"
                  />
                </div>

                {/* Field 3: Phone */}
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 Phone number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs bg-white border border-[#d2cabb] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#164e37]"
                  />
                </div>

                {/* Field 4: Message */}
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Inquiry Message *
                  </label>
                  <textarea
                    rows={5}
                    required
                    placeholder="Please specify your query regarding admissions, syllabus, batch schedules, or transfer..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs bg-white border border-[#d2cabb] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#164e37] resize-none"
                  />
                </div>

                <div className="pt-2 flex flex-wrap items-center gap-3">
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
                    className="px-5 py-2.5 bg-[#f4f1ea] hover:bg-[#eae5da] text-slate-800 border border-[#d2cabb] font-semibold rounded-lg transition-colors flex items-center gap-1.5"
                  >
                    <GraduationCap className="w-3.5 h-3.5 text-[#164e37]" />
                    <span>Admission Enquiry Form</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
