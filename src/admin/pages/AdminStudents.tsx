import React, { useEffect, useState, useMemo } from 'react';
import {
  Users,
  UserPlus,
  Search,
  Eye,
  Edit2,
  Trash2,
  UserCheck,
  UserX,
  X,
  AlertCircle,
  CheckCircle2,
  Loader2,
  Lock
} from 'lucide-react';
import {
  getStudentsAdmin,
  saveStudent,
  deleteStudent,
  toggleStudentStatus
} from '../../services/adminService';
import type { StudentDocument } from '../../types/firestore';
import { ConfirmModal } from '../components/ConfirmModal';

interface StudentFormData {
  id?: string;
  name: string;
  studentId: string;
  email: string;
  className: string;
  department: string;
  academicYear: string;
  accountStatus: 'Active' | 'Disabled';
  tempPassword?: string;
}

const INITIAL_FORM: StudentFormData = {
  name: '',
  studentId: '',
  email: '',
  className: 'Class 5 - Intermediate',
  department: 'Qur’an & Tajweed',
  academicYear: '2025–2026',
  accountStatus: 'Active',
  tempPassword: '',
};

export const AdminStudents: React.FC = () => {
  const [students, setStudents] = useState<StudentDocument[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [filterClass, setFilterClass] = useState('ALL');
  const [filterDepartment, setFilterDepartment] = useState('ALL');
  const [filterYear, setFilterYear] = useState('ALL');
  const [filterStatus, setFilterStatus] = useState<'ALL' | 'Active' | 'Disabled'>('ALL');

  // Modals state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<StudentFormData | null>(null);
  const [viewingStudent, setViewingStudent] = useState<StudentDocument | null>(null);
  const [studentToDelete, setStudentToDelete] = useState<StudentDocument | null>(null);
  const [studentToToggle, setStudentToToggle] = useState<StudentDocument | null>(null);

  // Form handling
  const [formData, setFormData] = useState<StudentFormData>(INITIAL_FORM);
  const [formError, setFormError] = useState<string | null>(null);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const data = await getStudentsAdmin();
      setStudents(data);
    } catch (err) {
      console.error('Error fetching students:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Filtered students list
  const filteredStudents = useMemo(() => {
    return students.filter((s) => {
      const matchesSearch =
        searchQuery === '' ||
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.studentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.email.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesClass = filterClass === 'ALL' || s.className === filterClass;
      const matchesDept = filterDepartment === 'ALL' || s.department === filterDepartment;
      const matchesYear = filterYear === 'ALL' || s.academicYear === filterYear;
      const matchesStatus = filterStatus === 'ALL' || s.accountStatus === filterStatus;

      return matchesSearch && matchesClass && matchesDept && matchesYear && matchesStatus;
    });
  }, [students, searchQuery, filterClass, filterDepartment, filterYear, filterStatus]);

  // Unique values for filters
  const uniqueClasses = useMemo(() => Array.from(new Set(students.map((s) => s.className).filter(Boolean))), [students]);
  const uniqueDepts = useMemo(() => Array.from(new Set(students.map((s) => s.department).filter(Boolean))), [students]);
  const uniqueYears = useMemo(() => Array.from(new Set(students.map((s) => s.academicYear).filter(Boolean))), [students]);

  // Handle open add modal
  const handleOpenAdd = () => {
    setEditingStudent(null);
    setFormData({
      ...INITIAL_FORM,
      studentId: `SK-${new Date().getFullYear()}-${String(students.length + 1).padStart(3, '0')}`,
    });
    setFormError(null);
    setIsFormOpen(true);
  };

  // Handle open edit modal
  const handleOpenEdit = (student: StudentDocument) => {
    setEditingStudent({
      id: student.id,
      name: student.name,
      studentId: student.studentId,
      email: student.email,
      className: student.className,
      department: student.department,
      academicYear: student.academicYear,
      accountStatus: student.accountStatus,
    });
    setFormData({
      id: student.id,
      name: student.name,
      studentId: student.studentId,
      email: student.email,
      className: student.className,
      department: student.department,
      academicYear: student.academicYear,
      accountStatus: student.accountStatus,
    });
    setFormError(null);
    setIsFormOpen(true);
  };

  // Handle save (Add or Edit)
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    // Validation
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      setFormError('Please enter a valid student full name.');
      return;
    }

    if (!formData.studentId.trim()) {
      setFormError('Student ID is required (e.g. SK-2025-001).');
      return;
    }

    if (!formData.email.trim() || !formData.email.includes('@')) {
      setFormError('Please enter a valid login email for the student.');
      return;
    }

    setFormSubmitting(true);
    try {
      await saveStudent({
        id: formData.id,
        uid: formData.id || `uid-${Date.now()}`,
        name: formData.name.trim(),
        studentId: formData.studentId.trim().toUpperCase(),
        email: formData.email.trim().toLowerCase(),
        className: formData.className,
        department: formData.department,
        academicYear: formData.academicYear,
        accountStatus: formData.accountStatus,
      });

      setNotification({
        type: 'success',
        message: editingStudent
          ? `Student record for ${formData.name} updated successfully.`
          : `Student ${formData.name} (${formData.studentId}) registered successfully.`,
      });

      setIsFormOpen(false);
      fetchStudents();
    } catch (err: any) {
      setFormError(err.message || 'Failed to save student record.');
    } finally {
      setFormSubmitting(false);
    }
  };

  // Handle toggle active/disabled status
  const handleConfirmToggle = async () => {
    if (!studentToToggle) return;
    const newStatus = studentToToggle.accountStatus === 'Active' ? 'Disabled' : 'Active';
    try {
      await toggleStudentStatus(studentToToggle.id, newStatus);
      setNotification({
        type: 'success',
        message: `Student account for ${studentToToggle.name} is now ${newStatus}.`,
      });
      fetchStudents();
    } catch (err) {
      setNotification({ type: 'error', message: 'Failed to update account status.' });
    } finally {
      setStudentToToggle(null);
    }
  };

  // Handle delete student record
  const handleConfirmDelete = async () => {
    if (!studentToDelete) return;
    try {
      await deleteStudent(studentToDelete.id);
      setNotification({
        type: 'success',
        message: `Student record for ${studentToDelete.name} has been removed.`,
      });
      fetchStudents();
    } catch (err) {
      setNotification({ type: 'error', message: 'Failed to delete student record.' });
    } finally {
      setStudentToDelete(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header & Primary Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Student Records Management
            </h1>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
              {students.length} Registered
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Maintain enrolled student accounts, manage portal login credentials, and configure academic levels.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenAdd}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#164e37] hover:bg-[#113d2b] text-white font-bold text-xs rounded-xl shadow-xs transition-all cursor-pointer shrink-0"
        >
          <UserPlus className="w-4 h-4 text-[#c59b27]" />
          <span>Add New Student</span>
        </button>
      </div>

      {/* Toast Notification */}
      {notification && (
        <div
          className={`p-4 rounded-xl flex items-center justify-between gap-3 text-xs font-semibold animate-in fade-in ${
            notification.type === 'success'
              ? 'bg-emerald-50 text-emerald-900 border border-emerald-200'
              : 'bg-rose-50 text-rose-900 border border-rose-200'
          }`}
        >
          <div className="flex items-center gap-2">
            {notification.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            )}
            <span>{notification.message}</span>
          </div>
          <button
            type="button"
            onClick={() => setNotification(null)}
            className="text-slate-400 hover:text-slate-700 p-1 rounded-md"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Filters & Search Toolbar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          {/* Search Input */}
          <div className="md:col-span-4 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Name, Student ID, or Email..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-700 focus:bg-white transition-all"
            />
          </div>

          {/* Class Filter */}
          <div className="md:col-span-2">
            <select
              value={filterClass}
              onChange={(e) => setFilterClass(e.target.value)}
              className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-emerald-700"
            >
              <option value="ALL">All Classes</option>
              {uniqueClasses.map((cls) => (
                <option key={cls} value={cls}>
                  {cls}
                </option>
              ))}
            </select>
          </div>

          {/* Department Filter */}
          <div className="md:col-span-2">
            <select
              value={filterDepartment}
              onChange={(e) => setFilterDepartment(e.target.value)}
              className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-emerald-700"
            >
              <option value="ALL">All Departments</option>
              {uniqueDepts.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          {/* Academic Year Filter */}
          <div className="md:col-span-2">
            <select
              value={filterYear}
              onChange={(e) => setFilterYear(e.target.value)}
              className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-emerald-700"
            >
              <option value="ALL">All Academic Years</option>
              {uniqueYears.map((yr) => (
                <option key={yr} value={yr}>
                  {yr}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div className="md:col-span-2">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-emerald-700"
            >
              <option value="ALL">All Statuses</option>
              <option value="Active">Active Only</option>
              <option value="Disabled">Disabled Only</option>
            </select>
          </div>
        </div>

        {/* Filter count summary */}
        <div className="flex items-center justify-between text-xs text-slate-500 pt-1 border-t border-slate-100">
          <span>
            Showing <strong className="text-slate-800">{filteredStudents.length}</strong> of{' '}
            <strong className="text-slate-800">{students.length}</strong> student records
          </span>
          {(searchQuery || filterClass !== 'ALL' || filterDepartment !== 'ALL' || filterYear !== 'ALL' || filterStatus !== 'ALL') && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setFilterClass('ALL');
                setFilterDepartment('ALL');
                setFilterYear('ALL');
                setFilterStatus('ALL');
              }}
              className="text-xs text-emerald-700 hover:text-emerald-900 font-semibold cursor-pointer"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Main Table / Responsive Cards */}
      {loading ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-xs">
          <Loader2 className="w-8 h-8 text-emerald-800 animate-spin mx-auto mb-3" />
          <p className="text-xs text-slate-500">Loading student registry...</p>
        </div>
      ) : filteredStudents.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-xs">
          <Users className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-sm font-bold text-slate-800">No Student Records Found</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            {students.length === 0
              ? 'No students have been registered yet. Click "Add New Student" to create the first account.'
              : 'No student matches your current filter or search criteria.'}
          </p>
        </div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[10px]">
                  <th className="py-3 px-4">Student ID</th>
                  <th className="py-3 px-4">Student Name</th>
                  <th className="py-3 px-4">Email / Login</th>
                  <th className="py-3 px-4">Class</th>
                  <th className="py-3 px-4">Department</th>
                  <th className="py-3 px-4">Academic Year</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredStudents.map((st) => (
                  <tr key={st.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-900 whitespace-nowrap">
                      {st.studentId}
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-slate-900">
                      {st.name}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 font-mono text-[11px]">
                      {st.email}
                    </td>
                    <td className="py-3.5 px-4 text-slate-700">
                      {st.className}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">
                      {st.department}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 whitespace-nowrap">
                      {st.academicYear}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                          st.accountStatus === 'Active'
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                            : 'bg-rose-100 text-rose-800 border border-rose-200'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            st.accountStatus === 'Active' ? 'bg-emerald-600' : 'bg-rose-600'
                          }`}
                        />
                        {st.accountStatus}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => setViewingStudent(st)}
                          className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                          title="View Profile Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleOpenEdit(st)}
                          className="p-1.5 text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors cursor-pointer"
                          title="Edit Student Info"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setStudentToToggle(st)}
                          className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                            st.accountStatus === 'Active'
                              ? 'text-amber-600 hover:bg-amber-50'
                              : 'text-emerald-600 hover:bg-emerald-50'
                          }`}
                          title={st.accountStatus === 'Active' ? 'Disable Portal Access' : 'Enable Portal Access'}
                        >
                          {st.accountStatus === 'Active' ? (
                            <UserX className="w-4 h-4" />
                          ) : (
                            <UserCheck className="w-4 h-4" />
                          )}
                        </button>
                        <button
                          type="button"
                          onClick={() => setStudentToDelete(st)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                          title="Delete Record"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card List */}
          <div className="md:hidden space-y-3">
            {filteredStudents.map((st) => (
              <div
                key={st.id}
                className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                        {st.studentId}
                      </span>
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-bold text-[10px] ${
                          st.accountStatus === 'Active'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {st.accountStatus}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 mt-1">{st.name}</h3>
                    <p className="text-xs text-slate-500 font-mono">{st.email}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs py-2 border-t border-b border-slate-100">
                  <div>
                    <span className="text-[10px] uppercase text-slate-400 font-semibold block">Class</span>
                    <span className="text-slate-800 font-medium">{st.className}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-slate-400 font-semibold block">Department</span>
                    <span className="text-slate-800 font-medium">{st.department}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-[10px] uppercase text-slate-400 font-semibold block">Academic Year</span>
                    <span className="text-slate-800 font-medium">{st.academicYear}</span>
                  </div>
                </div>

                {/* Mobile Actions */}
                <div className="flex items-center justify-between gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setViewingStudent(st)}
                    className="flex-1 py-1.5 px-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleOpenEdit(st)}
                    className="flex-1 py-1.5 px-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setStudentToToggle(st)}
                    className={`py-1.5 px-2.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 ${
                      st.accountStatus === 'Active'
                        ? 'bg-amber-50 text-amber-800'
                        : 'bg-emerald-100 text-emerald-900'
                    }`}
                  >
                    {st.accountStatus === 'Active' ? 'Disable' : 'Enable'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setStudentToDelete(st)}
                    className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Add / Edit Student Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto animate-in fade-in">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200 my-8">
            <div className="p-6 bg-[#0d281e] text-white flex items-center justify-between border-b border-[#1a4434]">
              <div>
                <h2 className="text-lg font-bold text-white">
                  {editingStudent ? 'Edit Student Record' : 'Register New Student'}
                </h2>
                <p className="text-xs text-emerald-200/80">
                  {editingStudent
                    ? `Updating details for Student ID: ${editingStudent.studentId}`
                    : 'Set up enrolled student profile and portal login'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsFormOpen(false)}
                className="text-slate-300 hover:text-white p-1 rounded-lg hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="p-6 space-y-4">
              {formError && (
                <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-2.5 text-xs text-rose-800">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <span>{formError}</span>
                </div>
              )}

              {/* Student Name */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Full Student Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Mohammed Rayan"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-700 focus:bg-white"
                />
              </div>

              {/* Student ID & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Student ID (Unique) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.studentId}
                    onChange={(e) => setFormData({ ...formData, studentId: e.target.value.toUpperCase() })}
                    placeholder="SK-2025-001"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-mono font-bold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-700 focus:bg-white"
                  />
                  <span className="text-[10px] text-slate-400 mt-1 block">
                    Must be unique per student.
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Student Login Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="student@sharafiyya.edu"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-700 focus:bg-white"
                  />
                  <span className="text-[10px] text-slate-400 mt-1 block">
                    Used for student portal login.
                  </span>
                </div>
              </div>

              {/* Class & Department */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Class / Level *
                  </label>
                  <select
                    value={formData.className}
                    onChange={(e) => setFormData({ ...formData, className: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-700"
                  >
                    <option value="Class 1 - Foundation">Class 1 - Foundation</option>
                    <option value="Class 2 - Primary">Class 2 - Primary</option>
                    <option value="Class 3 - Primary">Class 3 - Primary</option>
                    <option value="Class 4 - Intermediate">Class 4 - Intermediate</option>
                    <option value="Class 5 - Intermediate">Class 5 - Intermediate</option>
                    <option value="Class 6 - Higher Level">Class 6 - Higher Level</option>
                    <option value="Class 7 - Secondary">Class 7 - Secondary</option>
                    <option value="Class 8 - Secondary">Class 8 - Secondary</option>
                    <option value="Class 9 - Advanced">Class 9 - Advanced</option>
                    <option value="Class 10 - Secondary Senior">Class 10 - Secondary Senior</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Department *
                  </label>
                  <select
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-700"
                  >
                    <option value="Qur’an & Tajweed">Qur’an & Tajweed</option>
                    <option value="Fiqh & Islamic Jurisprudence">Fiqh & Islamic Jurisprudence</option>
                    <option value="Aqeedah & Fundamentals">Aqeedah & Fundamentals</option>
                    <option value="Hadith & Sunnah Studies">Hadith & Sunnah Studies</option>
                    <option value="Tarikh & Islamic History">Tarikh & Islamic History</option>
                    <option value="Arabic Language & Grammar">Arabic Language & Grammar</option>
                    <option value="Akhlaq & Moral Education">Akhlaq & Moral Education</option>
                  </select>
                </div>
              </div>

              {/* Academic Year & Account Status */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Academic Year *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.academicYear}
                    onChange={(e) => setFormData({ ...formData, academicYear: e.target.value })}
                    placeholder="2025–2026"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-700 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Account Status *
                  </label>
                  <select
                    value={formData.accountStatus}
                    onChange={(e) => setFormData({ ...formData, accountStatus: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-700"
                  >
                    <option value="Active">Active (Allows Portal Login)</option>
                    <option value="Disabled">Disabled (Blocks Portal Login)</option>
                  </select>
                </div>
              </div>

              {!editingStudent && (
                <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200 text-xs text-amber-900 leading-relaxed">
                  <div className="flex items-center gap-1.5 font-bold mb-1">
                    <Lock className="w-3.5 h-3.5 text-amber-700" />
                    <span>Student Portal Password Configuration</span>
                  </div>
                  <span>
                    In development mode, students log in with their Student ID and password <strong className="font-mono">Student@123</strong>. In production, password reset instructions are linked to the student's email address.
                  </span>
                </div>
              )}

              {/* Modal Buttons */}
              <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={formSubmitting}
                  className="px-5 py-2.5 bg-[#164e37] hover:bg-[#113d2b] text-white font-bold text-xs rounded-xl shadow-xs transition-all cursor-pointer disabled:opacity-50 flex items-center gap-2"
                >
                  {formSubmitting ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Saving Student...</span>
                    </>
                  ) : (
                    <span>{editingStudent ? 'Update Student Record' : 'Create Student Record'}</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Student Details Modal */}
      {viewingStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden border border-slate-200">
            <div className="p-6 bg-[#0d281e] text-white relative">
              <button
                type="button"
                onClick={() => setViewingStudent(null)}
                className="absolute top-4 right-4 text-slate-300 hover:text-white p-1 rounded-lg hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="w-14 h-14 rounded-2xl bg-[#164e37] border border-[#c59b27]/80 text-white flex items-center justify-center font-bold text-xl mb-3 shadow-md">
                {viewingStudent.name.charAt(0)}
              </div>
              <h2 className="text-lg font-bold text-white">{viewingStudent.name}</h2>
              <span className="text-xs font-mono text-[#c59b27] font-semibold">
                ID: {viewingStudent.studentId}
              </span>
            </div>

            <div className="p-6 space-y-3.5 text-xs">
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Registered Email:</span>
                <span className="font-mono font-semibold text-slate-800">{viewingStudent.email}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Class / Standard:</span>
                <span className="font-bold text-slate-800">{viewingStudent.className}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Department:</span>
                <span className="font-semibold text-slate-800">{viewingStudent.department}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Academic Year:</span>
                <span className="font-semibold text-slate-800">{viewingStudent.academicYear}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Account Status:</span>
                <span
                  className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                    viewingStudent.accountStatus === 'Active'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-rose-100 text-rose-800'
                  }`}
                >
                  {viewingStudent.accountStatus}
                </span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-slate-500 font-medium">Registration Date:</span>
                <span className="text-slate-600">
                  {new Date(viewingStudent.createdAt).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </span>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
              <button
                type="button"
                onClick={() => setViewingStudent(null)}
                className="px-5 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-semibold cursor-pointer"
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Status Toggle Modal */}
      <ConfirmModal
        isOpen={Boolean(studentToToggle)}
        title={
          studentToToggle?.accountStatus === 'Active'
            ? 'Disable Student Portal Access?'
            : 'Activate Student Portal Access?'
        }
        message={
          studentToToggle?.accountStatus === 'Active'
            ? `Disabling account for ${studentToToggle?.name} (${studentToToggle?.studentId}) will prevent them from logging in to the Student Portal. Their historical records remain preserved.`
            : `Activating account for ${studentToToggle?.name} (${studentToToggle?.studentId}) will restore their Student Portal login access immediately.`
        }
        confirmLabel={studentToToggle?.accountStatus === 'Active' ? 'Disable Account' : 'Activate Account'}
        isDestructive={studentToToggle?.accountStatus === 'Active'}
        onConfirm={handleConfirmToggle}
        onCancel={() => setStudentToToggle(null)}
      />

      {/* Confirm Delete Modal */}
      <ConfirmModal
        isOpen={Boolean(studentToDelete)}
        title="Delete Student Record?"
        message={`Are you certain you wish to delete the student record for ${studentToDelete?.name} (${studentToDelete?.studentId})? This action cannot be reversed.`}
        confirmLabel="Delete Permanently"
        isDestructive={true}
        onConfirm={handleConfirmDelete}
        onCancel={() => setStudentToDelete(null)}
      />
    </div>
  );
};
