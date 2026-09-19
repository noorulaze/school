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
  X,
  Eye,
  CheckCheck,
  RotateCcw,
  User,
  Filter,
  ArrowUpDown
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
  const [filterType, setFilterType] = useState<string>('ALL');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');

  const [selectedEnquiry, setSelectedEnquiry] = useState<AdmissionEnquiry | null>(null);
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
      if (selectedEnquiry && selectedEnquiry.id === id) {
        setSelectedEnquiry({
          ...selectedEnquiry,
          status,
          updatedAt: new Date().toISOString(),
        });
      }
      loadData();
    } catch (err) {
      console.error('Status update failed:', err);
    }
  };

  const handleDelete = async () => {
    if (!enquiryToDelete) return;
    try {
      await deleteAdmission(enquiryToDelete.id);
      if (selectedEnquiry?.id === enquiryToDelete.id) {
        setSelectedEnquiry(null);
      }
      setEnquiryToDelete(null);
      setNotification('Enquiry deleted successfully');
      loadData();
    } catch (err) {
      console.error('Delete enquiry error:', err);
    }
  };

  // Compute live overview metrics
  const totalCount = enquiries.length;
  const newCount = enquiries.filter((e) => e.status === 'New').length;
  const contactedCount = enquiries.filter((e) => e.status === 'Contacted').length;
  const closedCount = enquiries.filter((e) => e.status === 'Closed').length;

  // Filter & Search
  const filtered = enquiries
    .filter((e) => {
      const q = search.trim().toLowerCase();
      const matchSearch =
        q === '' ||
        e.applicantName.toLowerCase().includes(q) ||
        (e.parentName && e.parentName.toLowerCase().includes(q)) ||
        (e.studentName && e.studentName.toLowerCase().includes(q)) ||
        e.phone.includes(q) ||
        (e.email && e.email.toLowerCase().includes(q)) ||
        e.message.toLowerCase().includes(q);

      const matchStatus = filterStatus === 'ALL' || e.status === filterStatus;
      const matchType = filterType === 'ALL' || e.enquiryType === filterType;

      return matchSearch && matchStatus && matchType;
    })
    .sort((a, b) => {
      const timeA = new Date(a.createdAt).getTime();
      const timeB = new Date(b.createdAt).getTime();
      return sortOrder === 'newest' ? timeB - timeA : timeA - timeB;
    });

  const getStatusBadge = (status: AdmissionEnquiry['status']) => {
    switch (status) {
      case 'New':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
            ● New
          </span>
        );
      case 'Contacted':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-100 text-blue-900 border border-blue-300">
            ✓ Contacted
          </span>
        );
      case 'Closed':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 text-slate-700 border border-slate-300">
            ✓ Closed
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Admission Enquiries & Applications
            </h1>
            {newCount > 0 && (
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 animate-pulse">
                {newCount} New
              </span>
            )}
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Receive, organize, track, and manage confidential admission and academic enquiries submitted through the public portal.
          </p>
        </div>
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

      {/* 1. Admission Overview Metrics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
        <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
            Total Enquiries
          </span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl sm:text-3xl font-black text-slate-900">{totalCount}</span>
            <span className="text-xs text-slate-400 font-medium">Logged</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-amber-200 bg-amber-50/20 p-4 sm:p-5 shadow-xs">
          <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider block mb-1">
            New Enquiries
          </span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl sm:text-3xl font-black text-amber-900">{newCount}</span>
            <span className="text-xs text-amber-700 font-medium">Pending Response</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-blue-200 bg-blue-50/20 p-4 sm:p-5 shadow-xs">
          <span className="text-[11px] font-bold text-blue-800 uppercase tracking-wider block mb-1">
            Contacted
          </span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl sm:text-3xl font-black text-blue-900">{contactedCount}</span>
            <span className="text-xs text-blue-700 font-medium">In Discussion</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
            Closed
          </span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl sm:text-3xl font-black text-slate-700">{closedCount}</span>
            <span className="text-xs text-slate-400 font-medium">Resolved</span>
          </div>
        </div>
      </div>

      {/* 2. Search & Filters Toolbar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs flex flex-col md:flex-row gap-3">
        <div className="flex-1 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by applicant, parent, phone, email or query..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:ring-2 focus:ring-emerald-700 focus:bg-white"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Status filter */}
          <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="bg-transparent border-0 text-xs text-slate-700 font-semibold focus:outline-hidden py-1 cursor-pointer"
            >
              <option value="ALL">Status: All ({totalCount})</option>
              <option value="New">Status: New ({newCount})</option>
              <option value="Contacted">Status: Contacted ({contactedCount})</option>
              <option value="Closed">Status: Closed ({closedCount})</option>
            </select>
          </div>

          {/* Type filter */}
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700 font-semibold focus:outline-hidden cursor-pointer"
          >
            <option value="ALL">All Types</option>
            <option value="Admission">Admission</option>
            <option value="Academic Information">Academic Information</option>
            <option value="Student Information">Student Information</option>
            <option value="General Enquiry">General Enquiry</option>
          </select>

          {/* Sort order */}
          <button
            type="button"
            onClick={() => setSortOrder(sortOrder === 'newest' ? 'oldest' : 'newest')}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            title="Toggle sort direction"
          >
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <span>{sortOrder === 'newest' ? 'Newest First' : 'Oldest First'}</span>
          </button>
        </div>
      </div>

      {/* 3. Enquiries View: Desktop Table + Mobile Cards */}
      {loading ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
          <Loader2 className="w-8 h-8 text-emerald-800 animate-spin mx-auto mb-2" />
          <p className="text-xs text-slate-500">Loading admission enquiries...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
          <Inbox className="w-10 h-10 text-slate-300 mx-auto mb-2" />
          <p className="text-sm font-bold text-slate-700">No matching enquiries found</p>
          <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
            {search || filterStatus !== 'ALL' || filterType !== 'ALL'
              ? 'Try adjusting your search criteria or resetting filters.'
              : 'Enquiries submitted via the website Admission form or Contact page will appear here.'}
          </p>
        </div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[10px]">
                  <th className="py-3.5 px-4">Applicant & Parent</th>
                  <th className="py-3.5 px-4">Contact Info</th>
                  <th className="py-3.5 px-4">Enquiry Type</th>
                  <th className="py-3.5 px-4">Submitted Date</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((enq) => (
                  <tr
                    key={enq.id}
                    className={`hover:bg-slate-50/80 transition-colors ${
                      enq.status === 'New' ? 'bg-amber-50/20' : ''
                    }`}
                  >
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900">{enq.applicantName}</div>
                      {enq.parentName && enq.parentName !== enq.applicantName && (
                        <div className="text-[11px] text-slate-500">
                          Parent: <span className="text-slate-700">{enq.parentName}</span>
                        </div>
                      )}
                      {enq.studentName && enq.studentName !== enq.applicantName && (
                        <div className="text-[10px] text-slate-400">
                          Student: {enq.studentName}
                        </div>
                      )}
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-1 text-slate-700 font-medium">
                        <Phone className="w-3 h-3 text-emerald-700 shrink-0" />
                        <a href={`tel:${enq.phone}`} className="hover:underline">
                          {enq.phone}
                        </a>
                      </div>
                      {enq.email && (
                        <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-0.5">
                          <Mail className="w-3 h-3 text-slate-400 shrink-0" />
                          <a href={`mailto:${enq.email}`} className="hover:underline truncate max-w-[150px]">
                            {enq.email}
                          </a>
                        </div>
                      )}
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                        {enq.enquiryType}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-slate-500 text-[11px] font-mono">
                      {new Date(enq.createdAt).toLocaleDateString(undefined, {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </td>

                    <td className="py-3.5 px-4">
                      {getStatusBadge(enq.status)}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="inline-flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => setSelectedEnquiry(enq)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 text-slate-700 font-semibold rounded-lg transition-colors cursor-pointer"
                          title="View Complete Details"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>View</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setEnquiryToDelete(enq)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                          title="Delete Enquiry"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-3.5">
            {filtered.map((enq) => (
              <div
                key={enq.id}
                className={`bg-white rounded-2xl border p-4 shadow-xs space-y-3 ${
                  enq.status === 'New' ? 'border-amber-300 bg-amber-50/15' : 'border-slate-200'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">{enq.applicantName}</h3>
                    {enq.parentName && enq.parentName !== enq.applicantName && (
                      <p className="text-xs text-slate-500">Parent: {enq.parentName}</p>
                    )}
                  </div>
                  {getStatusBadge(enq.status)}
                </div>

                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600">
                  <span className="flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-emerald-700" />
                    <a href={`tel:${enq.phone}`} className="font-semibold hover:underline">
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
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100">
                  <span className="font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    {enq.enquiryType}
                  </span>
                  <span className="font-mono">
                    {new Date(enq.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setSelectedEnquiry(enq)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#164e37] text-white text-xs font-bold rounded-xl cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Details</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setEnquiryToDelete(enq)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* 4. Enquiry Details Modal with Status Transitions */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200 max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="p-5 sm:p-6 bg-[#0d281e] text-white flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5">
                <User className="w-5 h-5 text-[#c59b27]" />
                <div>
                  <h2 className="text-base sm:text-lg font-bold">Enquiry Dossier</h2>
                  <p className="text-[11px] text-emerald-200/80">Ref: #{selectedEnquiry.id}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedEnquiry(null)}
                className="text-slate-300 hover:text-white p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content Scrollable */}
            <div className="p-5 sm:p-6 space-y-5 overflow-y-auto text-xs text-slate-700">
              {/* Applicant Summary */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 p-4 rounded-2xl bg-[#fbfaf7] border border-[#e8e4dc]">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                    Applicant Name
                  </span>
                  <span className="text-sm font-bold text-slate-900 block">
                    {selectedEnquiry.applicantName}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                    Parent / Guardian
                  </span>
                  <span className="text-sm font-semibold text-slate-800 block">
                    {selectedEnquiry.parentName || 'Not specified'}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                    Contact Phone
                  </span>
                  <a
                    href={`tel:${selectedEnquiry.phone}`}
                    className="text-sm font-bold text-emerald-800 hover:underline flex items-center gap-1 mt-0.5"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>{selectedEnquiry.phone}</span>
                  </a>
                </div>

                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                    Email Address
                  </span>
                  {selectedEnquiry.email ? (
                    <a
                      href={`mailto:${selectedEnquiry.email}`}
                      className="text-sm font-medium text-slate-800 hover:underline flex items-center gap-1 mt-0.5 truncate"
                    >
                      <Mail className="w-3.5 h-3.5 text-slate-400" />
                      <span>{selectedEnquiry.email}</span>
                    </a>
                  ) : (
                    <span className="text-xs text-slate-400 italic">No email provided</span>
                  )}
                </div>
              </div>

              {/* Status & Type info */}
              <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                    Classification
                  </span>
                  <span className="font-bold text-emerald-900">{selectedEnquiry.enquiryType}</span>
                </div>

                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                    Current Status
                  </span>
                  {getStatusBadge(selectedEnquiry.status)}
                </div>

                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                    Submitted Date
                  </span>
                  <span className="font-mono text-slate-600 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-slate-400" />
                    <span>{new Date(selectedEnquiry.createdAt).toLocaleString()}</span>
                  </span>
                </div>
              </div>

              {/* Message Content */}
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                  Message / Inquiry Body
                </span>
                <div className="p-4 rounded-2xl bg-white border border-slate-200 leading-relaxed text-slate-800 whitespace-pre-line text-xs sm:text-sm">
                  {selectedEnquiry.message}
                </div>
              </div>

              {/* Status Transition Action Buttons */}
              <div className="pt-3 border-t border-slate-200">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                  Update Enquiry Lifecycle Status:
                </span>
                <div className="flex flex-wrap gap-2">
                  {selectedEnquiry.status !== 'Contacted' && (
                    <button
                      type="button"
                      onClick={() => handleStatusChange(selectedEnquiry.id, 'Contacted')}
                      className="inline-flex items-center gap-1.5 px-3 py-2 bg-blue-50 text-blue-900 hover:bg-blue-100 border border-blue-200 font-bold rounded-xl transition-colors cursor-pointer text-xs"
                    >
                      <CheckCheck className="w-3.5 h-3.5 text-blue-700" />
                      <span>Mark as Contacted</span>
                    </button>
                  )}

                  {selectedEnquiry.status !== 'Closed' && (
                    <button
                      type="button"
                      onClick={() => handleStatusChange(selectedEnquiry.id, 'Closed')}
                      className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-100 text-slate-800 hover:bg-slate-200 border border-slate-300 font-bold rounded-xl transition-colors cursor-pointer text-xs"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-slate-600" />
                      <span>Mark as Closed</span>
                    </button>
                  )}

                  {selectedEnquiry.status !== 'New' && (
                    <button
                      type="button"
                      onClick={() => handleStatusChange(selectedEnquiry.id, 'New')}
                      className="inline-flex items-center gap-1.5 px-3 py-2 bg-amber-50 text-amber-900 hover:bg-amber-100 border border-amber-300 font-bold rounded-xl transition-colors cursor-pointer text-xs"
                    >
                      <RotateCcw className="w-3.5 h-3.5 text-amber-700" />
                      <span>Reopen as New</span>
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between shrink-0">
              <button
                type="button"
                onClick={() => {
                  setEnquiryToDelete(selectedEnquiry);
                }}
                className="inline-flex items-center gap-1 text-rose-600 hover:text-rose-800 font-semibold text-xs cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Enquiry</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedEnquiry(null)}
                className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs rounded-xl cursor-pointer transition-colors"
              >
                Close Modal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={Boolean(enquiryToDelete)}
        title="Delete Admission Enquiry?"
        message={`Are you sure you want to permanently delete the enquiry record for "${enquiryToDelete?.applicantName}"? This action cannot be undone.`}
        confirmLabel="Permanently Delete"
        onConfirm={handleDelete}
        onCancel={() => setEnquiryToDelete(null)}
      />
    </div>
  );
};
