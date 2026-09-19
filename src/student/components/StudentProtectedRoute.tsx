import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { subscribeStudentAuth, logoutStudent, type AuthSessionUser } from '../../services/authService';
import { getStudentProfile } from '../../services/studentService';
import type { StudentDocument } from '../../types/firestore';
import { Loader2, AlertCircle, LogOut } from 'lucide-react';

export const StudentProtectedRoute: React.FC = () => {
  const [user, setUser] = useState<AuthSessionUser | null | undefined>(undefined);
  const [profile, setProfile] = useState<StudentDocument | null | undefined>(undefined);

  useEffect(() => {
    const unsubscribe = subscribeStudentAuth(async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        try {
          const p = await getStudentProfile(currentUser.uid, currentUser.studentId);
          setProfile(p);
        } catch {
          setProfile(null);
        }
      } else {
        setProfile(null);
      }
    });
    return () => unsubscribe();
  }, []);

  // Loading state
  if (user === undefined || profile === undefined) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#091f17] text-white">
        <Loader2 className="w-10 h-10 animate-spin text-[#c59b27] mb-4" />
        <p className="text-sm text-emerald-200/80 font-medium">Verifying student credentials...</p>
      </div>
    );
  }

  // Not logged in or not student role
  if (!user || user.role !== 'student') {
    return <Navigate to="/student/login" replace />;
  }

  // Check if student account was disabled by administrator
  if (profile && profile.accountStatus === 'Disabled') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 p-4 font-sans">
        <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full text-center shadow-2xl border border-slate-200">
          <div className="w-14 h-14 bg-rose-100 text-rose-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">Student Portal Access Disabled</h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
            Your student account (<strong className="font-mono text-slate-800">{profile.studentId}</strong>) has been deactivated by the Madrassa administration.
          </p>
          <div className="my-5 p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 text-left">
            <strong className="block text-slate-800 font-bold mb-1">Administrative Office Help Desk:</strong>
            <p>Phone: +91 94470 00000</p>
            <p>Office: Sharafiyya Korangath Campus, Tirur</p>
          </div>
          <button
            type="button"
            onClick={async () => {
              await logoutStudent();
              window.location.href = '/student/login';
            }}
            className="w-full py-2.5 px-4 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Return to Login</span>
          </button>
        </div>
      </div>
    );
  }

  return <Outlet />;
};
