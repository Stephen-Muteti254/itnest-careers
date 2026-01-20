import { Job, Application } from "@/types";

// Mock data for jobs
export const mockJobs: Job[] = [
  {
    id: "1",
    title: "Senior Academic Writer",
    department: "Content",
    location: "Remote",
    type: "full-time",
    salary: "$60,000 - $80,000",
    description: "We're looking for an experienced academic writer to join our growing team. You'll work on diverse research projects across multiple disciplines.",
    whoWeAre: "AcademicHub is a leading platform dedicated to advancing academic excellence. We connect scholars, researchers, and students with the resources they need to succeed. Our mission is to democratize access to quality academic support while maintaining the highest standards of integrity and professionalism.",
    whatWeLookFor: "We seek individuals who are passionate about academia and have a genuine desire to help others succeed. The ideal candidate is detail-oriented, intellectually curious, and thrives in a collaborative environment. We value creativity, critical thinking, and the ability to communicate complex ideas clearly.",
    qualifications: [
      "Master's degree or higher in a relevant field",
      "5+ years of academic writing experience",
      "Excellent command of English grammar and style",
      "Familiarity with various citation formats (APA, MLA, Chicago)",
      "Strong research and analytical skills"
    ],
    responsibilities: [
      "Produce high-quality academic content across various subjects",
      "Conduct thorough research using scholarly sources",
      "Meet deadlines while maintaining quality standards",
      "Collaborate with editors and quality assurance teams",
      "Stay updated on academic writing best practices"
    ],
    createdAt: "2024-01-15",
    status: "active"
  },
  {
    id: "2",
    title: "Quality Assurance Editor",
    department: "Quality",
    location: "Hybrid - New York",
    type: "full-time",
    salary: "$55,000 - $70,000",
    description: "Join our QA team to ensure all content meets our rigorous academic standards. You'll review, edit, and provide feedback on academic documents.",
    whoWeAre: "AcademicHub is a leading platform dedicated to advancing academic excellence. We connect scholars, researchers, and students with the resources they need to succeed. Our mission is to democratize access to quality academic support while maintaining the highest standards of integrity and professionalism.",
    whatWeLookFor: "We're looking for meticulous individuals with a keen eye for detail and a passion for excellence. You should be comfortable giving constructive feedback and have strong knowledge of academic conventions.",
    qualifications: [
      "Bachelor's degree required, Master's preferred",
      "3+ years of editing experience",
      "Expert knowledge of academic writing standards",
      "Proficiency in editing tools and software",
      "Strong communication skills"
    ],
    responsibilities: [
      "Review academic documents for quality and accuracy",
      "Provide constructive feedback to writers",
      "Ensure adherence to citation and formatting guidelines",
      "Develop and maintain quality standards documentation",
      "Train new team members on QA processes"
    ],
    createdAt: "2024-01-10",
    status: "active"
  },
  {
    id: "3",
    title: "Customer Success Specialist",
    department: "Support",
    location: "Remote",
    type: "full-time",
    salary: "$45,000 - $55,000",
    description: "Help our clients navigate their academic journey by providing exceptional support and guidance.",
    whoWeAre: "AcademicHub is a leading platform dedicated to advancing academic excellence. We connect scholars, researchers, and students with the resources they need to succeed. Our mission is to democratize access to quality academic support while maintaining the highest standards of integrity and professionalism.",
    whatWeLookFor: "We want empathetic communicators who genuinely care about helping others succeed. You should be patient, solution-oriented, and able to explain complex processes in simple terms.",
    qualifications: [
      "Bachelor's degree in any field",
      "2+ years of customer service experience",
      "Excellent written and verbal communication",
      "Experience with CRM systems",
      "Problem-solving aptitude"
    ],
    responsibilities: [
      "Respond to customer inquiries via email and chat",
      "Guide clients through our platform and services",
      "Resolve issues and escalate when necessary",
      "Collect and report customer feedback",
      "Contribute to knowledge base articles"
    ],
    createdAt: "2024-01-08",
    status: "active"
  },
  {
    id: "4",
    title: "Frontend Developer",
    department: "Engineering",
    location: "Remote",
    type: "full-time",
    salary: "$80,000 - $110,000",
    description: "Build beautiful, responsive web applications that power our academic platform.",
    whoWeAre: "AcademicHub is a leading platform dedicated to advancing academic excellence. We connect scholars, researchers, and students with the resources they need to succeed. Our mission is to democratize access to quality academic support while maintaining the highest standards of integrity and professionalism.",
    whatWeLookFor: "We seek developers who are passionate about creating exceptional user experiences. You should be comfortable working in an agile environment and have a strong foundation in modern web technologies.",
    qualifications: [
      "3+ years of React/TypeScript experience",
      "Strong understanding of CSS and responsive design",
      "Experience with state management libraries",
      "Familiarity with RESTful APIs",
      "Git proficiency"
    ],
    responsibilities: [
      "Develop new features using React and TypeScript",
      "Collaborate with designers to implement UI/UX",
      "Write clean, maintainable, and tested code",
      "Participate in code reviews",
      "Optimize applications for performance"
    ],
    createdAt: "2024-01-05",
    status: "active"
  },
  {
    id: "5",
    title: "Research Intern",
    department: "Research",
    location: "Remote",
    type: "internship",
    salary: "$20/hour",
    description: "Gain valuable experience in academic research while contributing to meaningful projects.",
    whoWeAre: "AcademicHub is a leading platform dedicated to advancing academic excellence. We connect scholars, researchers, and students with the resources they need to succeed. Our mission is to democratize access to quality academic support while maintaining the highest standards of integrity and professionalism.",
    whatWeLookFor: "We're looking for motivated students or recent graduates eager to learn and grow. You should be curious, organized, and ready to dive into diverse research topics.",
    qualifications: [
      "Currently enrolled or recent graduate",
      "Strong academic record",
      "Excellent research skills",
      "Attention to detail",
      "Self-motivated learner"
    ],
    responsibilities: [
      "Assist senior researchers with projects",
      "Conduct literature reviews",
      "Compile and organize research data",
      "Prepare summaries and reports",
      "Participate in team meetings"
    ],
    createdAt: "2024-01-01",
    status: "active"
  }
];

// Mock data for applications
export const mockApplications: Application[] = [
  {
    id: "app-1",
    jobId: "1",
    jobTitle: "Senior Academic Writer",
    name: "Jane Smith",
    email: "jane.smith@email.com",
    resumeUrl: "#",
    resumeName: "jane_smith_resume.pdf",
    coverLetterUrl: "#",
    coverLetterName: "jane_smith_cover.pdf",
    experiences: [
      {
        id: "exp-1",
        company: "Academic Press",
        title: "Academic Writer",
        startDate: "2019-06",
        endDate: "2024-01",
        current: false,
        description: "Wrote research papers and articles for various academic publications."
      }
    ],
    education: [
      {
        id: "edu-1",
        institution: "Harvard University",
        degree: "Master's",
        field: "English Literature",
        startDate: "2017-09",
        endDate: "2019-05",
        current: false
      }
    ],
    status: "pending",
    submittedAt: "2024-01-18"
  },
  {
    id: "app-2",
    jobId: "4",
    jobTitle: "Frontend Developer",
    name: "John Doe",
    email: "john.doe@email.com",
    resumeUrl: "#",
    resumeName: "john_doe_resume.pdf",
    coverLetterUrl: "#",
    coverLetterName: "john_doe_cover.pdf",
    experiences: [
      {
        id: "exp-2",
        company: "Tech Startup",
        title: "React Developer",
        startDate: "2021-01",
        endDate: "",
        current: true,
        description: "Building web applications using React and TypeScript."
      }
    ],
    education: [
      {
        id: "edu-2",
        institution: "MIT",
        degree: "Bachelor's",
        field: "Computer Science",
        startDate: "2016-09",
        endDate: "2020-05",
        current: false
      }
    ],
    status: "reviewing",
    submittedAt: "2024-01-17"
  }
];

// Helper function to get unique values for filters
export const getUniqueValues = <T extends keyof Job>(jobs: Job[], key: T): string[] => {
  return [...new Set(jobs.map(job => String(job[key])))];
};
