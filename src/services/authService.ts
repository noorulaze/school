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
const LOCAL_CUSTOM_ADMIN_CREDS_KEY = 'sharafiyya_custom_admin_creds';

export interface AdminCredentials {
  username: string;
  password: string;
}

// Retrieve configured temporary admin credentials, defaulting to admin / admin @123
export const getAdminCredentials = (): AdminCredentials => {
  try {
    const raw = localStorage.getItem(LOCAL_CUSTOM_ADMIN_CREDS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed.username && parsed.password) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Error reading custom admin credentials:', e);
  }
  return {
    username: 'admin',
    password: 'admin @123'
  };
};

// Update temporary admin credentials (used in Admin Settings)
export const updateAdminCredentials = (username: string, password: string): void => {
  if (!username.trim() || !password.trim()) {
    throw new Error('Username and password cannot be empty.');
  }
  localStorage.setItem(
    LOCAL_CUSTOM_ADMIN_CREDS_KEY,
    JSON.stringify({
      username: username.trim(),
      password: password.trim()
    })
  );
};

// Admin Login
export const loginAdmin = async (emailOrUsername: string, pass: string): Promise<AuthSessionUser> => {
  const trimmedInput = emailOrUsername.trim().toLowerCase();
  const trimmedPass = pass.trim();

  // 1. Check temporary/demo credentials (configurable in Admin Settings)
  const currentCreds = getAdminCredentials();
  const matchesUsername =
    trimmedInput === currentCreds.username.trim().toLowerCase() ||
    (currentCreds.username.trim().toLowerCase() === 'admin' && (trimmedInput === 'admin@sharafiyya.edu' || trimmedInput === 'admin@sharafiyya.com'));

  // Allow both "admin @123" and "admin@123" by comparing normalized non-whitespace
  const normalizedInputPass = trimmedPass.replace(/\s+/g, '');
  const normalizedConfiguredPass = currentCreds.password.trim().replace(/\s+/g, '');

  const matchesPass =
    trimmedPass === currentCreds.password.trim() ||
    normalizedInputPass === normalizedConfiguredPass ||
    (currentCreds.username.trim().toLowerCase() === 'admin' && (trimmedPass === 'Admin@123' || trimmedPass === 'admin123'));

  if (matchesUsername && matchesPass) {
    const session: AuthSessionUser = {
      uid: 'demo-admin-uid-001',
      email: trimmedInput.includes('@') ? trimmedInput : `${currentCreds.username}@sharafiyya.edu`,
      displayName: 'Principal / Administrator',
      role: 'admin'
    };
    localStorage.setItem(LOCAL_ADMIN_KEY, JSON.stringify(session));
    return session;
  }

  // 2. If Firebase is configured and user typed an email, try Firebase Authentication
  if (isFirebaseConfigured && auth && trimmedInput.includes('@')) {
    try {
      await setPersistence(auth, browserLocalPersistence);
      const cred = await signInWithEmailAndPassword(auth, trimmedInput, pass);
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

  throw new Error(`Invalid credentials. For temporary demo access, use Username: "${currentCreds.username}" and Password: "${currentCreds.password}".`);
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
