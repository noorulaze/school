import React, { useEffect, useState } from 'react';
import {
  Bell,
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
  getNoticesAdmin,
  saveNotice,
  deleteNotice,
  toggleNoticePublish
} from '../../services/adminService';
import type { NoticeItem } from '../../types/firestore';
import { ConfirmModal } from '../components/ConfirmModal';

export const AdminNotices: React.FC = () => {
  const [notices, setNotices] = useState<NoticeItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('ALL');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<NoticeItem | null>(null);
  const [noticeToDelete, setNoticeToDelete] = useState<NoticeItem | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    category: 'Academic Notice' as NoticeItem['category'],
    date: new Date().toISOString().split('T')[0],
    description: '',
    published: true,
  });

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await getNoticesAdmin();
      setNotices(data);
    } catch (err) {
      console.error('Error loading notices:', err);
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
      category: 'Academic Notice',
      date: new Date().toISOString().split('T')[0],
      description: '',
      published: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (n: NoticeItem) => {
    setEditingItem(n);
    setFormData({
      title: n.title,
      category: n.category,
      date: n.date,
      description: n.description,
      published: n.published,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.description.trim()) return;

    setSubmitting(true);
    try {
      await saveNotice({
        id: editingItem?.id,
        title: formData.title.trim(),
        category: formData.category,
        date: formData.date,
        description: formData.description.trim(),
        published: formData.published,
      });

      setNotification(editingItem ? 'Notice updated successfully' : 'Notice posted successfully');
      setIsModalOpen(false);
      loadData();
    } catch (err) {
      console.error('Save notice error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggle = async (id: string, published: boolean) => {
    await toggleNoticePublish(id, !published);
    loadData();
  };

  const handleDelete = async () => {
    if (!noticeToDelete) return;
    await deleteNotice(noticeToDelete.id);
    setNoticeToDelete(null);
    setNotification('Notice deleted successfully');
    loadData();
  };

  const filteredNotices = notices.filter((n) => {
    const matchSearch =
      search === '' ||
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.description.toLowerCase().includes(search.toLowerCase());
    const matchCat = filterCategory === 'ALL' || n.category === filterCategory;
    return matchSearch && matchCat;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Notices & Announcements
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Publish academic bulletins, admission alerts, and official madrassa circulars.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#164e37] hover:bg-[#113d2b] text-white font-bold text-xs rounded-xl shadow-xs transition-all cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4 text-[#c59b27]" />
          <span>Post New Notice</span>
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
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search notices by title or content..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:ring-2 focus:ring-emerald-700 focus:bg-white"
          />
        </div>
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700"
        >
          <option value="ALL">All Categories</option>
          <option value="Academic Notice">Academic Notice</option>
          <option value="Admission Update">Admission Update</option>
          <option value="Institution Notice">Institution Notice</option>
          <option value="General">General</option>
        </select>
      </div>

      {/* Notices List */}
      {loading ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
          <Loader2 className="w-8 h-8 text-emerald-800 animate-spin mx-auto mb-2" />
          <p className="text-xs text-slate-500">Loading notices...</p>
        </div>
      ) : filteredNotices.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
          <Bell className="w-10 h-10 text-slate-300 mx-auto mb-2" />
          <p className="text-sm font-bold text-slate-700">No notices found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredNotices.map((n) => (
            <div
              key={n.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:border-emerald-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                    {n.category}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">{n.date}</span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 mb-1.5 line-clamp-2">{n.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 mb-4">
                  {n.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => handleToggle(n.id, n.published)}
                  className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg cursor-pointer ${
                    n.published
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {n.published ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                  <span>{n.published ? 'Published' : 'Hidden'}</span>
                </button>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => handleOpenEdit(n)}
                    className="p-1.5 text-slate-500 hover:text-emerald-800 hover:bg-emerald-50 rounded-lg cursor-pointer"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setNoticeToDelete(n)}
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200">
            <div className="p-6 bg-[#0d281e] text-white flex items-center justify-between">
              <h2 className="text-lg font-bold">
                {editingItem ? 'Edit Madrassa Notice' : 'Post New Notice'}
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
                  Notice Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Annual Admissions Open for 2025–2026 Academic Batch"
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs"
                  >
                    <option value="Academic Notice">Academic Notice</option>
                    <option value="Admission Update">Admission Update</option>
                    <option value="Institution Notice">Institution Notice</option>
                    <option value="General">General</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Date String *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    placeholder="e.g. October 15, 2025"
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Notice Description *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Official notice details and instructions for students, parents, and visitors..."
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="publishedNotice"
                  checked={formData.published}
                  onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                  className="w-4 h-4 text-emerald-700 rounded"
                />
                <label htmlFor="publishedNotice" className="text-xs font-semibold text-slate-700">
                  Publish to public website immediately
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
                  {submitting ? 'Saving...' : 'Save Notice'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete confirmation */}
      <ConfirmModal
        isOpen={Boolean(noticeToDelete)}
        title="Delete Madrassa Notice?"
        message={`Are you sure you want to permanently delete "${noticeToDelete?.title}"?`}
        confirmLabel="Delete Notice"
        onConfirm={handleDelete}
        onCancel={() => setNoticeToDelete(null)}
      />
    </div>
  );
};
