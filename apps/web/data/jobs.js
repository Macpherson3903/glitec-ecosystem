export const jobs = [
  {
    id: "auto-mechanics-technician",
    title: "Auto Mechanics Technician",
    summary:
      "Diagnose, maintain, and repair vehicles in our training workshops and service operations.",
    description:
      "We are seeking a skilled Auto Mechanics Technician to support hands-on instruction, workshop maintenance, and quality vehicle service. You will work alongside students and senior technicians to ensure safe, industry-standard practices across diagnostics, engine performance, brakes, and electrical systems.",
    responsibilities: [
      "Perform diagnostics and repairs on training and customer vehicles",
      "Maintain workshop tools, lifts, and safety standards",
      "Support instructors during practical sessions and demonstrations",
      "Document work orders, parts used, and vehicle condition clearly",
      "Keep up to date with modern vehicle systems and manufacturer guidance",
    ],
    requirements: [
      "Proven experience in automotive repair or a related vocational qualification",
      "Strong diagnostic mindset and attention to detail",
      "Ability to communicate clearly with students and team members",
      "Commitment to workplace safety and professional conduct",
    ],
    employmentType: "Full-time",
    location: "Port Harcourt, Rivers State, Nigeria",
    department: "AutoCare / Technical",
  },
  {
    id: "accountant",
    title: "Accountant",
    summary:
      "Manage financial records, reporting, and compliance for our school and related operations.",
    description:
      "The Accountant will oversee day-to-day bookkeeping, payroll support, budgeting, and statutory reporting. You will partner with leadership to provide accurate financial insight and maintain strong internal controls.",
    responsibilities: [
      "Maintain general ledger, accounts payable, and receivable",
      "Prepare monthly management accounts and cash-flow summaries",
      "Support audits and ensure compliance with local tax regulations",
      "Reconcile bank statements and resolve discrepancies promptly",
      "Advise on cost control and financial planning",
    ],
    requirements: [
      "Degree or professional qualification in accounting (e.g. ICAN / ACCA progress or equivalent)",
      "Experience with accounting software and spreadsheets",
      "High integrity and confidentiality",
      "Strong analytical and organizational skills",
    ],
    employmentType: "Full-time",
    location: "Port Harcourt, Rivers State, Nigeria",
    department: "Finance",
  },
  {
    id: "sales-representative",
    title: "Sales Representative",
    summary:
      "Grow enrollments and partnerships by promoting Glitec programs to individuals and organizations.",
    description:
      "As a Sales Representative, you will be the face of our programs to prospective students, parents, and corporate clients. You will follow up on leads, conduct campus tours or virtual sessions, and meet enrollment targets while upholding our values.",
    responsibilities: [
      "Respond to inquiries via phone, email, and in-person visits",
      "Present course and scholarship options clearly and accurately",
      "Maintain CRM or lead records and weekly pipeline reports",
      "Collaborate with marketing on campaigns and open-day events",
      "Meet or exceed agreed sales and conversion goals",
    ],
    requirements: [
      "Prior sales or customer-facing experience, ideally in education or training",
      "Excellent communication and listening skills",
      "Self-motivated with a track record of hitting targets",
      "Comfortable using digital tools for follow-up and reporting",
    ],
    employmentType: "Full-time",
    location: "Port Harcourt, Rivers State, Nigeria",
    department: "Admissions / Sales",
  },
  {
    id: "solar-pv-installer",
    title: "Solar PV Installer",
    summary:
      "Install and commission solar PV systems for training demos and select client projects.",
    description:
      "Join our renewable energy track to deliver safe, code-compliant solar installations. You will support curriculum delivery through real-world projects and mentor learners during practical modules.",
    responsibilities: [
      "Install panels, inverters, and balance-of-system components",
      "Conduct site assessments and basic energy yield estimates",
      "Ensure grounding, labeling, and handover documentation",
      "Train students on best practices and safety at height",
      "Coordinate with suppliers and project timelines",
    ],
    requirements: [
      "Hands-on solar or electrical installation experience",
      "Understanding of DC/AC safety and local electrical norms",
      "Physical fitness for roof and ladder work where applicable",
      "Willingness to obtain or maintain relevant certifications",
    ],
    employmentType: "Full-time",
    location: "Port Harcourt, Rivers State, Nigeria",
    department: "Renewable Energy",
  },
  {
    id: "business-manager",
    title: "Business Manager",
    summary:
      "Lead operational planning, partnerships, and performance across school business units.",
    description:
      "The Business Manager will align academic delivery, marketing, and operations with strategic goals. You will drive process improvements, stakeholder relationships, and reporting to the leadership team.",
    responsibilities: [
      "Develop and monitor annual operating plans and KPIs",
      "Coordinate cross-functional projects (academics, finance, facilities)",
      "Identify partnership opportunities with industry and government",
      "Oversee vendor contracts and service-level expectations",
      "Support recruitment and onboarding for key roles",
    ],
    requirements: [
      "Bachelor’s degree in business, management, or related field",
      "Several years of management experience in education or services preferred",
      "Strategic thinking with strong execution discipline",
      "Excellent written and verbal communication",
    ],
    employmentType: "Full-time",
    location: "Port Harcourt, Rivers State, Nigeria",
    department: "Operations / Strategy",
  },
  {
    id: "office-administrator-sales",
    title: "Office Administrator/Sales",
    summary:
      "Keep the front office running smoothly while supporting admissions and light sales duties.",
    description:
      "This blended role combines reception, scheduling, document handling, and assisting prospective students with program information. Ideal for someone who enjoys organization and customer interaction.",
    responsibilities: [
      "Greet visitors and manage phone and email inquiries",
      "Schedule appointments, tours, and follow-ups",
      "Maintain filing systems and student-facing forms",
      "Support enrollment paperwork and payment tracking",
      "Assist the sales team with lead follow-up and data entry",
    ],
    requirements: [
      "Diploma or degree in administration, business, or related area",
      "Proficiency in Microsoft Office or Google Workspace",
      "Friendly demeanor and strong multitasking ability",
      "Prior front-desk or sales support experience is a plus",
    ],
    employmentType: "Full-time",
    location: "Port Harcourt, Rivers State, Nigeria",
    department: "Administration",
  },
];

export function getJobById(id) {
  return jobs.find((j) => j.id === id) ?? null;
}

export function searchJobs(query) {
  const q = query.trim().toLowerCase();
  if (!q) return jobs;
  return jobs.filter((j) => {
    const hay = [
      j.title,
      j.summary,
      j.description,
      ...(j.requirements || []),
      ...(j.responsibilities || []),
      j.department,
    ]
      .join(" ")
      .toLowerCase();
    return hay.includes(q);
  });
}
