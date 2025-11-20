"use client"

import { useState, useEffect } from "react"
import { X, Minimize2, Edit2, Save, X as XIcon, Plus, Trash2 } from "lucide-react"
import { useAtom } from "jotai"
import { patientsAtom, patientConsultationsAtom, patientMedicationsAtom, type Consultation, type Medication } from "@/lib/store/atoms"
import { PATIENT_LABEL_COLORS } from "@/lib/constants"

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

type ActiveTab = "summary" | "consultations" | "medications" | "labs" | "imaging"

export default function PatientDetail({ patient, onClose, onMinimize, isFullscreen = false }: PatientDetailProps) {
  const [patients, setPatients] = useAtom(patientsAtom)
  const [consultations, setConsultations] = useAtom(patientConsultationsAtom)
  const [medications, setMedications] = useAtom(patientMedicationsAtom)
  
  const [activeTab, setActiveTab] = useState<ActiveTab>("summary")
  const [uploadDone, setUploadDone] = useState(false)
  
  // Edit states
  const [isEditingSummary, setIsEditingSummary] = useState(false)
  const [isEditingConsultations, setIsEditingConsultations] = useState(false)
  const [isEditingMedications, setIsEditingMedications] = useState(false)
  
  // Form data states
  const [editPatientData, setEditPatientData] = useState<Patient>(patient)
  const [patientConsultations, setPatientConsultations] = useState<Consultation[]>(
    consultations[patient.id] || []
  )
  const [patientMedications, setPatientMedications] = useState<Medication[]>(
    medications[patient.id] || []
  )

  const tabs: Array<{ id: ActiveTab; label: string }> = [
    { id: "summary", label: "Summary" },
    { id: "consultations", label: "Consultations" },
    { id: "medications", label: "Medications" },
    { id: "labs", label: "Labs" },
    { id: "imaging", label: "Imaging" },
  ]

  // Reset upload state when switching away from imaging tab
  useEffect(() => {
    if (activeTab !== "imaging") {
      setUploadDone(false)
    }
  }, [activeTab])

  // Update edit data when patient changes
  useEffect(() => {
    setEditPatientData(patient)
    setPatientConsultations(consultations[patient.id] || [])
    setPatientMedications(medications[patient.id] || [])
  }, [patient.id, consultations, medications])

  // Save summary edits
  const handleSaveSummary = () => {
    setPatients((prev) =>
      prev.map((p) => (p.id === patient.id ? editPatientData : p))
    )
    setIsEditingSummary(false)
  }

  // Save consultations
  const handleSaveConsultations = () => {
    setConsultations((prev) => ({
      ...prev,
      [patient.id]: patientConsultations,
    }))
    setIsEditingConsultations(false)
  }

  // Save medications
  const handleSaveMedications = () => {
    setMedications((prev) => ({
      ...prev,
      [patient.id]: patientMedications,
    }))
    setIsEditingMedications(false)
  }

  // Add new consultation
  const handleAddConsultation = () => {
    const newConsultation: Consultation = {
      id: Date.now().toString(),
      title: "",
      notes: "",
      timestamp: new Date().toISOString(),
    }
    setPatientConsultations([...patientConsultations, newConsultation])
  }

  // Update consultation
  const handleUpdateConsultation = (id: string, field: keyof Consultation, value: string) => {
    setPatientConsultations((prev) =>
      prev.map((c) => (c.id === id ? { ...c, [field]: value } : c))
    )
  }

  // Delete consultation
  const handleDeleteConsultation = (id: string) => {
    setPatientConsultations((prev) => prev.filter((c) => c.id !== id))
  }

  // Add new medication
  const handleAddMedication = () => {
    const newMedication: Medication = {
      id: Date.now().toString(),
      name: "",
      dosage: "",
      duration: "",
      notes: "",
    }
    setPatientMedications([...patientMedications, newMedication])
  }

  // Update medication
  const handleUpdateMedication = (id: string, field: keyof Medication, value: string) => {
    setPatientMedications((prev) =>
      prev.map((m) => (m.id === id ? { ...m, [field]: value } : m))
    )
  }

  // Delete medication
  const handleDeleteMedication = (id: string) => {
    setPatientMedications((prev) => prev.filter((m) => m.id !== id))
  }

  const availableLabels = Object.keys(PATIENT_LABEL_COLORS)

  return (
    <div className={`flex flex-col h-full bg-surface ${isFullscreen ? "max-w-6xl mx-auto w-full" : ""}`}>
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
      <div className={`flex-1 overflow-y-auto p-6 ${isFullscreen ? "max-w-4xl mx-auto w-full" : ""}`}>
        {activeTab === "summary" && (
          <div className="space-y-6">
            {!isEditingSummary ? (
              <>
                {/* Patient Info Display */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-neutral-900">Patient Information</h3>
                    <button
                      onClick={() => setIsEditingSummary(true)}
                      className="flex items-center gap-2 px-3 py-1.5 text-sm text-primary hover:bg-primary/10 rounded-lg transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                      Edit
                    </button>
                  </div>
                  <div className="space-y-3">
                    <div className={`flex ${isFullscreen ? "gap-8" : "justify-between"} items-center py-2 border-b border-soft`}>
                      <span className="text-neutral-600 min-w-[120px]">Name</span>
                      <span className="text-neutral-900">{patient.name}</span>
                    </div>
                    <div className={`flex ${isFullscreen ? "gap-8" : "justify-between"} items-center py-2 border-b border-soft`}>
                      <span className="text-neutral-600 min-w-[120px]">Date of Birth</span>
                      <span className="text-neutral-900">{patient.dob}</span>
                    </div>
                    <div className={`flex ${isFullscreen ? "gap-8" : "justify-between"} items-center py-2 border-b border-soft`}>
                      <span className="text-neutral-600 min-w-[120px]">Age</span>
                      <span className="text-neutral-900">{patient.age} years</span>
                    </div>
                    <div className={`flex ${isFullscreen ? "gap-8" : "justify-between"} items-center py-2 border-b border-soft`}>
                      <span className="text-neutral-600 min-w-[120px]">Gender</span>
                      <span className="text-neutral-900">{patient.gender}</span>
                    </div>
                    <div className={`flex ${isFullscreen ? "gap-8" : "justify-between"} items-center py-2 border-b border-soft`}>
                      <span className="text-neutral-600 min-w-[120px]">Phone</span>
                      <span className="text-neutral-900">{patient.phone}</span>
                    </div>
                    <div className={`flex ${isFullscreen ? "gap-8" : "justify-between"} items-center py-2 border-b border-soft`}>
                      <span className="text-neutral-600 min-w-[120px]">Email</span>
                      <span className="text-neutral-900">{patient.email}</span>
                    </div>
                    <div className={`flex ${isFullscreen ? "gap-8" : "justify-between"} items-center py-2 border-b border-soft`}>
                      <span className="text-neutral-600 min-w-[120px]">Address</span>
                      <span className="text-neutral-900">{patient.address}</span>
                    </div>
                    <div className={`flex ${isFullscreen ? "gap-8" : "justify-between"} items-center py-2`}>
                      <span className="text-neutral-600 min-w-[120px]">Labels</span>
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
                    </div>
                  </div>
                </div>

                {/* Vitals */}
                <div>
                  <h3 className="font-semibold text-neutral-900 mb-4">Vitals</h3>
                  <div className="space-y-3">
                <div className={`flex ${isFullscreen ? "gap-8" : "justify-between"} items-center py-2 border-b border-soft`}>
                  <span className="text-neutral-600 min-w-[120px]">Height</span>
                  <span className="text-neutral-900">None recorded</span>
                </div>
                <div className={`flex ${isFullscreen ? "gap-8" : "justify-between"} items-center py-2 border-b border-soft`}>
                  <span className="text-neutral-600 min-w-[120px]">Weight</span>
                  <span className="text-neutral-900">None recorded</span>
                </div>
                <div className={`flex ${isFullscreen ? "gap-8" : "justify-between"} items-center py-2`}>
                  <span className="text-neutral-600 min-w-[120px]">GFR</span>
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
              </>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-neutral-900">Edit Patient Information</h3>
                  <div className="flex gap-2">
                    <button
                      onClick={handleSaveSummary}
                      className="flex items-center gap-2 px-3 py-1.5 text-sm bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                    >
                      <Save className="w-4 h-4" />
                      Save
                    </button>
                    <button
                      onClick={() => {
                        setIsEditingSummary(false)
                        setEditPatientData(patient)
                      }}
                      className="flex items-center gap-2 px-3 py-1.5 text-sm border border-soft text-neutral-700 rounded-lg hover:bg-neutral-50 transition-colors"
                    >
                      <XIcon className="w-4 h-4" />
                      Cancel
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-900 mb-2">Name</label>
                    <input
                      type="text"
                      value={editPatientData.name}
                      onChange={(e) => setEditPatientData({ ...editPatientData, name: e.target.value })}
                      className="w-full px-4 py-2 border border-soft rounded-lg text-sm bg-white text-neutral-900"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-900 mb-2">Date of Birth</label>
                    <input
                      type="text"
                      value={editPatientData.dob}
                      onChange={(e) => setEditPatientData({ ...editPatientData, dob: e.target.value })}
                      placeholder="DD/MM/YYYY"
                      className="w-full px-4 py-2 border border-soft rounded-lg text-sm bg-white text-neutral-900"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-900 mb-2">Age</label>
                    <input
                      type="number"
                      value={editPatientData.age}
                      onChange={(e) => setEditPatientData({ ...editPatientData, age: parseInt(e.target.value) || 0 })}
                      className="w-full px-4 py-2 border border-soft rounded-lg text-sm bg-white text-neutral-900"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-900 mb-2">Gender</label>
                    <select
                      value={editPatientData.gender}
                      onChange={(e) => setEditPatientData({ ...editPatientData, gender: e.target.value })}
                      className="w-full px-4 py-2 border border-soft rounded-lg text-sm bg-white text-neutral-900"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-900 mb-2">Phone</label>
                    <input
                      type="text"
                      value={editPatientData.phone}
                      onChange={(e) => setEditPatientData({ ...editPatientData, phone: e.target.value })}
                      className="w-full px-4 py-2 border border-soft rounded-lg text-sm bg-white text-neutral-900"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-900 mb-2">Email</label>
                    <input
                      type="email"
                      value={editPatientData.email}
                      onChange={(e) => setEditPatientData({ ...editPatientData, email: e.target.value })}
                      className="w-full px-4 py-2 border border-soft rounded-lg text-sm bg-white text-neutral-900"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-900 mb-2">Address</label>
                    <input
                      type="text"
                      value={editPatientData.address}
                      onChange={(e) => setEditPatientData({ ...editPatientData, address: e.target.value })}
                      className="w-full px-4 py-2 border border-soft rounded-lg text-sm bg-white text-neutral-900"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-900 mb-2">Labels</label>
                    <div className="flex flex-wrap gap-2">
                      {availableLabels.map((label) => (
                        <label key={label} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={editPatientData.labels.includes(label)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setEditPatientData({
                                  ...editPatientData,
                                  labels: [...editPatientData.labels, label],
                                })
                              } else {
                                setEditPatientData({
                                  ...editPatientData,
                                  labels: editPatientData.labels.filter((l) => l !== label),
                                })
                              }
                            }}
                            className="w-4 h-4 text-primary border-soft rounded"
                          />
                          <span className="text-sm text-neutral-700">{label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === "consultations" && (
          <div className="space-y-4">
            {!isEditingConsultations ? (
              <>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-neutral-900">Consultations</h3>
                  <button
                    onClick={() => setIsEditingConsultations(true)}
                    className="flex items-center gap-2 px-3 py-1.5 text-sm text-primary hover:bg-primary/10 rounded-lg transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                    Edit
                  </button>
                </div>
                {patientConsultations.length === 0 ? (
                  <div className="bg-neutral-50 rounded-lg p-4">
                    <p className="text-sm text-neutral-600">No consultations recorded</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {patientConsultations.map((consultation) => (
                      <div key={consultation.id} className="bg-neutral-50 rounded-lg p-4 border border-soft">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-semibold text-neutral-900">{consultation.title || "Untitled Consultation"}</h4>
                          <span className="text-xs text-neutral-500">
                            {new Date(consultation.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <p className="text-sm text-neutral-700 whitespace-pre-wrap">{consultation.notes || "No notes"}</p>
                      </div>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-neutral-900">Edit Consultations</h3>
                  <div className="flex gap-2">
                    <button
                      onClick={handleSaveConsultations}
                      className="flex items-center gap-2 px-3 py-1.5 text-sm bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                    >
                      <Save className="w-4 h-4" />
                      Save
                    </button>
                    <button
                      onClick={() => {
                        setIsEditingConsultations(false)
                        setPatientConsultations(consultations[patient.id] || [])
                      }}
                      className="flex items-center gap-2 px-3 py-1.5 text-sm border border-soft text-neutral-700 rounded-lg hover:bg-neutral-50 transition-colors"
                    >
                      <XIcon className="w-4 h-4" />
                      Cancel
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  {patientConsultations.map((consultation) => (
                    <div key={consultation.id} className="bg-neutral-50 rounded-lg p-4 border border-soft">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <label className="block text-sm font-medium text-neutral-900 mb-2">Title</label>
                          <input
                            type="text"
                            value={consultation.title}
                            onChange={(e) => handleUpdateConsultation(consultation.id, "title", e.target.value)}
                            placeholder="Consultation title"
                            className="w-full px-4 py-2 border border-soft rounded-lg text-sm bg-white text-neutral-900"
                          />
                        </div>
                        <button
                          onClick={() => handleDeleteConsultation(consultation.id)}
                          className="ml-3 p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete consultation"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="mb-2">
                        <label className="block text-sm font-medium text-neutral-900 mb-2">Notes</label>
                        <textarea
                          value={consultation.notes}
                          onChange={(e) => handleUpdateConsultation(consultation.id, "notes", e.target.value)}
                          placeholder="Enter consultation notes..."
                          rows={4}
                          className="w-full px-4 py-2 border border-soft rounded-lg text-sm bg-white text-neutral-900"
                        />
                      </div>
                      <div className="text-xs text-neutral-500">
                        Timestamp: {new Date(consultation.timestamp).toLocaleString()}
                      </div>
                    </div>
                  ))}
                  <button
                    onClick={handleAddConsultation}
                    className="w-full px-4 py-2 border-2 border-dashed border-soft rounded-lg text-sm text-neutral-600 hover:bg-neutral-50 flex items-center justify-center gap-2 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Add Consultation
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === "medications" && (
          <div className="space-y-4">
            {!isEditingMedications ? (
              <>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-neutral-900">Medications</h3>
                  <button
                    onClick={() => setIsEditingMedications(true)}
                    className="flex items-center gap-2 px-3 py-1.5 text-sm text-primary hover:bg-primary/10 rounded-lg transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                    Edit
                  </button>
                </div>
                {patientMedications.length === 0 ? (
                  <div className="bg-neutral-50 rounded-lg p-4">
                    <p className="text-sm text-neutral-600">No medications recorded</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {patientMedications.map((medication) => (
                      <div key={medication.id} className="bg-neutral-50 rounded-lg p-4 border border-soft">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-semibold text-neutral-900">{medication.name || "Unnamed Medication"}</h4>
                        </div>
                        <div className="space-y-1 text-sm">
                          <div className={`flex ${isFullscreen ? "gap-8" : "justify-between"}`}>
                            <span className="text-neutral-600 min-w-[80px]">Dosage:</span>
                            <span className="text-neutral-900">{medication.dosage || "Not specified"}</span>
                          </div>
                          <div className={`flex ${isFullscreen ? "gap-8" : "justify-between"}`}>
                            <span className="text-neutral-600 min-w-[80px]">Duration:</span>
                            <span className="text-neutral-900">{medication.duration || "Not specified"}</span>
                          </div>
                          {medication.notes && (
                            <div className="mt-2 pt-2 border-t border-soft">
                              <span className="text-neutral-600">Notes: </span>
                              <span className="text-neutral-900">{medication.notes}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-neutral-900">Edit Medications</h3>
                  <div className="flex gap-2">
                    <button
                      onClick={handleSaveMedications}
                      className="flex items-center gap-2 px-3 py-1.5 text-sm bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                    >
                      <Save className="w-4 h-4" />
                      Save
                    </button>
                    <button
                      onClick={() => {
                        setIsEditingMedications(false)
                        setPatientMedications(medications[patient.id] || [])
                      }}
                      className="flex items-center gap-2 px-3 py-1.5 text-sm border border-soft text-neutral-700 rounded-lg hover:bg-neutral-50 transition-colors"
                    >
                      <XIcon className="w-4 h-4" />
                      Cancel
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  {patientMedications.map((medication) => (
                    <div key={medication.id} className="bg-neutral-50 rounded-lg p-4 border border-soft">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1 space-y-3">
                          <div>
                            <label className="block text-sm font-medium text-neutral-900 mb-2">Medication Name</label>
                            <input
                              type="text"
                              value={medication.name}
                              onChange={(e) => handleUpdateMedication(medication.id, "name", e.target.value)}
                              placeholder="Enter medication name"
                              className="w-full px-4 py-2 border border-soft rounded-lg text-sm bg-white text-neutral-900"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-sm font-medium text-neutral-900 mb-2">Dosage</label>
                              <input
                                type="text"
                                value={medication.dosage}
                                onChange={(e) => handleUpdateMedication(medication.id, "dosage", e.target.value)}
                                placeholder="e.g., 10mg"
                                className="w-full px-4 py-2 border border-soft rounded-lg text-sm bg-white text-neutral-900"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-neutral-900 mb-2">Duration</label>
                              <input
                                type="text"
                                value={medication.duration}
                                onChange={(e) => handleUpdateMedication(medication.id, "duration", e.target.value)}
                                placeholder="e.g., 30 days"
                                className="w-full px-4 py-2 border border-soft rounded-lg text-sm bg-white text-neutral-900"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-neutral-900 mb-2">Notes</label>
                            <textarea
                              value={medication.notes}
                              onChange={(e) => handleUpdateMedication(medication.id, "notes", e.target.value)}
                              placeholder="Additional notes..."
                              rows={2}
                              className="w-full px-4 py-2 border border-soft rounded-lg text-sm bg-white text-neutral-900"
                            />
                          </div>
                        </div>
                        <button
                          onClick={() => handleDeleteMedication(medication.id)}
                          className="ml-3 p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete medication"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                  <button
                    onClick={handleAddMedication}
                    className="w-full px-4 py-2 border-2 border-dashed border-soft rounded-lg text-sm text-neutral-600 hover:bg-neutral-50 flex items-center justify-center gap-2 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Add Medication
                  </button>
                </div>
              </div>
            )}
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

        {activeTab === "imaging" && (
          <div className="space-y-4">
            <div className="bg-neutral-50 rounded-lg p-4">
              <h4 className="font-semibold text-neutral-900 mb-4"></h4>
              {!uploadDone ? (
                <button
                  onClick={() => setUploadDone(true)}
                  className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors"
                >
                  Upload Image
                </button>
              ) : (
                <p className="text-sm text-neutral-900 font-medium">Done</p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="border-t border-soft p-6 space-y-2">
        {activeTab === "summary" && !isEditingSummary && (
          <button
            onClick={() => setIsEditingSummary(true)}
            className="w-full px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors"
          >
            Edit patient
          </button>
        )}
        {activeTab === "consultations" && !isEditingConsultations && (
          <button
            onClick={() => setIsEditingConsultations(true)}
            className="w-full px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors"
          >
            Edit consultations
          </button>
        )}
        {activeTab === "medications" && !isEditingMedications && (
          <button
            onClick={() => setIsEditingMedications(true)}
            className="w-full px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors"
          >
            Edit medications
          </button>
        )}
        <button className="w-full px-4 py-2 border border-soft rounded-lg text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition-colors">
          View full record
        </button>
      </div>
    </div>
  )
}
