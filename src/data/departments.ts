export interface DepartmentItem {
  id: string;
  code: string;
  name: string;
  arabicName?: string;
  category: "Foundational" | "Theological" | "Language" | "Character & Ethics";
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
    id: "quranic-studies-tajweed",
    code: "DEPT-QRN",
    name: "[Sample: Department of Quranic Studies & Tajweed]",
    arabicName: "قسم القرآن الكريم والتجويد",
    category: "Foundational",
    shortSummary: "Foundational recitation with precise Makharij, Hifz guidance, and understanding of essential verses.",
    fullDescription: "Dedicated to systematic Quranic literacy from introductory phonetics (Noorani Qaida principles) through complete recitation with classical Tajweed rules, memorization of selected Surahs, and spiritual contemplation.",
    targetLevels: "[Classes 1 through 10 / Editable Placeholder]",
    syllabusOverview: [
      "[Makharij & Sifaat principles / Editable Syllabus]",
      "[Hifz of Amma Juz & Selected Surahs / Editable]",
      "[Practical Recitation under Qualified Muallims / Editable]",
      "[Memorization of Daily Azkar and Duas / Editable]"
    ],
    keyOutcomes: [
      "Precise Arabic phonetics and flawless recitation cadence",
      "Retention of core chapters essential for daily prayers",
      "Deep reverence and affection for the Holy Quran"
    ],
    isPlaceholder: true,
    statusNotice: "Editable placeholder — Replace with official department syllabus and details."
  },
  {
    id: "aqeedah-jurisprudence",
    code: "DEPT-FIQH",
    name: "[Sample: Department of Islamic Jurisprudence & Aqeedah]",
    arabicName: "قسم العقيدة والفقه الإسلامي",
    category: "Theological",
    shortSummary: "Essential theological foundations (Aqeedah) and practical rulings (Fiqh) for daily worship and life.",
    fullDescription: "Structured instruction in sound Islamic monotheistic creed (Aqeedah of Ahl al-Sunnah wal-Jama'ah) and ritual purity, Salah, Fasting, Zakah, and societal interactions in accordance with authentic jurisprudence.",
    targetLevels: "[Junior to Senior Madrasa Wings / Editable Placeholder]",
    syllabusOverview: [
      "[Fundamentals of Iman and Articles of Faith / Editable]",
      "[Taharah (Purification) and Salah Practicals / Editable]",
      "[Fasting (Sawm) & Zakah Rulings / Editable]",
      "[Permissible (Halal) and Prohibited (Haram) in Daily Life / Editable]"
    ],
    keyOutcomes: [
      "Solid, unwavering understanding of Islamic creed",
      "Practical mastery of personal prayer and ritual duties",
      "Clarity on ethical everyday boundaries"
    ],
    isPlaceholder: true,
    statusNotice: "Editable placeholder — Replace with official department syllabus and details."
  },
  {
    id: "arabic-language",
    code: "DEPT-ARB",
    name: "[Sample: Department of Arabic Language & Grammar]",
    arabicName: "قسم اللغة العربية وقواعدها",
    category: "Language",
    shortSummary: "Development of Arabic vocabulary, functional grammar (Nahw & Sarf), and reading comprehension.",
    fullDescription: "Equips students with the linguistic keys to unlock classical Islamic texts, liturgical prayers, and authentic prophetic literature through graduated grammar instruction and conversational vocabulary.",
    targetLevels: "[Primary through Secondary Levels / Editable Placeholder]",
    syllabusOverview: [
      "[Arabic Alphabet, Script & Handwriting Drills / Editable]",
      "[Fundamental Nahw (Syntax) and Sarf (Morphology) / Editable]",
      "[Quranic Vocabulary & Comprehension / Editable]",
      "[Oral Recitation & Expression / Editable]"
    ],
    keyOutcomes: [
      "Comprehension of Quranic Arabic vocabulary",
      "Capacity to read and interpret classical curriculum texts",
      "Enhanced linguistic appreciation of religious discourse"
    ],
    isPlaceholder: true,
    statusNotice: "Editable placeholder — Replace with official department syllabus and details."
  },
  {
    id: "hadith-seerah",
    code: "DEPT-SRH",
    name: "[Sample: Department of Hadith & Prophetic Biography (Seerah)]",
    arabicName: "قسم الحديث والسيرة النبوية",
    category: "Theological",
    shortSummary: "Study of the blessed life of Prophet Muhammad (PBUH) and selected authentic Prophetic traditions.",
    fullDescription: "Nurtures deep love for the Messenger of Allah (PBUH) through studying key milestones of the Seerah, Islamic history, and selected collections of Hadith focusing on manners, honesty, and compassion.",
    targetLevels: "[Intermediate & Senior Grades / Editable Placeholder]",
    syllabusOverview: [
      "[Meccan & Medinan Eras of the Seerah / Editable]",
      "[Selected Hadith on Good Character & Honesty / Editable]",
      "[Lives of the Sahabah (Companions) / Editable]",
      "[Practical Application of the Sunnah in Contemporary Life / Editable]"
    ],
    keyOutcomes: [
      "Emulation of Prophetic morality and etiquette",
      "Broad historical awareness of early Islamic civilization",
      "Moral resilience and truthfulness in community life"
    ],
    isPlaceholder: true,
    statusNotice: "Editable placeholder — Replace with official department syllabus and details."
  },
  {
    id: "akhlaq-tarbiyyah",
    code: "DEPT-TRB",
    name: "[Sample: Department of Moral Ethics (Akhlaq) & Tarbiyyah]",
    arabicName: "قسم الأخلاق والتربية الإسلامية",
    category: "Character & Ethics",
    shortSummary: "Practical character refinement, civic values, respect for elders, and community harmony.",
    fullDescription: "A core pillar of the madrassa focusing on student personality cultivation, filial piety, neighborly kindness, emotional discipline, and holistic Islamic manners (Adaab) tailored for everyday life in Kerala's diverse society.",
    targetLevels: "[All Enrolled Students / All Grades]",
    syllabusOverview: [
      "[Respect to Parents, Teachers, and Elders / Editable]",
      "[Honesty, Humility, and Digital/Social Etiquette / Editable]",
      "[Cleanliness, Health, and Environmental Stewardship in Islam / Editable]",
      "[Community Harmony & Peaceful Coexistence / Editable]"
    ],
    keyOutcomes: [
      "Exemplary personal conduct and respectfulness",
      "Responsible community membership and helpfulness",
      "Emotional balance anchored in spiritual mindfulness"
    ],
    isPlaceholder: true,
    statusNotice: "Editable placeholder — Replace with official department syllabus and details."
  },
  {
    id: "primary-foundations",
    code: "DEPT-PRI",
    name: "[Sample: Primary Madrasa Foundation Wing]",
    arabicName: "قسم المرحلة الابتدائية والتمهيدي",
    category: "Foundational",
    shortSummary: "Gentle, engaging early-childhood Islamic orientation for young learners starting their spiritual journey.",
    fullDescription: "Created to give young children a warm, encouraging first experience with the madrassa, emphasizing phonetic alphabet games, basic prayers, joyful recitation, and memorable moral stories.",
    targetLevels: "[Nursery / Lower Primary Classes / Editable Placeholder]",
    syllabusOverview: [
      "[Alphabet recognition and interactive sound drills / Editable]",
      "[Basic short Surahs and daily eating/sleeping duas / Editable]",
      "[Illustrated moral stories of the Prophets / Editable]",
      "[Child-friendly behavioral etiquette / Editable]"
    ],
    keyOutcomes: [
      "Joyful eagerness to attend and participate in madrassa",
      "Early mastery of core daily remembrances",
      "Strong foundation for higher religious classes"
    ],
    isPlaceholder: true,
    statusNotice: "Editable placeholder — Replace with official department syllabus and details."
  }
];
