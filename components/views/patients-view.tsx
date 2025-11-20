"use client"

import { useState } from "react"
import { useAtomValue } from "jotai"
import PatientsList from "@/components/patients/patients-list"
import PatientDetail from "@/components/patients/patient-detail"
import { activeSectionAtom } from "@/lib/store/atoms"

interface Patient {
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

export default function PatientsView() {
  const activeSection = useAtomValue(activeSectionAtom)
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null)

  return (
    <div className="flex h-full bg-background">
      {/* Patients List */}
      <div className="flex-1 overflow-auto">
        <div className="p-4 border-b border-soft bg-surface">
          <h2 className="text-lg font-semibold text-neutral-900">
            {activeSection === "all" && "All Patients"}
            {activeSection === "active" && "Active Patients"}
            {activeSection === "inactive" && "Inactive Patients"}
          </h2>
        </div>
        <PatientsList onSelectPatient={setSelectedPatient} selectedPatient={selectedPatient} />
      </div>

      {/* Patient Detail Panel */}
      {selectedPatient && (
        <div className="w-96 bg-surface border-l border-soft overflow-auto">
          <PatientDetail patient={selectedPatient} onClose={() => setSelectedPatient(null)} />
        </div>
      )}
    </div>
  )
}
