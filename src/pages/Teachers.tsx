import React from 'react';
import { Link } from 'react-router-dom';
import { UserCheck, ShieldAlert } from 'lucide-react';
import { TEACHERS, FACULTY_EDITORIAL_NOTICE } from '../data/teachers';
import { SCHOOL_INFO } from '../data/schoolInfo';
import { PlaceholderBadge } from '../components/PlaceholderBadge';

export const Teachers: React.FC = () => {
  return (
    <div className="w-full flex flex-col bg-[#fbfaf7]">
      {/* Page Header & Breadcrumb */}
      <section className="bg-white border-b border-[#e5e0d5] py-8 sm:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
            <Link to="/" className="hover:text-[#164e37]">Home</Link>
            <span>/</span>
            <span className="text-[#164e37] font-semibold">Teachers Directory</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-[#0f231c]">
            Teachers Directory
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
            Official directory of teaching staff and muallims at {SCHOOL_INFO.officialName} ({SCHOOL_INFO.localName}).
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-8">
        {/* Compliance Notice Banner */}
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-3 text-xs text-amber-950">
          <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <p className="font-bold">Faculty Directory Notice:</p>
            <p className="text-slate-700 leading-relaxed">
              {FACULTY_EDITORIAL_NOTICE}
            </p>
          </div>
        </div>

        {/* Professional Teacher Directory Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {TEACHERS.map((slot) => (
            <div
              key={slot.id}
              className="bg-white rounded-xl border border-[#e5e0d5] p-5 space-y-4 shadow-2xs flex flex-col justify-between"
            >
              <div className="space-y-3">
                {/* Photo Placeholder Frame */}
                <div className="aspect-square max-w-[140px] mx-auto rounded-lg bg-[#f4f1ea] border border-[#d2cabb] flex flex-col items-center justify-center text-center p-3">
                  <UserCheck className="w-10 h-10 text-[#164e37] mb-1" />
                  <span className="text-[10px] text-slate-500">
                    Photo placeholder
                  </span>
                </div>

                <div className="text-center space-y-1">
                  <div className="inline-block mb-1">
                    <PlaceholderBadge label="Profile Slot" size="sm" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900">
                    {slot.profileStatus}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {slot.departmentNotice}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-[#e5e0d5] text-[11px] text-slate-400 text-center">
                <span>Sharafiyya Korangath • Faculty Slot #{slot.slotNumber}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Institutional Note */}
        <div className="bg-white p-6 rounded-xl border border-[#e5e0d5] text-xs text-slate-600 text-center space-y-2">
          <p className="font-semibold text-slate-800">
            For academic enquiries or appointment with muallims, please visit the administrative office during working hours.
          </p>
          <p className="text-slate-500">
            Visiting Hours: {SCHOOL_INFO.contact.officeHours} • Korangath, Tirur, Malappuram
          </p>
        </div>
      </div>
    </div>
  );
};
