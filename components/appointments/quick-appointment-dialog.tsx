"use client"

import { X } from "lucide-react"
import { useState } from "react"
import { useAtomValue } from "jotai"
import { clinicSettingsAtom, type Patient } from "@/lib/store/atoms"
import { APPOINTMENT_TYPES, DURATION_OPTIONS } from "@/lib/constants"

interface QuickAppointmentDialogProps {
  onClose: () => void
  onSave: (appointment: {
    patient: string
    patientId: string
    clinician: string
    appointmentType: string
    time: string
    date: string
    duration: number
  }) => void
  selectedTime: string
  selectedDate: string
  selectedClinician: string
  patients: Patient[]
}

export default function QuickAppointmentDialog({
  onClose,
  onSave,
  selectedTime,
  selectedDate,
  selectedClinician,
  patients,
}: QuickAppointmentDialogProps) {
  const clinicSettings = useAtomValue(clinicSettingsAtom)

  const [formData, setFormData] = useState({
    patientId: "",
    appointmentType: "",
    duration: clinicSettings.appointmentSlotDuration,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const selectedPatient = patients.find(p => p.id === formData.patientId)
    if (!selectedPatient) return

    onSave({
      patient: selectedPatient.name,
      patientId: formData.patientId,
      clinician: selectedClinician,
      appointmentType: formData.appointmentType,
      time: selectedTime,
      date: selectedDate,
      duration: formData.duration,
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-soft">
          <h2 className="text-xl font-bold text-neutral-900">New Appointment</h2>
          <button onClick={onClose} className="p-1 hover:bg-neutral-100 rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Time Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="text-sm text-neutral-600">
              <div className="font-semibold text-neutral-900 mb-1">Schedule Details</div>
              <div>Clinician: <span className="font-medium">{selectedClinician}</span></div>
              <div>Date: <span className="font-medium">{new Date(selectedDate).toLocaleDateString()}</span></div>
              <div>Time: <span className="font-medium">{selectedTime}</span></div>
            </div>
          </div>

          {/* Patient Selection */}
          <div>
            <label className="block text-sm font-medium text-neutral-900 mb-2">
              Patient <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.patientId}
              onChange={(e) => setFormData({ ...formData, patientId: e.target.value })}
              className="w-full px-4 py-2 border border-soft rounded-lg text-sm bg-white"
              required
            >
              <option value="">Select patient</option>
              {patients.map((patient) => (
                <option key={patient.id} value={patient.id}>
                  {patient.name} ({patient.age}y, {patient.gender})
                </option>
              ))}
            </select>
          </div>

          {/* Appointment Type */}
          <div>
            <label className="block text-sm font-medium text-neutral-900 mb-2">
              Appointment Type <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.appointmentType}
              onChange={(e) => setFormData({ ...formData, appointmentType: e.target.value })}
              className="w-full px-4 py-2 border border-soft rounded-lg text-sm bg-white"
              required
            >
              <option value="">Select type</option>
              {APPOINTMENT_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Duration */}
          <div>
            <label className="block text-sm font-medium text-neutral-900 mb-2">
              Duration (minutes) <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
              className="w-full px-4 py-2 border border-soft rounded-lg text-sm bg-white"
              required
            >
              {DURATION_OPTIONS.map((duration) => (
                <option key={duration} value={duration}>
                  {duration} minutes
                </option>
              ))}
            </select>
            <p className="mt-1 text-xs text-neutral-500">
              Default: {clinicSettings.appointmentSlotDuration} minutes
            </p>
          </div>

          {/* Footer */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-soft rounded-lg text-sm font-medium text-neutral-700 hover:bg-neutral-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-dark"
            >
              Create Appointment
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
