"use client"

import { X } from "lucide-react"
import { useState } from "react"

interface CreateBookingModalProps {
  onClose: () => void
}

export default function CreateBookingModal({ onClose }: CreateBookingModalProps) {
  const [formData, setFormData] = useState({
    appointmentType: "clinic",
    availability: "available",
    patient: "",
    newPatient: "",
    location: "Heidi SF - Room 1",
    clinician: "",
    appointmentType2: "",
    date: "",
    time: "",
    duration: "30",
    comments: "",
  })

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between p-6 border-b border-soft bg-white">
          <h2 className="text-xl font-bold text-neutral-900">Create new booking</h2>
          <button onClick={onClose} className="p-1 hover:bg-neutral-100 rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Tabs */}
          <div className="flex gap-4 mb-6 border-b border-soft">
            <button className="px-4 py-2 text-sm font-medium text-primary border-b-2 border-primary pb-2">
              Clinic appointment
            </button>
            <button className="px-4 py-2 text-sm font-medium text-neutral-600 hover:text-neutral-900">
              Theatre appointment
            </button>
          </div>

          <div className="space-y-6">
            {/* Patient Selection */}
            <div>
              <label className="block text-sm font-medium text-neutral-900 mb-2">Patient</label>
              <select className="w-full px-4 py-2 border border-soft rounded-lg text-sm bg-white">
                <option>Select patient</option>
                <option>Marcus Thompson</option>
                <option>Diana Rossi</option>
              </select>
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-neutral-900 mb-2">Location</label>
              <select className="w-full px-4 py-2 border border-soft rounded-lg text-sm bg-white">
                <option>Heidi SF - Room 1</option>
                <option>Heidi SF - Room 2</option>
              </select>
            </div>

            {/* Clinician */}
            <div>
              <label className="block text-sm font-medium text-neutral-900 mb-2">Clinician</label>
              <select className="w-full px-4 py-2 border border-soft rounded-lg text-sm bg-white">
                <option>Select clinician</option>
                <option>M. Harris</option>
                <option>I. Heidi</option>
              </select>
            </div>

            {/* Appointment Type */}
            <div>
              <label className="block text-sm font-medium text-neutral-900 mb-2">Appointment type</label>
              <input
                type="text"
                placeholder="e.g., Initial consultation"
                className="w-full px-4 py-2 border border-soft rounded-lg text-sm"
              />
            </div>

            {/* Date and Time */}
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-900 mb-2">Date</label>
                <input type="date" className="w-full px-4 py-2 border border-soft rounded-lg text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-900 mb-2">Start time</label>
                <input type="time" className="w-full px-4 py-2 border border-soft rounded-lg text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-900 mb-2">Duration</label>
                <select className="w-full px-4 py-2 border border-soft rounded-lg text-sm bg-white">
                  <option>15 min</option>
                  <option selected>30 min</option>
                  <option>45 min</option>
                  <option>60 min</option>
                </select>
              </div>
            </div>

            {/* Comments */}
            <div>
              <label className="block text-sm font-medium text-neutral-900 mb-2">Comments</label>
              <textarea
                placeholder="Add any notes or special requirements..."
                rows={3}
                className="w-full px-4 py-2 border border-soft rounded-lg text-sm"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 flex gap-3 p-6 border-t border-soft bg-neutral-50">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-soft rounded-lg text-sm font-medium text-neutral-700 hover:bg-neutral-100"
          >
            Cancel
          </button>
          <button className="flex-1 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-dark">
            Create appointment
          </button>
        </div>
      </div>
    </div>
  )
}
