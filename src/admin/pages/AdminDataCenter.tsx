import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  FileSpreadsheet,
  Search,
  Filter,
  Download,
  FileText,
  Printer,
  Plus,
  Trash2,
  Edit2,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  RefreshCw,
  X,
  AlertCircle,
  CheckCircle2,
  Table as TableIcon,
  Users,
  GraduationCap,
  Mail,
  Inbox,
  FolderPlus,
  SlidersHorizontal,
  Award
} from 'lucide-react';
import {
  getAdmissionsAdmin,
  saveAdmissionAdmin,
  deleteAdmission,
  bulkDeleteAdmissions,
  getContactMessagesAdmin,
  saveContactMessage,
  deleteContactMessage,
  bulkDeleteContactMessages,
  getStudentsAdmin,
  saveStudent,
  deleteStudent,
  bulkDeleteStudents,
  getTeachersAdmin,
  saveTeacher,
  deleteTeacher,
  bulkDeleteTeachers,
  getCustomTablesAdmin,
  saveCustomTable,
  deleteCustomTable,
  saveCustomTableRow,
  deleteCustomTableRow,
  bulkDeleteCustomTableRows,
  getExamResultsAdmin,
  saveExamResultAdmin,
  deleteExamResultAdmin,
  bulkDeleteExamResultsAdmin,
  getExaminationsAdmin
} from '../../services/adminService';
import { exportToExcel, exportToCSV, type ExportColumn } from '../../utils/exportUtils';
import type {
  AdmissionEnquiry,
  ContactMessage,
  StudentDocument,
  TeacherItem,
  CustomTableRecord,
  ExaminationItem,
  ExamResultItem
} from '../../types/firestore';

type SectionKey = 'admissions' | 'messages' | 'students' | 'teachers' | 'exam-results' | 'custom';

export const AdminDataCenter: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSection = (searchParams.get('section') as SectionKey) || 'admissions';
  const [activeSection, setActiveSection] = useState<SectionKey>(
    ['admissions', 'messages', 'students', 'teachers', 'exam-results', 'custom'].includes(initialSection)
      ? initialSection
      : 'admissions'
  );

  // Sync state when URL param changes
  useEffect(() => {
    const s = searchParams.get('section') as SectionKey;
    if (s && ['admissions', 'messages', 'students', 'teachers', 'exam-results', 'custom'].includes(s)) {
      setActiveSection(s);
    }
  }, [searchParams]);

  const setSection = (sec: SectionKey) => {
    setActiveSection(sec);
    setSearchParams({ section: sec });
    setSelectedIds(new Set());
    setCurrentPage(1);
    setSearchQuery('');
    setStatusFilter('ALL');
  };

  // Data States
  const [loading, setLoading] = useState(true);
  const [admissions, setAdmissions] = useState<AdmissionEnquiry[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [students, setStudents] = useState<StudentDocument[]>([]);
  const [teachers, setTeachers] = useState<TeacherItem[]>([]);
  const [results, setResults] = useState<ExamResultItem[]>([]);
  const [examinations, setExaminations] = useState<ExaminationItem[]>([]);
  const [customTables, setCustomTables] = useState<CustomTableRecord[]>([]);
  const [selectedCustomTableId, setSelectedCustomTableId] = useState<string>('');

  // Table Interaction States
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [sortField, setSortField] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);
  const [mobileCardView, setMobileCardView] = useState(false);
  const [expandedCardIds, setExpandedCardIds] = useState<Set<string>>(new Set());

  const toggleCardExpanded = (id: string) => {
    setExpandedCardIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  // Notification Toast
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isBulkDeleteModalOpen, setIsBulkDeleteModalOpen] = useState(false);
  const [isCreateTableModalOpen, setIsCreateTableModalOpen] = useState(false);
  const [activeRecord, setActiveRecord] = useState<any>(null);

  // Initial Data Fetch
  const loadAllData = async () => {
    setLoading(true);
    try {
      const [adm, msg, std, tch, res, exm, tbls] = await Promise.all([
        getAdmissionsAdmin(),
        getContactMessagesAdmin(),
        getStudentsAdmin(),
        getTeachersAdmin(),
        getExamResultsAdmin(),
        getExaminationsAdmin(),
        getCustomTablesAdmin()
      ]);
      setAdmissions(adm);
      setMessages(msg);
      setStudents(std);
      setTeachers(tch);
      setResults(res);
      setExaminations(exm);
      setCustomTables(tbls);
      if (tbls.length > 0 && !selectedCustomTableId) {
        setSelectedCustomTableId(tbls[0].id);
      }
    } catch (err) {
      console.error('Failed to load data center data:', err);
      showToast('Error loading records from database', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllData();
  }, []);

  const activeCustomTable = useMemo(() => {
    return customTables.find((t) => t.id === selectedCustomTableId) || customTables[0] || null;
  }, [customTables, selectedCustomTableId]);

  // Handle Sort Toggle
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  // Filter & Search Logic
  const processedData = useMemo(() => {
    let list: any[] = [];

    if (activeSection === 'admissions') {
      list = [...admissions];
      if (statusFilter !== 'ALL') {
        list = list.filter((item) => item.status === statusFilter);
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        list = list.filter(
          (item) =>
            item.applicantName?.toLowerCase().includes(q) ||
            item.parentName?.toLowerCase().includes(q) ||
            item.phone?.toLowerCase().includes(q) ||
            item.email?.toLowerCase().includes(q) ||
            item.className?.toLowerCase().includes(q) ||
            item.message?.toLowerCase().includes(q) ||
            item.notes?.toLowerCase().includes(q)
        );
      }
    } else if (activeSection === 'messages') {
      list = [...messages];
      if (statusFilter !== 'ALL') {
        list = list.filter((item) => item.status === statusFilter);
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        list = list.filter(
          (item) =>
            item.name?.toLowerCase().includes(q) ||
            item.phone?.toLowerCase().includes(q) ||
            item.email?.toLowerCase().includes(q) ||
            item.subject?.toLowerCase().includes(q) ||
            item.message?.toLowerCase().includes(q) ||
            item.notes?.toLowerCase().includes(q)
        );
      }
    } else if (activeSection === 'students') {
      list = [...students];
      if (statusFilter !== 'ALL') {
        list = list.filter((item) => item.accountStatus === statusFilter);
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        list = list.filter(
          (item) =>
            item.name?.toLowerCase().includes(q) ||
            item.studentId?.toLowerCase().includes(q) ||
            item.className?.toLowerCase().includes(q) ||
            item.division?.toLowerCase().includes(q) ||
            item.parentName?.toLowerCase().includes(q) ||
            item.phone?.toLowerCase().includes(q)
        );
      }
    } else if (activeSection === 'teachers') {
      list = [...teachers];
      if (statusFilter !== 'ALL') {
        list = list.filter((item) => (item.status || 'Active') === statusFilter);
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        list = list.filter(
          (item) =>
            item.name?.toLowerCase().includes(q) ||
            item.department?.toLowerCase().includes(q) ||
            item.role?.toLowerCase().includes(q) ||
            item.phone?.toLowerCase().includes(q) ||
            item.email?.toLowerCase().includes(q)
        );
      }
    } else if (activeSection === 'exam-results') {
      list = results.map((r) => ({
        ...r,
        publishedStatus: r.published ? 'Published' : 'Draft',
      }));
      if (statusFilter !== 'ALL') {
        list = list.filter((item) => item.publishedStatus === statusFilter);
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        list = list.filter(
          (item) =>
            item.studentName?.toLowerCase().includes(q) ||
            item.studentId?.toLowerCase().includes(q) ||
            item.examName?.toLowerCase().includes(q) ||
            item.class?.toLowerCase().includes(q) ||
            item.division?.toLowerCase().includes(q) ||
            item.subjectName?.toLowerCase().includes(q) ||
            item.grade?.toLowerCase().includes(q)
        );
      }
    } else if (activeSection === 'custom') {
      if (activeCustomTable) {
        list = activeCustomTable.rows.map((r) => ({ id: r.id, ...r.data, createdAt: r.createdAt }));
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          list = list.filter((item) =>
            Object.values(item).some((v) => String(v).toLowerCase().includes(q))
          );
        }
      }
    }

    // Sorting
    if (sortField) {
      list.sort((a, b) => {
        const valA = a[sortField] !== undefined ? String(a[sortField]).toLowerCase() : '';
        const valB = b[sortField] !== undefined ? String(b[sortField]).toLowerCase() : '';
        if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
        if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return list;
  }, [
    activeSection,
    admissions,
    messages,
    students,
    teachers,
    results,
    activeCustomTable,
    searchQuery,
    statusFilter,
    sortField,
    sortOrder
  ]);

  // Pagination
  const totalRecords = processedData.length;
  const totalPages = Math.max(1, Math.ceil(totalRecords / pageSize));
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return processedData.slice(start, start + pageSize);
  }, [processedData, currentPage, pageSize]);

  // Row Selection Handlers
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const allIds = new Set(processedData.map((d) => d.id));
      setSelectedIds(allIds);
    } else {
      setSelectedIds(new Set());
    }
  };

  const handleToggleRow = (id: string) => {
    const updated = new Set(selectedIds);
    if (updated.has(id)) {
      updated.delete(id);
    } else {
      updated.add(id);
    }
    setSelectedIds(updated);
  };

  // Section Columns Configuration
  const currentColumns: ExportColumn[] = useMemo(() => {
    switch (activeSection) {
      case 'admissions':
        return [
          { key: 'applicantName', label: 'Applicant Name' },
          { key: 'parentName', label: 'Parent/Guardian' },
          { key: 'phone', label: 'Phone' },
          { key: 'email', label: 'Email' },
          { key: 'className', label: 'Class' },
          { key: 'message', label: 'Message' },
          { key: 'createdAt', label: 'Date' },
          { key: 'status', label: 'Status' },
          { key: 'notes', label: 'Notes' },
        ];
      case 'messages':
        return [
          { key: 'name', label: 'Name' },
          { key: 'phone', label: 'Phone' },
          { key: 'email', label: 'Email' },
          { key: 'subject', label: 'Subject' },
          { key: 'message', label: 'Message' },
          { key: 'createdAt', label: 'Date' },
          { key: 'status', label: 'Status' },
          { key: 'notes', label: 'Notes' },
        ];
      case 'students':
        return [
          { key: 'studentId', label: 'Student ID' },
          { key: 'name', label: 'Student Name' },
          { key: 'className', label: 'Class' },
          { key: 'division', label: 'Division' },
          { key: 'parentName', label: 'Parent/Guardian' },
          { key: 'phone', label: 'Phone' },
          { key: 'accountStatus', label: 'Status' },
        ];
      case 'teachers':
        return [
          { key: 'name', label: 'Teacher Name' },
          { key: 'department', label: 'Department' },
          { key: 'role', label: 'Role' },
          { key: 'phone', label: 'Phone' },
          { key: 'email', label: 'Email' },
          { key: 'status', label: 'Status' },
        ];
      case 'exam-results':
        return [
          { key: 'studentId', label: 'Student ID' },
          { key: 'studentName', label: 'Student Name' },
          { key: 'examName', label: 'Examination' },
          { key: 'class', label: 'Class' },
          { key: 'division', label: 'Division' },
          { key: 'subjectName', label: 'Subject' },
          { key: 'marksObtained', label: 'Marks' },
          { key: 'maximumMarks', label: 'Max Marks' },
          { key: 'percentage', label: 'Percentage (%)' },
          { key: 'grade', label: 'Grade' },
          { key: 'publishedStatus', label: 'Status' },
        ];
      case 'custom':
        if (activeCustomTable) {
          return activeCustomTable.columns.map((c) => ({ key: c, label: c }));
        }
        return [];
    }
  }, [activeSection, activeCustomTable]);

  // Export handlers
  const handleExport = (type: 'excel' | 'csv') => {
    // If some records are selected, export selected; otherwise export all filtered records
    const exportSet = selectedIds.size > 0
      ? processedData.filter((d) => selectedIds.has(d.id))
      : processedData;

    if (exportSet.length === 0) {
      showToast('No records to export', 'error');
      return;
    }

    const filename = `Sharafiyya_${activeSection}_${new Date().toISOString().slice(0, 10)}`;

    if (type === 'excel') {
      exportToExcel(exportSet, filename, currentColumns, activeSection);
      showToast(`Exported ${exportSet.length} records to Excel (.xlsx)`);
    } else {
      exportToCSV(exportSet, filename, currentColumns);
      showToast(`Exported ${exportSet.length} records to CSV (.csv)`);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  // Single Record Deletion
  const handleDeleteConfirm = async () => {
    if (!activeRecord) return;
    try {
      if (activeSection === 'admissions') {
        await deleteAdmission(activeRecord.id);
        setAdmissions((prev) => prev.filter((a) => a.id !== activeRecord.id));
      } else if (activeSection === 'messages') {
        await deleteContactMessage(activeRecord.id);
        setMessages((prev) => prev.filter((m) => m.id !== activeRecord.id));
      } else if (activeSection === 'students') {
        await deleteStudent(activeRecord.id);
        setStudents((prev) => prev.filter((s) => s.id !== activeRecord.id));
      } else if (activeSection === 'teachers') {
        await deleteTeacher(activeRecord.id);
        setTeachers((prev) => prev.filter((t) => t.id !== activeRecord.id));
      } else if (activeSection === 'exam-results') {
        await deleteExamResultAdmin(activeRecord.id);
        setResults((prev) => prev.filter((r) => r.id !== activeRecord.id));
      } else if (activeSection === 'custom' && activeCustomTable) {
        await deleteCustomTableRow(activeCustomTable.id, activeRecord.id);
        setCustomTables((prev) =>
          prev.map((tbl) =>
            tbl.id === activeCustomTable.id
              ? { ...tbl, rows: tbl.rows.filter((r) => r.id !== activeRecord.id) }
              : tbl
          )
        );
      }

      setSelectedIds((prev) => {
        const next = new Set(prev);
        next.delete(activeRecord.id);
        return next;
      });

      showToast('Record deleted successfully');
      setIsDeleteModalOpen(false);
      setActiveRecord(null);
    } catch (err) {
      console.error('Delete error:', err);
      showToast('Failed to delete record', 'error');
    }
  };

  // Bulk Delete Confirmation
  const handleBulkDeleteConfirm = async () => {
    const ids = Array.from(selectedIds);
    if (ids.length === 0) return;

    try {
      if (activeSection === 'admissions') {
        await bulkDeleteAdmissions(ids);
        setAdmissions((prev) => prev.filter((a) => !selectedIds.has(a.id)));
      } else if (activeSection === 'messages') {
        await bulkDeleteContactMessages(ids);
        setMessages((prev) => prev.filter((m) => !selectedIds.has(m.id)));
      } else if (activeSection === 'students') {
        await bulkDeleteStudents(ids);
        setStudents((prev) => prev.filter((s) => !selectedIds.has(s.id)));
      } else if (activeSection === 'teachers') {
        await bulkDeleteTeachers(ids);
        setTeachers((prev) => prev.filter((t) => !selectedIds.has(t.id)));
      } else if (activeSection === 'exam-results') {
        await bulkDeleteExamResultsAdmin(ids);
        setResults((prev) => prev.filter((r) => !selectedIds.has(r.id)));
      } else if (activeSection === 'custom' && activeCustomTable) {
        await bulkDeleteCustomTableRows(activeCustomTable.id, ids);
        setCustomTables((prev) =>
          prev.map((tbl) =>
            tbl.id === activeCustomTable.id
              ? { ...tbl, rows: tbl.rows.filter((r) => !selectedIds.has(r.id)) }
              : tbl
          )
        );
      }

      showToast(`Successfully deleted ${ids.length} records`);
      setSelectedIds(new Set());
      setIsBulkDeleteModalOpen(false);
    } catch (err) {
      console.error('Bulk delete error:', err);
      showToast('Failed to complete bulk delete', 'error');
    }
  };

  // Form State for Add / Edit
  const [formData, setFormData] = useState<Record<string, string>>({});

  const openAddModal = () => {
    setFormData({});
    setIsAddModalOpen(true);
  };

  const openEditModal = (record: any) => {
    setActiveRecord(record);
    const initial: Record<string, string> = {};
    if (activeSection === 'custom') {
      activeCustomTable?.columns.forEach((col) => {
        initial[col] = record[col] || '';
      });
    } else if (activeSection === 'exam-results') {
      initial.studentId = record.studentId || '';
      initial.studentName = record.studentName || '';
      initial.examName = record.examName || '';
      initial.class = record.class || '';
      initial.division = record.division || '';
      initial.subjectName = record.subjectName || '';
      initial.marksObtained = String(record.marksObtained ?? '');
      initial.maximumMarks = String(record.maximumMarks ?? '100');
      initial.published = record.published ? 'true' : 'false';
    } else {
      currentColumns.forEach((col) => {
        initial[col.key] = record[col.key] || '';
      });
    }
    setFormData(initial);
    setIsEditModalOpen(true);
  };

  const handleSaveRecord = async (isEdit: boolean) => {
    try {
      if (activeSection === 'admissions') {
        if (!formData.applicantName || !formData.phone) {
          showToast('Applicant Name and Phone are required', 'error');
          return;
        }
        const saved = await saveAdmissionAdmin({
          id: isEdit ? activeRecord.id : undefined,
          applicantName: formData.applicantName.trim(),
          parentName: formData.parentName?.trim() || '',
          phone: formData.phone.trim(),
          email: formData.email?.trim() || '',
          className: formData.className?.trim() || '',
          message: formData.message?.trim() || '',
          notes: formData.notes?.trim() || '',
          status: (formData.status as any) || 'New',
          enquiryType: 'Admission',
        });

        setAdmissions((prev) => {
          const idx = prev.findIndex((a) => a.id === saved.id);
          if (idx >= 0) {
            const next = [...prev];
            next[idx] = saved;
            return next;
          }
          return [saved, ...prev];
        });
      } else if (activeSection === 'messages') {
        if (!formData.name || !formData.phone || !formData.message) {
          showToast('Name, Phone, and Message are required', 'error');
          return;
        }
        const saved = await saveContactMessage({
          id: isEdit ? activeRecord.id : undefined,
          name: formData.name.trim(),
          phone: formData.phone.trim(),
          email: formData.email?.trim() || '',
          subject: formData.subject?.trim() || 'General Inquiry',
          message: formData.message.trim(),
          notes: formData.notes?.trim() || '',
          status: (formData.status as any) || 'Unread',
        });

        setMessages((prev) => {
          const idx = prev.findIndex((m) => m.id === saved.id);
          if (idx >= 0) {
            const next = [...prev];
            next[idx] = saved;
            return next;
          }
          return [saved, ...prev];
        });
      } else if (activeSection === 'students') {
        if (!formData.studentId || !formData.name || !formData.className) {
          showToast('Student ID, Name, and Class are required', 'error');
          return;
        }
        const saved = await saveStudent({
          id: isEdit ? activeRecord.id : undefined,
          studentId: formData.studentId.trim().toUpperCase(),
          name: formData.name.trim(),
          className: formData.className.trim(),
          division: formData.division?.trim() || '',
          parentName: formData.parentName?.trim() || '',
          phone: formData.phone?.trim() || '',
          email: formData.email?.trim() || `${formData.studentId.toLowerCase()}@sharafiyya.edu`,
          department: formData.department?.trim() || 'General Academics',
          academicYear: '2025–2026',
          accountStatus: (formData.accountStatus as any) || 'Active',
          uid: isEdit ? activeRecord.uid : `uid-${Date.now()}`,
        });

        setStudents((prev) => {
          const idx = prev.findIndex((s) => s.id === saved.id);
          if (idx >= 0) {
            const next = [...prev];
            next[idx] = saved;
            return next;
          }
          return [saved, ...prev];
        });
      } else if (activeSection === 'teachers') {
        if (!formData.name || !formData.department || !formData.role) {
          showToast('Teacher Name, Department, and Role are required', 'error');
          return;
        }
        const saved = await saveTeacher({
          id: isEdit ? activeRecord.id : undefined,
          name: formData.name.trim(),
          department: formData.department.trim(),
          role: formData.role.trim(),
          phone: formData.phone?.trim() || '',
          email: formData.email?.trim() || '',
          bio: formData.bio?.trim() || 'Instructional Faculty',
          status: (formData.status as any) || 'Active',
          published: true,
        });

        setTeachers((prev) => {
          const idx = prev.findIndex((t) => t.id === saved.id);
          if (idx >= 0) {
            const next = [...prev];
            next[idx] = saved;
            return next;
          }
          return [saved, ...prev];
        });
      } else if (activeSection === 'exam-results') {
        if (!formData.studentId || !formData.subjectName || formData.marksObtained === undefined || formData.marksObtained === '') {
          showToast('Student ID, Subject Name, and Marks are required', 'error');
          return;
        }
        const marks = Number(formData.marksObtained);
        const maxMarks = Number(formData.maximumMarks) || 100;
        if (isNaN(marks) || marks < 0) {
          showToast('Marks obtained must be 0 or greater', 'error');
          return;
        }
        if (marks > maxMarks) {
          showToast(`Marks (${marks}) cannot exceed maximum marks (${maxMarks})`, 'error');
          return;
        }

        const saved = await saveExamResultAdmin({
          id: isEdit ? activeRecord.id : undefined,
          examId: activeRecord?.examId || (examinations[0]?.id ?? `exm-${Date.now()}`),
          examName: formData.examName?.trim() || (examinations[0]?.examName ?? 'Terminal Examination'),
          academicYear: activeRecord?.academicYear || '2025–2026',
          class: formData.class?.trim() || 'Class 5',
          division: formData.division?.trim() || '',
          studentUid: activeRecord?.studentUid || `uid-${formData.studentId.trim().toLowerCase()}`,
          studentId: formData.studentId.trim().toUpperCase(),
          studentName: formData.studentName?.trim() || 'Student',
          subjectId: activeRecord?.subjectId || `subj-${formData.subjectName.toLowerCase().replace(/\s+/g, '-')}`,
          subjectName: formData.subjectName.trim(),
          marksObtained: marks,
          maximumMarks: maxMarks,
          published: formData.published === 'true',
        });

        setResults((prev) => {
          const idx = prev.findIndex((r) => r.id === saved.id);
          if (idx >= 0) {
            const next = [...prev];
            next[idx] = saved;
            return next;
          }
          return [saved, ...prev];
        });
      } else if (activeSection === 'custom' && activeCustomTable) {
        const rowId = isEdit ? activeRecord.id : undefined;
        await saveCustomTableRow(activeCustomTable.id, { id: rowId, data: formData });
        const refreshed = await getCustomTablesAdmin();
        setCustomTables(refreshed);
      }

      showToast(isEdit ? 'Record updated successfully' : 'Record added successfully');
      setIsAddModalOpen(false);
      setIsEditModalOpen(false);
      setActiveRecord(null);
      setFormData({});
    } catch (err: any) {
      console.error('Save error:', err);
      showToast(err.message || 'Failed to save record', 'error');
    }
  };

  // Create Custom Table Handler
  const [newTableName, setNewTableName] = useState('');
  const [newTableDesc, setNewTableDesc] = useState('');
  const [newTableCols, setNewTableCols] = useState('');

  const handleCreateCustomTable = async () => {
    if (!newTableName.trim()) {
      showToast('Table name is required', 'error');
      return;
    }
    const cols = newTableCols
      .split(',')
      .map((c) => c.trim())
      .filter((c) => c.length > 0);

    if (cols.length === 0) {
      showToast('Please specify at least one column (comma-separated)', 'error');
      return;
    }

    try {
      const created = await saveCustomTable({
        tableName: newTableName.trim(),
        description: newTableDesc.trim(),
        columns: cols,
        rows: [],
      });

      setCustomTables((prev) => [created, ...prev]);
      setSelectedCustomTableId(created.id);
      showToast(`Custom table "${created.tableName}" created`);
      setIsCreateTableModalOpen(false);
      setNewTableName('');
      setNewTableDesc('');
      setNewTableCols('');
    } catch (err) {
      console.error('Create table error:', err);
      showToast('Failed to create custom table', 'error');
    }
  };

  const handleDeleteCustomTable = async (id: string) => {
    if (!confirm('Are you sure you want to permanently delete this custom table and all its rows?')) return;
    try {
      await deleteCustomTable(id);
      setCustomTables((prev) => prev.filter((t) => t.id !== id));
      if (selectedCustomTableId === id) {
        const remaining = customTables.filter((t) => t.id !== id);
        setSelectedCustomTableId(remaining.length > 0 ? remaining[0].id : '');
      }
      showToast('Custom table deleted');
    } catch (err) {
      console.error('Delete custom table error:', err);
      showToast('Failed to delete custom table', 'error');
    }
  };

  // Status badge styling helper
  const renderStatusBadge = (status: string) => {
    let colorClass = 'bg-slate-100 text-slate-700 border-slate-200';
    if (['New', 'Unread', 'Active'].includes(status)) {
      colorClass = 'bg-emerald-50 text-emerald-800 border-emerald-200 font-bold';
    } else if (['Contacted', 'Read', 'On Leave'].includes(status)) {
      colorClass = 'bg-amber-50 text-amber-800 border-amber-200 font-bold';
    } else if (['Closed', 'Disabled', 'Inactive', 'Replied'].includes(status)) {
      colorClass = 'bg-slate-100 text-slate-600 border-slate-200';
    }

    return (
      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] border ${colorClass}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="space-y-5 max-w-full font-sans pb-12 print:p-0 print:space-y-0">
      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl shadow-xl text-xs font-semibold text-white animate-in slide-in-from-bottom duration-200 ${
            toast.type === 'error' ? 'bg-rose-700' : 'bg-[#164e37]'
          }`}
        >
          {toast.type === 'error' ? (
            <AlertCircle className="w-4 h-4 text-rose-200 shrink-0" />
          ) : (
            <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
          )}
          <span>{toast.message}</span>
        </div>
      )}

      {/* Top Header / Title Bar */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-2xs print:hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-emerald-50 text-[#164e37] border border-emerald-200">
                <FileSpreadsheet className="w-5 h-5" />
              </span>
              <div>
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                  <span>Data Center</span>
                  <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                    Excel Mode
                  </span>
                </h1>
                <p className="text-xs text-slate-500">
                  Institutional spreadsheet and records center with live Firebase synchronization
                </p>
              </div>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              type="button"
              onClick={openAddModal}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#164e37] hover:bg-[#0f3b29] text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4 text-[#c59b27]" />
              <span>Add Record</span>
            </button>

            <button
              type="button"
              onClick={() => handleExport('excel')}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold border border-slate-200 transition-colors shadow-2xs cursor-pointer"
              title="Export current view to Excel (.xlsx)"
            >
              <Download className="w-3.5 h-3.5 text-emerald-700" />
              <span>Export Excel</span>
            </button>

            <button
              type="button"
              onClick={() => handleExport('csv')}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold border border-slate-200 transition-colors shadow-2xs cursor-pointer"
              title="Export current view to CSV (.csv)"
            >
              <FileText className="w-3.5 h-3.5 text-sky-700" />
              <span>Export CSV</span>
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold border border-slate-200 transition-colors shadow-2xs cursor-pointer"
              title="Print formatted table"
            >
              <Printer className="w-3.5 h-3.5 text-slate-600" />
              <span className="hidden sm:inline">Print</span>
            </button>

            <button
              type="button"
              onClick={loadAllData}
              disabled={loading}
              className="p-2 rounded-xl bg-white hover:bg-slate-50 text-slate-600 border border-slate-200 transition-colors shadow-2xs disabled:opacity-50 cursor-pointer"
              title="Refresh database"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* Section Navigation Tabs */}
        <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between gap-3 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={() => setSection('admissions')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeSection === 'admissions'
                  ? 'bg-[#164e37] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Inbox className="w-3.5 h-3.5 text-[#c59b27]" />
              <span>Admission Enquiries</span>
              <span
                className={`ml-1 text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  activeSection === 'admissions' ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                }`}
              >
                {admissions.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setSection('messages')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeSection === 'messages'
                  ? 'bg-[#164e37] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Mail className="w-3.5 h-3.5 text-[#c59b27]" />
              <span>Contact Messages</span>
              <span
                className={`ml-1 text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  activeSection === 'messages' ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                }`}
              >
                {messages.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setSection('students')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeSection === 'students'
                  ? 'bg-[#164e37] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Users className="w-3.5 h-3.5 text-[#c59b27]" />
              <span>Students</span>
              <span
                className={`ml-1 text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  activeSection === 'students' ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                }`}
              >
                {students.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setSection('teachers')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeSection === 'teachers'
                  ? 'bg-[#164e37] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5 text-[#c59b27]" />
              <span>Teachers</span>
              <span
                className={`ml-1 text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  activeSection === 'teachers' ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                }`}
              >
                {teachers.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setSection('exam-results')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeSection === 'exam-results'
                  ? 'bg-[#164e37] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Award className="w-3.5 h-3.5 text-[#c59b27]" />
              <span>Exam Results</span>
              <span
                className={`ml-1 text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  activeSection === 'exam-results' ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                }`}
              >
                {results.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setSection('custom')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeSection === 'custom'
                  ? 'bg-[#164e37] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <TableIcon className="w-3.5 h-3.5 text-[#c59b27]" />
              <span>Custom Records</span>
              <span
                className={`ml-1 text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  activeSection === 'custom' ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                }`}
              >
                {customTables.length}
              </span>
            </button>
          </div>

          {/* Mobile view switcher */}
          <button
            type="button"
            onClick={() => setMobileCardView(!mobileCardView)}
            className="md:hidden shrink-0 inline-flex items-center gap-1 text-[11px] font-semibold text-slate-600 px-2.5 py-1.5 rounded-lg border border-slate-200 cursor-pointer"
          >
            <SlidersHorizontal className="w-3 h-3 text-[#164e37]" />
            <span>{mobileCardView ? 'Show Cards' : 'Show Table'}</span>
          </button>
        </div>

        {/* Custom Table Sub-selector Bar (If in Custom Section) */}
        {activeSection === 'custom' && (
          <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold text-slate-600">Active Custom Table:</span>
              {customTables.length === 0 ? (
                <span className="text-xs text-slate-400 italic">No custom tables created yet.</span>
              ) : (
                customTables.map((tbl) => (
                  <button
                    key={tbl.id}
                    type="button"
                    onClick={() => {
                      setSelectedCustomTableId(tbl.id);
                      setSelectedIds(new Set());
                      setCurrentPage(1);
                    }}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
                      tbl.id === activeCustomTable?.id
                        ? 'bg-emerald-50 text-[#164e37] border-emerald-300 font-bold'
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {tbl.tableName} ({tbl.rows.length})
                  </button>
                ))
              )}
            </div>

            <div className="flex items-center gap-2">
              {activeCustomTable && (
                <button
                  type="button"
                  onClick={() => handleDeleteCustomTable(activeCustomTable.id)}
                  className="text-xs text-rose-600 hover:text-rose-800 font-semibold px-2 py-1 rounded-lg hover:bg-rose-50 transition-colors"
                >
                  Delete Table
                </button>
              )}
              <button
                type="button"
                onClick={() => setIsCreateTableModalOpen(true)}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-[#164e37] text-xs font-bold border border-emerald-200 transition-colors cursor-pointer"
              >
                <FolderPlus className="w-3.5 h-3.5 text-[#c59b27]" />
                <span>New Custom Table</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Spreadsheet Control Bar (Search, Status Filter, Selection info, Bulk Delete) */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-3 print:hidden">
        {/* Left: Search & Filter */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 flex-1">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder={`Search ${activeSection}...`}
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#164e37] focus:bg-white transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Status Filter Dropdown */}
          {['admissions', 'messages', 'students', 'teachers', 'exam-results'].includes(activeSection) && (
            <div className="flex items-center gap-1.5 shrink-0">
              <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 font-semibold text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-[#164e37] cursor-pointer"
              >
                <option value="ALL">All Statuses</option>
                {activeSection === 'admissions' && (
                  <>
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Closed">Closed</option>
                  </>
                )}
                {activeSection === 'messages' && (
                  <>
                    <option value="Unread">Unread</option>
                    <option value="Read">Read</option>
                    <option value="Replied">Replied</option>
                    <option value="Closed">Closed</option>
                  </>
                )}
                {activeSection === 'students' && (
                  <>
                    <option value="Active">Active</option>
                    <option value="Disabled">Disabled</option>
                  </>
                )}
                {activeSection === 'teachers' && (
                  <>
                    <option value="Active">Active</option>
                    <option value="On Leave">On Leave</option>
                    <option value="Inactive">Inactive</option>
                  </>
                )}
                {activeSection === 'exam-results' && (
                  <>
                    <option value="Published">Published</option>
                    <option value="Draft">Draft</option>
                  </>
                )}
              </select>
            </div>
          )}
        </div>

        {/* Right: Multi-select Action Bar & Record Count */}
        <div className="flex items-center justify-between md:justify-end gap-3 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100">
          {selectedIds.size > 0 ? (
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-800 bg-emerald-50 text-[#164e37] px-2.5 py-1 rounded-lg border border-emerald-200">
                {selectedIds.size} Selected
              </span>
              <button
                type="button"
                onClick={() => setIsBulkDeleteModalOpen(true)}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold border border-rose-200 transition-colors cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Selected</span>
              </button>
              <button
                type="button"
                onClick={() => setSelectedIds(new Set())}
                className="text-xs text-slate-500 hover:text-slate-800 underline px-1 cursor-pointer"
              >
                Clear
              </button>
            </div>
          ) : (
            <div className="text-xs text-slate-500">
              Showing <strong className="text-slate-800">{paginatedData.length}</strong> of{' '}
              <strong className="text-slate-800">{totalRecords}</strong> records
            </div>
          )}
        </div>
      </div>

      {/* Main Table / Spreadsheet Container */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
        {/* Print Header (Visible only when printed) */}
        <div className="hidden print:block p-4 border-b border-slate-300">
          <h2 className="text-lg font-black text-slate-900">
            Sharafiyya English Medium School — {activeSection.toUpperCase()} REPORT
          </h2>
          <p className="text-xs text-slate-500">
            Printed on {new Date().toLocaleString()} • Total Records: {totalRecords}
          </p>
        </div>

        {/* Desktop & Tablet: Interactive Spreadsheet Table */}
        <div className={`overflow-x-auto ${mobileCardView ? 'block' : 'hidden md:block'}`}>
          <table className="w-full text-left border-collapse text-xs">
            {/* Sticky Table Header with column borders */}
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold tracking-tight select-none">
                {/* Select All Checkbox */}
                <th className="py-2.5 px-3 w-10 text-center border-r border-slate-200 print:hidden">
                  <input
                    type="checkbox"
                    checked={paginatedData.length > 0 && paginatedData.every((d) => selectedIds.has(d.id))}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    className="rounded text-[#164e37] focus:ring-[#164e37] cursor-pointer"
                    aria-label="Select all rows"
                  />
                </th>

                {/* Column Headers */}
                {currentColumns.map((col) => (
                  <th
                    key={col.key}
                    onClick={() => handleSort(col.key)}
                    className="py-2.5 px-3.5 border-r border-slate-200 last:border-r-0 hover:bg-slate-100 transition-colors cursor-pointer group whitespace-nowrap"
                  >
                    <div className="flex items-center justify-between gap-1.5">
                      <span>{col.label}</span>
                      <span className="text-slate-400 group-hover:text-slate-700">
                        {sortField === col.key ? (
                          sortOrder === 'asc' ? (
                            <ArrowUp className="w-3 h-3 text-[#164e37]" />
                          ) : (
                            <ArrowDown className="w-3 h-3 text-[#164e37]" />
                          )
                        ) : (
                          <ArrowUpDown className="w-2.5 h-2.5 opacity-30 group-hover:opacity-100" />
                        )}
                      </span>
                    </div>
                  </th>
                ))}

                {/* Actions column */}
                <th className="py-2.5 px-3.5 text-right w-24 print:hidden">Actions</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-slate-100 font-normal">
              {loading ? (
                <tr>
                  <td colSpan={currentColumns.length + 2} className="py-16 text-center text-slate-400">
                    <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-slate-300" />
                    <span>Loading database records...</span>
                  </td>
                </tr>
              ) : paginatedData.length === 0 ? (
                <tr>
                  <td colSpan={currentColumns.length + 2} className="py-16 text-center text-slate-400">
                    <FileSpreadsheet className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                    <p className="font-semibold text-slate-700">No records found</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      {searchQuery
                        ? 'Try clearing your search query or filter.'
                        : 'Click "Add Record" above to create the first record in this section.'}
                    </p>
                  </td>
                </tr>
              ) : (
                paginatedData.map((row, idx) => {
                  const isSelected = selectedIds.has(row.id);
                  return (
                    <tr
                      key={row.id || idx}
                      className={`hover:bg-slate-50/80 transition-colors group ${
                        isSelected ? 'bg-emerald-50/40' : ''
                      }`}
                    >
                      {/* Selection Checkbox */}
                      <td className="py-2 px-3 text-center border-r border-slate-100 print:hidden">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleToggleRow(row.id)}
                          className="rounded text-[#164e37] focus:ring-[#164e37] cursor-pointer"
                          aria-label={`Select row ${row.id}`}
                        />
                      </td>

                      {/* Data Columns */}
                      {currentColumns.map((col) => {
                        const val = row[col.key];
                        const isStatusCol = ['status', 'accountStatus'].includes(col.key);

                        return (
                          <td
                            key={col.key}
                            className="py-2 px-3.5 border-r border-slate-100 last:border-r-0 max-w-xs truncate text-slate-800"
                          >
                            {isStatusCol ? (
                              renderStatusBadge(val || 'Active')
                            ) : col.key === 'createdAt' || col.key === 'date' ? (
                              <span className="font-mono text-[11px] text-slate-500">
                                {val ? new Date(val).toLocaleDateString() : '—'}
                              </span>
                            ) : val !== undefined && val !== null && String(val).trim() !== '' ? (
                              <span title={String(val)}>{String(val)}</span>
                            ) : (
                              <span className="text-slate-300 italic">—</span>
                            )}
                          </td>
                        );
                      })}

                      {/* Row Action Buttons */}
                      <td className="py-2 px-3 text-right whitespace-nowrap print:hidden">
                        <div className="flex items-center justify-end gap-1 opacity-70 group-hover:opacity-100 transition-opacity">
                          <button
                            type="button"
                            onClick={() => openEditModal(row)}
                            className="p-1 rounded-md text-slate-500 hover:text-[#164e37] hover:bg-slate-100 transition-colors cursor-pointer"
                            title="Edit record"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setActiveRecord(row);
                              setIsDeleteModalOpen(true);
                            }}
                            className="p-1 rounded-md text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                            title="Delete record"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Phones: Expandable Records Card View (Default on mobile) */}
        <div className={`p-3 space-y-2.5 ${mobileCardView ? 'hidden' : 'block md:hidden'}`}>
          {loading ? (
            <div className="py-12 text-center text-slate-400">
              <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-slate-300" />
              <span className="text-xs">Loading records...</span>
            </div>
          ) : paginatedData.length === 0 ? (
            <div className="py-10 text-center text-xs text-slate-400 bg-white rounded-2xl border border-slate-200 p-4">
              <FileSpreadsheet className="w-8 h-8 mx-auto mb-2 text-slate-300" />
              <p className="font-semibold text-slate-700">No records found</p>
              <p className="text-[11px] text-slate-400 mt-0.5">
                {searchQuery ? 'Try clearing your search query or filter.' : 'Tap "Add Record" to create a new entry.'}
              </p>
            </div>
          ) : (
            paginatedData.map((row) => {
              const isExpanded = expandedCardIds.has(row.id);
              const isSelected = selectedIds.has(row.id);
              const title = row.studentName || row.applicantName || row.name || row.tableName || row.studentId || 'Record';
              const status = row.publishedStatus || row.status || row.accountStatus || 'Active';

              return (
                <div
                  key={row.id}
                  className={`rounded-2xl border transition-all overflow-hidden ${
                    isSelected
                      ? 'bg-emerald-50/50 border-emerald-300 shadow-2xs'
                      : 'bg-white border-slate-200 shadow-2xs'
                  }`}
                >
                  {/* Card Header (Always visible) */}
                  <div className="p-3.5 flex items-center justify-between gap-2.5">
                    <div className="flex items-center gap-2.5 min-w-0 flex-1">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleToggleRow(row.id)}
                        className="rounded text-[#164e37] focus:ring-[#164e37] cursor-pointer"
                        aria-label={`Select ${title}`}
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <h4 className="font-bold text-xs text-slate-900 truncate">
                            {title}
                          </h4>
                          {renderStatusBadge(status)}
                        </div>
                        {/* Secondary line summary */}
                        <p className="text-[11px] text-slate-500 mt-0.5 truncate font-medium">
                          {row.subjectName ? `${row.subjectName} · ${row.marksObtained}/${row.maximumMarks} (${row.grade})` : (row.phone || row.email || row.class || row.subject || row.enquiryType || row.department || (row.createdAt ? new Date(row.createdAt).toLocaleDateString() : ''))}
                        </p>
                      </div>
                    </div>

                    {/* Expand/Collapse Chevron Button */}
                    <button
                      type="button"
                      onClick={() => toggleCardExpanded(row.id)}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer shrink-0"
                      aria-label={isExpanded ? 'Collapse record details' : 'Expand record details'}
                    >
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-[#164e37]" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-400" />
                      )}
                    </button>
                  </div>

                  {/* Expandable Details Section */}
                  {isExpanded && (
                    <div className="px-3.5 pb-3.5 pt-1 border-t border-slate-100 bg-slate-50/60 space-y-2.5 text-xs animate-in fade-in duration-150">
                      <div className="grid grid-cols-1 gap-1.5 pt-1">
                        {currentColumns.map((col) => {
                          const val = row[col.key];
                          if (val === undefined || val === null || String(val).trim() === '') return null;
                          return (
                            <div key={col.key} className="flex justify-between items-start gap-2 py-0.5 border-b border-slate-100/80 last:border-b-0 text-[11px]">
                              <span className="text-slate-500 font-medium shrink-0">{col.label}:</span>
                              <span className="font-semibold text-slate-800 text-right break-words max-w-[65%]">
                                {col.key === 'createdAt' || col.key === 'date'
                                  ? new Date(val).toLocaleDateString()
                                  : String(val)}
                              </span>
                            </div>
                          );
                        })}
                      </div>

                      {/* Card Action Buttons */}
                      <div className="pt-2 flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => openEditModal(row)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold bg-white text-slate-700 border border-slate-200 hover:bg-slate-100 shadow-2xs transition-colors cursor-pointer min-h-[36px]"
                        >
                          <Edit2 className="w-3.5 h-3.5 text-[#164e37]" />
                          <span>Edit</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setActiveRecord(row);
                            setIsDeleteModalOpen(true);
                          }}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100 transition-colors cursor-pointer min-h-[36px]"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Spreadsheet Pagination Footer */}
        <div className="p-3.5 sm:p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600 print:hidden">
          {/* Page Size Selector */}
          <div className="flex items-center gap-2">
            <span>Rows per page:</span>
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="bg-white border border-slate-300 rounded-lg px-2 py-1 font-semibold text-slate-700 focus:outline-hidden focus:ring-1 focus:ring-[#164e37] cursor-pointer"
            >
              <option value={10}>10</option>
              <option value={15}>15</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>

          {/* Page Navigation */}
          <div className="flex items-center gap-2">
            <span>
              Page <strong className="text-slate-900">{currentPage}</strong> of{' '}
              <strong className="text-slate-900">{totalPages}</strong>
            </span>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage <= 1}
                className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                aria-label="Previous page"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage >= totalPages}
                className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                aria-label="Next page"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* MODAL: ADD / EDIT RECORD                                  */}
      {/* ========================================================= */}
      {(isAddModalOpen || isEditModalOpen) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <FileSpreadsheet className="w-5 h-5 text-[#164e37]" />
                <h3 className="text-base font-bold text-slate-900">
                  {isEditModalOpen ? 'Edit Record' : 'Add New Record'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsAddModalOpen(false);
                  setIsEditModalOpen(false);
                  setActiveRecord(null);
                }}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSaveRecord(isEditModalOpen);
              }}
              className="space-y-3.5 text-xs"
            >
              {activeSection === 'admissions' && (
                <>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Applicant Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.applicantName || ''}
                      onChange={(e) => setFormData({ ...formData, applicantName: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#164e37] focus:outline-hidden"
                      placeholder="e.g. Zayan Ahmed"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Parent / Guardian Name
                    </label>
                    <input
                      type="text"
                      value={formData.parentName || ''}
                      onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#164e37] focus:outline-hidden"
                      placeholder="e.g. Ahmed Kutty"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Phone *</label>
                      <input
                        type="text"
                        required
                        value={formData.phone || ''}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#164e37] focus:outline-hidden"
                        placeholder="+91 98470 00000"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Email</label>
                      <input
                        type="email"
                        value={formData.email || ''}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#164e37] focus:outline-hidden"
                        placeholder="parent@gmail.com"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Class</label>
                      <input
                        type="text"
                        value={formData.className || ''}
                        onChange={(e) => setFormData({ ...formData, className: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#164e37] focus:outline-hidden"
                        placeholder="e.g. Class 1 or Kindergarten"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Status</label>
                      <select
                        value={formData.status || 'New'}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#164e37] focus:outline-hidden"
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Closed">Closed</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Message / Query</label>
                    <textarea
                      rows={2}
                      value={formData.message || ''}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#164e37] focus:outline-hidden"
                      placeholder="Applicant enquiry notes"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Internal Notes</label>
                    <input
                      type="text"
                      value={formData.notes || ''}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#164e37] focus:outline-hidden"
                      placeholder="e.g. Called on 22nd, confirmed intake test date"
                    />
                  </div>
                </>
              )}

              {activeSection === 'messages' && (
                <>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name || ''}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#164e37] focus:outline-hidden"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Phone *</label>
                      <input
                        type="text"
                        required
                        value={formData.phone || ''}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#164e37] focus:outline-hidden"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Email</label>
                      <input
                        type="email"
                        value={formData.email || ''}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#164e37] focus:outline-hidden"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Subject</label>
                      <input
                        type="text"
                        value={formData.subject || ''}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#164e37] focus:outline-hidden"
                        placeholder="Inquiry topic"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Status</label>
                      <select
                        value={formData.status || 'Unread'}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#164e37] focus:outline-hidden"
                      >
                        <option value="Unread">Unread</option>
                        <option value="Read">Read</option>
                        <option value="Replied">Replied</option>
                        <option value="Closed">Closed</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Message *</label>
                    <textarea
                      rows={3}
                      required
                      value={formData.message || ''}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#164e37] focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Internal Notes</label>
                    <input
                      type="text"
                      value={formData.notes || ''}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#164e37] focus:outline-hidden"
                    />
                  </div>
                </>
              )}

              {activeSection === 'students' && (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        Student ID *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.studentId || ''}
                        onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#164e37] focus:outline-hidden font-mono uppercase"
                        placeholder="SK-2025-001"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        Student Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name || ''}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#164e37] focus:outline-hidden"
                        placeholder="Full student name"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Class *</label>
                      <input
                        type="text"
                        required
                        value={formData.className || ''}
                        onChange={(e) => setFormData({ ...formData, className: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#164e37] focus:outline-hidden"
                        placeholder="Class 5 - Intermediate"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Division</label>
                      <input
                        type="text"
                        value={formData.division || ''}
                        onChange={(e) => setFormData({ ...formData, division: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#164e37] focus:outline-hidden"
                        placeholder="Section A"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        Parent / Guardian
                      </label>
                      <input
                        type="text"
                        value={formData.parentName || ''}
                        onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#164e37] focus:outline-hidden"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Phone</label>
                      <input
                        type="text"
                        value={formData.phone || ''}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#164e37] focus:outline-hidden"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Account Status</label>
                    <select
                      value={formData.accountStatus || 'Active'}
                      onChange={(e) => setFormData({ ...formData, accountStatus: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#164e37] focus:outline-hidden"
                    >
                      <option value="Active">Active</option>
                      <option value="Disabled">Disabled</option>
                    </select>
                  </div>
                </>
              )}

              {activeSection === 'teachers' && (
                <>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Teacher Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name || ''}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#164e37] focus:outline-hidden"
                      placeholder="e.g. Usthad Abdul Hakeem"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        Department *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.department || ''}
                        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#164e37] focus:outline-hidden"
                        placeholder="Islamic Studies"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Role *</label>
                      <input
                        type="text"
                        required
                        value={formData.role || ''}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#164e37] focus:outline-hidden"
                        placeholder="Senior Faculty / Principal"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Phone</label>
                      <input
                        type="text"
                        value={formData.phone || ''}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#164e37] focus:outline-hidden"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Email</label>
                      <input
                        type="email"
                        value={formData.email || ''}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#164e37] focus:outline-hidden"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Status</label>
                    <select
                      value={formData.status || 'Active'}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#164e37] focus:outline-hidden"
                    >
                      <option value="Active">Active</option>
                      <option value="On Leave">On Leave</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                </>
              )}

              {activeSection === 'exam-results' && (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        Student ID *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.studentId || ''}
                        onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#164e37] focus:outline-hidden font-mono uppercase"
                        placeholder="SK-2025-001"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        Student Name
                      </label>
                      <input
                        type="text"
                        value={formData.studentName || ''}
                        onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#164e37] focus:outline-hidden"
                        placeholder="Student Full Name"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        Examination
                      </label>
                      <input
                        type="text"
                        value={formData.examName || ''}
                        onChange={(e) => setFormData({ ...formData, examName: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#164e37] focus:outline-hidden"
                        placeholder="First Terminal Examination"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        Subject Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.subjectName || ''}
                        onChange={(e) => setFormData({ ...formData, subjectName: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#164e37] focus:outline-hidden"
                        placeholder="Mathematics"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Class</label>
                      <input
                        type="text"
                        value={formData.class || ''}
                        onChange={(e) => setFormData({ ...formData, class: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#164e37] focus:outline-hidden"
                        placeholder="Class 5"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Division</label>
                      <input
                        type="text"
                        value={formData.division || ''}
                        onChange={(e) => setFormData({ ...formData, division: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#164e37] focus:outline-hidden"
                        placeholder="A"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Marks Obtained *</label>
                      <input
                        type="number"
                        min="0"
                        required
                        value={formData.marksObtained || ''}
                        onChange={(e) => setFormData({ ...formData, marksObtained: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#164e37] focus:outline-hidden"
                        placeholder="85"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Maximum Marks *</label>
                      <input
                        type="number"
                        min="1"
                        required
                        value={formData.maximumMarks || '100'}
                        onChange={(e) => setFormData({ ...formData, maximumMarks: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#164e37] focus:outline-hidden"
                        placeholder="100"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Portal Visibility</label>
                      <select
                        value={formData.published || 'false'}
                        onChange={(e) => setFormData({ ...formData, published: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#164e37] focus:outline-hidden"
                      >
                        <option value="false">Draft (Hidden)</option>
                        <option value="true">Published (Live)</option>
                      </select>
                    </div>
                  </div>
                </>
              )}

              {activeSection === 'custom' && activeCustomTable && (
                <>
                  {activeCustomTable.columns.map((col) => (
                    <div key={col}>
                      <label className="block font-semibold text-slate-700 mb-1">{col}</label>
                      <input
                        type="text"
                        value={formData[col] || ''}
                        onChange={(e) => setFormData({ ...formData, [col]: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#164e37] focus:outline-hidden"
                      />
                    </div>
                  ))}
                </>
              )}

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddModalOpen(false);
                    setIsEditModalOpen(false);
                    setActiveRecord(null);
                  }}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#164e37] hover:bg-[#0f3b29] text-white font-bold shadow-xs cursor-pointer"
                >
                  {isEditModalOpen ? 'Save Changes' : 'Create Record'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL: CREATE CUSTOM TABLE                                */}
      {/* ========================================================= */}
      {isCreateTableModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <FolderPlus className="w-5 h-5 text-[#164e37]" />
                <h3 className="text-base font-bold text-slate-900">Create New Custom Table</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsCreateTableModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Table Name *</label>
                <input
                  type="text"
                  required
                  value={newTableName}
                  onChange={(e) => setNewTableName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#164e37] focus:outline-hidden"
                  placeholder="e.g. Library Books Inventory"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Description</label>
                <input
                  type="text"
                  value={newTableDesc}
                  onChange={(e) => setNewTableDesc(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#164e37] focus:outline-hidden"
                  placeholder="e.g. Tracking library accession and status"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Columns (Comma separated) *
                </label>
                <textarea
                  rows={3}
                  required
                  value={newTableCols}
                  onChange={(e) => setNewTableCols(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#164e37] focus:outline-hidden font-mono"
                  placeholder="e.g. Book Title, Author, ISBN, Quantity, Shelf Location"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">
                  Separate each column header with a comma.
                </span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsCreateTableModalOpen(false)}
                className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleCreateCustomTable}
                className="px-5 py-2 rounded-xl bg-[#164e37] hover:bg-[#0f3b29] text-white text-xs font-bold shadow-xs cursor-pointer"
              >
                Create Table
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL: SINGLE DELETE CONFIRMATION                         */}
      {/* ========================================================= */}
      {isDeleteModalOpen && activeRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 mx-auto flex items-center justify-center border border-rose-200">
              <Trash2 className="w-6 h-6" />
            </div>

            <div className="space-y-1">
              <h3 className="text-base font-bold text-slate-900">Delete Record?</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Are you sure you want to permanently remove this record? This action cannot be undone.
              </p>
            </div>

            <div className="pt-2 flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setIsDeleteModalOpen(false);
                  setActiveRecord(null);
                }}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteConfirm}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white shadow-xs cursor-pointer"
              >
                Delete Record
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL: BULK DELETE CONFIRMATION                           */}
      {/* ========================================================= */}
      {isBulkDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 mx-auto flex items-center justify-center border border-rose-200">
              <Trash2 className="w-6 h-6" />
            </div>

            <div className="space-y-1">
              <h3 className="text-base font-bold text-slate-900">
                Delete {selectedIds.size} Selected Records?
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                You are about to permanently delete <strong>{selectedIds.size}</strong> records from the database.
              </p>
            </div>

            <div className="pt-2 flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => setIsBulkDeleteModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleBulkDeleteConfirm}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white shadow-xs cursor-pointer"
              >
                Confirm Bulk Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
