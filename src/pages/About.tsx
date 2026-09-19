import React from 'react';
import { Link } from 'react-router-dom';
import { SCHOOL_INFO } from '../data/schoolInfo';
import { PlaceholderBadge } from '../components/PlaceholderBadge';

interface AboutProps {
  onOpenAdmissionModal: () => void;
}

export const About: React.FC<AboutProps> = ({ onOpenAdmissionModal }) => {
  return (
    <div className="w-full flex flex-col bg-[#fbfaf7]">
      {/* Page Breadcrumb & Header */}
      <section className="bg-white border-b border-[#e5e0d5] py-8 sm:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
            <Link to="/" className="hover:text-[#164e37]">Home</Link>
            <span>/</span>
            <span className="text-[#164e37] font-semibold">About Us</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-[#0f231c]">
            About Sharaful Islam Madrassa
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
            Information about our institution, educational philosophy, and community service in Korangath, Tirur, Malappuram.
          </p>
        </div>
      </section>

      {/* Main Content: 6 Dedicated Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-10">
        {/* 1. Our Institution */}
        <section className="bg-white p-6 sm:p-8 rounded-xl border border-[#e5e0d5] shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-[#164e37] uppercase tracking-wider">
              Section 1
            </span>
            <PlaceholderBadge label="Editable Content" size="sm" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#0f231c]">
            Our Institution
          </h2>
          <div className="text-xs sm:text-sm text-slate-700 leading-relaxed space-y-2">
            <p>
              <strong>{SCHOOL_INFO.officialName}</strong> is an Islamic educational institution located in the residential community of Korangath, Tirur, Malappuram District, Kerala. Locally known as <strong>{SCHOOL_INFO.localName}</strong> (ഷറഫിയ്യ കോരങ്ങത്ത്), the madrassa serves children and families by providing structured religious instruction in a warm, welcoming, and disciplined environment.
            </p>
            <p>
              The institution operates with morning and evening sessions, allowing students to pursue both religious foundation and formal general schooling simultaneously. All programs are administered under the recognized Islamic Education Board curriculum standards.
            </p>
          </div>
          <div className="pt-2 text-xs text-slate-500 flex flex-wrap gap-4 border-t border-[#e5e0d5]">
            <span><strong>Location:</strong> {SCHOOL_INFO.location.area}, Tirur, Malappuram</span>
            <span><strong>Curricular Board:</strong> {SCHOOL_INFO.institutionalDetails.affiliationBoard}</span>
          </div>
        </section>

        {/* 2. Our Educational Approach */}
        <section className="bg-white p-6 sm:p-8 rounded-xl border border-[#e5e0d5] shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-[#164e37] uppercase tracking-wider">
              Section 2
            </span>
            <PlaceholderBadge label="Editable Content" size="sm" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#0f231c]">
            Our Educational Approach
          </h2>
          <div className="text-xs sm:text-sm text-slate-700 leading-relaxed space-y-2">
            <p>
              Our educational approach focuses on gentle pedagogy (Rifq) and gradual progression. In the foundational years, primary emphasis is placed on Noorani Qaida phonetics, correct pronunciation of Arabic letters (Makharij), and habitual recitation of daily Duas and Azkar.
            </p>
            <p>
              As students advance, instruction deepens into structured Tajweed rules, memorization of key Surahs, essential Islamic rulings (Fiqh of purification, prayers, and fasting), and the study of Prophetic character (Seerah). We believe in continuous reinforcement, constructive teacher-student interaction, and frequent progress dialogue with parents.
            </p>
          </div>
        </section>

        {/* 3. Islamic and Academic Learning */}
        <section className="bg-white p-6 sm:p-8 rounded-xl border border-[#e5e0d5] shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-[#164e37] uppercase tracking-wider">
              Section 3
            </span>
            <PlaceholderBadge label="Editable Content" size="sm" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#0f231c]">
            Islamic and Academic Learning
          </h2>
          <div className="text-xs sm:text-sm text-slate-700 leading-relaxed space-y-2">
            <p>
              At Sharaful Islam Madrassa, religious education is designed to harmonize with regular academic schooling. We recognize that students attend general daytime schools, and therefore our class timings are organized before general school hours (6:45 AM to 8:30 AM) and in supplementary evening batches.
            </p>
            <p>
              This balance ensures students excel in their regular academic examinations while remaining firmly grounded in Islamic knowledge, ethical boundaries, and spiritual discipline.
            </p>
          </div>
        </section>

        {/* 4. Our Values */}
        <section className="bg-white p-6 sm:p-8 rounded-xl border border-[#e5e0d5] shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-[#164e37] uppercase tracking-wider">
              Section 4
            </span>
            <PlaceholderBadge label="Editable Content" size="sm" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#0f231c]">
            Our Values
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="p-4 rounded-lg bg-[#fbfaf7] border border-[#e5e0d5] space-y-1">
              <strong className="block text-slate-900 text-sm">Sincerity (Ikhlas)</strong>
              <p className="text-slate-600 leading-relaxed">
                Seeking sacred knowledge with purity of intention to please Allah and benefit family and community.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-[#fbfaf7] border border-[#e5e0d5] space-y-1">
              <strong className="block text-slate-900 text-sm">Character (Akhlaq)</strong>
              <p className="text-slate-600 leading-relaxed">
                Demonstrating honesty, humility, respectful speech, and kindness to parents and elders.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-[#fbfaf7] border border-[#e5e0d5] space-y-1">
              <strong className="block text-slate-900 text-sm">Patience (Sabr)</strong>
              <p className="text-slate-600 leading-relaxed">
                Developing consistency, diligence in daily attendance, and persevering in Quranic memorization.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-[#fbfaf7] border border-[#e5e0d5] space-y-1">
              <strong className="block text-slate-900 text-sm">Responsibility (Amanah)</strong>
              <p className="text-slate-600 leading-relaxed">
                Upholding civic duty, neighborhood harmony, and care for community property and environment.
              </p>
            </div>
          </div>
        </section>

        {/* 5 & 6. Our Vision and Our Mission */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Our Vision */}
          <div className="bg-white p-6 sm:p-8 rounded-xl border border-[#e5e0d5] shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-[#8c6512] uppercase tracking-wider">
                Section 5
              </span>
              <PlaceholderBadge label="Editable Content" size="sm" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">
              Our Vision
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {SCHOOL_INFO.vision}
            </p>
          </div>

          {/* Our Mission */}
          <div className="bg-white p-6 sm:p-8 rounded-xl border border-[#e5e0d5] shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-[#164e37] uppercase tracking-wider">
                Section 6
              </span>
              <PlaceholderBadge label="Editable Content" size="sm" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">
              Our Mission
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {SCHOOL_INFO.mission}
            </p>
          </div>
        </section>

        {/* Action Link */}
        <div className="text-center pt-2 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={onOpenAdmissionModal}
            className="px-5 py-2.5 bg-[#164e37] hover:bg-[#0f3b29] text-white text-xs font-bold rounded-lg transition-colors shadow-xs"
          >
            Submit Admission Enquiry
          </button>
          <Link
            to="/departments"
            className="px-5 py-2.5 bg-white border border-[#d2cabb] text-slate-800 text-xs font-semibold rounded-lg hover:bg-slate-50 transition-colors"
          >
            Explore Department Streams
          </Link>
        </div>
      </div>
    </div>
  );
};
