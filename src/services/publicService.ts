import { collection, addDoc } from 'firebase/firestore';
import { db, isFirebaseConfigured } from '../lib/firebase';
import type {
  NoticeItem,
  EventItem,
  TeacherItem,
  DepartmentItem,
  GalleryItem,
  AdmissionEnquiry,
  SchoolSettings
} from '../types/firestore';
import {
  getNoticesAdmin,
  getEventsAdmin,
  getTeachersAdmin,
  getDepartmentsAdmin,
  getGalleryAdmin,
  getSchoolSettings,
  getAdmissionsAdmin
} from './adminService';

// Submit Admission & General Enquiry
export const submitAdmissionEnquiry = async (
  payload: Omit<AdmissionEnquiry, 'id' | 'createdAt' | 'status'>
): Promise<{ success: boolean; id: string; message: string }> => {
  // 1. Validation
  const applicantName = payload.applicantName?.trim();
  const phone = payload.phone?.trim();
  const message = payload.message?.trim();
  const enquiryType = payload.enquiryType;

  if (!applicantName || applicantName.length < 2) {
    throw new Error('Please enter a valid full name.');
  }

  if (!phone || phone.replace(/\D/g, '').length < 8) {
    throw new Error('Please provide a valid contact phone number with at least 8 digits.');
  }

  if (!enquiryType) {
    throw new Error('Please select a valid enquiry type.');
  }

  if (!message || message.length < 5) {
    throw new Error('Please provide a descriptive enquiry message.');
  }

  const newEnquiry: AdmissionEnquiry = {
    id: `enq-${Date.now()}`,
    applicantName,
    parentName: payload.parentName?.trim() || applicantName,
    studentName: payload.studentName?.trim() || applicantName,
    phone,
    email: payload.email?.trim() || undefined,
    enquiryType,
    message,
    createdAt: new Date().toISOString(),
    status: 'New',
  };

  // 2. Write to Firestore if connected
  if (isFirebaseConfigured && db) {
    try {
      const docRef = await addDoc(collection(db, 'admissions'), newEnquiry);
      return {
        success: true,
        id: docRef.id,
        message: 'Your admission enquiry has been successfully logged with the madrassa office desk.',
      };
    } catch (err: any) {
      console.warn('[PublicService] Firestore admission write error, falling back to local logging:', err);
    }
  }

  // 3. Resilient Local Storage Logging
  const list = await getAdmissionsAdmin();
  list.unshift(newEnquiry);
  localStorage.setItem('sharafiyya_admin_admissions', JSON.stringify(list));

  return {
    success: true,
    id: newEnquiry.id,
    message: 'Your enquiry has been successfully registered and queued for administrative review.',
  };
};

// Public Read Functions (Published records only)
export const getPublicNotices = async (): Promise<NoticeItem[]> => {
  const notices = await getNoticesAdmin();
  return notices.filter((n) => n.published);
};

export const getPublicEvents = async (): Promise<EventItem[]> => {
  const events = await getEventsAdmin();
  return events.filter((e) => e.published);
};

export const getPublicTeachers = async (): Promise<TeacherItem[]> => {
  const teachers = await getTeachersAdmin();
  return teachers.filter((t) => t.published);
};

export const getPublicDepartments = async (): Promise<DepartmentItem[]> => {
  const depts = await getDepartmentsAdmin();
  return depts.filter((d) => d.published);
};

export const getPublicGallery = async (): Promise<GalleryItem[]> => {
  const items = await getGalleryAdmin();
  return items.filter((g) => g.published);
};

export const getPublicSchoolSettings = async (): Promise<SchoolSettings> => {
  return getSchoolSettings();
};
