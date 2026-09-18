import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, School, Compass, ShieldAlert } from 'lucide-react';
import { SCHOOL_INFO } from '../data/schoolInfo';
import { IslamicPattern } from '../components/IslamicPattern';
import { PlaceholderBadge } from '../components/PlaceholderBadge';

interface ContactProps {
  onOpenAdmissionModal: () => void;
}

export const Contact: React.FC<ContactProps> = ({ onOpenAdmissionModal }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'General Enquiry',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="w-full flex flex-col">
      {/* Header Banner */}
      <section className="relative bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-900 text-white py-16 sm:py-20 px-4 sm:px-6 overflow-hidden">
        <IslamicPattern variant="rosette" className="-top-12 -left-12 text-amber-400" opacity={0.08} />
        <div className="absolute inset-0 bg-islamic-pattern opacity-10 pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-800/80 border border-amber-400/40 text-amber-300 text-xs font-semibold uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5" />
            <span>Campus Location & Communication</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Contact & Location
          </h1>

          <p className="text-emerald-300 font-medium text-base sm:text-lg">
            {SCHOOL_INFO.officialName} • {SCHOOL_INFO.localName}
          </p>

          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
            Located in Korangath, Tirur, Malappuram, Kerala, India. We are at your service for admissions, academic clarifications, and community visits.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-[#FDFBF7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Column: Official Details & Map */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    Official Contact Details
                  </h3>
                  <p className="text-xs text-emerald-800 font-semibold mt-0.5">
                    {SCHOOL_INFO.officialName} ({SCHOOL_INFO.localName})
                  </p>
                </div>

                <div className="space-y-4 text-xs sm:text-sm">
                  <div className="flex items-start gap-3.5">
                    <MapPin className="w-5 h-5 text-emerald-700 shrink-0 mt-1" />
                    <div>
                      <p className="font-bold text-slate-900">Postal Address:</p>
                      <p className="text-slate-600 leading-relaxed mt-0.5">
                        {SCHOOL_INFO.location.fullAddress}
                      </p>
                      <p className="text-[11px] text-amber-700 font-medium mt-1">
                        Landmark: {SCHOOL_INFO.location.landmarkPlaceholder}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <Phone className="w-5 h-5 text-emerald-700 shrink-0 mt-1" />
                    <div>
                      <p className="font-bold text-slate-900">Telephone / Mobile:</p>
                      <p className="font-mono text-slate-600 mt-0.5">{SCHOOL_INFO.contact.phone}</p>
                      <p className="font-mono text-slate-500 text-xs">{SCHOOL_INFO.contact.phoneAlternative}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <Mail className="w-5 h-5 text-emerald-700 shrink-0 mt-1" />
                    <div>
                      <p className="font-bold text-slate-900">Official Email:</p>
                      <p className="font-mono text-slate-600 mt-0.5 break-all">{SCHOOL_INFO.contact.email}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <Clock className="w-5 h-5 text-emerald-700 shrink-0 mt-1" />
                    <div>
                      <p className="font-bold text-slate-900">Administrative Visiting Hours:</p>
                      <p className="text-slate-600 mt-0.5">{SCHOOL_INFO.contact.officeHours}</p>
                    </div>
                  </div>
                </div>

                <div className="p-3.5 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
                  <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">Placeholder Record:</p>
                    <p className="text-[11px] text-amber-800">Phone numbers and email addresses can be updated directly by the school administrative staff in <code className="bg-amber-100 px-1 py-0.5 rounded">src/data/schoolInfo.ts</code>.</p>
                  </div>
                </div>
              </div>

              {/* Campus Location Map Placeholder */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <Compass className="w-4 h-4 text-emerald-700" />
                    <span>Location Map & Transit</span>
                  </h4>
                  <PlaceholderBadge label="Map Coordinate Slot" size="sm" />
                </div>

                <div className="aspect-video w-full rounded-2xl bg-gradient-to-br from-emerald-900 via-slate-900 to-emerald-950 p-6 flex flex-col items-center justify-center text-center text-white border border-emerald-800/50">
                  <MapPin className="w-8 h-8 text-amber-400 mb-2 animate-bounce" />
                  <p className="text-xs font-bold text-white">
                    {SCHOOL_INFO.location.area}, Tirur, Malappuram
                  </p>
                  <p className="text-[11px] text-emerald-200 mt-1">
                    Kerala, India • Coordinates ready for Google Maps iframe embed
                  </p>
                </div>

                <p className="text-xs text-slate-500 leading-relaxed">
                  Conveniently accessible from Tirur town and railway station (approx. 10–15 mins transit). Local auto-rickshaws and buses connect regularly to Korangath.
                </p>
              </div>
            </div>

            {/* Right Column: Interactive Contact Form & Admission Enquiry Button */}
            <div className="lg:col-span-7 space-y-6">
              <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-xs space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">
                    Send a Message to the Administrative Desk
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">
                    For general questions, admissions verification, or syllabus details, fill in the form below.
                  </p>
                </div>

                {isSubmitted ? (
                  <div className="py-10 text-center space-y-4">
                    <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-700">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h4 className="text-xl font-bold text-slate-900">
                      Message Sent Successfully
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                      Thank you for contacting <strong>{SCHOOL_INFO.officialName}</strong>. Your enquiry has been received in demonstration mode.
                    </p>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="px-6 py-2.5 bg-emerald-800 text-white font-semibold text-xs rounded-xl shadow-xs"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Your name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-700 bg-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="+91 Mobile number"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-700 bg-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Email Address (Optional)
                        </label>
                        <input
                          type="email"
                          placeholder="you@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-700 bg-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Subject / Enquiry Category
                        </label>
                        <select
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-700 bg-white"
                        >
                          <option>General Enquiry</option>
                          <option>Admission for Child</option>
                          <option>Timings & Class Schedule</option>
                          <option>Tajweed & Hifz Wing</option>
                          <option>Management / Committee</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Your Message *
                      </label>
                      <textarea
                        rows={4}
                        required
                        placeholder="Please write your questions or comments here..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-700 bg-white resize-none"
                      />
                    </div>

                    <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                      <button
                        type="submit"
                        className="w-full sm:w-auto px-7 py-3 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
                      >
                        <Send className="w-4 h-4 text-amber-400" />
                        <span>Send Message</span>
                      </button>

                      <button
                        type="button"
                        onClick={onOpenAdmissionModal}
                        className="w-full sm:w-auto px-6 py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-sm rounded-xl transition-all shadow-xs flex items-center justify-center gap-2"
                      >
                        <School className="w-4 h-4" />
                        <span>Open Admission Modal</span>
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
