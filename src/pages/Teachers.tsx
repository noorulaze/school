import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldAlert,
  Award,
  BookOpen,
  Calendar,
  UserCheck
} from 'lucide-react';
import { TEACHERS, FACULTY_EDITORIAL_NOTICE } from '../data/teachers';
import { SCHOOL_INFO } from '../data/schoolInfo';
import { PlaceholderBadge } from '../components/PlaceholderBadge';

export const Teachers: React.FC = () => {
  return (
    <div className="w-full flex flex-col bg-[#fbfaf7] text-slate-800">
      {/* 1. Page Header */}
      <section className="bg-white border-b border-[#e5e0d5] py-6 sm:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
            <Link to="/" className="hover:text-[#164e37]">Home</Link>
            <span>/</span>
            <span className="text-[#164e37] font-semibold">Faculty & Muallims</span>
          </div>

          <div className="max-w-3xl">
            <h1 className="text-2xl sm:text-4xl font-extrabold text-[#0f231c] tracking-tight">
              Teachers & Faculty Directory
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1.5 sm:mt-2 leading-relaxed">
              Official faculty roster and teaching departments at {SCHOOL_INFO.officialName} ({SCHOOL_INFO.localName}), Korangath, Tirur.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Institutional Compliance & Non-Fabrication Notice */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 pt-5 sm:pt-8">
        <div className="p-3.5 sm:p-4 bg-amber-50/80 border border-amber-200 rounded-xl flex items-start gap-3 text-xs text-amber-950">
          <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <strong className="block text-amber-950 font-bold">
              Official Directory Status:
            </strong>
            <p className="text-slate-700 leading-relaxed text-xs">
              {FACULTY_EDITORIAL_NOTICE} To maintain strict veracity, individual staff names and personal qualifications are not fabricated. Each position below represents an active faculty role at our campus.
            </p>
          </div>
        </div>
      </div>

      {/* 3. Modern Faculty Directory Layout */}
      <section className="py-6 sm:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 items-stretch">
            {TEACHERS.map((slot) => (
              <div
                key={slot.id}
                className="bg-white rounded-xl sm:rounded-2xl border border-[#e5e0d5] p-4 sm:p-6 shadow-2xs hover:border-[#164e37] transition-all flex flex-col justify-between h-full space-y-4"
              >
                <div className="space-y-3.5 sm:space-y-4">
                  {/* Portrait Placeholder with Dignified Silhouette */}
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="w-13 h-13 sm:w-16 sm:h-16 rounded-xl bg-[#f4f1ea] border border-[#d2cabb] flex flex-col items-center justify-center shrink-0 text-[#164e37]">
                      <UserCheck className="w-6 h-6 sm:w-8 sm:h-8 text-[#164e37]" />
                    </div>

                    <div className="min-w-0">
                      <span className="text-[10px] font-bold text-[#164e37] bg-[#f4f1ea] px-2 py-0.5 rounded border border-[#d2cabb] inline-block">
                        Faculty Slot #{slot.slotNumber}
                      </span>
                      <h3 className="text-sm sm:text-base font-bold text-slate-900 mt-1 leading-snug truncate">
                        {slot.profileStatus}
                      </h3>
                      <p className="text-[11px] sm:text-xs text-slate-500 font-medium truncate">
                        Teaching Staff • Sharafiyya Korangath
                      </p>
                    </div>
                  </div>

                  {/* Role Description & Scope */}
                  <div className="p-3 sm:p-3.5 bg-[#fbfaf7] rounded-xl border border-[#e5e0d5] text-xs space-y-1.5">
                    <p className="text-slate-600 text-xs leading-relaxed">
                      {slot.departmentNotice}
                    </p>
                  </div>
                </div>

                {/* Card Footer with Status Tag */}
                <div className="pt-3 border-t border-[#e5e0d5] flex items-center justify-between text-xs">
                  <span className="text-[11px] text-slate-400 font-mono">
                    Slot ID: {slot.id}
                  </span>
                  <PlaceholderBadge label="Official Post" size="sm" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Faculty Standards & Pedagogical Governance */}
      <section className="py-8 sm:py-12 bg-white border-t border-[#e5e0d5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          <div className="max-w-3xl mb-6 sm:mb-8">
            <span className="text-xs font-bold text-[#164e37] uppercase tracking-wider block mb-1">
              Teaching Governance
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-[#0f231c]">
              Muallim Selection & Professional Standards
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Our faculty members are selected based on accredited Islamic scholarship and child-friendly pedagogical skills.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4 text-xs items-stretch">
            <div className="p-4 sm:p-5 rounded-xl bg-[#fbfaf7] border border-[#e5e0d5] flex flex-col justify-between h-full space-y-2">
              <div>
                <Award className="w-5 h-5 text-[#164e37] mb-2" />
                <h4 className="text-sm font-bold text-slate-900">Recognized Certification</h4>
                <p className="text-slate-600 leading-relaxed mt-1">
                  Faculty holds formal credentials from recognized Islamic education boards in Kerala with verified Sanad.
                </p>
              </div>
            </div>

            <div className="p-4 sm:p-5 rounded-xl bg-[#fbfaf7] border border-[#e5e0d5] flex flex-col justify-between h-full space-y-2">
              <div>
                <BookOpen className="w-5 h-5 text-[#164e37] mb-2" />
                <h4 className="text-sm font-bold text-slate-900">Tajweed Proficiency</h4>
                <p className="text-slate-600 leading-relaxed mt-1">
                  Thorough grounding in Qira’at rules to train children in correct, melodious Quranic articulation.
                </p>
              </div>
            </div>

            <div className="p-4 sm:p-5 rounded-xl bg-[#fbfaf7] border border-[#e5e0d5] flex flex-col justify-between h-full space-y-2">
              <div>
                <Calendar className="w-5 h-5 text-[#164e37] mb-2" />
                <h4 className="text-sm font-bold text-slate-900">Parental Consultations</h4>
                <p className="text-slate-600 leading-relaxed mt-1">
                  Muallims are accessible to parents for quarterly feedback during designated consultation hours.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
