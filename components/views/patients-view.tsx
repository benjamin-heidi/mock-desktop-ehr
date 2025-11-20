"use client"

import { useState, useEffect } from "react"
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
  const [isFullscreen, setIsFullscreen] = useState(false)

  const handleSelectPatient = (patient: Patient) => {
    setSelectedPatient(patient)
    setIsFullscreen(true)
  }

  const handleMinimize = () => {
    setIsFullscreen(false)
  }

  const handleClose = () => {
    setSelectedPatient(null)
    setIsFullscreen(false)
  }

  // Prevent body scroll when fullscreen
  useEffect(() => {
    if (isFullscreen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isFullscreen])

  return (
    <>
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
          <PatientsList onSelectPatient={handleSelectPatient} selectedPatient={selectedPatient} />
        </div>

        {/* Patient Detail Panel - Side Panel (when minimized) */}
        {selectedPatient && !isFullscreen && (
          <div className="w-[500px] bg-surface border-l border-soft overflow-auto">
            <PatientDetail 
              patient={selectedPatient} 
              onClose={handleClose}
              onMinimize={handleMinimize}
              isFullscreen={false}
            />
          </div>
        )}
      </div>

      {/* Patient Detail - Fullscreen */}
      {selectedPatient && isFullscreen && (
        <div className="fixed inset-0 z-50 bg-background animate-in fade-in-0 h-screen w-screen">
          <PatientDetail 
            patient={selectedPatient} 
            onClose={handleClose}
            onMinimize={handleMinimize}
            isFullscreen={true}
          />
        </div>
      )}
    </>
  )
}
