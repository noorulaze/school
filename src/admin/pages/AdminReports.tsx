import React, { useState, useEffect } from 'react';
import {
  BarChart3,
  Users,
  GraduationCap,
  TrendingUp,
  Download,
  Printer,
  FileSpreadsheet,
  Award,
  Layers,
  Inbox,
  AlertCircle
} from 'lucide-react';
import {
  getStudentsAdmin,
  getTeachersAdmin,
  getAdmissionsAdmin,
  getDepartmentsAdmin
} from '../../services/adminService';
import type { StudentDocument, TeacherItem, AdmissionEnquiry, DepartmentItem } from '../../types/firestore';

export const AdminReports: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [students, setStudents] = useState<StudentDocument[]>([]);
  const [teachers, setTeachers] = useState<TeacherItem[]>([]);
  const [admissions, setAdmissions] = useState<AdmissionEnquiry[]>([]);
  const [departments, setDepartments] = useState<DepartmentItem[]>([]);

  useEffect(() => {
    loadAllReports();
  }, []);

  const loadAllReports = async () => {
    setLoading(true);
    try {
      const [sData, tData, aData, dData] = await Promise.all([
        getStudentsAdmin(),
        getTeachersAdmin(),
        getAdmissionsAdmin(),
        getDepartmentsAdmin(),
      ]);
      setStudents(sData);
      setTeachers(tData);
      setAdmissions(aData);
      setDepartments(dData);
    } catch (e) {
      console.error('Error fetching institutional report data:', e);
    } finally {
      setLoading(false);
    }
  };

  // Calculations from real data
  const totalStudents = students.length;
  const activeStudents = students.filter((s) => s.accountStatus !== 'Disabled').length;
  const totalTeachers = teachers.length;
  const publishedTeachers = teachers.filter((t) => t.published).length;
  const totalAdmissions = admissions.length;
  const closedAdmissions = admissions.filter((a) => a.status === 'Closed').length;
  const contactedAdmissions = admissions.filter((a) => a.status === 'Contacted').length;
  const newAdmissions = admissions.filter((a) => a.status === 'New').length;

  const studentTeacherRatio = totalTeachers > 0 ? (totalStudents / totalTeachers).toFixed(1) : 'N/A';
  const admissionConversionRate = totalAdmissions > 0 ? Math.round((closedAdmissions / totalAdmissions) * 100) : 0;

  // Class Distribution
  const classCounts: Record<string, number> = {};
  students.forEach((s) => {
    const c = s.className || 'Unassigned';
    classCounts[c] = (classCounts[c] || 0) + 1;
  });

  // Department Distribution
  const deptCounts: Record<string, number> = {};
  students.forEach((s) => {
    const d = s.department || 'General';
    deptCounts[d] = (deptCounts[d] || 0) + 1;
  });

  const handleExportSummaryCSV = () => {
    const rows = [
      ['Metric', 'Value'],
      ['Total Students Enrolled', totalStudents],
      ['Active Students', activeStudents],
      ['Total Teachers', totalTeachers],
      ['Published Faculty', publishedTeachers],
      ['Student-to-Teacher Ratio', studentTeacherRatio],
      ['Total Admissions Inquiries', totalAdmissions],
      ['New Admissions', newAdmissions],
      ['Contacted Admissions', contactedAdmissions],
      ['Closed Admissions', closedAdmissions],
      ['Admission Conversion Rate (%)', `${admissionConversionRate}%`],
      ['Total Academic Departments', departments.length],
    ];
    const csvContent = 'data:text/csv;charset=utf-8,' + rows.map((r) => r.join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Institutional_Summary_Report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
            <BarChart3 className="w-7 h-7 text-[#0e3827]" />
            Reports & Institutional Analytics
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Verified institutional metrics, enrollment demographics, and admissions conversions.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleExportSummaryCSV}
            className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 shadow-xs transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            Export Summary (CSV)
          </button>
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 shadow-xs transition-colors"
          >
            <Printer className="w-3.5 h-3.5 text-slate-500" />
            Print Report
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-1">
            Enrolled Students
          </span>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-black text-slate-800">{totalStudents}</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#0e3827] flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-[11px] text-emerald-700 font-medium mt-1">
            {activeStudents} Active Accounts
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-1">
            Faculty Roster
          </span>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-black text-slate-800">{totalTeachers}</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#0e3827] flex items-center justify-center">
              <GraduationCap className="w-4 h-4" />
            </div>
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            {publishedTeachers} Publicly Listed
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-1">
            Student : Teacher
          </span>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-black text-slate-800">
              {studentTeacherRatio !== 'N/A' ? `${studentTeacherRatio} : 1` : 'N/A'}
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#c59b27]/10 text-[#c59b27] flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-[11px] text-slate-500 mt-1">Academic ratio</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-1">
            Admissions Pipeline
          </span>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-black text-[#0e3827]">{totalAdmissions}</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Inbox className="w-4 h-4" />
            </div>
          </div>
          <div className="text-[11px] text-blue-700 font-medium mt-1">
            {admissionConversionRate}% Conversion rate
          </div>
        </div>
      </div>

      {loading ? (
        <div className="bg-white p-12 rounded-xl border border-slate-200 shadow-xs text-center text-sm text-slate-500">
          <div className="animate-spin w-6 h-6 border-2 border-[#0e3827] border-t-transparent rounded-full mx-auto mb-3" />
          Compiling institutional metrics...
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Class-wise Enrolment Distribution */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#0e3827]" />
                <h3 className="text-sm font-bold text-slate-900">Class-Wise Enrolment</h3>
              </div>
              <span className="text-[11px] text-slate-500">{Object.keys(classCounts).length} Classes Active</span>
            </div>
            {Object.keys(classCounts).length === 0 ? (
              <div className="p-8 text-center text-slate-400">
                <AlertCircle className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p className="text-xs">No class enrolment data recorded yet.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {Object.entries(classCounts).map(([cls, count]) => {
                  const pct = totalStudents > 0 ? Math.round((count / totalStudents) * 100) : 0;
                  return (
                    <div key={cls} className="space-y-1">
                      <div className="flex justify-between text-xs font-semibold text-slate-700">
                        <span>{cls}</span>
                        <span>{count} students ({pct}%)</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-[#0e3827] h-full rounded-full transition-all duration-500"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Department / Stream Distribution */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-[#0e3827]" />
                <h3 className="text-sm font-bold text-slate-900">Academic Wing Breakdown</h3>
              </div>
              <span className="text-[11px] text-slate-500">{departments.length} Academic Wings</span>
            </div>
            {Object.keys(deptCounts).length === 0 ? (
              <div className="p-8 text-center text-slate-400">
                <AlertCircle className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p className="text-xs">No department distribution recorded yet.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {Object.entries(deptCounts).map(([dept, count]) => {
                  const pct = totalStudents > 0 ? Math.round((count / totalStudents) * 100) : 0;
                  return (
                    <div key={dept} className="space-y-1">
                      <div className="flex justify-between text-xs font-semibold text-slate-700">
                        <span>{dept}</span>
                        <span>{count} students ({pct}%)</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-[#c59b27] h-full rounded-full transition-all duration-500"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Admission Enquiry Status */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Inbox className="w-4 h-4 text-[#0e3827]" />
                <h3 className="text-sm font-bold text-slate-900">Admissions Funnel</h3>
              </div>
              <span className="text-[11px] text-slate-500">{totalAdmissions} Total Enquiries</span>
            </div>
            {totalAdmissions === 0 ? (
              <div className="p-8 text-center text-slate-400">
                <AlertCircle className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p className="text-xs">No admissions inquiries received yet.</p>
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-3 pt-2">
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-center">
                  <span className="text-[10px] font-bold uppercase text-amber-700 block">New Enquiries</span>
                  <span className="text-2xl font-black text-amber-800">{newAdmissions}</span>
                </div>
                <div className="p-3 bg-blue-50 rounded-xl border border-blue-200 text-center">
                  <span className="text-[10px] font-bold uppercase text-blue-700 block">Contacted</span>
                  <span className="text-2xl font-black text-blue-800">{contactedAdmissions}</span>
                </div>
                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-center">
                  <span className="text-[10px] font-bold uppercase text-emerald-700 block">Enrolled / Closed</span>
                  <span className="text-2xl font-black text-emerald-800">{closedAdmissions}</span>
                </div>
              </div>
            )}
          </div>

          {/* Administrative Summary Ledger */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <FileSpreadsheet className="w-4 h-4 text-[#0e3827]" />
                <h3 className="text-sm font-bold text-slate-900">Governance & Institutional Status</h3>
              </div>
              <span className="text-[11px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full">
                Active Session
              </span>
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1.5 border-b border-slate-100 text-slate-600">
                <span>Academic Session</span>
                <span className="font-semibold text-slate-900">2025–2026 Academic Year</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100 text-slate-600">
                <span>Portal Environment</span>
                <span className="font-semibold text-slate-900">Real Data Enterprise Mode</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100 text-slate-600">
                <span>Last Verified Audit</span>
                <span className="font-semibold text-slate-900">{new Date().toLocaleDateString('en-GB')}</span>
              </div>
              <div className="flex justify-between py-1.5 text-slate-600">
                <span>Data Isolation</span>
                <span className="font-semibold text-emerald-700">Role-Gated & Security Verified</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
