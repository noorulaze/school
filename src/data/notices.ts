export interface NoticeData {
  id: string;
  title: string;
  category: 'Academic Notice' | 'Admission Update' | 'Institution Notice' | 'General';
  date: string;
  description: string;
  published: boolean;
}

export const NOTICES: NoticeData[] = [
  {
    id: 'notice-adm-2025',
    title: 'Admissions Open for Academic Year 2025–2026',
    category: 'Admission Update',
    date: 'October 15, 2025',
    description: 'Admissions are currently underway for foundational and primary classes. Parents are invited to submit online enquiries or visit the administrative desk in Korangath.',
    published: true,
  },
  {
    id: 'notice-quran-hifz',
    title: 'Tajweed Articulation & Hifz Revision Schedule',
    category: 'Academic Notice',
    date: 'October 01, 2025',
    description: 'Special morning sessions (6:45 AM – 8:30 AM) dedicated to Makharij mastery, phonetic rules, and juz memorization verification.',
    published: true,
  },
  {
    id: 'notice-quarterly-exam',
    title: 'First Term Examination & Board Assessments',
    category: 'Academic Notice',
    date: 'November 10, 2025',
    description: 'Quarterly assessments covering Fiqh, Akhlaq, and Quranic recitation will take place during the second week of November.',
    published: true,
  },
  {
    id: 'notice-office-hours',
    title: 'Administrative Office Visiting Hours Notice',
    category: 'Institution Notice',
    date: 'September 20, 2025',
    description: 'The administrative desk is accessible Monday to Saturday from 8:00 AM to 5:30 PM for fee receipts, certificate requests, and parent inquiries.',
    published: true,
  }
];
