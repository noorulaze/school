export interface TeacherPlaceholder {
  id: string;
  slotNumber: number;
  profileStatus: string;
  departmentNotice: string;
  isPlaceholder: boolean;
}

export const TEACHERS: TeacherPlaceholder[] = [
  {
    id: "teacher-slot-1",
    slotNumber: 1,
    profileStatus: "Teacher profile will be added",
    departmentNotice: "Official teacher name, designation, and subjects taught will be published by the school administration.",
    isPlaceholder: true,
  },
  {
    id: "teacher-slot-2",
    slotNumber: 2,
    profileStatus: "Teacher profile will be added",
    departmentNotice: "Official teacher name, designation, and subjects taught will be published by the school administration.",
    isPlaceholder: true,
  },
  {
    id: "teacher-slot-3",
    slotNumber: 3,
    profileStatus: "Teacher profile will be added",
    departmentNotice: "Official teacher name, designation, and subjects taught will be published by the school administration.",
    isPlaceholder: true,
  },
  {
    id: "teacher-slot-4",
    slotNumber: 4,
    profileStatus: "Teacher profile will be added",
    departmentNotice: "Official teacher name, designation, and subjects taught will be published by the school administration.",
    isPlaceholder: true,
  },
  {
    id: "teacher-slot-5",
    slotNumber: 5,
    profileStatus: "Teacher profile will be added",
    departmentNotice: "Official teacher name, designation, and subjects taught will be published by the school administration.",
    isPlaceholder: true,
  },
  {
    id: "teacher-slot-6",
    slotNumber: 6,
    profileStatus: "Teacher profile will be added",
    departmentNotice: "Official teacher name, designation, and subjects taught will be published by the school administration.",
    isPlaceholder: true,
  }
];

export const FACULTY_EDITORIAL_NOTICE = "Teacher names, qualifications, and specific assignments are not displayed here to maintain official accuracy. Teacher profiles will be added once approved and provided by the Sharafiyya English Medium School managing committee.";
