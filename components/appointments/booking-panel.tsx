"use client"

import { X } from "lucide-react"

interface Appointment {
  id: string
  patient: string
  time: string
  duration: string
  date: string
  clinician: string
  type: string
  location: string
}

interface BookingPanelProps {
  appointment: Appointment
  onClose: () => void
}

export default function BookingPanel({ appointment, onClose }: BookingPanelProps) {
  return (
    <div className="bg-primary text-white flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-white border-opacity-20">
        <h2 className="text-lg font-semibold">Clinic appointment</h2>
        <button onClick={onClose} className="p-1 hover:bg-white hover:bg-opacity-10 rounded-lg transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Date and Time */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h18M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span className="text-sm opacity-90">THURSDAY 20/11/2025</span>
          </div>
          <div className="text-2xl font-bold">{appointment.time} – 16:45 (30 min)</div>
        </div>

        {/* Type */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
            </svg>
            <span className="text-sm opacity-90">{appointment.type}</span>
          </div>
        </div>

        {/* Clinician and Location */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2 1m2-1l-2-1m2 1v2.5"
              />
            </svg>
            <span className="font-medium">{appointment.clinician}</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
            </svg>
            <span className="text-sm">{appointment.location}</span>
          </div>
        </div>

        {/* Patient */}
        <div className="bg-white bg-opacity-10 rounded-lg p-4">
          <h3 className="text-lg font-bold mb-4">{appointment.patient}</h3>
          <div className="space-y-3 text-sm">
            <div>
              <div className="opacity-75">DOB</div>
              <div>null, null</div>
            </div>
            <div>
              <div className="opacity-75">Address</div>
              <div>N/A</div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-3 gap-2">
          <button className="px-3 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg text-sm font-medium transition-colors">
            Invoice
          </button>
          <button className="px-3 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg text-sm font-medium transition-colors">
            Note
          </button>
          <button className="px-3 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg text-sm font-medium transition-colors">
            Letter
          </button>
        </div>

        {/* Status Section */}
        <div className="space-y-2 text-sm">
          <div className="grid grid-cols-3 gap-2">
            <button className="px-3 py-2 text-center border border-white border-opacity-30 rounded-lg hover:bg-white hover:bg-opacity-10 transition-colors">
              Arrived
            </button>
            <button className="px-3 py-2 text-center border border-white border-opacity-30 rounded-lg hover:bg-white hover:bg-opacity-10 transition-colors">
              Consultation
            </button>
            <button className="px-3 py-2 text-center border border-white border-opacity-30 rounded-lg hover:bg-white hover:bg-opacity-10 transition-colors">
              Departed
            </button>
          </div>
          <div className="flex items-center gap-2 pt-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
            <span className="text-opacity-75">DNA</span>
          </div>
        </div>

        {/* Info Message */}
        <div className="bg-blue-500 bg-opacity-20 border border-blue-400 border-opacity-30 rounded-lg p-3 text-xs">
          <div className="flex gap-2">
            <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
            </svg>
            <p>Turn on invoicing for future bookings from Settings {">"} Invoice and payment</p>
          </div>
        </div>
      </div>
    </div>
  )
}
