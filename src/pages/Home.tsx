import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  Users,
  Compass,
  ArrowRight,
  Sparkles,
  Calendar,
  Clock,
  MapPin,
  GraduationCap,
  HeartHandshake,
  CheckCircle2,
  FileText,
  School,
  Send,
  Eye
} from 'lucide-react';
import { SCHOOL_INFO } from '../data/schoolInfo';
import { DEPARTMENTS } from '../data/departments';
import { TEACHERS, FACULTY_EDITORIAL_NOTICE } from '../data/teachers';
import { EVENTS, EVENTS_EDITORIAL_NOTICE } from '../data/events';
import { GALLERY_ITEMS } from '../data/gallery';
import { IslamicPattern } from '../components/IslamicPattern';
import { SectionHeading } from '../components/SectionHeading';
import { PlaceholderBadge } from '../components/PlaceholderBadge';

interface HomeProps {
  onOpenAdmissionModal: () => void;
}

export const Home: React.FC<HomeProps> = ({ onOpenAdmissionModal }) => {
  const [quickContactSent, setQuickContactSent] = useState(false);
  const [quickMessage, setQuickMessage] = useState({ name: '', phone: '', message: '' });

  const handleQuickContact = (e: React.FormEvent) => {
    e.preventDefault();
    setQuickContactSent(true);
  };

  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[85vh] lg:min-h-[88vh] bg-gradient-to-br from-emerald-950 via-slate-950 to-emerald-900 text-white flex items-center justify-center py-20 px-4 sm:px-6 relative overflow-hidden">
        {/* Subtle Islamic Geometric Accents */}
        <IslamicPattern variant="rosette" className="-top-24 -left-24 text-emerald-400" opacity={0.08} />
        <IslamicPattern variant="rosette" className="-bottom-24 -right-24 text-amber-400" opacity={0.08} />
        <div className="absolute inset-0 bg-islamic-pattern opacity-10 pointer-events-none" />

        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-6 sm:space-y-8">
          {/* Arabic Calligraphy & Subtitle */}
          <div className="inline-flex flex-col items-center space-y-2">
            <span className="font-amiri text-2xl sm:text-3xl md:text-4xl text-amber-300 tracking-widest drop-shadow-sm" dir="rtl">
              {SCHOOL_INFO.arabicCalligraphySubtitle}
            </span>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-900/80 border border-amber-400/40 text-amber-300 text-xs font-semibold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Official Institutional Portal</span>
            </div>
          </div>

          {/* School Name & Location */}
          <div className="space-y-3">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight sm:leading-none">
              {SCHOOL_INFO.officialName}
            </h1>
            <p className="text-xl sm:text-2xl md:text-3xl font-medium text-emerald-300">
              Affiliated as <span className="text-amber-400 font-semibold">{SCHOOL_INFO.localName}</span>
            </p>
            <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-slate-300">
              <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{SCHOOL_INFO.location.area}, {SCHOOL_INFO.location.city}, {SCHOOL_INFO.location.district}, {SCHOOL_INFO.location.state}</span>
            </div>
          </div>

          {/* Short Introduction */}
          <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-slate-200/90 leading-relaxed font-light">
            An established center for Islamic enlightenment and moral discipline in Tirur. Imparting classical Quranic recitation, authentic Islamic jurisprudence, Arabic language mastery, and refined Prophetic character.
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-2">
            <Link
              to="/about"
              className="w-full sm:w-auto px-7 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold text-sm sm:text-base rounded-xl transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] flex items-center justify-center gap-2"
            >
              <Compass className="w-4 h-4" />
              <span>Explore Our School</span>
            </Link>

            <button
              onClick={onOpenAdmissionModal}
              className="w-full sm:w-auto px-7 py-3.5 bg-emerald-800/90 hover:bg-emerald-800 text-white font-semibold text-sm sm:text-base rounded-xl border border-emerald-600/60 hover:border-amber-400 transition-all shadow-md hover:shadow-lg hover:scale-[1.02] flex items-center justify-center gap-2"
            >
              <GraduationCap className="w-4 h-4 text-amber-400" />
              <span>Admission Enquiry</span>
            </button>
          </div>

          {/* Institutional Trust Indicators */}
          <div className="pt-8 border-t border-emerald-800/40 grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
            <div className="p-3 bg-white/5 rounded-xl border border-white/10 backdrop-blur-xs">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold mb-1">
                <School className="w-4 h-4" />
                <span>Affiliation</span>
              </div>
              <p className="text-xs text-slate-300">Board Curriculum</p>
              <p className="text-[10px] text-amber-400/80 font-mono">[Board Placeholder]</p>
            </div>

            <div className="p-3 bg-white/5 rounded-xl border border-white/10 backdrop-blur-xs">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold mb-1">
                <BookOpen className="w-4 h-4" />
                <span>Instruction</span>
              </div>
              <p className="text-xs text-slate-300">Quran, Tajweed & Fiqh</p>
              <p className="text-[10px] text-slate-400">Junior to Senior</p>
            </div>

            <div className="p-3 bg-white/5 rounded-xl border border-white/10 backdrop-blur-xs">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold mb-1">
                <HeartHandshake className="w-4 h-4" />
                <span>Ethos</span>
              </div>
              <p className="text-xs text-slate-300">Tarbiyyah & Akhlaq</p>
              <p className="text-[10px] text-slate-400">Character Mentorship</p>
            </div>

            <div className="p-3 bg-white/5 rounded-xl border border-white/10 backdrop-blur-xs">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold mb-1">
                <MapPin className="w-4 h-4" />
                <span>Locality</span>
              </div>
              <p className="text-xs text-slate-300">Korangath, Tirur</p>
              <p className="text-[10px] text-slate-400">Malappuram, Kerala</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ABOUT PREVIEW SECTION */}
      <section className="py-16 sm:py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Visual Column */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md rounded-2xl overflow-hidden bg-gradient-to-br from-emerald-900 to-slate-900 p-8 text-white shadow-xl border border-amber-400/30">
                <IslamicPattern variant="grid" opacity={0.08} />
                
                <div className="relative z-10 space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/80 border border-emerald-600 text-xs text-amber-300 font-semibold">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Institutional Legacy</span>
                  </div>

                  <h3 className="text-2xl font-bold leading-snug">
                    Rooted in Values, Nurturing Generations at Korangath
                  </h3>

                  <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
                    {SCHOOL_INFO.officialName} ({SCHOOL_INFO.localName}) is committed to nurturing children through comprehensive Islamic religious education, building strong roots in religious practice and ethical community citizenship.
                  </p>

                  <div className="p-4 bg-white/10 rounded-xl border border-white/15 space-y-2">
                    <p className="text-xs font-semibold text-amber-300 uppercase tracking-wider">
                      Core Institutional Pledge
                    </p>
                    <p className="text-xs text-slate-200 italic">
                      "{SCHOOL_INFO.mission}"
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-300 pt-2 border-t border-white/10">
                    <span>Location: Tirur, Malappuram</span>
                    <PlaceholderBadge label="Official Record" size="sm" />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Text Column */}
            <div className="lg:col-span-7 space-y-6">
              <SectionHeading
                badge="About Our Madrassa"
                arabicAccent="مَنْ سَلَكَ طَرِيقًا يَلْتَمِسُ فِيهِ عِلْمًا سَهَّلَ اللهُ لَهُ بِهِ طَرِيقًا إِلَى الجَنَّةِ"
                title="A Sanctuaried Center of"
                highlightedText="Faith & Knowledge"
                subtitle="Nurturing disciplined minds and compassionate souls through authentic Islamic curricular education."
                alignment="left"
              />

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Situated in the culturally vibrant town of <strong>Tirur</strong> in Malappuram, <strong>{SCHOOL_INFO.officialName}</strong> (locally honored as <strong>{SCHOOL_INFO.localName}</strong>) serves the spiritual and ethical needs of young learners across Korangath and adjoining areas.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center mb-3">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 mb-1">Authentic Curriculum</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Structured syllabus covering Quran recitation, Tajweed, Fiqh, Hadith, and Islamic history.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                  <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center mb-3">
                    <HeartHandshake className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 mb-1">Tarbiyyah & Character</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Instilling compassion, filial respect, moral honesty, and civic responsibility into every pupil.
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 text-sm font-bold text-emerald-800 hover:text-emerald-950 transition-colors group"
                >
                  <span>Learn more about our history and administrative ethos</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-amber-500" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. EDUCATIONAL DEPARTMENTS PREVIEW */}
      <section className="py-16 sm:py-24 bg-[#F7F4EC] relative">
        <IslamicPattern variant="star" opacity={0.06} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <SectionHeading
            badge="Academic Disciplines"
            title="Educational Departments &"
            highlightedText="Curriculum Wings"
            subtitle="Explore our comprehensive streams designed to develop Quranic mastery, theological understanding, and linguistic fluency."
            alignment="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {DEPARTMENTS.slice(0, 3).map((dept) => (
              <div
                key={dept.id}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow border border-emerald-900/10 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                      {dept.category}
                    </span>
                    <PlaceholderBadge label="Editable Department" size="sm" />
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-1">
                    {dept.name}
                  </h3>
                  {dept.arabicName && (
                    <p className="font-amiri text-base text-emerald-700 mb-2" dir="rtl">
                      {dept.arabicName}
                    </p>
                  )}

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                    {dept.shortSummary}
                  </p>

                  <div className="space-y-1.5 mb-4">
                    <p className="text-xs font-semibold text-slate-800">Curriculum Highlights:</p>
                    {dept.syllabusOverview.slice(0, 2).map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-500">{dept.targetLevels}</span>
                  <Link
                    to="/departments"
                    className="text-xs font-semibold text-emerald-800 hover:text-amber-600 flex items-center gap-1"
                  >
                    <span>Details</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/departments"
              className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-800 hover:bg-emerald-900 text-white text-sm font-semibold rounded-xl shadow-sm transition-all hover:gap-3"
            >
              <span>View All 6 Educational Wings & Detailed Syllabi</span>
              <ArrowRight className="w-4 h-4 text-amber-400" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. TEACHERS PREVIEW SECTION */}
      <section className="py-16 sm:py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeading
            badge="Teaching Faculty"
            title="Honored Muallims &"
            highlightedText="Faculty Mentors"
            subtitle="Meet the pedagogical leadership and scholars guiding our students in knowledge and noble manners."
            alignment="center"
          />

          {/* Editorial Integrity Alert */}
          <div className="max-w-3xl mx-auto mb-8 p-3.5 bg-amber-50/80 rounded-xl border border-amber-200/80 flex items-start gap-3 text-xs text-amber-900">
            <PlaceholderBadge label="Administrative Notice" size="sm" className="shrink-0 mt-0.5" />
            <p>
              {FACULTY_EDITORIAL_NOTICE}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TEACHERS.slice(0, 3).map((teacher) => (
              <div
                key={teacher.id}
                className="bg-slate-50/80 rounded-2xl p-6 border border-slate-200/80 hover:border-emerald-700/30 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-emerald-900 text-amber-300 flex items-center justify-center mb-4 border border-amber-400/40 shadow-xs">
                    <Users className="w-7 h-7" />
                  </div>

                  <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wider">
                    {teacher.designation}
                  </span>

                  <h3 className="text-base font-bold text-slate-900 mt-1 mb-2">
                    {teacher.namePlaceholder}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {teacher.bioPlaceholder}
                  </p>

                  <div className="p-2.5 bg-white rounded-lg border border-slate-200/70 text-[11px] text-slate-600 space-y-1">
                    <p><strong>Department:</strong> {teacher.departmentRole}</p>
                    <p><strong>Credentials:</strong> {teacher.qualificationPlaceholder}</p>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-200/60 flex items-center justify-between text-xs">
                  <span className="text-slate-500">{teacher.schedulePlaceholder}</span>
                  <PlaceholderBadge label="Slot Editable" size="sm" />
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/teachers"
              className="inline-flex items-center gap-2 text-sm font-bold text-emerald-800 hover:text-emerald-950 transition-colors"
            >
              <span>View complete faculty roster & academic assignments</span>
              <ArrowRight className="w-4 h-4 text-amber-500" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. UPCOMING EVENTS PREVIEW */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-slate-900 to-emerald-950 text-white relative overflow-hidden">
        <IslamicPattern variant="grid" opacity={0.06} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <SectionHeading
            badge="Academic Calendar & Notices"
            title="Upcoming Events &"
            highlightedText="Annual Milestones"
            subtitle="Key academic dates, community programs, examinations, and admissions notices."
            alignment="center"
            theme="dark"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {EVENTS.slice(0, 3).map((event) => (
              <div
                key={event.id}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-amber-400/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-amber-400 px-2.5 py-0.5 rounded-full bg-amber-400/10 border border-amber-400/20">
                      {event.category}
                    </span>
                    <span className="text-[11px] text-slate-300 font-mono">
                      {event.statusBadge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2">
                    {event.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                    {event.summary}
                  </p>

                  <div className="space-y-1.5 text-xs text-emerald-200/90 mb-4 bg-emerald-950/40 p-3 rounded-xl border border-emerald-800/50">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-amber-400" />
                      <span>{event.datePlaceholder}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      <span>{event.timePlaceholder}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                  <span className="text-slate-400">{event.venuePlaceholder}</span>
                  <Link
                    to="/events"
                    className="text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1"
                  >
                    <span>Read Notice</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center text-xs text-slate-400">
            <span>{EVENTS_EDITORIAL_NOTICE}</span>
          </div>

          <div className="text-center mt-8">
            <Link
              to="/events"
              className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 text-sm font-bold rounded-xl transition-all shadow-md"
            >
              <span>View Full Calendar of Events</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 6. GALLERY PREVIEW */}
      <section className="py-16 sm:py-24 bg-[#FDFBF7] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeading
            badge="Visual Impressions"
            title="Campus & Learning"
            highlightedText="Atmosphere"
            subtitle="A glimpse into daily academic sessions, student assemblies, and campus facilities in Korangath."
            alignment="center"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {GALLERY_ITEMS.slice(0, 4).map((item) => (
              <div
                key={item.id}
                className="group relative rounded-2xl overflow-hidden bg-gradient-to-br from-slate-900 to-emerald-950 border border-emerald-900/20 aspect-4/3 flex flex-col justify-end p-5 shadow-sm hover:shadow-lg transition-all"
              >
                <div className="absolute inset-0 bg-islamic-pattern opacity-10 group-hover:opacity-20 transition-opacity" />
                
                <div className="absolute top-4 left-4">
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-800 text-amber-300 border border-amber-400/30">
                    {item.category}
                  </span>
                </div>

                <div className="absolute top-4 right-4">
                  <PlaceholderBadge label="Photo Slot" size="sm" />
                </div>

                <div className="relative z-10">
                  <p className="text-xs font-mono text-amber-400/90 mb-1">
                    {item.placeholderLabel}
                  </p>
                  <h4 className="text-sm font-bold text-white mb-1 leading-snug">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-slate-300 line-clamp-2">
                    {item.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/gallery"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-emerald-800 text-emerald-800 hover:bg-emerald-800 hover:text-white text-sm font-semibold rounded-xl transition-colors"
            >
              <Eye className="w-4 h-4" />
              <span>Browse All Campus Photographs & Event Galleries</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 7. STUDENT PORTAL CALL-TO-ACTION */}
      <section className="py-16 bg-gradient-to-r from-emerald-900 via-emerald-800 to-slate-900 text-white relative overflow-hidden">
        <IslamicPattern variant="rosette" className="top-0 right-0 text-amber-400" opacity={0.06} />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 sm:p-12 border border-amber-400/30 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold uppercase tracking-wider border border-amber-400/40">
                  <GraduationCap className="w-4 h-4" />
                  <span>Student & Parent Portal Foundation</span>
                </div>

                <h2 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight">
                  Modernizing Madrassa Management with Digital Ease
                </h2>

                <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-2xl font-light">
                  Our official website provides the foundation for digital school management — tracking student attendance, viewing period-wise daily timetables, accessing examination circulars, and downloading prescribed study materials.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                  <div className="p-2.5 rounded-lg bg-emerald-950/60 border border-emerald-700/40 text-xs text-slate-200 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Attendance Records</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-emerald-950/60 border border-emerald-700/40 text-xs text-slate-200 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Class Timetables</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-emerald-950/60 border border-emerald-700/40 text-xs text-slate-200 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Exam Circulars</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col gap-3">
                <Link
                  to="/students"
                  className="w-full py-3.5 px-6 bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-center rounded-xl transition-all shadow-lg hover:shadow-xl text-sm flex items-center justify-center gap-2"
                >
                  <GraduationCap className="w-5 h-5" />
                  <span>Launch Student Portal</span>
                </Link>

                <button
                  onClick={onOpenAdmissionModal}
                  className="w-full py-3.5 px-6 bg-white/15 hover:bg-white/20 text-white font-semibold text-center rounded-xl transition-all border border-white/30 text-sm flex items-center justify-center gap-2"
                >
                  <FileText className="w-4 h-4" />
                  <span>New Student Admission Form</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. CONTACT & LOCATION PREVIEW */}
      <section className="py-16 sm:py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeading
            badge="Get in Touch"
            title="Visit Sharafiyya Korangath or"
            highlightedText="Send an Enquiry"
            subtitle="Conveniently situated in Korangath, Tirur. Our office welcomes parents and prospective students."
            alignment="center"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Contact Information & Landmark Details */}
            <div className="lg:col-span-6 bg-[#FDFBF7] p-8 rounded-2xl border border-slate-200 space-y-6">
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-1">
                  Official Administrative Office
                </h3>
                <p className="text-xs text-emerald-800 font-semibold">
                  {SCHOOL_INFO.officialName} ({SCHOOL_INFO.localName})
                </p>
              </div>

              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-slate-800">Campus Address:</p>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {SCHOOL_INFO.location.fullAddress}
                    </p>
                    <p className="text-[11px] text-amber-700 font-medium mt-1">
                      Landmark: {SCHOOL_INFO.location.landmarkPlaceholder}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-emerald-700 shrink-0" />
                  <div>
                    <p className="font-semibold text-slate-800">Visiting Hours:</p>
                    <p className="text-xs text-slate-600">{SCHOOL_INFO.contact.officeHours}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-emerald-700 shrink-0" />
                  <div>
                    <p className="font-semibold text-slate-800">Direct Desk Phone:</p>
                    <p className="text-xs font-mono text-slate-600">{SCHOOL_INFO.contact.phone}</p>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                <PlaceholderBadge label="Official Contact Placeholder" size="sm" />
                <Link
                  to="/contact"
                  className="text-xs font-bold text-emerald-800 hover:text-amber-600 flex items-center gap-1"
                >
                  <span>Detailed Location & Map</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Quick Interactive Contact Box */}
            <div className="lg:col-span-6 bg-slate-50 p-8 rounded-2xl border border-slate-200">
              <h3 className="text-lg font-bold text-slate-900 mb-1">
                Direct Administrative Enquiry
              </h3>
              <p className="text-xs text-slate-600 mb-4">
                Have a question regarding timings, admission status, or syllabus? Send a message directly.
              </p>

              {quickContactSent ? (
                <div className="p-6 bg-emerald-50 rounded-xl border border-emerald-200 text-center">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto mb-2" />
                  <h4 className="text-sm font-bold text-emerald-950">Enquiry Received</h4>
                  <p className="text-xs text-emerald-800 mt-1">
                    Thank you, {quickMessage.name}. Your enquiry has been captured for demonstration purposes.
                  </p>
                  <button
                    onClick={() => setQuickContactSent(false)}
                    className="mt-4 text-xs font-semibold text-emerald-700 underline"
                  >
                    Send another query
                  </button>
                </div>
              ) : (
                <form onSubmit={handleQuickContact} className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Mohammed / Parent"
                      value={quickMessage.name}
                      onChange={(e) => setQuickMessage({ ...quickMessage, name: e.target.value })}
                      className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 Mobile number"
                      value={quickMessage.phone}
                      onChange={(e) => setQuickMessage({ ...quickMessage, phone: e.target.value })}
                      className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Your Message / Query</label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Write your query here regarding admission, bus transport, or class timings..."
                      value={quickMessage.message}
                      onChange={(e) => setQuickMessage({ ...quickMessage, message: e.target.value })}
                      className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700 bg-white resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-xs sm:text-sm rounded-xl transition-colors shadow-xs flex items-center justify-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5 text-amber-400" />
                    <span>Send Message to Office</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
