import React, { useState, useEffect } from 'react';
import {
  ClipboardCheck,
  Calendar,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  Clock,
  Download,
  Printer,
  Users,
  AlertCircle
} from 'lucide-react';
import { getStudentsAdmin } from '../../services/adminService';
import type { StudentDocument } from '../../types/firestore';

export const AdminAttendance: React.FC = () => {
  const [students, setStudents] = useState<StudentDocument[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [selectedSession, setSelectedSession] = useState<'Morning' | 'Afternoon'>('Morning');
  const [selectedClass, setSelectedClass] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [attendanceMap, setAttendanceMap] = useState<Record<string, 'Present' | 'Absent' | 'Late' | 'Excused'>>({});
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await getStudentsAdmin();
      const active = data.filter((s) => s.accountStatus !== 'Disabled');
      setStudents(active);

      const key = `sharafiyya_att_${selectedDate}_${selectedSession}`;
      const saved = localStorage.getItem(key);
      if (saved) {
        setAttendanceMap(JSON.parse(saved));
      } else {
        const init: Record<string, 'Present' | 'Absent' | 'Late' | 'Excused'> = {};
        active.forEach((s) => {
          init[s.id] = 'Present';
        });
        setAttendanceMap(init);
      }
    } catch (e) {
      console.error('Error loading attendance students:', e);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = (studentId: string, status: 'Present' | 'Absent' | 'Late' | 'Excused') => {
    setAttendanceMap((prev) => ({
      ...prev,
      [studentId]: status,
    }));
  };

  const handleMarkAll = (status: 'Present' | 'Absent') => {
    const updated: Record<string, 'Present' | 'Absent' | 'Late' | 'Excused'> = { ...attendanceMap };
    filteredStudents.forEach((s) => {
      updated[s.id] = status;
    });
    setAttendanceMap(updated);
  };

  const handleSave = () => {
    const key = `sharafiyya_att_${selectedDate}_${selectedSession}`;
    localStorage.setItem(key, JSON.stringify(attendanceMap));
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const classes = Array.from(new Set(students.map((s) => s.className).filter(Boolean)));

  const filteredStudents = students.filter((s) => {
    const matchClass = selectedClass === 'All' || s.className === selectedClass;
    const matchSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.studentId.toLowerCase().includes(searchQuery.toLowerCase());
    return matchClass && matchSearch;
  });

  const totalCount = filteredStudents.length;
  const presentCount = filteredStudents.filter((s) => (attendanceMap[s.id] || 'Present') === 'Present').length;
  const absentCount = filteredStudents.filter((s) => attendanceMap[s.id] === 'Absent').length;
  const lateCount = filteredStudents.filter((s) => attendanceMap[s.id] === 'Late').length;
  const attendanceRate = totalCount > 0 ? Math.round((presentCount / totalCount) * 100) : 0;

  const handleExportCSV = () => {
    const headers = ['Student ID', 'Student Name', 'Class', 'Date', 'Session', 'Status'];
    const rows = filteredStudents.map((s) => [
      s.studentId,
      s.name,
      s.className,
      selectedDate,
      selectedSession,
      attendanceMap[s.id] || 'Present',
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Attendance_${selectedDate}_${selectedSession}.csv`);
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
            <ClipboardCheck className="w-7 h-7 text-[#0e3827]" />
            Attendance Management
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Record and monitor session-wise daily student attendance and class ratios.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCSV}
            disabled={filteredStudents.length === 0}
            className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 shadow-xs transition-colors disabled:opacity-50"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            Export CSV
          </button>
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 shadow-xs transition-colors"
          >
            <Printer className="w-3.5 h-3.5 text-slate-500" />
            Print Register
          </button>
          <button
            onClick={handleSave}
            disabled={filteredStudents.length === 0}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-[#0e3827] rounded-lg hover:bg-[#164e37] shadow-xs transition-all disabled:opacity-50"
          >
            <CheckCircle2 className="w-4 h-4 text-[#c59b27]" />
            Save Attendance
          </button>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-medium flex items-center gap-2 shadow-xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          Attendance records for {selectedDate} ({selectedSession} session) saved successfully.
        </div>
      )}

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-1">
            Total Enrolled
          </span>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-black text-slate-800">{totalCount}</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#0e3827] flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-1">
            Present Today
          </span>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-black text-emerald-700">{presentCount}</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-1">
            Absent
          </span>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-black text-rose-600">{absentCount}</span>
            <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
              <XCircle className="w-4 h-4" />
            </div>
          </div>
          {lateCount > 0 && (
            <div className="text-[10px] text-amber-700 font-semibold mt-1">
              {lateCount} Late recorded
            </div>
          )}
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-1">
            Attendance Rate
          </span>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-black text-[#0e3827]">{attendanceRate}%</span>
            <div className="w-8 h-8 rounded-lg bg-[#c59b27]/10 text-[#c59b27] flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Control Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-slate-400" />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="text-xs font-medium text-slate-800 border border-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-[#0e3827]"
            />
          </div>

          <div className="flex items-center rounded-lg border border-slate-200 p-0.5 bg-slate-50 text-xs">
            <button
              onClick={() => setSelectedSession('Morning')}
              className={`px-3 py-1 rounded-md font-semibold transition-all ${
                selectedSession === 'Morning' ? 'bg-[#0e3827] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Morning
            </button>
            <button
              onClick={() => setSelectedSession('Afternoon')}
              className={`px-3 py-1 rounded-md font-semibold transition-all ${
                selectedSession === 'Afternoon' ? 'bg-[#0e3827] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Afternoon
            </button>
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400" />
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="text-xs font-medium text-slate-800 border border-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-[#0e3827]"
            >
              <option value="All">All Classes</option>
              {classes.map((cls) => (
                <option key={cls} value={cls}>
                  {cls}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search student or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="text-xs pl-8 pr-3 py-1.5 border border-slate-200 rounded-lg focus:outline-none focus:border-[#0e3827] w-48"
            />
          </div>
          <button
            onClick={() => handleMarkAll('Present')}
            className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1.5 rounded-lg border border-emerald-200 transition-colors"
          >
            Mark All Present
          </button>
          <button
            onClick={() => handleMarkAll('Absent')}
            className="text-[11px] font-semibold text-rose-800 bg-rose-50 hover:bg-rose-100 px-2.5 py-1.5 rounded-lg border border-rose-200 transition-colors"
          >
            Mark All Absent
          </button>
        </div>
      </div>

      {/* Attendance Register Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-sm text-slate-500">
            <div className="animate-spin w-6 h-6 border-2 border-[#0e3827] border-t-transparent rounded-full mx-auto mb-3" />
            Loading student roster...
          </div>
        ) : filteredStudents.length === 0 ? (
          <div className="p-12 text-center">
            <AlertCircle className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <h3 className="text-sm font-bold text-slate-800">No Student Records Found</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              There are no enrolled students matching the selected criteria. Add or activate students in the Students module to begin recording attendance.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider">
                  <th className="py-3 px-4">Student ID</th>
                  <th className="py-3 px-4">Student Name</th>
                  <th className="py-3 px-4">Class</th>
                  <th className="py-3 px-4">Department</th>
                  <th className="py-3 px-4 text-center">Status</th>
                  <th className="py-3 px-4 text-right">Quick Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredStudents.map((student) => {
                  const status = attendanceMap[student.id] || 'Present';
                  return (
                    <tr key={student.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-3 px-4 font-mono font-bold text-emerald-900">
                        {student.studentId}
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-semibold text-slate-900">{student.name}</div>
                        {student.phone && (
                          <div className="text-[10px] text-slate-400">{student.phone}</div>
                        )}
                      </td>
                      <td className="py-3 px-4 text-slate-700 font-medium">
                        {student.className}
                      </td>
                      <td className="py-3 px-4 text-slate-500">
                        {student.department || 'General'}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                            status === 'Present'
                              ? 'bg-emerald-100 text-emerald-800'
                              : status === 'Absent'
                              ? 'bg-rose-100 text-rose-800'
                              : status === 'Late'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}
                        >
                          {status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="inline-flex rounded-lg border border-slate-200 p-0.5 bg-slate-50">
                          {(['Present', 'Absent', 'Late', 'Excused'] as const).map((s) => (
                            <button
                              key={s}
                              onClick={() => handleStatusChange(student.id, s)}
                              className={`px-2 py-0.5 rounded text-[10px] font-semibold transition-all ${
                                status === s
                                  ? s === 'Present'
                                    ? 'bg-emerald-700 text-white'
                                    : s === 'Absent'
                                    ? 'bg-rose-600 text-white'
                                    : s === 'Late'
                                    ? 'bg-amber-600 text-white'
                                    : 'bg-blue-600 text-white'
                                  : 'text-slate-600 hover:text-slate-900'
                              }`}
                            >
                              {s}
                            </button>
                          ))}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
