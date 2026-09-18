import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ShieldCheck, Sparkles, School } from 'lucide-react';
import { SCHOOL_INFO } from '../data/schoolInfo';
import { IslamicPattern } from '../components/IslamicPattern';
import { SectionHeading } from '../components/SectionHeading';
import { PlaceholderBadge } from '../components/PlaceholderBadge';

interface AboutProps {
  onOpenAdmissionModal: () => void;
}

export const About: React.FC<AboutProps> = ({ onOpenAdmissionModal }) => {
  return (
    <div className="w-full flex flex-col">
      {/* Page Header Banner */}
      <section className="relative bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-900 text-white py-16 sm:py-20 px-4 sm:px-6 overflow-hidden">
        <IslamicPattern variant="rosette" className="-top-12 -right-12 text-amber-400" opacity={0.08} />
        <div className="absolute inset-0 bg-islamic-pattern opacity-10 pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-800/80 border border-amber-400/40 text-amber-300 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Institutional Identity & Ethos</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            About Our Institution
          </h1>

          <p className="text-emerald-300 font-medium text-base sm:text-xl max-w-2xl mx-auto">
            {SCHOOL_INFO.officialName} • <span className="text-amber-400">{SCHOOL_INFO.localName}</span>
          </p>

          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
            Located in Korangath, Tirur, Malappuram, Kerala — dedicated to noble values, sound religious education, and nurturing upright Muslim generations.
          </p>
        </div>
      </section>

      {/* Main Narrative & History */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-16">
          {/* Institutional Overview */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
            <div className="md:col-span-7 space-y-5">
              <SectionHeading
                badge="Historical Roots"
                title="A Center of Learning at"
                highlightedText="Korangath"
                subtitle="Serving the spiritual and pedagogical aspirations of the community in Tirur."
                alignment="left"
              />

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                <strong>{SCHOOL_INFO.officialName}</strong>, widely known and cherished in the locality as <strong>{SCHOOL_INFO.localName}</strong>, is situated in the historic and educational hub of Korangath, Tirur, Malappuram District, Kerala.
              </p>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Established to provide structured, principled, and accessible Islamic religious instruction for children and young adults, the madrassa emphasizes harmonious character development, Tajweed Quranic literacy, and ethical civic living.
              </p>

              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200/80 flex items-start gap-3">
                <School className="w-5 h-5 text-emerald-800 shrink-0 mt-0.5" />
                <div className="text-xs text-emerald-950">
                  <p className="font-bold">Affiliation & Board Guidance</p>
                  <p className="text-slate-600 mt-0.5">
                    Operating under recognized Kerala Islamic educational curriculum standards ({SCHOOL_INFO.institutionalDetails.affiliationBoard}), ensuring consistent textbooks, standardized examinations, and certified pedagogical guidance.
                  </p>
                </div>
              </div>
            </div>

            <div className="md:col-span-5 bg-gradient-to-br from-emerald-900 to-slate-900 text-white rounded-3xl p-8 border border-amber-400/30 shadow-xl relative overflow-hidden">
              <IslamicPattern variant="grid" opacity={0.08} />
              <div className="relative z-10 space-y-6">
                <div className="w-12 h-12 rounded-xl bg-emerald-800 flex items-center justify-center text-amber-300 border border-amber-400/40">
                  <BookOpen className="w-6 h-6" />
                </div>

                <h3 className="text-xl font-bold text-white">
                  Institutional Profile
                </h3>

                <ul className="space-y-3 text-xs text-slate-200">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold">•</span>
                    <span><strong>Official Name:</strong> {SCHOOL_INFO.officialName}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold">•</span>
                    <span><strong>Local Affiliation:</strong> {SCHOOL_INFO.localName}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold">•</span>
                    <span><strong>Locality:</strong> Korangath, Tirur Taluk</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold">•</span>
                    <span><strong>District & State:</strong> Malappuram, Kerala, India</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold">•</span>
                    <span><strong>Curriculum Focus:</strong> Quran, Tajweed, Fiqh, Arabic, Akhlaq</span>
                  </li>
                </ul>

                <div className="pt-2 border-t border-white/10 flex justify-between items-center text-[11px] text-slate-400">
                  <span>Record Status:</span>
                  <PlaceholderBadge label="Administrative Summary" size="sm" />
                </div>
              </div>
            </div>
          </div>

          {/* Mission & Vision Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
            <div className="bg-[#FDFBF7] p-8 rounded-3xl border border-slate-200 space-y-4 hover:border-emerald-600 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Our Sacred Mission</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {SCHOOL_INFO.mission}
              </p>
            </div>

            <div className="bg-[#FDFBF7] p-8 rounded-3xl border border-slate-200 space-y-4 hover:border-amber-500 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Our Future Vision</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {SCHOOL_INFO.vision}
              </p>
            </div>
          </div>

          {/* Core Values */}
          <div className="space-y-8 pt-6">
            <SectionHeading
              badge="Guiding Principles"
              title="Four Foundational Pillars of"
              highlightedText="Student Growth"
              subtitle="Every lesson, prayer assembly, and moral class is anchored in these values."
              alignment="center"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-800 text-white flex items-center justify-center text-xs font-bold mb-2">
                  1
                </div>
                <h4 className="text-base font-bold text-slate-900">Ikhlas (Sincerity)</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Seeking knowledge for spiritual elevation and closeness to Allah with purity of intention.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-800 text-white flex items-center justify-center text-xs font-bold mb-2">
                  2
                </div>
                <h4 className="text-base font-bold text-slate-900">Itqan (Excellence)</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Striving for perfection in Quranic articulation (Tajweed) and academic diligence.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-800 text-white flex items-center justify-center text-xs font-bold mb-2">
                  3
                </div>
                <h4 className="text-base font-bold text-slate-900">Akhlaq (Noble Manners)</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Exemplifying courteous speech, humility, filial respect, and kindness to all creatures.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-800 text-white flex items-center justify-center text-xs font-bold mb-2">
                  4
                </div>
                <h4 className="text-base font-bold text-slate-900">Khidmah (Service)</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Contributing positively to neighborhood welfare and social harmony across Korangath & Tirur.
                </p>
              </div>
            </div>
          </div>

          {/* School Governance / Committee Placeholder */}
          <div className="p-8 rounded-3xl bg-slate-900 text-white space-y-6 border border-emerald-800/40 relative overflow-hidden">
            <IslamicPattern variant="grid" opacity={0.06} />
            <div className="relative z-10">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white">
                    Madrasa Management & Advisory Committee
                  </h3>
                  <p className="text-xs text-slate-300">
                    Governing body overseeing administrative, infrastructural, and student welfare decisions.
                  </p>
                </div>
                <PlaceholderBadge label="Official Roster Pending" size="sm" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 bg-white/5 rounded-xl border border-white/10 text-xs">
                  <p className="text-amber-400 font-semibold mb-1">President / Leadership</p>
                  <p className="text-slate-300 font-mono">[Committee President Name - Pending Update]</p>
                  <p className="text-[10px] text-slate-400 mt-1">Management Committee</p>
                </div>

                <div className="p-4 bg-white/5 rounded-xl border border-white/10 text-xs">
                  <p className="text-amber-400 font-semibold mb-1">General Secretary</p>
                  <p className="text-slate-300 font-mono">[General Secretary Name - Pending Update]</p>
                  <p className="text-[10px] text-slate-400 mt-1">Administrative Operations</p>
                </div>

                <div className="p-4 bg-white/5 rounded-xl border border-white/10 text-xs">
                  <p className="text-amber-400 font-semibold mb-1">Treasurer & Welfare</p>
                  <p className="text-slate-300 font-mono">[Treasurer Name - Pending Update]</p>
                  <p className="text-[10px] text-slate-400 mt-1">Finance & Development</p>
                </div>
              </div>

              <p className="text-[11px] text-slate-400 pt-3 italic">
                * Committee appointments and audited reports are maintained by the local Mahal / Madrassa management in Korangath.
              </p>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="text-center pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onOpenAdmissionModal}
              className="px-6 py-3 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-sm rounded-xl transition-all shadow-md"
            >
              Enquire for Student Admission
            </button>
            <Link
              to="/departments"
              className="px-6 py-3 border border-slate-300 hover:border-emerald-800 text-slate-700 hover:text-emerald-900 font-semibold text-sm rounded-xl transition-colors"
            >
              Explore Educational Departments
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
