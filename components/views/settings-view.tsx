"use client"

import type React from "react"

import { useState } from "react"
import { useAtomValue } from "jotai"
import { activeSectionAtom } from "@/lib/store/atoms"
import UserManagement from "@/components/settings/user-management"

export default function SettingsView() {
  const activeSection = useAtomValue(activeSectionAtom)
  const [settings, setSettings] = useState({
    fullName: "Dr. Sarah Chen",
    email: "sarah.chen@careflow.com",
    defaultLocation: "Heidi SF - Room 1",
    appointmentDuration: "30",
    enableNotifications: true,
    invoicePayment: true,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const inputValue = type === "checkbox" ? (e.target as HTMLInputElement).checked : value
    setSettings((prev) => ({ ...prev, [name]: inputValue }))
  }

  const handleSave = () => {
    console.log("Settings saved:", settings)
  }

  // Render user management if that section is active
  if (activeSection === "users") {
    return <UserManagement />
  }

  const sectionTitle = activeSection === "account" ? "Account Settings" : "Clinic Settings"

  return (
    <div className="flex flex-col h-full">
      <div className="p-6 bg-surface border-b border-soft">
        <h1 className="text-2xl font-bold text-neutral-900">Settings - {sectionTitle}</h1>
        <p className="text-neutral-600 text-sm mt-2">Configure your EHR platform preferences</p>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-2xl space-y-8">
          {/* Account Settings */}
          <div>
            <h2 className="text-lg font-semibold text-neutral-900 mb-4">Account Settings</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={settings.fullName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-soft rounded-lg text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={settings.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-soft rounded-lg text-sm"
                />
              </div>
            </div>
          </div>

          {/* Clinic Settings */}
          <div>
            <h2 className="text-lg font-semibold text-neutral-900 mb-4">Clinic Settings</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Default Location</label>
                <select
                  name="defaultLocation"
                  value={settings.defaultLocation}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-soft rounded-lg text-sm"
                >
                  <option>Heidi SF - Room 1</option>
                  <option>Heidi SF - Room 2</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Appointment Duration (minutes)
                </label>
                <input
                  type="number"
                  name="appointmentDuration"
                  value={settings.appointmentDuration}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-soft rounded-lg text-sm"
                />
              </div>
            </div>
          </div>

          {/* Preferences */}
          <div>
            <h2 className="text-lg font-semibold text-neutral-900 mb-4">Preferences</h2>
            <div className="space-y-4">
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  name="enableNotifications"
                  checked={settings.enableNotifications}
                  onChange={handleChange}
                  className="w-4 h-4 rounded"
                />
                <span className="text-sm text-neutral-700">Enable notifications</span>
              </label>
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  name="invoicePayment"
                  checked={settings.invoicePayment}
                  onChange={handleChange}
                  className="w-4 h-4 rounded"
                />
                <span className="text-sm text-neutral-700">Invoice and payment</span>
              </label>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex gap-3 pt-4 border-t border-soft">
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-dark"
            >
              Save changes
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
