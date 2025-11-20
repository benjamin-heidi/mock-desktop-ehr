"use client"

import { useAtom } from "jotai"
import { ChevronDown } from "lucide-react"
import { activeSectionAtom } from "@/lib/store/atoms"

type ActiveModule =
  | "appointments"
  | "patients"
  | "tasks"
  | "labs"
  | "letters"
  | "invoices"
  | "contacts"
  | "data"
  | "settings"

interface SidebarProps {
  isOpen: boolean
  activeModule: ActiveModule
}

const SIDEBAR_SECTIONS = {
  appointments: [
    { id: "summary", label: "Summary" },
    { id: "location", label: "Location" },
    { id: "clinic", label: "Clinic settings" },
  ],
  patients: [
    { id: "all", label: "All Patients" },
    { id: "active", label: "Active Patients" },
    { id: "inactive", label: "Inactive Patients" },
  ],
  tasks: [
    { id: "pending", label: "Pending" },
    { id: "completed", label: "Completed" },
    { id: "assigned", label: "Assigned to Me" },
  ],
  labs: [
    { id: "results", label: "Lab Results" },
    { id: "pending", label: "Pending Tests" },
    { id: "history", label: "History" },
  ],
  letters: [
    { id: "drafts", label: "Drafts" },
    { id: "sent", label: "Sent" },
    { id: "templates", label: "Templates" },
  ],
  invoices: [
    { id: "outstanding", label: "Outstanding" },
    { id: "paid", label: "Paid" },
    { id: "history", label: "History" },
  ],
  contacts: [
    { id: "patients", label: "Patients" },
    { id: "providers", label: "Providers" },
    { id: "pharmacies", label: "Pharmacies" },
  ],
  data: [
    { id: "reports", label: "Reports" },
    { id: "analytics", label: "Analytics" },
    { id: "exports", label: "Exports" },
  ],
  settings: [
    { id: "account", label: "Account" },
    { id: "clinic", label: "Clinic" },
    { id: "users", label: "Users" },
  ],
}

export default function Sidebar({ isOpen, activeModule }: SidebarProps) {
  const [activeSection, setActiveSection] = useAtom(activeSectionAtom)

  const sections = SIDEBAR_SECTIONS[activeModule] || []

  const handleSectionClick = (id: string) => {
    setActiveSection(id)
  }

  return (
    <aside
      className={`${
        isOpen ? "w-48" : "w-0"
      } bg-neutral-50 border-r border-soft transition-all duration-300 overflow-hidden flex flex-col`}
    >
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-1">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => handleSectionClick(section.id)}
              className={`w-full text-left px-4 py-2 text-sm rounded-lg transition-colors flex items-center justify-between ${
                activeSection === section.id
                  ? "bg-primary text-white font-medium"
                  : "text-neutral-700 hover:bg-neutral-100"
              }`}
            >
              {section.label}
              {section.id === "all" || section.id === "summary" ? <ChevronDown className="w-4 h-4" /> : null}
            </button>
          ))}
        </div>
      </div>

      {/* Sidebar Footer */}
      <div className="border-t border-soft p-4">
        <div className="text-xs text-neutral-500 space-y-3">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span>Last sync: 2 mins ago</span>
          </div>
          <button className="w-full px-3 py-2 text-center text-primary hover:bg-neutral-100 rounded-lg text-xs font-medium transition-colors">
            Help & Support
          </button>
        </div>
      </div>
    </aside>
  )
}
