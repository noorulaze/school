export interface GalleryItem {
  id: string;
  title: string;
  category: "Campus" | "Academic" | "Spiritual" | "Activities";
  placeholderLabel: string;
  caption: string;
  accentColor: string;
  iconType: "building" | "book" | "sparkles" | "users" | "trophy" | "camera";
  isPlaceholder: boolean;
}

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "gal-1",
    title: "Campus Facade & Main Entrance",
    category: "Campus",
    placeholderLabel: "[Photo Placeholder: Main Campus Building & Gate]",
    caption: "The peaceful learning environment of Sharaful Islam Madrassa at Korangath, Tirur.",
    accentColor: "from-emerald-800 to-emerald-950",
    iconType: "building",
    isPlaceholder: true,
  },
  {
    id: "gal-2",
    title: "Quran Recitation Hall",
    category: "Academic",
    placeholderLabel: "[Photo Placeholder: Daily Recitation & Hifz Class]",
    caption: "Students practicing morning recitation with dedicated muallims in well-ventilated learning halls.",
    accentColor: "from-navy-900 to-emerald-900",
    iconType: "book",
    isPlaceholder: true,
  },
  {
    id: "gal-3",
    title: "Islamic Reference Reading Area",
    category: "Academic",
    placeholderLabel: "[Photo Placeholder: Reference Library & Reading Area]",
    caption: "Study resource corner providing classical Arabic and Malayalam Islamic curricular books.",
    accentColor: "from-teal-900 to-emerald-950",
    iconType: "book",
    isPlaceholder: true,
  },
  {
    id: "gal-4",
    title: "Prophetic Milad Mehfil",
    category: "Spiritual",
    placeholderLabel: "[Photo Placeholder: Milad-un-Nabi Gathering]",
    caption: "Spiritual devotional recitation and community gathering during Rabi-ul-Awwal.",
    accentColor: "from-amber-900 to-emerald-900",
    iconType: "sparkles",
    isPlaceholder: true,
  },
  {
    id: "gal-5",
    title: "Student Literary & Speech Meet",
    category: "Activities",
    placeholderLabel: "[Photo Placeholder: Student Elocution & Qira'at Meet]",
    caption: "Fostering eloquence, stage confidence, and religious discourse among young learners.",
    accentColor: "from-emerald-900 to-navy-950",
    iconType: "users",
    isPlaceholder: true,
  },
  {
    id: "gal-6",
    title: "Annual Day Merit Commendations",
    category: "Activities",
    placeholderLabel: "[Photo Placeholder: Academic & Tajweed Honor Ceremony]",
    caption: "Recognizing outstanding attendance, moral conduct, and academic excellence.",
    accentColor: "from-yellow-900 to-emerald-950",
    iconType: "trophy",
    isPlaceholder: true,
  },
  {
    id: "gal-7",
    title: "Campus Green Courtyard",
    category: "Campus",
    placeholderLabel: "[Photo Placeholder: Campus Courtyard & Grounds]",
    caption: "Serene open spaces surrounded by Kerala's natural greenery in Korangath.",
    accentColor: "from-emerald-950 to-emerald-800",
    iconType: "building",
    isPlaceholder: true,
  },
  {
    id: "gal-8",
    title: "Daily Prayer & Supplication Session",
    category: "Spiritual",
    placeholderLabel: "[Photo Placeholder: Congregational Duas & Azkar]",
    caption: "Imbuing students with habits of regular daily prayers, remembrance, and sincere supplications.",
    accentColor: "from-navy-950 to-teal-950",
    iconType: "sparkles",
    isPlaceholder: true,
  }
];

export const GALLERY_EDITORIAL_NOTICE = "Image slots displayed above are styled photo placeholders ready for the school committee to upload authentic high-resolution photographs of campus facilities and events.";
