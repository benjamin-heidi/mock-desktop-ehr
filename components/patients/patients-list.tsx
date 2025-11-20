"use client"

import { useState, useEffect, useRef } from "react"
import { useAtom } from "jotai"
import { Search, ChevronDown, Plus, X } from "lucide-react"
import NewPatientModal from "./new-patient-modal"
import { patientsAtom, type Patient } from "@/lib/store/atoms"
import { PATIENT_LABEL_COLORS, INITIAL_PATIENTS } from "@/lib/constants"

interface PatientsListProps {
  onSelectPatient: (patient: Patient) => void
  selectedPatient: Patient | null
}

type SortOption = "firstNameAsc" | "firstNameDesc" | "lastNameAsc" | "lastNameDesc" | "ageAsc" | "ageDesc"

const SORT_OPTIONS: Array<{ value: SortOption; label: string }> = [
  { value: "firstNameAsc", label: "First name (A-Z)" },
  { value: "firstNameDesc", label: "First name (Z-A)" },
  { value: "lastNameAsc", label: "Last name (A-Z)" },
  { value: "lastNameDesc", label: "Last name (Z-A)" },
  { value: "ageAsc", label: "Age (Low to High)" },
  { value: "ageDesc", label: "Age (High to Low)" },
]

export default function PatientsList({ onSelectPatient, selectedPatient }: PatientsListProps) {
  const [patients, setPatients] = useAtom(patientsAtom)
  const [searchTerm, setSearchTerm] = useState("")
  const [showNewPatientModal, setShowNewPatientModal] = useState(false)
  const [selectedLabels, setSelectedLabels] = useState<string[]>([])
  const [sortOption, setSortOption] = useState<SortOption>("firstNameAsc")
  const [showFilterDropdown, setShowFilterDropdown] = useState(false)
  const [showSortDropdown, setShowSortDropdown] = useState(false)
  const filterDropdownRef = useRef<HTMLDivElement>(null)
  const sortDropdownRef = useRef<HTMLDivElement>(null)

  // Initialize patients data on mount
  useEffect(() => {
    if (patients.length === 0) {
      setPatients(INITIAL_PATIENTS)
    }
  }, [])

  // Get all unique labels from patients
  const allLabels = Array.from(
    new Set(patients.flatMap((patient) => patient.labels))
  ).sort()

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filterDropdownRef.current &&
        !filterDropdownRef.current.contains(event.target as Node)
      ) {
        setShowFilterDropdown(false)
      }
      if (
        sortDropdownRef.current &&
        !sortDropdownRef.current.contains(event.target as Node)
      ) {
        setShowSortDropdown(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Filter and sort patients
  const filteredPatients = patients
    .filter((patient) => {
      // Search filter
      const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase())
      
      // Label filter
      const matchesLabels = selectedLabels.length === 0 || 
        selectedLabels.some((label) => patient.labels.includes(label))
      
      return matchesSearch && matchesLabels
    })
    .sort((a, b) => {
      switch (sortOption) {
        case "firstNameAsc": {
          const aFirst = a.name.split(" ")[0]
          const bFirst = b.name.split(" ")[0]
          return aFirst.localeCompare(bFirst)
        }
        case "firstNameDesc": {
          const aFirst = a.name.split(" ")[0]
          const bFirst = b.name.split(" ")[0]
          return bFirst.localeCompare(aFirst)
        }
        case "lastNameAsc": {
          const aLast = a.name.split(" ").slice(-1)[0] || ""
          const bLast = b.name.split(" ").slice(-1)[0] || ""
          return aLast.localeCompare(bLast)
        }
        case "lastNameDesc": {
          const aLast = a.name.split(" ").slice(-1)[0] || ""
          const bLast = b.name.split(" ").slice(-1)[0] || ""
          return bLast.localeCompare(aLast)
        }
        case "ageAsc":
          return a.age - b.age
        case "ageDesc":
          return b.age - a.age
        default:
          return 0
      }
    })

  const toggleLabel = (label: string) => {
    setSelectedLabels((prev) =>
      prev.includes(label)
        ? prev.filter((l) => l !== label)
        : [...prev, label]
    )
  }

  const clearFilters = () => {
    setSelectedLabels([])
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-6 bg-surface border-b border-soft">
        <h1 className="text-3xl font-bold text-neutral-900 mb-4">
          Patients <span className="text-neutral-500 font-normal">({filteredPatients.length})</span>
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
          <div className="relative" ref={filterDropdownRef}>
            <button
              onClick={() => setShowFilterDropdown(!showFilterDropdown)}
              className={`px-4 py-2 border border-soft rounded-lg text-sm font-medium hover:bg-neutral-50 flex items-center gap-2 ${
                selectedLabels.length > 0 ? "text-primary" : "text-neutral-700"
              }`}
            >
              <ChevronDown className="w-4 h-4" />
              Filter labels
              {selectedLabels.length > 0 && (
                <span className="ml-1 px-1.5 py-0.5 bg-primary text-white text-xs rounded-full">
                  {selectedLabels.length}
                </span>
              )}
            </button>
            {showFilterDropdown && (
              <div className="absolute top-full left-0 mt-1 bg-white border border-soft rounded-lg shadow-lg z-50 min-w-[200px]">
                <div className="p-3 border-b border-soft flex items-center justify-between">
                  <span className="text-sm font-medium text-neutral-900">Filter by labels</span>
                  {selectedLabels.length > 0 && (
                    <button
                      onClick={clearFilters}
                      className="text-xs text-primary hover:underline"
                    >
                      Clear all
                    </button>
                  )}
                </div>
                <div className="p-2 max-h-60 overflow-y-auto">
                  {allLabels.length === 0 ? (
                    <p className="text-sm text-neutral-500 p-2">No labels available</p>
                  ) : (
                    allLabels.map((label) => (
                      <label
                        key={label}
                        className="flex items-center gap-2 p-2 hover:bg-neutral-50 rounded cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={selectedLabels.includes(label)}
                          onChange={() => toggleLabel(label)}
                          className="w-4 h-4 text-primary border-soft rounded focus:ring-primary"
                        />
                        <span className="text-sm text-neutral-700">{label}</span>
                      </label>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Sort */}
          <div className="relative" ref={sortDropdownRef}>
            <button
              onClick={() => setShowSortDropdown(!showSortDropdown)}
              className="px-4 py-2 border border-soft rounded-lg text-sm font-medium text-primary hover:bg-neutral-50 flex items-center gap-2"
            >
              <ChevronDown className="w-4 h-4" />
              Sort: {SORT_OPTIONS.find((opt) => opt.value === sortOption)?.label}
            </button>
            {showSortDropdown && (
              <div className="absolute top-full right-0 mt-1 bg-white border border-soft rounded-lg shadow-lg z-50 min-w-[200px]">
                <div className="p-2">
                  {SORT_OPTIONS.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setSortOption(option.value)
                        setShowSortDropdown(false)
                      }}
                      className={`w-full text-left px-3 py-2 text-sm rounded hover:bg-neutral-50 transition-colors ${
                        sortOption === option.value
                          ? "text-primary font-medium bg-primary/10"
                          : "text-neutral-700"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

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
