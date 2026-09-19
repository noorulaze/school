export interface StudentSection {
  id: string;
  title: string;
  category: "Student Portal" | "Notices" | "Academic Information" | "Student Activities" | "Important Resources";
  description: string;
  statusBadge: "Coming Soon" | "Active Information" | "Available";
  isPlaceholder: boolean;
}

export const STUDENT_SECTIONS: StudentSection[] = [
  {
    id: "section-portal",
    title: "Student & Parent Portal Gateway",
    category: "Student Portal",
    description: "Online portal login for parents and students to access digitized attendance tracking and progress cards.",
    statusBadge: "Coming Soon",
    isPlaceholder: true,
  },
  {
    id: "section-notices",
    title: "Student Circulars & Timely Notices",
    category: "Notices",
    description: "Official notices concerning class schedule adjustments, holiday notifications, and exam dates.",
    statusBadge: "Active Information",
    isPlaceholder: true,
  },
  {
    id: "section-academic-info",
    title: "Academic Information & Batch Timings",
    category: "Academic Information",
    description: "Daily class hours for Morning (6:45 AM – 8:30 AM) and Evening (4:30 PM – 6:00 PM) batches, attendance rules, and evaluation criteria.",
    statusBadge: "Active Information",
    isPlaceholder: true,
  },
  {
    id: "section-activities",
    title: "Student Activities & Literary Club",
    category: "Student Activities",
    description: "Weekly speech practice, Qira'at training, moral storytelling, and Milad celebration events.",
    statusBadge: "Active Information",
    isPlaceholder: true,
  },
  {
    id: "section-resources",
    title: "Important Resources & Dua Booklets",
    category: "Important Resources",
    description: "Prescribed daily Masnoon Azkar, Tajweed summary charts, and textbook references for home revision.",
    statusBadge: "Available",
    isPlaceholder: true,
  }
];

export const CODE_OF_CONDUCT = [
  {
    title: "Punctuality & Morning Assembly",
    description: "Students must arrive on time for the 6:45 AM morning assembly in clean and modest attire with their prescribed books."
  },
  {
    title: "Wudhu (Ritual Purity) for Quran Classes",
    description: "Students should be in a state of ritual cleanliness (Wudhu) before entering the recitation hall and handling the Holy Quran."
  },
  {
    title: "Respect for Teachers (Muallims) and Peers",
    description: "Observing Islamic greeting (Assalamu Alaikum), attentive listening in class, and maintaining peaceful, kind interaction with classmates."
  },
  {
    title: "Campus Cleanliness and Care",
    description: "Maintaining neatness across classroom desks, wudhu areas, and grounds, respecting all educational materials and property."
  }
];
