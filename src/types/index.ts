// Types for the AcademicHub Careers platform

export interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: "full-time" | "part-time" | "contract" | "internship";
  salary?: string;
  description: string;
  whoWeAre: string;
  whatWeLookFor: string;
  qualifications: string[];
  responsibilities: string[];
  createdAt: string;
  status: "active" | "closed" | "draft";
}

export interface Experience {
  id: string;
  company: string;
  title: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  current: boolean;
}

export interface Application {
  id: string;
  jobId: string;
  jobTitle: string;
  name: string;
  email: string;
  resumeUrl: string;
  resumeName: string;
  coverLetterUrl: string;
  coverLetterName: string;
  experiences: Experience[];
  education: Education[];
  status: "pending" | "reviewing" | "interviewed" | "accepted" | "rejected";
  submittedAt: string;
}

export interface JobFilters {
  search?: string;
  department?: string;
  location?: string;
  type?: string;
}
