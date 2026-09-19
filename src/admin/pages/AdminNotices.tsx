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
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  Filter,
  FileText
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
  const [filterPriority, setFilterPriority] = useState('ALL');
  const [filterStatus, setFilterStatus] = useState<'ALL' | 'Published' | 'Draft'>('ALL');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previewNotice, setPreviewNotice] = useState<NoticeItem | null>(null);
  const [editingItem, setEditingItem] = useState<NoticeItem | null>(null);
  const [noticeToDelete, setNoticeToDelete] = useState<NoticeItem | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const [formData, setFormData] = useState<{
    title: string;
    category: NoticeItem['category'];
    date: string;
    priority: 'Normal' | 'Important' | 'Urgent';
    targetAudience: 'Everyone' | 'Students' | 'Parents' | 'Staff';
    description: string;
    fullContent: string;
    published: boolean;
  }>({
    title: '',
    category: 'General',
    date: new Date().toISOString().split('T')[0],
    priority: 'Normal',
    targetAudience: 'Everyone',
    description: '',
    fullContent: '',
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
      category: 'General',
      date: new Date().toISOString().split('T')[0],
      priority: 'Normal',
      targetAudience: 'Everyone',
      description: '',
      fullContent: '',
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
      priority: n.priority || 'Normal',
      targetAudience: n.targetAudience || 'Everyone',
      description: n.description,
      fullContent: n.fullContent || '',
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
        date: formData.date.trim(),
        priority: formData.priority,
        targetAudience: formData.targetAudience,
        description: formData.description.trim(),
        fullContent: formData.fullContent.trim() || undefined,
        published: formData.published,
      });

      setNotification(editingItem ? 'Notice updated successfully' : 'Notice created successfully');
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
    setNotification(`Notice marked as ${!published ? 'Published' : 'Draft/Hidden'}`);
    loadData();
  };

  const handleDelete = async () => {
    if (!noticeToDelete) return;
    await deleteNotice(noticeToDelete.id);
    if (previewNotice?.id === noticeToDelete.id) {
      setPreviewNotice(null);
    }
    setNoticeToDelete(null);
    setNotification('Notice deleted successfully');
    loadData();
  };

  // Metrics
  const totalCount = notices.length;
  const publishedCount = notices.filter((n) => n.published).length;
  const draftCount = notices.filter((n) => !n.published).length;
  const urgentCount = notices.filter((n) => n.priority === 'Urgent').length;

  // Filtered list
  const filteredNotices = notices.filter((n) => {
    const q = search.trim().toLowerCase();
    const matchSearch =
      q === '' ||
      n.title.toLowerCase().includes(q) ||
      n.description.toLowerCase().includes(q) ||
      (n.fullContent && n.fullContent.toLowerCase().includes(q));

    const matchCat = filterCategory === 'ALL' || n.category === filterCategory;
    const matchPriority = filterPriority === 'ALL' || n.priority === filterPriority;
    const matchStatus =
      filterStatus === 'ALL' ||
      (filterStatus === 'Published' && n.published) ||
      (filterStatus === 'Draft' && !n.published);

    return matchSearch && matchCat && matchPriority && matchStatus;
  });

  const getPriorityBadge = (priority?: string) => {
    switch (priority) {
      case 'Urgent':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 border border-rose-200">
            <AlertTriangle className="w-2.5 h-2.5" />
            <span>Urgent</span>
          </span>
        );
      case 'Important':
        return (
          <span className="inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-200">
            Important
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
            Normal
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            School Announcements & Circulars
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Create, manage, and publish academic bulletins, urgent alerts, and institutional circulars.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#164e37] hover:bg-[#113d2b] text-white font-bold text-xs rounded-xl shadow-xs transition-all cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4 text-[#c59b27]" />
          <span>Create Announcement</span>
        </button>
      </div>

      {/* Notification */}
      {notification && (
        <div className="p-3.5 rounded-xl bg-emerald-50 text-emerald-900 border border-emerald-200 text-xs font-semibold flex items-center justify-between shadow-2xs">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{notification}</span>
          </div>
          <button type="button" onClick={() => setNotification(null)} className="cursor-pointer">
            <X className="w-3.5 h-3.5 text-slate-400 hover:text-slate-600" />
          </button>
        </div>
      )}

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 sm:gap-4">
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
            Total Notices
          </span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl sm:text-3xl font-black text-slate-900">{totalCount}</span>
            <span className="text-xs text-slate-400 font-medium">All Records</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-emerald-200 bg-emerald-50/20 p-4 shadow-xs">
          <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block mb-1">
            Published Live
          </span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl sm:text-3xl font-black text-emerald-900">{publishedCount}</span>
            <span className="text-xs text-emerald-700 font-medium">Publicly Visible</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
            Drafts / Hidden
          </span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl sm:text-3xl font-black text-slate-700">{draftCount}</span>
            <span className="text-xs text-slate-400 font-medium">Internal Only</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-rose-200 bg-rose-50/20 p-4 shadow-xs">
          <span className="text-[11px] font-bold text-rose-800 uppercase tracking-wider block mb-1">
            Urgent Circulars
          </span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl sm:text-3xl font-black text-rose-900">{urgentCount}</span>
            <span className="text-xs text-rose-700 font-medium">High Priority</span>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs flex flex-col md:flex-row gap-3">
        <div className="flex-1 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search notices by title, description or content..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:ring-2 focus:ring-emerald-700 focus:bg-white"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Status Filter */}
          <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="bg-transparent border-0 text-xs text-slate-700 font-semibold focus:outline-hidden py-1 cursor-pointer"
            >
              <option value="ALL">Status: All</option>
              <option value="Published">Published ({publishedCount})</option>
              <option value="Draft">Drafts ({draftCount})</option>
            </select>
          </div>

          {/* Category Filter */}
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 font-semibold focus:outline-hidden cursor-pointer"
          >
            <option value="ALL">All Categories</option>
            <option value="General">General</option>
            <option value="Academic">Academic</option>
            <option value="Admission">Admission</option>
            <option value="Examination">Examination</option>
            <option value="Events">Events</option>
            <option value="Academic Notice">Academic Notice</option>
            <option value="Admission Update">Admission Update</option>
            <option value="Institution Notice">Institution Notice</option>
          </select>

          {/* Priority Filter */}
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 font-semibold focus:outline-hidden cursor-pointer"
          >
            <option value="ALL">All Priorities</option>
            <option value="Urgent">Urgent</option>
            <option value="Important">Important</option>
            <option value="Normal">Normal</option>
          </select>
        </div>
      </div>

      {/* Notices Feed */}
      {loading ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
          <Loader2 className="w-8 h-8 text-emerald-800 animate-spin mx-auto mb-2" />
          <p className="text-xs text-slate-500">Loading notices...</p>
        </div>
      ) : filteredNotices.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
          <Bell className="w-10 h-10 text-slate-300 mx-auto mb-2" />
          <p className="text-sm font-bold text-slate-700">No notices found</p>
          <p className="text-xs text-slate-400 mt-1">
            {search || filterCategory !== 'ALL' || filterPriority !== 'ALL' || filterStatus !== 'ALL'
              ? 'No notices match your current search and filter settings.'
              : 'Click "Create Announcement" to post your first school notice.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredNotices.map((n) => (
            <div
              key={n.id}
              className={`bg-white rounded-2xl border p-5 shadow-xs transition-all flex flex-col justify-between ${
                n.published
                  ? 'border-slate-200 hover:border-emerald-300'
                  : 'border-dashed border-slate-300 bg-slate-50/50'
              }`}
            >
              <div>
                {/* Header tags */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {n.category}
                    </span>
                    {getPriorityBadge(n.priority)}
                    {n.targetAudience && (
                      <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200">
                        {n.targetAudience}
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-slate-400 font-mono">{n.date}</span>
                </div>

                {/* Title */}
                <h3 className="text-sm font-bold text-slate-900 mb-1.5 leading-snug">{n.title}</h3>

                {/* Short description */}
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-2 mb-3">
                  {n.description}
                </p>

                {n.fullContent && (
                  <div className="flex items-center gap-1 text-[11px] text-emerald-800 font-medium mb-3">
                    <FileText className="w-3 h-3" />
                    <span>Includes complete circular content ({n.fullContent.length} chars)</span>
                  </div>
                )}
              </div>

              {/* Action Bar */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => handleToggle(n.id, n.published)}
                  className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg cursor-pointer transition-colors ${
                    n.published
                      ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                      : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                  }`}
                  title={n.published ? 'Click to make Draft' : 'Click to Publish'}
                >
                  {n.published ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                  <span>{n.published ? 'Published' : 'Draft'}</span>
                </button>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setPreviewNotice(n)}
                    className="p-1.5 text-slate-500 hover:text-emerald-800 hover:bg-emerald-50 rounded-lg cursor-pointer"
                    title="Preview Notice"
                  >
                    <Eye className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleOpenEdit(n)}
                    className="p-1.5 text-slate-500 hover:text-emerald-800 hover:bg-emerald-50 rounded-lg cursor-pointer"
                    title="Edit Notice"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setNoticeToDelete(n)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg cursor-pointer"
                    title="Delete Notice"
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
          <div className="bg-white rounded-3xl shadow-2xl max-w-xl w-full overflow-hidden border border-slate-200 my-8">
            <div className="p-5 sm:p-6 bg-[#0d281e] text-white flex items-center justify-between">
              <h2 className="text-base sm:text-lg font-bold">
                {editingItem ? 'Edit School Announcement' : 'Create New Announcement'}
              </h2>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-slate-300 hover:text-white p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">
                  Announcement Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Schedule for First Quarter Oral Tajweed Evaluations"
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-700"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-semibold"
                  >
                    <option value="General">General</option>
                    <option value="Academic">Academic</option>
                    <option value="Admission">Admission</option>
                    <option value="Examination">Examination</option>
                    <option value="Events">Events</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">
                    Priority Level *
                  </label>
                  <select
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value as any })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-semibold"
                  >
                    <option value="Normal">Normal</option>
                    <option value="Important">Important</option>
                    <option value="Urgent">Urgent</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">
                    Target Audience *
                  </label>
                  <select
                    value={formData.targetAudience}
                    onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value as any })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-semibold"
                  >
                    <option value="Everyone">Everyone (Public)</option>
                    <option value="Students">Students Only</option>
                    <option value="Parents">Parents Only</option>
                    <option value="Staff">Staff Only</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">
                  Announcement Date *
                </label>
                <input
                  type="text"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  placeholder="e.g. October 15, 2025"
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">
                  Short Description (Lead Summary) *
                </label>
                <textarea
                  required
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Brief 1-2 sentence overview visible on the homepage notice board and list cards..."
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">
                  Full Circular Content (Article Body)
                </label>
                <textarea
                  rows={5}
                  value={formData.fullContent}
                  onChange={(e) => setFormData({ ...formData, fullContent: e.target.value })}
                  placeholder="Complete announcement text, schedule tables, reporting instructions, guidelines for guardians..."
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl"
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
                <label htmlFor="publishedNotice" className="font-semibold text-slate-700 cursor-pointer">
                  Publish to website immediately (Uncheck to save as internal Draft)
                </label>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 font-semibold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 bg-[#164e37] text-white font-bold rounded-xl hover:bg-[#113d2b] disabled:opacity-50 cursor-pointer"
                >
                  {submitting ? 'Saving...' : 'Save Announcement'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {previewNotice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200 max-h-[90vh] flex flex-col">
            <div className="p-5 bg-[#0d281e] text-white flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-[#c59b27]" />
                <h2 className="text-base font-bold">Notice Public Preview</h2>
              </div>
              <button
                type="button"
                onClick={() => setPreviewNotice(null)}
                className="text-slate-300 hover:text-white p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 sm:p-6 overflow-y-auto space-y-4 text-xs">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                  {previewNotice.category}
                </span>
                {getPriorityBadge(previewNotice.priority)}
                {previewNotice.targetAudience && (
                  <span className="text-[10px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full">
                    Audience: {previewNotice.targetAudience}
                  </span>
                )}
                <span className="text-[10px] font-mono text-slate-400 ml-auto">
                  {previewNotice.date}
                </span>
              </div>

              <h3 className="text-lg font-bold text-slate-900 leading-snug">
                {previewNotice.title}
              </h3>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 leading-relaxed font-medium">
                {previewNotice.description}
              </div>

              {previewNotice.fullContent && (
                <div className="p-4 rounded-xl bg-white border border-slate-200 text-slate-800 leading-relaxed whitespace-pre-line">
                  {previewNotice.fullContent}
                </div>
              )}

              <div className="pt-2 flex items-center justify-between text-slate-400 text-[11px]">
                <span>Status: {previewNotice.published ? 'Live on website' : 'Draft (Admin Only)'}</span>
                <a
                  href={`/notice/${previewNotice.id}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-emerald-800 font-bold hover:underline"
                >
                  <span>Open Public Page</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-end">
              <button
                type="button"
                onClick={() => setPreviewNotice(null)}
                className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs rounded-xl cursor-pointer"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirmation */}
      <ConfirmModal
        isOpen={Boolean(noticeToDelete)}
        title="Delete Announcement?"
        message={`Are you sure you want to permanently delete "${noticeToDelete?.title}"?`}
        confirmLabel="Permanently Delete"
        onConfirm={handleDelete}
        onCancel={() => setNoticeToDelete(null)}
      />
    </div>
  );
};
