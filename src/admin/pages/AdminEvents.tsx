import React, { useEffect, useState } from 'react';
import {
  Calendar as CalendarIcon,
  Plus,
  Edit2,
  Trash2,
  Search,
  MapPin,
  Eye,
  EyeOff,
  X,
  Loader2,
  CheckCircle2,
  Sparkles,
  Clock,
  Upload,
  ExternalLink,
  List,
  CalendarDays
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
  const [filterCategory, setFilterCategory] = useState('ALL');
  const [filterStatus, setFilterStatus] = useState<'ALL' | 'Published' | 'Draft'>('ALL');
  const [activeView, setActiveView] = useState<'list' | 'calendar'>('list');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previewEvent, setPreviewEvent] = useState<EventItem | null>(null);
  const [editingItem, setEditingItem] = useState<EventItem | null>(null);
  const [eventToDelete, setEventToDelete] = useState<EventItem | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const [formData, setFormData] = useState<{
    title: string;
    category: string;
    date: string;
    startTime: string;
    endTime: string;
    location: string;
    description: string;
    fullDescription: string;
    image: string;
    featured: boolean;
    published: boolean;
  }>({
    title: '',
    category: 'Religious',
    date: new Date().toISOString().split('T')[0],
    startTime: '09:00 AM',
    endTime: '12:30 PM',
    location: 'Main Auditorium, Korangath Campus',
    description: '',
    fullDescription: '',
    image: '',
    featured: false,
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
      category: 'Religious',
      date: new Date().toISOString().split('T')[0],
      startTime: '09:00 AM',
      endTime: '12:30 PM',
      location: 'Main Auditorium, Korangath Campus',
      description: '',
      fullDescription: '',
      image: '',
      featured: false,
      published: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (e: EventItem) => {
    setEditingItem(e);
    setFormData({
      title: e.title,
      category: e.category || 'General',
      date: e.date,
      startTime: e.startTime || '09:00 AM',
      endTime: e.endTime || '12:30 PM',
      location: e.location,
      description: e.description,
      fullDescription: e.fullDescription || '',
      image: e.coverImage || e.image || '',
      featured: Boolean(e.featured),
      published: e.published,
    });
    setIsModalOpen(true);
  };

  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingImage(true);
    try {
      const url = await uploadImage(file, 'events');
      setFormData((prev) => ({ ...prev, image: url }));
      setNotification('Event cover image uploaded');
    } catch (err: any) {
      alert(err.message || 'Image upload failed');
    } finally {
      setUploadingImage(false);
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
        startTime: formData.startTime.trim() || undefined,
        endTime: formData.endTime.trim() || undefined,
        location: formData.location.trim(),
        description: formData.description.trim(),
        fullDescription: formData.fullDescription.trim() || undefined,
        image: formData.image || undefined,
        coverImage: formData.image || undefined,
        featured: formData.featured,
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
    setNotification(`Event marked as ${!published ? 'Published' : 'Draft/Hidden'}`);
    loadData();
  };

  const handleToggleFeatured = async (ev: EventItem) => {
    try {
      await saveEvent({
        ...ev,
        featured: !ev.featured,
      });
      setNotification(`Event ${!ev.featured ? 'marked as Featured' : 'unmarked from Featured'}`);
      loadData();
    } catch (err) {
      console.error('Toggle featured error:', err);
    }
  };

  const handleDelete = async () => {
    if (!eventToDelete) return;
    await deleteEvent(eventToDelete.id);
    if (previewEvent?.id === eventToDelete.id) {
      setPreviewEvent(null);
    }
    setEventToDelete(null);
    setNotification('Event deleted successfully');
    loadData();
  };

  // Metrics
  const totalCount = events.length;
  const publishedCount = events.filter((e) => e.published).length;
  const featuredCount = events.filter((e) => e.featured).length;

  const filteredEvents = events.filter((ev) => {
    const q = search.trim().toLowerCase();
    const matchSearch =
      q === '' ||
      ev.title.toLowerCase().includes(q) ||
      ev.description.toLowerCase().includes(q) ||
      ev.location.toLowerCase().includes(q);

    const matchCat = filterCategory === 'ALL' || ev.category === filterCategory;
    const matchStatus =
      filterStatus === 'ALL' ||
      (filterStatus === 'Published' && ev.published) ||
      (filterStatus === 'Draft' && !ev.published);

    return matchSearch && matchCat && matchStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Institutional Events & Programs
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage academic conferences, Milad celebrations, exams, and community assemblies.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#164e37] hover:bg-[#113d2b] text-white font-bold text-xs rounded-xl shadow-xs transition-all cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4 text-[#c59b27]" />
          <span>Schedule New Event</span>
        </button>
      </div>

      {/* Notification banner */}
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
            Total Programs
          </span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl sm:text-3xl font-black text-slate-900">{totalCount}</span>
            <span className="text-xs text-slate-400 font-medium">Logged</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-emerald-200 bg-emerald-50/20 p-4 shadow-xs">
          <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block mb-1">
            Published Live
          </span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl sm:text-3xl font-black text-emerald-900">{publishedCount}</span>
            <span className="text-xs text-emerald-700 font-medium">Website Visible</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-amber-200 bg-amber-50/20 p-4 shadow-xs">
          <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider block mb-1">
            Featured Programs
          </span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl sm:text-3xl font-black text-amber-900">{featuredCount}</span>
            <span className="text-xs text-amber-700 font-medium">Hero Spotlight</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
            Drafts / Hidden
          </span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl sm:text-3xl font-black text-slate-700">{totalCount - publishedCount}</span>
            <span className="text-xs text-slate-400 font-medium">Internal Only</span>
          </div>
        </div>
      </div>

      {/* Toolbar with View Switcher */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        <div className="flex-1 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search events by title, venue or description..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:ring-2 focus:ring-emerald-700 focus:bg-white"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Category Filter */}
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 font-semibold focus:outline-hidden cursor-pointer"
          >
            <option value="ALL">All Categories</option>
            <option value="Academic">Academic</option>
            <option value="Religious">Religious</option>
            <option value="Cultural">Cultural</option>
            <option value="Sports">Sports</option>
            <option value="Competition">Competition</option>
            <option value="General">General</option>
          </select>

          {/* Status Filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as any)}
            className="py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 font-semibold focus:outline-hidden cursor-pointer"
          >
            <option value="ALL">All Status</option>
            <option value="Published">Published ({publishedCount})</option>
            <option value="Draft">Drafts ({totalCount - publishedCount})</option>
          </select>

          {/* View Mode Toggle */}
          <div className="inline-flex rounded-xl border border-slate-200 bg-slate-50 p-1">
            <button
              type="button"
              onClick={() => setActiveView('list')}
              className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors ${
                activeView === 'list'
                  ? 'bg-white text-emerald-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="List Cards View"
            >
              <List className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Cards</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveView('calendar')}
              className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors ${
                activeView === 'calendar'
                  ? 'bg-white text-emerald-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Timeline Agenda View"
            >
              <CalendarDays className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Agenda</span>
            </button>
          </div>
        </div>
      </div>

      {/* Events Presentation */}
      {loading ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
          <Loader2 className="w-8 h-8 text-emerald-800 animate-spin mx-auto mb-2" />
          <p className="text-xs text-slate-500">Loading events calendar...</p>
        </div>
      ) : filteredEvents.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
          <CalendarIcon className="w-10 h-10 text-slate-300 mx-auto mb-2" />
          <p className="text-sm font-bold text-slate-700">No events found</p>
          <p className="text-xs text-slate-400 mt-1">
            {search || filterCategory !== 'ALL' || filterStatus !== 'ALL'
              ? 'Try relaxing your search terms or filter settings.'
              : 'Click "Schedule New Event" to log an upcoming madrassa program.'}
          </p>
        </div>
      ) : activeView === 'calendar' ? (
        /* Calendar Agenda View */
        <div className="bg-white rounded-2xl border border-slate-200 divide-y divide-slate-100 shadow-xs overflow-hidden">
          {filteredEvents.map((ev) => (
            <div key={ev.id} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/70 transition-colors">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex flex-col items-center justify-center text-center shrink-0">
                  <CalendarIcon className="w-5 h-5 text-[#164e37]" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      {ev.category || 'General'}
                    </span>
                    {ev.featured && (
                      <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-300 flex items-center gap-1">
                        <Sparkles className="w-2.5 h-2.5" /> Featured
                      </span>
                    )}
                    <span className="text-xs font-bold text-slate-900">{ev.date}</span>
                    {ev.startTime && (
                      <span className="text-xs text-slate-400">({ev.startTime} - {ev.endTime || 'End'})</span>
                    )}
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 leading-snug">{ev.title}</h3>
                  <div className="flex items-center gap-1 text-xs text-slate-500 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{ev.location}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                <button
                  type="button"
                  onClick={() => setPreviewEvent(ev)}
                  className="p-1.5 text-slate-500 hover:text-emerald-800 hover:bg-emerald-50 rounded-lg cursor-pointer"
                  title="Preview"
                >
                  <Eye className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleOpenEdit(ev)}
                  className="p-1.5 text-slate-500 hover:text-emerald-800 hover:bg-emerald-50 rounded-lg cursor-pointer"
                  title="Edit"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setEventToDelete(ev)}
                  className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg cursor-pointer"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Cards View */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredEvents.map((ev) => {
            const coverUrl = ev.coverImage || ev.image;
            return (
              <div
                key={ev.id}
                className={`bg-white rounded-2xl border p-5 shadow-xs transition-all flex flex-col justify-between ${
                  ev.published
                    ? 'border-slate-200 hover:border-emerald-300'
                    : 'border-dashed border-slate-300 bg-slate-50/50'
                }`}
              >
                <div>
                  {/* Cover thumbnail if available */}
                  {coverUrl && (
                    <div className="w-full h-36 rounded-xl overflow-hidden mb-3.5 bg-slate-100 border border-slate-200">
                      <img
                        src={coverUrl}
                        alt={ev.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  {/* Header tags */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                        {ev.category || 'Madrassa Program'}
                      </span>
                      {ev.featured && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                          <Sparkles className="w-2.5 h-2.5 text-amber-700" />
                          <span>Featured</span>
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-slate-500 font-medium">{ev.date}</span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 mb-1 leading-snug">{ev.title}</h3>

                  <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-2">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{ev.location}</span>
                  </div>

                  {ev.startTime && (
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-3">
                      <Clock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span>{ev.startTime} - {ev.endTime || 'End'}</span>
                    </div>
                  )}

                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-2 mb-3">
                    {ev.description}
                  </p>
                </div>

                {/* Footer action bar */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleToggle(ev.id, ev.published)}
                      className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg cursor-pointer transition-colors ${
                        ev.published
                          ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                          : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                      }`}
                      title={ev.published ? 'Click to make Draft' : 'Click to Publish'}
                    >
                      {ev.published ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                      <span>{ev.published ? 'Published' : 'Draft'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleToggleFeatured(ev)}
                      className={`p-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                        ev.featured
                          ? 'bg-amber-100 text-amber-900 hover:bg-amber-200'
                          : 'bg-slate-100 text-slate-400 hover:text-slate-700'
                      }`}
                      title={ev.featured ? 'Unfeature this event' : 'Highlight as Featured Event'}
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => setPreviewEvent(ev)}
                      className="p-1.5 text-slate-500 hover:text-emerald-800 hover:bg-emerald-50 rounded-lg cursor-pointer"
                      title="Preview"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleOpenEdit(ev)}
                      className="p-1.5 text-slate-500 hover:text-emerald-800 hover:bg-emerald-50 rounded-lg cursor-pointer"
                      title="Edit"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setEventToDelete(ev)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg cursor-pointer"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add / Edit Event Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-3xl shadow-2xl max-w-xl w-full overflow-hidden border border-slate-200 my-8">
            <div className="p-5 sm:p-6 bg-[#0d281e] text-white flex items-center justify-between">
              <h2 className="text-base sm:text-lg font-bold">
                {editingItem ? 'Edit Event Details' : 'Schedule New Event'}
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
                  Event Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Annual Milad un-Nabi Gathering & Student Recitation Fest"
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-700"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">
                    Event Date *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    placeholder="e.g. November 20, 2025"
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl font-medium"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-semibold"
                  >
                    <option value="Religious">Religious</option>
                    <option value="Academic">Academic</option>
                    <option value="Cultural">Cultural</option>
                    <option value="Sports">Sports</option>
                    <option value="Competition">Competition</option>
                    <option value="General">General</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">
                    Start Time
                  </label>
                  <input
                    type="text"
                    value={formData.startTime}
                    onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                    placeholder="09:00 AM"
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">
                    End Time
                  </label>
                  <input
                    type="text"
                    value={formData.endTime}
                    onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                    placeholder="01:00 PM"
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">
                  Venue / Location *
                </label>
                <input
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="e.g. Madrassa Main Auditorium, Korangath"
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">
                  Short Summary (Cards & Previews) *
                </label>
                <textarea
                  required
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="1-2 sentences summarizing the program purpose and timing..."
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">
                  Full Program Description & Schedule
                </label>
                <textarea
                  rows={4}
                  value={formData.fullDescription}
                  onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
                  placeholder="Complete schedule, participating classes, invited scholars, protocol for parents..."
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl"
                />
              </div>

              {/* Cover Image Upload & URL */}
              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">
                  Event Cover Image (Optional)
                </label>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <label className="inline-flex items-center gap-1.5 px-3 py-2 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 rounded-xl font-bold border border-emerald-200 cursor-pointer">
                      <Upload className="w-3.5 h-3.5" />
                      <span>{uploadingImage ? 'Uploading...' : 'Upload Image File'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        disabled={uploadingImage}
                        onChange={handleImageFileChange}
                        className="hidden"
                      />
                    </label>
                    <span className="text-slate-400">or enter image URL</span>
                  </div>

                  <input
                    type="url"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="https://example.com/cover-image.jpg"
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl"
                  />

                  {formData.image && (
                    <div className="mt-2 relative w-32 h-20 rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
                      <img
                        src={formData.image}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => setFormData((prev) => ({ ...prev, image: '' }))}
                        className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-1"
                        title="Remove image"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Toggles */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-2 border-t border-slate-100">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="publishedEvent"
                    checked={formData.published}
                    onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                    className="w-4 h-4 text-emerald-700 rounded"
                  />
                  <label htmlFor="publishedEvent" className="font-semibold text-slate-700 cursor-pointer">
                    Publish to Website Calendar
                  </label>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="featuredEvent"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="w-4 h-4 text-amber-600 rounded"
                  />
                  <label htmlFor="featuredEvent" className="font-semibold text-slate-700 cursor-pointer">
                    Highlight as Featured Event
                  </label>
                </div>
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
                  {submitting ? 'Saving...' : 'Save Event'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {previewEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200 max-h-[90vh] flex flex-col">
            <div className="p-5 bg-[#0d281e] text-white flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <CalendarIcon className="w-5 h-5 text-[#c59b27]" />
                <h2 className="text-base font-bold">Event Preview</h2>
              </div>
              <button
                type="button"
                onClick={() => setPreviewEvent(null)}
                className="text-slate-300 hover:text-white p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 sm:p-6 overflow-y-auto space-y-4 text-xs">
              {(previewEvent.coverImage || previewEvent.image) && (
                <div className="w-full h-40 rounded-2xl overflow-hidden bg-slate-900">
                  <img
                    src={previewEvent.coverImage || previewEvent.image}
                    alt={previewEvent.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                  {previewEvent.category || 'Program'}
                </span>
                {previewEvent.featured && (
                  <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-300 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> Featured Program
                  </span>
                )}
              </div>

              <h3 className="text-lg font-bold text-slate-900 leading-snug">
                {previewEvent.title}
              </h3>

              <div className="grid grid-cols-2 gap-2 text-[11px] p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div>
                  <span className="text-slate-400 block">Date:</span>
                  <span className="font-bold text-slate-800">{previewEvent.date}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Timing:</span>
                  <span className="font-bold text-slate-800">
                    {previewEvent.startTime ? `${previewEvent.startTime} - ${previewEvent.endTime || 'End'}` : 'Morning'}
                  </span>
                </div>
                <div className="col-span-2">
                  <span className="text-slate-400 block">Venue:</span>
                  <span className="font-bold text-slate-800">{previewEvent.location}</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-emerald-50/50 border border-emerald-200 text-slate-800 font-medium leading-relaxed">
                {previewEvent.description}
              </div>

              {previewEvent.fullDescription && (
                <div className="p-4 rounded-xl bg-white border border-slate-200 text-slate-800 leading-relaxed whitespace-pre-line">
                  {previewEvent.fullDescription}
                </div>
              )}

              <div className="pt-2 flex items-center justify-between text-slate-400 text-[11px]">
                <span>Status: {previewEvent.published ? 'Live on website' : 'Draft (Admin Only)'}</span>
                <a
                  href={`/events/${previewEvent.id}`}
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
                onClick={() => setPreviewEvent(null)}
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
        isOpen={Boolean(eventToDelete)}
        title="Delete Madrassa Event?"
        message={`Are you sure you want to permanently delete "${eventToDelete?.title}"?`}
        confirmLabel="Permanently Delete"
        onConfirm={handleDelete}
        onCancel={() => setEventToDelete(null)}
      />
    </div>
  );
};
