export interface DepartmentItem {
  id: string;
  code: string;
  name: string;
  arabicName?: string;
  category: "Islamic Studies" | "Qur’an and Hadith Studies" | "Arabic Language" | "General Education";
  shortSummary: string;
  fullDescription: string;
  targetLevels: string;
  syllabusOverview: string[];
  keyOutcomes: string[];
  isPlaceholder: boolean;
  statusNotice: string;
}

export const DEPARTMENTS: DepartmentItem[] = [
  {
    id: "dept-islamic-studies",
    code: "DEPT-IS",
    name: "Islamic Studies",
    arabicName: "الدراسات الإسلامية والفقه",
    category: "Islamic Studies",
    shortSummary: "Instruction in Islamic theology (Aqeedah), ritual rulings (Fiqh), and moral living.",
    fullDescription: "Covers essential Islamic beliefs, daily prayers, fasting, and ethical community behavior in accordance with authentic Islamic jurisprudence.",
    targetLevels: "[Classes 1 through 10 / Editable Placeholder]",
    syllabusOverview: [
      "[Fundamentals of Iman & Islamic Creed / Editable]",
      "[Practical rulings of Salah & Taharah (Purity) / Editable]",
      "[Fasting (Sawm), Zakah & Daily Ethics / Editable]",
      "[Basic Islamic History & Ethics / Editable]"
    ],
    keyOutcomes: [
      "Understanding foundational Islamic creed and worship",
      "Confidence in performing daily prayers with correct rulings",
      "Grounded moral guidance for personal life"
    ],
    isPlaceholder: true,
    statusNotice: "Editable example — To be updated with official curriculum syllabus by the madrassa."
  },
  {
    id: "dept-quran-hadith",
    code: "DEPT-QH",
    name: "Qur’an and Hadith Studies",
    arabicName: "علوم القرآن والحديث النبوي",
    category: "Qur’an and Hadith Studies",
    shortSummary: "Quranic recitation with Tajweed phonetics, memorization (Hifz), and Prophetic traditions.",
    fullDescription: "Dedicated to systematic Quranic literacy from foundational Arabic articulation rules (Makharij) to fluent recitation, selected Surah memorization, and study of practical Hadiths.",
    targetLevels: "[Primary to Senior Wings / Editable Placeholder]",
    syllabusOverview: [
      "[Noorani Qaida & Makharij rules / Editable]",
      "[Tajweed practical recitation under teachers / Editable]",
      "[Memorization of Amma Juz & Essential Surahs / Editable]",
      "[Selected Prophetic Hadiths on character / Editable]"
    ],
    keyOutcomes: [
      "Accurate articulation and beautiful recitation",
      "Retention of core chapters essential for prayer",
      "Reverence and love for the Book of Allah and Sunnah"
    ],
    isPlaceholder: true,
    statusNotice: "Editable example — To be updated with official curriculum syllabus by the madrassa."
  },
  {
    id: "dept-arabic-language",
    code: "DEPT-ARB",
    name: "Arabic Language",
    arabicName: "اللغة العربية وقواعدها",
    category: "Arabic Language",
    shortSummary: "Foundations of Arabic script, grammar (Nahw & Sarf), and Quranic vocabulary.",
    fullDescription: "Enables students to understand and appreciate Arabic, the language of the Holy Quran, liturgical prayers, and classical Islamic literature through graduated grammar instruction.",
    targetLevels: "[Primary through Secondary Levels / Editable Placeholder]",
    syllabusOverview: [
      "[Arabic script handwriting & reading drills / Editable]",
      "[Core Nahw (Syntax) and Sarf (Morphology) / Editable]",
      "[Quranic vocabulary comprehension / Editable]",
      "[Basic conversational and reading exercises / Editable]"
    ],
    keyOutcomes: [
      "Reading fluency in classical Arabic texts",
      "Direct comprehension of common Quranic vocabulary",
      "Appreciation of the linguistic beauty of Islamic texts"
    ],
    isPlaceholder: true,
    statusNotice: "Editable example — To be updated with official curriculum syllabus by the madrassa."
  },
  {
    id: "dept-general-education",
    code: "DEPT-GEN",
    name: "General Education",
    arabicName: "التربية العامة والآداب",
    category: "General Education",
    shortSummary: "Moral tarbiyyah, civic responsibilities, personal discipline, and student guidance.",
    fullDescription: "Complements religious study with character formation, environmental cleanliness, respectful conduct towards parents and elders, and constructive civic coexistence in Kerala.",
    targetLevels: "[All Enrolled Students / Editable Placeholder]",
    syllabusOverview: [
      "[Respect for parents, teachers, and neighbors / Editable]",
      "[Cleanliness, health, and personal hygiene / Editable]",
      "[Digital etiquette and moral integrity / Editable]",
      "[Community harmony and civic duties / Editable]"
    ],
    keyOutcomes: [
      "Courteous and compassionate social behavior",
      "Respect for diversity and community harmony",
      "Emotional balance anchored in religious mindfulness"
    ],
    isPlaceholder: true,
    statusNotice: "Editable example — To be updated with official curriculum syllabus by the madrassa."
  }
];

export const DEPARTMENTS_EDITORIAL_NOTICE = "The departments and curriculum topics listed above are editable examples for Sharaful Islam Madrassa. Official department syllabi will be published upon approval from the school managing committee.";
