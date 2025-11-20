"use client"

import { useState } from "react"
import { useAtomValue } from "jotai"
import ScheduleGrid from "@/components/appointments/schedule-grid"
import BookingPanel from "@/components/appointments/booking-panel"
import ClinicSettings from "@/components/appointments/clinic-settings"
import LocationSettings from "@/components/appointments/location-settings"
import { activeSectionAtom } from "@/lib/store/atoms"

export default function AppointmentsView() {
  const activeSection = useAtomValue(activeSectionAtom)
  const [selectedAppointment, setSelectedAppointment] = useState<{
    id: string
    patient: string
    time: string
    duration: string
    date: string
    clinician: string
    type: string
    location: string
  } | null>(null)

  if (activeSection === "clinic") {
    return <ClinicSettings />
  }

  if (activeSection === "location") {
    return <LocationSettings />
  }

  return (
    <div className="flex h-full bg-background">
      {/* Schedule Grid */}
      <div className="flex-1 overflow-auto">
        <div className="p-4 border-b border-soft">
          <h2 className="text-lg font-semibold text-neutral-900">
            {activeSection === "summary" && "Appointments Summary"}
          </h2>
        </div>
        <ScheduleGrid onSelectAppointment={setSelectedAppointment} />
      </div>

      {/* Right Detail Panel */}
      {selectedAppointment && (
        <div className="w-96 bg-surface border-l border-soft overflow-auto">
          <BookingPanel appointment={selectedAppointment} onClose={() => setSelectedAppointment(null)} />
        </div>
      )}
    </div>
  )
}
