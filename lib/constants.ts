// Type imports for constants
import { Patient, Appointment } from "./store/atoms"

// Patient types and labels
export const PATIENT_LABEL_COLORS: Record<string, string> = {
  Insured: "bg-green-100 text-green-800",
  "Self-pay": "bg-purple-100 text-purple-800",
  Discharged: "bg-red-100 text-red-800",
}

// Mock patients data
export const INITIAL_PATIENTS: Patient[] = [
  {
    id: "1",
    name: "Diana Rossi",
    dob: "03/04/1998",
    age: 27,
    gender: "Female",
    phone: "(415) 555-0123 (Mobile)",
    email: "diana.rossi@email.com",
    labels: ["Insured"],
    address: "845 Market St, San Francisco, CA 94103",
  },
  {
    id: "2",
    name: "Marcus Thompson",
    dob: "21/10/1987",
    age: 38,
    gender: "Male",
    phone: "(415) 555-0198 (Home)",
    email: "marcus.t@email.com",
    labels: ["Self-pay"],
    address: "2200 Mission St, San Francisco, CA 94110",
  },
  {
    id: "3",
    name: "Elena Martinez",
    dob: "20/03/1977",
    age: 48,
    gender: "Female",
    phone: "(415) 555-0234 (Office)",
    email: "elena.martinez@email.com",
    labels: [],
    address: "1500 Van Ness Ave, San Francisco, CA 94109",
  },
  {
    id: "4",
    name: "James Patterson",
    dob: "07/06/1958",
    age: 67,
    gender: "Male",
    phone: "(415) 555-0156 (Mobile)",
    email: "j.patterson@email.com",
    labels: ["Discharged"],
    address: "300 Montgomery St, San Francisco, CA 94104",
  },
  {
    id: "5",
    name: "Yuki Tanaka",
    dob: "02/02/1940",
    age: 85,
    gender: "Female",
    phone: "N/A",
    email: "yuki.t@email.com",
    labels: [],
    address: "1800 Divisadero St, San Francisco, CA 94115",
  },
  {
    id: "6",
    name: "Raj Patel",
    dob: "09/03/1980",
    age: 45,
    gender: "Male",
    phone: "(415) 555-0187 (Mobile)",
    email: "raj.patel@email.com",
    labels: [],
    address: "500 Geary St, San Francisco, CA 94102",
  },
  {
    id: "7",
    name: "Sophie Anderson",
    dob: "15/06/1990",
    age: 35,
    gender: "Female",
    phone: "(415) 555-0145",
    email: "sophie.a@email.com",
    labels: [],
    address: "1200 Polk St, San Francisco, CA 94109",
  },
  {
    id: "8",
    name: "Omar Hassan",
    dob: "12/08/1985",
    age: 40,
    gender: "Male",
    phone: "(415) 555-0192",
    email: "omar.hassan@email.com",
    labels: [],
    address: "2700 California St, San Francisco, CA 94115",
  },
]

// Initial appointments data
export const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: "1",
    patient: "Marcus Thompson",
    patientId: "2",
    time: "16:00",
    duration: 45,
    date: "2025-11-20",
    clinician: "M. Johnson",
    type: "Initial consultation",
    location: "Heidi SF - Room 1",
  },
]

// Appointment types
export const APPOINTMENT_TYPES = [
  "Initial consultation",
  "Follow-up",
  "Check-up",
  "Treatment",
  "Procedure",
  "Emergency",
]

// Duration options (in minutes)
export const DURATION_OPTIONS = [15, 30, 45, 60, 90, 120]

// Time slots for schedule grid (30-minute intervals)
export const TIME_SLOTS = [
  "07:00",
  "07:30",
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
  "21:30",
]

// Time slot height in pixels (for calculating appointment spans)
export const TIME_SLOT_HEIGHT = 48

// Default location
export const DEFAULT_LOCATION = "Heidi SF - Room 1"
