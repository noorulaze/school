import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Award, BookOpen, Calendar, UserCheck, Users, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { getPublicTeachers } from '../services/publicService';
import type { TeacherItem } from '../types/firestore';

export const Teachers: React.FC = () => {
  const [teachers, setTeachers] = useState<TeacherItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPublicTeachers()
      .then(setTeachers)
      .catch(() => setTeachers([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="w-full flex flex-col bg-[#fbfaf7] text-slate-800">
      {/* Page Header */}
      <section className="bg-white border-b border-[#e5e0d5] py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
            <Link to="/" className="hover:text-[#164e37] transition-colors">Home</Link>
            <span>/</span>
            <span className="text-[#164e37] font-semibold">Faculty & Staff</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 mb-2">
                <span className="h-px w-6 bg-[#c59b27]" />
                <span className="text-[11px] uppercase tracking-widest font-extrabold text-[#164e37]">Our Team</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-[#0f231c] tracking-tight">
                Teaching Faculty & Staff
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                Meet the dedicated teachers and mentors at Sharafiyya English Medium School in Korangath, Niramaruthur.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Teacher Cards */}
      <section className="py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="bg-white rounded-2xl border border-[#e5e0d5] p-6 animate-pulse space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-[#f4f1ea]" />
                    <div className="flex-1 space-y-2">
                      <div className="h-3 bg-[#f4f1ea] rounded w-3/4" />
                      <div className="h-2.5 bg-[#f4f1ea] rounded w-1/2" />
                    </div>
                  </div>
                  <div className="h-16 bg-[#f4f1ea] rounded-xl" />
                </div>
              ))}
            </div>
          ) : teachers.length === 0 ? (
            <div className="text-center py-20 space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-[#f4f1ea] flex items-center justify-center mx-auto">
                <Users className="w-8 h-8 text-[#164e37]/40" />
              </div>
              <h3 className="text-base font-bold text-[#0f231c]">Faculty Profiles Coming Soon</h3>
              <p className="text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
                Teacher profiles will be published here by the administration. Please check back soon or{' '}
                <Link to="/contact" className="text-[#164e37] font-semibold hover:underline">
                  contact the office
                </Link>{' '}
                for information.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {teachers.map((teacher, i) => (
                <motion.div
                  key={teacher.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  className="bg-white rounded-2xl border border-[#e5e0d5] hover:border-[#164e37]/40 hover:shadow-md p-5 sm:p-6 transition-all duration-200 flex flex-col"
                >
                  <div className="flex items-start gap-4 mb-4">
                    {teacher.photoUrl ? (
                      <img
                        src={teacher.photoUrl}
                        alt={teacher.name}
                        loading="lazy"
                        decoding="async"
                        className="w-14 h-14 rounded-xl object-cover border border-[#e5e0d5] shrink-0"
                      />
                    ) : (
                      <div className="w-14 h-14 rounded-xl bg-[#164e37]/8 border border-[#164e37]/15 flex items-center justify-center shrink-0">
                        <UserCheck className="w-7 h-7 text-[#164e37]" />
                      </div>
                    )}
                    <div className="min-w-0">
                      <h3 className="text-sm font-bold text-[#0f231c] truncate">{teacher.name}</h3>
                      <p className="text-xs text-[#164e37] font-semibold mt-0.5">{teacher.role}</p>
                      {teacher.department && (
                        <p className="text-[11px] text-slate-500 mt-0.5">{teacher.department}</p>
                      )}
                    </div>
                  </div>

                  {teacher.bio && (
                    <p className="text-xs text-slate-600 leading-relaxed mb-3 flex-1">{teacher.bio}</p>
                  )}

                  {teacher.qualification && (
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mt-auto pt-3 border-t border-[#f0ece3]">
                      <Award className="w-3.5 h-3.5 text-[#c59b27] shrink-0" />
                      <span>{teacher.qualification}</span>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Teaching Standards */}
      <section className="py-10 sm:py-14 bg-white border-t border-[#e5e0d5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="h-px w-6 bg-[#c59b27]" />
            <span className="text-[11px] uppercase tracking-widest font-extrabold text-[#164e37]">
              Teaching Standards
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#0f231c] mb-8">
            Our Commitment to Quality Education
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                icon: Award,
                title: 'Recognized Credentials',
                desc: 'Faculty hold formal credentials from recognized Islamic education boards in Kerala with verified Sanad.',
              },
              {
                icon: BookOpen,
                title: 'Tajweed Proficiency',
                desc: 'Deep grounding in Qira\'at rules to train children in correct, melodious Quranic articulation.',
              },
              {
                icon: Calendar,
                title: 'Parental Consultations',
                desc: 'Teachers are accessible to parents for regular feedback during designated consultation hours.',
              },
            ].map((item) => (
              <div key={item.title} className="p-5 rounded-2xl bg-[#fbfaf7] border border-[#e5e0d5] space-y-2">
                <item.icon className="w-5 h-5 text-[#164e37]" />
                <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-[#e5e0d5] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="text-sm text-slate-600">
              Interested in joining our team or learning more about our faculty?
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#164e37] hover:bg-[#0f3b29] text-white text-xs font-bold rounded-xl transition-colors group shadow-sm min-h-[44px]"
            >
              Contact Us
              <ArrowRight className="w-3.5 h-3.5 text-[#c59b27] group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
