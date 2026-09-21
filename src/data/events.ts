export interface SchoolEvent {
  id: string;
  title: string;
  category: "Upcoming Events" | "Academic Programs" | "Islamic Programs" | "Notices";
  datePlaceholder: string;
  timePlaceholder: string;
  venuePlaceholder: string;
  summary: string;
  fullDetails: string;
  isPlaceholder: boolean;
}

export const EVENTS: SchoolEvent[] = [
  {
    id: "event-annual-day",
    title: "[Event Name: Annual Day & Exhibition / Editable Placeholder]",
    category: "Upcoming Events",
    datePlaceholder: "[Date: To be announced by Administration]",
    timePlaceholder: "[Time: To be notified]",
    venuePlaceholder: "Madrassa Main Hall, Korangath",
    summary: "Annual institutional program featuring student presentations and academic recognition.",
    fullDetails: "Detailed program schedule, guest speakers, and student stage timings will be circulated prior to the event.",
    isPlaceholder: true,
  },
  {
    id: "event-term-exam",
    title: "[Academic Program: Term-End Examinations / Editable Placeholder]",
    category: "Academic Programs",
    datePlaceholder: "[Exam Schedule: Circular to be issued]",
    timePlaceholder: "[Class Timings: Regular Batches]",
    venuePlaceholder: "Designated Classrooms, Sharafiyya Korangath",
    summary: "Oral recitation evaluation and written assessment of Islamic studies subjects.",
    fullDetails: "Portions, question paper patterns, and grading guidelines follow the authorized Islamic education board syllabus.",
    isPlaceholder: true,
  },
  {
    id: "event-milad-program",
    title: "[Islamic Program: Prophetic Seerah & Milad Observance / Editable Placeholder]",
    category: "Islamic Programs",
    datePlaceholder: "[Date: Month of Rabi-ul-Awwal / Schedule to be announced]",
    timePlaceholder: "[Time: To be announced]",
    venuePlaceholder: "Campus Grounds, Korangath",
    summary: "Commemorative devotional gathering, Quran recitation, and Prophetic character lessons.",
    fullDetails: "Special assemblies and inter-class speech presentations highlighting the blessed life of the Holy Prophet.",
    isPlaceholder: true,
  },
  {
    id: "event-notice-admissions",
    title: "[Notice: Admission Application Circular / Editable Placeholder]",
    category: "Notices",
    datePlaceholder: "[Notice Date: Academic Session 2025–2026]",
    timePlaceholder: "[Office Desk: Working Hours]",
    venuePlaceholder: "Administrative Office, Korangath",
    summary: "Notification regarding registration of new students for foundational and primary classes.",
    fullDetails: "Parents seeking admission for their children can submit an enquiry online or visit the office during working hours.",
    isPlaceholder: true,
  },
  {
    id: "event-pta-meet",
    title: "[Academic Program: Parent-Teacher Consultation / Editable Placeholder]",
    category: "Academic Programs",
    datePlaceholder: "[Date: Quarterly Meeting Schedule to be announced]",
    timePlaceholder: "[Time: Morning Session]",
    venuePlaceholder: "Campus Meeting Hall, Korangath",
    summary: "Discussion on student attendance regularity, homework, and moral tarbiyyah progress.",
    fullDetails: "Constructive dialogue between muallims and parents to review each child's recitation development.",
    isPlaceholder: true,
  },
  {
    id: "event-quran-contest",
    title: "[Islamic Program: Annual Qira’at & Azkar Competition / Editable Placeholder]",
    category: "Islamic Programs",
    datePlaceholder: "[Date: To be announced]",
    timePlaceholder: "[Time: To be announced]",
    venuePlaceholder: "Main Recitation Hall",
    summary: "Friendly inter-class Quranic Tajweed recitation contest for students.",
    fullDetails: "Encouraging accuracy in Arabic articulation (Makharij) and confident stage presence.",
    isPlaceholder: true,
  }
];

export const EVENTS_EDITORIAL_NOTICE = "Event names and dates shown above are editable placeholders. Official notices and schedules are published by the Sharafiyya English Medium School management.";
