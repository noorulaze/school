export interface PortalModule {
  id: string;
  title: string;
  description: string;
  badge: "Active Foundation" | "Portal Preview" | "Notice" | "Coming Soon";
  iconName: "calendar" | "fileText" | "checkCircle" | "award" | "bookOpen" | "lock";
  actionText: string;
  isPlaceholder: boolean;
}

export const PORTAL_MODULES: PortalModule[] = [
  {
    id: "portal-attendance",
    title: "Student Attendance Tracking",
    description: "Digital attendance tracking records for parents to monitor daily madrassa presence and punctuality.",
    badge: "Portal Preview",
    iconName: "checkCircle",
    actionText: "Preview Attendance System",
    isPlaceholder: true,
  },
  {
    id: "portal-timetable",
    title: "Class Schedules & Daily Timetable",
    description: "Period-wise timetable for morning and evening madrassa sessions across all educational grades.",
    badge: "Active Foundation",
    iconName: "calendar",
    actionText: "View Class Timetable",
    isPlaceholder: true,
  },
  {
    id: "portal-results",
    title: "Examination Records & Progress Reports",
    description: "Progress cards, terminal exam marks, and teacher remarks accessible via student roll number.",
    badge: "Portal Preview",
    iconName: "award",
    actionText: "Access Student Card",
    isPlaceholder: true,
  },
  {
    id: "portal-curriculum",
    title: "Prescribed Syllabi & Study Materials",
    description: "Downloadable PDF references, recitation guidelines, and daily dua memorization checklists.",
    badge: "Active Foundation",
    iconName: "bookOpen",
    actionText: "Browse Study Materials",
    isPlaceholder: true,
  },
  {
    id: "portal-notices",
    title: "Official Academic Circulars & Notices",
    description: "Timely administrative updates regarding holidays, parent meetings, and assessment schedules.",
    badge: "Active Foundation",
    iconName: "fileText",
    actionText: "Read Latest Circulars",
    isPlaceholder: true,
  },
  {
    id: "portal-secure-login",
    title: "Parent & Student Portal Access",
    description: "Secure gateway for verified guardians to manage records, track progress, and submit queries.",
    badge: "Coming Soon",
    iconName: "lock",
    actionText: "Login Gateway (Coming Soon)",
    isPlaceholder: true,
  }
];

export const CODE_OF_CONDUCT = [
  {
    title: "Punctuality & Regular Attendance",
    description: "Students are expected to arrive 10 minutes prior to morning assembly with complete Islamic attire and prescribed notebooks."
  },
  {
    title: "Reverence for the Holy Quran",
    description: "Classrooms and recitation spaces must be approached with Wudhu (ritual purity), clean hands, and utmost solemnity."
  },
  {
    title: "Etiquette with Muallims & Peers",
    description: "Upholding respectful greetings (Salam), attentive listening, mutual kindness, and absence of disorderly conduct."
  },
  {
    title: "Preservation of Campus Facilities",
    description: "Maintaining neatness, turning off taps and lights after use, and treating all educational materials with care."
  }
];
