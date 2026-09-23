import React, { useEffect, useState } from 'react';
import {
  Save,
  CheckCircle2,
  Building,
  Phone,
  Loader2,
  KeyRound,
  AlertCircle,
  RefreshCw
} from 'lucide-react';
import { getSchoolSettings, saveSchoolSettings } from '../../services/adminService';
import {
  getAdminCredentials,
  updateAdminCredentials,
  type AdminCredentials
} from '../../services/authService';
import type { SchoolSettings } from '../../types/firestore';

export const AdminSettings: React.FC = () => {
  const [settings, setSettings] = useState<SchoolSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Temporary testing admin credentials state
  const [adminCreds, setAdminCreds] = useState<AdminCredentials>({
    username: 'admin',
    password: 'admin @123'
  });
  const [credsSuccess, setCredsSuccess] = useState(false);
  const [credsError, setCredsError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const data = await getSchoolSettings();
        setSettings(data);
        setAdminCreds(getAdminCredentials());
      } catch (err) {
        console.error('Error loading settings:', err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;

    setSaving(true);
    try {
      await saveSchoolSettings(settings);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 4000);
    } catch (err) {
      console.error('Error saving settings:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleUpdateCreds = (e: React.FormEvent) => {
    e.preventDefault();
    setCredsError(null);
    if (!adminCreds.username.trim()) {
      setCredsError('Admin username cannot be empty.');
      return;
    }
    if (!adminCreds.password.trim() || adminCreds.password.trim().length < 4) {
      setCredsError('Admin password must be at least 4 characters long.');
      return;
    }

    try {
      updateAdminCredentials(adminCreds.username.trim(), adminCreds.password.trim());
      setCredsSuccess(true);
      setTimeout(() => setCredsSuccess(false), 4000);
    } catch (err: any) {
      setCredsError(err.message || 'Failed to update admin credentials.');
    }
  };

  const handleResetDefaultCreds = () => {
    updateAdminCredentials('admin', 'admin @123');
    setAdminCreds({ username: 'admin', password: 'admin @123' });
    setCredsSuccess(true);
    setCredsError(null);
    setTimeout(() => setCredsSuccess(false), 4000);
  };

  if (loading || !settings) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
        <Loader2 className="w-8 h-8 text-emerald-800 animate-spin mx-auto mb-2" />
        <p className="text-xs text-slate-500">Loading school settings...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
          Madrassa Profile & Contact Settings
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Update official institutional names, contact numbers, office hours, and transit information.
        </p>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>School settings have been updated and synchronized successfully.</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Institutional Identity Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Building className="w-4 h-4 text-emerald-800" />
            <h2 className="text-sm font-bold text-slate-900">Institutional Identity</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Official English Name
              </label>
              <input
                type="text"
                required
                value={settings.officialName}
                onChange={(e) => setSettings({ ...settings, officialName: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-700"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Locality / Branch Name
              </label>
              <input
                type="text"
                required
                value={settings.localName}
                onChange={(e) => setSettings({ ...settings, localName: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-700"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Arabic Calligraphy Subtitle
            </label>
            <input
              type="text"
              value={settings.arabicSubtitle}
              onChange={(e) => setSettings({ ...settings, arabicSubtitle: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-serif"
            />
          </div>
        </div>

        {/* Contact & Office Details */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Phone className="w-4 h-4 text-emerald-800" />
            <h2 className="text-sm font-bold text-slate-900">Official Contact & Office Hours</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Help Desk Phone Number
              </label>
              <input
                type="text"
                required
                value={settings.phone}
                onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Administrative Email
              </label>
              <input
                type="email"
                required
                value={settings.email}
                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Office Hours & Working Schedule
            </label>
            <input
              type="text"
              required
              value={settings.officeHours}
              onChange={(e) => setSettings({ ...settings, officeHours: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Campus Address
            </label>
            <input
              type="text"
              required
              value={settings.address}
              onChange={(e) => setSettings({ ...settings, address: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Transit & Railway Directions
            </label>
            <input
              type="text"
              value={settings.transitDirections}
              onChange={(e) => setSettings({ ...settings, transitDirections: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900"
            />
          </div>
        </div>

        {/* Submit button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#164e37] hover:bg-[#113d2b] text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer disabled:opacity-50"
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Saving Changes...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4 text-[#c59b27]" />
                <span>Save School Profile</span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* Change Admin Credentials (Temporary Testing Setup) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-4 pt-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
          <div className="flex items-center gap-2">
            <KeyRound className="w-4 h-4 text-[#c59b27]" />
            <h2 className="text-sm font-bold text-slate-900">Change Admin Credentials</h2>
          </div>
          <span className="self-start sm:self-auto text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
            Temporary Testing Credentials
          </span>
        </div>

        <p className="text-xs text-slate-500 leading-relaxed">
          Configure the temporary username and password used to access this Admin Portal during testing and demonstration. You can customize them here at any time. When ready for final school handover, this can be seamlessly upgraded to production Firebase Authentication.
        </p>

        {credsSuccess && (
          <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Admin credentials successfully updated! You can now log in using these new details.</span>
          </div>
        )}

        {credsError && (
          <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{credsError}</span>
          </div>
        )}

        <form onSubmit={handleUpdateCreds} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Admin Username
              </label>
              <input
                type="text"
                required
                value={adminCreds.username}
                onChange={(e) => setAdminCreds({ ...adminCreds, username: e.target.value })}
                placeholder="admin"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-700"
              />
              <span className="text-[10px] text-slate-400 mt-1 block">Default: admin</span>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Admin Password
              </label>
              <input
                type="text"
                required
                value={adminCreds.password}
                onChange={(e) => setAdminCreds({ ...adminCreds, password: e.target.value })}
                placeholder="admin @123"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-700 font-mono"
              />
              <span className="text-[10px] text-slate-400 mt-1 block">Default: admin @123</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <button
              type="button"
              onClick={handleResetDefaultCreds}
              className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 font-semibold px-3 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5 text-slate-400" />
              <span>Reset to Default (admin / admin @123)</span>
            </button>

            <button
              type="submit"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#164e37] hover:bg-[#113d2b] text-white font-bold text-xs rounded-xl shadow-xs transition-all cursor-pointer"
            >
              <KeyRound className="w-4 h-4 text-[#c59b27]" />
              <span>Update Admin Credentials</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
