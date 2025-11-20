"use client"

import { useState } from "react"
import { X, Minimize2 } from "lucide-react"

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

interface PatientDetailProps {
  patient: Patient
  onClose: () => void
  onMinimize?: () => void
  isFullscreen?: boolean
}

type ActiveTab = "summary" | "consultations" | "medications" | "labs"

export default function PatientDetail({ patient, onClose, onMinimize, isFullscreen = false }: PatientDetailProps) {
  const [activeTab, setActiveTab] = useState<ActiveTab>("summary")

  const tabs: Array<{ id: ActiveTab; label: string }> = [
    { id: "summary", label: "Summary" },
    { id: "consultations", label: "Consultations" },
    { id: "medications", label: "Medications" },
    { id: "labs", label: "Labs" },
  ]

  return (
    <div className="flex flex-col h-full bg-surface">
      {/* Header */}
      <div className="p-6 border-b border-soft">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-neutral-900">{patient.name}</h2>
            <p className="text-sm text-neutral-500 mt-1">
              {patient.dob} | {patient.age} years | {patient.gender} | {patient.id}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {isFullscreen && onMinimize && (
              <button 
                onClick={onMinimize} 
                className="p-1 hover:bg-neutral-100 rounded-lg transition-colors"
                title="Minimize"
              >
                <Minimize2 className="w-5 h-5" />
              </button>
            )}
            <button 
              onClick={onClose} 
              className="p-1 hover:bg-neutral-100 rounded-lg transition-colors"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Contact Info */}
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-neutral-700">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
            </svg>
            {patient.address}
          </div>
          <div className="flex items-center gap-2 text-neutral-700">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            {patient.phone}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-soft bg-neutral-50">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 px-4 py-3 text-sm font-medium transition-colors border-b-2 ${
              activeTab === tab.id
                ? "text-primary border-primary"
                : "text-neutral-600 border-transparent hover:text-neutral-900"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {activeTab === "summary" && (
          <div className="space-y-6">
            {/* Vitals */}
            <div>
              <h3 className="font-semibold text-neutral-900 mb-4">Vitals</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-soft">
                  <span className="text-neutral-600">Height</span>
                  <span className="text-neutral-900">None recorded</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-soft">
                  <span className="text-neutral-600">Weight</span>
                  <span className="text-neutral-900">None recorded</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-neutral-600">GFR</span>
                  <span className="text-neutral-900">None recorded</span>
                </div>
              </div>
            </div>

            {/* Allergies */}
            <div>
              <h3 className="font-semibold text-neutral-900 mb-4">Allergies</h3>
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-sm text-red-900">Allergy to peanuts</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "consultations" && (
          <div className="space-y-4">
            <div className="bg-neutral-50 rounded-lg p-4">
              <h4 className="font-semibold text-neutral-900 mb-2">Recent Consultations</h4>
              <p className="text-sm text-neutral-600">No consultations recorded</p>
            </div>
          </div>
        )}

        {activeTab === "medications" && (
          <div className="space-y-4">
            <div className="bg-neutral-50 rounded-lg p-4">
              <h4 className="font-semibold text-neutral-900 mb-2">Current Medications</h4>
              <p className="text-sm text-neutral-600">No medications recorded</p>
            </div>
          </div>
        )}

        {activeTab === "labs" && (
          <div className="space-y-4">
            <div className="bg-neutral-50 rounded-lg p-4">
              <h4 className="font-semibold text-neutral-900 mb-2">Lab Results</h4>
              <p className="text-sm text-neutral-600">No lab results recorded</p>
            </div>
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="border-t border-soft p-6 space-y-2">
        <button className="w-full px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors">
          Edit patient
        </button>
        <button className="w-full px-4 py-2 border border-soft rounded-lg text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition-colors">
          View full record
        </button>
      </div>
    </div>
  )
}
