import React, { useState } from 'react';
import { X, CheckCircle, Send, School, Phone, User, MapPin, Loader2 } from 'lucide-react';
import { SCHOOL_INFO } from '../data/schoolInfo';
import { PlaceholderBadge } from './PlaceholderBadge';
import { submitAdmissionEnquiry } from '../services/publicService';

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Prevent background scrolling while modal is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    setIsSubmitting(true);

    try {
      await submitAdmissionEnquiry({
        applicantName: formData.parentName.trim() || formData.studentName.trim(),
        parentName: formData.parentName.trim(),
        studentName: formData.studentName.trim(),
        phone: formData.phone.trim(),
        enquiryType: 'Admission',
        message: `Applying Class: ${formData.applyingClass}. Residential Area: ${formData.address || 'N/A'}. Additional Notes: ${formData.notes || 'None'}`
      });
      setIsSubmitted(true);
    } catch (err: any) {
      setSubmitError(err.message || 'Failed to submit admission enquiry. Please check the form.');
    } finally {
      setIsSubmitting(false);
    }
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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 flex items-center justify-center p-3 sm:p-4">
      <div
        className="relative w-full max-w-lg bg-white rounded-xl shadow-xl border border-[#d2cabb] overflow-hidden my-auto"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Header */}
        <div className="bg-[#164e37] p-5 text-white relative border-b-2 border-[#c59b27]">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-md bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2 mb-1">
            <School className="w-4 h-4 text-[#c59b27]" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-200">
              Admission Enquiry Form • Academic Session 2025–26
            </span>
          </div>

          <h3 className="text-lg font-bold text-white leading-tight">
            {SCHOOL_INFO.officialName}
          </h3>
          <p className="text-xs text-emerald-100 mt-0.5">
            {SCHOOL_INFO.localName} • {SCHOOL_INFO.location.area}, {SCHOOL_INFO.location.city}
          </p>
        </div>

        {/* Modal Content */}
        <div className="p-4 sm:p-6">
          {isSubmitted ? (
            <div className="text-center py-6 space-y-3">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-800">
                <CheckCircle className="w-7 h-7" />
              </div>
              <h4 className="text-base font-bold text-slate-900">
                Enquiry Logged Successfully
              </h4>
              <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
                Thank you, <strong>{formData.parentName || 'Parent/Guardian'}</strong>. Your admission enquiry for <strong>{formData.studentName || 'your ward'}</strong> has been registered with the school admissions desk. Our team will review your details and contact you promptly.
              </p>
              <div className="p-3 bg-[#f4f1ea] rounded-lg border border-[#d2cabb] text-[11px] text-slate-700 text-left">
                <p className="font-semibold text-[#164e37] mb-0.5">Office Instructions:</p>
                <p>Please visit the school administrative office in Korangath with your child's birth certificate and previous school record to complete formal registration.</p>
              </div>
              <button
                onClick={handleReset}
                className="w-full py-2 px-4 bg-[#164e37] hover:bg-[#0f3b29] text-white font-bold text-xs rounded-lg transition-colors"
              >
                Close Window
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <span className="text-slate-500">Student Enrollment Form</span>
                <PlaceholderBadge label="Editable Intake Form" size="sm" />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Student Full Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400" />
                  <input
                    type="text"
                    required
                    placeholder="Enter student's full name"
                    value={formData.studentName}
                    onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                    className="w-full pl-8 pr-3 py-2 text-xs border border-[#d2cabb] rounded-md focus:outline-none focus:ring-1 focus:ring-[#164e37] bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Parent / Guardian *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Guardian's name"
                    value={formData.parentName}
                    onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-[#d2cabb] rounded-md focus:outline-none focus:ring-1 focus:ring-[#164e37] bg-white"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Contact Mobile *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400" />
                    <input
                      type="tel"
                      required
                      placeholder="+91 Mobile number"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-8 pr-3 py-2 text-xs border border-[#d2cabb] rounded-md focus:outline-none focus:ring-1 focus:ring-[#164e37] bg-white"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Class / Grade Applied
                  </label>
                  <select
                    value={formData.applyingClass}
                    onChange={(e) => setFormData({ ...formData, applyingClass: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-[#d2cabb] rounded-md focus:outline-none focus:ring-1 focus:ring-[#164e37] bg-white"
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
                    <option>Special Hifz & Tajweed Course</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Residential Area
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="e.g. Korangath, Tirur"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full pl-8 pr-3 py-2 text-xs border border-[#d2cabb] rounded-md focus:outline-none focus:ring-1 focus:ring-[#164e37] bg-white"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Additional Notes (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Previous school attended or specific transport query..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-[#d2cabb] rounded-md focus:outline-none focus:ring-1 focus:ring-[#164e37] bg-white resize-none"
                />
              </div>

              {submitError && (
                <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-[11px]">
                  {submitError}
                </div>
              )}

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2.5 px-4 bg-[#164e37] hover:bg-[#0f3b29] text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-xs disabled:opacity-60 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Submitting Enquiry...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5 text-[#c59b27]" />
                      <span>Submit Admission Enquiry</span>
                    </>
                  )}
                </button>
              </div>

              <p className="text-[10px] text-center text-slate-400">
                Official records are reviewed by the Sharafiyya English Medium School administrative staff.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
