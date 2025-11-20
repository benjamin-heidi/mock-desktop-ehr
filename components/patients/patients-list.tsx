"use client"

import { useState, useEffect } from "react"
import { useAtom } from "jotai"
import { Search, ChevronDown, Plus } from "lucide-react"
import NewPatientModal from "./new-patient-modal"
import { patientsAtom, type Patient } from "@/lib/store/atoms"
import { PATIENT_LABEL_COLORS, INITIAL_PATIENTS } from "@/lib/constants"

interface PatientsListProps {
  onSelectPatient: (patient: Patient) => void
  selectedPatient: Patient | null
}

export default function PatientsList({ onSelectPatient, selectedPatient }: PatientsListProps) {
  const [patients, setPatients] = useAtom(patientsAtom)
  const [searchTerm, setSearchTerm] = useState("")
  const [showNewPatientModal, setShowNewPatientModal] = useState(false)

  // Initialize patients data on mount
  useEffect(() => {
    if (patients.length === 0) {
      setPatients(INITIAL_PATIENTS)
    }
  }, [])

  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-6 bg-surface border-b border-soft">
        <h1 className="text-3xl font-bold text-neutral-900 mb-4">
          Patients <span className="text-neutral-500 font-normal">({patients.length})</span>
        </h1>

        {/* Controls */}
        <div className="flex gap-3">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-soft rounded-lg text-sm bg-white"
            />
          </div>

          {/* Filter */}
          <button className="px-4 py-2 border border-soft rounded-lg text-sm font-medium text-neutral-700 hover:bg-neutral-50 flex items-center gap-2">
            <ChevronDown className="w-4 h-4" />
            Filter labels
          </button>

          {/* Sort */}
          <button className="px-4 py-2 border border-soft rounded-lg text-sm font-medium text-primary flex items-center gap-2">
            <ChevronDown className="w-4 h-4" />
            Sort: First name (A-Z)
          </button>

          {/* New Patient */}
          <button
            onClick={() => setShowNewPatientModal(true)}
            className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-dark flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            New patient
          </button>
        </div>
      </div>

      {/* Patients Table */}
      <div className="flex-1 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="sticky top-0 bg-neutral-50 border-b border-soft">
            <tr>
              <th className="px-6 py-3 text-left text-neutral-600 font-medium">Name</th>
              <th className="px-6 py-3 text-left text-neutral-600 font-medium">Date of birth</th>
              <th className="px-6 py-3 text-left text-neutral-600 font-medium">Gender</th>
              <th className="px-6 py-3 text-left text-neutral-600 font-medium">Phone number(s)</th>
              <th className="px-6 py-3 text-left text-neutral-600 font-medium">Email</th>
              <th className="px-6 py-3 text-left text-neutral-600 font-medium">Labels</th>
              <th className="px-6 py-3 text-left text-neutral-600 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-soft bg-white">
            {filteredPatients.map((patient) => (
              <tr
                key={patient.id}
                onClick={() => onSelectPatient(patient)}
                className={`hover:bg-neutral-50 cursor-pointer ${
                  selectedPatient?.id === patient.id ? "bg-blue-50" : ""
                }`}
              >
                <td className="px-6 py-4">
                  <button className="text-primary hover:underline font-medium">{patient.name}</button>
                </td>
                <td className="px-6 py-4 text-neutral-700">
                  <div>{patient.dob}</div>
                  <div className="text-neutral-500 text-xs">({patient.age} years)</div>
                </td>
                <td className="px-6 py-4 text-neutral-700">{patient.gender}</td>
                <td className="px-6 py-4 text-neutral-700">{patient.phone}</td>
                <td className="px-6 py-4 text-neutral-700">{patient.email}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    {patient.labels.map((label) => (
                      <span
                        key={label}
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          PATIENT_LABEL_COLORS[label] || "bg-neutral-100 text-neutral-700"
                        }`}
                      >
                        {label}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <button className="p-2 hover:bg-neutral-100 rounded-lg transition-colors">
                    <svg className="w-5 h-5 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                      />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* New Patient Modal */}
      {showNewPatientModal && <NewPatientModal onClose={() => setShowNewPatientModal(false)} />}
    </div>
  )
}
