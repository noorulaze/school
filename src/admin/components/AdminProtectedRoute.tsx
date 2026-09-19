import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { subscribeAdminAuth, type AuthSessionUser } from '../../services/authService';
import { Loader2 } from 'lucide-react';

export const AdminProtectedRoute: React.FC = () => {
  const [user, setUser] = useState<AuthSessionUser | null | undefined>(undefined);

  useEffect(() => {
    const unsubscribe = subscribeAdminAuth((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Loading state
  if (user === undefined) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#0d281e] text-white">
        <Loader2 className="w-10 h-10 animate-spin text-[#c59b27] mb-4" />
        <p className="text-sm text-emerald-200/80 font-medium">Verifying administrator authorization...</p>
      </div>
    );
  }

  // Not logged in or not admin role
  if (!user || user.role !== 'admin') {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
};
