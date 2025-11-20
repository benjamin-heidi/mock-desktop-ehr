import { atom } from 'jotai'

// Active section atom - tracks which sidebar section is active
export const activeSectionAtom = atom<string>("summary")

// Patient interface
export interface Patient {
  id: string
  name: string
  dob: string
  age: number
  gender: string
  phone: string
  email: string
  labels: string[]
  address: string
}

// Appointment interface
export interface Appointment {
  id: string
  patient: string
  patientId: string
  time: string
  duration: number // in minutes
  date: string
  clinician: string
  type: string
  location: string
}

// User/Clinician interface
export interface User {
  id: string
  name: string
  fullName: string
  email: string
  role: string
  specialty?: string
  active: boolean
}

// Users/Clinicians atom
export const usersAtom = atom<User[]>([
  { id: "u1", name: "General", fullName: "General Appointments", email: "general@careflow.com", role: "System", active: true },
  { id: "u2", name: "I. Martinez", fullName: "Dr. Isabella Martinez", email: "i.martinez@careflow.com", role: "Physician", specialty: "Internal Medicine", active: true },
  { id: "u3", name: "B. Chen", fullName: "Dr. Benjamin Chen", email: "b.chen@careflow.com", role: "Physician", specialty: "Cardiology", active: true },
  { id: "u4", name: "T. Support", fullName: "Technical Support", email: "support@careflow.com", role: "Admin", active: true },
  { id: "u5", name: "M. Johnson", fullName: "Dr. Maya Johnson", email: "m.johnson@careflow.com", role: "Physician", specialty: "Family Medicine", active: true },
  { id: "u6", name: "R. Patel", fullName: "Dr. Ravi Patel", email: "r.patel@careflow.com", role: "Physician", specialty: "Pediatrics", active: true },
  { id: "u7", name: "J. Williams", fullName: "Dr. Jessica Williams", email: "j.williams@careflow.com", role: "Physician", specialty: "Dermatology", active: true },
  { id: "u8", name: "A. Kim", fullName: "Dr. Andrew Kim", email: "a.kim@careflow.com", role: "Physician", specialty: "Orthopedics", active: true },
  { id: "u9", name: "H. Garcia", fullName: "Dr. Henry Garcia", email: "h.garcia@careflow.com", role: "Physician", specialty: "Neurology", active: true },
  { id: "u10", name: "S. Thompson", fullName: "Dr. Sarah Thompson", email: "s.thompson@careflow.com", role: "Physician", specialty: "Psychiatry", active: true },
  { id: "u11", name: "L. Rodriguez", fullName: "Laura Rodriguez", email: "l.rodriguez@careflow.com", role: "Nurse Practitioner", active: true },
  { id: "u12", name: "P. Anderson", fullName: "Dr. Peter Anderson", email: "p.anderson@careflow.com", role: "Physician", specialty: "ENT", active: true },
  { id: "u13", name: "N. Davis", fullName: "Dr. Nina Davis", email: "n.davis@careflow.com", role: "Physician", specialty: "Obstetrics", active: true },
  { id: "u14", name: "K. Wilson", fullName: "Dr. Kevin Wilson", email: "k.wilson@careflow.com", role: "Physician", specialty: "Surgery", active: true },
  { id: "u15", name: "E. Miller", fullName: "Dr. Emma Miller", email: "e.miller@careflow.com", role: "Physician", specialty: "Radiology", active: true },
  { id: "u16", name: "T. Moore", fullName: "Dr. Thomas Moore", email: "t.moore@careflow.com", role: "Physician", specialty: "Anesthesiology", active: true },
  { id: "u17", name: "O. Taylor", fullName: "Dr. Olivia Taylor", email: "o.taylor@careflow.com", role: "Physician", specialty: "Oncology", active: true },
  { id: "u18", name: "D. Lee", fullName: "Dr. Daniel Lee", email: "d.lee@careflow.com", role: "Physician", specialty: "Gastroenterology", active: true },
])

// Clinic settings atoms
export const clinicSettingsAtom = atom({
  clinicName: "Heidi SF",
  rooms: [
    { id: "room1", name: "Room 1", capacity: 4, equipment: ["Examination bed", "ECG machine", "Blood pressure monitor"] },
    { id: "room2", name: "Room 2", capacity: 2, equipment: ["Examination bed", "Ultrasound"] },
  ],
  workingHours: {
    monday: { open: "08:00", close: "18:00", enabled: true },
    tuesday: { open: "08:00", close: "18:00", enabled: true },
    wednesday: { open: "08:00", close: "18:00", enabled: true },
    thursday: { open: "08:00", close: "18:00", enabled: true },
    friday: { open: "08:00", close: "18:00", enabled: true },
    saturday: { open: "09:00", close: "13:00", enabled: false },
    sunday: { open: "09:00", close: "13:00", enabled: false },
  },
  appointmentSlotDuration: 30,
  bufferTime: 5,
})

// Consultation interface
export interface Consultation {
  id: string
  title: string
  notes: string
  timestamp: string // ISO date string
}

// Medication interface
export interface Medication {
  id: string
  name: string
  dosage: string
  duration: string
  notes: string
}

// Patient consultations atom - maps patientId to consultations
export const patientConsultationsAtom = atom<Record<string, Consultation[]>>({})

// Patient medications atom - maps patientId to medications
export const patientMedicationsAtom = atom<Record<string, Medication[]>>({})

// Patients atom - global state for all patients
export const patientsAtom = atom<Patient[]>([])

// Appointments atom - global state for all appointments
export const appointmentsAtom = atom<Appointment[]>([])
