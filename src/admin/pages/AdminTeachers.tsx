import React, { useEffect, useState } from 'react';
import {
  GraduationCap,
  Plus,
  Edit2,
  Trash2,
  Search,
  Eye,
  EyeOff,
  X,
  Loader2,
  CheckCircle2
} from 'lucide-react';
import {
  getTeachersAdmin,
  saveTeacher,
  deleteTeacher,
  toggleTeacherPublish
} from '../../services/adminService';
import { uploadImage } from '../../services/storageService';
import type { TeacherItem } from '../../types/firestore';
import { ConfirmModal } from '../components/ConfirmModal';

export const AdminTeachers: React.FC = () => {
  const [teachers, setTeachers] = useState<TeacherItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<TeacherItem | null>(null);
  const [teacherToDelete, setTeacherToDelete] = useState<TeacherItem | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    role: 'Senior Ustad / Faculty',
    department: 'Qur’an & Tajweed',
    bio: 'Dedicated Islamic educator focusing on classical discipline, tajweed articulation, and character formation.',
    photo: '',
    published: true,
  });

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await getTeachersAdmin();
      setTeachers(data);
    } catch (err) {
      console.error('Error loading teachers:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({
      name: '',
      role: 'Senior Ustad / Faculty',
      department: 'Qur’an & Tajweed',
      bio: 'Dedicated Islamic educator focusing on classical discipline, tajweed articulation, and character formation.',
      photo: '',
      published: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (t: TeacherItem) => {
    setEditingItem(t);
    setFormData({
      name: t.name,
      role: t.role,
      department: t.department,
      bio: t.bio,
      photo: t.photo || '',
      published: t.published,
    });
    setIsModalOpen(true);
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const url = await uploadImage(file, 'teachers');
      setFormData((prev) => ({ ...prev, photo: url }));
    } catch (err: any) {
      alert(err.message || 'Photo upload failed');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    setSubmitting(true);
    try {
      await saveTeacher({
        id: editingItem?.id,
        name: formData.name.trim(),
        role: formData.role.trim(),
        department: formData.department.trim(),
        bio: formData.bio.trim(),
        photo: formData.photo,
        published: formData.published,
      });

      setNotification(editingItem ? 'Faculty profile updated' : 'Faculty profile added');
      setIsModalOpen(false);
      loadData();
    } catch (err) {
      console.error('Save teacher error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggle = async (id: string, published: boolean) => {
    await toggleTeacherPublish(id, !published);
    loadData();
  };

  const handleDelete = async () => {
    if (!teacherToDelete) return;
    await deleteTeacher(teacherToDelete.id);
    setTeacherToDelete(null);
    setNotification('Faculty record removed');
    loadData();
  };

  const filtered = teachers.filter(
    (t) =>
      search === '' ||
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.role.toLowerCase().includes(search.toLowerCase()) ||
      t.department.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Teachers & Faculty Roster
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage faculty profiles, teaching appointments, and department assignments.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#164e37] hover:bg-[#113d2b] text-white font-bold text-xs rounded-xl shadow-xs transition-all cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4 text-[#c59b27]" />
          <span>Add Faculty Member</span>
        </button>
      </div>

      {notification && (
        <div className="p-3.5 rounded-xl bg-emerald-50 text-emerald-900 border border-emerald-200 text-xs font-semibold flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{notification}</span>
          </div>
          <button type="button" onClick={() => setNotification(null)}>
            <X className="w-3.5 h-3.5 text-slate-400" />
          </button>
        </div>
      )}

      {/* Toolbar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search faculty by name, designation, or department..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:ring-2 focus:ring-emerald-700 focus:bg-white"
          />
        </div>
      </div>

      {/* Teachers List */}
      {loading ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
          <Loader2 className="w-8 h-8 text-emerald-800 animate-spin mx-auto mb-2" />
          <p className="text-xs text-slate-500">Loading faculty roster...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
          <GraduationCap className="w-10 h-10 text-slate-300 mx-auto mb-2" />
          <p className="text-sm font-bold text-slate-700">No faculty members found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:border-emerald-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-12 h-12 rounded-xl bg-emerald-800 text-white flex items-center justify-center font-bold text-base shrink-0 overflow-hidden shadow-xs">
                    {t.photo ? (
                      <img src={t.photo} alt={t.name} className="w-full h-full object-cover" />
                    ) : (
                      <span>{t.name ? t.name.charAt(0) : 'U'}</span>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-bold text-slate-900 truncate">{t.name}</h3>
                    <p className="text-xs text-emerald-800 font-semibold truncate">{t.role}</p>
                    <p className="text-[11px] text-slate-500 truncate">{t.department}</p>
                  </div>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 mb-4">
                  {t.bio}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => handleToggle(t.id, t.published)}
                  className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-lg cursor-pointer ${
                    t.published
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {t.published ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                  <span>{t.published ? 'Visible' : 'Hidden'}</span>
                </button>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => handleOpenEdit(t)}
                    className="p-1.5 text-slate-500 hover:text-emerald-800 hover:bg-emerald-50 rounded-lg cursor-pointer"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setTeacherToDelete(t)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200 my-8">
            <div className="p-6 bg-[#0d281e] text-white flex items-center justify-between">
              <h2 className="text-lg font-bold">
                {editingItem ? 'Edit Faculty Profile' : 'Add Faculty Member'}
              </h2>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-slate-300 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Faculty / Ustad Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Ustad Abdul Rahman Faizy"
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Designation / Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    placeholder="e.g. Head of Qur’an Studies"
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Department *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    placeholder="e.g. Qur’an & Tajweed"
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Brief Bio / Academic Background *
                </label>
                <textarea
                  required
                  rows={3}
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  placeholder="Specializations, teaching methodology, qualifications..."
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Profile Photo (Optional)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-emerald-50 file:text-emerald-800 hover:file:bg-emerald-100"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="publishedTeacher"
                  checked={formData.published}
                  onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                  className="w-4 h-4 text-emerald-700 rounded"
                />
                <label htmlFor="publishedTeacher" className="text-xs font-semibold text-slate-700">
                  Visible on public Teachers page
                </label>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 bg-[#164e37] text-white font-bold text-xs rounded-xl hover:bg-[#113d2b] disabled:opacity-50"
                >
                  {submitting ? 'Saving...' : 'Save Profile'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete confirmation */}
      <ConfirmModal
        isOpen={Boolean(teacherToDelete)}
        title="Remove Faculty Member?"
        message={`Are you sure you want to remove "${teacherToDelete?.name}" from the faculty roster?`}
        confirmLabel="Remove Member"
        onConfirm={handleDelete}
        onCancel={() => setTeacherToDelete(null)}
      />
    </div>
  );
};
