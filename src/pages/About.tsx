import React from 'react';
import { Link } from 'react-router-dom';
import {
  School,
  Heart,
  BookOpen,
  Award,
  Users,
  GraduationCap
} from 'lucide-react';
import { SCHOOL_INFO } from '../data/schoolInfo';
import { PlaceholderBadge } from '../components/PlaceholderBadge';
import { RealisticImageSlot } from '../components/RealisticImageSlot';

interface AboutProps {
  onOpenAdmissionModal: () => void;
}

export const About: React.FC<AboutProps> = ({ onOpenAdmissionModal }) => {
  return (
    <div className="w-full flex flex-col bg-[#fbfaf7] text-slate-800">
      {/* 1. Page Header */}
      <section className="bg-white border-b border-[#e5e0d5] py-6 sm:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
            <Link to="/" className="hover:text-[#164e37]">Home</Link>
            <span>/</span>
            <span className="text-[#164e37] font-semibold">About Institution</span>
          </div>

          <div className="max-w-3xl">
            <h1 className="text-2xl sm:text-4xl font-extrabold text-[#0f231c] tracking-tight">
              About Sharafiyya English Medium School
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
              Serving the community of Korangath, Tirur, Malappuram, with dedicated Islamic educational programs, Quranic recitation with Tajweed, and enduring moral guidance.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Institutional Overview (Editorial Split Showcase) */}
      <section className="py-8 sm:py-12 lg:py-16 border-b border-[#e5e0d5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f4f1ea] border border-[#d2cabb] text-xs font-semibold text-[#164e37]">
                <School className="w-3.5 h-3.5 text-[#c59b27]" />
                <span>Section 1 • Our Institution</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0f231c] tracking-tight">
                Roots in Korangath, Tirur
              </h2>

              <div className="text-xs sm:text-sm text-slate-700 leading-relaxed space-y-3">
                <p>
                  <strong>{SCHOOL_INFO.officialName}</strong> is a premier Islamic English Medium educational institution situated in Korangath, within Tirur, Malappuram District, Kerala. Locally cherished and widely known as <strong>{SCHOOL_INFO.localName}</strong> (ഷറഫിയ്യ കോരങ്ങത്ത്), the school has been a pillar of authentic moral instruction and academic excellence for the neighborhood.
                </p>
                <p>
                  Our goal is to instill strong spiritual foundations, deep love for the Holy Qur’an and the Prophet ﷺ, and upright social conduct in every child. We coordinate morning and evening batches so children can pursue both their spiritual learning and standard academic schooling seamlessly.
                </p>
              </div>

              <div className="pt-2 grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 text-xs">
                <div className="p-3 rounded-lg bg-white border border-[#e5e0d5]">
                  <span className="block font-bold text-slate-900">Locality</span>
                  <span className="text-slate-500">Korangath, Tirur, Kerala</span>
                </div>
                <div className="p-3 rounded-lg bg-white border border-[#e5e0d5]">
                  <span className="block font-bold text-slate-900">Curricular Board</span>
                  <span className="text-slate-500 break-words">{SCHOOL_INFO.institutionalDetails.affiliationBoard}</span>
                </div>
                <div className="p-3 rounded-lg bg-white border border-[#e5e0d5]">
                  <span className="block font-bold text-slate-900">Session Batches</span>
                  <span className="text-slate-500">Morning & Evening</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <RealisticImageSlot
                scene="campus"
                aspectRatio="4/3"
                label="School Campus Grounds"
                caption="Main academic building at Korangath, Tirur"
                className="shadow-sm"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Educational Approach & Dual Learning Matrix */}
      <section className="py-8 sm:py-12 lg:py-16 bg-white border-b border-[#e5e0d5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch">
            {/* Section 2: Educational Approach */}
            <div className="p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl bg-[#fbfaf7] border border-[#e5e0d5] flex flex-col justify-between h-full space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#164e37] uppercase tracking-wider">
                    Section 2
                  </span>
                  <PlaceholderBadge label="Pedagogical Method" size="sm" />
                </div>

                <h3 className="text-xl font-bold text-[#0f231c]">
                  Our Educational Approach
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  We believe that religious learning should be compassionate, engaging, and disciplined. Our muallims follow structured daily routines emphasizing individual recitation guidance, memorization review (Dhor), and practical application of daily Adab.
                </p>
              </div>

              <ul className="space-y-2.5 text-xs text-slate-700 pt-2 border-t border-[#eee9df]">
                <li className="flex items-start gap-2">
                  <BookOpen className="w-4 h-4 text-[#164e37] shrink-0 mt-0.5" />
                  <span>Individualized recitation listening to ensure accurate pronunciation (Makharij).</span>
                </li>
                <li className="flex items-start gap-2">
                  <Heart className="w-4 h-4 text-[#164e37] shrink-0 mt-0.5" />
                  <span>Positive reinforcement and encouragement rather than rigid pressure.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Users className="w-4 h-4 text-[#164e37] shrink-0 mt-0.5" />
                  <span>Regular parent-teacher coordination through student diaries and assemblies.</span>
                </li>
              </ul>
            </div>

            {/* Section 3: Islamic and Academic Learning */}
            <div className="p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl bg-[#fbfaf7] border border-[#e5e0d5] flex flex-col justify-between h-full space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#164e37] uppercase tracking-wider">
                    Section 3
                  </span>
                  <PlaceholderBadge label="Curricular Integration" size="sm" />
                </div>

                <h3 className="text-xl font-bold text-[#0f231c]">
                  Islamic and Academic Learning
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Rather than treating religious education as an extra burden, we structure our schedules to nurture clarity of thought, concentration, and good manners that directly enhance a student's regular daytime schooling.
                </p>
              </div>

              <ul className="space-y-2.5 text-xs text-slate-700 pt-2 border-t border-[#eee9df]">
                <li className="flex items-start gap-2">
                  <Award className="w-4 h-4 text-[#c59b27] shrink-0 mt-0.5" />
                  <span>Early morning sessions (06:45 AM) instill disciplined habits and alert minds.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Award className="w-4 h-4 text-[#c59b27] shrink-0 mt-0.5" />
                  <span>Arabic language fundamentals expand linguistic and cognitive capabilities.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Award className="w-4 h-4 text-[#c59b27] shrink-0 mt-0.5" />
                  <span>Emphasis on truthfulness, cleanliness, and punctuality reflects in everyday school life.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Section 4: Our Values (The 4 Pillars) */}
      <section className="py-8 sm:py-12 lg:py-16 border-b border-[#e5e0d5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
            <span className="text-xs font-bold text-[#164e37] uppercase tracking-wider block">
              Section 4 • Core Principles
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0f231c] mt-1">
              Our Foundational Values
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              The fundamental character traits instilled across all classes at Sharafiyya Korangath.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch">
            {[
              {
                arabic: 'الصدق',
                title: 'Sidq (Truthfulness)',
                desc: 'Honesty in word and deed, establishing integrity from early childhood.',
              },
              {
                arabic: 'الإخلاص',
                title: 'Ikhlas (Sincerity)',
                desc: 'Performing study, worship, and service purely for the pleasure of Allah.',
              },
              {
                arabic: 'الأدب',
                title: 'Adab (Etiquette)',
                desc: 'Respect toward teachers, parents, elders, and peers with refined manners.',
              },
              {
                arabic: 'الخدمة',
                title: 'Khidmah (Service)',
                desc: 'Active benevolence and helping society, neighbors, and community.',
              },
            ].map((val, idx) => (
              <div
                key={idx}
                className="p-4 sm:p-5 rounded-xl bg-white border border-[#e5e0d5] hover:border-[#164e37] transition-all flex flex-col justify-between h-full space-y-3"
              >
                <div>
                  <span className="font-amiri text-lg text-[#c59b27] block" dir="rtl">
                    {val.arabic}
                  </span>
                  <h4 className="text-sm font-bold text-slate-900 mt-1">{val.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed mt-1.5">{val.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Sections 5 & 6: Vision & Mission (High-Contrast Editorial Blocks) */}
      <section className="py-8 sm:py-12 lg:py-16 bg-[#164e37] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch">
            {/* Vision */}
            <div className="p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl bg-[#0f3827] border border-[#276e4e] flex flex-col justify-between h-full space-y-3">
              <div>
                <span className="text-[11px] font-bold text-[#c59b27] uppercase tracking-wider block">
                  Section 5 • Institutional Direction
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
                  Our Vision
                </h3>
                <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed mt-2">
                  To be a trusted center of Islamic learning in Korangath, Tirur, that nurtures knowledgeable, confident, and compassionate young Muslims capable of excelling in their faith and serving modern society with integrity.
                </p>
              </div>
            </div>

            {/* Mission */}
            <div className="p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl bg-[#0f3827] border border-[#276e4e] flex flex-col justify-between h-full space-y-3">
              <div>
                <span className="text-[11px] font-bold text-[#c59b27] uppercase tracking-wider block">
                  Section 6 • Our Ongoing Commitment
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
                  Our Mission
                </h3>
                <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed mt-2">
                  To deliver authentic Islamic education under recognized board standards, providing grounded instruction in Quran recitation, Arabic literacy, Fiqh rulings, and moral character in a welcoming and supportive learning atmosphere.
                </p>
              </div>
            </div>
          </div>

          {/* Admission Action Banner */}
          <div className="mt-8 sm:mt-10 p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-white/10 backdrop-blur-xs border border-white/15 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <div>
              <h4 className="text-base font-bold text-white">
                Interested in Enrolling Your Child?
              </h4>
              <p className="text-xs text-emerald-100 mt-0.5">
                Admissions for the upcoming academic session are handled through our administrative desk in Korangath.
              </p>
            </div>
            <button
              onClick={onOpenAdmissionModal}
              className="w-full sm:w-auto px-5 py-3 min-h-[44px] bg-[#c59b27] hover:bg-[#b48318] text-slate-950 text-xs font-bold rounded-xl transition-colors shrink-0 flex items-center justify-center gap-2"
            >
              <GraduationCap className="w-4 h-4" />
              <span>Admission Enquiry</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
