import {
  collection,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
  updateDoc,
  query,
  orderBy,
  getDoc
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from '../lib/firebase';
import type {
  NoticeItem,
  EventItem,
  TeacherItem,
  DepartmentItem,
  GalleryItem,
  AdmissionEnquiry,
  SchoolSettings,
  StudentDocument,
  DashboardStats
} from '../types/firestore';
import { SCHOOL_INFO } from '../data/schoolInfo';
import { NOTICES } from '../data/notices';
import { EVENTS } from '../data/events';
import { TEACHERS } from '../data/teachers';
import { DEPARTMENTS } from '../data/departments';
import { GALLERY_ITEMS } from '../data/gallery';

// Helper storage keys for fallback cache
const STORAGE_PREFIX = 'sharafiyya_admin_';

const getLocalCollection = <T>(key: string, initial: T[]): T[] => {
  const saved = localStorage.getItem(STORAGE_PREFIX + key);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      // Fallback
    }
  }
  return initial;
};

const setLocalCollection = <T>(key: string, items: T[]): void => {
  localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(items));
};

// Initial Seed Data for fallback
const initialNotices: NoticeItem[] = NOTICES.map((n: any) => ({
  id: n.id,
  title: n.title,
  description: n.description,
  fullContent: `${n.description}\n\nAll concerned students, parents, and community members are requested to take note of this institutional announcement. For further clarifications or assistance, please contact the madrassa administrative office during regular working hours (08:30 AM – 04:30 PM).`,
  date: n.date,
  category: (n.category || 'General') as any,
  priority: 'Normal',
  targetAudience: 'Everyone',
  published: n.published,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}));

const initialEvents: EventItem[] = EVENTS.map((e, idx) => ({
  id: e.id,
  title: e.title,
  description: e.summary,
  fullDescription: `${e.summary}\n\nThe program features traditional recitation sessions, guidance addresses by esteemed scholars, and dedicated recognitions for student achievements. All parents, guardians, and well-wishers from the Korangath community are welcome to attend.`,
  date: e.datePlaceholder,
  startTime: '09:30 AM',
  endTime: '12:30 PM',
  location: e.venuePlaceholder,
  category: e.category,
  featured: idx === 0,
  published: true,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}));

const initialTeachers: TeacherItem[] = TEACHERS.map((t) => ({
  id: t.id,
  name: t.profileStatus,
  role: `Staff Slot #${t.slotNumber}`,
  department: t.departmentNotice,
  bio: t.departmentNotice,
  published: true,
}));

const initialDepartments: DepartmentItem[] = DEPARTMENTS.map((d) => ({
  id: d.id,
  title: d.name,
  arabicTitle: d.arabicName,
  description: d.fullDescription,
  published: true,
  modules: d.syllabusOverview,
  targetLevels: d.targetLevels,
}));

const initialGallery: GalleryItem[] = GALLERY_ITEMS.map((g) => ({
  id: g.id,
  title: g.title,
  image: '',
  category: g.category as any,
  description: g.caption,
  createdAt: new Date().toISOString(),
  published: true,
}));

const initialSettings: SchoolSettings = {
  id: 'main',
  officialName: SCHOOL_INFO.officialName,
  localName: SCHOOL_INFO.localName,
  arabicSubtitle: SCHOOL_INFO.arabicCalligraphySubtitle || '',
  address: 'Korangath, Tirur, Malappuram District, Kerala, India – 676101',
  phone: SCHOOL_INFO.contact.phone,
  email: SCHOOL_INFO.contact.email,
  officeHours: SCHOOL_INFO.contact.officeHours,
  transitDirections: 'Approx. 3.5 km from Tirur Railway Station, near Korangath junction',
  socialLinks: {
    facebook: '#',
    youtube: '#',
    whatsapp: '#',
  },
};

const initialStudents: StudentDocument[] = [
  {
    id: 'std-001',
    uid: 'demo-student-uid-001',
    studentId: 'SK-2025-001',
    name: 'Sample Enrolled Student',
    email: 'student@sharafiyya.edu',
    className: 'Class 5 - Intermediate',
    department: 'Qur’an & Tajweed',
    academicYear: '2025–2026',
    accountStatus: 'Active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// ==================== NOTICES ====================
export const getNoticesAdmin = async (): Promise<NoticeItem[]> => {
  if (isFirebaseConfigured && db) {
    try {
      const q = query(collection(db, 'notices'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        return snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as NoticeItem));
      }
    } catch (e) {
      console.warn('[AdminService] Firestore notices query error, falling back:', e);
    }
  }
  return getLocalCollection('notices', initialNotices);
};

export const saveNotice = async (notice: Omit<NoticeItem, 'id' | 'createdAt'> & { id?: string }): Promise<NoticeItem> => {
  const id = notice.id || `notice-${Date.now()}`;
  const record: NoticeItem = {
    ...notice,
    id,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  if (isFirebaseConfigured && db) {
    try {
      await setDoc(doc(db, 'notices', id), record, { merge: true });
    } catch (e) {
      console.error('[AdminService] Error saving notice to Firestore:', e);
    }
  }

  const list = getLocalCollection('notices', initialNotices);
  const existingIdx = list.findIndex((n) => n.id === id);
  if (existingIdx >= 0) {
    list[existingIdx] = record;
  } else {
    list.unshift(record);
  }
  setLocalCollection('notices', list);
  return record;
};

export const deleteNotice = async (id: string): Promise<void> => {
  if (isFirebaseConfigured && db) {
    try {
      await deleteDoc(doc(db, 'notices', id));
    } catch (e) {
      console.error('[AdminService] Error deleting notice from Firestore:', e);
    }
  }
  const list = getLocalCollection('notices', initialNotices).filter((n) => n.id !== id);
  setLocalCollection('notices', list);
};

export const toggleNoticePublish = async (id: string, published: boolean): Promise<void> => {
  if (isFirebaseConfigured && db) {
    try {
      await updateDoc(doc(db, 'notices', id), { published, updatedAt: new Date().toISOString() });
    } catch (e) {
      console.error('[AdminService] Error toggling notice publish:', e);
    }
  }
  const list = getLocalCollection('notices', initialNotices).map((n) =>
    n.id === id ? { ...n, published, updatedAt: new Date().toISOString() } : n
  );
  setLocalCollection('notices', list);
};

export const getNoticeById = async (id: string): Promise<NoticeItem | null> => {
  if (isFirebaseConfigured && db) {
    try {
      const snap = await getDoc(doc(db, 'notices', id));
      if (snap.exists()) {
        return { id: snap.id, ...snap.data() } as NoticeItem;
      }
    } catch (e) {
      console.warn('[AdminService] Firestore getNoticeById error:', e);
    }
  }
  const list = getLocalCollection('notices', initialNotices);
  return list.find((n) => n.id === id) || null;
};

// ==================== EVENTS ====================
export const getEventsAdmin = async (): Promise<EventItem[]> => {
  if (isFirebaseConfigured && db) {
    try {
      const q = query(collection(db, 'events'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        return snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as EventItem));
      }
    } catch (e) {
      console.warn('[AdminService] Firestore events query error, falling back:', e);
    }
  }
  return getLocalCollection('events', initialEvents);
};

export const saveEvent = async (event: Omit<EventItem, 'id' | 'createdAt'> & { id?: string }): Promise<EventItem> => {
  const id = event.id || `event-${Date.now()}`;
  const record: EventItem = {
    ...event,
    id,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  if (isFirebaseConfigured && db) {
    try {
      await setDoc(doc(db, 'events', id), record, { merge: true });
    } catch (e) {
      console.error('[AdminService] Error saving event:', e);
    }
  }

  const list = getLocalCollection('events', initialEvents);
  const idx = list.findIndex((e) => e.id === id);
  if (idx >= 0) list[idx] = record;
  else list.unshift(record);
  setLocalCollection('events', list);
  return record;
};

export const deleteEvent = async (id: string): Promise<void> => {
  if (isFirebaseConfigured && db) {
    try {
      await deleteDoc(doc(db, 'events', id));
    } catch (e) {
      console.error('[AdminService] Error deleting event:', e);
    }
  }
  const list = getLocalCollection('events', initialEvents).filter((e) => e.id !== id);
  setLocalCollection('events', list);
};

export const toggleEventPublish = async (id: string, published: boolean): Promise<void> => {
  if (isFirebaseConfigured && db) {
    try {
      await updateDoc(doc(db, 'events', id), { published, updatedAt: new Date().toISOString() });
    } catch (e) {
      console.error('[AdminService] Error toggling event:', e);
    }
  }
  const list = getLocalCollection('events', initialEvents).map((e) =>
    e.id === id ? { ...e, published, updatedAt: new Date().toISOString() } : e
  );
  setLocalCollection('events', list);
};

export const getEventById = async (id: string): Promise<EventItem | null> => {
  if (isFirebaseConfigured && db) {
    try {
      const snap = await getDoc(doc(db, 'events', id));
      if (snap.exists()) {
        return { id: snap.id, ...snap.data() } as EventItem;
      }
    } catch (e) {
      console.warn('[AdminService] Firestore getEventById error:', e);
    }
  }
  const list = getLocalCollection('events', initialEvents);
  return list.find((e) => e.id === id) || null;
};

// ==================== TEACHERS ====================
export const getTeachersAdmin = async (): Promise<TeacherItem[]> => {
  if (isFirebaseConfigured && db) {
    try {
      const snapshot = await getDocs(collection(db, 'teachers'));
      if (!snapshot.empty) {
        return snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as TeacherItem));
      }
    } catch (e) {
      console.warn('[AdminService] Firestore teachers query error:', e);
    }
  }
  return getLocalCollection('teachers', initialTeachers);
};

export const saveTeacher = async (teacher: Omit<TeacherItem, 'id'> & { id?: string }): Promise<TeacherItem> => {
  const id = teacher.id || `teacher-${Date.now()}`;
  const record: TeacherItem = { ...teacher, id };

  if (isFirebaseConfigured && db) {
    try {
      await setDoc(doc(db, 'teachers', id), record, { merge: true });
    } catch (e) {
      console.error('[AdminService] Error saving teacher:', e);
    }
  }

  const list = getLocalCollection('teachers', initialTeachers);
  const idx = list.findIndex((t) => t.id === id);
  if (idx >= 0) list[idx] = record;
  else list.push(record);
  setLocalCollection('teachers', list);
  return record;
};

export const deleteTeacher = async (id: string): Promise<void> => {
  if (isFirebaseConfigured && db) {
    try {
      await deleteDoc(doc(db, 'teachers', id));
    } catch (e) {
      console.error('[AdminService] Error deleting teacher:', e);
    }
  }
  const list = getLocalCollection('teachers', initialTeachers).filter((t) => t.id !== id);
  setLocalCollection('teachers', list);
};

export const toggleTeacherPublish = async (id: string, published: boolean): Promise<void> => {
  if (isFirebaseConfigured && db) {
    try {
      await updateDoc(doc(db, 'teachers', id), { published });
    } catch (e) {
      console.error('[AdminService] Error toggling teacher:', e);
    }
  }
  const list = getLocalCollection('teachers', initialTeachers).map((t) =>
    t.id === id ? { ...t, published } : t
  );
  setLocalCollection('teachers', list);
};

// ==================== DEPARTMENTS ====================
export const getDepartmentsAdmin = async (): Promise<DepartmentItem[]> => {
  if (isFirebaseConfigured && db) {
    try {
      const snapshot = await getDocs(collection(db, 'departments'));
      if (!snapshot.empty) {
        return snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as DepartmentItem));
      }
    } catch (e) {
      console.warn('[AdminService] Firestore departments query error:', e);
    }
  }
  return getLocalCollection('departments', initialDepartments);
};

export const saveDepartment = async (dept: Omit<DepartmentItem, 'id'> & { id?: string }): Promise<DepartmentItem> => {
  const id = dept.id || `dept-${Date.now()}`;
  const record: DepartmentItem = { ...dept, id };

  if (isFirebaseConfigured && db) {
    try {
      await setDoc(doc(db, 'departments', id), record, { merge: true });
    } catch (e) {
      console.error('[AdminService] Error saving department:', e);
    }
  }

  const list = getLocalCollection('departments', initialDepartments);
  const idx = list.findIndex((d) => d.id === id);
  if (idx >= 0) list[idx] = record;
  else list.push(record);
  setLocalCollection('departments', list);
  return record;
};

export const deleteDepartment = async (id: string): Promise<void> => {
  if (isFirebaseConfigured && db) {
    try {
      await deleteDoc(doc(db, 'departments', id));
    } catch (e) {
      console.error('[AdminService] Error deleting department:', e);
    }
  }
  const list = getLocalCollection('departments', initialDepartments).filter((d) => d.id !== id);
  setLocalCollection('departments', list);
};

export const toggleDepartmentPublish = async (id: string, published: boolean): Promise<void> => {
  if (isFirebaseConfigured && db) {
    try {
      await updateDoc(doc(db, 'departments', id), { published });
    } catch (e) {
      console.error('[AdminService] Error toggling department:', e);
    }
  }
  const list = getLocalCollection('departments', initialDepartments).map((d) =>
    d.id === id ? { ...d, published } : d
  );
  setLocalCollection('departments', list);
};

// ==================== GALLERY ====================
export const getGalleryAdmin = async (): Promise<GalleryItem[]> => {
  if (isFirebaseConfigured && db) {
    try {
      const q = query(collection(db, 'gallery'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        return snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as GalleryItem));
      }
    } catch (e) {
      console.warn('[AdminService] Firestore gallery query error:', e);
    }
  }
  return getLocalCollection('gallery', initialGallery);
};

export const saveGalleryItem = async (
  item: Omit<GalleryItem, 'id' | 'createdAt'> & { id?: string }
): Promise<GalleryItem> => {
  const id = item.id || `gal-${Date.now()}`;
  const record: GalleryItem = {
    ...item,
    id,
    createdAt: new Date().toISOString(),
  };

  if (isFirebaseConfigured && db) {
    try {
      await setDoc(doc(db, 'gallery', id), record, { merge: true });
    } catch (e) {
      console.error('[AdminService] Error saving gallery item:', e);
    }
  }

  const list = getLocalCollection('gallery', initialGallery);
  const idx = list.findIndex((g) => g.id === id);
  if (idx >= 0) list[idx] = record;
  else list.unshift(record);
  setLocalCollection('gallery', list);
  return record;
};

export const deleteGalleryItem = async (id: string): Promise<void> => {
  if (isFirebaseConfigured && db) {
    try {
      await deleteDoc(doc(db, 'gallery', id));
    } catch (e) {
      console.error('[AdminService] Error deleting gallery item:', e);
    }
  }
  const list = getLocalCollection('gallery', initialGallery).filter((g) => g.id !== id);
  setLocalCollection('gallery', list);
};

export const toggleGalleryPublish = async (id: string, published: boolean): Promise<void> => {
  if (isFirebaseConfigured && db) {
    try {
      await updateDoc(doc(db, 'gallery', id), { published });
    } catch (e) {
      console.error('[AdminService] Error toggling gallery publish:', e);
    }
  }
  const list = getLocalCollection('gallery', initialGallery).map((g) =>
    g.id === id ? { ...g, published } : g
  );
  setLocalCollection('gallery', list);
};

// ==================== ADMISSIONS ====================
export const getAdmissionsAdmin = async (): Promise<AdmissionEnquiry[]> => {
  if (isFirebaseConfigured && db) {
    try {
      const q = query(collection(db, 'admissions'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        return snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as AdmissionEnquiry));
      }
    } catch (e) {
      console.warn('[AdminService] Firestore admissions query error:', e);
    }
  }
  return getLocalCollection<AdmissionEnquiry>('admissions', []);
};

export const updateAdmissionStatus = async (
  id: string,
  status: 'New' | 'Contacted' | 'Closed'
): Promise<void> => {
  const now = new Date().toISOString();
  if (isFirebaseConfigured && db) {
    try {
      await updateDoc(doc(db, 'admissions', id), { status, updatedAt: now });
    } catch (e) {
      console.error('[AdminService] Error updating admission status:', e);
    }
  }
  const list = getLocalCollection<AdmissionEnquiry>('admissions', []).map((a) =>
    a.id === id ? { ...a, status, updatedAt: now } : a
  );
  setLocalCollection('admissions', list);
};

export const deleteAdmission = async (id: string): Promise<void> => {
  if (isFirebaseConfigured && db) {
    try {
      await deleteDoc(doc(db, 'admissions', id));
    } catch (e) {
      console.error('[AdminService] Error deleting admission enquiry:', e);
    }
  }
  const list = getLocalCollection<AdmissionEnquiry>('admissions', []).filter((a) => a.id !== id);
  setLocalCollection('admissions', list);
};

// ==================== STUDENTS ====================
export const getStudentsAdmin = async (): Promise<StudentDocument[]> => {
  if (isFirebaseConfigured && db) {
    try {
      const q = query(collection(db, 'students'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        return snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as StudentDocument));
      }
    } catch (e) {
      console.warn('[AdminService] Firestore students query error:', e);
    }
  }
  return getLocalCollection('students', initialStudents);
};

export const saveStudent = async (
  student: Omit<StudentDocument, 'id' | 'createdAt' | 'updatedAt'> & { id?: string }
): Promise<StudentDocument> => {
  // Validate duplicate Student ID
  const allStudents = await getStudentsAdmin();
  const duplicate = allStudents.find(
    (s) => s.studentId.trim().toUpperCase() === student.studentId.trim().toUpperCase() && s.id !== student.id
  );
  if (duplicate) {
    throw new Error(`A student with Student ID "${student.studentId}" already exists (${duplicate.name}). Duplicate IDs are prohibited.`);
  }

  const id = student.id || `std-${Date.now()}`;
  const record: StudentDocument = {
    ...student,
    id,
    studentId: student.studentId.trim().toUpperCase(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  if (isFirebaseConfigured && db) {
    try {
      await setDoc(doc(db, 'students', id), record, { merge: true });
    } catch (e) {
      console.error('[AdminService] Error saving student to Firestore:', e);
    }
  }

  const list = getLocalCollection('students', initialStudents);
  const idx = list.findIndex((s) => s.id === id);
  if (idx >= 0) list[idx] = record;
  else list.unshift(record);
  setLocalCollection('students', list);
  return record;
};

export const deleteStudent = async (id: string): Promise<void> => {
  if (isFirebaseConfigured && db) {
    try {
      await deleteDoc(doc(db, 'students', id));
    } catch (e) {
      console.error('[AdminService] Error deleting student from Firestore:', e);
    }
  }
  const list = getLocalCollection('students', initialStudents).filter((s) => s.id !== id);
  setLocalCollection('students', list);
};

export const toggleStudentStatus = async (id: string, accountStatus: 'Active' | 'Disabled'): Promise<void> => {
  if (isFirebaseConfigured && db) {
    try {
      await updateDoc(doc(db, 'students', id), {
        accountStatus,
        updatedAt: new Date().toISOString(),
      });
    } catch (e) {
      console.error('[AdminService] Error updating student account status:', e);
    }
  }
  const list = getLocalCollection('students', initialStudents).map((s) =>
    s.id === id ? { ...s, accountStatus, updatedAt: new Date().toISOString() } : s
  );
  setLocalCollection('students', list);
};

// ==================== SETTINGS ====================
export const getSchoolSettings = async (): Promise<SchoolSettings> => {
  if (isFirebaseConfigured && db) {
    try {
      const docSnap = await getDoc(doc(db, 'schools', 'main'));
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as SchoolSettings;
      }
    } catch (e) {
      console.warn('[AdminService] Firestore settings read error:', e);
    }
  }
  const saved = localStorage.getItem(STORAGE_PREFIX + 'settings');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      // Fallback
    }
  }
  return initialSettings;
};

export const saveSchoolSettings = async (settings: SchoolSettings): Promise<void> => {
  if (isFirebaseConfigured && db) {
    try {
      await setDoc(doc(db, 'schools', 'main'), settings, { merge: true });
    } catch (e) {
      console.error('[AdminService] Error saving school settings:', e);
    }
  }
  localStorage.setItem(STORAGE_PREFIX + 'settings', JSON.stringify(settings));
};

// ==================== DASHBOARD STATS ====================
export const getDashboardStats = async (): Promise<DashboardStats> => {
  const [notices, events, teachers, departments, gallery, students, admissions] = await Promise.all([
    getNoticesAdmin(),
    getEventsAdmin(),
    getTeachersAdmin(),
    getDepartmentsAdmin(),
    getGalleryAdmin(),
    getStudentsAdmin(),
    getAdmissionsAdmin(),
  ]);

  return {
    totalNotices: notices.length,
    totalEvents: events.length,
    totalTeachers: teachers.length,
    totalDepartments: departments.length,
    totalGallery: gallery.length,
    totalStudents: students.length,
    newAdmissions: admissions.filter((a) => a.status === 'New').length,
  };
};
