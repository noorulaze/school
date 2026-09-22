import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from '../lib/firebase';
import type {
  StudentDocument,
  AttendanceRecord,
  AcademicRecord,
  NoticeItem,
  EventItem
} from '../types/firestore';

// Fetch Current Student Profile by UID or Student ID
export const getStudentProfile = async (
  uid: string,
  studentId?: string
): Promise<StudentDocument | null> => {
  if (isFirebaseConfigured && db) {
    try {
      // 1. Try fetching by doc ID
      const directDoc = await getDoc(doc(db, 'students', uid));
      if (directDoc.exists()) {
        return { id: directDoc.id, ...directDoc.data() } as StudentDocument;
      }

      // 2. Try query by UID field
      const qUid = query(collection(db, 'students'), where('uid', '==', uid));
      const snapUid = await getDocs(qUid);
      if (!snapUid.empty) {
        const d = snapUid.docs[0];
        return { id: d.id, ...d.data() } as StudentDocument;
      }
    } catch (err) {
      console.warn('[StudentService] Firestore student fetch error:', err);
    }
  }

  // Fallback in Local Development / Demo Mode (reads local storage without admin privileges)
  try {
    const raw = localStorage.getItem('sharafiyya_students');
    if (raw) {
      const all: StudentDocument[] = JSON.parse(raw);
      const found = all.find(
        (s) => s.uid === uid || (studentId && s.studentId.toUpperCase() === studentId.toUpperCase())
      );
      if (found) return found;
    }
  } catch {}

  // If newly created session in development
  return {
    id: 'std-default',
    uid,
    studentId: studentId || 'SK-2025-001',
    name: 'Enrolled Student',
    email: 'student@sharafiyya.edu',
    className: 'Class 5 - Intermediate',
    section: 'Section A',
    department: 'Qur’an & Tajweed',
    academicYear: '2025–2026',
    accountStatus: 'Active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
};

// Fetch Student Attendance Record (Real or null; no fake data)
export const getStudentAttendance = async (uid: string): Promise<AttendanceRecord | null> => {
  if (isFirebaseConfigured && db) {
    try {
      const q = query(collection(db, 'attendance'), where('uid', '==', uid));
      const snap = await getDocs(q);
      if (!snap.empty) {
        const d = snap.docs[0];
        return { id: d.id, ...d.data() } as AttendanceRecord;
      }
    } catch (err) {
      console.warn('[StudentService] Firestore attendance fetch error:', err);
    }
  }
  // Return null when records have not been compiled yet - NO fake percentages
  return null;
};

// Fetch Student Academic Records (Real or empty list; no fake marks)
export const getStudentAcademicRecords = async (uid: string): Promise<AcademicRecord[]> => {
  if (isFirebaseConfigured && db) {
    try {
      const q = query(
        collection(db, 'academicRecords'),
        where('uid', '==', uid),
        where('published', '==', true)
      );
      const snap = await getDocs(q);
      if (!snap.empty) {
        return snap.docs.map((d) => ({ id: d.id, ...d.data() } as AcademicRecord));
      }
    } catch (err) {
      console.warn('[StudentService] Firestore academic records fetch error:', err);
    }
  }
  // Return empty list when evaluations have not been published yet - NO fake grades
  return [];
};

// Fetch Announcements for Student Dashboard (from published notices targeted to students or everyone)
export const getStudentAnnouncements = async (): Promise<NoticeItem[]> => {
  if (isFirebaseConfigured && db) {
    try {
      const q = query(
        collection(db, 'notices'),
        where('published', '==', true)
      );
      const snap = await getDocs(q);
      if (!snap.empty) {
        return snap.docs
          .map((d) => ({ id: d.id, ...d.data() } as NoticeItem))
          .filter(
            (n) => !n.targetAudience || n.targetAudience === 'Everyone' || n.targetAudience === 'Students'
          );
      }
    } catch (err) {
      console.warn('[StudentService] Firestore notices fetch error:', err);
    }
  }

  // Fallback
  try {
    const raw = localStorage.getItem('sharafiyya_notices');
    if (raw) {
      const all: NoticeItem[] = JSON.parse(raw);
      return all.filter(
        (n) => n.published && (!n.targetAudience || n.targetAudience === 'Everyone' || n.targetAudience === 'Students')
      );
    }
  } catch {}

  return [];
};

export const getStudentNotices = getStudentAnnouncements;

// Fetch Upcoming Events for Student Dashboard
export const getStudentEvents = async (): Promise<EventItem[]> => {
  if (isFirebaseConfigured && db) {
    try {
      const q = query(
        collection(db, 'events'),
        where('published', '==', true)
      );
      const snap = await getDocs(q);
      if (!snap.empty) {
        return snap.docs.map((d) => ({ id: d.id, ...d.data() } as EventItem));
      }
    } catch (err) {
      console.warn('[StudentService] Firestore events fetch error:', err);
    }
  }

  // Fallback
  try {
    const raw = localStorage.getItem('sharafiyya_events');
    if (raw) {
      const all: EventItem[] = JSON.parse(raw);
      return all.filter((e) => e.published);
    }
  } catch {}

  return [];
};
