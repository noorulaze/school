export interface GalleryItem {
  id: string;
  title: string;
  category: "Campus" | "Classrooms" | "Student Activities" | "Programs" | "Events";
  placeholderLabel: string;
  caption: string;
  isPlaceholder: boolean;
}

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "gal-campus-1",
    title: "Campus Building & Entrance",
    category: "Campus",
    placeholderLabel: "Campus Photograph Placeholder",
    caption: "Front view of Sharaful Islam Madrassa premises in Korangath, Tirur.",
    isPlaceholder: true,
  },
  {
    id: "gal-classroom-1",
    title: "Classroom Study Space",
    category: "Classrooms",
    placeholderLabel: "Classroom Photograph Placeholder",
    caption: "Student desks, recitation spaces, and learning environment.",
    isPlaceholder: true,
  },
  {
    id: "gal-activities-1",
    title: "Daily Student Assembly & Duas",
    category: "Student Activities",
    placeholderLabel: "Student Activities Photograph Placeholder",
    caption: "Morning prayer assembly, Quran recitation practice, and daily remembrances.",
    isPlaceholder: true,
  },
  {
    id: "gal-programs-1",
    title: "Madrassa Educational Program",
    category: "Programs",
    placeholderLabel: "Program Photograph Placeholder",
    caption: "Academic seminars, Tajweed training workshops, and moral tarbiyyah sessions.",
    isPlaceholder: true,
  },
  {
    id: "gal-events-1",
    title: "Annual Day & Community Event",
    category: "Events",
    placeholderLabel: "Event Photograph Placeholder",
    caption: "Annual school day, student exhibitions, and parent gathering in Korangath.",
    isPlaceholder: true,
  },
  {
    id: "gal-campus-2",
    title: "Campus Grounds & Courtyard",
    category: "Campus",
    placeholderLabel: "Campus Photograph Placeholder",
    caption: "Open spaces and surroundings of the madrassa campus.",
    isPlaceholder: true,
  },
  {
    id: "gal-classroom-2",
    title: "Islamic Reference & Library Corner",
    category: "Classrooms",
    placeholderLabel: "Classroom Photograph Placeholder",
    caption: "Textbook collection and student reference area.",
    isPlaceholder: true,
  },
  {
    id: "gal-activities-2",
    title: "Recitation & Speech Practice",
    category: "Student Activities",
    placeholderLabel: "Student Activities Photograph Placeholder",
    caption: "Students practicing Arabic elocution and Quran recitation.",
    isPlaceholder: true,
  }
];

export const GALLERY_EDITORIAL_NOTICE = "Image placeholders shown above are reserved for genuine photographs of the Sharaful Islam Madrassa campus and student activities. High-resolution photographs will be uploaded upon authorization from the school committee.";
