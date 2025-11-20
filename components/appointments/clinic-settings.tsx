"use client"

import { useAtom } from "jotai"
import { Clock, MapPin, Settings } from "lucide-react"
import { clinicSettingsAtom } from "@/lib/store/atoms"

export default function ClinicSettings() {
  const [settings, setSettings] = useAtom(clinicSettingsAtom)

  const handleWorkingHoursChange = (
    day: keyof typeof settings.workingHours,
    field: "open" | "close" | "enabled",
    value: string | boolean
  ) => {
    setSettings({
      ...settings,
      workingHours: {
        ...settings.workingHours,
        [day]: {
          ...settings.workingHours[day],
          [field]: value,
        },
      },
    })
  }

  const handleRoomUpdate = (roomId: string, field: string, value: any) => {
    setSettings({
      ...settings,
      rooms: settings.rooms.map((room) =>
        room.id === roomId ? { ...room, [field]: value } : room
      ),
    })
  }

  return (
    <div className="flex flex-col h-full overflow-auto bg-background">
      <div className="p-6 bg-surface border-b border-soft">
        <h1 className="text-2xl font-bold text-neutral-900">Clinic Settings</h1>
        <p className="text-neutral-600 text-sm mt-2">Configure clinic rooms, hours, and appointment scheduling</p>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-4xl space-y-8">
          {/* Clinic Information */}
          <div className="bg-white border border-soft rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-semibold text-neutral-900">Clinic Information</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Clinic Name</label>
                <input
                  type="text"
                  value={settings.clinicName}
                  onChange={(e) => setSettings({ ...settings, clinicName: e.target.value })}
                  className="w-full px-4 py-2 border border-soft rounded-lg text-sm"
                />
              </div>
            </div>
          </div>

          {/* Rooms Configuration */}
          <div className="bg-white border border-soft rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <Settings className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-semibold text-neutral-900">Rooms</h2>
            </div>
            <div className="space-y-4">
              {settings.rooms.map((room) => (
                <div key={room.id} className="border border-soft rounded-lg p-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">Room Name</label>
                      <input
                        type="text"
                        value={room.name}
                        onChange={(e) => handleRoomUpdate(room.id, "name", e.target.value)}
                        className="w-full px-4 py-2 border border-soft rounded-lg text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">Capacity</label>
                      <input
                        type="number"
                        value={room.capacity}
                        onChange={(e) => handleRoomUpdate(room.id, "capacity", parseInt(e.target.value))}
                        className="w-full px-4 py-2 border border-soft rounded-lg text-sm"
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-neutral-700 mb-2">Equipment</label>
                    <div className="flex flex-wrap gap-2">
                      {room.equipment.map((item, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-primary bg-opacity-10 text-primary rounded-full text-xs font-medium"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Working Hours */}
          <div className="bg-white border border-soft rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-semibold text-neutral-900">Working Hours</h2>
            </div>
            <div className="space-y-3">
              {Object.entries(settings.workingHours).map(([day, hours]) => (
                <div key={day} className="flex items-center gap-4">
                  <label className="flex items-center gap-2 w-32">
                    <input
                      type="checkbox"
                      checked={hours.enabled}
                      onChange={(e) => handleWorkingHoursChange(day as any, "enabled", e.target.checked)}
                      className="w-4 h-4 rounded"
                    />
                    <span className="text-sm font-medium text-neutral-900 capitalize">{day}</span>
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="time"
                      value={hours.open}
                      onChange={(e) => handleWorkingHoursChange(day as any, "open", e.target.value)}
                      disabled={!hours.enabled}
                      className="px-3 py-2 border border-soft rounded-lg text-sm disabled:bg-neutral-50 disabled:text-neutral-400"
                    />
                    <span className="text-neutral-600">to</span>
                    <input
                      type="time"
                      value={hours.close}
                      onChange={(e) => handleWorkingHoursChange(day as any, "close", e.target.value)}
                      disabled={!hours.enabled}
                      className="px-3 py-2 border border-soft rounded-lg text-sm disabled:bg-neutral-50 disabled:text-neutral-400"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Appointment Settings */}
          <div className="bg-white border border-soft rounded-lg p-6">
            <h2 className="text-lg font-semibold text-neutral-900 mb-4">Appointment Settings</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Default Slot Duration (minutes)
                </label>
                <select
                  value={settings.appointmentSlotDuration}
                  onChange={(e) =>
                    setSettings({ ...settings, appointmentSlotDuration: parseInt(e.target.value) })
                  }
                  className="w-full px-4 py-2 border border-soft rounded-lg text-sm bg-white"
                >
                  <option value={15}>15 minutes</option>
                  <option value={30}>30 minutes</option>
                  <option value={45}>45 minutes</option>
                  <option value={60}>60 minutes</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Buffer Time (minutes)</label>
                <input
                  type="number"
                  value={settings.bufferTime}
                  onChange={(e) => setSettings({ ...settings, bufferTime: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 border border-soft rounded-lg text-sm"
                  min="0"
                  max="30"
                />
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex gap-3">
            <button className="px-6 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-opacity-90">
              Save Changes
            </button>
            <button className="px-6 py-2 border border-soft rounded-lg text-sm font-medium text-neutral-700 hover:bg-neutral-50">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
