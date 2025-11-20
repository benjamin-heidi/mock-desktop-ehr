"use client"

import { Menu, Bell } from "lucide-react"

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

interface TopNavigationProps {
  activeModule: ActiveModule
  onModuleChange: (module: ActiveModule) => void
  onToggleSidebar: () => void
}

const MODULES: Array<{ id: ActiveModule; label: string }> = [
  { id: "appointments", label: "Appointments" },
  { id: "patients", label: "Patients" },
  { id: "tasks", label: "Tasks" },
  { id: "labs", label: "Labs" },
  { id: "letters", label: "Letters" },
  { id: "invoices", label: "Invoices" },
  { id: "contacts", label: "Contacts" },
  { id: "data", label: "Data" },
  { id: "settings", label: "Settings" },
]

export default function TopNavigation({ activeModule, onModuleChange, onToggleSidebar }: TopNavigationProps) {

  return (
    <nav className="bg-surface border-b border-soft h-16 flex items-center justify-between px-6 gap-4 sticky top-0 z-40 shadow-sm">
      {/* Left: Logo and Sidebar Toggle */}
      <div className="flex items-center gap-4 min-w-max">
        <button
          onClick={onToggleSidebar}
          className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
          aria-label="Toggle sidebar"
          title="Toggle sidebar"
        >
          <Menu className="w-5 h-5 text-neutral-600" />
        </button>

        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white text-sm font-bold">
            CF
          </div>
          <span className="font-bold text-neutral-900 hidden sm:inline">CareFlow</span>
        </div>
      </div>

      {/* Center: Module Navigation */}
      <div className="flex items-center gap-0.5 flex-wrap">
        {MODULES.map((module) => (
          <button
            key={module.id}
            onClick={() => onModuleChange(module.id)}
            className={`px-3 py-2 text-sm font-medium rounded-md transition-all ${
              activeModule === module.id
                ? "text-primary bg-neutral-100"
                : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50"
            }`}
            title={module.label}
          >
            {module.label}
          </button>
        ))}
      </div>

      {/* Right: Notifications */}
      <div className="flex items-center gap-2 ml-auto min-w-max">
        <button className="p-2 hover:bg-neutral-100 rounded-lg transition-colors relative" title="Notifications">
          <Bell className="w-5 h-5 text-neutral-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
      </div>
    </nav>
  )
}
