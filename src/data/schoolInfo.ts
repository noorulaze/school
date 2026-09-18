export interface SchoolInfo {
  officialName: string;
  localName: string;
  arabicCalligraphySubtitle?: string;
  location: {
    area: string;
    city: string;
    district: string;
    state: string;
    country: string;
    fullAddress: string;
    landmarkPlaceholder: string;
  };
  contact: {
    phone: string;
    phoneAlternative: string;
    email: string;
    officeHours: string;
    isPlaceholder: boolean;
  };
  institutionalDetails: {
    affiliationBoard: string;
    registrationNumber: string;
    establishedYear: string;
    motto: string;
    isPlaceholder: boolean;
  };
  mission: string;
  vision: string;
}

export const SCHOOL_INFO: SchoolInfo = {
  officialName: "Sharaful Islam Madrassa",
  localName: "Sharafiyya Korangath",
  arabicCalligraphySubtitle: "مَدْرَسَةُ شَرَفِ الإِسْلَامِ - كُورَنغَاثْ",
  location: {
    area: "Korangath",
    city: "Tirur",
    district: "Malappuram",
    state: "Kerala",
    country: "India",
    fullAddress: "Sharaful Islam Madrassa (Sharafiyya Korangath), Korangath, Tirur, Malappuram District, Kerala - [Pincode Placeholder: 676101], India",
    landmarkPlaceholder: "Near Korangath Juma Masjid / Landmark [Editable Placeholder]",
  },
  contact: {
    phone: "[Phone: +91 00000 00000 / Editable Placeholder]",
    phoneAlternative: "[Alternative Contact: +91 00000 00000 / Editable]",
    email: "[Email: info@sharafiyyakorangath.edu / Editable Placeholder]",
    officeHours: "Monday to Saturday: [Office Hours Placeholder, e.g. 7:30 AM – 5:30 PM]",
    isPlaceholder: true,
  },
  institutionalDetails: {
    affiliationBoard: "[Islamic Educational Board / Samastha Affiliation Placeholder]",
    registrationNumber: "[Official Registration / Affiliation ID: Pending Update]",
    establishedYear: "[Year of Establishment / Editable Placeholder]",
    motto: "Illuminating Hearts with Faith, Character, and Knowledge",
    isPlaceholder: true,
  },
  mission:
    "To impart authentic Islamic education grounded in moral excellence, compassion, spiritual enrichment, and disciplined character building, nurturing a devoted generation rooted in noble values and civic responsibility.",
  vision:
    "To stand as a beacon of enlightened Islamic learning in the Malappuram region, integrating timeless spiritual teachings with comprehensive student mentorship and a student-centric environment.",
};
