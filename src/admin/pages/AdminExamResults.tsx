import React, { useState, useEffect, useMemo } from 'react';
import {
  Award,
  BookOpen,
  Calendar,
  CheckCircle2,
  ClipboardList,
  Edit2,
  Loader2,
  Plus,
  Search,
  Sliders,
  Trash2,
  Users,
  X,
  Eye,
  EyeOff,
  AlertCircle
} from 'lucide-react';
import {
  getExaminationsAdmin,
  saveExaminationAdmin,
  deleteExaminationAdmin,
  publishExaminationAdmin,
  getExamResultsAdmin,
  saveExamResultAdmin,
  deleteExamResultAdmin,
  bulkDeleteExamResultsAdmin,
  getStudentsAdmin,
  getSubjectsAdmin,
  saveSubjectAdmin,
  deleteSubjectAdmin,
  getGradingScalesAdmin,
  saveGradingScaleAdmin
} from '../../services/adminService';
import { ConfirmModal } from '../components/ConfirmModal';
import {
  calculateGrade,
  calculatePercentage,
  getGradeBadgeStyle,
  DEFAULT_GRADING_SCALE
} from '../../utils/gradingUtils';
import type {
  ExaminationItem,
  ExamResultItem,
  StudentDocument,
  SubjectItem,
  GradeTier
} from '../../types/firestore';

export const AdminExamResults: React.FC = () => {
  // Main Data States
  const [loading, setLoading] = useState(true);
  const [examinations, setExaminations] = useState<ExaminationItem[]>([]);
  const [results, setResults] = useState<ExamResultItem[]>([]);
  const [students, setStudents] = useState<StudentDocument[]>([]);
  const [subjects, setSubjects] = useState<SubjectItem[]>([]);

  // Selected Exam for Deep Result Entry
  const [selectedExamId, setSelectedExamId] = useState<string | null>(null);

  // Search & Filters for Exams
  const [examSearch, setExamSearch] = useState('');
  const [examStatusFilter, setExamStatusFilter] = useState<'All' | 'Draft' | 'Published'>('All');
  const [examYearFilter, setExamYearFilter] = useState('All');
  const [examClassFilter, setExamClassFilter] = useState('All');

  // Search & Filters for Results Table
  const [resultSearch, setResultSearch] = useState('');
  const [resultSubjectFilter, setResultSubjectFilter] = useState('All');
  const [selectedResultIds, setSelectedResultIds] = useState<Set<string>>(new Set());

  // Modals
  const [isExamModalOpen, setIsExamModalOpen] = useState(false);
  const [editingExam, setEditingExam] = useState<ExaminationItem | null>(null);

  const [isResultModalOpen, setIsResultModalOpen] = useState(false);
  const [editingResult, setEditingResult] = useState<ExamResultItem | null>(null);

  const [isSubjectModalOpen, setIsSubjectModalOpen] = useState(false);
  const [isGradingModalOpen, setIsGradingModalOpen] = useState(false);

  // Confirm Modals
  const [deleteConfirm, setDeleteConfirm] = useState<{
    isOpen: boolean;
    type: 'exam' | 'result' | 'bulkResults' | 'subject';
    id?: string;
    name?: string;
  }>({ isOpen: false, type: 'exam' });

  // Form States
  const [examForm, setExamForm] = useState({
    examName: '',
    academicYear: '2025–2026',
    className: 'Class 5 - Intermediate',
    division: 'A',
    examDate: new Date().toISOString().split('T')[0],
    description: '',
    status: 'Draft' as 'Draft' | 'Published',
  });

  const [resultForm, setResultForm] = useState({
    studentUid: '',
    studentId: '',
    studentName: '',
    className: '',
    division: '',
    subjectName: '',
    marksObtained: '',
    maximumMarks: '100',
  });
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Subject Form
  const [subjectForm, setSubjectForm] = useState({ name: '', code: '', department: '' });
  const [subjectError, setSubjectError] = useState<string | null>(null);

  // Grading Form
  const [activeTiers, setActiveTiers] = useState<GradeTier[]>(DEFAULT_GRADING_SCALE);
  const [gradingSuccess, setGradingSuccess] = useState<string | null>(null);

  // Fetch all data
  const loadData = async () => {
    setLoading(true);
    try {
      const [exData, resData, stdData, subData, gradeData] = await Promise.all([
        getExaminationsAdmin(),
        getExamResultsAdmin(),
        getStudentsAdmin(),
        getSubjectsAdmin(),
        getGradingScalesAdmin(),
      ]);
      setExaminations(exData);
      setResults(resData);
      setStudents(stdData);
      setSubjects(subData);
      if (gradeData.length > 0 && gradeData[0].tiers) {
        setActiveTiers(gradeData[0].tiers);
      }
    } catch (err) {
      console.error('[AdminExamResults] Error loading exam results data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Selected Exam Object
  const currentExam = useMemo(() => {
    return examinations.find((e) => e.id === selectedExamId) || null;
  }, [examinations, selectedExamId]);

  // Filtered Examinations
  const filteredExams = useMemo(() => {
    return examinations.filter((exam) => {
      const matchesSearch =
        exam.examName.toLowerCase().includes(examSearch.toLowerCase()) ||
        exam.className.toLowerCase().includes(examSearch.toLowerCase());
      const matchesStatus =
        examStatusFilter === 'All' || exam.status === examStatusFilter;
      const matchesYear =
        examYearFilter === 'All' || exam.academicYear === examYearFilter;
      const matchesClass =
        examClassFilter === 'All' || exam.className === examClassFilter;

      return matchesSearch && matchesStatus && matchesYear && matchesClass;
    });
  }, [examinations, examSearch, examStatusFilter, examYearFilter, examClassFilter]);

  // Results for Currently Selected Exam or All
  const displayedResults = useMemo(() => {
    return results.filter((res) => {
      const matchesExam = selectedExamId ? res.examId === selectedExamId : true;
      const matchesSearch =
        res.studentName.toLowerCase().includes(resultSearch.toLowerCase()) ||
        res.studentId.toLowerCase().includes(resultSearch.toLowerCase()) ||
        res.subjectName.toLowerCase().includes(resultSearch.toLowerCase());
      const matchesSubject =
        resultSubjectFilter === 'All' || res.subjectName === resultSubjectFilter;

      return matchesExam && matchesSearch && matchesSubject;
    });
  }, [results, selectedExamId, resultSearch, resultSubjectFilter]);

  // Unique Filter Options
  const availableYears = useMemo(() => {
    const years = Array.from(new Set(examinations.map((e) => e.academicYear).filter(Boolean)));
    return ['All', ...years];
  }, [examinations]);

  const availableClasses = useMemo(() => {
    const cls = Array.from(new Set(examinations.map((e) => e.className).filter(Boolean)));
    return ['All', ...cls];
  }, [examinations]);

  const availableSubjectsList = useMemo(() => {
    if (subjects.length > 0) {
      return subjects.filter((s) => s.status !== 'Inactive').map((s) => s.name);
    }
    // Fallback subject list if none configured yet
    return [
      "Qur'an Recitation & Tajweed",
      'Islamic Studies & Fiqh',
      'Arabic Language',
      'English Language',
      'Mathematics',
      'Moral Science',
      'Social Studies',
      'General Science'
    ];
  }, [subjects]);

  // Real Statistics (Strict real data only)
  const stats = useMemo(() => {
    const totalExams = examinations.length;
    const publishedExams = examinations.filter((e) => e.status === 'Published').length;
    const draftExams = examinations.filter((e) => e.status === 'Draft').length;
    const uniqueStudents = new Set(results.map((r) => r.studentUid || r.studentId)).size;
    const totalRecords = results.length;

    return {
      totalExams,
      publishedExams,
      draftExams,
      uniqueStudents,
      totalRecords,
    };
  }, [examinations, results]);

  // Open Exam Create / Edit Modal
  const handleOpenExamModal = (exam?: ExaminationItem) => {
    if (exam) {
      setEditingExam(exam);
      setExamForm({
        examName: exam.examName,
        academicYear: exam.academicYear,
        className: exam.className,
        division: exam.division || 'A',
        examDate: exam.examDate,
        description: exam.description || '',
        status: exam.status,
      });
    } else {
      setEditingExam(null);
      setExamForm({
        examName: '',
        academicYear: '2025–2026',
        className: 'Class 5 - Intermediate',
        division: 'A',
        examDate: new Date().toISOString().split('T')[0],
        description: '',
        status: 'Draft',
      });
    }
    setFormError(null);
    setIsExamModalOpen(true);
  };

  const handleSaveExam = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!examForm.examName.trim()) {
      setFormError('Examination name is required.');
      return;
    }
    setSubmitting(true);
    setFormError(null);
    try {
      const saved = await saveExaminationAdmin({
        id: editingExam?.id,
        examName: examForm.examName.trim(),
        academicYear: examForm.academicYear.trim(),
        className: examForm.className.trim(),
        division: examForm.division.trim(),
        examDate: examForm.examDate,
        description: examForm.description.trim(),
        status: examForm.status,
      });
      setIsExamModalOpen(false);
      await loadData();
      if (!selectedExamId) {
        setSelectedExamId(saved.id);
      }
    } catch (err: any) {
      setFormError(err.message || 'Failed to save examination.');
    } finally {
      setSubmitting(false);
    }
  };

  // Toggle Publish / Unpublish Examination
  const handleTogglePublishExam = async (exam: ExaminationItem) => {
    const newStatus = exam.status === 'Published' ? false : true;
    try {
      await publishExaminationAdmin(exam.id, newStatus);
      await loadData();
    } catch (err) {
      console.error('Failed to toggle publish status:', err);
    }
  };

  // Open Result Entry Modal
  const handleOpenResultModal = (res?: ExamResultItem) => {
    if (res) {
      setEditingResult(res);
      setResultForm({
        studentUid: res.studentUid,
        studentId: res.studentId,
        studentName: res.studentName,
        className: res.class,
        division: res.division || '',
        subjectName: res.subjectName,
        marksObtained: String(res.marksObtained),
        maximumMarks: String(res.maximumMarks),
      });
    } else {
      setEditingResult(null);
      // Auto pre-populate class from current exam if selected
      const initialClass = currentExam ? currentExam.className : '';
      const initialDiv = currentExam ? currentExam.division || '' : '';
      setResultForm({
        studentUid: '',
        studentId: '',
        studentName: '',
        className: initialClass,
        division: initialDiv,
        subjectName: availableSubjectsList[0] || 'Islamic Studies',
        marksObtained: '',
        maximumMarks: '100',
      });
    }
    setFormError(null);
    setIsResultModalOpen(true);
  };

  // Student Selector Change
  const handleSelectStudent = (stdId: string) => {
    const std = students.find((s) => s.id === stdId || s.uid === stdId || s.studentId === stdId);
    if (std) {
      setResultForm((prev) => ({
        ...prev,
        studentUid: std.uid || std.id,
        studentId: std.studentId,
        studentName: std.name,
        className: std.className || prev.className,
        division: std.division || std.section || prev.division,
      }));
    }
  };

  // Save Result Entry
  const handleSaveResult = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentExam && !editingResult) {
      setFormError('Please select or specify an examination first.');
      return;
    }
    if (!resultForm.studentId || !resultForm.studentName) {
      setFormError('Please select an active student.');
      return;
    }
    if (!resultForm.subjectName.trim()) {
      setFormError('Subject name is required.');
      return;
    }
    const marks = parseFloat(resultForm.marksObtained);
    const maxMarks = parseFloat(resultForm.maximumMarks);

    if (isNaN(marks) || marks < 0) {
      setFormError('Marks obtained must be a positive number.');
      return;
    }
    if (isNaN(maxMarks) || maxMarks <= 0) {
      setFormError('Maximum marks must be greater than zero.');
      return;
    }
    if (marks > maxMarks) {
      setFormError(`Marks obtained (${marks}) cannot exceed maximum marks (${maxMarks}).`);
      return;
    }

    setSubmitting(true);
    setFormError(null);
    try {
      const examTarget = currentExam || examinations.find((e) => e.id === editingResult?.examId);
      await saveExamResultAdmin({
        id: editingResult?.id,
        examId: examTarget ? examTarget.id : (editingResult?.examId || 'exam-default'),
        examName: examTarget ? examTarget.examName : (editingResult?.examName || 'Examination'),
        academicYear: examTarget ? examTarget.academicYear : (editingResult?.academicYear || '2025–2026'),
        class: resultForm.className || examTarget?.className || 'Class 5',
        division: resultForm.division || examTarget?.division || '',
        studentUid: resultForm.studentUid,
        studentId: resultForm.studentId,
        studentName: resultForm.studentName,
        subjectId: `subj-${resultForm.subjectName.replace(/\s+/g, '-').toLowerCase()}`,
        subjectName: resultForm.subjectName.trim(),
        marksObtained: marks,
        maximumMarks: maxMarks,
        published: examTarget ? examTarget.status === 'Published' : false,
      });

      setIsResultModalOpen(false);
      await loadData();
    } catch (err: any) {
      setFormError(err.message || 'Failed to save examination result score.');
    } finally {
      setSubmitting(false);
    }
  };

  // Delete Confirm Action
  const handleConfirmDelete = async () => {
    if (!deleteConfirm.id && deleteConfirm.type !== 'bulkResults') return;
    try {
      if (deleteConfirm.type === 'exam') {
        await deleteExaminationAdmin(deleteConfirm.id!);
        if (selectedExamId === deleteConfirm.id) {
          setSelectedExamId(null);
        }
      } else if (deleteConfirm.type === 'result') {
        await deleteExamResultAdmin(deleteConfirm.id!);
      } else if (deleteConfirm.type === 'bulkResults') {
        await bulkDeleteExamResultsAdmin(Array.from(selectedResultIds));
        setSelectedResultIds(new Set());
      } else if (deleteConfirm.type === 'subject') {
        await deleteSubjectAdmin(deleteConfirm.id!);
      }
      setDeleteConfirm({ isOpen: false, type: 'exam' });
      await loadData();
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  // Add Subject Form
  const handleAddSubject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subjectForm.name.trim()) {
      setSubjectError('Subject name is required.');
      return;
    }
    setSubjectError(null);
    try {
      await saveSubjectAdmin({
        name: subjectForm.name.trim(),
        code: subjectForm.code.trim() || undefined,
        department: subjectForm.department.trim() || undefined,
        status: 'Active',
      });
      setSubjectForm({ name: '', code: '', department: '' });
      await loadData();
    } catch (err: any) {
      setSubjectError(err.message || 'Failed to add subject.');
    }
  };

  // Save Grading Scale
  const handleSaveGrading = async () => {
    try {
      await saveGradingScaleAdmin({
        id: 'scale-default',
        name: 'Standard School Grading Scale',
        tiers: activeTiers,
        isDefault: true,
      });
      setGradingSuccess('Grading policy successfully saved and updated!');
      setTimeout(() => setGradingSuccess(null), 3000);
      await loadData();
    } catch (err) {
      console.error('Failed to save grading scale:', err);
    }
  };

  // Live calculation helpers for modal
  const livePercentage = useMemo(() => {
    const obt = parseFloat(resultForm.marksObtained);
    const max = parseFloat(resultForm.maximumMarks);
    return calculatePercentage(obt, max);
  }, [resultForm.marksObtained, resultForm.maximumMarks]);

  const liveGrade = useMemo(() => {
    return calculateGrade(livePercentage, activeTiers);
  }, [livePercentage, activeTiers]);

  // Bulk Selection Handlers
  const handleSelectAllResults = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedResultIds(new Set(displayedResults.map((r) => r.id)));
    } else {
      setSelectedResultIds(new Set());
    }
  };

  const handleToggleSelectResult = (id: string) => {
    setSelectedResultIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="space-y-6 pb-12 font-sans text-slate-800">
      {/* ── 1. Page Header with Actions ────────────────────────────── */}
      <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#e5e0d5] p-5 sm:p-7 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-full bg-[#164e37]/10 text-[#164e37] text-[10px] font-bold uppercase tracking-widest border border-[#164e37]/20">
                Academic Evaluation Engine
              </span>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs font-semibold text-slate-500">Real Data Only</span>
            </div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-[#0f231c] tracking-tight">
              Exam Results Management
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
              Create examinations, publish student mark sheets, configure grading thresholds, and enter scores with real-time percentage calculations.
            </p>
          </div>

          {/* Action Button Strip */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
            <button
              type="button"
              onClick={() => setIsSubjectModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-xl border border-[#d2cabb] bg-[#fbfaf7] hover:bg-white text-xs font-bold text-[#0f231c] shadow-2xs transition-all cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-[#164e37]" />
              <span>Subjects</span>
            </button>

            <button
              type="button"
              onClick={() => setIsGradingModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-xl border border-[#d2cabb] bg-[#fbfaf7] hover:bg-white text-xs font-bold text-[#0f231c] shadow-2xs transition-all cursor-pointer"
            >
              <Sliders className="w-4 h-4 text-[#c59b27]" />
              <span>Grading Policy</span>
            </button>

            <button
              type="button"
              onClick={() => handleOpenExamModal()}
              className="inline-flex items-center gap-1.5 px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl bg-[#164e37] hover:bg-[#0f3b29] text-xs sm:text-sm font-bold text-white shadow-xs transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4 text-[#c59b27]" />
              <span>New Examination</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── 2. Real Statistics Overview Cards ──────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#e5e0d5] shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Examinations</span>
            <ClipboardList className="w-4 h-4 text-[#164e37]" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-[#0f231c]">{stats.totalExams}</p>
          <span className="text-[10px] text-slate-400 mt-1">Total created</span>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#e5e0d5] shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Published</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-emerald-700">{stats.publishedExams}</p>
          <span className="text-[10px] text-emerald-600/80 mt-1">Live in student portal</span>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#e5e0d5] shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Drafts</span>
            <EyeOff className="w-4 h-4 text-amber-600" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-amber-700">{stats.draftExams}</p>
          <span className="text-[10px] text-amber-600/80 mt-1">Private to admin</span>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#e5e0d5] shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Students Evaluated</span>
            <Users className="w-4 h-4 text-[#164e37]" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-[#0f231c]">{stats.uniqueStudents}</p>
          <span className="text-[10px] text-slate-400 mt-1">With recorded scores</span>
        </div>

        <div className="col-span-2 lg:col-span-1 bg-white p-4 sm:p-5 rounded-2xl border border-[#e5e0d5] shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Result Records</span>
            <Award className="w-4 h-4 text-[#c59b27]" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-[#0f231c]">{stats.totalRecords}</p>
          <span className="text-[10px] text-slate-400 mt-1">Subject scores entered</span>
        </div>
      </div>

      {/* ── 3. Examination Selection / Management Deck ─────────────── */}
      <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#e5e0d5] p-4 sm:p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#ede8de]">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-[#0f231c]">
              Examinations Schedule & Cycles
            </h2>
            <p className="text-xs text-slate-500">
              Select an exam cycle to enter and review individual student mark sheets.
            </p>
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative min-w-[140px] sm:min-w-[180px]">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={examSearch}
                onChange={(e) => setExamSearch(e.target.value)}
                placeholder="Search exam..."
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-[#fbfaf7] border border-[#d2cabb] rounded-xl focus:outline-none focus:border-[#164e37]"
              />
            </div>

            <select
              value={examStatusFilter}
              onChange={(e) => setExamStatusFilter(e.target.value as any)}
              className="text-xs bg-[#fbfaf7] border border-[#d2cabb] rounded-xl px-2.5 py-1.5 focus:outline-none focus:border-[#164e37]"
            >
              <option value="All">All Statuses</option>
              <option value="Published">Published</option>
              <option value="Draft">Draft</option>
            </select>

            <select
              value={examYearFilter}
              onChange={(e) => setExamYearFilter(e.target.value)}
              className="text-xs bg-[#fbfaf7] border border-[#d2cabb] rounded-xl px-2.5 py-1.5 focus:outline-none focus:border-[#164e37]"
            >
              {availableYears.map((yr) => (
                <option key={yr} value={yr}>
                  {yr === 'All' ? 'All Academic Years' : yr}
                </option>
              ))}
            </select>

            <select
              value={examClassFilter}
              onChange={(e) => setExamClassFilter(e.target.value)}
              className="text-xs bg-[#fbfaf7] border border-[#d2cabb] rounded-xl px-2.5 py-1.5 focus:outline-none focus:border-[#164e37]"
            >
              {availableClasses.map((cls) => (
                <option key={cls} value={cls}>
                  {cls === 'All' ? 'All Classes' : cls}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Examination Cards / Carousel */}
        {loading ? (
          <div className="py-12 flex flex-col items-center justify-center text-slate-400">
            <Loader2 className="w-7 h-7 text-[#164e37] animate-spin mb-2" />
            <span className="text-xs">Loading examinations from Firebase...</span>
          </div>
        ) : filteredExams.length === 0 ? (
          <div className="py-12 text-center bg-[#fbfaf7] rounded-2xl border border-dashed border-[#d2cabb] px-4">
            <ClipboardList className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <h3 className="text-sm font-bold text-slate-700">No examination data available yet.</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
              Click &quot;New Examination&quot; to initialize a real exam cycle and start entering student grades.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {filteredExams.map((exam) => {
              const isSelected = selectedExamId === exam.id;
              const isPublished = exam.status === 'Published';
              const examResultCount = results.filter((r) => r.examId === exam.id).length;

              return (
                <div
                  key={exam.id}
                  onClick={() => setSelectedExamId(isSelected ? null : exam.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer relative flex flex-col justify-between min-h-[170px] ${
                    isSelected
                      ? 'border-[#164e37] bg-[#f4f9f6] shadow-sm ring-2 ring-[#164e37]/20'
                      : 'border-[#e5e0d5] bg-white hover:border-[#164e37]/50 hover:shadow-2xs'
                  }`}
                >
                  {/* Top Bar: Badges & Controls */}
                  <div className="flex items-start justify-between gap-2">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        isPublished
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                          : 'bg-amber-100 text-amber-800 border border-amber-200'
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${isPublished ? 'bg-emerald-600' : 'bg-amber-600'}`} />
                      <span>{exam.status}</span>
                    </span>

                    {/* Action buttons */}
                    <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                      <button
                        type="button"
                        onClick={() => handleTogglePublishExam(exam)}
                        title={isPublished ? 'Unpublish from Student Portal' : 'Publish to Student Portal'}
                        className="p-1 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-[#164e37] transition-colors"
                      >
                        {isPublished ? <Eye className="w-3.5 h-3.5 text-emerald-600" /> : <EyeOff className="w-3.5 h-3.5 text-amber-600" />}
                      </button>

                      <button
                        type="button"
                        onClick={() => handleOpenExamModal(exam)}
                        title="Edit Examination"
                        className="p-1 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-[#164e37] transition-colors"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          setDeleteConfirm({
                            isOpen: true,
                            type: 'exam',
                            id: exam.id,
                            name: exam.examName,
                          })
                        }
                        title="Delete Examination"
                        className="p-1 rounded-lg hover:bg-rose-50 text-slate-400 hover:text-rose-600 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Body Details */}
                  <div className="my-2.5">
                    <h3 className="text-sm sm:text-base font-extrabold text-[#0f231c] leading-snug line-clamp-1">
                      {exam.examName}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {exam.className} {exam.division ? `· Div ${exam.division}` : ''}
                    </p>
                    {exam.description && (
                      <p className="text-[11px] text-slate-400 line-clamp-1 mt-1">{exam.description}</p>
                    )}
                  </div>

                  {/* Footer Meta */}
                  <div className="pt-2 border-t border-[#ede8de] flex items-center justify-between text-[11px] text-slate-500">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#164e37]" />
                      <span>{exam.examDate}</span>
                    </div>
                    <span className="font-semibold text-[#164e37]">
                      {examResultCount} {examResultCount === 1 ? 'Score' : 'Scores'} Entered
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ── 4. Result Entry & Management Table for Selected Exam ───── */}
      <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#e5e0d5] p-4 sm:p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#ede8de]">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#164e37] uppercase tracking-wider bg-[#f4f1ea] px-2 py-0.5 rounded border border-[#d2cabb]">
                {currentExam ? currentExam.examName : 'All Examinations'}
              </span>
              {currentExam && (
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    currentExam.status === 'Published'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {currentExam.status}
                </span>
              )}
            </div>
            <h2 className="text-base sm:text-lg font-bold text-[#0f231c] mt-1">
              Student Subject Scores & Evaluations
            </h2>
            <p className="text-xs text-slate-500">
              {currentExam
                ? `Entering records for ${currentExam.className} (${currentExam.academicYear})`
                : 'Showing all recorded examination scores across active cycles.'}
            </p>
          </div>

          {/* Action Tools */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative min-w-[140px] sm:min-w-[180px]">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={resultSearch}
                onChange={(e) => setResultSearch(e.target.value)}
                placeholder="Search student or subject..."
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-[#fbfaf7] border border-[#d2cabb] rounded-xl focus:outline-none focus:border-[#164e37]"
              />
            </div>

            <select
              value={resultSubjectFilter}
              onChange={(e) => setResultSubjectFilter(e.target.value)}
              className="text-xs bg-[#fbfaf7] border border-[#d2cabb] rounded-xl px-2.5 py-1.5 focus:outline-none focus:border-[#164e37]"
            >
              <option value="All">All Subjects</option>
              {availableSubjectsList.map((sub) => (
                <option key={sub} value={sub}>{sub}</option>
              ))}
            </select>

            {selectedResultIds.size > 0 && (
              <button
                type="button"
                onClick={() =>
                  setDeleteConfirm({
                    isOpen: true,
                    type: 'bulkResults',
                  })
                }
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 rounded-xl text-xs font-bold transition-all cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Selected ({selectedResultIds.size})</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => handleOpenResultModal()}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#164e37] hover:bg-[#0f3b29] text-xs font-bold text-white shadow-2xs transition-all cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 text-[#c59b27]" />
              <span>Enter Score</span>
            </button>
          </div>
        </div>

        {/* Results Presentation (Desktop Table / Mobile Stacked Cards) */}
        {displayedResults.length === 0 ? (
          <div className="py-16 text-center bg-[#fbfaf7] rounded-2xl border border-dashed border-[#d2cabb] px-4">
            <Award className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <h3 className="text-sm font-bold text-slate-700">No results entered yet.</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
              Select an examination above and click &quot;Enter Score&quot; to register marks for active students.
            </p>
          </div>
        ) : (
          <>
            {/* Desktop Table View (>= 768px) */}
            <div className="hidden md:block overflow-x-auto rounded-xl border border-[#e5e0d5]">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-[#f4f1ea] text-[#124432] uppercase text-[10px] tracking-wider font-bold border-b border-[#d2cabb]">
                  <tr>
                    <th className="p-3 w-10 text-center">
                      <input
                        type="checkbox"
                        checked={
                          displayedResults.length > 0 &&
                          selectedResultIds.size === displayedResults.length
                        }
                        onChange={handleSelectAllResults}
                        className="rounded border-[#d2cabb] text-[#164e37] focus:ring-[#164e37]"
                      />
                    </th>
                    <th className="p-3">Student</th>
                    <th className="p-3">Class / Div</th>
                    <th className="p-3">Subject</th>
                    <th className="p-3 text-center">Marks</th>
                    <th className="p-3 text-center">Max</th>
                    <th className="p-3 text-center">Percentage</th>
                    <th className="p-3 text-center">Grade</th>
                    <th className="p-3 text-center">Status</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#ede8de] bg-white">
                  {displayedResults.map((r) => {
                    const isSelected = selectedResultIds.has(r.id);
                    const badge = getGradeBadgeStyle(r.grade);

                    return (
                      <tr
                        key={r.id}
                        className={`hover:bg-[#fbfaf7] transition-colors ${
                          isSelected ? 'bg-[#f4f9f6]' : ''
                        }`}
                      >
                        <td className="p-3 text-center">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => handleToggleSelectResult(r.id)}
                            className="rounded border-[#d2cabb] text-[#164e37] focus:ring-[#164e37]"
                          />
                        </td>
                        <td className="p-3">
                          <span className="font-bold text-[#0f231c] block">{r.studentName}</span>
                          <span className="text-[10px] font-mono text-slate-500">{r.studentId}</span>
                        </td>
                        <td className="p-3 text-slate-600">
                          {r.class} {r.division ? `(${r.division})` : ''}
                        </td>
                        <td className="p-3 font-semibold text-slate-800">{r.subjectName}</td>
                        <td className="p-3 text-center font-bold text-[#164e37]">{r.marksObtained}</td>
                        <td className="p-3 text-center text-slate-500">{r.maximumMarks}</td>
                        <td className="p-3 text-center font-bold">{r.percentage}%</td>
                        <td className="p-3 text-center">
                          <span
                            className={`inline-block px-2.5 py-0.5 rounded-md text-[11px] font-black border ${badge.bg} ${badge.text} ${badge.border}`}
                          >
                            {r.grade}
                          </span>
                        </td>
                        <td className="p-3 text-center">
                          <span
                            className={`inline-block px-2 py-0.5 rounded-full text-[9px] font-bold ${
                              r.published
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            {r.published ? 'Published' : 'Draft'}
                          </span>
                        </td>
                        <td className="p-3 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              type="button"
                              onClick={() => handleOpenResultModal(r)}
                              className="p-1 rounded hover:bg-slate-100 text-slate-500 hover:text-[#164e37]"
                              title="Edit Score"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                setDeleteConfirm({
                                  isOpen: true,
                                  type: 'result',
                                  id: r.id,
                                  name: `${r.studentName} - ${r.subjectName}`,
                                })
                              }
                              className="p-1 rounded hover:bg-rose-50 text-slate-400 hover:text-rose-600"
                              title="Delete Score"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile Stacked Card View (< 768px: Zero Horizontal Scroll) */}
            <div className="md:hidden space-y-2.5">
              {displayedResults.map((r) => {
                const isSelected = selectedResultIds.has(r.id);
                const badge = getGradeBadgeStyle(r.grade);

                return (
                  <div
                    key={r.id}
                    className={`p-3.5 rounded-xl border transition-all ${
                      isSelected ? 'border-[#164e37] bg-[#f4f9f6]' : 'border-[#e5e0d5] bg-white'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleToggleSelectResult(r.id)}
                          className="rounded border-[#d2cabb] text-[#164e37] focus:ring-[#164e37]"
                        />
                        <div>
                          <span className="text-xs font-bold text-[#0f231c] block">{r.studentName}</span>
                          <span className="text-[10px] font-mono text-slate-500">{r.studentId}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <span
                          className={`px-2 py-0.5 rounded text-[11px] font-black border ${badge.bg} ${badge.text} ${badge.border}`}
                        >
                          {r.grade}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleOpenResultModal(r)}
                          className="p-1 rounded text-slate-500 hover:text-[#164e37]"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setDeleteConfirm({
                              isOpen: true,
                              type: 'result',
                              id: r.id,
                              name: `${r.studentName} - ${r.subjectName}`,
                            })
                          }
                          className="p-1 rounded text-slate-400 hover:text-rose-600"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="mt-2 pt-2 border-t border-[#ede8de] grid grid-cols-3 gap-2 text-center text-xs">
                      <div className="bg-[#fbfaf7] p-1.5 rounded-lg border border-[#e5e0d5]">
                        <span className="text-[9px] text-slate-400 block uppercase font-bold">Subject</span>
                        <span className="font-semibold text-slate-800 truncate block">{r.subjectName}</span>
                      </div>

                      <div className="bg-[#fbfaf7] p-1.5 rounded-lg border border-[#e5e0d5]">
                        <span className="text-[9px] text-slate-400 block uppercase font-bold">Score</span>
                        <span className="font-bold text-[#164e37]">
                          {r.marksObtained} <span className="text-slate-400 font-normal">/ {r.maximumMarks}</span>
                        </span>
                      </div>

                      <div className="bg-[#fbfaf7] p-1.5 rounded-lg border border-[#e5e0d5]">
                        <span className="text-[9px] text-slate-400 block uppercase font-bold">Percent</span>
                        <span className="font-bold text-slate-800">{r.percentage}%</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>

      {/* ── MODAL 1: Examination Create / Edit ───────────────────────── */}
      {isExamModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3.5 sm:p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#e5e0d5] max-w-lg w-full p-5 sm:p-7 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#ede8de] pb-3">
              <h3 className="text-base sm:text-lg font-bold text-[#0f231c]">
                {editingExam ? 'Edit Examination' : 'Create New Examination'}
              </h3>
              <button
                type="button"
                onClick={() => setIsExamModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {formError && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleSaveExam} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Examination Name *</label>
                <input
                  type="text"
                  required
                  value={examForm.examName}
                  onChange={(e) => setExamForm({ ...examForm, examName: e.target.value })}
                  placeholder="e.g. First Terminal Assessment 2025"
                  className="w-full px-3 py-2 bg-[#fbfaf7] border border-[#d2cabb] rounded-xl focus:outline-none focus:border-[#164e37]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Academic Year *</label>
                  <input
                    type="text"
                    required
                    value={examForm.academicYear}
                    onChange={(e) => setExamForm({ ...examForm, academicYear: e.target.value })}
                    placeholder="2025–2026"
                    className="w-full px-3 py-2 bg-[#fbfaf7] border border-[#d2cabb] rounded-xl focus:outline-none focus:border-[#164e37]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Exam Date *</label>
                  <input
                    type="date"
                    required
                    value={examForm.examDate}
                    onChange={(e) => setExamForm({ ...examForm, examDate: e.target.value })}
                    className="w-full px-3 py-2 bg-[#fbfaf7] border border-[#d2cabb] rounded-xl focus:outline-none focus:border-[#164e37]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Class / Standard *</label>
                  <input
                    type="text"
                    required
                    value={examForm.className}
                    onChange={(e) => setExamForm({ ...examForm, className: e.target.value })}
                    placeholder="Class 5"
                    className="w-full px-3 py-2 bg-[#fbfaf7] border border-[#d2cabb] rounded-xl focus:outline-none focus:border-[#164e37]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Division (Optional)</label>
                  <input
                    type="text"
                    value={examForm.division}
                    onChange={(e) => setExamForm({ ...examForm, division: e.target.value })}
                    placeholder="A"
                    className="w-full px-3 py-2 bg-[#fbfaf7] border border-[#d2cabb] rounded-xl focus:outline-none focus:border-[#164e37]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Description (Optional)</label>
                <textarea
                  rows={2}
                  value={examForm.description}
                  onChange={(e) => setExamForm({ ...examForm, description: e.target.value })}
                  placeholder="Notes, syllabus guidelines, or schedule context..."
                  className="w-full px-3 py-2 bg-[#fbfaf7] border border-[#d2cabb] rounded-xl focus:outline-none focus:border-[#164e37]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Initial Status</label>
                <select
                  value={examForm.status}
                  onChange={(e) => setExamForm({ ...examForm, status: e.target.value as any })}
                  className="w-full px-3 py-2 bg-[#fbfaf7] border border-[#d2cabb] rounded-xl focus:outline-none focus:border-[#164e37]"
                >
                  <option value="Draft">Draft (Only administrators can view results)</option>
                  <option value="Published">Published (Live in Student Portal)</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#ede8de]">
                <button
                  type="button"
                  onClick={() => setIsExamModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-[#d2cabb] text-slate-600 hover:bg-slate-50 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 rounded-xl bg-[#164e37] hover:bg-[#0f3b29] text-white font-bold inline-flex items-center gap-1.5"
                >
                  {submitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>{editingExam ? 'Save Changes' : 'Create Examination'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── MODAL 2: Enter / Edit Score ─────────────────────────────── */}
      {isResultModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3.5 sm:p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#e5e0d5] max-w-lg w-full p-5 sm:p-7 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#ede8de] pb-3">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-[#0f231c]">
                  {editingResult ? 'Edit Student Score' : 'Record Student Score'}
                </h3>
                <span className="text-[11px] text-slate-500">
                  {currentExam ? currentExam.examName : 'Select student & subject score'}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsResultModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {formError && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleSaveResult} className="space-y-3.5 text-xs">
              {/* Select Existing Student */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Select Enrolled Student *
                </label>
                <select
                  required
                  value={resultForm.studentUid || resultForm.studentId}
                  onChange={(e) => handleSelectStudent(e.target.value)}
                  className="w-full px-3 py-2 bg-[#fbfaf7] border border-[#d2cabb] rounded-xl focus:outline-none focus:border-[#164e37]"
                >
                  <option value="">-- Choose student from active directory --</option>
                  {students.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} ({s.studentId}) — {s.className}
                    </option>
                  ))}
                </select>
                {students.length === 0 && (
                  <span className="text-[11px] text-amber-600 mt-1 block">
                    No student records found in database. Create students in Admin Workspace first.
                  </span>
                )}
              </div>

              {/* Subject Selection */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">Subject Name *</label>
                <select
                  value={resultForm.subjectName}
                  onChange={(e) => setResultForm({ ...resultForm, subjectName: e.target.value })}
                  className="w-full px-3 py-2 bg-[#fbfaf7] border border-[#d2cabb] rounded-xl focus:outline-none focus:border-[#164e37]"
                >
                  {availableSubjectsList.map((subj) => (
                    <option key={subj} value={subj}>
                      {subj}
                    </option>
                  ))}
                </select>
              </div>

              {/* Marks & Maximum Marks */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Marks Obtained *</label>
                  <input
                    type="number"
                    step="0.5"
                    min="0"
                    required
                    value={resultForm.marksObtained}
                    onChange={(e) => setResultForm({ ...resultForm, marksObtained: e.target.value })}
                    placeholder="e.g. 85"
                    className="w-full px-3 py-2 bg-[#fbfaf7] border border-[#d2cabb] rounded-xl focus:outline-none focus:border-[#164e37] font-mono text-sm"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Maximum Marks *</label>
                  <input
                    type="number"
                    step="1"
                    min="1"
                    required
                    value={resultForm.maximumMarks}
                    onChange={(e) => setResultForm({ ...resultForm, maximumMarks: e.target.value })}
                    placeholder="100"
                    className="w-full px-3 py-2 bg-[#fbfaf7] border border-[#d2cabb] rounded-xl focus:outline-none focus:border-[#164e37] font-mono text-sm"
                  />
                </div>
              </div>

              {/* Live Grade & Percentage Preview Badge */}
              <div className="p-3 rounded-xl bg-[#f4f9f6] border border-[#d3e5da] flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-500 font-bold uppercase block">
                    Calculated Percentage
                  </span>
                  <span className="text-base font-black text-[#164e37]">
                    {livePercentage > 0 ? `${livePercentage}%` : '0%'}
                  </span>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-slate-500 font-bold uppercase block">
                    Assigned Grade
                  </span>
                  <span className="inline-block px-3 py-0.5 rounded-lg text-sm font-black bg-white border border-[#164e37]/30 text-[#164e37]">
                    {liveGrade}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#ede8de]">
                <button
                  type="button"
                  onClick={() => setIsResultModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-[#d2cabb] text-slate-600 hover:bg-slate-50 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 rounded-xl bg-[#164e37] hover:bg-[#0f3b29] text-white font-bold inline-flex items-center gap-1.5"
                >
                  {submitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>{editingResult ? 'Update Score' : 'Save Score'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── MODAL 3: Manage Subjects ───────────────────────────────── */}
      {isSubjectModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3.5 sm:p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#e5e0d5] max-w-lg w-full p-5 sm:p-7 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#ede8de] pb-3">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-[#0f231c]">
                  Academic Subjects Catalog
                </h3>
                <span className="text-[11px] text-slate-500">
                  Configure school subjects available for grading and results.
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsSubjectModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {subjectError && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700">
                {subjectError}
              </div>
            )}

            {/* Quick Add Form */}
            <form onSubmit={handleAddSubject} className="p-3 rounded-xl bg-[#fbfaf7] border border-[#e5e0d5] space-y-2.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#164e37] block">
                + Add New Subject
              </span>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  required
                  placeholder="Subject Name (e.g. Fiqh)"
                  value={subjectForm.name}
                  onChange={(e) => setSubjectForm({ ...subjectForm, name: e.target.value })}
                  className="px-2.5 py-1.5 text-xs bg-white border border-[#d2cabb] rounded-lg"
                />
                <input
                  type="text"
                  placeholder="Code (optional, e.g. ISL-101)"
                  value={subjectForm.code}
                  onChange={(e) => setSubjectForm({ ...subjectForm, code: e.target.value })}
                  className="px-2.5 py-1.5 text-xs bg-white border border-[#d2cabb] rounded-lg"
                />
              </div>
              <button
                type="submit"
                className="w-full py-1.5 bg-[#164e37] hover:bg-[#0f3b29] text-white rounded-lg text-xs font-bold"
              >
                Save Subject to Catalog
              </button>
            </form>

            {/* Existing Subjects List */}
            <div className="space-y-1.5 max-h-[300px] overflow-y-auto">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Active Subjects ({availableSubjectsList.length})
              </span>
              {availableSubjectsList.map((name) => {
                const sObj = subjects.find((s) => s.name === name);
                return (
                  <div
                    key={name}
                    className="p-2.5 rounded-xl border border-[#e5e0d5] bg-white flex items-center justify-between text-xs"
                  >
                    <div>
                      <span className="font-bold text-[#0f231c]">{name}</span>
                      {sObj?.code && (
                        <span className="ml-2 font-mono text-[10px] text-slate-400">
                          [{sObj.code}]
                        </span>
                      )}
                    </div>
                    {sObj && (
                      <button
                        type="button"
                        onClick={() =>
                          setDeleteConfirm({
                            isOpen: true,
                            type: 'subject',
                            id: sObj.id,
                            name: sObj.name,
                          })
                        }
                        className="p-1 rounded text-slate-400 hover:text-rose-600"
                        title="Delete Subject"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ── MODAL 4: Configurable Grading Policy ───────────────────── */}
      {isGradingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3.5 sm:p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#e5e0d5] max-w-lg w-full p-5 sm:p-7 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#ede8de] pb-3">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-[#0f231c]">
                  Grading Scale & Policy Configuration
                </h3>
                <span className="text-[11px] text-slate-500">
                  Define percentage thresholds for letter grades without hardcoding.
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsGradingModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {gradingSuccess && (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                <span>{gradingSuccess}</span>
              </div>
            )}

            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Grade Boundaries (Percentage Range)
              </span>

              <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
                {activeTiers.map((tier, idx) => (
                  <div
                    key={tier.grade}
                    className="p-2.5 rounded-xl border border-[#e5e0d5] bg-[#fbfaf7] flex items-center justify-between gap-3 text-xs"
                  >
                    <span className="w-10 font-black text-[#164e37] text-sm text-center bg-white py-1 rounded border border-[#d2cabb]">
                      {tier.grade}
                    </span>
                    <div className="flex-1 flex items-center gap-2">
                      <span className="text-slate-500 text-[11px]">Min %</span>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={tier.minPercentage}
                        onChange={(e) => {
                          const val = parseFloat(e.target.value) || 0;
                          setActiveTiers((prev) => {
                            const next = [...prev];
                            next[idx] = { ...next[idx], minPercentage: val };
                            return next;
                          });
                        }}
                        className="w-16 px-2 py-1 bg-white border border-[#d2cabb] rounded-lg font-mono text-center"
                      />
                      <span className="text-slate-400 text-[10px] truncate">{tier.description}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-[#ede8de]">
              <button
                type="button"
                onClick={() => setActiveTiers(DEFAULT_GRADING_SCALE)}
                className="text-xs text-slate-500 hover:text-[#164e37] underline font-bold"
              >
                Reset to Standard Scale
              </button>

              <button
                type="button"
                onClick={handleSaveGrading}
                className="px-5 py-2 rounded-xl bg-[#164e37] hover:bg-[#0f3b29] text-white text-xs font-bold shadow-xs cursor-pointer"
              >
                Save Grading Scale
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Confirm Deletion Modal ──────────────────────────────────── */}
      <ConfirmModal
        isOpen={deleteConfirm.isOpen}
        title={
          deleteConfirm.type === 'exam'
            ? 'Delete Examination Cycle?'
            : deleteConfirm.type === 'bulkResults'
            ? `Delete ${selectedResultIds.size} Selected Records?`
            : deleteConfirm.type === 'subject'
            ? 'Delete Subject?'
            : 'Delete Student Score?'
        }
        message={
          deleteConfirm.type === 'exam'
            ? `Are you sure you want to delete "${deleteConfirm.name}"? All associated student scores and marks entered for this exam will also be permanently deleted.`
            : deleteConfirm.type === 'bulkResults'
            ? 'Are you sure you want to permanently delete these selected student score records?'
            : `Are you sure you want to delete "${deleteConfirm.name}"? This action cannot be undone.`
        }
        confirmLabel="Yes, Delete"
        isDestructive={true}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteConfirm({ isOpen: false, type: 'exam' })}
      />
    </div>
  );
};
