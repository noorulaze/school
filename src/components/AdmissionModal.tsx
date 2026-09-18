import React, { useState } from 'react';
import { X, CheckCircle, Send, School, Phone, User, MapPin } from 'lucide-react';
import { SCHOOL_INFO } from '../data/schoolInfo';
import { PlaceholderBadge } from './PlaceholderBadge';

interface AdmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdmissionModal: React.FC<AdmissionModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    studentName: '',
    parentName: '',
    phone: '',
    applyingClass: 'Class 1 (Foundational)',
    address: '',
    notes: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate interactive submission
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFormData({
      studentName: '',
      parentName: '',
      phone: '',
      applyingClass: 'Class 1 (Foundational)',
      address: '',
      notes: '',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-emerald-900/20 overflow-hidden transform transition-all animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-900 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white/90 hover:text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <School className="w-5 h-5 text-amber-400" />
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-300">
              Admission Enquiry Portal
            </span>
          </div>

          <h3 className="text-xl font-bold text-white">
            Enroll at {SCHOOL_INFO.localName}
          </h3>
          <p className="text-xs text-emerald-100/90 mt-1">
            {SCHOOL_INFO.officialName} • {SCHOOL_INFO.location.area}, {SCHOOL_INFO.location.city}
          </p>
        </div>

        {/* Modal Content */}
        <div className="p-6">
          {isSubmitted ? (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-600">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-2">
                Enquiry Submitted Successfully
              </h4>
              <p className="text-sm text-slate-600 mb-4 max-w-sm mx-auto">
                Thank you, <strong>{formData.parentName || 'Parent/Guardian'}</strong>. Your admission request for <strong>{formData.studentName || 'your ward'}</strong> has been registered in our demonstration system.
              </p>
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-800 mb-6 text-left">
                <p className="font-semibold mb-1">Administrative Notice:</p>
                <p>This is a frontend demonstration portal. Official admissions for {SCHOOL_INFO.officialName} will be processed upon presentation of documents at the school office in {SCHOOL_INFO.location.area}.</p>
              </div>
              <button
                onClick={handleReset}
                className="w-full py-2.5 px-4 bg-emerald-800 hover:bg-emerald-900 text-white font-medium rounded-xl transition-colors shadow-md"
              >
                Close & Return
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-xs text-slate-500">Academic Year: 2025–2026 Session</span>
                <PlaceholderBadge label="Editable Intake Form" size="sm" />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Student Full Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    placeholder="Enter student's name"
                    value={formData.studentName}
                    onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Parent / Guardian *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Guardian's name"
                    value={formData.parentName}
                    onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Contact Phone *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                    <input
                      type="tel"
                      required
                      placeholder="+91 Mobile number"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Class / Grade Applied
                  </label>
                  <select
                    value={formData.applyingClass}
                    onChange={(e) => setFormData({ ...formData, applyingClass: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-white"
                  >
                    <option>Class 1 (Foundational)</option>
                    <option>Class 2</option>
                    <option>Class 3</option>
                    <option>Class 4</option>
                    <option>Class 5</option>
                    <option>Class 6 (Intermediate)</option>
                    <option>Class 7</option>
                    <option>Class 8 (Senior)</option>
                    <option>Class 9</option>
                    <option>Class 10 (Senior Secondary)</option>
                    <option>Hifz / Special Recitation Course</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Residence / Locality
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      placeholder="e.g. Korangath, Tirur"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Additional Notes / Previous Madrasa Experience (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Any specific instructions, previous class attended, or transport query"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 bg-emerald-800 hover:bg-emerald-900 text-white font-medium rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 group"
                >
                  <Send className="w-4 h-4 group-hover:translate-x-0.5 transition-transform text-amber-400" />
                  <span>Submit Admission Enquiry</span>
                </button>
              </div>

              <p className="text-[11px] text-center text-slate-400">
                Official enquiries are reviewed by the Sharaful Islam Madrassa administrative staff.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
