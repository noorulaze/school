export interface TeacherPlaceholder {
  id: string;
  designation: string;
  departmentRole: string;
  namePlaceholder: string;
  qualificationPlaceholder: string;
  experiencePlaceholder: string;
  schedulePlaceholder: string;
  bioPlaceholder: string;
  isPlaceholder: boolean;
}

export const TEACHERS: TeacherPlaceholder[] = [
  {
    id: "faculty-headmaster",
    designation: "Headmaster / Sadar Muallim",
    departmentRole: "Institutional Leadership & Senior Islamic Studies",
    namePlaceholder: "[Headmaster / Sadar Muallim — Name to be added by Administration]",
    qualificationPlaceholder: "[Qualifications / E.g. Fazil / Moulavi / Baqawi Placeholder]",
    experiencePlaceholder: "[Experience: XX Years in Islamic Education Placeholder]",
    schedulePlaceholder: "Morning & Afternoon Administrative Sessions",
    bioPlaceholder: "Provides academic leadership, oversees spiritual tarbiyyah, and mentors both teaching faculty and student bodies.",
    isPlaceholder: true,
  },
  {
    id: "faculty-quran-tajweed",
    designation: "Senior Tajweed & Qira'at Instructor",
    departmentRole: "Department of Quranic Studies",
    namePlaceholder: "[Senior Quran Recitation Instructor — Name to be added]",
    qualificationPlaceholder: "[Hafiz-ul-Quran / Sanad in Tajweed Placeholder]",
    experiencePlaceholder: "[Experience: XX Years in Hifz & Tajweed Guidance Placeholder]",
    schedulePlaceholder: "Classes 1 to 7 Recitation Wings",
    bioPlaceholder: "Dedicated to precision in Quranic articulation (Makharij), melodic Tajweed, and attentive individual coaching for young students.",
    isPlaceholder: true,
  },
  {
    id: "faculty-fiqh-aqeedah",
    designation: "Islamic Jurisprudence (Fiqh) & Theology Instructor",
    departmentRole: "Department of Islamic Jurisprudence & Aqeedah",
    namePlaceholder: "[Fiqh & Islamic Creed Instructor — Name to be added]",
    qualificationPlaceholder: "[Islamic Board Certified Degree / Sanad Placeholder]",
    experiencePlaceholder: "[Experience: XX Years in Madrasa Teaching Placeholder]",
    schedulePlaceholder: "Senior Madrasa Classes (Classes 8–10)",
    bioPlaceholder: "Guides students in classical jurisprudence, prayer practicals, and contemporary ethical understanding with sound scholarship.",
    isPlaceholder: true,
  },
  {
    id: "faculty-arabic-language",
    designation: "Arabic Language & Grammar Instructor",
    departmentRole: "Department of Arabic Language & Literature",
    namePlaceholder: "[Arabic Language Instructor — Name to be added]",
    qualificationPlaceholder: "[Afzal-ul-Ulama / Arabic Degree Placeholder]",
    experiencePlaceholder: "[Experience: XX Years in Arabic Pedagogy Placeholder]",
    schedulePlaceholder: "Middle & Secondary Classes",
    bioPlaceholder: "Specializes in communicative Arabic, grammar fundamentals (Nahw & Sarf), and Quranic textual comprehension.",
    isPlaceholder: true,
  },
  {
    id: "faculty-hadith-seerah",
    designation: "Hadith & Prophetic Seerah Instructor",
    departmentRole: "Department of Hadith & Seerah",
    namePlaceholder: "[Hadith Studies Instructor — Name to be added]",
    qualificationPlaceholder: "[Sanad in Prophetic Traditions / Board Certification Placeholder]",
    experiencePlaceholder: "[Experience: XX Years in Prophetic History Placeholder]",
    schedulePlaceholder: "Intermediate Classes",
    bioPlaceholder: "Instills reverence for the Sunnah and contextual understanding of prophetic compassion, honesty, and family values.",
    isPlaceholder: true,
  },
  {
    id: "faculty-primary-tarbiyyah",
    designation: "Primary Wing Instructor & Child Counselor",
    departmentRole: "Primary Madrasa Foundation Wing",
    namePlaceholder: "[Primary Foundation Muallim — Name to be added]",
    qualificationPlaceholder: "[Early Islamic Education Trained Muallim Placeholder]",
    experiencePlaceholder: "[Experience: XX Years in Elementary Madrasa Education Placeholder]",
    schedulePlaceholder: "Classes 1 to 4 Early Learners",
    bioPlaceholder: "Creates a loving, joyful, and encouraging atmosphere for young children stepping into their early madrasa classes.",
    isPlaceholder: true,
  }
];

export const FACULTY_EDITORIAL_NOTICE = "Faculty names and qualification credentials shown above are structured placeholders. Official verified faculty biographies and profiles will be published upon approval from the Sharaful Islam Madrassa Management Committee.";
