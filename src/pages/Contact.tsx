import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, ShieldAlert, Compass } from 'lucide-react';
import { SCHOOL_INFO } from '../data/schoolInfo';

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
    <div className="w-full flex flex-col bg-[#fbfaf7]">
      {/* Page Header & Breadcrumb */}
      <section className="bg-white border-b border-[#e5e0d5] py-8 sm:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
            <Link to="/" className="hover:text-[#164e37]">Home</Link>
            <span>/</span>
            <span className="text-[#164e37] font-semibold">Contact & Office Information</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-[#0f231c]">
            Contact & Office Information
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
            Location, office hours, and administrative communication for {SCHOOL_INFO.officialName} ({SCHOOL_INFO.localName}).
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Official Details & Location */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 rounded-xl border border-[#e5e0d5] space-y-5 shadow-2xs">
              <div>
                <span className="text-[10px] font-bold text-[#164e37] uppercase tracking-wider bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Official Institution Details
                </span>
                <h2 className="text-base font-bold text-slate-900 mt-2">
                  {SCHOOL_INFO.officialName}
                </h2>
                <p className="text-xs text-[#164e37] font-semibold">
                  {SCHOOL_INFO.localName} (ഷറഫിയ്യ കോരങ്ങത്ത്)
                </p>
              </div>

              {/* Editable Placeholders for Address, Phone, and Email */}
              <div className="space-y-3.5 text-xs text-slate-700">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#c59b27] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-900">Address (Editable Placeholder):</strong>
                    <p className="leading-relaxed text-slate-600 mt-0.5">
                      {SCHOOL_INFO.location.fullAddress}
                    </p>
                    <p className="text-amber-800 font-medium text-[11px] mt-1">
                      Landmark: {SCHOOL_INFO.location.landmarkPlaceholder}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-[#c59b27] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-900">Phone Number (Editable Placeholder):</strong>
                    <p className="font-mono text-slate-600 mt-0.5">{SCHOOL_INFO.contact.phone}</p>
                    <p className="font-mono text-slate-500 text-[11px]">{SCHOOL_INFO.contact.phoneAlternative}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-[#c59b27] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-900">Email Address (Editable Placeholder):</strong>
                    <p className="font-mono text-slate-600 mt-0.5 break-all">{SCHOOL_INFO.contact.email}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#c59b27] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-900">Office Visiting Hours:</strong>
                    <p className="text-slate-600 mt-0.5">{SCHOOL_INFO.contact.officeHours}</p>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-[11px] text-amber-900 flex items-start gap-2">
                <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <p>
                  <strong>Administrative Notice:</strong> Official telephone numbers and email addresses can be updated directly in the centralized configuration file <code className="bg-amber-100 px-1 py-0.5 rounded">src/data/schoolInfo.ts</code>.
                </p>
              </div>
            </div>

            {/* Transit Information Frame */}
            <div className="bg-white p-6 rounded-xl border border-[#e5e0d5] space-y-3 shadow-2xs text-xs">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-[#164e37]" />
                <span>Transit Guide (Korangath, Tirur)</span>
              </h3>
              <ul className="text-slate-600 space-y-1.5 leading-relaxed">
                <li>• <strong>From Tirur Railway Station:</strong> Approximately 4 km (10–12 minutes by auto-rickshaw).</li>
                <li>• <strong>From Tirur Town / Bus Stand:</strong> Regular town auto-rickshaw and local bus services connect along Korangath Road.</li>
              </ul>
            </div>
          </div>

          {/* Right Column: Contact Form with Exact Fields: Name, Email, Phone, Message */}
          <div className="lg:col-span-7">
            <div className="bg-white p-6 sm:p-8 rounded-xl border border-[#e5e0d5] space-y-6 shadow-2xs">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Contact Form
                </h2>
                <p className="text-xs text-slate-600 mt-1">
                  Please fill out the form below to submit a message or inquiry to the school administrative desk.
                </p>
              </div>

              {isSubmitted ? (
                <div className="py-8 text-center space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-emerald-700 mx-auto" />
                  <h3 className="text-base font-bold text-slate-900">
                    Message Sent Successfully
                  </h3>
                  <p className="text-xs text-slate-600 max-w-sm mx-auto">
                    Thank you, <strong>{formData.name}</strong>. Your message has been logged in demonstration mode.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="text-xs font-bold text-[#164e37] underline"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  {/* Field 1: Name */}
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 text-xs sm:text-sm border border-[#d2cabb] rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-[#164e37]"
                    />
                  </div>

                  {/* Field 2: Email */}
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="Enter your email address"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2 text-xs sm:text-sm border border-[#d2cabb] rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-[#164e37]"
                    />
                  </div>

                  {/* Field 3: Phone */}
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 Phone number"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3 py-2 text-xs sm:text-sm border border-[#d2cabb] rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-[#164e37]"
                    />
                  </div>

                  {/* Field 4: Message */}
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Message *
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Write your message or inquiry here..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3 py-2 text-xs sm:text-sm border border-[#d2cabb] rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-[#164e37] resize-none"
                    />
                  </div>

                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-[#164e37] hover:bg-[#0f3b29] text-white font-bold rounded-lg shadow-xs transition-colors flex items-center gap-2"
                    >
                      <Send className="w-3.5 h-3.5 text-[#c59b27]" />
                      <span>Send Message</span>
                    </button>

                    <button
                      type="button"
                      onClick={onOpenAdmissionModal}
                      className="px-5 py-2.5 bg-[#f4f1ea] hover:bg-[#eae5da] text-slate-800 border border-[#d2cabb] font-semibold rounded-lg transition-colors"
                    >
                      Admission Enquiry Form
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
