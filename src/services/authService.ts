import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence,
  updatePassword,
  type User
} from 'firebase/auth';
import { auth, isFirebaseConfigured } from '../lib/firebase';

export interface AuthSessionUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  role: 'admin' | 'student';
  studentId?: string;
}

const LOCAL_ADMIN_KEY = 'sharafiyya_admin_session';
const LOCAL_STUDENT_KEY = 'sharafiyya_student_session';

// Admin Login
export const loginAdmin = async (email: string, pass: string): Promise<AuthSessionUser> => {
  const trimmedEmail = email.trim().toLowerCase();

  if (isFirebaseConfigured && auth) {
    try {
      await setPersistence(auth, browserLocalPersistence);
      const cred = await signInWithEmailAndPassword(auth, trimmedEmail, pass);
      const user = cred.user;
      return {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || 'School Administrator',
        role: 'admin'
      };
    } catch (error: any) {
      console.error('[AuthService] Firebase admin sign-in failed:', error);
      throw new Error(error.message || 'Invalid administrator email or password.');
    }
  }

  // Resilient Development / Demo Mode
  if (
    (trimmedEmail === 'admin@sharafiyya.edu' || trimmedEmail === 'admin@sharafiyya.com' || trimmedEmail === 'admin') &&
    (pass === 'Admin@123' || pass === 'admin123' || pass === 'admin')
  ) {
    const session: AuthSessionUser = {
      uid: 'demo-admin-uid-001',
      email: trimmedEmail.includes('@') ? trimmedEmail : 'admin@sharafiyya.edu',
      displayName: 'Principal / Administrator',
      role: 'admin'
    };
    localStorage.setItem(LOCAL_ADMIN_KEY, JSON.stringify(session));
    return session;
  }

  throw new Error('Invalid credentials. In development mode, use admin@sharafiyya.edu / Admin@123');
};

// Student Login (Student ID or Email)
export const loginStudent = async (identifier: string, pass: string): Promise<AuthSessionUser> => {
  const trimmed = identifier.trim();

  if (isFirebaseConfigured && auth) {
    try {
      const email = trimmed.includes('@') ? trimmed : `${trimmed.toLowerCase().replace(/[^a-z0-9]/g, '')}@student.sharafiyya.edu`;
      await setPersistence(auth, browserLocalPersistence);
      const cred = await signInWithEmailAndPassword(auth, email, pass);
      const user = cred.user;
      return {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || trimmed,
        role: 'student',
        studentId: trimmed
      };
    } catch (error: any) {
      console.error('[AuthService] Firebase student sign-in failed:', error);
      throw new Error(error.message || 'Invalid Student ID or password.');
    }
  }

  // Resilient Development / Demo Mode
  // Accepts e.g. "SK-2025-001" or "student@sharafiyya.edu" with "Student@123"
  if (
    (trimmed.toUpperCase() === 'SK-2025-001' || trimmed.toUpperCase() === 'SK-2025-042' || trimmed.toLowerCase() === 'student@sharafiyya.edu') &&
    (pass === 'Student@123' || pass === 'student123' || pass === 'student')
  ) {
    const session: AuthSessionUser = {
      uid: 'demo-student-uid-001',
      email: 'student@sharafiyya.edu',
      displayName: 'Enrolled Student',
      role: 'student',
      studentId: trimmed.toUpperCase().startsWith('SK-') ? trimmed.toUpperCase() : 'SK-2025-001'
    };
    localStorage.setItem(LOCAL_STUDENT_KEY, JSON.stringify(session));
    return session;
  }

  throw new Error('Invalid credentials. In development mode, use Student ID SK-2025-001 / Student@123');
};

// Logout Admin
export const logoutAdmin = async (): Promise<void> => {
  localStorage.removeItem(LOCAL_ADMIN_KEY);
  if (isFirebaseConfigured && auth) {
    await signOut(auth);
  }
};

// Logout Student
export const logoutStudent = async (): Promise<void> => {
  localStorage.removeItem(LOCAL_STUDENT_KEY);
  if (isFirebaseConfigured && auth) {
    await signOut(auth);
  }
};

// Change Password for Logged In Student
export const changeStudentPassword = async (newPass: string): Promise<void> => {
  if (!newPass || newPass.trim().length < 6) {
    throw new Error('New password must be at least 6 characters long.');
  }

  if (isFirebaseConfigured && auth && auth.currentUser) {
    try {
      await updatePassword(auth.currentUser, newPass.trim());
      return;
    } catch (err: any) {
      if (err.code === 'auth/requires-recent-login') {
        throw new Error('This operation is sensitive. Please log out and sign back in before changing your password.');
      }
      throw new Error(err.message || 'Failed to update password. Please try again.');
    }
  }

  // Local demo mode confirmation
  return;
};

// Subscribe to Admin Auth State
export const subscribeAdminAuth = (callback: (user: AuthSessionUser | null) => void): (() => void) => {
  // Check local demo store first
  const stored = localStorage.getItem(LOCAL_ADMIN_KEY);
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      callback(parsed);
      return () => {};
    } catch {
      localStorage.removeItem(LOCAL_ADMIN_KEY);
    }
  }

  if (isFirebaseConfigured && auth) {
    return onAuthStateChanged(auth, (firebaseUser: User | null) => {
      if (firebaseUser) {
        callback({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName || 'Administrator',
          role: 'admin'
        });
      } else {
        callback(null);
      }
    });
  }

  callback(null);
  return () => {};
};

// Subscribe to Student Auth State
export const subscribeStudentAuth = (callback: (user: AuthSessionUser | null) => void): (() => void) => {
  const stored = localStorage.getItem(LOCAL_STUDENT_KEY);
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      callback(parsed);
      return () => {};
    } catch {
      localStorage.removeItem(LOCAL_STUDENT_KEY);
    }
  }

  if (isFirebaseConfigured && auth) {
    return onAuthStateChanged(auth, (firebaseUser: User | null) => {
      if (firebaseUser) {
        callback({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName || 'Enrolled Student',
          role: 'student',
          studentId: firebaseUser.displayName || 'SK-2025-001'
        });
      } else {
        callback(null);
      }
    });
  }

  callback(null);
  return () => {};
};
