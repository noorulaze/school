import React, { useEffect, useState } from 'react';
import {
  Calendar,
  Plus,
  Edit2,
  Trash2,
  Search,
  MapPin,
  Eye,
  EyeOff,
  X,
  Loader2,
  CheckCircle2
} from 'lucide-react';
import {
  getEventsAdmin,
  saveEvent,
  deleteEvent,
  toggleEventPublish
} from '../../services/adminService';
import { uploadImage } from '../../services/storageService';
import type { EventItem } from '../../types/firestore';
import { ConfirmModal } from '../components/ConfirmModal';

export const AdminEvents: React.FC = () => {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<EventItem | null>(null);
  const [eventToDelete, setEventToDelete] = useState<EventItem | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    category: 'Madrassa Annual Gathering',
    date: 'Upcoming Academic Term',
    location: 'Main Campus Assembly Hall, Korangath',
    description: '',
    image: '',
    published: true,
  });

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await getEventsAdmin();
      setEvents(data);
    } catch (err) {
      console.error('Error loading events:', err);
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
      category: 'Madrassa Annual Gathering',
      date: 'Upcoming Academic Term',
      location: 'Main Campus Assembly Hall, Korangath',
      description: '',
      image: '',
      published: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (e: EventItem) => {
    setEditingItem(e);
    setFormData({
      title: e.title,
      category: e.category || 'Madrassa Program',
      date: e.date,
      location: e.location,
      description: e.description,
      image: e.image || '',
      published: e.published,
    });
    setIsModalOpen(true);
  };

  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const url = await uploadImage(file, 'events');
      setFormData((prev) => ({ ...prev, image: url }));
    } catch (err: any) {
      alert(err.message || 'Image upload failed');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.description.trim()) return;

    setSubmitting(true);
    try {
      await saveEvent({
        id: editingItem?.id,
        title: formData.title.trim(),
        category: formData.category,
        date: formData.date.trim(),
        location: formData.location.trim(),
        description: formData.description.trim(),
        image: formData.image,
        published: formData.published,
      });

      setNotification(editingItem ? 'Event updated successfully' : 'Event scheduled successfully');
      setIsModalOpen(false);
      loadData();
    } catch (err) {
      console.error('Save event error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggle = async (id: string, published: boolean) => {
    await toggleEventPublish(id, !published);
    loadData();
  };

  const handleDelete = async () => {
    if (!eventToDelete) return;
    await deleteEvent(eventToDelete.id);
    setEventToDelete(null);
    setNotification('Event removed successfully');
    loadData();
  };

  const filteredEvents = events.filter(
    (ev) =>
      search === '' ||
      ev.title.toLowerCase().includes(search.toLowerCase()) ||
      ev.description.toLowerCase().includes(search.toLowerCase()) ||
      ev.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Events & Programs Calendar
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage academic events, community conferences, and student development programs.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#164e37] hover:bg-[#113d2b] text-white font-bold text-xs rounded-xl shadow-xs transition-all cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4 text-[#c59b27]" />
          <span>Add New Event</span>
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
            placeholder="Search events by title, venue, or description..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:ring-2 focus:ring-emerald-700 focus:bg-white"
          />
        </div>
      </div>

      {/* Events List */}
      {loading ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
          <Loader2 className="w-8 h-8 text-emerald-800 animate-spin mx-auto mb-2" />
          <p className="text-xs text-slate-500">Loading events...</p>
        </div>
      ) : filteredEvents.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
          <Calendar className="w-10 h-10 text-slate-300 mx-auto mb-2" />
          <p className="text-sm font-bold text-slate-700">No events found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredEvents.map((ev) => (
            <div
              key={ev.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:border-emerald-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                    {ev.category || 'Madrassa Event'}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">{ev.date}</span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 mb-1.5">{ev.title}</h3>
                <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-3">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{ev.location}</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 mb-4">
                  {ev.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => handleToggle(ev.id, ev.published)}
                  className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg cursor-pointer ${
                    ev.published
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {ev.published ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                  <span>{ev.published ? 'Published' : 'Hidden'}</span>
                </button>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => handleOpenEdit(ev)}
                    className="p-1.5 text-slate-500 hover:text-emerald-800 hover:bg-emerald-50 rounded-lg cursor-pointer"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setEventToDelete(ev)}
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
                {editingItem ? 'Edit Event Details' : 'Schedule New Event'}
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
                  Event Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Annual Meelad Conference & Qira'at Competitions"
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Event Date *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    placeholder="e.g. November 20, 2025"
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Category *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="e.g. Cultural & Academic"
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Venue / Location *
                </label>
                <input
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="e.g. Madrassa Main Auditorium, Korangath"
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Event Summary *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Details of the program, invited dignitaries, schedule, and participation guidelines..."
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Event Poster / Image (Optional)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageFileChange}
                  className="w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-emerald-50 file:text-emerald-800 hover:file:bg-emerald-100"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="publishedEvent"
                  checked={formData.published}
                  onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                  className="w-4 h-4 text-emerald-700 rounded"
                />
                <label htmlFor="publishedEvent" className="text-xs font-semibold text-slate-700">
                  Publish to website events section
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
                  {submitting ? 'Saving...' : 'Save Event'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete confirmation */}
      <ConfirmModal
        isOpen={Boolean(eventToDelete)}
        title="Delete Madrassa Event?"
        message={`Are you sure you want to delete "${eventToDelete?.title}"?`}
        confirmLabel="Delete Event"
        onConfirm={handleDelete}
        onCancel={() => setEventToDelete(null)}
      />
    </div>
  );
};
