import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  updateDoc
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from '../lib/firebase';
import type {
  StudentDocument,
  AttendanceRecord,
  AcademicRecord,
  NoticeItem,
  EventItem
} from '../types/firestore';
import { getStudentsAdmin } from './adminService';
import { changeStudentPassword, setStudentFallbackPassword } from './authService';

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

// ==================== STUDENT ACCOUNT SETTINGS & SELF-SERVICE ====================

// Update Student Custom Username
export const updateStudentUsername = async (
  uid: string,
  newUsername: string
): Promise<{ success: boolean; username: string }> => {
  const clean = newUsername.trim().toLowerCase();
  if (!clean || clean.length < 3 || clean.length > 25) {
    throw new Error('Username must be between 3 and 25 characters long.');
  }
  if (!/^[a-z0-9_.-]+$/.test(clean)) {
    throw new Error('Username may only contain letters, numbers, dots, hyphens, and underscores.');
  }

  // Check uniqueness across students
  const allStudents = await getStudentsAdmin();
  const collision = allStudents.find(
    (s) =>
      s.uid !== uid &&
      (s.studentId.toLowerCase() === clean || (s.username && s.username.toLowerCase() === clean))
  );
  if (collision) {
    throw new Error(`Username "${clean}" is already claimed. Please choose a different identifier.`);
  }

  const currentStudent = allStudents.find((s) => s.uid === uid || s.id === uid);
  const now = new Date().toISOString();

  if (isFirebaseConfigured && db && currentStudent) {
    try {
      await updateDoc(doc(db, 'students', currentStudent.id), {
        username: clean,
        updatedAt: now,
      });
    } catch (err) {
      console.warn('[StudentService] Firestore username update warning:', err);
    }
  }

  // Update localStorage caches
  try {
    const keys = ['sharafiyya_admin_students', 'sharafiyya_students'];
    for (const key of keys) {
      const raw = localStorage.getItem(key);
      if (raw) {
        const list: StudentDocument[] = JSON.parse(raw);
        const updated = list.map((s) =>
          s.uid === uid || s.id === (currentStudent ? currentStudent.id : '')
            ? { ...s, username: clean, updatedAt: now }
            : s
        );
        localStorage.setItem(key, JSON.stringify(updated));
      }
    }
    // Update active student session if applicable
    const sessRaw = localStorage.getItem('sharafiyya_student_session');
    if (sessRaw) {
      const sess = JSON.parse(sessRaw);
      if (sess.uid === uid) {
        sess.username = clean;
        localStorage.setItem('sharafiyya_student_session', JSON.stringify(sess));
      }
    }
  } catch {}

  return { success: true, username: clean };
};

// Update Allowed Student Personal Details
export const updateStudentPersonalInfo = async (
  uid: string,
  data: {
    phone?: string;
    address?: string;
    emergencyContact?: string;
    bloodGroup?: string;
    bio?: string;
  }
): Promise<StudentDocument> => {
  const allStudents = await getStudentsAdmin();
  const currentStudent = allStudents.find((s) => s.uid === uid || s.id === uid);
  if (!currentStudent) {
    throw new Error('Student profile not found.');
  }

  const now = new Date().toISOString();
  const updatedStudent: StudentDocument = {
    ...currentStudent,
    phone: data.phone !== undefined ? data.phone.trim() : currentStudent.phone,
    address: data.address !== undefined ? data.address.trim() : currentStudent.address,
    emergencyContact: data.emergencyContact !== undefined ? data.emergencyContact.trim() : currentStudent.emergencyContact,
    bloodGroup: data.bloodGroup !== undefined ? data.bloodGroup.trim() : currentStudent.bloodGroup,
    bio: data.bio !== undefined ? data.bio.trim() : currentStudent.bio,
    updatedAt: now,
  };

  if (isFirebaseConfigured && db) {
    try {
      await updateDoc(doc(db, 'students', currentStudent.id), {
        phone: updatedStudent.phone,
        address: updatedStudent.address,
        emergencyContact: updatedStudent.emergencyContact,
        bloodGroup: updatedStudent.bloodGroup,
        bio: updatedStudent.bio,
        updatedAt: now,
      });
    } catch (err) {
      console.warn('[StudentService] Firestore personal info update warning:', err);
    }
  }

  try {
    const keys = ['sharafiyya_admin_students', 'sharafiyya_students'];
    for (const key of keys) {
      const raw = localStorage.getItem(key);
      if (raw) {
        const list: StudentDocument[] = JSON.parse(raw);
        const updated = list.map((s) => (s.id === currentStudent.id ? updatedStudent : s));
        localStorage.setItem(key, JSON.stringify(updated));
      }
    }
  } catch {}

  return updatedStudent;
};

// Complete First Login or Required Password Reset
export const completeFirstLogin = async (
  uid: string,
  newPass: string
): Promise<void> => {
  if (!newPass || newPass.trim().length < 6) {
    throw new Error('New password must be at least 6 characters long.');
  }

  const cleanPass = newPass.trim();
  const allStudents = await getStudentsAdmin();
  const currentStudent = allStudents.find((s) => s.uid === uid || s.id === uid);
  const now = new Date().toISOString();

  // 1. Try Firebase Auth update if signed in
  try {
    await changeStudentPassword(cleanPass);
  } catch (authErr: any) {
    console.warn('[StudentService] Firebase Auth updatePassword note:', authErr.message);
  }

  // 2. Update fallback password store
  if (currentStudent) {
    setStudentFallbackPassword(currentStudent.studentId, cleanPass);
    setStudentFallbackPassword(currentStudent.id, cleanPass);
  }

  // 3. Mark mustChangePassword & firstLogin as false in Firestore
  if (isFirebaseConfigured && db && currentStudent) {
    try {
      await updateDoc(doc(db, 'students', currentStudent.id), {
        firstLogin: false,
        mustChangePassword: false,
        updatedAt: now,
      });
    } catch (err) {
      console.warn('[StudentService] Firestore firstLogin flag update warning:', err);
    }
  }

  // 4. Update localStorage collections
  try {
    const keys = ['sharafiyya_admin_students', 'sharafiyya_students'];
    for (const key of keys) {
      const raw = localStorage.getItem(key);
      if (raw) {
        const list: StudentDocument[] = JSON.parse(raw);
        const updated = list.map((s) =>
          s.uid === uid || s.id === (currentStudent ? currentStudent.id : '')
            ? { ...s, firstLogin: false, mustChangePassword: false, updatedAt: now }
            : s
        );
        localStorage.setItem(key, JSON.stringify(updated));
      }
    }

    // 5. Clear mustChangePassword on active student session
    const sessRaw = localStorage.getItem('sharafiyya_student_session');
    if (sessRaw) {
      const sess = JSON.parse(sessRaw);
      sess.mustChangePassword = false;
      localStorage.setItem('sharafiyya_student_session', JSON.stringify(sess));
    }
  } catch {}
};
