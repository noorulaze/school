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
  Lock,
  Key,
  RefreshCw,
  Clock,
  Shield
} from 'lucide-react';
import {
  getStudentsAdmin,
  saveStudent,
  deleteStudent,
  toggleStudentStatus,
  resetStudentPasswordAdmin
} from '../../services/adminService';
import { createStudentAuthAccount, setStudentFallbackPassword } from '../../services/authService';
import type { StudentDocument } from '../../types/firestore';
import { ConfirmModal } from '../components/ConfirmModal';

interface StudentFormData {
  id?: string;
  name: string;
  studentId: string;
  username?: string;
  email: string;
  className: string;
  division?: string;
  section?: string;
  dob?: string;
  parentName?: string;
  parentPhone?: string;
  studentPhone?: string;
  address?: string;
  profileImage?: string;
  department: string;
  academicYear: string;
  accountStatus: 'Active' | 'Disabled';
  initialPassword?: string;
}

const INITIAL_FORM: StudentFormData = {
  name: '',
  studentId: '',
  username: '',
  email: '',
  className: 'Class 5 - Intermediate',
  division: 'A',
  section: 'A',
  dob: '',
  parentName: '',
  parentPhone: '',
  studentPhone: '',
  address: '',
  profileImage: '',
  department: 'Islamic Studies & Moral Science',
  academicYear: '2025–2026',
  accountStatus: 'Active',
  initialPassword: '',
};

export const AdminStudents: React.FC = () => {
  const [students, setStudents] = useState<StudentDocument[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [filterClass, setFilterClass] = useState('ALL');
  const [filterDivision, setFilterDivision] = useState('ALL');
  const [filterStatus, setFilterStatus] = useState<'ALL' | 'Active' | 'Disabled'>('ALL');

  // Modals state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<StudentFormData | null>(null);
  const [viewingStudent, setViewingStudent] = useState<StudentDocument | null>(null);
  const [studentToDelete, setStudentToDelete] = useState<StudentDocument | null>(null);
  const [studentToToggle, setStudentToToggle] = useState<StudentDocument | null>(null);
  const [studentToReset, setStudentToReset] = useState<StudentDocument | null>(null);
  const [resetTempPassword, setResetTempPassword] = useState<string>('');
  const [resetSubmitting, setResetSubmitting] = useState(false);

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
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        q === '' ||
        s.name.toLowerCase().includes(q) ||
        s.studentId.toLowerCase().includes(q) ||
        (s.username && s.username.toLowerCase().includes(q)) ||
        s.email.toLowerCase().includes(q);

      const matchesClass = filterClass === 'ALL' || s.className === filterClass;
      const sDiv = (s.division || s.section || '').toUpperCase();
      const matchesDivision = filterDivision === 'ALL' || sDiv === filterDivision.toUpperCase();
      const matchesStatus = filterStatus === 'ALL' || s.accountStatus === filterStatus;

      return matchesSearch && matchesClass && matchesDivision && matchesStatus;
    });
  }, [students, searchQuery, filterClass, filterDivision, filterStatus]);

  // Unique values for dropdown filters
  const uniqueClasses = useMemo(() => {
    const defaultClasses = [
      'Class 1 - Foundation',
      'Class 2 - Primary',
      'Class 3 - Primary',
      'Class 4 - Intermediate',
      'Class 5 - Intermediate',
      'Class 6 - Higher Level',
      'Class 7 - Secondary',
      'Class 8 - Secondary',
      'Class 9 - Advanced',
      'Class 10 - Secondary Senior'
    ];
    const fromData = students.map((s) => s.className).filter(Boolean);
    return Array.from(new Set([...defaultClasses, ...fromData]));
  }, [students]);

  const uniqueDivisions = useMemo(() => {
    const set = new Set<string>(['A', 'B', 'C', 'D']);
    students.forEach((s) => {
      const div = s.division || s.section;
      if (div) set.add(div.trim().toUpperCase());
    });
    return Array.from(set).sort();
  }, [students]);

  // Handle open add modal
  const handleOpenAdd = () => {
    setEditingStudent(null);
    setFormData({
      ...INITIAL_FORM,
      studentId: `SK-${new Date().getFullYear()}-${String(students.length + 1).padStart(3, '0')}`,
      initialPassword: `Sharaf@${Math.floor(1000 + Math.random() * 9000)}`,
    });
    setFormError(null);
    setIsFormOpen(true);
  };

  // Handle open edit modal
  const handleOpenEdit = (student: StudentDocument) => {
    const data: StudentFormData = {
      id: student.id,
      name: student.name,
      studentId: student.studentId,
      username: student.username || '',
      email: student.email,
      className: student.className,
      division: student.division || student.section || 'A',
      section: student.section || student.division || 'A',
      dob: student.dob || '',
      parentName: student.parentName || student.guardianName || '',
      parentPhone: student.parentPhone || '',
      studentPhone: student.studentPhone || student.phone || '',
      address: student.address || '',
      profileImage: student.profileImage || student.photoUrl || '',
      department: student.department,
      academicYear: student.academicYear,
      accountStatus: student.accountStatus,
    };
    setEditingStudent(data);
    setFormData(data);
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
      if (!editingStudent) {
        // Initial temporary password provisioning for new student
        const initPass = formData.initialPassword?.trim() || `Sharaf@${new Date().getFullYear()}`;
        if (initPass.length < 6) {
          setFormError('Initial temporary password must be at least 6 characters long.');
          setFormSubmitting(false);
          return;
        }

        let authUid = `uid-${Date.now()}`;
        try {
          authUid = await createStudentAuthAccount(formData.studentId, initPass);
        } catch (authErr: any) {
          console.warn('[AdminStudents] Secondary auth user note:', authErr.message);
        }
        setStudentFallbackPassword(formData.studentId, initPass);

        await saveStudent({
          id: formData.id,
          uid: authUid,
          name: formData.name.trim(),
          studentId: formData.studentId.trim().toUpperCase(),
          username: formData.username?.trim().toLowerCase() || undefined,
          email: formData.email.trim().toLowerCase(),
          className: formData.className,
          division: formData.division?.trim().toUpperCase() || 'A',
          section: formData.division?.trim().toUpperCase() || 'A',
          dob: formData.dob?.trim() || undefined,
          parentName: formData.parentName?.trim() || undefined,
          guardianName: formData.parentName?.trim() || undefined,
          parentPhone: formData.parentPhone?.trim() || undefined,
          studentPhone: formData.studentPhone?.trim() || undefined,
          phone: formData.studentPhone?.trim() || undefined,
          address: formData.address?.trim() || undefined,
          profileImage: formData.profileImage?.trim() || undefined,
          department: formData.department,
          academicYear: formData.academicYear,
          accountStatus: formData.accountStatus,
          firstLogin: true,
          mustChangePassword: true,
        });

        setIsFormOpen(false);
        setNotification({
          type: 'success',
          message: `Student account for ${formData.name} (${formData.studentId.toUpperCase()}) created successfully. Initial credentials provisioned with mandatory password setup upon first login.`,
        });
      } else {
        await saveStudent({
          id: formData.id,
          uid: formData.id || `uid-${Date.now()}`,
          name: formData.name.trim(),
          studentId: formData.studentId.trim().toUpperCase(),
          username: formData.username?.trim().toLowerCase() || undefined,
          email: formData.email.trim().toLowerCase(),
          className: formData.className,
          division: formData.division?.trim().toUpperCase() || 'A',
          section: formData.division?.trim().toUpperCase() || 'A',
          dob: formData.dob?.trim() || undefined,
          parentName: formData.parentName?.trim() || undefined,
          guardianName: formData.parentName?.trim() || undefined,
          parentPhone: formData.parentPhone?.trim() || undefined,
          studentPhone: formData.studentPhone?.trim() || undefined,
          phone: formData.studentPhone?.trim() || undefined,
          address: formData.address?.trim() || undefined,
          profileImage: formData.profileImage?.trim() || undefined,
          department: formData.department,
          academicYear: formData.academicYear,
          accountStatus: formData.accountStatus,
        });

        setNotification({
          type: 'success',
          message: `Student profile for ${formData.name} updated successfully.`,
        });
        setIsFormOpen(false);
      }

      fetchStudents();
    } catch (err: any) {
      setFormError(err.message || 'Failed to save student record.');
    } finally {
      setFormSubmitting(false);
    }
  };

  // Handle open reset password modal
  const handleOpenResetPassword = (student: StudentDocument) => {
    setStudentToReset(student);
    setResetTempPassword(`Sharaf@${Math.floor(1000 + Math.random() * 9000)}`);
    setResetSubmitting(false);
  };

  // Handle confirm reset password
  const handleConfirmResetPassword = async () => {
    if (!studentToReset || !resetTempPassword || resetTempPassword.trim().length < 6) return;
    setResetSubmitting(true);
    try {
      await resetStudentPasswordAdmin(studentToReset.id, resetTempPassword.trim());
      setNotification({
        type: 'success',
        message: `Password reset successfully for ${studentToReset.name} (${studentToReset.studentId}). Temporary login credentials assigned and marked for mandatory update.`,
      });
      setStudentToReset(null);
      fetchStudents();
    } catch (err: any) {
      setNotification({ type: 'error', message: err.message || 'Failed to reset student password.' });
    } finally {
      setResetSubmitting(false);
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
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#164e37] hover:bg-[#113d2b] text-white font-bold text-xs rounded-xl shadow-xs transition-all cursor-pointer shrink-0 min-h-[44px]"
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
            className="text-slate-400 hover:text-slate-700 p-1 rounded-md cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Filters & Search Toolbar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-3">
          {/* Search Input */}
          <div className="md:col-span-5 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Student ID, Name, Username, or Email..."
              className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-700 focus:bg-white transition-all min-h-[42px]"
            />
          </div>

          {/* Class Filter */}
          <div className="md:col-span-3">
            <select
              value={filterClass}
              onChange={(e) => setFilterClass(e.target.value)}
              className="w-full py-2.5 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-emerald-700 min-h-[42px]"
            >
              <option value="ALL">All Classes</option>
              {uniqueClasses.map((cls) => (
                <option key={cls} value={cls}>
                  {cls}
                </option>
              ))}
            </select>
          </div>

          {/* Division Filter */}
          <div className="md:col-span-2">
            <select
              value={filterDivision}
              onChange={(e) => setFilterDivision(e.target.value)}
              className="w-full py-2.5 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-emerald-700 min-h-[42px]"
            >
              <option value="ALL">All Divisions</option>
              {uniqueDivisions.map((div) => (
                <option key={div} value={div}>
                  Division {div}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div className="md:col-span-2">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="w-full py-2.5 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-emerald-700 min-h-[42px]"
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
          {(searchQuery || filterClass !== 'ALL' || filterDivision !== 'ALL' || filterStatus !== 'ALL') && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setFilterClass('ALL');
                setFilterDivision('ALL');
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
                  <th className="py-3 px-4">Class</th>
                  <th className="py-3 px-4">Username</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Last Login</th>
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
                      <div>{st.name}</div>
                      <div className="text-[11px] text-slate-400 font-mono">{st.email}</div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-700 whitespace-nowrap">
                      <span className="font-medium">{st.className}</span>{' '}
                      <span className="text-slate-400 font-mono text-[11px]">
                        (Div {st.division || st.section || 'A'})
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-700 font-mono text-[11px]">
                      {st.username || <span className="text-slate-400 italic">Not set</span>}
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
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
                    <td className="py-3.5 px-4 text-slate-600 whitespace-nowrap">
                      {st.lastLogin ? (
                        <div className="flex items-center gap-1.5 text-[11px]">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          <span>
                            {new Date(st.lastLogin).toLocaleDateString(undefined, {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </span>
                        </div>
                      ) : (
                        <span className="text-slate-400 italic text-[11px]">Never</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          type="button"
                          onClick={() => setViewingStudent(st)}
                          className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                          title="View Profile"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleOpenEdit(st)}
                          className="p-1.5 text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors cursor-pointer"
                          title="Edit"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleOpenResetPassword(st)}
                          className="p-1.5 text-slate-500 hover:text-amber-700 hover:bg-amber-50 rounded-lg transition-colors cursor-pointer"
                          title="Reset Password"
                        >
                          <Key className="w-4 h-4 text-amber-600" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setStudentToToggle(st)}
                          className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                            st.accountStatus === 'Active'
                              ? 'text-amber-600 hover:bg-amber-50'
                              : 'text-emerald-600 hover:bg-emerald-50'
                          }`}
                          title={st.accountStatus === 'Active' ? 'Disable Access' : 'Enable Access'}
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
                          title="Delete"
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
                    <p className="text-xs text-slate-500 font-mono">
                      Username: {st.username || 'Not set'}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs py-2 border-t border-b border-slate-100">
                  <div>
                    <span className="text-[10px] uppercase text-slate-400 font-semibold block">Class & Div</span>
                    <span className="text-slate-800 font-medium">
                      {st.className} (Div {st.division || st.section || 'A'})
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-slate-400 font-semibold block">Last Login</span>
                    <span className="text-slate-800 font-medium">
                      {st.lastLogin ? new Date(st.lastLogin).toLocaleDateString() : 'Never'}
                    </span>
                  </div>
                </div>

                {/* Mobile Actions */}
                <div className="flex items-center justify-between gap-1.5 pt-1 flex-wrap">
                  <button
                    type="button"
                    onClick={() => setViewingStudent(st)}
                    className="flex-1 min-h-[42px] py-1.5 px-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleOpenEdit(st)}
                    className="flex-1 min-h-[42px] py-1.5 px-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleOpenResetPassword(st)}
                    className="flex-1 min-h-[42px] py-1.5 px-2 bg-amber-50 hover:bg-amber-100 text-amber-900 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <Key className="w-3.5 h-3.5 text-amber-600" />
                    <span>Reset</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setStudentToToggle(st)}
                    className={`min-h-[42px] py-1.5 px-2.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 cursor-pointer ${
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
                    className="min-h-[42px] p-2 text-rose-600 hover:bg-rose-50 rounded-lg cursor-pointer flex items-center justify-center"
                    aria-label="Delete Student"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* View Student Details Modal */}
      {viewingStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in overflow-y-auto">
          <div className="bg-white rounded-3xl shadow-2xl max-w-xl w-full overflow-hidden border border-slate-200 my-8">
            {/* Modal Header */}
            <div className="p-6 bg-[#0d281e] text-white relative">
              <button
                type="button"
                onClick={() => setViewingStudent(null)}
                className="absolute top-4 right-4 text-slate-300 hover:text-white p-1 rounded-lg hover:bg-white/10 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-4">
                {viewingStudent.profileImage || viewingStudent.photoUrl ? (
                  <img
                    src={viewingStudent.profileImage || viewingStudent.photoUrl}
                    alt={viewingStudent.name}
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-[#c59b27]/80 shadow-md bg-white"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-2xl bg-[#164e37] border-2 border-[#c59b27]/80 text-white flex items-center justify-center font-bold text-2xl shadow-md">
                    {viewingStudent.name.charAt(0)}
                  </div>
                )}
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#c59b27] block">
                    Student Profile Record
                  </span>
                  <h2 className="text-xl font-black text-white">{viewingStudent.name}</h2>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs font-mono text-emerald-200 font-bold bg-white/10 px-2 py-0.5 rounded-md">
                      ID: {viewingStudent.studentId}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                        viewingStudent.accountStatus === 'Active'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/30'
                          : 'bg-rose-500/20 text-rose-300 border border-rose-400/30'
                      }`}
                    >
                      {viewingStudent.accountStatus}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Content */}
            <div className="p-6 space-y-5 text-xs max-h-[65vh] overflow-y-auto">
              {/* Core Student Information Grid */}
              <div className="space-y-3">
                <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-1">
                  Enrolled Student Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-slate-400 font-semibold block text-[10px] uppercase">Permanent Student ID</span>
                    <span className="font-mono font-bold text-slate-800 text-xs">{viewingStudent.studentId}</span>
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-slate-400 font-semibold block text-[10px] uppercase">Portal Username</span>
                    <span className="font-mono font-bold text-slate-800 text-xs">
                      {viewingStudent.username || 'Not configured (Uses Student ID)'}
                    </span>
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-slate-400 font-semibold block text-[10px] uppercase">Full Student Name</span>
                    <span className="font-bold text-slate-800 text-xs">{viewingStudent.name}</span>
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-slate-400 font-semibold block text-[10px] uppercase">Class & Division</span>
                    <span className="font-bold text-slate-800 text-xs">
                      {viewingStudent.className} · Division {viewingStudent.division || viewingStudent.section || 'A'}
                    </span>
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-slate-400 font-semibold block text-[10px] uppercase">Date of Birth</span>
                    <span className="font-semibold text-slate-800 text-xs">
                      {viewingStudent.dob
                        ? new Date(viewingStudent.dob).toLocaleDateString(undefined, {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })
                        : 'Not provided'}
                    </span>
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-slate-400 font-semibold block text-[10px] uppercase">Student Phone</span>
                    <span className="font-semibold text-slate-800 text-xs">
                      {viewingStudent.studentPhone || viewingStudent.phone || 'Not provided'}
                    </span>
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-slate-400 font-semibold block text-[10px] uppercase">Parent / Guardian Name</span>
                    <span className="font-semibold text-slate-800 text-xs">
                      {viewingStudent.parentName || viewingStudent.guardianName || 'Not provided'}
                    </span>
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-slate-400 font-semibold block text-[10px] uppercase">Parent / Guardian Phone</span>
                    <span className="font-semibold text-slate-800 text-xs">
                      {viewingStudent.parentPhone || 'Not provided'}
                    </span>
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-slate-400 font-semibold block text-[10px] uppercase">Login Email</span>
                    <span className="font-mono font-semibold text-slate-800 text-xs">{viewingStudent.email}</span>
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-slate-400 font-semibold block text-[10px] uppercase">Academic Wing</span>
                    <span className="font-semibold text-slate-800 text-xs">{viewingStudent.department}</span>
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 sm:col-span-2">
                    <span className="text-slate-400 font-semibold block text-[10px] uppercase">Residential Address</span>
                    <span className="font-medium text-slate-700 text-xs">{viewingStudent.address || 'Not provided'}</span>
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-slate-400 font-semibold block text-[10px] uppercase">Last Portal Login</span>
                    <span className="font-medium text-slate-700 text-xs">
                      {viewingStudent.lastLogin
                        ? `${new Date(viewingStudent.lastLogin).toLocaleDateString(undefined, {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}, ${new Date(viewingStudent.lastLogin).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
                        : 'Never logged in'}
                    </span>
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-slate-400 font-semibold block text-[10px] uppercase">Account Created Date</span>
                    <span className="font-medium text-slate-700 text-xs">
                      {new Date(viewingStudent.createdAt).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                </div>
              </div>

              {/* ACCOUNT INFORMATION SECTION */}
              <div className="p-4 bg-emerald-50/70 border border-emerald-200/80 rounded-2xl space-y-3">
                <div className="flex items-center justify-between border-b border-emerald-200/60 pb-2">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-emerald-800" />
                    <h3 className="font-bold text-emerald-950 uppercase tracking-wider text-[11px]">
                      Account Information & Security
                    </h3>
                  </div>
                  <span className="text-[10px] font-semibold text-emerald-800">
                    Protected Credentials
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-emerald-900/70 font-semibold block text-[10px] uppercase">Username</span>
                    <span className="font-mono font-bold text-emerald-950 text-xs">
                      {viewingStudent.username || viewingStudent.studentId}
                    </span>
                  </div>
                  <div>
                    <span className="text-emerald-900/70 font-semibold block text-[10px] uppercase">Account Status</span>
                    <span
                      className={`inline-flex items-center gap-1 font-bold text-xs ${
                        viewingStudent.accountStatus === 'Active' ? 'text-emerald-800' : 'text-rose-800'
                      }`}
                    >
                      {viewingStudent.accountStatus}
                    </span>
                  </div>
                  <div className="sm:col-span-2 flex items-center justify-between p-3 bg-white border border-emerald-200 rounded-xl">
                    <div>
                      <span className="text-slate-500 font-semibold block text-[10px] uppercase">Password</span>
                      <span className="font-mono font-bold text-slate-800 text-sm tracking-widest">
                        ••••••••
                      </span>
                      <p className="text-[10px] text-slate-400 mt-0.5">
                        Passwords are encrypted and never visible to administrators.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        const target = viewingStudent;
                        setViewingStudent(null);
                        handleOpenResetPassword(target);
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-2 bg-[#164e37] hover:bg-[#113d2b] text-white text-xs font-bold rounded-xl shadow-xs transition-all cursor-pointer"
                    >
                      <Key className="w-3.5 h-3.5 text-[#c59b27]" />
                      <span>Reset Password</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => {
                  const target = viewingStudent;
                  setViewingStudent(null);
                  handleOpenEdit(target);
                }}
                className="px-4 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <Edit2 className="w-3.5 h-3.5 text-emerald-700" />
                <span>Edit Student</span>
              </button>
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

      {/* Add / Edit Student Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto animate-in fade-in">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden border border-slate-200 my-8">
            <div className="p-6 bg-[#0d281e] text-white flex items-center justify-between border-b border-[#1a4434]">
              <div>
                <h2 className="text-lg font-bold text-white">
                  {editingStudent ? 'Edit Student Record' : 'Register New Student'}
                </h2>
                <p className="text-xs text-emerald-200/80">
                  {editingStudent
                    ? `Updating details for Student ID: ${editingStudent.studentId}`
                    : 'Set up enrolled student profile and portal login credentials'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsFormOpen(false)}
                className="text-slate-300 hover:text-white p-1 rounded-lg hover:bg-white/10 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              {formError && (
                <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-2.5 text-xs text-rose-800">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <span>{formError}</span>
                </div>
              )}

              {/* Student Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-700 focus:bg-white min-h-[42px]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Custom Username (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.username || ''}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value.toLowerCase() })}
                    placeholder="e.g. rayan_sk"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-700 focus:bg-white min-h-[42px]"
                  />
                  <span className="text-[10px] text-slate-400 mt-0.5 block">
                    Student can log in using either Student ID or this username.
                  </span>
                </div>
              </div>

              {/* Student ID & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Student ID (Unique Permanent ID) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.studentId}
                    onChange={(e) => setFormData({ ...formData, studentId: e.target.value.toUpperCase() })}
                    placeholder="SK-2025-001"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-mono font-bold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-700 focus:bg-white min-h-[42px]"
                  />
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
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-700 focus:bg-white min-h-[42px]"
                  />
                </div>
              </div>

              {/* Class, Division, and Date of Birth */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Class / Level *
                  </label>
                  <select
                    value={formData.className}
                    onChange={(e) => setFormData({ ...formData, className: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-700 min-h-[42px]"
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
                    Division *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.division || ''}
                    onChange={(e) => setFormData({ ...formData, division: e.target.value.toUpperCase() })}
                    placeholder="A"
                    maxLength={5}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-700 focus:bg-white min-h-[42px]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    value={formData.dob || ''}
                    onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-700 focus:bg-white min-h-[42px]"
                  />
                </div>
              </div>

              {/* Parents & Phone details */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Parent / Guardian Name
                  </label>
                  <input
                    type="text"
                    value={formData.parentName || ''}
                    onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                    placeholder="Parent's Name"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-700 focus:bg-white min-h-[42px]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Parent / Guardian Phone
                  </label>
                  <input
                    type="tel"
                    value={formData.parentPhone || ''}
                    onChange={(e) => setFormData({ ...formData, parentPhone: e.target.value })}
                    placeholder="+91 98460 00000"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-700 focus:bg-white min-h-[42px]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Student Phone
                  </label>
                  <input
                    type="tel"
                    value={formData.studentPhone || ''}
                    onChange={(e) => setFormData({ ...formData, studentPhone: e.target.value })}
                    placeholder="+91 98460 11111"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-700 focus:bg-white min-h-[42px]"
                  />
                </div>
              </div>

              {/* Address & Profile Image */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Residential Address
                  </label>
                  <input
                    type="text"
                    value={formData.address || ''}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="House name, street, place"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-700 focus:bg-white min-h-[42px]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Profile Photo URL (Optional)
                  </label>
                  <input
                    type="url"
                    value={formData.profileImage || ''}
                    onChange={(e) => setFormData({ ...formData, profileImage: e.target.value })}
                    placeholder="https://..."
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-700 focus:bg-white min-h-[42px]"
                  />
                </div>
              </div>

              {/* Department, Academic Year & Account Status */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Academic Wing *
                  </label>
                  <select
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-700 min-h-[42px]"
                  >
                    <option value="Islamic Studies & Moral Science">Islamic Studies & Moral Science</option>
                    <option value="Science & Mathematics">Science & Mathematics</option>
                    <option value="Languages & Literature">Languages & Literature</option>
                    <option value="Social Studies & Humanities">Social Studies & Humanities</option>
                    <option value="Information & Digital Technology">Information & Digital Technology</option>
                    <option value="Primary & Foundation Wing">Primary & Foundation Wing</option>
                  </select>
                </div>

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
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-700 focus:bg-white min-h-[42px]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Account Status *
                  </label>
                  <select
                    value={formData.accountStatus}
                    onChange={(e) => setFormData({ ...formData, accountStatus: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-700 min-h-[42px]"
                  >
                    <option value="Active">Active (Allows Portal Login)</option>
                    <option value="Disabled">Disabled (Blocks Portal Login)</option>
                  </select>
                </div>
              </div>

              {!editingStudent && (
                <div className="space-y-2 p-3.5 rounded-xl bg-emerald-50/80 border border-emerald-200">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-emerald-950 uppercase tracking-wider flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5 text-emerald-700" />
                      Initial Temporary Password *
                    </label>
                    <button
                      type="button"
                      onClick={() =>
                        setFormData({
                          ...formData,
                          initialPassword: `Sharaf@${Math.floor(1000 + Math.random() * 9000)}`,
                        })
                      }
                      className="text-[11px] font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 cursor-pointer"
                    >
                      <RefreshCw className="w-3 h-3" />
                      Generate
                    </button>
                  </div>
                  <input
                    type="text"
                    required
                    value={formData.initialPassword || ''}
                    onChange={(e) => setFormData({ ...formData, initialPassword: e.target.value })}
                    placeholder="Initial login password (min 6 characters)"
                    className="w-full px-3.5 py-2.5 bg-white border border-emerald-300 rounded-xl text-xs font-mono font-bold text-emerald-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-700 min-h-[42px]"
                  />
                  <p className="text-[11px] text-emerald-800 leading-normal">
                    The student will sign in using their <strong>Student ID</strong> and this temporary password. They will immediately be required to set a private password upon first sign-in.
                  </p>
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
                  className="px-5 py-2.5 bg-[#164e37] hover:bg-[#113d2b] text-white font-bold text-xs rounded-xl shadow-xs transition-all cursor-pointer disabled:opacity-50 flex items-center gap-2 min-h-[42px]"
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

      {/* Reset Student Password Modal */}
      {studentToReset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden border border-slate-200">
            <div className="p-6 bg-[#0d281e] text-white flex items-center justify-between border-b border-[#1a4434]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-400">
                  <Key className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-white">Reset Student Password</h2>
                  <p className="text-xs text-emerald-200/80">
                    Assign a new temporary login password
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setStudentToReset(null)}
                className="text-slate-300 hover:text-white p-1 rounded-lg hover:bg-white/10 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs space-y-1.5">
                <div className="font-bold text-slate-800">{studentToReset.name}</div>
                <div className="text-slate-500 font-mono">
                  Permanent Student ID: <strong className="text-emerald-800">{studentToReset.studentId}</strong>
                </div>
                <div className="flex items-center justify-between text-slate-500 pt-1 border-t border-slate-200/60">
                  <span>Current Password:</span>
                  <span className="font-mono font-bold text-slate-800">••••••••</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    New Temporary Password *
                  </label>
                  <button
                    type="button"
                    onClick={() => setResetTempPassword(`Sharaf@${Math.floor(1000 + Math.random() * 9000)}`)}
                    className="text-[11px] font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 cursor-pointer"
                  >
                    <RefreshCw className="w-3 h-3" />
                    Generate
                  </button>
                </div>
                <input
                  type="text"
                  value={resetTempPassword}
                  onChange={(e) => setResetTempPassword(e.target.value)}
                  placeholder="Enter temporary password (min 6 chars)"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-mono font-bold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-700 focus:bg-white min-h-[42px]"
                />
                <p className="text-[11px] text-slate-500 leading-relaxed pt-1">
                  The student’s actual password is secure and not exposed. Upon entering this new temporary password, the student will be required to set a private password before accessing their dashboard.
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setStudentToReset(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={resetSubmitting || resetTempPassword.trim().length < 6}
                  onClick={handleConfirmResetPassword}
                  className="px-5 py-2.5 bg-[#0e3827] hover:bg-[#164e37] text-white font-bold text-xs rounded-xl shadow-xs transition-all cursor-pointer disabled:opacity-50 flex items-center gap-2 min-h-[42px]"
                >
                  {resetSubmitting ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Updating...</span>
                    </>
                  ) : (
                    <>
                      <Key className="w-3.5 h-3.5 text-[#c59b27]" />
                      <span>Confirm Password Reset</span>
                    </>
                  )}
                </button>
              </div>
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
