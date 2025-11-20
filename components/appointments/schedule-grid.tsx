"use client"

import { DEFAULT_LOCATION, INITIAL_APPOINTMENTS, INITIAL_PATIENTS, TIME_SLOTS, TIME_SLOT_HEIGHT } from "@/lib/constants"
import { appointmentsAtom, patientsAtom, usersAtom, type Appointment } from "@/lib/store/atoms"
import { useAtom, useAtomValue } from "jotai"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useEffect, useState } from "react"
import CreateBookingModal from "./create-booking-modal"
import QuickAppointmentDialog from "./quick-appointment-dialog"

interface ScheduleGridProps {
  onSelectAppointment: (appointment: Appointment) => void
}

export default function ScheduleGrid({ onSelectAppointment }: ScheduleGridProps) {
  const users = useAtomValue(usersAtom)
  const activeUsers = users.filter(u => u.active)
  const [appointments, setAppointments] = useAtom(appointmentsAtom)
  const [patients, setPatients] = useAtom(patientsAtom)
  const [currentDate, setCurrentDate] = useState(new Date(2025, 10, 20))
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [showQuickDialog, setShowQuickDialog] = useState(false)
  const [selectedSlot, setSelectedSlot] = useState<{
    time: string
    clinician: string
  } | null>(null)

  // Initialize data on mount
  useEffect(() => {
    if (patients.length === 0) {
      setPatients(INITIAL_PATIENTS)
    }
    if (appointments.length === 0) {
      setAppointments(INITIAL_APPOINTMENTS)
    }
  }, [])

  const goToPreviousDay = () => {
    setCurrentDate(new Date(currentDate.getTime() - 86400000))
  }

  const goToNextDay = () => {
    setCurrentDate(new Date(currentDate.getTime() + 86400000))
  }

  const goToToday = () => {
    setCurrentDate(new Date())
  }

  const handleSlotClick = (time: string, clinician: string) => {
    // Check if slot is already occupied
    const dateStr = currentDate.toISOString().split("T")[0]
    const isOccupied = appointments.some(
      (appt) => appt.date === dateStr && appt.clinician === clinician && isTimeInAppointment(time, appt)
    )

    if (!isOccupied) {
      setSelectedSlot({ time, clinician })
      setShowQuickDialog(true)
    }
  }

  const handleSaveAppointment = (appointmentData: {
    patient: string
    patientId: string
    clinician: string
    appointmentType: string
    time: string
    date: string
    duration: number
  }) => {
    const newAppointment: Appointment = {
      id: Date.now().toString(),
      patient: appointmentData.patient,
      patientId: appointmentData.patientId,
      time: appointmentData.time,
      duration: appointmentData.duration,
      date: appointmentData.date,
      clinician: appointmentData.clinician,
      type: appointmentData.appointmentType,
      location: DEFAULT_LOCATION,
    }
    setAppointments([...appointments, newAppointment])
  }

  // Helper function to check if a time slot is within an appointment's duration
  const isTimeInAppointment = (timeSlot: string, appointment: Appointment): boolean => {
    const slotMinutes = timeToMinutes(timeSlot)
    const apptStartMinutes = timeToMinutes(appointment.time)
    const apptEndMinutes = apptStartMinutes + appointment.duration
    return slotMinutes >= apptStartMinutes && slotMinutes < apptEndMinutes
  }

  // Helper function to convert time string to minutes
  const timeToMinutes = (time: string): number => {
    const [hours, minutes] = time.split(":").map(Number)
    return hours * 60 + minutes
  }

  // Helper function to check if appointment starts at this time slot
  const appointmentStartsAtTime = (timeSlot: string, appointment: Appointment): boolean => {
    return appointment.time === timeSlot
  }

  // Calculate pixel height for appointment based on duration
  const getAppointmentHeight = (appointment: Appointment): number => {
    // Calculate precise height: duration in minutes * pixels per minute
    // Each 30min slot is 48px tall, so 1.6px per minute
    const pixelsPerMinute = TIME_SLOT_HEIGHT / 30 // 48px per 30min slot = 1.6px per minute
    // Subtract only the top offset (8px) to account for positioning
    return appointment.duration * pixelsPerMinute - 8
  }

  return (
    <div className="p-6">
      {/* Header Controls */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 mb-2">Heidi SF - Room 1</h1>
        </div>

        <div className="flex items-center gap-3">
          <button onClick={goToPreviousDay} className="p-2 hover:bg-neutral-100 rounded-lg border border-soft">
            <ChevronLeft className="w-5 h-5" />
          </button>

          <input
            type="date"
            value={currentDate.toISOString().split("T")[0]}
            onChange={(e) => setCurrentDate(new Date(e.target.value))}
            className="px-4 py-2 border border-soft rounded-lg text-sm"
          />

          <button onClick={goToNextDay} className="p-2 hover:bg-neutral-100 rounded-lg border border-soft">
            <ChevronRight className="w-5 h-5" />
          </button>

          <button
            onClick={goToToday}
            className="px-4 py-2 text-sm font-medium text-primary hover:bg-neutral-100 rounded-lg border border-soft"
          >
            Today
          </button>

          <button className="px-4 py-2 text-sm font-medium text-primary hover:bg-neutral-100 rounded-lg border border-soft">
            Day
          </button>
        </div>
      </div>

      {/* Schedule Grid */}
      <div className="overflow-x-auto border border-soft rounded-lg bg-white">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-neutral-50 border-b border-soft">
              <th className="w-16 px-4 py-3 text-left text-neutral-600 font-medium">Time</th>
              {activeUsers.map((user) => (
                <th
                  key={user.id}
                  className="min-w-24 px-3 py-3 text-left text-neutral-600 font-medium border-l border-soft text-xs"
                >
                  {user.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="relative">
            {TIME_SLOTS.map((time) => (
              <tr key={time} className="border-b border-soft h-12 hover:bg-neutral-50">
                <td className="px-4 py-2 text-neutral-600 font-medium text-xs sticky left-0 bg-neutral-50 border-r border-soft">
                  {time}
                </td>
                {activeUsers.map((user) => {
                  const dateStr = currentDate.toISOString().split("T")[0]

                  // Find appointments for this user, date, and time
                  const relevantAppointments = appointments.filter(
                    (a) => a.clinician === user.name && a.date === dateStr
                  )

                  // Check if there's an appointment starting at this time
                  const apptStartingHere = relevantAppointments.find(
                    (a) => appointmentStartsAtTime(time, a)
                  )

                  // Check if this slot is occupied by an ongoing appointment
                  const isOccupiedByOngoing = relevantAppointments.some(
                    (a) => !appointmentStartsAtTime(time, a) && isTimeInAppointment(time, a)
                  )

                  return (
                    <td
                      key={user.id}
                      className={`px-3 py-2 border-l border-soft relative ${
                        !apptStartingHere && !isOccupiedByOngoing ? 'cursor-pointer hover:bg-blue-50' : ''
                      }`}
                      onClick={() => !apptStartingHere && !isOccupiedByOngoing && handleSlotClick(time, user.name)}
                    >
                      {apptStartingHere && (
                        <div
                          className="absolute left-0 right-0 mx-3 z-10"
                          style={{
                            top: '8px',
                            height: `${getAppointmentHeight(apptStartingHere)}px`,
                          }}
                        >
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              onSelectAppointment(apptStartingHere)
                            }}
                            className="w-full h-full text-left px-2 py-1 bg-primary text-white rounded text-xs font-medium hover:bg-primary-dark transition-colors"
                          >
                            <div className="font-semibold">{apptStartingHere.patient}</div>
                            <div className="text-xs opacity-90">
                              {apptStartingHere.time} - {apptStartingHere.duration}min
                            </div>
                            <div className="text-xs opacity-75">{apptStartingHere.type}</div>
                          </button>
                        </div>
                      )}
                      {isOccupiedByOngoing && (
                        <div className="absolute inset-0 pointer-events-none"></div>
                      )}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        onClick={() => setShowBookingModal(true)}
        className="mt-6 px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors"
      >
        + New booking
      </button>

      {/* Create Booking Modal */}
      {showBookingModal && <CreateBookingModal onClose={() => setShowBookingModal(false)} />}

      {/* Quick Appointment Dialog */}
      {showQuickDialog && selectedSlot && (
        <QuickAppointmentDialog
          onClose={() => {
            setShowQuickDialog(false)
            setSelectedSlot(null)
          }}
          onSave={handleSaveAppointment}
          selectedTime={selectedSlot.time}
          selectedDate={currentDate.toISOString().split("T")[0]}
          selectedClinician={selectedSlot.clinician}
          patients={patients}
        />
      )}
    </div>
  )
}
