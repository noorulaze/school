import React, { useEffect, useState } from 'react';
import {
  BookOpen,
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
  getDepartmentsAdmin,
  saveDepartment,
  deleteDepartment,
  toggleDepartmentPublish
} from '../../services/adminService';
import type { DepartmentItem } from '../../types/firestore';
import { ConfirmModal } from '../components/ConfirmModal';

export const AdminDepartments: React.FC = () => {
  const [departments, setDepartments] = useState<DepartmentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<DepartmentItem | null>(null);
  const [deptToDelete, setDeptToDelete] = useState<DepartmentItem | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    arabicTitle: '',
    targetLevels: 'Primary to Secondary',
    description: '',
    modulesText: '',
    published: true,
  });

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await getDepartmentsAdmin();
      setDepartments(data);
    } catch (err) {
      console.error('Error loading departments:', err);
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
      title: '',
      arabicTitle: '',
      targetLevels: 'Primary to Secondary',
      description: '',
      modulesText: '',
      published: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (d: DepartmentItem) => {
    setEditingItem(d);
    setFormData({
      title: d.title,
      arabicTitle: d.arabicTitle || '',
      targetLevels: d.targetLevels || 'Primary to Secondary',
      description: d.description,
      modulesText: d.modules?.join('\n') || '',
      published: d.published,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.description.trim()) return;

    setSubmitting(true);
    try {
      const modules = formData.modulesText
        .split('\n')
        .map((m) => m.trim())
        .filter(Boolean);

      await saveDepartment({
        id: editingItem?.id,
        title: formData.title.trim(),
        arabicTitle: formData.arabicTitle.trim(),
        targetLevels: formData.targetLevels.trim(),
        description: formData.description.trim(),
        modules,
        published: formData.published,
      });

      setNotification(editingItem ? 'Department updated' : 'Department added');
      setIsModalOpen(false);
      loadData();
    } catch (err) {
      console.error('Save department error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggle = async (id: string, published: boolean) => {
    await toggleDepartmentPublish(id, !published);
    loadData();
  };

  const handleDelete = async () => {
    if (!deptToDelete) return;
    await deleteDepartment(deptToDelete.id);
    setDeptToDelete(null);
    setNotification('Department deleted');
    loadData();
  };

  const filtered = departments.filter(
    (d) =>
      search === '' ||
      d.title.toLowerCase().includes(search.toLowerCase()) ||
      d.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Academic Departments & Streams
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Configure core curriculum faculties, syllabus modules, and target levels.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#164e37] hover:bg-[#113d2b] text-white font-bold text-xs rounded-xl shadow-xs transition-all cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4 text-[#c59b27]" />
          <span>Add Department</span>
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
            placeholder="Search departments..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:ring-2 focus:ring-emerald-700 focus:bg-white"
          />
        </div>
      </div>

      {/* Departments List */}
      {loading ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
          <Loader2 className="w-8 h-8 text-emerald-800 animate-spin mx-auto mb-2" />
          <p className="text-xs text-slate-500">Loading academic departments...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
          <BookOpen className="w-10 h-10 text-slate-300 mx-auto mb-2" />
          <p className="text-sm font-bold text-slate-700">No departments found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((d) => (
            <div
              key={d.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:border-emerald-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                    {d.targetLevels || 'All Classes'}
                  </span>
                  {d.arabicTitle && (
                    <span className="text-xs text-[#c59b27] font-serif font-bold">
                      {d.arabicTitle}
                    </span>
                  )}
                </div>
                <h3 className="text-sm font-bold text-slate-900 mb-1.5">{d.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-3 line-clamp-3">
                  {d.description}
                </p>

                {d.modules && d.modules.length > 0 && (
                  <div className="mb-4">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                      Key Syllabus Modules:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {d.modules.slice(0, 4).map((m, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md"
                        >
                          {m}
                        </span>
                      ))}
                      {d.modules.length > 4 && (
                        <span className="text-[10px] text-slate-400 self-center">
                          +{d.modules.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => handleToggle(d.id, d.published)}
                  className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-lg cursor-pointer ${
                    d.published
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {d.published ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                  <span>{d.published ? 'Visible' : 'Hidden'}</span>
                </button>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => handleOpenEdit(d)}
                    className="p-1.5 text-slate-500 hover:text-emerald-800 hover:bg-emerald-50 rounded-lg cursor-pointer"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeptToDelete(d)}
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
                {editingItem ? 'Edit Academic Department' : 'Add Department'}
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
                  Department Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Qur’an & Tajweed"
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Arabic Title (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.arabicTitle}
                    onChange={(e) => setFormData({ ...formData, arabicTitle: e.target.value })}
                    placeholder="e.g. قسم القرآن والتجويد"
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Target Levels
                  </label>
                  <input
                    type="text"
                    value={formData.targetLevels}
                    onChange={(e) => setFormData({ ...formData, targetLevels: e.target.value })}
                    placeholder="e.g. Class 1 through Class 10"
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Department Overview *
                </label>
                <textarea
                  required
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Description of curriculum objectives, pedagogy, and student outcomes..."
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Syllabus Modules (One item per line)
                </label>
                <textarea
                  rows={4}
                  value={formData.modulesText}
                  onChange={(e) => setFormData({ ...formData, modulesText: e.target.value })}
                  placeholder="Makharij al-Huroof&#10;Sifaat al-Huroof&#10;Ahkam al-Tajweed&#10;Tilawah Mastery"
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-mono"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="publishedDept"
                  checked={formData.published}
                  onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                  className="w-4 h-4 text-emerald-700 rounded"
                />
                <label htmlFor="publishedDept" className="text-xs font-semibold text-slate-700">
                  Visible on public Departments page
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
                  {submitting ? 'Saving...' : 'Save Department'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete confirmation */}
      <ConfirmModal
        isOpen={Boolean(deptToDelete)}
        title="Delete Department?"
        message={`Are you sure you want to delete "${deptToDelete?.title}"?`}
        confirmLabel="Delete Department"
        onConfirm={handleDelete}
        onCancel={() => setDeptToDelete(null)}
      />
    </div>
  );
};
