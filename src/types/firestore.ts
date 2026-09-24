// Type definitions for Cloud Firestore collections & documents

export interface NoticeItem {
  id: string;
  title: string;
  description: string;
  fullContent?: string;
  date: string;
  category: 'General' | 'Academic' | 'Admission' | 'Examination' | 'Events' | 'Academic Notice' | 'Admission Update' | 'Institution Notice';
  priority?: 'Normal' | 'Important' | 'Urgent';
  targetAudience?: 'Everyone' | 'Students' | 'Parents' | 'Staff';
  published: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface EventItem {
  id: string;
  title: string;
  description: string;
  fullDescription?: string;
  date: string;
  startTime?: string;
  endTime?: string;
  location: string;
  image?: string;
  coverImage?: string;
  category?: string;
  featured?: boolean;
  published: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface TeacherItem {
  id: string;
  name: string;
  role: string;
  department: string;
  phone?: string;
  email?: string;
  photo?: string;
  photoUrl?: string;
  qualification?: string;
  subjects?: string[];
  bio: string;
  published: boolean;
  status?: 'Active' | 'On Leave' | 'Inactive';
  createdAt?: string;
  updatedAt?: string;
}

export interface DepartmentItem {
  id: string;
  title: string;
  arabicTitle?: string;
  description: string;
  icon?: string;
  published: boolean;
  modules?: string[];
  targetLevels?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  image: string;
  category: 'Campus' | 'Classrooms' | 'Student Activities' | 'Programs' | 'Events' | 'General';
  description?: string;
  createdAt: string;
  published: boolean;
}

export interface AdmissionEnquiry {
  id: string;
  applicantName: string;
  parentName?: string;
  studentName?: string;
  phone: string;
  email?: string;
  className?: string;
  enquiryType: 'Admission' | 'Academic Information' | 'Student Information' | 'General Enquiry';
  message: string;
  createdAt: string;
  updatedAt?: string;
  status: 'New' | 'Contacted' | 'Closed';
  notes?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  phone: string;
  email?: string;
  subject?: string;
  message: string;
  date?: string;
  createdAt: string;
  updatedAt?: string;
  status: 'Unread' | 'Read' | 'Replied' | 'Closed';
  notes?: string;
}

export interface CustomTableRow {
  id: string;
  data: Record<string, string>;
  createdAt: string;
  updatedAt?: string;
}

export interface CustomTableRecord {
  id: string;
  tableName: string;
  description?: string;
  columns: string[];
  rows: CustomTableRow[];
  createdAt: string;
  updatedAt?: string;
}

export interface SchoolSettings {
  id: string;
  officialName: string;
  localName: string;
  arabicSubtitle: string;
  address: string;
  phone: string;
  email: string;
  officeHours: string;
  transitDirections: string;
  socialLinks?: {
    facebook?: string;
    youtube?: string;
    instagram?: string;
    whatsapp?: string;
  };
}

export interface StudentDocument {
  id: string;
  uid: string;
  studentId: string; // Permanent Unique ID e.g. SK-2025-001
  username?: string; // Custom login identifier chosen by student
  name: string;
  email: string;
  className: string; // e.g. "Class 5 - Intermediate"
  section?: string; // e.g. "Section A"
  division?: string;
  parentName?: string;
  guardianName?: string;
  phone?: string;
  address?: string;
  emergencyContact?: string;
  bloodGroup?: string;
  bio?: string;
  department: string; // e.g. "Qur’an & Tajweed"
  profileImage?: string;
  academicYear: string; // e.g. "2025–2026"
  accountStatus: 'Active' | 'Disabled';
  firstLogin?: boolean; // True on initial creation until student changes password
  mustChangePassword?: boolean; // Set when admin resets password
  documents?: Array<{
    id: string;
    title: string;
    fileUrl: string;
    type?: string;
    uploadedAt: string;
  }>;
  createdAt: string;
  updatedAt: string;
}

export interface AttendanceRecord {
  id: string;
  uid: string;
  studentId: string;
  academicYear: string;
  totalDays: number;
  presentDays: number;
  percentage: number;
  monthlyBreakdown?: Array<{
    month: string;
    total: number;
    attended: number;
  }>;
  lastUpdated: string;
}

export interface SubjectGrade {
  name: string;
  maxMarks: number;
  obtainedMarks: number;
  grade: string;
  remarks?: string;
}

export interface AcademicRecord {
  id: string;
  uid: string;
  studentId: string;
  academicYear: string;
  term: string; // e.g. "Quarter 1 Evaluation"
  subjects: SubjectGrade[];
  totalMarks: number;
  totalObtained: number;
  overallGrade: string;
  published: boolean;
}

export interface DashboardStats {
  totalNotices: number;
  totalEvents: number;
  totalTeachers: number;
  publishedTeachers?: number;
  draftTeachers?: number;
  totalDepartments: number;
  totalGallery: number;
  totalStudents: number;
  newAdmissions: number;
  unreadMessages?: number;
}
