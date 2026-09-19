import React, { useEffect, useState } from 'react';
import {
  Image as ImageIcon,
  Plus,
  Trash2,
  Eye,
  EyeOff,
  X,
  Loader2,
  CheckCircle2,
  Edit2
} from 'lucide-react';
import {
  getGalleryAdmin,
  saveGalleryItem,
  deleteGalleryItem,
  toggleGalleryPublish
} from '../../services/adminService';
import { uploadImage } from '../../services/storageService';
import type { GalleryItem } from '../../types/firestore';
import { ConfirmModal } from '../components/ConfirmModal';

export const AdminGallery: React.FC = () => {
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [itemToDelete, setItemToDelete] = useState<GalleryItem | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    category: 'Campus' as GalleryItem['category'],
    description: '',
    image: '',
    published: true,
  });

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await getGalleryAdmin();
      setGallery(data);
    } catch (err) {
      console.error('Error loading gallery:', err);
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
      category: 'Campus',
      description: '',
      image: '',
      published: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: GalleryItem) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      category: item.category,
      description: item.description || '',
      image: item.image,
      published: item.published,
    });
    setIsModalOpen(true);
  };

  const handleImageFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const url = await uploadImage(file, 'gallery');
      setFormData((prev) => ({ ...prev, image: url }));
    } catch (err: any) {
      alert(err.message || 'Image upload error');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    setSubmitting(true);
    try {
      await saveGalleryItem({
        id: editingItem?.id,
        title: formData.title.trim(),
        category: formData.category,
        description: formData.description.trim(),
        image: formData.image,
        published: formData.published,
      });

      setNotification(editingItem ? 'Gallery item updated' : 'Media uploaded to gallery');
      setIsModalOpen(false);
      loadData();
    } catch (err) {
      console.error('Save gallery error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggle = async (id: string, published: boolean) => {
    await toggleGalleryPublish(id, !published);
    loadData();
  };

  const handleDelete = async () => {
    if (!itemToDelete) return;
    await deleteGalleryItem(itemToDelete.id);
    setItemToDelete(null);
    setNotification('Gallery photo removed');
    loadData();
  };

  const filtered = gallery.filter(
    (g) => selectedCategory === 'ALL' || g.category === selectedCategory
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Institutional Photo Gallery
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Upload campus photographs, classroom environments, and student activities.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#164e37] hover:bg-[#113d2b] text-white font-bold text-xs rounded-xl shadow-xs transition-all cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4 text-[#c59b27]" />
          <span>Upload Photograph</span>
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

      {/* Categories Bar */}
      <div className="flex flex-wrap gap-2">
        {['ALL', 'Campus', 'Classrooms', 'Student Activities', 'Programs', 'Events'].map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              selectedCategory === cat
                ? 'bg-[#164e37] text-white shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {cat === 'ALL' ? 'All Photographs' : cat}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      {loading ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
          <Loader2 className="w-8 h-8 text-emerald-800 animate-spin mx-auto mb-2" />
          <p className="text-xs text-slate-500">Loading gallery albums...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
          <ImageIcon className="w-10 h-10 text-slate-300 mx-auto mb-2" />
          <p className="text-sm font-bold text-slate-700">No photos in this category</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:border-emerald-300 transition-all flex flex-col justify-between"
            >
              <div className="relative aspect-4/3 bg-slate-100 flex items-center justify-center overflow-hidden">
                {item.image ? (
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="text-slate-400 flex flex-col items-center">
                    <ImageIcon className="w-8 h-8 mb-1" />
                    <span className="text-[10px]">Photo Placeholder</span>
                  </div>
                )}
                <span className="absolute top-2 left-2 text-[9px] font-bold px-2 py-0.5 rounded-md bg-black/60 text-white backdrop-blur-xs">
                  {item.category}
                </span>
              </div>

              <div className="p-3.5">
                <h4 className="text-xs font-bold text-slate-900 line-clamp-1">{item.title}</h4>
                {item.description && (
                  <p className="text-[11px] text-slate-500 line-clamp-2 mt-1">{item.description}</p>
                )}

                <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => handleToggle(item.id, item.published)}
                    className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-md ${
                      item.published ? 'text-emerald-700 bg-emerald-50' : 'text-slate-400 bg-slate-100'
                    }`}
                  >
                    {item.published ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                    <span>{item.published ? 'Active' : 'Draft'}</span>
                  </button>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => handleOpenEdit(item)}
                      className="p-1 text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 rounded-md"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setItemToDelete(item)}
                      className="p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200 my-8">
            <div className="p-6 bg-[#0d281e] text-white flex items-center justify-between">
              <h2 className="text-lg font-bold">
                {editingItem ? 'Edit Photo Details' : 'Upload Campus Photograph'}
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
                  Photo Title / Caption *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Madrasah Main Prayer & Study Hall"
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Category *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs"
                >
                  <option value="Campus">Campus</option>
                  <option value="Classrooms">Classrooms</option>
                  <option value="Student Activities">Student Activities</option>
                  <option value="Programs">Programs</option>
                  <option value="Events">Events</option>
                  <option value="General">General</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Description / Location Context
                </label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Additional context about this photograph..."
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Select Image File
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageFile}
                  className="w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-emerald-50 file:text-emerald-800 hover:file:bg-emerald-100"
                />
                {formData.image && (
                  <div className="mt-2 w-24 h-24 rounded-xl overflow-hidden border border-slate-200">
                    <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="publishedPhoto"
                  checked={formData.published}
                  onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                  className="w-4 h-4 text-emerald-700 rounded"
                />
                <label htmlFor="publishedPhoto" className="text-xs font-semibold text-slate-700">
                  Visible in public gallery
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
                  {submitting ? 'Saving...' : 'Save Photograph'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete confirmation */}
      <ConfirmModal
        isOpen={Boolean(itemToDelete)}
        title="Delete Photo?"
        message={`Are you sure you want to remove "${itemToDelete?.title}" from the gallery?`}
        confirmLabel="Delete Photo"
        onConfirm={handleDelete}
        onCancel={() => setItemToDelete(null)}
      />
    </div>
  );
};
