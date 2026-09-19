import React, { useEffect, useState } from 'react';
import {
  Inbox,
  Search,
  Trash2,
  Phone,
  Mail,
  Calendar,
  CheckCircle2,
  Loader2,
  X
} from 'lucide-react';
import {
  getAdmissionsAdmin,
  updateAdmissionStatus,
  deleteAdmission
} from '../../services/adminService';
import type { AdmissionEnquiry } from '../../types/firestore';
import { ConfirmModal } from '../components/ConfirmModal';

export const AdminAdmissions: React.FC = () => {
  const [enquiries, setEnquiries] = useState<AdmissionEnquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<'ALL' | 'New' | 'Contacted' | 'Closed'>('ALL');
  const [enquiryToDelete, setEnquiryToDelete] = useState<AdmissionEnquiry | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await getAdmissionsAdmin();
      setEnquiries(data);
    } catch (err) {
      console.error('Error loading admission enquiries:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleStatusChange = async (id: string, status: 'New' | 'Contacted' | 'Closed') => {
    try {
      await updateAdmissionStatus(id, status);
      setNotification(`Status updated to "${status}"`);
      loadData();
    } catch (err) {
      console.error('Status update failed:', err);
    }
  };

  const handleDelete = async () => {
    if (!enquiryToDelete) return;
    try {
      await deleteAdmission(enquiryToDelete.id);
      setEnquiryToDelete(null);
      setNotification('Enquiry deleted');
      loadData();
    } catch (err) {
      console.error('Delete enquiry error:', err);
    }
  };

  const filtered = enquiries.filter((e) => {
    const matchSearch =
      search === '' ||
      e.applicantName.toLowerCase().includes(search.toLowerCase()) ||
      (e.studentName && e.studentName.toLowerCase().includes(search.toLowerCase())) ||
      e.phone.includes(search) ||
      (e.email && e.email.toLowerCase().includes(search.toLowerCase())) ||
      e.message.toLowerCase().includes(search.toLowerCase());

    const matchStatus = filterStatus === 'ALL' || e.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const newCount = enquiries.filter((e) => e.status === 'New').length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Admission & Visitor Enquiries
            </h1>
            {newCount > 0 && (
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-200 animate-pulse">
                {newCount} New
              </span>
            )}
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Real-time applications, contact requests, and academic inquiries submitted through the website.
          </p>
        </div>
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
            placeholder="Search by applicant name, student name, phone, or message content..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:ring-2 focus:ring-emerald-700 focus:bg-white"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value as any)}
          className="py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 font-semibold"
        >
          <option value="ALL">All Statuses ({enquiries.length})</option>
          <option value="New">New Enquiries ({newCount})</option>
          <option value="Contacted">Contacted</option>
          <option value="Closed">Closed</option>
        </select>
      </div>

      {/* Enquiries Feed */}
      {loading ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
          <Loader2 className="w-8 h-8 text-emerald-800 animate-spin mx-auto mb-2" />
          <p className="text-xs text-slate-500">Loading enquiries inbox...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
          <Inbox className="w-10 h-10 text-slate-300 mx-auto mb-2" />
          <p className="text-sm font-bold text-slate-700">No enquiries found</p>
          <p className="text-xs text-slate-400 mt-1">
            When visitors complete an admission or contact form, their entry will be displayed here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((enq) => (
            <div
              key={enq.id}
              className={`bg-white rounded-2xl border p-5 shadow-xs transition-all ${
                enq.status === 'New'
                  ? 'border-amber-300 bg-amber-50/10'
                  : 'border-slate-200'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-sm font-bold text-slate-900">{enq.applicantName}</h3>
                    {enq.studentName && enq.studentName !== enq.applicantName && (
                      <span className="text-xs text-slate-500">
                        (Student: <strong className="text-slate-700">{enq.studentName}</strong>)
                      </span>
                    )}
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {enq.enquiryType}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-slate-600">
                    <span className="flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5 text-emerald-700" />
                      <a href={`tel:${enq.phone}`} className="hover:underline font-medium">
                        {enq.phone}
                      </a>
                    </span>
                    {enq.email && (
                      <span className="flex items-center gap-1">
                        <Mail className="w-3.5 h-3.5 text-slate-400" />
                        <a href={`mailto:${enq.email}`} className="hover:underline">
                          {enq.email}
                        </a>
                      </span>
                    )}
                    <span className="flex items-center gap-1 text-slate-400">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>
                        {new Date(enq.createdAt).toLocaleString(undefined, {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </span>
                  </div>
                </div>

                {/* Status selector & Actions */}
                <div className="flex items-center gap-3 shrink-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] font-semibold text-slate-400">Status:</span>
                    <select
                      value={enq.status}
                      onChange={(e) => handleStatusChange(enq.id, e.target.value as any)}
                      className={`text-xs font-bold py-1.5 px-3 rounded-xl border focus:outline-hidden cursor-pointer ${
                        enq.status === 'New'
                          ? 'bg-amber-50 text-amber-900 border-amber-300'
                          : enq.status === 'Contacted'
                          ? 'bg-blue-50 text-blue-900 border-blue-300'
                          : 'bg-slate-100 text-slate-700 border-slate-300'
                      }`}
                    >
                      <option value="New">New</option>
                      <option value="Contacted">Contacted</option>
                      <option value="Closed">Closed</option>
                    </select>
                  </div>

                  <button
                    type="button"
                    onClick={() => setEnquiryToDelete(enq)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                    title="Delete Enquiry"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Message Content */}
              <div className="mt-3.5 p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700 leading-relaxed">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Enquiry Message:
                </span>
                <p className="whitespace-pre-line">{enq.message}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Modal */}
      <ConfirmModal
        isOpen={Boolean(enquiryToDelete)}
        title="Delete Admission Enquiry?"
        message={`Are you sure you want to delete the enquiry from ${enquiryToDelete?.applicantName}?`}
        confirmLabel="Delete Enquiry"
        onConfirm={handleDelete}
        onCancel={() => setEnquiryToDelete(null)}
      />
    </div>
  );
};
