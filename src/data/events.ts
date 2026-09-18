export interface SchoolEvent {
  id: string;
  title: string;
  category: "Academic" | "Cultural" | "Spiritual" | "Admissions" | "Meeting";
  datePlaceholder: string;
  timePlaceholder: string;
  venuePlaceholder: string;
  summary: string;
  fullDetails: string;
  isPlaceholder: boolean;
  statusBadge: "Upcoming Placeholder" | "Annual Fixture" | "Notice Pending";
}

export const EVENTS: SchoolEvent[] = [
  {
    id: "event-annual-day",
    title: "[Annual Madrassa Day & Cultural Exhibition / Editable]",
    category: "Cultural",
    datePlaceholder: "[Date: To Be Announced for Current Academic Session]",
    timePlaceholder: "[Time: 4:00 PM – 9:30 PM / Editable]",
    venuePlaceholder: "Sharafiyya Korangath Campus Auditorium",
    summary: "Annual celebratory gathering highlighting student speech presentations, Quran recitation, and academic excellence awards.",
    fullDetails: "A signature campus gathering bringing together parents, alumni, and local well-wishers to witness student recitation honors, elocution, moral skits, and academic certificates.",
    isPlaceholder: true,
    statusBadge: "Upcoming Placeholder"
  },
  {
    id: "event-meelad-fest",
    title: "[Milad-un-Nabi Celebrations & Inter-Class Competitions / Editable]",
    category: "Spiritual",
    datePlaceholder: "[Date: Month of Rabi-ul-Awwal / Schedule TBA]",
    timePlaceholder: "[Schedule to be Notified / Editable]",
    venuePlaceholder: "Main Madrassa Hall & Grounds",
    summary: "Prophetic tributes, Naat recitation, Qira'at contests, and community sweet distributions commemorating the blessed birth.",
    fullDetails: "Special devotional programs, Seerah quizzes, calligraphy displays, and ethical story-telling events organized across all student wings.",
    isPlaceholder: true,
    statusBadge: "Annual Fixture"
  },
  {
    id: "event-admissions-session",
    title: "[New Admissions Enquiry & Enrollment Phase / Editable]",
    category: "Admissions",
    datePlaceholder: "[Enrollment Dates: Academic Session 2025–2026 TBA]",
    timePlaceholder: "[Office Hours: 8:00 AM – 1:00 PM / Editable]",
    venuePlaceholder: "Madrassa Administrative Office, Korangath",
    summary: "Application registration for Class 1 and lateral admissions across foundational Islamic and Quranic studies wings.",
    fullDetails: "Parents seeking admission for their wards can obtain application forms from the administrative office or register intent through the online Admission Enquiry portal.",
    isPlaceholder: true,
    statusBadge: "Notice Pending"
  },
  {
    id: "event-term-examinations",
    title: "[Mid-Term & Board Academic Assessments / Editable]",
    category: "Academic",
    datePlaceholder: "[Assessment Timetable: Official Circular Pending]",
    timePlaceholder: "[Morning Sessions / Editable]",
    venuePlaceholder: "Designated Examination Classrooms",
    summary: "Comprehensive evaluation of Quran recitation fluency, Arabic comprehension, and written Islamic studies.",
    fullDetails: "Standardized oral and written evaluations supervised by teaching faculty, followed by parent-teacher progress evaluations.",
    isPlaceholder: true,
    statusBadge: "Notice Pending"
  },
  {
    id: "event-parent-meeting",
    title: "[Parent-Teacher General Body Meeting / Editable]",
    category: "Meeting",
    datePlaceholder: "[Date: Quarterly Schedule to be Announced]",
    timePlaceholder: "[Time: 10:00 AM – 12:30 PM / Editable]",
    venuePlaceholder: "Sharafiyya Korangath Campus Conference Hall",
    summary: "Constructive discussion on student moral progression, attendance regularity, and madrasa welfare initiatives.",
    fullDetails: "Interactive session fostering partnership between parents and muallims to support each child's home spiritual habits and punctuality.",
    isPlaceholder: true,
    statusBadge: "Upcoming Placeholder"
  }
];

export const EVENTS_EDITORIAL_NOTICE = "Event titles, schedules, and dates listed here are representative sample placeholders. Official dates are issued via administrative circulars.";
