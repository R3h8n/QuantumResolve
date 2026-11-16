export const initialComplaints = [
  {
    id: "CMP-2026-001",
    title: "Projector flickering in Room 302",
    category: "Classroom",
    location: "Block B, Room 302",
    description: "The ceiling projector turns off every 10 minutes during BTech CSE lectures. It requires bulb or power unit inspection.",
    priority: "High",
    status: "In Progress",
    studentName: "Rahul Sharma",
    studentRoll: "21CSE045",
    department: "Electrical & Maintenance",
    date: "2026-10-10",
    estimatedResolution: "2026-10-14",
    assignedStaff: "Mr. Ramesh Kumar (Tech Staff)",
    adminRemarks: "Assigned to electrical maintenance team on priority.",
    staffRemarks: "Replacement bulb requested from store.",
    timeline: [
      { status: "Submitted", date: "2026-10-10 09:30 AM", note: "Complaint logged by student." },
      { status: "Pending", date: "2026-10-10 10:00 AM", note: "Acknowledged by Admin." },
      { status: "In Progress", date: "2026-10-11 02:15 PM", note: "Assigned to Electrical Department." }
    ]
  },
  {
    id: "CMP-2026-002",
    title: "Hostel Wi-Fi low bandwidth on 3rd Floor",
    category: "Internet/Wi-Fi",
    location: "Hostel Block A, 3rd Floor",
    description: "Wi-Fi speeds drop below 1 Mbps after 8 PM making it impossible to access college portals or assignment submissions.",
    priority: "Medium",
    status: "Pending",
    studentName: "Ananya Gupta",
    studentRoll: "22CSE102",
    department: "IT Services",
    date: "2026-10-12",
    estimatedResolution: "Pending Assignment",
    adminRemarks: "Under initial evaluation.",
    staffRemarks: "",
    timeline: [
      { status: "Submitted", date: "2026-10-12 08:10 PM", note: "Complaint logged by student." },
      { status: "Pending", date: "2026-10-13 09:00 AM", note: "Awaiting department assignment." }
    ]
  },
  {
    id: "CMP-2026-003",
    title: "Water cooler leaking near Library",
    category: "Water",
    location: "Central Library, Ground Floor",
    description: "Continuous water leakage causing floor slippery hazard near the main entrance of Central Library.",
    priority: "High",
    status: "Resolved",
    studentName: "Vikram Singh",
    studentRoll: "20CSE012",
    department: "Plumbing & Cleanliness",
    date: "2026-10-05",
    estimatedResolution: "2026-10-06",
    assignedStaff: "Suresh (Plumber)",
    adminRemarks: "High priority safety issue.",
    staffRemarks: "Pipe replacement completed. Leakage fixed.",
    timeline: [
      { status: "Submitted", date: "2026-10-05 11:00 AM", note: "Complaint logged by student." },
      { status: "In Progress", date: "2026-10-05 01:00 PM", note: "Plumber dispatched." },
      { status: "Resolved", date: "2026-10-06 10:30 AM", note: "Issue verified and resolved." }
    ]
  },
  {
    id: "CMP-2026-004",
    title: "Damaged whiteboards in Lab 4",
    category: "Classroom",
    location: "CS Department, Lab 4",
    description: "Whiteboard surface is scratched and permanent markers were mistakenly used.",
    priority: "Low",
    status: "Rejected",
    studentName: "Siddharth Verma",
    studentRoll: "21CSE088",
    department: "General Maintenance",
    date: "2026-10-01",
    estimatedResolution: "N/A",
    assignedStaff: "N/A",
    adminRemarks: "Cleaning solution applied by lab assistant. Replacement not required.",
    staffRemarks: "",
    timeline: [
      { status: "Submitted", date: "2026-10-01 03:00 PM", note: "Complaint logged." },
      { status: "Rejected", date: "2026-10-02 11:00 AM", note: "Rejected after physical inspection." }
    ]
  }
];

export const mockCategories = [
  "Electrical",
  "Internet/Wi-Fi",
  "Classroom",
  "Hostel",
  "Library",
  "Cleanliness",
  "Water",
  "Transport",
  "Other"
];

export const mockUsers = {
  student: {
    id: "STU-001",
    name: "Rahul Sharma",
    email: "rahul.21cse@college.edu",
    role: "student",
    rollNumber: "21CSE045",
    department: "Computer Science & Engineering",
    phone: "+91 98765 43210",
    room: "Hostel A - 302"
  },
  admin: {
    id: "ADM-001",
    name: "Dr. Arvind Swamy",
    email: "admin.chief@college.edu",
    role: "admin",
    designation: "Chief Maintenance Officer",
    department: "Central Administration",
    phone: "+91 98111 22233"
  },
  department: {
    id: "DEP-001",
    name: "Electrical & Maintenance Dept",
    email: "electrical.dept@college.edu",
    role: "department",
    deptName: "Electrical & Maintenance",
    head: "Er. K. L. Nivas",
    phone: "+91 94444 55555"
  }
};